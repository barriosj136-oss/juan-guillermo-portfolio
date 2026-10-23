import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/projects/operations-data-review-suite", destination: "/#projects", permanent: true },
    ];
  },
};

export default nextConfig;
