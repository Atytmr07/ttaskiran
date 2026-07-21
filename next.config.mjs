import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Placeholder architectural backdrops ship as SVGs until TT Design
    // supplies the real project photography. Swapping in JPG/WebP later
    // needs no further config change.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // WebP only. AVIF encodes a SECOND variant of every width (one
    // transformation per format), roughly doubling Vercel image usage for a
    // ~20% file-size win that photography barely shows.
    formats: ['image/webp'],
    // Four widths, trimmed from seven, chosen to cover what the `sizes` props
    // in this codebase actually request: low-DPR mobile, 2x mobile, 3x mobile
    // / tablet, and large desktop (hero at 50vw and the 90vw lightbox both
    // need 1920 on a 1080p+ monitor, so that stays).
    deviceSizes: [640, 828, 1280, 1920],
    imageSizes: [128, 256, 384],
    // Project photography is static and content-addressed by deploy, so keep
    // transformed variants cached far longer than the 60s default — repeat
    // views then cost nothing instead of re-transforming.
    minimumCacheTTL: 2678400, // 31 days
  },
};

export default withNextIntl(nextConfig);
