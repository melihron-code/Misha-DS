// Design-system foundations, read from Figma (file dPIEJfY3Ma8tiCOcO9LXJO,
// collections "Primitives" and "Tokens", local text and effect styles).
// src/styles/tokens.css implements these; the /ds-dev/ page documents them.
//
// Figma name → CSS variable: lowercase, "/" and spaces → "-", brackets
// dropped, a leading "-" (negative value) → "neg-", a trailing "-" → "-minus".
// e.g. color/neutral/900 → --color-neutral-900, indents/S (inner) → --indents-s-inner,
// indents/-(XS) → --indents-neg-xs, indents/XXL- → --indents-xxl-minus.

export const primitiveColors = [
  { figma: 'color/neutral/0', cssVar: '--color-neutral-0', hex: '#ffffff' },
  { figma: 'color/neutral/50', cssVar: '--color-neutral-50', hex: '#f2f2f2' },
  { figma: 'color/neutral/100', cssVar: '--color-neutral-100', hex: '#eaeaea' },
  { figma: 'color/neutral/300', cssVar: '--color-neutral-300', hex: '#cbcbcb' },
  { figma: 'color/neutral/500', cssVar: '--color-neutral-500', hex: '#979797' },
  { figma: 'color/neutral/900', cssVar: '--color-neutral-900', hex: '#000000' },
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

// Hue groups for the swatch grid (by the name before the shade number).
export const hueOf = c => {
  const last = c.figma.split('/').pop()
  return c.figma.startsWith('color/neutral/') ? 'neutral' : last.replace(/-\d+$/, '')
}

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
  { figma: 'space/-sm', cssVar: '--space-neg-sm', px: -8 },
  { figma: 'space/-xs', cssVar: '--space-neg-xs', px: -1 },
  { figma: 'space/2xs', cssVar: '--space-2xs', px: 2 },
  { figma: 'space/xs', cssVar: '--space-xs', px: 4 },
  { figma: 'space/sm', cssVar: '--space-sm', px: 8 },
  { figma: 'space/md', cssVar: '--space-md', px: 14 },
  { figma: 'space/lg', cssVar: '--space-lg', px: 20 },
  { figma: 'space/xl', cssVar: '--space-xl', px: 24 },
  { figma: 'space/2xl', cssVar: '--space-2xl', px: 30 },
  { figma: 'space/3xl', cssVar: '--space-3xl', px: 84 },
  { figma: 'space/4xl', cssVar: '--space-4xl', px: 90 },
]

// key: Tailwind spacing key → p-indents-xs, gap-indents-s-inner, -ml-…, ml-indents-neg-xs
export const spacingTokens = [
  { figma: 'indents/-(XS)', cssVar: '--indents-neg-xs', alias: 'space/-sm', px: -8, key: 'indents-neg-xs', example: 'ml-indents-neg-xs' },
  { figma: 'indents/-1', cssVar: '--indents-neg-1', alias: 'space/-xs', px: -1, key: 'indents-neg-1', example: 'ml-indents-neg-1' },
  { figma: 'indents/XXXS', cssVar: '--indents-xxxs', alias: 'space/2xs', px: 2, key: 'indents-xxxs', example: 'gap-indents-xxxs' },
  { figma: 'indents/XXS', cssVar: '--indents-xxs', alias: 'space/xs', px: 4, key: 'indents-xxs', example: 'gap-indents-xxs' },
  { figma: 'indents/XS', cssVar: '--indents-xs', alias: 'space/sm', px: 8, key: 'indents-xs', example: 'gap-indents-xs' },
  { figma: 'indents/S (inner)', cssVar: '--indents-s-inner', alias: 'space/md', px: 14, key: 'indents-s-inner', example: 'p-indents-s-inner' },
  { figma: 'indents/M', cssVar: '--indents-m', alias: 'space/lg', px: 20, key: 'indents-m', example: 'p-indents-m' },
  { figma: 'indents/L', cssVar: '--indents-l', alias: 'space/xl', px: 24, key: 'indents-l', example: 'p-indents-l' },
  { figma: 'indents/X', cssVar: '--indents-x', alias: 'space/2xl', px: 30, key: 'indents-x', example: 'p-indents-x' },
  { figma: 'indents/XXL-', cssVar: '--indents-xxl-minus', alias: 'space/3xl', px: 84, key: 'indents-xxl-minus', example: 'py-indents-xxl-minus' },
  { figma: 'indents/XXL (out)', cssVar: '--indents-xxl-out', alias: 'space/4xl', px: 90, key: 'indents-xxl-out', example: 'px-indents-xxl-out' },
]

export const radiusPrimitives = [
  { figma: 'radius/XS', cssVar: '--radius-xs', px: 4 },
  { figma: 'radius/S', cssVar: '--radius-s', px: 8 },
  { figma: 'radius/L', cssVar: '--radius-l', px: 12 },
  { figma: 'radius/full', cssVar: '--radius-full', px: 999 },
]

export const radiusTokens = [
  { figma: 'rounds/S', cssVar: '--rounds-s', alias: 'radius/XS', px: 4, tw: 'rounded-rounds-s' },
  { figma: 'rounds/M', cssVar: '--rounds-m', alias: 'radius/S', px: 8, tw: 'rounded-rounds-m' },
  { figma: 'rounds/L', cssVar: '--rounds-l', alias: 'radius/L', px: 12, tw: 'rounded-rounds-l' },
  { figma: 'rounds/Over', cssVar: '--rounds-over', alias: 'radius/full', px: 999, tw: 'rounded-rounds-over' },
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
