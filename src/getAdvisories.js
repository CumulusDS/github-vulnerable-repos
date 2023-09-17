// @flow

import type { Severity } from "./repository";
import type { VulnerableRepository } from "./generateVulnerableRepositories";
import { label } from "./repository";

type Advisory = { createdAt: Date, ghsaId: string, severity: Severity, summary: string };

const severities = Object.keys(label);

function order(left: Advisory, right: Advisory) {
  if (
    severities.indexOf(left.severity) < severities.indexOf(right.severity) ||
    (left.severity === right.severity && left.ghsaId < right.ghsaId)
  ) {
    return -1;
  }
  return 1;
}

export default function getAdvisories(repository: VulnerableRepository): $ReadOnlyArray<Advisory> {
  const { vulnerabilities } = repository;
  return vulnerabilities
    .map(({ createdAt, securityVulnerability: { advisory: { ghsaId, summary }, severity } }) => ({
      createdAt: new Date(createdAt),
      ghsaId,
      severity,
      summary
    }))
    .sort(order);
}
