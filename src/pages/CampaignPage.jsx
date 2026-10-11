import { useParams } from 'react-router-dom'
import { pipeline } from '../data/pipeline'
import { campaignById, teamById } from '../data/teams'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHeader } from '../site/SiteHeader'
import { ALL_TEAMS_CRUMB, HOME_CRUMB, paths } from '../site/site'
import NotFoundPage from './NotFoundPage'

// /campaigns/:campaignId — Figma: hiring-campaign. The Kanban's people open with ?campaign=, so their
// page leads back here.
export default function CampaignPage() {
  const campaign = campaignById(useParams().campaignId)
  if (!campaign) return <NotFoundPage />
  const team = teamById(campaign.teamId)
  const links = pipeline.flatMap(column =>
    column.people.map(p => ({ element: `Kanban · ${column.title}`, label: p.name, href: `${p.href}?campaign=${campaign.id}` })),
  )
  return (
    <>
      <SiteHeader
        subHeader={{
          backHref: paths.teamCampaigns(team.id),
          breadcrumbs: [HOME_CRUMB, ALL_TEAMS_CRUMB, { label: team.name, href: paths.team(team.id) }, { label: campaign.title, href: paths.campaign(campaign.id) }],
        }}
      />
      <PagePlaceholder
        name={campaign.title}
        screens={['hiring-campaign']}
        heading
        contains={['Header (SubHeader)', 'HeroCard with-bg (Finish, Cancel; tags + Add)', 'StatCard ×3', 'CampaignCard (no status, no button)', 'KanbanBoard']}
        links={links}
        idle={['Finish', 'Cancel']}
      />
    </>
  )
}
