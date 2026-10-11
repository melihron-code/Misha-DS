import { cx, PRESSABLE } from '../atoms/shared'
import { TeamCard } from '../molecules'

// TeamGrid (v0.6.2, code first; Figma: the "team-list" frame on all-teams). TeamCards in 2 columns, indents/2XS
// apart; they fill the width they're given. `teams`: [{ id, href, …TeamCard props }]. With `href` a card is a
// link to its team: the whole card is the hit area, with the overlay on hover / pressed and the focus ring
// (PRESSABLE), as the Kanban cards. Responsive (container "page"): 1 column in a mobile page.
export default function TeamGrid({ teams = [], label = 'Teams', className, ...rest }) {
  return (
    <section aria-label={label} className={cx('w-full', className)} {...rest}>
      <ul className="grid grid-cols-2 gap-indents-2xs @max-tablet/page:grid-cols-1">
        {teams.map(({ id, href, ...team }) => (
          <li key={id ?? team.name} className="flex">
            {href ? (
              <a href={href} className={cx('flex w-full rounded-radius-l', PRESSABLE)}>
                <TeamCard {...team} />
              </a>
            ) : (
              <TeamCard {...team} />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
