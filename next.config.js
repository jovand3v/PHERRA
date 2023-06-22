/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pherra.s3.eu-central-1.amazonaws.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: { icon: "75px", replaceAttrValues: { "#fff": "currentColor" } },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
