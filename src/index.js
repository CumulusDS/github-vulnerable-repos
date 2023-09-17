// @flow

import parseArgs from "minimist";
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
  for await (const repository of generateVulnerableRepositories(generateOrganizationRepositories())) {
    renderVulnerableRepositoryToConsole(repository);
  }
}
