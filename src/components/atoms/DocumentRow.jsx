import Button from './Button'
import Tooltip from './Tooltip'
import { cx } from './shared'

// Figma: DocumentRow. title, author, date (+ type "Document" and an "edit" button).
// Fixed Figma column widths, so rows line up in a list (built from tokens):
//   type 114px = indents/XXL (out) + indents/L · author 162px = 2 × XXL (out) − L + S (inner) − XS
//   date 74px = indents/XXL − indents/XS − indents/3XS
// `editTooltip` (v0.6.5): the edit button has no action yet: it shows the Tooltip and is marked unavailable.
// Responsive (container "page", v0.6.5): in a mobile page the row has two lines: the title and the edit button,
// then type, author and date (the columns don't fit a phone).
const COLUMNS = [
  'minmax(0, 1fr)',
  'calc(var(--indents-xxl-out) + var(--indents-l))',
  'calc(var(--indents-xxl-out) * 2 - var(--indents-l) + var(--indents-s-inner) - var(--indents-xs))',
  'calc(var(--indents-xxl) - var(--indents-xs) - var(--indents-3xs))',
  'auto',
].join(' ')
const MOBILE_COLUMNS = 'minmax(0, 1fr) auto'

export default function DocumentRow({ title = 'Sarah Johnson', type = 'Document', author = 'created by Alan', date = '24.05.2025', editLabel = 'edit', onEdit, editTooltip, className, style, ...rest }) {
  return (
    // Figma's 1px divider is inside the row: bottom padding is indents/S (inner) + indents/-4XS (14 − 1).
    <div
      className={cx(
        'grid grid-cols-(--doc-cols) items-center gap-indents-s-inner border-b border-divider-default pt-indents-s-inner @max-tablet/page:grid-cols-(--doc-cols-mobile) @max-tablet/page:gap-y-indents-xs',
        className,
      )}
      style={{ '--doc-cols': COLUMNS, '--doc-cols-mobile': MOBILE_COLUMNS, paddingBottom: 'calc(var(--indents-s-inner) + var(--indents-neg-4xs))', ...style }}
      {...rest}
    >
      <span className="truncate text-heading-h3 text-text-primary @max-tablet/page:col-start-1 @max-tablet/page:row-start-1">{title}</span>
      {/* The grid's own cells on wider pages; a second line in a mobile page. */}
      <div className="contents @max-tablet/page:col-span-2 @max-tablet/page:row-start-2 @max-tablet/page:flex @max-tablet/page:flex-wrap @max-tablet/page:gap-x-indents-s-inner @max-tablet/page:gap-y-indents-2xs">
        <span className="truncate text-text-pixel text-text-primary">{type}</span>
        <span className="truncate text-text-pixel text-text-primary">{author}</span>
        <span className="truncate text-right text-text-pixel text-text-primary @max-tablet/page:text-left">{date}</span>
      </div>
      <span className="flex justify-end @max-tablet/page:col-start-2 @max-tablet/page:row-start-1">
        <Tooltip text={editTooltip} align="end" unavailable>
          <Button variant="secondary" onClick={onEdit} aria-label={`${editLabel} ${title}`}>
            {editLabel}
          </Button>
        </Tooltip>
      </span>
    </div>
  )
}
