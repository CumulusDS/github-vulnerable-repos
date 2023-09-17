// @flow

import chalk from "chalk";
// $FlowFixMe[untyped-import]
import prettyMilliseconds from "pretty-ms";
import type { VulnerableRepository } from "./generateVulnerableRepositories";
import getAdvisories from "./getAdvisories";
import { label } from "./repository";

export default function renderVulnerableRepositoryToConsole(repository: VulnerableRepository): void {
  const now = new Date();
  const { name, hasVulnerabilityAlertsEnabled } = repository;
  const advisories = getAdvisories(repository);
  console.log(chalk`{bold ${name}}`);
  if (hasVulnerabilityAlertsEnabled) {
    advisories.forEach(({ createdAt, ghsaId, severity, summary }) =>
      console.log(
        `\t${ghsaId} ${label[severity]} ${summary} (${prettyMilliseconds(now - createdAt, { compact: true })})`
      )
    );
  } else {
    console.log(chalk`{red \tVulnerability alerts are disabled}`);
  }
  console.log();
}
