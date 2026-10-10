// Shared row layout for token lists (Spacing, Radius), five columns:
// preview | value | name | CSS variable | primitive.
// preview: indents/XXL (out) (90px, the size of the largest preview) ·
// value: indents/XXL (out) + indents/L (114px) · name: indents/XXL (out) + indents/X + indents/S (inner)
// (134px, fits the longest name in heading/h4) · variable: indents/XXL (out) + indents/L (114px,
// fits the longest variable) · primitive: the rest.
export const TOKEN_ROW_COLUMNS = [
  'var(--indents-xxl-out)',
  'calc(var(--indents-xxl-out) + var(--indents-l))',
  'calc(var(--indents-xxl-out) + var(--indents-x) + var(--indents-s-inner))',
  'calc(var(--indents-xxl-out) + var(--indents-l))',
  '1fr',
].join(' ')

export const TOKEN_ROW_CLASS = 'grid items-center gap-indents-m border-t border-divider-default py-indents-s-inner'

// Column labels, in the same order. Text columns (name, variable, primitive) get the
// copy buttons' inline padding so the label starts where the text starts; the preview
// label is centered over the preview.
export const TOKEN_ROW_LABELS = [
  { text: 'Preview', className: 'text-center' },
  { text: 'Value', className: '' },
  { text: 'Token', className: 'px-indents-xxs' },
  { text: 'CSS variable', className: 'px-indents-xxs' },
  { text: 'Primitive', className: 'px-indents-xxs' },
]
