import { useParams } from 'react-router-dom'
import { teamCampaignsHero } from '../data/heroes'
import { campaignsOf, teamById } from '../data/teams'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHero } from '../site/SiteHeader'
import { ALL_TEAMS_CRUMB, HOME_CRUMB, paths } from '../site/site'
import NotFoundPage from './NotFoundPage'

// /teams/:teamId/campaigns — Figma: all-teams-campaigns (the Campaigns view of a team).
export default function TeamCampaignsPage() {
  const team = teamById(useParams().teamId)
  if (!team) return <NotFoundPage />
  const campaigns = campaignsOf(team.id)
  return (
    <>
      <SiteHero
        subHeader={{
          backHref: paths.team(team.id),
          breadcrumbs: [HOME_CRUMB, ALL_TEAMS_CRUMB, { label: team.name, href: paths.team(team.id) }, { label: 'Campaigns', href: paths.teamCampaigns(team.id) }],
        }}
        hero={teamCampaignsHero(team.name)}
        views={{ team: paths.team(team.id), campaigns: paths.teamCampaigns(team.id) }}
        actions={{ 'Add campaign': paths.newCampaign(team.id) }}
      />
      <PagePlaceholder
        name={`${team.name}: campaigns`}
        screens={['all-teams-campaigns']}
        contains={['HeroSection: Header + hero with Add campaign and Team / Campaigns / Access', 'Notification', `CampaignCard ×${campaigns.length} (status, “More info”)`]}
        links={campaigns.filter(c => c.linked !== false).map(c => ({ element: 'CampaignCard', label: c.title, href: paths.campaign(c.id) }))}
        idle={[...campaigns.filter(c => c.linked === false).map(c => c.title), 'More info']}
      />
    </>
  )
}
