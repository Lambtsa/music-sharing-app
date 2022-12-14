const isLocalLikeBuildEnv =
  !process.env.BUILD_ENV || process.env.BUILD_ENV === "local";
const isProductionLikeRuntime = process.env.NODE_ENV === "production";
/**
 * ⚠️ This file specifically needs to be called babel.config.js instead of .babelrc.js to make sure jest picks it up. ⚠️
 * @see https://github.com/facebook/jest/issues/6229#issuecomment-419885857
 */
module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "styled-components",
      {
        ssr: true,
        pure: isProductionLikeRuntime,
        minify: isProductionLikeRuntime,
        transpileTemplateLiterals: isProductionLikeRuntime,
        fileName: isLocalLikeBuildEnv,
        displayName: isLocalLikeBuildEnv,
      },
    ],
  ],
};
