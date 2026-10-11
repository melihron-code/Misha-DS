import { cx } from '../atoms/shared'
import { CampaignCard } from '../molecules'

// CampaignList (v0.6.8, code first; Figma: the campaign cards on all-teams-campaigns). CampaignCards stacked,
// indents/2XS apart; they fill the width they're given. `campaigns`: [{ id, title, status, statusLabel, stats, href }];
// with `href` a card opens its campaign (CampaignCard). `buttonTooltip`: the cards' "More info" has no action yet.
// `emptyText`: shown when there are no campaigns. Responsive: the cards' numbers take 3 columns on tablet, 2 on mobile.
export default function CampaignList({ campaigns = [], buttonTooltip, emptyText = 'No campaigns yet.', label = 'Campaigns', className, ...rest }) {
  return (
    <section aria-label={label} className={cx('w-full', className)} {...rest}>
      {campaigns.length > 0 ? (
        <ul className="flex flex-col gap-indents-2xs">
          {campaigns.map(({ id, ...campaign }) => (
            <li key={id ?? campaign.title}>
              <CampaignCard {...campaign} buttonTooltip={buttonTooltip} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-radius-l bg-surface-card p-indents-x text-text-grotesk text-text-secondary">{emptyText}</p>
      )}
    </section>
  )
}
