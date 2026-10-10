import Button from './Button'
import { cx } from './shared'

// Figma: DocumentRow. title, author, date (+ type "Document" and an "edit" button).
// Fixed Figma column widths, so rows line up in a list (built from tokens):
//   type 114px = indents/XXL (out) + indents/L · author 162px = 2 × XXL (out) − L + S (inner) − XS
//   date 74px = indents/XXL − indents/XS − indents/3XS
const COLUMNS = [
  'minmax(0, 1fr)',
  'calc(var(--indents-xxl-out) + var(--indents-l))',
  'calc(var(--indents-xxl-out) * 2 - var(--indents-l) + var(--indents-s-inner) - var(--indents-xs))',
  'calc(var(--indents-xxl) - var(--indents-xs) - var(--indents-3xs))',
  'auto',
].join(' ')

export default function DocumentRow({ title = 'Sarah Johnson', type = 'Document', author = 'created by Alan', date = '24.05.2025', editLabel = 'edit', onEdit, className, ...rest }) {
  return (
    // Figma's 1px divider is inside the row: bottom padding is indents/S (inner) + indents/-4XS (14 − 1).
    <div
      className={cx('grid items-center gap-indents-s-inner border-b border-divider-default pt-indents-s-inner', className)}
      style={{ gridTemplateColumns: COLUMNS, paddingBottom: 'calc(var(--indents-s-inner) + var(--indents-neg-4xs))' }}
      {...rest}
    >
      <span className="truncate text-heading-h3 text-text-primary">{title}</span>
      <span className="truncate text-text-pixel text-text-primary">{type}</span>
      <span className="truncate text-text-pixel text-text-primary">{author}</span>
      <span className="truncate text-right text-text-pixel text-text-primary">{date}</span>
      <Button variant="secondary" onClick={onEdit} aria-label={`${editLabel} ${title}`}>
        {editLabel}
      </Button>
    </div>
  )
}
