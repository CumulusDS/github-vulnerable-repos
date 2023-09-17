// @flow

import chalk from "chalk";
import type { VulnerableRepository } from "./generateVulnerableRepositories";
import getAdvisories from "./getAdvisories";
import { label } from "./repository";

export default function renderVulnerableRepositoryToConsole(repository: VulnerableRepository): void {
  const { name } = repository;
  const advisories = getAdvisories(repository);
  console.log(chalk`{bold ${name}}`);
  advisories.forEach(({ ghsaId, severity, summary }) => console.log(`\t${ghsaId} ${label[severity]} ${summary}`));
  console.log();
}
