import { useSearchParams } from 'react-router-dom'
import { teamById } from '../data/teams'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHeader } from '../site/SiteHeader'
import { HOME_CRUMB, paths } from '../site/site'

// /campaigns/new — Figma: hiring-campaign-add. ?team= is the team it was started from (Back leads there).
export default function NewCampaignPage() {
  const team = teamById(useSearchParams()[0].get('team'))
  const crumbs = team
    ? [HOME_CRUMB, { label: team.name, href: paths.team(team.id) }, { label: 'Campaigns', href: paths.teamCampaigns(team.id) }]
    : [HOME_CRUMB]
  return (
    <>
      <SiteHeader
        subHeader={{
          backHref: team ? paths.teamCampaigns(team.id) : paths.home,
          breadcrumbs: [...crumbs, { label: 'New campaign', href: paths.newCampaign(team?.id) }],
        }}
      />
      <PagePlaceholder
        name="New campaign"
        screens={['hiring-campaign-add']}
        heading
        contains={['Header (SubHeader)', 'HeroCard with-bg (“New Campaign Start”, no actions)', '“Task” section: TaskItem ×6']}
        links={[{ element: 'TaskItem button', label: 'Job description', href: paths.jobDescription(team?.id) }]}
        idle={['Review', 'Generate']}
      />
    </>
  )
}
