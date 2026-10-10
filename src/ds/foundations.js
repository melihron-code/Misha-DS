// Design-system foundations, read from Figma (file dPIEJfY3Ma8tiCOcO9LXJO,
// collections "Primitives" and "Tokens", local text and effect styles).
// src/styles/tokens.css implements these; the /ds-dev/ page documents them.
//
// Figma name → CSS variable: lowercase, "/" and spaces → "-", brackets
// dropped, a leading "-" (negative value) → "neg-".
// e.g. color/neutral/900 → --color-neutral-900, indents/S (inner) → --indents-s-inner,
// indents/-XS → --indents-neg-xs, space/-8 → --space-neg-8.

export const primitiveColors = [
  { figma: 'color/neutral/0', cssVar: '--color-neutral-0', hex: '#ffffff' },
  { figma: 'color/neutral/50', cssVar: '--color-neutral-50', hex: '#f2f2f2' },
  { figma: 'color/neutral/100', cssVar: '--color-neutral-100', hex: '#eaeaea' },
  { figma: 'color/neutral/300', cssVar: '--color-neutral-300', hex: '#cbcbcb' },
  { figma: 'color/neutral/500', cssVar: '--color-neutral-500', hex: '#979797' },
  { figma: 'color/neutral/900', cssVar: '--color-neutral-900', hex: '#000000' },
  { figma: 'color/neutral/900-a15', cssVar: '--color-neutral-900-a15', hex: '#00000026' },
  { figma: 'color/neutral/900-a25', cssVar: '--color-neutral-900-a25', hex: '#00000040' },
  { figma: 'color/colors/red-100', cssVar: '--color-colors-red-100', hex: '#f5dedb' },
  { figma: 'color/colors/red-200', cssVar: '--color-colors-red-200', hex: '#f5cfca' },
  { figma: 'color/colors/red-700', cssVar: '--color-colors-red-700', hex: '#cc0000' },
  { figma: 'color/colors/pink', cssVar: '--color-colors-pink', hex: '#fad5e7' },
  { figma: 'color/colors/purple-100', cssVar: '--color-colors-purple-100', hex: '#ddd6ef' },
  { figma: 'color/colors/purple-500', cssVar: '--color-colors-purple-500', hex: '#9747ff' },
  { figma: 'color/colors/green-100', cssVar: '--color-colors-green-100', hex: '#d4eee7' },
  { figma: 'color/colors/green-700', cssVar: '--color-colors-green-700', hex: '#00867b' },
  { figma: 'color/colors/sage-300', cssVar: '--color-colors-sage-300', hex: '#b8c6c3' },
  { figma: 'color/colors/yellow-200', cssVar: '--color-colors-yellow-200', hex: '#fffd9e' },
  { figma: 'color/colors/yellow-400', cssVar: '--color-colors-yellow-400', hex: '#ffe900' },
  { figma: 'color/colors/olive-200', cssVar: '--color-colors-olive-200', hex: '#e0e2a4' },
  { figma: 'color/colors/olive-800', cssVar: '--color-colors-olive-800', hex: '#646905' },
  { figma: 'color/colors/brown', cssVar: '--color-colors-brown', hex: '#d1a63b' },
]

// Swatch groups follow the Figma folders: color/neutral/* → neutral, color/colors/* → colors.
export const groupOf = c => c.figma.split('/')[1]

