import js from "@eslint/js";
import globals from "globals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    ignores: [
      "**/webpack*.js",
      "**/*.test.js",
      "**/*.config.js"
    ]
  },

  // any other config imports go at the top
  js.configs.recommended,
  eslintPluginPrettierRecommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    files: ["src/**/*.js"],
    rules: {
      semi: "error", // Ensures semicolons are used
      "no-unused-vars": "error", // No unused variables
      "no-undef": "error", // No undefined variables
      quotes: ["error", "single", { avoidEscape: true, allowTemplateLiterals: true }],
    },
  },
];
