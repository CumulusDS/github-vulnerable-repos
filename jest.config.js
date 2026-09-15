/** @type {import('jest').Config} */
module.exports = {
  displayName: "Unit Test",

  /** coverage */
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageDirectory: "var/coverage/test",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },

  /** globals */
  globals: {
    __VERSION__: "TEST",
  },

  /** other */
  // preset: null,
  // setupFilesAfterEnv: [],
  testEnvironment: "node",
  // transform: {
  //   "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  // },
  verbose: true,
};
