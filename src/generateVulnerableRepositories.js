// @flow

import type { RepositoryVulnerabilityAlert, Repository } from "./repository";

export type VulnerableRepository = {|
  name: string,
  hasVulnerabilityAlertsEnabled: boolean,
  vulnerabilities: $ReadOnlyArray<RepositoryVulnerabilityAlert>
|};

export default async function* generateVulnerableRepositories(
  repositories: AsyncIterator<Repository>,
  asOfDate: Date
): AsyncIterator<VulnerableRepository> {
  for await (const repository of repositories) {
    const {
      name,
      hasVulnerabilityAlertsEnabled,
      vulnerabilityAlerts: { nodes }
    } = repository;
    const vulnerabilities = nodes
      .filter(({ createdAt }) => new Date(createdAt) <= asOfDate)
      .filter(({ dismissedAt }) => dismissedAt == null || new Date(dismissedAt) > asOfDate)
      .filter(({ autoDismissedAt }) => autoDismissedAt == null || new Date(autoDismissedAt) > asOfDate)
      .filter(({ fixedAt }) => fixedAt == null || new Date(fixedAt) > asOfDate);
    yield {
      name,
      hasVulnerabilityAlertsEnabled,
      vulnerabilities
    };
  }
}
