// Small brass corner ticks that sit on the edges of a 1px-outline frame —
// the precise "drafting sheet" detail from the reference. Render inside any
// `relative` framed element. Purely decorative.
export default function FrameCorners({
  size = 'h-3 w-3',
  color = 'border-brass',
}: {
  size?: string;
  color?: string;
}) {
  // 0 offset (not -px) so the ticks survive inside overflow-hidden frames.
  const base = `pointer-events-none absolute ${size} ${color}`;
  return (
    <span aria-hidden="true">
      <span className={`${base} left-0 top-0 border-l border-t`} />
      <span className={`${base} right-0 top-0 border-r border-t`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}
