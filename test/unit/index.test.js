// @flow

import { graphql } from "@octokit/graphql";
import main from "../../src";

jest.mock("@octokit/graphql", () => ({
  graphql: jest.fn()
}));

describe("vulnerable-repos", () => {
  beforeEach(() => {
    // $FlowExpectedError[cannot-write]
    console.log = jest.fn();
    // $FlowExpectedError[cannot-write]
    console.error = jest.fn();
    delete process.env.GITHUB_TOKEN;
    process.argv = ["node", "vulnerable-repos"];
    graphql
      .mockReturnValueOnce(
        Promise.resolve({
          organization: {
            repositories: {
              pageInfo: { endCursor: "endCursor-1", hasNextPage: true },
              nodes: [
                { name: "repo-1", hasVulnerabilityAlertsEnabled: true, vulnerabilityAlerts: { nodes: [] } },
                {
                  name: "repo-2",
                  hasVulnerabilityAlertsEnabled: true,
                  vulnerabilityAlerts: {
                    nodes: [
                      {
                        createdAt: "2020-10-21T01:35:51Z",
                        dismissedAt: "2020-10-22T01:35:51Z",
                        fixedAt: null,
                        securityVulnerability: {
                          advisory: { ghsaId: "id-1", summary: "summary-1", identifiers: [] },
                          severity: "HIGH"
                        }
                      }
                    ]
                  }
                },
                {
                  name: "repo-3",
                  hasVulnerabilityAlertsEnabled: true,
                  vulnerabilityAlerts: {
                    nodes: [
                      {
                        createdAt: "2020-10-21T01:35:51Z",
                        autoDismissedAt: "2023-08-17T12:34:56Z",
                        fixedAt: null,
                        securityVulnerability: {
                          advisory: {
                            ghsaId: "id-2",
                            summary: "summary-2",
                            identifiers: [{ type: "CVE", value: "CVE-2023-12345" }]
                          },
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
                  name: "has-vulnerability-alerts",
                  hasVulnerabilityAlertsEnabled: true,
                  vulnerabilityAlerts: {
                    nodes: [
                      {
                        createdAt: "2023-09-17T19:35:31Z",
                        autoDismissedAt: null,
                        dismissedAt: null,
                        fixedAt: null,
                        securityVulnerability: {
                          advisory: {
                            ghsaId: "id-2",
                            summary: "summary-2",
                            identifiers: []
                          },
                          severity: "HIGH"
                        }
                      },
                      {
                        createdAt: "2023-09-17T19:35:31Z",
                        autoDismissedAt: null,
                        dismissedAt: null,
                        fixedAt: null,
                        securityVulnerability: {
                          advisory: {
                            ghsaId: "id-3",
                            summary: "summary-3",
                            identifiers: [{ type: "CVE", value: "CVE-2023-12345" }]
                          },
                          severity: "LOW"
                        }
                      },
                      {
                        createdAt: "2023-09-17T19:35:31Z",
                        autoDismissedAt: null,
                        dismissedAt: null,
                        fixedAt: null,
                        securityVulnerability: {
                          advisory: {
                            ghsaId: "id-4",
                            summary: "summary-4",
                            identifiers: [{ type: "CVE", value: "CVE-2023-12345" }]
                          },
                          severity: "HIGH"
                        }
                      }
                    ]
                  }
                },
                {
                  name: "has-vulnerability-alerts-disabled",
                  hasVulnerabilityAlertsEnabled: false,
                  vulnerabilityAlerts: {
                    nodes: []
                  }
                }
              ]
            }
          }
        })
      );
    graphql.defaults = jest.fn().mockReturnValue(graphql);
  });

  it("shows help message when missing the --organization argument", async () => {
    await expect(main()).resolves.toBe(2);
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Options:"));
  });

  it("shows help message given the --help argument", async () => {
    process.argv.push("--help");
    expect(await main()).toBe(1);
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Options:"));
  });

  describe("with organization", () => {
    beforeEach(() => {
      process.argv.push("--organization", "MyOrg");
    });

    describe("with GITHUB_TOKEN environment variable", () => {
      beforeEach(() => {
        process.env.GITHUB_TOKEN = "abcd";
      });

      it("sets the authorization header", async () => {
        await main();
        expect(graphql.defaults).toHaveBeenCalledWith({
          headers: {
            authorization: `token abcd`
          }
        });
      });
    });

    it("resolves", () => expect(main()).resolves.toBe(0));

    describe("with valid report", () => {
      beforeEach(() => {
        // $FlowFixMe
        console.log = jest.fn();
        process.argv.push("--report", "var/test.pdf");
      });

      it("resolves", () => expect(main()).resolves.toBe(0));
    });

    describe("with invalid report", () => {
      beforeEach(() => {
        process.argv = ["node", "vulnerable-repos", "--organization", "MyOrg", "--report"];
        // $FlowFixMe
        console.log = jest.fn();
      });

      it("resolves", async () => {
        expect(await main()).toBe(3);
        expect(console.error).toHaveBeenCalledWith(expect.stringContaining("--report requires a filename"));
      });
    });
  });
});
