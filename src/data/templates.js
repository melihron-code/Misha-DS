// Templates (Figma: the document list on all-teams-templates). Figma lists these 8 twice (16 rows); so do we.
// `type` is what the hero toggle filters by (Automations, Documents, Access).
const TEMPLATES = [
  ['Doc list for analysis', 'Document', '12.01.2024'],
  ['Doc list for visa', 'Document', '02.02.2024'],
  ['Marketing Funnel', 'Automation', '15.03.2024'],
  ['Passport data', 'Document', '29.03.2024'],
  ['Access C-level', 'Access', '01.04.2024'],
  ['Doc list for designers', 'Document', '17.04.2024'],
  ['Hiring Funnel v.61', 'Automation', '03.05.2024'],
  ['Hiring Funnel v.24', 'Automation', '19.05.2024'],
]

export const templates = [...TEMPLATES, ...TEMPLATES].map(([title, type, date], i) => ({
  id: `template-${i + 1}`,
  title,
  type,
  author: 'created by Esmeralda',
  date,
}))

// The hero toggle's views (heroes.js → templatesHero) and the type each one shows; `all` shows everything.
export const templateTypeByView = { automations: 'Automation', documents: 'Document', access: 'Access' }
