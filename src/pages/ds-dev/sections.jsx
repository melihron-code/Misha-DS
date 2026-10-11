import { ATOM_PAGES } from './atoms/atomDocs'
import ColorsSection from './ColorsSection'
import ComponentsPage from './docs/ComponentsPage'
import EffectsSection from './EffectsSection'
import { MOLECULE_PAGES } from './molecules/moleculeDocs'
import { ORGANISM_PAGES } from './organisms/organismDocs'
import RadiusSection from './RadiusSection'
import SpacingSection from './SpacingSection'
import TypographySection from './TypographySection'

// A sidebar item for a scrolling component page (Atoms, Molecules, Organisms): its pages are the submenu.
const componentsItem = (base, label, pages) => ({
  path: base,
  label,
  render: () => <ComponentsPage key={base} base={base} pages={pages} />,
  children: pages.map(page => ({ path: `${base}/${page.slug}`, label: page.label })),
})

// Sidebar items. `path` is the URL under /ds-dev/; `children` are shown as a submenu while their
// section is open, and are parts of their parent's page (it scrolls to them).
export const NAV = [
  { path: 'colors', label: 'Colors', render: () => <ColorsSection /> },
  { path: 'typography', label: 'Typography', render: () => <TypographySection /> },
  { path: 'spacing', label: 'Spacing', render: () => <SpacingSection /> },
  { path: 'radius', label: 'Radius', render: () => <RadiusSection /> },
  { path: 'effects', label: 'Effects', render: () => <EffectsSection /> },
  componentsItem('atoms', 'Atoms', ATOM_PAGES),
  componentsItem('molecules', 'Molecules', MOLECULE_PAGES),
  componentsItem('organisms', 'Organisms', ORGANISM_PAGES),
]

// The sidebar item whose page shows `path` (itself, or the parent of a submenu item).
export const pageFor = path => NAV.find(i => i.path === path || i.children?.some(c => c.path === path))
