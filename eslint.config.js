import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // Дополнительно отключаем правило, требующее React в области видимости для JSX (для React 17+)
  {
    rules: {
      "react/react-in-jsx-scope": ["off"],  // Отключаем правило для React 17 и выше
    },
  },
  {
    settings: {
      "react": {
        "version": "detect",  // Автоматически определяет версию React
      },
    },
  }
];
