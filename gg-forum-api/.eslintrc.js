import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  // Base configuration for all JavaScript files
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
      },
    },
  },

  // Test files configuration
  {
    files: ["**/*.test.js", "**/_test/**/*.js", "**/tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      // More relaxed rules for test files
      "max-len": "off",
      "max-lines": "off",
      "no-unused-vars": "warn",
    },
  },

  pluginJs.configs.recommended,

  // Custom rules for the project
  {
    rules: {
      // Error prevention
      "no-undef": "error",
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-dupe-keys": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Code style
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],

      // Best practices for Clean Architecture
      "max-lines-per-function": [
        "warn",
        { max: 50, skipComments: true, skipBlankLines: true },
      ],
      complexity: ["warn", 10],

      // Error handling
      "no-throw-literal": "error",

      // ES6+ features
      "prefer-const": "error",
      "arrow-body-style": ["warn", "as-needed"],

      // Allow certain patterns common in the project
      camelcase: ["error", { properties: "never", ignoreDestructuring: true }],
    },
  },
];
