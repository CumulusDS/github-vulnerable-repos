// @flow

import { graphql } from "@octokit/graphql";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN ?? ""}`
  }
});

async function getOrganizationRepositories(after) {
  return graphqlWithAuth(
    `
{
  organization(login: "cumulusds") {
    repositories(first: 50) {
      pageInfo {
        endCursor
      }
      nodes {
        name
        updatedAt
        languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
          nodes {
            name
          }
        }
        primaryLanguage {
          name
        }
      }
    }
  }
}
`,
    { after }
  );
}

async function* getOrganizationRepositoriesPages() {
  yield await getOrganizationRepositories("aaa");
}

export default async function main() {
  for await (const page of getOrganizationRepositoriesPages()) {
    console.log(page);
    console.log(page.organization.repositories.pageInfo);
    console.log(page.organization.repositories.nodes.length);
  }
}
