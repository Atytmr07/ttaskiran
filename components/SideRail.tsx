import { useTranslations } from 'next-intl';
import { InstagramIcon, FacebookIcon } from './Icons';
import { SOCIAL } from '@/lib/site';

// Fixed vertical brand strip on the far-left edge (Section 5A). Desktop only —
// hidden below lg to avoid clutter on mobile.
export default function SideRail() {
  const t = useTranslations('SideRail');

  return (
    <aside
      aria-hidden="false"
      className="pointer-events-none fixed inset-y-0 left-5 z-40 hidden w-10 flex-col items-center justify-between py-10 lg:flex"
    >
      {/* top tick */}
      <span className="h-10 w-px bg-frame" aria-hidden="true" />

      {/* rotated brand line */}
      <span className="vertical-rl pointer-events-auto rotate-180 font-body text-[11px] font-medium uppercase tracking-widest2 text-muted/70">
        {t('brand')}
      </span>

      {/* social stack */}
      <div className="pointer-events-auto flex flex-col items-center gap-4">
        <a
          href={SOCIAL.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram ${SOCIAL.instagram.handle}`}
          className="text-muted/70 transition-colors duration-300 hover:text-brass"
        >
          <InstagramIcon className="h-[18px] w-[18px]" />
        </a>
        <a
          href={SOCIAL.facebook.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Facebook ${SOCIAL.facebook.handle}`}
          className="text-muted/70 transition-colors duration-300 hover:text-brass"
        >
          <FacebookIcon className="h-[18px] w-[18px]" />
        </a>
        <span className="mt-1 h-10 w-px bg-frame" aria-hidden="true" />
      </div>
    </aside>
  );
}
