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
};

module.exports = nextConfig;
