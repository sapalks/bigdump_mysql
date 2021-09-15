module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:node/recommended",
    "prettier"
  ],
  "plugins": [
    "node",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error",
    "block-scoped-var": "error",
    "eqeqeq": "error",
    "no-var": "error",
    "prefer-const": "error",
    "eol-last": "error",
    "prefer-arrow-callback": "error",
    "no-trailing-spaces": "error",
    "quotes": ["warn", "single", {
      "avoidEscape": true
    }],
    "no-restricted-properties": [
      "error",
      {
        "object": "describe",
        "property": "only"
      },
      {
        "object": "it",
        "property": "only"
      }
    ]
  },
  "overrides": [{
    "files": ["**/*.ts", "**/*.tsx"],
    "parser": "@typescript-eslint/parser",
    "extends": [
      "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-warning-comments": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/camelcase": "off",
      "node/no-missing-import": "off",
      "node/no-empty-function": "off",
      "node/no-unsupported-features/es-syntax": "off",
      "node/no-missing-require": "off",
      "node/shebang": "off",
      "no-dupe-class-members": "off",
      "require-atomic-updates": "off",
      "no-constant-condition": ["error", {
        "checkLoops": false
      }],
      "curly": "error",
      "no-console": "error",
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_"
      }],
      "node/no-unpublished-import": ["error", {
        "allowModules": [
          "cucumber-tsflow",
          "cucumber",
          "chai",
          "image-size"
        ]
      }]
    },
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module"
    }
  }],
  "globals": {
    "BUILD_MODE": "readonly"
  },
  "ignorePatterns": [
    "/static/*",
    "/webpack/*",
    "/src/mocks/**",
    "/**/__tests__/**",
    "/src/__tests__/*.ts",
    "**/__tests__/*.ts",
    "**.json",
    "/data/**",
    "/**/*.feature"
  ],
};