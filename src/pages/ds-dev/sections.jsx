import { ATOM_PAGES } from './atoms/atomDocs'
import AtomsPage from './atoms/AtomsPage'
import ColorsSection from './ColorsSection'
import EffectsSection from './EffectsSection'
import RadiusSection from './RadiusSection'
import SpacingSection from './SpacingSection'
import TypographySection from './TypographySection'

// Sidebar items. `path` is the URL under /ds-dev/; `children` are shown as a submenu and
// are parts of their parent's page (the Atoms page scrolls to them).
export const NAV = [
  { path: 'colors', label: 'Colors', render: () => <ColorsSection /> },
  { path: 'typography', label: 'Typography', render: () => <TypographySection /> },
  { path: 'spacing', label: 'Spacing', render: () => <SpacingSection /> },
  { path: 'radius', label: 'Radius', render: () => <RadiusSection /> },
  { path: 'effects', label: 'Effects', render: () => <EffectsSection /> },
  {
    path: 'atoms',
    label: 'Atoms',
    render: () => <AtomsPage />,
    children: ATOM_PAGES.map(page => ({ path: `atoms/${page.slug}`, label: page.label })),
  },
]

// The sidebar item whose page shows `path` (itself, or the parent of a submenu item).
export const pageFor = path => NAV.find(i => i.path === path || i.children?.some(c => c.path === path))