// tw: the Tailwind class to copy; every token is also available with any other
// color utility (bg-, text-, border-, fill-, …).
export const colorTokens = [
  { figma: 'bg/default', cssVar: '--bg-default', alias: 'color/neutral/50', tw: 'bg-bg-default' },
  { figma: 'bg/subtle', cssVar: '--bg-subtle', alias: 'color/neutral/100', tw: 'bg-bg-subtle' },
  { figma: 'bg/disabled-bg', cssVar: '--bg-disabled-bg', alias: 'color/neutral/100', tw: 'bg-bg-disabled-bg' },
  { figma: 'surface/card', cssVar: '--surface-card', alias: 'color/neutral/0', tw: 'bg-surface-card' },
  { figma: 'surface/card-red', cssVar: '--surface-card-red', alias: 'color/colors/red-200', tw: 'bg-surface-card-red' },
  { figma: 'surface/card-pink', cssVar: '--surface-card-pink', alias: 'color/colors/pink', tw: 'bg-surface-card-pink' },
  { figma: 'surface/card-violet', cssVar: '--surface-card-violet', alias: 'color/colors/purple-100', tw: 'bg-surface-card-violet' },
  { figma: 'surface/card-yellow', cssVar: '--surface-card-yellow', alias: 'color/colors/olive-200', tw: 'bg-surface-card-yellow' },
  { figma: 'surface/card-green', cssVar: '--surface-card-green', alias: 'color/colors/green-100', tw: 'bg-surface-card-green' },
  { figma: 'surface/tag-neutral', cssVar: '--surface-tag-neutral', alias: 'color/neutral/100', tw: 'bg-surface-tag-neutral' },
  { figma: 'surface/tag-red', cssVar: '--surface-tag-red', alias: 'color/colors/red-100', tw: 'bg-surface-tag-red' },
  { figma: 'surface/tag-pink', cssVar: '--surface-tag-pink', alias: 'color/colors/pink', tw: 'bg-surface-tag-pink' },
  { figma: 'surface/tag-violet', cssVar: '--surface-tag-violet', alias: 'color/colors/purple-100', tw: 'bg-surface-tag-violet' },
  { figma: 'surface/tag-yellow', cssVar: '--surface-tag-yellow', alias: 'color/colors/olive-200', tw: 'bg-surface-tag-yellow' },
  { figma: 'surface/tag-green', cssVar: '--surface-tag-green', alias: 'color/colors/green-100', tw: 'bg-surface-tag-green' },
  { figma: 'surface/tag-yellow-bright', cssVar: '--surface-tag-yellow-bright', alias: 'color/colors/yellow-200', tw: 'bg-surface-tag-yellow-bright' },
  { figma: 'surface/control', cssVar: '--surface-control', alias: 'color/neutral/100', tw: 'bg-surface-control' },
  { figma: 'surface/control-selected', cssVar: '--surface-control-selected', alias: 'color/neutral/0', tw: 'bg-surface-control-selected' },
  { figma: 'surface/control-on-color', cssVar: '--surface-control-on-color', alias: 'color/neutral/0', tw: 'bg-surface-control-on-color' },
  { figma: 'surface/shadow', cssVar: '--surface-shadow', alias: 'color/neutral/900-a25', tw: 'shadow-surface-shadow' },
  // Interaction overlays (added in step 3): laid over a control while hovered / pressed.
  { figma: 'overlay/hover', cssVar: '--overlay-hover', alias: 'color/neutral/900-a15', tw: 'bg-overlay-hover' },
  { figma: 'overlay/pressed', cssVar: '--overlay-pressed', alias: 'color/neutral/900-a25', tw: 'bg-overlay-pressed' },
  { figma: 'text/primary', cssVar: '--text-primary', alias: 'color/neutral/900', tw: 'text-text-primary' },
  { figma: 'text/secondary', cssVar: '--text-secondary', alias: 'color/neutral/500', tw: 'text-text-secondary' },
  { figma: 'text/tertiary', cssVar: '--text-tertiary', alias: 'color/neutral/300', tw: 'text-text-tertiary' },
  { figma: 'text/disabled', cssVar: '--text-disabled', alias: 'color/neutral/300', tw: 'text-text-disabled' },
  { figma: 'text/on-accent', cssVar: '--text-on-accent', alias: 'color/neutral/50', tw: 'text-text-on-accent' },
  { figma: 'text/on-color', cssVar: '--text-on-color', alias: 'color/neutral/0', tw: 'text-text-on-color' },
  { figma: 'text/accent', cssVar: '--text-accent', alias: 'color/colors/brown', tw: 'text-text-accent' },
  { figma: 'text/on-yellow', cssVar: '--text-on-yellow', alias: 'color/colors/olive-800', tw: 'text-text-on-yellow' },
  { figma: 'icon/primary', cssVar: '--icon-primary', alias: 'color/neutral/900', tw: 'text-icon-primary' },
  { figma: 'icon/secondary', cssVar: '--icon-secondary', alias: 'color/neutral/500', tw: 'text-icon-secondary' },
  { figma: 'icon/on-color', cssVar: '--icon-on-color', alias: 'color/neutral/0', tw: 'text-icon-on-color' },
  { figma: 'border/default', cssVar: '--border-default', alias: 'color/neutral/100', tw: 'border-border-default' },
  { figma: 'border/strong', cssVar: '--border-strong', alias: 'color/neutral/900', tw: 'border-border-strong' },
  { figma: 'border/inverse', cssVar: '--border-inverse', alias: 'color/neutral/0', tw: 'border-border-inverse' },
  { figma: 'border/success', cssVar: '--border-success', alias: 'color/colors/green-700', tw: 'border-border-success' },
  { figma: 'border/focus', cssVar: '--border-focus', alias: 'color/neutral/900', tw: 'border-border-focus' },
  { figma: 'divider/default', cssVar: '--divider-default', alias: 'color/neutral/100', tw: 'border-divider-default' },
  { figma: 'divider/inverse', cssVar: '--divider-inverse', alias: 'color/neutral/0', tw: 'border-divider-inverse' },
  { figma: 'accent/primary', cssVar: '--accent-primary', alias: 'color/neutral/900', tw: 'bg-accent-primary' },
  { figma: 'accent/secondary', cssVar: '--accent-secondary', alias: 'color/colors/brown', tw: 'bg-accent-secondary' },
  { figma: 'accent/highlight', cssVar: '--accent-highlight', alias: 'color/colors/yellow-400', tw: 'bg-accent-highlight' },
  { figma: 'status/success', cssVar: '--status-success', alias: 'color/colors/green-700', tw: 'text-status-success' },
  { figma: 'status/success-bg', cssVar: '--status-success-bg', alias: 'color/colors/green-100', tw: 'bg-status-success-bg' },
  { figma: 'status/error', cssVar: '--status-error', alias: 'color/colors/red-700', tw: 'text-status-error' },
  { figma: 'status/error-bg', cssVar: '--status-error-bg', alias: 'color/colors/red-100', tw: 'bg-status-error-bg' },
  { figma: 'status/info', cssVar: '--status-info', alias: 'color/colors/purple-500', tw: 'text-status-info' },
  { figma: 'status/neutral', cssVar: '--status-neutral', alias: 'color/neutral/300', tw: 'text-status-neutral' },
  { figma: 'data/bar-filled', cssVar: '--data-bar-filled', alias: 'color/colors/sage-300', tw: 'bg-data-bar-filled' },
  { figma: 'data/bar-empty', cssVar: '--data-bar-empty', alias: 'color/neutral/0', tw: 'bg-data-bar-empty' },
  { figma: 'data/bar-filled-accent', cssVar: '--data-bar-filled-accent', alias: 'color/colors/green-700', tw: 'bg-data-bar-filled-accent' },
  { figma: 'data/bar-empty-accent', cssVar: '--data-bar-empty-accent', alias: 'color/colors/green-100', tw: 'bg-data-bar-empty-accent' },
  { figma: 'data/chart', cssVar: '--data-chart', alias: 'color/neutral/500', tw: 'bg-data-chart' },
  { figma: 'data/chart-muted', cssVar: '--data-chart-muted', alias: 'color/neutral/50', tw: 'bg-data-chart-muted' },
]

