// @flow

import type { Node, Repository } from "./repository";

export type VulnerableRepository = {|
  name: string,
  vulnerabilities: $ReadOnlyArray<Node>
|};

export default async function* generateVulnerableRepositories(
  repositories: AsyncIterator<Repository>
): AsyncIterator<VulnerableRepository> {
  for await (const repository of repositories) {
    const {
      name,
      vulnerabilityAlerts: { nodes }
    } = repository;
    const vulnerabilities = nodes
      .filter(({ dismissedAt }) => dismissedAt == null)
      .filter(({ autoDismissedAt }) => autoDismissedAt == null)
      .filter(({ fixedAt }) => fixedAt == null);
    if (vulnerabilities.length > 0) {
      yield {
        name,
        vulnerabilities
      };
    }
  }
}
