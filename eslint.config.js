import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import playwright from "eslint-plugin-playwright";
import { defineConfig, globalIgnores } from "eslint/config";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      playwright
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...playwright.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
];
