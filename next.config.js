const withPlugins = require("next-compose-plugins");

// const configPath = path.resolve(
//   "src/config/env",
//   `${process.env.BUILD_ENV}.json`
// );

const config = withPlugins([], {
  // Enable <React.StrictMode> in application
  reactStrictMode: true,

  fileExtensions: ["jpg", "jpeg", "png", "gif"],

  webpack(config) {
    // config.resolve.alias["config/env"] = configPath;

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    // config.env = {
    //   gaTrackingId: ""
    // }

    return config;
  },
});

module.exports = config;
