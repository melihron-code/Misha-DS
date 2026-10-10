import ColorsSection from './ColorsSection'
import EffectsSection from './EffectsSection'
import RadiusSection from './RadiusSection'
import SpacingSection from './SpacingSection'
import TypographySection from './TypographySection'

// Sidebar order; slug is the URL segment (/ds-dev/<slug>).
export const SECTIONS = [
  { slug: 'colors', label: 'Colors', Component: ColorsSection },
  { slug: 'typography', label: 'Typography', Component: TypographySection },
  { slug: 'spacing', label: 'Spacing', Component: SpacingSection },
  { slug: 'radius', label: 'Radius', Component: RadiusSection },
  { slug: 'effects', label: 'Effects', Component: EffectsSection },
]
