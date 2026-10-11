import { useParams } from 'react-router-dom'
import { CardGrid, HeroCard, KanbanBoard } from '../components/organisms'
import { campaignHero } from '../data/heroes'
import { pipelineFor } from '../data/pipeline'
import { campaignById, campaignStatsOf, teamById } from '../data/teams'
import { SiteHeader } from '../site/SiteHeader'
import { ALL_TEAMS_CRUMB, HOME_CRUMB, SITE_NAME, noAction, paths } from '../site/site'
import NotFoundPage from './NotFoundPage'

// /campaigns/:campaignId — Figma: hiring-campaign (357:58749). Header; then the 830px content column (size/base-with)
// with the yellow hero (the campaign's name and photo), the stat cards and the funnel, indents/2XS apart; then the
// campaign's Kanban at page width. indents/XXL (out) under the Header and before the Kanban (Figma), the Kanban's own
// indents/XXL at the bottom. Every number comes from the campaign's candidates (data/teams.js); the Kanban's people
// open with ?campaign=, so their page leads back here. Finish and Cancel have no action yet.
export default function CampaignPage() {
  const campaign = campaignById(useParams().campaignId)
  if (!campaign) return <NotFoundPage />
  const team = teamById(campaign.teamId)
  const hero = {
    ...campaignHero,
    title: campaign.title,
    subtitle: `${campaign.statusLabel} campaign`,
    actions: campaignHero.actions.map(noAction),
  }
  const columns = pipelineFor(campaign.id).map(column => ({
    ...column,
    people: column.people.map(p => ({ ...p, href: `${p.href}?campaign=${campaign.id}` })),
  }))

  return (
    <>
      <title>{`${campaign.title} · ${SITE_NAME}`}</title>
      <SiteHeader
        subHeader={{
          backHref: paths.teamCampaigns(team.id),
          breadcrumbs: [HOME_CRUMB, ALL_TEAMS_CRUMB, { label: team.name, href: paths.team(team.id) }, { label: campaign.title, href: paths.campaign(campaign.id) }],
        }}
      />
      <main className="flex w-full flex-col items-center gap-indents-xxl-out pt-indents-xxl-out">
        <div className="flex w-full justify-center px-indents-m">
          <div className="flex w-full max-w-size-base-with flex-col gap-indents-2xs">
            <HeroCard variant="with-bg" {...hero} />
            <CardGrid card="stat" items={campaignStatsOf(campaign)} label="Campaign stats" />
            <CardGrid card="campaign" label="Funnel" items={[{ id: 'funnel', title: 'Funnel', stats: campaign.stats, showStatus: false, showButton: false }]} />
          </div>
        </div>
        <KanbanBoard title="Pipeline" columns={columns} className="max-w-size-page" />
      </main>
    </>
  )
}
