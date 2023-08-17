// @flow

import main from "../../src";

jest.mock("@octokit/graphql", () => ({
  graphql: jest
    .fn()
    .mockReturnValueOnce(
      Promise.resolve({
        organization: {
          repositories: {
            pageInfo: { endCursor: "endCursor-1", hasNextPage: true },
            nodes: [
              { name: "repo-1", vulnerabilityAlerts: { nodes: [] } },
              {
                name: "repo-2",
                vulnerabilityAlerts: {
                  nodes: [
                    {
                      dismissedAt: "2020-10-22T01:35:51Z",
                      fixedAt: null,
                      securityVulnerability: {
                        advisory: { ghsaId: "id-1", summary: "summary-1" },
                        severity: "HIGH"
                      }
                    }
                  ]
                }
              },
              {
                name: "repo-3",
                vulnerabilityAlerts: {
                  nodes: [
                    {
                      autoDismissedAt: "2023-08-17T12:34:56Z",
                      fixedAt: null,
                      securityVulnerability: {
                        advisory: { ghsaId: "id-2", summary: "summary-2" },
                        severity: "CRITICAL"
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        organization: {
          repositories: {
            pageInfo: { endCursor: "endCursor-2", hasNextPage: false },
            nodes: [
              {
                name: "repo-3",
                vulnerabilityAlerts: {
                  nodes: [
                    {
                      autoDismissedAt: null,
                      dismissedAt: null,
                      fixedAt: null,
                      securityVulnerability: {
                        advisory: { ghsaId: "id-2", summary: "summary-2" },
                        severity: "HIGH"
                      }
                    },
                    {
                      autoDismissedAt: null,
                      dismissedAt: null,
                      fixedAt: null,
                      securityVulnerability: {
                        advisory: { ghsaId: "id-3", summary: "summary-3" },
                        severity: "LOW"
                      }
                    },
                    {
                      autoDismissedAt: null,
                      dismissedAt: null,
                      fixedAt: null,
                      securityVulnerability: {
                        advisory: { ghsaId: "id-4", summary: "summary-4" },
                        severity: "HIGH"
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      })
    )
}));

describe("vulnerable-repos", () => {
  beforeAll(() => {
    delete process.env.GITHUB_TOKEN;
  });

  it("resolves", () => expect(main()).resolves.toBeUndefined());
});
