/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Enable <React.StrictMode> in application
  reactStrictMode: true,

  env: {
    gaTrackingId: process.env.gaTrackingId,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
};

module.exports = nextConfig;
