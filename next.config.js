const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["firebase", "@firebase/app", "@firebase/auth", "@firebase/firestore"],
  turbopack: {
    resolveAlias: {
      "@firebase/firestore": "./node_modules/@firebase/firestore/dist/index.esm.js",
    },
  },
  webpack: (config) => {
    config.resolve.alias["@firebase/firestore"] = path.join(
      path.dirname(require.resolve("@firebase/firestore/package.json")),
      "dist/index.esm.js",
    );
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/ai-widget.js",
        destination:
          "https://chitra-ai-backend-p6ex.onrender.com/widget.js?org=e37e6fef-c42b-4214-b4b7-c0910f7157da",
      },
    ];
  },
};

module.exports = nextConfig;
