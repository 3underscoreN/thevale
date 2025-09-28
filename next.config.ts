import type { NextConfig } from "next";

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@lmnr-ai/lmnr"],
};

const withNextIntlConfig = createNextIntlPlugin();
export default withNextIntlConfig(nextConfig);