export const spacePrimitives = [
  { figma: 'space/-8', cssVar: '--space-neg-8', px: -8 },
  { figma: 'space/-1', cssVar: '--space-neg-1', px: -1 },
  { figma: 'space/2', cssVar: '--space-2', px: 2 },
  { figma: 'space/4', cssVar: '--space-4', px: 4 },
  { figma: 'space/8', cssVar: '--space-8', px: 8 },
  { figma: 'space/14', cssVar: '--space-14', px: 14 },
  { figma: 'space/20', cssVar: '--space-20', px: 20 },
  { figma: 'space/24', cssVar: '--space-24', px: 24 },
  { figma: 'space/30', cssVar: '--space-30', px: 30 },
  { figma: 'space/84', cssVar: '--space-84', px: 84 },
  { figma: 'space/90', cssVar: '--space-90', px: 90 },
]

// key: Tailwind spacing key, works with any spacing utility (p-, m-, gap-, w-, h-, inset-…).
// example: the class shown on /ds-dev/ (padding for positive values, margin for negative ones).
export const spacingTokens = [
  { figma: 'indents/-XS', cssVar: '--indents-neg-xs', alias: 'space/-8', px: -8, key: 'indents-neg-xs', example: 'ml-indents-neg-xs' },
  { figma: 'indents/-4XS', cssVar: '--indents-neg-4xs', alias: 'space/-1', px: -1, key: 'indents-neg-4xs', example: 'ml-indents-neg-4xs' },
  { figma: 'indents/3XS', cssVar: '--indents-3xs', alias: 'space/2', px: 2, key: 'indents-3xs', example: 'p-indents-3xs' },
  { figma: 'indents/2XS', cssVar: '--indents-2xs', alias: 'space/4', px: 4, key: 'indents-2xs', example: 'p-indents-2xs' },
  { figma: 'indents/XS', cssVar: '--indents-xs', alias: 'space/8', px: 8, key: 'indents-xs', example: 'p-indents-xs' },
  { figma: 'indents/S (inner)', cssVar: '--indents-s-inner', alias: 'space/14', px: 14, key: 'indents-s-inner', example: 'p-indents-s-inner' },
  { figma: 'indents/M', cssVar: '--indents-m', alias: 'space/20', px: 20, key: 'indents-m', example: 'p-indents-m' },
  { figma: 'indents/L', cssVar: '--indents-l', alias: 'space/24', px: 24, key: 'indents-l', example: 'p-indents-l' },
  { figma: 'indents/X', cssVar: '--indents-x', alias: 'space/30', px: 30, key: 'indents-x', example: 'p-indents-x' },
  { figma: 'indents/XXL', cssVar: '--indents-xxl', alias: 'space/84', px: 84, key: 'indents-xxl', example: 'p-indents-xxl' },
  { figma: 'indents/XXL (out)', cssVar: '--indents-xxl-out', alias: 'space/90', px: 90, key: 'indents-xxl-out', example: 'p-indents-xxl-out' },
]

