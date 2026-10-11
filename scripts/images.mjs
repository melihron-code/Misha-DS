// npm run images: makes the WebP images the site uses, at the widths each one needs (srcset), from the source
// files next to them. Sources stay in the repo so the WebPs can be remade; only the WebPs are imported.
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets')

// [source, output name, widths, quality]
const JOBS = [
  // HeroSection's backdrop: the page is up to 1440 wide (2880 for 2× screens); 768 for phones and tablets.
  ['hero/backdrop.jpg', 'hero/backdrop', [768, 1440, 2880], 72],
  // HeroCard's photo (with-bg): up to the 830px card (1536 for 2× screens).
  ['hero/photo.jpg', 'hero/photo', [768, 1536], 72],
  // Avatar: a 30px circle (1× and 2×).
  ...['katya', 'petya', 'dog'].map(name => [`avatars/${name}.png`, `avatars/${name}`, [30, 60], 80]),
]

for (const [source, name, widths, quality] of JOBS) {
  for (const width of widths) {
    const out = join(root, `${name}-${width}.webp`)
    const info = await sharp(join(root, source)).resize({ width }).webp({ quality }).toFile(out)
    console.log(`${name}-${width}.webp  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`)
  }
}
