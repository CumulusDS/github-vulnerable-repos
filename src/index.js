// @flow

import chalk from "chalk";
import { graphql } from "@octokit/graphql";

function github() {
  return process.env.GITHUB_TOKEN == null
    ? graphql
    : graphql.defaults({
        headers: {
          authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      });
}

async function getOrganizationRepositories(after) {
  return github()(
    `
query OrganizationRepositories($after: String) {
 organization(login: "cumulusds") {
    repositories(first: 100, after: $after) {
      pageInfo {
        endCursor,
        hasNextPage
      }
      nodes {
        name,
        vulnerabilityAlerts(first: 100) {
          nodes {
            dismissedAt,
            securityVulnerability {
              advisory { ghsaId, summary },
              severity
            }
          }
        }
      }
    }
  }
}
`,
    { after }
  );
}

const label = {
  CRITICAL: chalk`{red  CRITICAL}`,
  HIGH: chalk`{magenta     HIGH}`,
  MODERATE: chalk`{green MODERATE}`,
  LOW: chalk`{cyan      LOW}`
};

const severities = Object.keys(label);

type Severity = $Keys<typeof label>;

type Node = {
  dismissedAt: ?string,
  securityVulnerability: { advisory: { ghsaId: string, summary: string }, severity: Severity }
};

type Repository = {
  name: string,
  vulnerabilityAlerts: {
    nodes: Node[]
  }
};

async function* generateOrganizationRepositories(): AsyncIterator<Repository> {
  const firstPage = await getOrganizationRepositories();
  yield* firstPage.organization.repositories.nodes;
  let { pageInfo } = firstPage.organization.repositories;
  while (pageInfo.hasNextPage) {
    const page = await getOrganizationRepositories(pageInfo.endCursor);
    yield* page.organization.repositories.nodes;
    pageInfo = page.organization.repositories.pageInfo;
  }
}

type Advisory = { ghsaId: string, severity: Severity, summary: string };

function order(left: Advisory, right: Advisory) {
  if (
    severities.indexOf(left.severity) < severities.indexOf(right.severity) ||
    (left.severity === right.severity && left.ghsaId < right.ghsaId)
  ) {
    return -1;
  }
  return 1;
}

export default async function main() {
  for await (const repository of generateOrganizationRepositories()) {
    const {
      name,
      vulnerabilityAlerts: { nodes }
    } = repository;
    const vulnerabilities = nodes.filter(({ dismissedAt }) => dismissedAt == null);
    if (vulnerabilities.length > 0) {
      const advisories: Advisory[] = vulnerabilities
        .map(({ securityVulnerability: { advisory: { ghsaId, summary }, severity } }) => ({
          ghsaId,
          severity,
          summary
        }))
        .sort(order);
      console.log(chalk`{bold ${name}}`);
      advisories.forEach(({ ghsaId, severity, summary }) => console.log(`\t${ghsaId} ${label[severity]} ${summary}`));
      console.log();
    }
  }
}
