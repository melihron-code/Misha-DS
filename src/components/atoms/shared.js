// Helpers shared by the atoms.

// Join class names, skipping falsy values.
export const cx = (...parts) => parts.filter(Boolean).join(' ')

// Sizes Figma uses that have no single token, built from tokens (see NOTES.md v0.3.0).
export const SIZE = {
  // 32px control height (Button sm variants, ToggleButton, TextInput): indents/L + indents/XS
  control: 'calc(var(--indents-l) + var(--indents-xs))',
  // 10px gap (Status dot ↔ label, Tag label ↔ icon): indents/XS + indents/3XS
  gap10: 'calc(var(--indents-xs) + var(--indents-3xs))',
  // 5px dot (Status, ProgressBar): indents/2XS − indents/-4XS (4 − (−1))
  dot: 'calc(var(--indents-2xs) - var(--indents-neg-4xs))',
  // 82px chart height (MiniChart): indents/XXL − indents/3XS
  chart: 'calc(var(--indents-xxl) - var(--indents-3xs))',
}

// Interaction states a docs page can force with the `state` prop.
export const STATES = ['default', 'hover', 'pressed', 'focus', 'disabled']

// data-state attribute for a forced state (none for "default").
export const stateAttr = state => (state && state !== 'default' ? state : undefined)

// Classes every pressable atom shares: overlay on hover/pressed, focus ring, transitions.
export const PRESSABLE = 'state-overlay focus-ring transition-state cursor-pointer disabled:cursor-not-allowed'
