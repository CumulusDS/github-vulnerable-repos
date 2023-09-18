// @flow

import type { RepositoryVulnerabilityAlert, Repository } from "./repository";

export type VulnerableRepository = {|
  name: string,
  hasVulnerabilityAlertsEnabled: boolean,
  vulnerabilities: $ReadOnlyArray<RepositoryVulnerabilityAlert>
|};

export default async function* generateVulnerableRepositories(
  repositories: AsyncIterator<Repository>
): AsyncIterator<VulnerableRepository> {
  for await (const repository of repositories) {
    const {
      name,
      hasVulnerabilityAlertsEnabled,
      vulnerabilityAlerts: { nodes }
    } = repository;
    const vulnerabilities = nodes
      .filter(({ dismissedAt }) => dismissedAt == null)
      .filter(({ autoDismissedAt }) => autoDismissedAt == null)
      .filter(({ fixedAt }) => fixedAt == null);
    yield {
      name,
      hasVulnerabilityAlertsEnabled,
      vulnerabilities
    };
  }
}
