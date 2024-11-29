import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import github from 'eslint-plugin-github'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [ {
    files: [
        "src/**/*.ts",
        "__tests__/**/*.ts",
    ],
    ignores: [
        "**/dist/",
        "**/lib/",
        "**/node_modules/",
        "**/jest.config.js",
    ],
    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 2023,
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },
  },
  github.getFlatConfigs().recommended,
  ...github.getFlatConfigs().typescript, {
    rules: {
        "i18n-text/no-en": "off",
        "import/no-namespace": "off",
        "no-unused-vars": "error",
        "@typescript-eslint/no-unused-vars": "error",

        "@typescript-eslint/explicit-member-accessibility": ["error", {
            accessibility: "no-public",
        }],

        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/ban-ts-comment": "error",
        camelcase: "error",
        "@typescript-eslint/consistent-type-assertions": "error",

        "@typescript-eslint/explicit-function-return-type": ["error", {
            allowExpressions: true,
        }],

        //"@stylistic/func-call-spacing": ["error", "never"],
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
        //"@stylistic/semi": ["error", "never"],
        //"@stylistic/type-annotation-spacing": "error",
        "@typescript-eslint/unbound-method": "error",
    },
}];
