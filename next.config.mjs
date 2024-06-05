/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/example-app-nextjs",
  reactStrictMode: true,

  output: "export",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