export const radiusPrimitives = [
  { figma: 'radius/4', cssVar: '--radius-4', px: 4 },
  { figma: 'radius/8', cssVar: '--radius-8', px: 8 },
  { figma: 'radius/12', cssVar: '--radius-12', px: 12 },
  { figma: 'radius/999', cssVar: '--radius-999', px: 999 },
]

// Tailwind keys keep the group name (rounded-radius-s): a bare rounded-s / rounded-l
// would clash with Tailwind's own start/left-corner utilities.
export const radiusTokens = [
  { figma: 'radius/S', cssVar: '--radius-s', alias: 'radius/4', px: 4, tw: 'rounded-radius-s' },
  { figma: 'radius/M', cssVar: '--radius-m', alias: 'radius/8', px: 8, tw: 'rounded-radius-m' },
  { figma: 'radius/L', cssVar: '--radius-l', alias: 'radius/12', px: 12, tw: 'rounded-radius-l' },
  { figma: 'radius/Over', cssVar: '--radius-over', alias: 'radius/999', px: 999, tw: 'rounded-radius-over' },
]

export const fontPrimitives = [
  { figma: 'font-family/pixform', cssVar: '--font-family-pixform', value: 'Pixform' },
  { figma: 'font-family/akkurat', cssVar: '--font-family-akkurat', value: 'Akkurat LL Cyr TT' },
  { figma: 'font-family/instrument-serif', cssVar: '--font-family-instrument-serif', value: 'Instrument Serif' },
  { figma: 'font-size/8', cssVar: '--font-size-8', px: 8 },
  { figma: 'font-size/11', cssVar: '--font-size-11', px: 11 },
  { figma: 'font-size/15', cssVar: '--font-size-15', px: 15 },
  { figma: 'font-size/20', cssVar: '--font-size-20', px: 20 },
  { figma: 'font-size/30', cssVar: '--font-size-30', px: 30 },
  { figma: 'font-size/84', cssVar: '--font-size-84', px: 84 },
]

export const fontTokens = [
  { figma: 'font/family/Pixel', cssVar: '--font-family-pixel', alias: 'font-family/pixform', tw: 'font-pixel' },
  { figma: 'font/family/Grotesk', cssVar: '--font-family-grotesk', alias: 'font-family/akkurat', tw: 'font-grotesk' },
  { figma: 'font/family/Antiqa', cssVar: '--font-family-antiqa', alias: 'font-family/instrument-serif', tw: 'font-antiqa' },
  { figma: 'font/size/caps', cssVar: '--font-size-caps', alias: 'font-size/8' },
  { figma: 'font/size/text - gr', cssVar: '--font-size-text-gr', alias: 'font-size/11' },
  { figma: 'font/size/M', cssVar: '--font-size-m', alias: 'font-size/15' },
  { figma: 'font/size/h3', cssVar: '--font-size-h3', alias: 'font-size/20' },
  { figma: 'font/size/description', cssVar: '--font-size-description', alias: 'font-size/30' },
  { figma: 'font/size/h1', cssVar: '--font-size-h1', alias: 'font-size/84' },
]

