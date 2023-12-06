// @flow

import chalk from "chalk";

// eslint-disable-next-line import/prefer-default-export
export const label: {| CRITICAL: string, HIGH: string, LOW: string, MODERATE: string |} = {
  CRITICAL: chalk`{red CRITICAL}`,
  HIGH: chalk`{magenta     HIGH}`,
  MODERATE: chalk`{green MODERATE}`,
  LOW: chalk`{cyan      LOW}`
};

export const labelText: {| CRITICAL: string, HIGH: string, LOW: string, MODERATE: string |} = {
  CRITICAL: ` CRITICAL`,
  HIGH: `     HIGH`,
  MODERATE: ` MODERATE`,
  LOW: `      LOW`
};

export const labelColor: {| CRITICAL: string, HIGH: string, LOW: string, MODERATE: string |} = {
  CRITICAL: `red`,
  HIGH: `magenta`,
  MODERATE: `green`,
  LOW: `cyan`
};

export type Severity = $Keys<typeof label>;

// See https://docs.github.com/en/graphql/reference/objects#securityadvisoryidentifier
export type SecurityAdvisoryIdentifier = {|
  type: string,
  value: string
|};

// See https://docs.github.com/en/graphql/reference/objects#repositoryvulnerabilityalert
export type RepositoryVulnerabilityAlert = {|
  createdAt: string,
  dismissedAt: ?string,
  autoDismissedAt: ?string,
  fixedAt: ?string,
  securityVulnerability: {
    advisory: { ghsaId: string, summary: string, identifiers: $ReadOnlyArray<SecurityAdvisoryIdentifier> },
    severity: Severity
  }
|};

export type Repository = {|
  isArchived: boolean,
  name: string,
  hasVulnerabilityAlertsEnabled: boolean,
  vulnerabilityAlerts: {|
    nodes: RepositoryVulnerabilityAlert[]
  |}
|};
