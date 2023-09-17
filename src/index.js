// @flow

import chalk from "chalk";
import { graphql } from "@octokit/graphql";
import type { Repository } from "./repository";
import { label } from "./repository";
import generateVulnerableRepositories from "./generateVulnerableRepositories";
import getAdvisories from "./getAdvisories";

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
            autoDismissedAt,
            fixedAt,
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

export default async function main() {
  for await (const repository of generateVulnerableRepositories(generateOrganizationRepositories())) {
    const { name } = repository;
    const advisories = getAdvisories(repository);
    console.log(chalk`{bold ${name}}`);
    advisories.forEach(({ ghsaId, severity, summary }) => console.log(`\t${ghsaId} ${label[severity]} ${summary}`));
    console.log();
  }
}