export const sizePrimitives = [{ figma: 'size/830', cssVar: '--size-830', px: 830 }]
export const sizeTokens = [{ figma: 'size/base with', cssVar: '--size-base-with', alias: 'size/830', px: 830, tw: 'max-w-size-base-with' }]

// Same order as the Typography table in the Figma Styles frame.
// letterSpacing in % of font size (Figma) → em in CSS.
export const textStyles = [
  { figma: 'heading/h1', tw: 'text-heading-h1', family: 'Instrument Serif', familyVar: '--font-family-antiqa', size: 84, sizeVar: '--font-size-h1', weight: 400, weightName: 'Regular', lineHeight: 76, letterSpacing: -1, textCase: 'none' },
  { figma: 'heading/h2', tw: 'text-heading-h2', family: 'Instrument Serif', familyVar: '--font-family-antiqa', size: 40, sizeVar: null, weight: 400, weightName: 'Regular', lineHeight: 36, letterSpacing: -1, textCase: 'none' },
  { figma: 'text/description', tw: 'text-text-description', family: 'Pixform', familyVar: '--font-family-pixel', size: 30, sizeVar: '--font-size-description', weight: 400, weightName: 'Regular', lineHeight: 27, letterSpacing: -3, textCase: 'uppercase' },
  { figma: 'heading/h3', tw: 'text-heading-h3', family: 'Akkurat LL Cyr TT', familyVar: '--font-family-grotesk', size: 20, sizeVar: '--font-size-h3', weight: 400, weightName: 'Regular', lineHeight: 18, letterSpacing: -2, textCase: 'none' },
  { figma: 'heading/H4', tw: 'text-heading-h4', family: 'Inter', familyVar: null, size: 15, sizeVar: '--font-size-m', weight: 600, weightName: 'Semi Bold', lineHeight: 14, letterSpacing: -2, textCase: 'none' },
  { figma: 'text/pixel', tw: 'text-text-pixel', family: 'Pixform', familyVar: '--font-family-pixel', size: 10, sizeVar: null, weight: 400, weightName: 'Regular', lineHeight: 9, letterSpacing: 20, textCase: 'uppercase' },
  { figma: 'text/grotesk', tw: 'text-text-grotesk', family: 'Akkurat LL Cyr TT', familyVar: '--font-family-grotesk', size: 11, sizeVar: '--font-size-text-gr', weight: 400, weightName: 'Regular', lineHeight: 11, letterSpacing: 0, textCase: 'none' },
  { figma: 'text/grotesk-bold', tw: 'text-text-grotesk-bold', family: 'Akkurat LL Cyr TT', familyVar: '--font-family-grotesk', size: 11, sizeVar: '--font-size-text-gr', weight: 700, weightName: 'Bold', lineHeight: 10, letterSpacing: 0, textCase: 'none' },
  { figma: 'text/caps', tw: 'text-text-caps', family: 'Akkurat LL Cyr TT', familyVar: '--font-family-grotesk', size: 8, sizeVar: '--font-size-caps', weight: 400, weightName: 'Regular', lineHeight: 7, letterSpacing: 20, textCase: 'uppercase' },
]

// Motion (code only: Figma variables can't hold durations or easings).
// Used for state transitions of color, background, border, shadow and transform only.
export const motion = [
  { name: 'duration/fast', cssVar: '--duration-fast', value: '120ms', use: 'hover, pressed, focus' },
  { name: 'duration/base', cssVar: '--duration-base', value: '200ms', use: 'opening a menu, larger state changes' },
  { name: 'ease/out', cssVar: '--ease-out', value: 'cubic-bezier(0.22, 1, 0.36, 1)', use: 'all state transitions' },
]

// No effect styles exist in Figma; this is the one drop shadow used in the
// designs (checklist panel), its color bound to surface/shadow.
export const shadows = [
  { name: 'shadow/card', cssVar: '--shadow-card', tw: 'shadow-card', x: 0, y: 24, blur: 34, spread: 0, color: 'surface/shadow' },
]

// Figma name → CSS variable name, for aliases.
export const cssVarOf = figmaName => {
  const all = [...primitiveColors, ...spacePrimitives, ...radiusPrimitives, ...fontPrimitives, ...sizePrimitives, ...colorTokens]
  const hit = all.find(t => t.figma === figmaName)
  return hit ? hit.cssVar : null
}
