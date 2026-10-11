import { Avatar, ProgressBar, Status } from '../atoms'
import { cx } from '../atoms/shared'

// Figma: ProfileCard. variant long | short | short-outlined.
// long: a list row (divider/default underneath) with avatar, name and role, status, and an
// accent progress bar filling the rest; it fills its container. short / short-outlined: a
// compact chip (surface/tag-red | surface/tag-neutral) that hugs its content; the avatar is
// multiplied onto the fill, as in Figma. Name and role stay on one line (ellipsis). `fill` stretches a
// short card to its container (e.g. a Kanban column). In a mobile page (container "page" narrower than
// tablet) the long row puts the progress bar under the name.
// `color` (v0.6.7; short / short-outlined): the chip's fill, from the surface/tag-* tokens (Figma: instance fills on
// the candidate screens); without it, short is red and short-outlined neutral.
const CHIP = { short: 'bg-surface-tag-red', 'short-outlined': 'bg-surface-tag-neutral' }
const CHIP_COLOR = {
  red: 'bg-surface-tag-red',
  green: 'bg-surface-tag-green',
  pink: 'bg-surface-tag-pink',
  yellow: 'bg-surface-tag-yellow',
  violet: 'bg-surface-tag-violet',
  neutral: 'bg-surface-tag-neutral',
}

function Info({ name, role }) {
  return (
    <div className="flex min-w-0 flex-col gap-indents-xs text-text-primary">
      <p className="truncate-x text-heading-h3">{name}</p>
      <p className="truncate-x text-text-pixel">{role}</p>
    </div>
  )
}

export default function ProfileCard({
  variant = 'long',
  name = 'Sarah Johnson',
  role = 'Senior Developer',
  image = 'katya',
  src,
  status = 'on-track',
  statusLabel,
  progress = 86,
  fill = false,
  color,
  className,
  ...rest
}) {
  if (variant !== 'long') {
    return (
      <div className={cx(fill ? 'flex w-full' : 'inline-flex max-w-full', 'items-start gap-indents-s-inner rounded-radius-s p-indents-s-inner', CHIP_COLOR[color] ?? CHIP[variant], className)} {...rest}>
        <Avatar image={image} src={src} alt="" className="mix-blend-multiply" />
        <Info name={name} role={role} />
      </div>
    )
  }
  return (
    <div className={cx('flex w-full items-start gap-indents-s-inner border-b border-divider-default py-indents-s-inner @max-tablet/page:flex-wrap', className)} {...rest}>
      <Avatar image={image} src={src} alt="" />
      <div className="flex min-w-0 flex-1 items-start justify-between gap-indents-s-inner">
        <Info name={name} role={role} />
        <Status status={status} label={statusLabel} className="shrink-0" />
      </div>
      <ProgressBar tone="accent" value={progress} label={`${name}: progress`} className="flex-1 @max-tablet/page:basis-full" />
    </div>
  )
}
