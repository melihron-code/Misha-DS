// Lists class names used in src/ that have no rule in the built CSS.
// Tailwind drops unknown classes silently (e.g. top-0 vanished when the default
// spacing scale was switched off). usage: npm run check:classes (after npm run build)
import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2] || process.cwd()
const assets = path.join(root, 'dist/assets')
const css = fs.readFileSync(path.join(assets, fs.readdirSync(assets).find(f => f.endsWith('.css'))), 'utf8')

const files = []
const walk = d => fs.readdirSync(d).forEach(f => {
  const p = path.join(d, f)
  if (fs.statSync(p).isDirectory()) walk(p)
  else if (/\.jsx?$/.test(f)) files.push(p)
})
walk(path.join(root, 'src'))

// Candidate class lists: className="…", className={`…`} and tw: '…' strings.
const used = new Map()
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8')
  for (const m of src.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})|tw: '([^']*)'/g)) {
    const text = (m[1] ?? m[2] ?? m[3]).replace(/\$\{[^}]*\}/g, ' ')
    for (const c of text.split(/\s+/)) if (c && !c.includes("'")) used.set(c, path.relative(root, f))
  }
}
// Class strings inside ternaries: 'bg-x text-y'
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8')
  for (const m of src.matchAll(/\? '([^']*)' : '([^']*)'/g)) for (const c of (m[1] + ' ' + m[2]).split(/\s+/)) if (c.includes('-')) used.set(c, path.relative(root, f))
}

const selector = c => '.' + c.replace(/[:/@]/g, ch => '\\' + ch)
const missing = [...used].filter(([c]) => !css.includes(selector(c) + '{') && !css.includes(selector(c) + ':') && !css.includes(selector(c) + ','))
console.log(`checked ${used.size} classes`)
console.log(missing.length ? 'MISSING:\n' + missing.map(([c, f]) => `  ${c}  (${f})`).join('\n') : 'missing: none')
if (missing.length) process.exit(1)
