import chalk from "chalk";
import prettyMilliseconds from "pretty-ms";
import type { VulnerableRepository } from "./generateVulnerableRepositories";
import getAdvisories from "./getAdvisories";
import { label, labelColor, labelText } from "./repository";

export default function renderVulnerableRepositoryToConsole(
  repository: VulnerableRepository,
  doc: PDFKit.PDFDocument | null,
  asOfDate: Date,
): void {
  const { name, hasVulnerabilityAlertsEnabled } = repository;
  const advisories = getAdvisories(repository);

  console.log(chalk`{bold ${name}}`);
  doc?.font("Helvetica-Bold").text(name);

  if (hasVulnerabilityAlertsEnabled) {
    advisories.forEach(({ createdAt, cve, ghsaId, severity, summary }) => {
      const age = prettyMilliseconds(asOfDate.getTime() - createdAt.getTime(), { compact: true });
      console.log(`\t${cve?.padEnd(19) ?? ghsaId} ${label[severity]} ${summary} (${age})`);
      doc
        ?.font("Helvetica")
        .fillColor("black")
        .text(`    ${cve?.padEnd(19) ?? ghsaId} `, { continued: true })
        .fillColor(labelColor[severity])
        .text(labelText[severity], { continued: true })
        .fillColor("black")
        .text(` ${summary} (${age})`);
    });
  } else {
    console.log(chalk`{red \tVulnerability alerts are disabled}`);
    doc?.font("Helvetica").fillColor("red").text(`    Vulnerability alerts are disabled`);
  }
  console.log();
  doc?.fillColor("black").text("\n");
}
