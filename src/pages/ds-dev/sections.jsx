import AtomPage from './atoms/AtomPage'
import { ATOM_DOCS } from './atoms/atomDocs'
import IconsPage from './atoms/IconsPage'
import ColorsSection from './ColorsSection'
import EffectsSection from './EffectsSection'
import RadiusSection from './RadiusSection'
import SpacingSection from './SpacingSection'
import TypographySection from './TypographySection'

// Sidebar groups. `path` is the URL under /ds-dev/.
export const GROUPS = [
  {
    label: 'Foundations',
    items: [
      { path: 'colors', label: 'Colors', render: () => <ColorsSection /> },
      { path: 'typography', label: 'Typography', render: () => <TypographySection /> },
      { path: 'spacing', label: 'Spacing', render: () => <SpacingSection /> },
      { path: 'radius', label: 'Radius', render: () => <RadiusSection /> },
      { path: 'effects', label: 'Effects', render: () => <EffectsSection /> },
    ],
  },
  {
    label: 'Atoms',
    items: [
      { path: 'atoms/icons', label: 'Icons', render: () => <IconsPage /> },
      ...ATOM_DOCS.map(doc => ({ path: `atoms/${doc.slug}`, label: doc.name, render: () => <AtomPage doc={doc} /> })),
    ],
  },
]

export const ITEMS = GROUPS.flatMap(g => g.items)
