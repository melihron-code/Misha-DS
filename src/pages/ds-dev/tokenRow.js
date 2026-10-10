// Shared row layout for token lists (Spacing, Radius), five columns:
// name | CSS variable | primitive | example | px.
// name: a quarter minus indents/XXL- (84px) · variable: indents/XXL (out) + indents/L (114px,
// fits the longest variable) · primitive: indents/XXL (out) (90px) · example: a quarter · px: the rest.
const QUARTER = '((100% - 3 * var(--indents-m)) / 4)'

export const TOKEN_ROW_COLUMNS = [
  `calc(${QUARTER} - var(--indents-xxl-minus))`,
  'calc(var(--indents-xxl-out) + var(--indents-l))',
  'var(--indents-xxl-out)',
  `calc(${QUARTER})`,
  '1fr',
].join(' ')

export const TOKEN_ROW_CLASS = 'grid items-center gap-indents-m border-t border-divider-default py-indents-s-inner'
