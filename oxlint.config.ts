import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import svelte from "ultracite/oxlint/svelte";

export default defineConfig({
  env: core.env,
  extends: [core, svelte],
  ignorePatterns: core.ignorePatterns,
  overrides: [
    {
      files: ["src/lib/index.ts"],
      rules: {
        "unicorn/no-empty-file": "off",
      },
    },
  ],
  rules: {
    "unicorn/filename-case": "off",
  },
});
