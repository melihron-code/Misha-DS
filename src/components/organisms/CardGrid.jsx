import { cx, PRESSABLE } from '../atoms/shared'
import { CampaignCard, MetricCard, StatCard, TeamCard } from '../molecules'

// CardGrid (v0.6.13, code first; replaces MetricGrid, TeamGrid, StatGrid and CampaignList). One kind of card, laid
// out for that kind, indents/2XS apart; the cards fill the width they're given. Figma: the "metrics" and "team-list"
// frames on all-teams, the "stats" row on hiring-campaign, the campaign cards on all-teams-campaigns.
// - `card`: metric (MetricCards, 4 columns, 2 in a mobile page) | stat (StatCards, one column each, 1 column in a
//   mobile page) | team (TeamCards, 2 columns, 1 in a mobile page) | campaign (CampaignCards stacked).
// - `items`: the cards' props, plus `id` and `href`. With `href` a card is a link: the whole card is the hit area,
//   with the overlay on hover / pressed and the focus ring (PRESSABLE); a CampaignCard makes its own link.
// - `cardProps`: props for every card (e.g. { buttonTooltip } for the campaign cards' "More info").
// - `emptyText`: shown on a surface/card panel when there are no items.
const CARDS = {
  metric: { Card: MetricCard, layout: 'grid grid-cols-4 @max-tablet/page:grid-cols-2', label: 'Metrics' },
  stat: { Card: StatCard, layout: 'grid auto-cols-fr grid-flow-col @max-tablet/page:grid-flow-row @max-tablet/page:grid-cols-1', label: 'Stats' },
  team: { Card: TeamCard, layout: 'grid grid-cols-2 @max-tablet/page:grid-cols-1', label: 'Teams' },
  campaign: { Card: CampaignCard, layout: 'flex flex-col', label: 'Campaigns', ownLink: true },
}

export default function CardGrid({ card = 'metric', items = [], cardProps, emptyText, label, className, ...rest }) {
  const { Card, layout, ownLink, label: defaultLabel } = CARDS[card]
  return (
    <section aria-label={label ?? defaultLabel} className={cx('w-full', className)} {...rest}>
      {items.length === 0 && emptyText ? (
        <p className="rounded-radius-l bg-surface-card p-indents-x text-text-grotesk text-text-secondary">{emptyText}</p>
      ) : (
        <ul className={cx('gap-indents-2xs', layout)}>
          {items.map(({ id, href, ...item }, i) => (
            <li key={id ?? item.title ?? item.name ?? i} className="flex">
              {href && !ownLink ? (
                <a href={href} className={cx('flex w-full rounded-radius-l', PRESSABLE)}>
                  <Card {...cardProps} {...item} />
                </a>
              ) : (
                <Card {...cardProps} {...item} {...(ownLink && href ? { href } : {})} />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
