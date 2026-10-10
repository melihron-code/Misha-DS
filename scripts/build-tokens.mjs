// Generates src/styles/tokens.css from src/ds/foundations.js.
// usage: npm run tokens   (after editing src/ds/foundations.js)
import { writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const root = process.argv[2] || process.cwd()
const f = await import(pathToFileURL(path.join(root, 'src/ds/foundations.js')).href)
const ref = name => {
  const v = f.cssVarOf(name)
  if (!v) throw new Error('No CSS var for alias ' + name)
  return `var(${v})`
}
const fontVar = n => [...f.fontPrimitives].find(p => p.figma === n).cssVar
const px = n => (n === 0 ? '0' : n + 'px')
const fallback = fam => (fam === 'Instrument Serif' ? 'serif' : fam === 'Pixform' ? 'monospace' : 'sans-serif')
const L = []
const w = s => L.push(s)

w(`/* Design-system foundations. Generated from src/ds/foundations.js (Figma
   file dPIEJfY3Ma8tiCOcO9LXJO). Names follow Figma, see NOTES.md.
   Kept outside @layer on purpose so these :root values always win over
   Tailwind's generated theme variables. */

/* ---------- Fonts ---------- */
@font-face {
  font-family: "Akkurat LL Cyr TT";
  src: url("../assets/fonts/AkkuratLLCyrTT-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Akkurat LL Cyr TT";
  src: url("../assets/fonts/AkkuratLLCyrTT-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Pixform";
  src: url("../assets/fonts/Pixform.otf") format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
/* Instrument Serif and Inter are loaded from Google Fonts in index.html. */
`)

w(`/* ---------- Primitives (Figma: Primitives / Value) ---------- */
:root {`)
w('  /* color */')
for (const c of f.primitiveColors) w(`  ${c.cssVar}: ${c.hex};`)
w('  /* space */')
for (const s of f.spacePrimitives) w(`  ${s.cssVar}: ${px(s.px)};`)
w('  /* radius */')
for (const r of f.radiusPrimitives) w(`  ${r.cssVar}: ${px(r.px)};`)
w('  /* font */')
for (const p of f.fontPrimitives) w(`  ${p.cssVar}: ${p.value ? `"${p.value}"` : px(p.px)};`)
w('  /* size */')
for (const s of f.sizePrimitives) w(`  ${s.cssVar}: ${px(s.px)};`)
w('}\n')

w(`/* ---------- Tokens (Figma: Tokens / Light) — aliases only ---------- */
:root {`)
let group = ''
for (const t of f.colorTokens) {
  const g = t.figma.split('/')[0]
  if (g !== group) { w(`  /* ${g} */`); group = g }
  w(`  ${t.cssVar}: ${ref(t.alias)};`)
}
w('  /* indents */')
for (const s of f.spacingTokens) w(`  ${s.cssVar}: ${ref(s.alias)};`)
w('  /* rounds */')
for (const r of f.radiusTokens) w(`  ${r.cssVar}: ${ref(r.alias)};`)
w('  /* font */')
for (const t of f.fontTokens) w(`  ${t.cssVar}: var(${fontVar(t.alias)});`)
w('  /* size */')
for (const s of f.sizeTokens) w(`  ${s.cssVar}: ${ref(s.alias)};`)
w('  /* motion (code only) */')
for (const m of f.motion) w(`  ${m.cssVar}: ${m.value};`)
w('}\n')

w(`/* ---------- Tailwind theme ----------
   Tailwind's default palette, spacing scale, radii, shadows, fonts and type
   scale are removed: only design-system values produce classes. */
@theme inline {
  --color-*: initial;
  --spacing-*: initial;
  --radius-*: initial;
  --shadow-*: initial;
  --inset-shadow-*: initial;
  --drop-shadow-*: initial;
  --text-*: initial;
  --font-*: initial;
  --leading-*: initial;
  --tracking-*: initial;
  --container-*: initial;
`)
w('  /* colors → bg-surface-card, text-text-primary, border-border-default … */')
for (const t of f.colorTokens) w(`  --color-${t.cssVar.slice(2)}: var(${t.cssVar});`)
w('\n  /* spacing → p-indents-xs, gap-indents-s-inner, ml-indents-neg-xs … */')
for (const s of f.spacingTokens) w(`  --spacing-${s.key}: var(${s.cssVar});`)
w('  /* zero is not a design value, but layout needs it: top-0, inset-0, m-0, p-0, gap-0 */')
w('  --spacing-0: 0px;')
w('\n  /* radius → rounded-radius-s … */')
for (const r of f.radiusTokens) w(`  --radius-${r.cssVar.slice(2)}: var(${r.cssVar});`)
w('\n  /* font families → font-pixel, font-grotesk, font-antiqa */')
for (const t of f.fontTokens.filter(t => t.tw)) w(`  --font-${t.tw.replace('font-', '')}: var(${t.cssVar}), ${fallback(f.fontPrimitives.find(p => p.figma === t.alias).value)};`)
w('\n  /* sizes → max-w-size-base-with, w-size-base-with */')
for (const s of f.sizeTokens) w(`  --container-${s.cssVar.slice(2)}: var(${s.cssVar});`)
w('}\n')

w('/* ---------- Effects → shadow-card (no effect styles in Figma; the one shadow used in the designs) ---------- */')
w('@theme {')
for (const s of f.shadows) w(`  ${s.cssVar}: ${px(s.x)} ${px(s.y)} ${px(s.blur)} ${px(s.spread)} var(${f.colorTokens.find(t => t.figma === s.color).cssVar});`)
w('}\n')

w('/* ---------- Text styles (Figma text styles) ---------- */')
for (const t of f.textStyles) {
  const fam = t.familyVar ? `var(${t.familyVar}), ${fallback(t.family)}` : `"${t.family}", ${fallback(t.family)}`
  const ls = t.letterSpacing === 0 ? '0' : (t.letterSpacing / 100) + 'em'
  w(`/* ${t.figma}: ${t.family} ${t.weightName} ${t.size}/${t.lineHeight}, ${t.letterSpacing}%${t.textCase === 'uppercase' ? ', UPPER' : ''} */`)
  w(`@utility ${t.tw} {
  font-family: ${fam};
  font-size: ${t.sizeVar ? `var(${t.sizeVar})` : px(t.size)};
  font-weight: ${t.weight};
  line-height: ${px(t.lineHeight)};
  letter-spacing: ${ls};
  --text-letter-spacing: ${ls};
  text-transform: ${t.textCase};
}`)
}

writeFileSync(path.join(root, 'src/styles/tokens.css'), L.join('\n') + '\n')
console.log('wrote tokens.css,', L.length, 'lines')
