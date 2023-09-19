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
\t-o, --organization STRING      - Give the organization. (required)
\t-h, --help                     - Print this message.

example:
\trepos --organization MyOrg
`
  );
}

export default async function main() {
  const args = parseArgs(process.argv.slice(2), {
    alias: {
      organization: ["o"],
      help: ["h"]
    },
    boolean: ["help"]
  });

  const { organization } = args;

  if (args.help || typeof organization !== "string") {
    printHelp();
    return;
  }

  const now = new Date();
  console.log(chalk`{bold Open-Source Vulnerability Report for ${organization}}`);
  console.log(now.toDateString());
  console.log();

  let cleanRepositoryCount = 0;
  let vulnerableRepositoryCount = 0;
  let disabledRepositoryCount = 0;
  for await (const repository of generateVulnerableRepositories(generateOrganizationRepositories(organization))) {
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
      disabledRepositoryCount} repositories}`
  );
  console.log(`\t${disabledRepositoryCount} skipped`);
  console.log(
    `\t${cleanRepositoryCount +
      vulnerableRepositoryCount} scanned: ${vulnerableRepositoryCount} vulnerable, ${cleanRepositoryCount} clean`
  );
}
