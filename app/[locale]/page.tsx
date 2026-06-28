import { setRequestLocale, getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import TrustMetrics from '@/components/TrustMetrics';
import ServiceCategories from '@/components/ServiceCategories';
import FeaturedProjects from '@/components/FeaturedProjects';
import Capabilities from '@/components/Capabilities';
import CraftsmanshipProcess from '@/components/CraftsmanshipProcess';
import BeforeAfterShowcase from '@/components/BeforeAfterShowcase';
import Philosophy from '@/components/Philosophy';
import ClientLogos from '@/components/ClientLogos';
import FAQ from '@/components/FAQ';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';
import SectionProgress from '@/components/SectionProgress';
import { ADDRESS_LINE, PHONE_DISPLAY, EMAIL, SOCIAL } from '@/lib/site';

const SITE_URL = 'https://ttaskiran.com';

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const tNav = await getTranslations('Nav');
  const tProc = await getTranslations('Process');
  const tFaq = await getTranslations('FAQ');
  const tCon = await getTranslations('Contact');
  const tCap = await getTranslations('Capabilities');
  const tFeat = await getTranslations('Featured');

  const sections = [
    { id: 'anasayfa', label: tNav('home') },
    { id: 'hizmetlerimiz', label: tNav('services') },
    { id: 'projeler', label: tFeat('eyebrow') },
    { id: 'kapsam', label: tCap('watermark') },
    { id: 'surec', label: tProc('watermark') },
    { id: 'referans', label: 'Letven' },
    { id: 'hakkimizda', label: tNav('about') },
    { id: 'sss', label: tFaq('watermark') },
    { id: 'iletisim', label: tNav('contact') },
  ];

  // LocalBusiness + GeneralContractor structured data (Section 2)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['GeneralContractor', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: 'TT Design — TT Aşkıran',
    description: tCon('intro'),
    url: `${SITE_URL}/${locale}`,
    telephone: PHONE_DISPLAY,
    email: EMAIL,
    image: `${SITE_URL}/logo.jpg`,
    logo: `${SITE_URL}/logo.jpg`,
    priceRange: '₺₺₺',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Varlık Mh. Hızır Reis Cad. No:29/3',
      addressLocality: 'Muratpaşa',
      addressRegion: 'Antalya',
      addressCountry: 'TR',
    },
    areaServed: { '@type': 'City', name: 'Antalya' },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    knowsAbout: [
      'Hotel renovation',
      'Villa renovation',
      'Business center fit-out',
      'Residential renovation',
    ],
    sameAs: [SOCIAL.instagram.url, SOCIAL.facebook.url],
    fullAddress: ADDRESS_LINE,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <SectionProgress sections={sections} />
      <main>
        <Hero />
        <Marquee />
        <TrustMetrics />
        <ServiceCategories />
        <FeaturedProjects />
        <Capabilities />
        <CraftsmanshipProcess />
        <BeforeAfterShowcase />
        <Philosophy />
        <ClientLogos />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
