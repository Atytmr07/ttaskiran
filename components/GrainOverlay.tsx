// Fixed, ultra-subtle film grain over the whole site for a tactile,
// "designed" surface. Pure SVG (no asset), non-interactive, sits below the
// navbar and viewport frame. Static — no motion, so reduced-motion safe.
const NOISE = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`,
)}`;

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] opacity-[0.035] [mix-blend-mode:multiply]"
      style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: '160px 160px' }}
    />
  );
}
