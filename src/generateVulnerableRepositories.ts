import type { RepositoryVulnerabilityAlert, Repository } from "./repository";

export type VulnerableRepository = {
  name: string;
  hasVulnerabilityAlertsEnabled: boolean;
  vulnerabilities: readonly RepositoryVulnerabilityAlert[];
};

export default async function* generateVulnerableRepositories(
  repositories: AsyncIterable<Repository>,
  asOfDate: Date,
): AsyncGenerator<VulnerableRepository> {
  for await (const repository of repositories) {
    const {
      name,
      hasVulnerabilityAlertsEnabled,
      vulnerabilityAlerts: { nodes },
    } = repository;
    const vulnerabilities = nodes
      .filter(({ createdAt }) => new Date(createdAt) <= asOfDate)
      .filter(({ dismissedAt }) => dismissedAt == null || new Date(dismissedAt) > asOfDate)
      .filter(({ autoDismissedAt }) => autoDismissedAt == null || new Date(autoDismissedAt) > asOfDate)
      .filter(({ fixedAt }) => fixedAt == null || new Date(fixedAt) > asOfDate);
    yield {
      name,
      hasVulnerabilityAlertsEnabled,
      vulnerabilities,
    };
  }
}
