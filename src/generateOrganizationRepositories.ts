import { graphql } from "@octokit/graphql";
import type { Repository } from "./repository";

type PageInfo = { endCursor: string; hasNextPage: boolean };

type OrganizationRepositoriesResponse = {
  organization: {
    repositories: {
      pageInfo: PageInfo;
      nodes: Repository[];
    };
  };
};

function github() {
  return process.env.GITHUB_TOKEN == null
    ? graphql
    : graphql.defaults({
        headers: {
          authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      });
}

async function getOrganizationRepositories(
  organization: string,
  after?: string,
): Promise<OrganizationRepositoriesResponse> {
  return github()<OrganizationRepositoriesResponse>(
    `
query OrganizationRepositories($after: String) {
 organization(login: ${JSON.stringify(organization)}) {
    repositories(first: 100, after: $after) {
      pageInfo {
        endCursor,
        hasNextPage
      }
      nodes {
        isArchived,
        name,
        hasVulnerabilityAlertsEnabled,
        vulnerabilityAlerts(last: 100) {
          nodes {
            createdAt,
            dismissedAt,
            autoDismissedAt,
            fixedAt,
            securityVulnerability {
              advisory { 
                ghsaId,
                summary,
                identifiers { type, value }
              },
              severity
            }
          }
        }
      }
    }
  }
}
`,
    { after },
  );
}

export default async function* generateOrganizationRepositories(organization: string): AsyncGenerator<Repository> {
  const firstPage = await getOrganizationRepositories(organization);
  yield* firstPage.organization.repositories.nodes.filter((node) => !node.isArchived);
  let { pageInfo } = firstPage.organization.repositories;
  while (pageInfo.hasNextPage) {
    const page = await getOrganizationRepositories(organization, pageInfo.endCursor);
    yield* page.organization.repositories.nodes.filter((node) => !node.isArchived);
    pageInfo = page.organization.repositories.pageInfo;
  }
}
