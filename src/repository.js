// @flow

import chalk from "chalk";

// eslint-disable-next-line import/prefer-default-export
export const label = {
  CRITICAL: chalk`{red  CRITICAL}`,
  HIGH: chalk`{magenta     HIGH}`,
  MODERATE: chalk`{green MODERATE}`,
  LOW: chalk`{cyan      LOW}`
};

export type Severity = $Keys<typeof label>;

type Node = {
  dismissedAt: ?string,
  autoDismissedAt: ?string,
  fixedAt: ?string,
  securityVulnerability: { advisory: { ghsaId: string, summary: string }, severity: Severity }
};

export type Repository = {
  name: string,
  vulnerabilityAlerts: {
    nodes: Node[]
  }
};
