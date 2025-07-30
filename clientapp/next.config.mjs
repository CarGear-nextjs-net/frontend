/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // async rewrites() {
  //     return [
  //         {
  //             source: '/api/:path*',
  //             destination: 'http://localhost:5000/api/:path*',
  //         },
  //     ];
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/api/local-image/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/api/database-images/**",
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Configure webpack dev server for proxy setup
      config.devServer = {
        ...config.devServer,
        host: "0.0.0.0", // Allow external connections
        port: 4000,
        allowedHosts: "all", // Allow all hosts for proxy
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
    }
    return config;
  },
  // Ensure proper asset prefix for proxy setup
  assetPrefix: process.env.NODE_ENV === "development" ? "" : undefined,
  // Configure base path if needed for proxy
  basePath: "",
};

export default nextConfig;
