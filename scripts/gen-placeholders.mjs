// Generates light, architectural placeholder images (blueprint + drafting-frame
// composition) so the hero/cards read as real visuals before TT Design supplies
// project photography. Intentionally abstract — no fabricated interiors.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');

const rand = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Faint blueprint grid
function grid(w, h, step) {
  let out = '';
  for (let x = step; x < w; x += step) {
    out += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#1E1810" stroke-width="1" stroke-opacity="0.035"/>`;
  }
  for (let y = step; y < h; y += step) {
    out += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#1E1810" stroke-width="1" stroke-opacity="0.035"/>`;
  }
  return out;
}

// Overlapping thin drafting frames (the signature device)
function frames(seed, w, h) {
  let out = '';
  for (let i = 0; i < 3; i++) {
    const rw = Math.round((0.34 + rand(seed + i) * 0.3) * w);
    const rh = Math.round((0.34 + rand(seed + i + 5) * 0.34) * h);
    const x = Math.round((0.08 + rand(seed + i + 2) * 0.55) * (w - rw));
    const y = Math.round((0.08 + rand(seed + i + 9) * 0.55) * (h - rh));
    const op = (0.16 - i * 0.04).toFixed(3);
    out += `<rect x="${x}" y="${y}" width="${rw}" height="${rh}" fill="none" stroke="#1E1810" stroke-width="1.5" stroke-opacity="${op}"/>`;
  }
  return out;
}

// A few bold structural diagonals
function diagonals(seed, w, h) {
  let out = '';
  for (let i = 0; i < 4; i++) {
    const x1 = Math.round(rand(seed + i) * w);
    const y1 = Math.round(rand(seed + i + 3) * h);
    const x2 = Math.round(rand(seed + i + 7) * w);
    const y2 = Math.round(rand(seed + i + 11) * h);
    out += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1E1810" stroke-width="1" stroke-opacity="0.06"/>`;
  }
  return out;
}

function svg({ label, no, seed, w = 1600, h = 1200, accent = '#CF2929' }) {
  const cx = Math.round((0.2 + rand(seed) * 0.25) * w);
  const cy = Math.round((0.2 + rand(seed + 4) * 0.25) * h);
  const r = Math.round((0.28 + rand(seed + 2) * 0.18) * h);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs>
    <radialGradient id="g${seed}" cx="28%" cy="22%" r="115%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="48%" stop-color="#F1EFEA"/>
      <stop offset="100%" stop-color="#DDD9D1"/>
    </radialGradient>
    <linearGradient id="a${seed}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.10"/>
      <stop offset="60%" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g${seed})"/>
  ${grid(w, h, 64)}
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#1E1810" stroke-width="1.5" stroke-opacity="0.10"/>
  <circle cx="${cx}" cy="${cy}" r="${Math.round(r * 0.62)}" fill="none" stroke="#1E1810" stroke-width="1" stroke-opacity="0.08"/>
  ${diagonals(seed, w, h)}
  ${frames(seed, w, h)}
  <rect width="${w}" height="${h}" fill="url(#a${seed})"/>
  <rect x="0" y="0" width="6" height="${Math.round(h * 0.16)}" fill="${accent}" fill-opacity="0.85"/>
  <rect x="0" y="0" width="${Math.round(w * 0.12)}" height="6" fill="${accent}" fill-opacity="0.85"/>
  <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle"
    font-family="Archivo, Arial, sans-serif" font-weight="900"
    font-size="${Math.round(w / 9)}" letter-spacing="${Math.round(w / 130)}"
    fill="#1E1810" fill-opacity="0.07">${label}</text>
  <text x="6.5%" y="13%" font-family="Archivo, Arial, sans-serif" font-weight="700"
    font-size="${Math.round(w / 46)}" letter-spacing="5"
    fill="${accent}" fill-opacity="0.7">${no}</text>
</svg>`;
}

const assets = [
  { file: 'hotel.svg', label: 'OTEL', no: '01 / 04', seed: 11 },
  { file: 'villa.svg', label: 'VILLA', no: '02 / 04', seed: 23 },
  { file: 'business.svg', label: 'İŞ MERKEZİ', no: '03 / 04', seed: 37 },
  { file: 'residence.svg', label: 'KONUT', no: '04 / 04', seed: 51 },
  { file: 'letven-before.svg', label: 'ÖNCE', no: 'LETVEN', seed: 71, accent: '#8A8378' },
  { file: 'letven-after.svg', label: 'SONRA', no: 'LETVEN', seed: 83, accent: '#CF2929' },
];

await mkdir(OUT, { recursive: true });
for (const a of assets) {
  await writeFile(join(OUT, a.file), svg(a), 'utf8');
  console.log('wrote', a.file);
}

// Per-category gallery sets (6 each, varied aspect for a masonry layout)
const galleryCats = [
  { key: 'hotel', label: 'OTEL', seed: 101 },
  { key: 'villa', label: 'VILLA', seed: 211 },
  { key: 'business', label: 'İŞ MERKEZİ', seed: 331 },
  { key: 'residence', label: 'KONUT', seed: 421 },
];
await mkdir(join(OUT, 'gallery'), { recursive: true });
for (const c of galleryCats) {
  for (let n = 1; n <= 6; n++) {
    const s = c.seed + n * 17;
    const shape = n % 3 === 0 ? [1400, 1040] : n % 2 === 0 ? [1300, 1680] : [1400, 1180];
    await writeFile(
      join(OUT, 'gallery', `${c.key}-${n}.svg`),
      svg({ label: c.label, no: `${String(n).padStart(2, '0')} / 06`, seed: s, w: shape[0], h: shape[1] }),
      'utf8',
    );
  }
  console.log('wrote gallery', c.key);
}
console.log('done');
