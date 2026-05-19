import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/example-app-nextjs",
  // reactStrictMode: true,


  images: {
    unoptimized: true,
  },
};

export default nextConfig;
