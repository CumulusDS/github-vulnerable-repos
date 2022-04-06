# Vulnerable Repos

[![ci-cd][ci-cd-badge]][ci-cd-url]
[![Vulerability Report][vulnerability-report-badge]][vulnerability-report-url]
[![Create Release][release-badge]][release-url]

List the repositories owned by an organization that have a vulnerability alert.

To access private repositories, set the GITHUB_TOKEN environment variable with a [GitHub personal access token].

Use npx to run via command-line. The output lists repos with open security alerts. Repos without alerts are not listed.

```shell
npx -q @cumulusds/vulnerable-repos --organization cumulusds
```

```
parrot-backend
        GHSA-6c8f-qphg-qjgp      LOW Validation Bypass in kind-of
        GHSA-g95f-p29q-9xw4      LOW Regular Expression Denial of Service in braces
        GHSA-p9pc-299p-vxgp      LOW Prototype Pollution in yargs-parser
        GHSA-vh95-rmgr-6w4m      LOW Prototype Pollution in minimist

cluster-app
        GHSA-4g88-fppr-53pp     HIGH Prototype Pollution in set-value
        GHSA-ff7x-qrg7-qggm     HIGH Prototype Pollution in dot-prop
        GHSA-v8v8-6859-qxm4     HIGH Arbitrary shell command execution in logkitty
        GHSA-6chw-6frg-f759 MODERATE Regular Expression Denial of Service in Acorn
        GHSA-6c8f-qphg-qjgp      LOW Validation Bypass in kind-of
        GHSA-p9pc-299p-vxgp      LOW Prototype Pollution in yargs-parser
        GHSA-w7rc-rwvf-8q5r      LOW The `size` option isn't honored after following a redirect in node-fetch
```

The GraphQL API does expose whether vulnerability alerts are actually enabled. You can enable vulnerability alerts
across your organization on the [Configure security and analysis features] page.

[GitHub personal access token]: https://github.com/settings/tokens
[Configure security and analysis features]: https://github.com/organizations/CumulusDS/settings/security_analysis

# Development

- [Package Structure](doc/development.md#package-structure)
- [Development Environment](doc/development.md#development-environment)
- [Quality](doc/development.md#quality)
- [Release](doc/development.md#release)

## License

This package is not licensed.

[ci-cd-url]: https://github.com/CumulusDS/vulnerable-repos/actions/workflows/ci-cd.yml
[ci-cd-badge]: https://github.com/CumulusDS/vulnerable-repos/actions/workflows/ci-cd.yml/badge.svg

[vulnerability-report-url]: https://github.com/CumulusDS/vulnerable-repos/actions/workflows/report.yml
[vulnerability-report-badge]: https://github.com/CumulusDS/vulnerable-repos/actions/workflows/report.yml/badge.svg

[release-url]: https://github.com/CumulusDS/vulnerable-repos/actions/workflows/release.yml
[release-badge]: https://github.com/CumulusDS/vulnerable-repos/actions/workflows/release.yml/badge.svg
