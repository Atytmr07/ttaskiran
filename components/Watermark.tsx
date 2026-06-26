// Oversized low-opacity "ghost" watermark word bleeding behind a section's
// eyebrow label (Section 3, rule 3). Non-interactive, aria-hidden.
//
// `whitespace-nowrap` keeps two-word labels ("ÖNCE / SONRA", "İŞ ORTAKLARI")
// on one line, and the clamp is sized so long Turkish words ("PROJELER") still
// read on narrow viewports instead of overflowing/clipping mid-word.
export default function Watermark({
  children,
  className = '',
  position = 'left',
}: {
  children: React.ReactNode;
  className?: string;
  position?: 'left' | 'center' | 'right';
}) {
  const align =
    position === 'center'
      ? 'left-1/2 -translate-x-1/2 text-center'
      : position === 'right'
        ? 'right-0 text-right'
        : 'left-0 text-left';

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 -z-0 max-w-[96vw] select-none whitespace-nowrap font-display font-black uppercase leading-none tracking-tight text-ivory/[0.05] ${align} ${className}`}
      style={{ fontSize: 'clamp(3.25rem, 11vw, 9.5rem)' }}
    >
      {children}
    </span>
  );
}
