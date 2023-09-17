// @flow

import { graphql } from "@octokit/graphql";
import type { Repository } from "./repository";

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
        hasVulnerabilityAlertsEnabled,
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

export default async function* generateOrganizationRepositories(): AsyncIterator<Repository> {
  const firstPage = await getOrganizationRepositories();
  yield* firstPage.organization.repositories.nodes;
  let { pageInfo } = firstPage.organization.repositories;
  while (pageInfo.hasNextPage) {
    const page = await getOrganizationRepositories(pageInfo.endCursor);
    yield* page.organization.repositories.nodes;
    pageInfo = page.organization.repositories.pageInfo;
  }
}
