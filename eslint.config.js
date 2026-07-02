import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";
import githubPlugin from "eslint-plugin-github";
import stylisticPlugin from "@stylistic/eslint-plugin";
import jestPlugin from "eslint-plugin-jest";
import globals from "globals";

export default tseslint.config(
  // Global Ignores
  {
    ignores: [
      "dist/",
      "lib/",
      "node_modules/",
      "jest.config.js"
    ]
  },

  // Base Configurations (TypeScript & GitHub)
  ...tseslint.configs.recommended,
  githubPlugin.getFlatConfigs().recommended,

  // Source Application Code Only
  {
    files: ["src/**/*.ts", "src/**/*.tsx", "index.ts", "main.ts"], 
    plugins: {
      "@stylistic": stylisticPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
        project: "./tsconfig.json", 
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      "i18n-text/no-en": "off",
      "import/no-namespace": "off",
      "no-unused-vars": "error",
      "eslint-comments/no-use": "error", 
      
      "semi": "off",
      "@stylistic/semi": ["error", "never"],
      "@stylistic/function-call-spacing": ["error", "never"],
      "@stylistic/type-annotation-spacing": "error",

      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-member-accessibility": ["error", { "accessibility": "no-public" }],
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "camelcase": "error",
      "@typescript-eslint/consistent-type-assertions": "error",
      "@typescript-eslint/explicit-function-return-type": ["error", { "allowExpressions": true }],
      "@typescript-eslint/no-array-constructor": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-extraneous-class": "error",
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/prefer-function-type": "error",
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/unbound-method": "error",
    },
  },

  // Testing Configuration
  {
    files: [
      "**/__tests__/**/*.test.ts"
    ],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
        project: "./__tests__/tsconfig.json",
      },
      globals: {
        ...globals.jest, 
      },
    },
    rules: {
      ...jestPlugin.configs["flat/recommended"].rules,
      ...jestPlugin.configs["flat/style"].rules,
      "camelcase": "off", 
      "@typescript-eslint/no-explicit-any": "warn",
      "import/no-namespace": "off" 
    },
  }
);
