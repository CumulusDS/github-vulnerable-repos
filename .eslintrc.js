module.exports = {
  parser: "@babel/eslint-parser",
  extends: ["airbnb-base", "plugin:prettier/recommended", "plugin:flowtype/recommended"],
  rules: {
    "linebreak-style": "off",
    "no-console": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off"
  },
  plugins: ["jest", "flowtype"],
  env: {
    "jest/globals": true
  }
};
