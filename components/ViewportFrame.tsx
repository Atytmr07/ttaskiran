// Persistent thin inset frame around the full viewport with corner brackets
// (Section 2). Rendered once at the layout level. Purely decorative.
export default function ViewportFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-3 z-50 md:inset-5"
    >
      <div className="frame-outline h-full w-full" />
      {/* Corner bracket marks */}
      <CornerBracket className="left-0 top-0" />
      <CornerBracket className="right-0 top-0 rotate-90" />
      <CornerBracket className="bottom-0 right-0 rotate-180" />
      <CornerBracket className="bottom-0 left-0 -rotate-90" />
    </div>
  );
}

function CornerBracket({ className }: { className?: string }) {
  return (
    <span
      className={`absolute h-4 w-4 md:h-5 md:w-5 ${className ?? ''}`}
      style={{
        borderTop: '1px solid rgba(207,41,41,0.75)',
        borderLeft: '1px solid rgba(207,41,41,0.75)',
      }}
    />
  );
}
