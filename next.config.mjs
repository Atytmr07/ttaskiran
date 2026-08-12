import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Vercel Image Optimization is OFF. The project photos are pre-compressed
    // at build time (max 1920px, mozjpeg q80 — ~150-350 KB each, down from the
    // 2560px/5-8 MB PNG originals), so there is nothing left for the optimizer
    // to gain. Turning it off takes Vercel image *transformations* to ~0
    // instead of one per (image × width × format) request.
    //
    // If photos ever get much heavier or higher-traffic, re-enable optimization
    // by deleting `unoptimized` and restoring the tuned block below:
    //   formats: ['image/webp'],
    //   deviceSizes: [640, 828, 1280, 1920],
    //   imageSizes: [128, 256, 384],
    //   minimumCacheTTL: 2678400, // 31 days
    unoptimized: true,
    // Still needed for the SVG placeholder backdrops served via next/image.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withNextIntl(nextConfig);
