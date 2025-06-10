// @flow

import parseArgs from "minimist";
import chalk from "chalk";
import PDFDocument from "pdfkit";
import fs from "fs";
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
\t-o, --organization STRING      - Give the organization. (required)
\t-r, --report STRING            - Output a PDF report to the given file.
\t--as-of DATE                   - Generate report as of a previous date.

example:
\trepos --organization MyOrg --report var/vulnerabilities-2024-02-09.pdf
`
  );
}

function createPDFReport(report: ?string): ?typeof PDFDocument {
  if (report == null) return null;
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(report));
  return doc;
}

export default async function main(): Promise<number> {
  const args = parseArgs(process.argv.slice(2), {
    alias: {
      help: ["h"],
      organization: ["o"],
      report: ["r"]
    },
    string: ["as-of"],
    boolean: ["help"]
  });

  const { organization, report } = args;
  const asOf = args["as-of"];

  if (args.help) {
    printHelp();
    return 1;
  }
  if (typeof organization !== "string") {
    console.error(chalk`{red Missing required argument: --organization\n}`);
    printHelp();
    return 2;
  }
  if (report != null && typeof report !== "string") {
    console.error(chalk`{red Invalid argument: --report requires a filename\n}`);
    printHelp();
    return 3;
  }

  const asOfDate = asOf != null ? new Date(asOf) : new Date();
  if (asOf != null && Number.isNaN(asOfDate.getTime())) {
    console.error(chalk`{red Invalid argument: --as-of requires a valid date string\n}`);
    printHelp();
    return 4;
  }

  const now = asOfDate;
  console.log(chalk`{bold Open-Source Vulnerability Report for ${organization}}`);
  console.log(now.toDateString());
  console.log();

  const doc = createPDFReport(report);

  doc
    ?.font("Helvetica-Bold")
    .fontSize(16)
    .text(`Open-Source Vulnerability Report for ${organization}`);
  doc
    ?.font("Helvetica")
    .fontSize(8)
    .text(now.toDateString());
  doc?.text("\n");

  let cleanRepositoryCount = 0;
  let vulnerableRepositoryCount = 0;
  let disabledRepositoryCount = 0;
  for await (const repository of generateVulnerableRepositories(generateOrganizationRepositories(organization), now)) {
    const { hasVulnerabilityAlertsEnabled, vulnerabilities } = repository;
    if (vulnerabilities.length > 0) {
      renderVulnerableRepositoryToConsole(repository, doc, now);
      vulnerableRepositoryCount += 1;
    } else if (!hasVulnerabilityAlertsEnabled) {
      renderVulnerableRepositoryToConsole(repository, doc, now);
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

  doc
    ?.font("Helvetica-Bold")
    .text(`Summary for all ${cleanRepositoryCount + vulnerableRepositoryCount + disabledRepositoryCount} repositories`);
  doc?.font("Helvetica").text(`    ${disabledRepositoryCount} skipped`);
  doc?.text(
    `    ${cleanRepositoryCount +
      vulnerableRepositoryCount} scanned: ${vulnerableRepositoryCount} vulnerable, ${cleanRepositoryCount} clean`
  );
  doc?.end();

  return 0;
}
