// @flow

import parseArgs from "minimist";
import chalk from "chalk";
import generateVulnerableRepositories from "./generateVulnerableRepositories";
import generateOrganizationRepositories from "./generateOrganizationRepositories";
import renderVulnerableRepositoryToConsole from "./renderVulnerableRepositoryToConsole";
// $FlowFixMe[untyped-import]
import { version } from "../package.json";

function printHelp() {
  console.log(
    `List vulnerable repos - ${version}

Options:
\t-h, --help                     - Print this message.

example:
\trepos
`
  );
}

export default async function main() {
  const args = parseArgs(process.argv.slice(2), {
    alias: {
      help: ["h"]
    },
    boolean: ["help"]
  });
  if (args.help) {
    printHelp();
    return;
  }

  const now = new Date();
  console.log(chalk`{bold Open-Source Vulnerability Report for CumulusDS}`);
  console.log(now.toDateString());
  console.log();

  let cleanRepositoryCount = 0;
  let vulnerableRepositoryCount = 0;
  let disabledRepositoryCount = 0;
  for await (const repository of generateVulnerableRepositories(generateOrganizationRepositories())) {
    const { hasVulnerabilityAlertsEnabled, vulnerabilities } = repository;
    if (vulnerabilities.length > 0) {
      renderVulnerableRepositoryToConsole(repository);
      vulnerableRepositoryCount += 1;
    } else if (!hasVulnerabilityAlertsEnabled) {
      renderVulnerableRepositoryToConsole(repository);
      disabledRepositoryCount += 1;
    } else {
      cleanRepositoryCount += 1;
    }
  }
  console.log(
    chalk`{bold Summary for all ${cleanRepositoryCount +
      vulnerableRepositoryCount +
      disabledRepositoryCount} cumulusds repositories}`
  );
  console.log(`\t${disabledRepositoryCount} skipped`);
  console.log(
    `\t${cleanRepositoryCount +
      vulnerableRepositoryCount} scanned: ${vulnerableRepositoryCount} vulnerable, ${cleanRepositoryCount} clean`
  );
}
