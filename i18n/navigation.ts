import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware navigation primitives (replaces next/link & next/navigation
// for internal routes so /tr and /en prefixes are handled automatically).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
