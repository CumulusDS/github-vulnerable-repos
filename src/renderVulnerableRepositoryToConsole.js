// @flow

import chalk from "chalk";
// $FlowFixMe[untyped-import]
import prettyMilliseconds from "pretty-ms";
import type { VulnerableRepository } from "./generateVulnerableRepositories";
import getAdvisories from "./getAdvisories";
import { label, labelColor, labelText } from "./repository";

// $FlowFixMe[unclear-type]
export default function renderVulnerableRepositoryToConsole(repository: VulnerableRepository, doc: any): void {
  const now = new Date();
  const { name, hasVulnerabilityAlertsEnabled } = repository;
  const advisories = getAdvisories(repository);

  console.log(chalk`{bold ${name}}`);
  doc.font("Helvetica-Bold").text(name);

  if (hasVulnerabilityAlertsEnabled) {
    advisories.forEach(({ createdAt, cve, ghsaId, severity, summary }) => {
      console.log(
        `\t${cve?.padEnd(19) ?? ghsaId} ${label[severity]} ${summary} (${prettyMilliseconds(now - createdAt, {
          compact: true
        })})`
      );
      doc
        .font("Helvetica")
        .fillColor("black")
        .text(`    ${cve?.padEnd(19) ?? ghsaId} `, { continued: true })
        .fillColor(labelColor[severity])
        .text(labelText[severity], { continued: true })
        .fillColor("black")
        .text(
          ` ${summary} (${prettyMilliseconds(now - createdAt, {
            compact: true
          })})`
        );
    });
  } else {
    console.log(chalk`{red \tVulnerability alerts are disabled}`);
    doc
      .font("Helvetica")
      .fillColor("red")
      .text(`    Vulnerability alerts are disabled`);
  }
  console.log();
  doc.fillColor("black").text("\n");
}
