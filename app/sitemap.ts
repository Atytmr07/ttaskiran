import type { MetadataRoute } from 'next';
import { CATEGORY_KEYS } from '@/lib/site';

const SITE = 'https://ttaskiran.com';

// One entry per localized page, each with its tr/en alternates (hreflang).
function entry(
  trPath: string,
  enPath: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
): MetadataRoute.Sitemap {
  const languages = { tr: `${SITE}${trPath}`, en: `${SITE}${enPath}` };
  const lastModified = new Date();
  return [
    { url: `${SITE}${trPath}`, lastModified, changeFrequency, priority, alternates: { languages } },
    { url: `${SITE}${enPath}`, lastModified, changeFrequency, priority: Math.max(0.1, priority - 0.1), alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entry('/tr', '/en', 1, 'monthly'),
    ...entry('/tr/iletisim', '/en/contact', 0.8, 'yearly'),
    ...CATEGORY_KEYS.flatMap((key) =>
      entry(`/tr/projeler/${key}`, `/en/projects/${key}`, 0.85, 'monthly'),
    ),
  ];
}
