import { Dropdown, Tooltip } from '../atoms'
import { cx, PRESSABLE } from '../atoms/shared'
import { FilterChips, ProfileCard } from '../molecules'

// PeopleList (v0.6.4, code first; Figma: the "employees" card on all-teams-employees, and the team list on
// all-teams-one). A surface/card panel (radius/L, padding indents/X, indents/L between its parts): optional
// filters on top, then the people as ProfileCard long rows, indents/3XS apart. It fills the width it's given.
// - `title` (v0.6.6): a heading at the top of the card (heading/h2, e.g. "Team" on a team page).
// - `people`: [{ id, name, role, image, status, progress, href }]. With `href` a row is a link to the person:
//   the whole row is the hit area, with the overlay on hover / pressed and the focus ring (PRESSABLE).
// - `statusFilter`: FilterChips props (label, options, value, onChange), on the left.
// - `selectFilter`: Dropdown props, on the right; with `tooltip` it has no action yet (Tooltip, unavailable).
// - `emptyText`: shown when there's no one (e.g. a filter with no matches).
// Responsive (container "page"): in a mobile page the dropdown goes under the chips, full width; the rows put
// their progress bar under the name (ProfileCard).
export default function PeopleList({ title, people = [], statusFilter, selectFilter, emptyText = 'No one here yet.', label, className, ...rest }) {
  const { tooltip, ...dropdown } = selectFilter ?? {}
  return (
    <section aria-label={label ?? title ?? 'People'} className={cx('flex w-full flex-col gap-indents-l rounded-radius-l bg-surface-card p-indents-x', className)} {...rest}>
      {title && <h2 className="text-heading-h2 text-text-primary">{title}</h2>}
      {(statusFilter || selectFilter) && (
        <div className="flex flex-wrap items-end justify-between gap-indents-m">
          {statusFilter && <FilterChips {...statusFilter} />}
          {selectFilter && (
            <Tooltip text={tooltip} align="end" unavailable className="@max-tablet/page:w-full">
              <Dropdown {...dropdown} className="@max-tablet/page:w-full" />
            </Tooltip>
          )}
        </div>
      )}
      {people.length > 0 ? (
        <ul className="flex flex-col gap-indents-3xs">
          {people.map(({ id, href, ...person }) => (
            <li key={id ?? person.name} className="flex">
              {href ? (
                <a href={href} className={cx('flex w-full rounded-radius-s', PRESSABLE)}>
                  <ProfileCard variant="long" {...person} />
                </a>
              ) : (
                <ProfileCard variant="long" {...person} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-text-grotesk text-text-secondary">{emptyText}</p>
      )}
    </section>
  )
}
