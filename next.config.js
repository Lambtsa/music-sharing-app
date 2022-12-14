module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    // const configPath = path.resolve(
    //   "src/config/env",
    //   `${process.env.BUILD_ENV}.json`
    // );
    // Enable <React.StrictMode> in application
    reactStrictMode: true,

    // fileExtensions: ["jpg", "jpeg", "png", "gif"],

    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      });

      return config;
    },
  };
  return nextConfig;
};
