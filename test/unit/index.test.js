// @flow

import { graphql } from "@octokit/graphql";
import main from "../../src";

jest.mock("@octokit/graphql", () => ({
  graphql: jest.fn()
}));

describe("vulnerable-repos", () => {
  let mockLog;
  let mockError;

  beforeEach(() => {
    mockLog = jest.fn();
    mockError = jest.fn();
    // $FlowExpectedError[cannot-write]
    console.log = mockLog;
    // $FlowExpectedError[cannot-write]
    console.error = mockError;
    delete process.env.GITHUB_TOKEN;
    process.argv = ["node", "vulnerable-repos"];
    graphql
      .mockReturnValueOnce(
        Promise.resolve({
          organization: {
            repositories: {
              pageInfo: { endCursor: "endCursor-1", hasNextPage: true },
              nodes: [
                {
                  name: "repo-1",
                  isArchived: false,
                  hasVulnerabilityAlertsEnabled: true,
                  vulnerabilityAlerts: { nodes: [] }
                },
                {
                  name: "repo-2",
                  isArchived: false,
                  hasVulnerabilityAlertsEnabled: true,
                  vulnerabilityAlerts: {
                    nodes: [
                      {
                        createdAt: "2020-10-21T01:35:51Z",
                        dismissedAt: "2020-10-22T01:35:51Z",
                        autoDismissedAt: null,
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
                  isArchived: false,
                  hasVulnerabilityAlertsEnabled: true,
                  vulnerabilityAlerts: {
                    nodes: [
                      {
                        createdAt: "2020-10-21T01:35:51Z",
                        dismissedAt: null,
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
                },
                {
                  name: "repo-4-fixed",
                  isArchived: false,
                  hasVulnerabilityAlertsEnabled: true,
                  vulnerabilityAlerts: {
                    nodes: [
                      {
                        createdAt: "2021-01-01T12:00:00Z",
                        dismissedAt: null,
                        autoDismissedAt: null,
                        fixedAt: "2021-01-15T12:00:00Z",
                        securityVulnerability: {
                          advisory: {
                            ghsaId: "id-fixed",
                            summary: "summary-fixed",
                            identifiers: []
                          },
                          severity: "MODERATE"
                        }
                      }
                    ]
                  }
                },
                {
                  name: "archived-repo",
                  isArchived: true,
                  hasVulnerabilityAlertsEnabled: true,
                  vulnerabilityAlerts: { nodes: [] }
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
                  isArchived: false,
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
                  name: "repo-with-disabled-alerts",
                  isArchived: false,
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
    // $FlowFixMe[prop-missing]
    jest.useFakeTimers().setSystemTime(new Date("2023-10-27T12:00:00Z"));
  });

  it("shows help message when missing the --organization argument", async () => {
    await expect(main()).resolves.toBe(2);
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("Options:"));
  });

  it("shows help message given the --help argument", async () => {
    process.argv.push("--help");
    expect(await main()).toBe(1);
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("Options:"));
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
        process.argv.push("--report", "var/test.pdf");
      });

      it("resolves", () => expect(main()).resolves.toBe(0));
    });

    describe("with invalid report", () => {
      beforeEach(() => {
        process.argv = ["node", "vulnerable-repos", "--organization", "MyOrg", "--report"];
      });

      it("resolves", async () => {
        expect(await main()).toBe(3);
        expect(mockError).toHaveBeenCalledWith(expect.stringContaining("--report requires a filename"));
      });
    });

    describe("with --as-of", () => {
      beforeEach(() => {
        process.env.GITHUB_TOKEN = "abcd";
      });

      it("shows an error for an invalid date", async () => {
        process.argv.push("--as-of", "not-a-date");
        expect(await main()).toBe(4);
        expect(mockError).toHaveBeenCalledWith(expect.stringContaining("--as-of requires a valid date string"));
      });

      it("handles date-only strings for --as-of", async () => {
        process.argv.push("--as-of", "2023-10-26");
        await main();
        const output = mockLog.mock.calls.map(c => c[0]).join("\n");
        expect(output).toContain("Thu Oct 26 2023");
      });

      it("filters out vulnerabilities created after the date", async () => {
        process.argv.push("--as-of", "2023-09-17T19:35:30Z"); // 1 second before creation
        await main();
        const output = mockLog.mock.calls.map(c => c[0]).join("\n");
        expect(output).not.toContain("has-vulnerability-alerts");
        expect(output).toContain("Summary for all 6 repositories");
        expect(output).toContain("\t1 skipped");
        expect(output).toContain("\t5 scanned: 0 vulnerable, 5 clean");
      });

      it("includes vulnerabilities dismissed after the date", async () => {
        process.argv.push("--as-of", "2020-10-21T12:00:00Z");
        await main();
        const output = mockLog.mock.calls.map(c => c[0]).join("\n");
        expect(output).toContain("repo-2");
        expect(output).toContain("repo-3");
        expect(output).not.toContain("has-vulnerability-alerts");
        expect(output).toContain("Summary for all 6 repositories");
        expect(output).toContain("\t1 skipped");
        expect(output).toContain("\t5 scanned: 2 vulnerable, 3 clean");
      });

      it("includes vulnerabilities fixed after the date", async () => {
        process.argv.push("--as-of", "2021-01-10T12:00:00Z");
        await main();
        const output = mockLog.mock.calls.map(c => c[0]).join("\n");
        expect(output).toContain("repo-3");
        expect(output).toContain("repo-4-fixed");
        expect(output).not.toContain("has-vulnerability-alerts");
        expect(output).toContain("Summary for all 6 repositories");
        expect(output).toContain("\t1 skipped");
        expect(output).toContain("\t5 scanned: 2 vulnerable, 3 clean");
      });
    });
  });
});
