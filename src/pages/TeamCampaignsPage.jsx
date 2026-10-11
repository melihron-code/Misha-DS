import { useParams } from 'react-router-dom'
import { CampaignList, TeamSummary } from '../components/organisms'
import { teamCampaignsHero } from '../data/heroes'
import { campaignsOf, hiringSummaryOf, teamById } from '../data/teams'
import { SiteHero } from '../site/SiteHeader'
import { ALL_TEAMS_CRUMB, HOME_CRUMB, NO_ACTION, SITE_NAME, paths } from '../site/site'
import NotFoundPage from './NotFoundPage'

// /teams/:teamId/campaigns — Figma: all-teams-campaigns (6123:36651), the Campaigns view of a team. HeroSection (the
// team's name; "Add campaign" has no action, its prototype link was removed on 2026-10-11; the toggle's Team opens the
// team page), then the 830px content column (size/base-with): the month's hiring summary, then the campaigns,
// indents/2XS apart; indents/XS under the hero, indents/XXL at the bottom, indents/M at the sides (as the other
// all-teams pages). Each campaign card opens its campaign; "More info" has no action yet.
export default function TeamCampaignsPage() {
  const team = teamById(useParams().teamId)
  if (!team) return <NotFoundPage />
  const campaigns = campaignsOf(team.id).map(c => ({
    id: c.id,
    title: c.title,
    status: c.status,
    statusLabel: c.statusLabel,
    stats: c.stats,
    href: paths.campaign(c.id),
  }))

  return (
    <>
      <title>{`${team.name}: campaigns · ${SITE_NAME}`}</title>
      <SiteHero
        subHeader={{
          backHref: paths.team(team.id),
          breadcrumbs: [HOME_CRUMB, ALL_TEAMS_CRUMB, { label: team.name, href: paths.team(team.id) }, { label: 'Campaigns', href: paths.teamCampaigns(team.id) }],
        }}
        hero={teamCampaignsHero(team.name)}
        views={{ team: paths.team(team.id), campaigns: paths.teamCampaigns(team.id) }}
      />
      <main className="flex w-full justify-center px-indents-m pt-indents-xs pb-indents-xxl">
        <div className="flex w-full max-w-size-base-with flex-col gap-indents-2xs">
          <TeamSummary label="Hiring summary" message={hiringSummaryOf(team.id)} />
          <CampaignList campaigns={campaigns} buttonTooltip={NO_ACTION} />
        </div>
      </main>
    </>
  )
}
