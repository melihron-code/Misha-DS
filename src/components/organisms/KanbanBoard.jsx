import { cx, PRESSABLE } from '../atoms/shared'
import { ProfileCard } from '../molecules'

// Figma: KanbanBoard (no properties). A hiring pipeline: a title (heading/h1 style, centered in the 830px
// column) above a white card with one column per stage. Each column has its title and count (heading/h2,
// the count in text/tertiary) and its people as ProfileCard short-outlined, stretched to the column.
// A person with an `href` is a link (states as Button: overlay, focus ring, the whole card is the hit area).
// Columns: 4 on desktop, 2 in a tablet page, 1 in a mobile page (container "page"). Side padding indents/M
// (Figma: indents/X), title-to-board gap indents/XXL (Figma: a raw 50px).
export default function KanbanBoard({ title = 'Pipeline', columns = [], className, ...rest }) {
  return (
    <section aria-label={title} className={cx('flex w-full flex-col items-center gap-indents-xxl px-indents-m pb-indents-xxl', className)} {...rest}>
      {title && <h2 className="w-full max-w-size-base-with text-center text-heading-h1 text-text-primary">{title}</h2>}
      <div className="grid w-full grid-cols-4 items-start gap-indents-l rounded-radius-l bg-surface-card p-indents-x @max-desktop/page:grid-cols-2 @max-tablet/page:grid-cols-1">
        {columns.map(col => (
          <section key={col.id ?? col.title} aria-label={`${col.title}: ${col.people.length}`} className="flex min-w-0 flex-col gap-indents-m">
            <h3 className="flex items-start justify-between gap-indents-s-inner text-heading-h2">
              <span className="min-w-0 truncate-x text-text-primary">{col.title}</span>
              <span className="text-text-tertiary">{col.people.length}</span>
            </h3>
            <ul className="flex flex-col gap-indents-3xs">
              {col.people.map((p, i) => {
                const card = <ProfileCard variant="short-outlined" fill name={p.name} role={p.role} image={p.image} src={p.src} />
                return (
                  <li key={`${i}-${p.name}`} className="flex">
                    {p.href ? (
                      <a href={p.href} className={cx('flex w-full rounded-radius-s', PRESSABLE)}>
                        {card}
                      </a>
                    ) : (
                      card
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </section>
  )
}
