import Image from 'next/image';

// The brand lockup (1094×376, side margins trimmed for a tighter, larger mark).
// Shown at its natural ratio — no cropping, so it never distorts. Height comes
// from className.
export default function Logo({
  priority = false,
  className = '',
}: {
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src="/logo.png"
      alt="TT Design"
      width={1094}
      height={376}
      priority={priority}
      sizes="420px"
      className={className}
    />
  );
}
