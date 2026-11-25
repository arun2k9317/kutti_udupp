/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks", "@tabler/icons-react"],
  },
};

export default nextConfig;
