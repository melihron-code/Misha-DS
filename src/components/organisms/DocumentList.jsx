import { DocumentRow } from '../atoms'
import { cx } from '../atoms/shared'

// DocumentList (v0.6.5, code first; Figma: the "document-list" card on all-teams-templates). A surface/card panel
// (radius/L, indents/X at the sides; the rows bring their own top and bottom space) with DocumentRows, indents/3XS
// apart. It fills the width it's given.
// - `documents`: [{ id, title, type, author, date }].
// - `editTooltip`: the rows' edit buttons have no action yet (DocumentRow's Tooltip, marked unavailable).
// - `emptyText`: shown when there's nothing (e.g. a filter with no matches).
// Responsive (container "page"): in a mobile page each row takes two lines (DocumentRow).
export default function DocumentList({ documents = [], editTooltip, emptyText = 'Nothing here yet.', label = 'Documents', className, ...rest }) {
  return (
    <section aria-label={label} className={cx('w-full rounded-radius-l bg-surface-card px-indents-x', className)} {...rest}>
      {documents.length > 0 ? (
        <ul className="flex flex-col gap-indents-3xs">
          {documents.map(({ id, ...doc }) => (
            <li key={id ?? doc.title}>
              <DocumentRow {...doc} editTooltip={editTooltip} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-indents-x text-text-grotesk text-text-secondary">{emptyText}</p>
      )}
    </section>
  )
}
