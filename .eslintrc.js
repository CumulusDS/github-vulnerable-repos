module.exports = {
  extends: ["airbnb-base", "plugin:prettier/recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "linebreak-style": "off",
    "no-console": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  plugins: ["jest", "@typescript-eslint"],
  env: {
    "jest/globals": true,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
