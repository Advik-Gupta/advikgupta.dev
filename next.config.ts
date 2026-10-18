import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.advikgupta.dev" }],
        destination: "https://advikgupta.dev/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
