import { AvatarGroup, ProgressBar } from '../atoms'
import { cx } from '../atoms/shared'
import { nbsp } from '../../lib/nbsp'

// Figma: TeamCard. A team: name and size, productivity (accent ProgressBar), this week's
// highlight (wraps, about 3/5 of the width as in Figma; full width in a mobile page) and the members (AvatarGroup + "+N more").
// Fills its container; the name stays on one line (ellipsis).
export default function TeamCard({
  name = 'Engineering Team',
  people = 24,
  productivity = 89,
  highlight = 'Petya was drinking too much tea this week',
  members = ['katya', 'petya', 'dog'],
  className,
  ...rest
}) {
  const more = Math.max(0, people - members.length)
  return (
    <div className={cx('flex w-full flex-col gap-indents-l rounded-radius-l bg-surface-card p-indents-x text-text-primary', className)} {...rest}>
      <div className="flex items-end justify-between gap-indents-m">
        <h3 className="min-w-0 truncate-x text-heading-h3">{name}</h3>
        <p className="shrink-0 text-text-pixel">{nbsp(`${people} people`)}</p>
      </div>
      <div className="flex flex-col gap-indents-xs">
        <div className="flex justify-between text-text-caps">
          <span className="text-text-tertiary">Productivity</span>
          <span>{productivity}%</span>
        </div>
        <ProgressBar tone="accent" value={productivity} label={`${name}: productivity`} />
      </div>
      {highlight && (
        <div className="flex w-3/5 flex-col gap-indents-xs @max-tablet/page:w-full">
          <p className="text-text-caps text-text-tertiary">Week highlight:</p>
          <p className="text-text-pixel">{nbsp(highlight)}</p>
        </div>
      )}
      <div className="flex items-center gap-indents-s-inner">
        <AvatarGroup images={members} label={`${name} members`} />
        {more > 0 && <p className="text-text-pixel">{nbsp(`+${more} more`)}</p>}
      </div>
    </div>
  )
}
