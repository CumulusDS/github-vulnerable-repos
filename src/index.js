// @flow

import generateVulnerableRepositories from "./generateVulnerableRepositories";
import generateOrganizationRepositories from "./generateOrganizationRepositories";
import renderVulnerableRepositoryToConsole from "./renderVulnerableRepositoryToConsole";

export default async function main() {
  for await (const repository of generateVulnerableRepositories(generateOrganizationRepositories())) {
    renderVulnerableRepositoryToConsole(repository);
  }
}
