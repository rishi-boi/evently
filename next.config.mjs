/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000", // localhost
        "foobar-3000.app.github.dev", // Codespaces
      ],
    },
  },
};

export default nextConfig;
