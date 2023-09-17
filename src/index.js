// @flow

import chalk from "chalk";
import { label } from "./repository";
import generateVulnerableRepositories from "./generateVulnerableRepositories";
import getAdvisories from "./getAdvisories";
import generateOrganizationRepositories from "./generateOrganizationRepositories";

export default async function main() {
  for await (const repository of generateVulnerableRepositories(generateOrganizationRepositories())) {
    const { name } = repository;
    const advisories = getAdvisories(repository);
    console.log(chalk`{bold ${name}}`);
    advisories.forEach(({ ghsaId, severity, summary }) => console.log(`\t${ghsaId} ${label[severity]} ${summary}`));
    console.log();
  }
}
