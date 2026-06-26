// Copies the user's real project images (folders with spaces/Turkish/special
// characters) into web-safe slugs under public/projects/<slug>/NN.<ext>, reads
// each image's real dimensions, and writes lib/projects.json used by the site.
import { readdir, mkdir, copyFile, writeFile, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const PUB = 'public';
const OUT = join(PUB, 'projects');

// Source folder → web slug / display name / service category
const MAP = [
  { dir: 'St Regis', slug: 'st-regis', name: 'St. Regis — Süit', category: 'hotel' },
  { dir: 'Nautilus 220', slug: 'nautilus-220', name: 'Nautilus 220 — Wellness & Spa', category: 'hotel' },
  { dir: 'Letven Ofis', slug: 'letven-ofis', name: 'Letven Ofis', category: 'business' },
  { dir: 'Sama Al Manar', slug: 'sama-al-manar', name: 'Sama Al Manar', category: 'business' },
  { dir: 'Gebze Senamed İs merkezi', slug: 'gebze-senamed', name: 'Gebze Senamed İş Merkezi', category: 'business' },
  { dir: 'Ariel Medical Kongo', slug: 'ariel-medical', name: 'Ariel Medical — Kongo', category: 'business' },
  { dir: 'Horizon', slug: 'horizon', name: 'Horizon Konut', category: 'residence' },
  { dir: 'konut', slug: 'konut', name: 'Konut Projesi', category: 'residence' },
  { dir: 'villa', slug: 'villa', name: 'Villa Projesi', category: 'villa' },
];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) out.push(p);
  }
  return out;
}

function pngSize(b) {
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}
function jpegSize(b) {
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
      return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}
async function imageSize(file) {
  const b = await readFile(file);
  if (b[0] === 0x89 && b[1] === 0x50) return pngSize(b);
  if (b[0] === 0xff && b[1] === 0xd8) return jpegSize(b);
  return { w: 1600, h: 1200 };
}

const projects = [];
for (const m of MAP) {
  let files;
  try {
    files = await walk(join(PUB, m.dir));
  } catch {
    console.warn('skip (not found):', m.dir);
    continue;
  }
  files.sort((a, b) => a.localeCompare(b, 'tr'));
  const destDir = join(OUT, m.slug);
  await mkdir(destDir, { recursive: true });

  const images = [];
  let i = 1;
  for (const f of files) {
    let ext = extname(f).toLowerCase();
    if (ext === '.jpeg') ext = '.jpg';
    const name = String(i).padStart(2, '0') + ext;
    await copyFile(f, join(destDir, name));
    const { w, h } = await imageSize(f);
    images.push({ src: `/projects/${m.slug}/${name}`, w, h });
    i++;
  }
  projects.push({ slug: m.slug, name: m.name, category: m.category, cover: images[0]?.src, images });
  console.log(m.slug, '→', images.length, 'images');
}

await writeFile(join('lib', 'projects.json'), JSON.stringify(projects, null, 2));
console.log('wrote lib/projects.json with', projects.length, 'projects');
