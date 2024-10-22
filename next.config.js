/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "urfs.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
