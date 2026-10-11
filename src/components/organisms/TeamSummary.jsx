import { cx } from '../atoms/shared'
import { Notification } from '../molecules'

// TeamSummary (v0.6.6, code first; Figma: the "summary" on all-teams-one). A team's update for the week: a
// Notification (status/success-bg, the message in text/description), full width; the message wraps. `message`.
// (Figma also places two Avatars under it, almost hidden behind the next card; left out.)
export default function TeamSummary({ message, label = 'Team summary', className, ...rest }) {
  if (!message) return null
  return (
    <section aria-label={label} className={cx('w-full', className)} {...rest}>
      <Notification message={message} />
    </section>
  )
}
