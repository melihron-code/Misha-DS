import { Status } from '../atoms'
import { cx } from '../atoms/shared'

// Figma: AttemptCard. attempt first | next. A salary negotiation round: the starting offer on
// the left, the counter-offer on the right, each with its perks (text/secondary). "first" shows
// the round's Status between them (failing, "Failed"); "next" has no status and unknown
// amounts ("$?"). Each offer column is 3/8 of the content (Figma: 290 of 770). Fills its container.
// In a mobile page (container "page" narrower than tablet) the offers stack, status first.
const DEFAULTS = {
  first: {
    title: 'First attempt',
    start: { amount: '$8 750', perks: ['Lead role', 'Cookies', 'Free education'] },
    end: { amount: '$12 750', perks: ['Lead role', 'Remote-work', 'Gym'] },
  },
  next: {
    title: 'Next attempt',
    start: { amount: '$?', perks: ['Lead role', 'Cookies', 'Gym'] },
    end: { amount: '$?', perks: ['Lead role', 'Cookies', 'Gym'] },
  },
}

function Offer({ offer, align }) {
  return (
    <div className={cx('flex w-3/8 flex-col gap-indents-s-inner @max-tablet/page:w-full', align === 'end' && 'items-end text-right @max-tablet/page:items-start @max-tablet/page:text-left')}>
      <p className="text-heading-h2 text-text-primary">{offer.amount}</p>
      <ul className="flex flex-col gap-indents-xs text-text-pixel text-text-secondary">
        {offer.perks.map(p => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  )
}

export default function AttemptCard({ attempt = 'first', title, start, end, status = 'failing', statusLabel = 'Failed', className, ...rest }) {
  const d = DEFAULTS[attempt]
  return (
    <div className={cx('flex w-full flex-col gap-indents-l rounded-radius-l bg-surface-card p-indents-x', className)} {...rest}>
      <h3 className="text-text-pixel text-text-primary">{title ?? d.title}</h3>
      <div className="flex items-start justify-between gap-indents-m @max-tablet/page:flex-col">
        <Offer offer={start ?? d.start} />
        {attempt === 'first' && <Status status={status} label={statusLabel} className="@max-tablet/page:order-first" />}
        <Offer offer={end ?? d.end} align="end" />
      </div>
    </div>
  )
}
