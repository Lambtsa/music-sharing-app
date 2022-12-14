// const { pathsToModuleNameMapper } = require("ts-jest");
// const { compilerOptions } = require("./tsconfig.json");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "@components/(.*)": "<rootDir>/src/components/$1",
    "@constants/(.*)": "<rootDir>/src/constants/$1",
    "@context/(.*)": "<rootDir>/src/context/$1",
    "@helpers/(.*)": "<rootDir>/src/helpers/$1",
    "@hooks/(.*)": "<rootDir>/src/hooks/$1",
    "@locales/(.*)": "<rootDir>/src/locales/$1",
    "@screens/(.*)": "<rootDir>/src/screens/$1",
    "@styles/(.*)": "<rootDir>/src/styles/$1",
    "@customTypes/(.*)": "<rootDir>/src/customTypes/$1",
  },
};
