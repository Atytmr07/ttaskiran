'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

export type Country = { iso: string; name: string; dial: string };

// Turkey first (most visitors), then markets relevant to Antalya hospitality.
export const COUNTRIES: Country[] = [
  { iso: 'TR', name: 'Türkiye', dial: '+90' },
  { iso: 'DE', name: 'Germany', dial: '+49' },
  { iso: 'GB', name: 'United Kingdom', dial: '+44' },
  { iso: 'RU', name: 'Russia', dial: '+7' },
  { iso: 'NL', name: 'Netherlands', dial: '+31' },
  { iso: 'UA', name: 'Ukraine', dial: '+380' },
  { iso: 'FR', name: 'France', dial: '+33' },
  { iso: 'BE', name: 'Belgium', dial: '+32' },
  { iso: 'AT', name: 'Austria', dial: '+43' },
  { iso: 'CH', name: 'Switzerland', dial: '+41' },
  { iso: 'SE', name: 'Sweden', dial: '+46' },
  { iso: 'NO', name: 'Norway', dial: '+47' },
  { iso: 'DK', name: 'Denmark', dial: '+45' },
  { iso: 'FI', name: 'Finland', dial: '+358' },
  { iso: 'PL', name: 'Poland', dial: '+48' },
  { iso: 'IT', name: 'Italy', dial: '+39' },
  { iso: 'ES', name: 'Spain', dial: '+34' },
  { iso: 'RO', name: 'Romania', dial: '+40' },
  { iso: 'BG', name: 'Bulgaria', dial: '+359' },
  { iso: 'GR', name: 'Greece', dial: '+30' },
  { iso: 'CZ', name: 'Czechia', dial: '+420' },
  { iso: 'US', name: 'United States', dial: '+1' },
  { iso: 'AE', name: 'United Arab Emirates', dial: '+971' },
  { iso: 'SA', name: 'Saudi Arabia', dial: '+966' },
  { iso: 'QA', name: 'Qatar', dial: '+974' },
  { iso: 'KW', name: 'Kuwait', dial: '+965' },
  { iso: 'AZ', name: 'Azerbaijan', dial: '+994' },
  { iso: 'GE', name: 'Georgia', dial: '+995' },
  { iso: 'IL', name: 'Israel', dial: '+972' },
  { iso: 'IR', name: 'Iran', dial: '+98' },
  { iso: 'KZ', name: 'Kazakhstan', dial: '+7' },
];

export function countryFor(iso: string): Country {
  return COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES[0];
}

// Regional-indicator flag (renders as a flag on iOS/Android/macOS; Windows
// desktop falls back to the ISO letters — still legible, and we show the dial
// code alongside it regardless).
export function flagEmoji(iso: string): string {
  return iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

export default function PhoneField({
  id,
  country,
  national,
  onCountry,
  onNational,
  placeholder,
  searchPlaceholder,
}: {
  id: string;
  country: string;
  national: string;
  onCountry: (iso: string) => void;
  onNational: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);
  const selected = countryFor(country);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.iso.toLowerCase().includes(q) ||
          c.dial.includes(q),
      )
    : COUNTRIES;

  return (
    <div ref={wrapRef} className="relative">
      <div className="flex w-full bg-graphite frame-outline-strong transition-colors focus-within:border-brass">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`${selected.name} ${selected.dial}`}
          className="flex shrink-0 items-center gap-1.5 border-r border-frame px-3 font-body text-ivory transition-colors hover:text-brass"
        >
          <span className="text-base leading-none">{flagEmoji(selected.iso)}</span>
          <span className="text-sm font-semibold tracking-tight">
            {selected.dial}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted/60 transition-transform ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={national}
          onChange={(e) => onNational(e.target.value)}
          placeholder={placeholder}
          className="w-full flex-1 bg-transparent px-4 py-3 font-body text-base text-ivory placeholder:text-muted/50 focus:outline-none"
        />
      </div>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 max-h-72 w-72 max-w-[calc(100vw-2.5rem)] overflow-auto bg-graphite frame-outline shadow-xl">
          <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-frame bg-graphite px-3 py-2">
            <Search className="h-4 w-4 text-muted/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              className="w-full bg-transparent font-body text-sm text-ivory placeholder:text-muted/50 focus:outline-none"
            />
          </div>
          <ul role="listbox" aria-label="Country code">
            {filtered.map((c) => {
              const isActive = c.iso === country;
              return (
                <li key={c.iso}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      onCountry(c.iso);
                      setOpen(false);
                      setQuery('');
                    }}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left font-body text-sm transition-colors hover:bg-surface ${
                      isActive ? 'text-brass' : 'text-ivory/80'
                    }`}
                  >
                    <span className="text-base leading-none">
                      {flagEmoji(c.iso)}
                    </span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="shrink-0 text-muted/60">{c.dial}</span>
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="px-3 py-3 font-body text-sm text-muted/60">—</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
