// Shared row layout for token lists (Spacing, Radius). Each page picks its columns
// from these widths, so shared columns line up across pages.
export const COL = {
  // indents/XXL (out) (90px), the size of the largest preview
  preview: 'var(--indents-xxl-out)',
  // indents/XXL (out) + indents/L (114px)
  value: 'calc(var(--indents-xxl-out) + var(--indents-l))',
  // indents/XXL (out) + indents/X + indents/S (inner) (134px), fits the longest name in heading/h4
  name: 'calc(var(--indents-xxl-out) + var(--indents-x) + var(--indents-s-inner))',
  // indents/XXL (out) + indents/L (114px), fits the longest variable
  cssVar: 'calc(var(--indents-xxl-out) + var(--indents-l))',
  // the rest
  primitive: '1fr',
}

export const columnsOf = keys => keys.map(k => COL[k]).join(' ')

export const TOKEN_ROW_CLASS = 'grid items-center gap-indents-m border-t border-divider-default py-indents-s-inner'

// Text columns (name, variable, primitive) have the copy buttons' inline padding;
// their labels get it too, so each label starts where its column's text starts.
export const TEXT_LABEL = 'px-indents-2xs'
