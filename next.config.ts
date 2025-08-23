import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // This is a workaround for a Next.js bug.
    // See: https://github.com/vercel/next.js/issues/64421
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOfRule) => {
          if (oneOfRule.use && oneOfRule.use.loader === 'next-swc-loader') {
            delete oneOfRule.issuer;
          }
        });
      }
    });

    return config;
  }
};

export default nextConfig;
