import stylistic from "@stylistic/eslint-plugin";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  ignores: [
    ".next/*",
    ".vscode/*",
    "public/*",
    "assets/*",
    "coverage/*",
    "node_modules/*",
    "**/*.css",
    "**/*.svg",
    "**/*.d.ts",
    "**/*.spec.tsx",
  ],
  plugins: {
    "@stylistic": stylistic,
    "simple-import-sort": simpleImportSort
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/no-anonymous-default-export": [
      "error",
      {
        allowArray: true,
        allowArrowFunction: true,
        allowAnonymousClass: true,
        allowAnonymousFunction: true,
        allowCallExpression: true,
        allowLiteral: true,
        allowObject: true
      }
    ],
    "no-console": "warn",
    "no-useless-return": "error",

    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": true,
      "caughtErrors": "none",
      "argsIgnorePattern": "^_"
    }],

    "prefer-arrow-callback": "error",
    "@stylistic/semi": [2, "always"],
    "@stylistic/no-extra-semi": "error",
    "@stylistic/semi-spacing": "error",

    "@stylistic/dot-location": ["error", "property"],

    "@stylistic/indent": ["error", 2],
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/space-before-blocks": "error",
    "@stylistic/space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],
    "@stylistic/type-annotation-spacing": "error",
    "@stylistic/object-curly-spacing": ["error", "always"],
    "@stylistic/block-spacing": "error",
    "@stylistic/comma-spacing": "error",
    "@stylistic/keyword-spacing": "error",
    "@stylistic/space-infix-ops": "error",
    "@stylistic/space-in-parens": ["error", "never"],
    "@stylistic/arrow-spacing": "error",

    "@stylistic/brace-style": ["error", "1tbs"],
    "@stylistic/object-property-newline": ["error", {
      "allowAllPropertiesOnSameLine": false
    }],
    "@stylistic/object-curly-newline": ["error", {
      "ObjectExpression": {
        "multiline": true,
        "minProperties": 1
      },
      "ObjectPattern": {
        "multiline": true
      },
      "ImportDeclaration": {
        "multiline": true,
        "minProperties": 3
      },
      "ExportDeclaration": {
        "multiline": true,
        "minProperties": 3
      }
    }],
    "no-duplicate-imports": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/self-closing-comp": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  }
}];

export default eslintConfig;