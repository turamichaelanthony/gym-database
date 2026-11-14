import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local development over 127.0.0.1 and the LAN address.
  // Without this, Next.js 16 blocks dev scripts and the page never hydrates.
  allowedDevOrigins: ['127.0.0.1', '192.168.1.18'],
};

export default nextConfig;
