// @flow

import chalk from "chalk";

// eslint-disable-next-line import/prefer-default-export
export const label: {| CRITICAL: string, HIGH: string, LOW: string, MODERATE: string |} = {
  CRITICAL: chalk`{red  CRITICAL}`,
  HIGH: chalk`{magenta     HIGH}`,
  MODERATE: chalk`{green MODERATE}`,
  LOW: chalk`{cyan      LOW}`
};

export type Severity = $Keys<typeof label>;

// See https://docs.github.com/en/graphql/reference/objects#repositoryvulnerabilityalert
export type RepositoryVulnerabilityAlert = {|
  createdAt: string,
  dismissedAt: ?string,
  autoDismissedAt: ?string,
  fixedAt: ?string,
  securityVulnerability: { advisory: { ghsaId: string, summary: string }, severity: Severity }
|};

export type Repository = {|
  isArchived: boolean,
  name: string,
  hasVulnerabilityAlertsEnabled: boolean,
  vulnerabilityAlerts: {|
    nodes: RepositoryVulnerabilityAlert[]
  |}
|};
