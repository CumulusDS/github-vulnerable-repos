import chalk from "chalk";

type SeverityLabels = { CRITICAL: string; HIGH: string; LOW: string; MODERATE: string };

export const label: SeverityLabels = {
  CRITICAL: chalk`{red CRITICAL}`,
  HIGH: chalk`{magenta     HIGH}`,
  MODERATE: chalk`{green MODERATE}`,
  LOW: chalk`{cyan      LOW}`,
};

export const labelText: SeverityLabels = {
  CRITICAL: ` CRITICAL`,
  HIGH: `     HIGH`,
  MODERATE: ` MODERATE`,
  LOW: `      LOW`,
};

export const labelColor: SeverityLabels = {
  CRITICAL: `red`,
  HIGH: `magenta`,
  MODERATE: `green`,
  LOW: `cyan`,
};

export type Severity = keyof SeverityLabels;

// See https://docs.github.com/en/graphql/reference/objects#securityadvisoryidentifier
export type SecurityAdvisoryIdentifier = {
  type: string;
  value: string;
};

// See https://docs.github.com/en/graphql/reference/objects#repositoryvulnerabilityalert
export type RepositoryVulnerabilityAlert = {
  createdAt: string;
  dismissedAt: string | null;
  autoDismissedAt: string | null;
  fixedAt: string | null;
  securityVulnerability: {
    advisory: { ghsaId: string; summary: string; identifiers: readonly SecurityAdvisoryIdentifier[] };
    severity: Severity;
  };
};

export type Repository = {
  isArchived: boolean;
  name: string;
  hasVulnerabilityAlertsEnabled: boolean;
  vulnerabilityAlerts: {
    nodes: RepositoryVulnerabilityAlert[];
  };
};
