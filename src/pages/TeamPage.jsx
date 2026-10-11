import { useParams } from 'react-router-dom'
import { teamHero } from '../data/heroes'
import { membersOf } from '../data/people'
import { teamById } from '../data/teams'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHero } from '../site/SiteHeader'
import { HOME_CRUMB, paths } from '../site/site'
import NotFoundPage from './NotFoundPage'

// /teams/:teamId — Figma: all-teams-one (the Team view of a team).
export default function TeamPage() {
  const team = teamById(useParams().teamId)
  if (!team) return <NotFoundPage />
  const members = membersOf(team.id)
  return (
    <>
      <SiteHero
        subHeader={{ backHref: paths.home, breadcrumbs: [HOME_CRUMB, { label: team.name, href: paths.team(team.id) }] }}
        hero={teamHero(team.name)}
        views={{ team: paths.team(team.id), campaigns: paths.teamCampaigns(team.id) }}
      />
      <PagePlaceholder
        name={team.name}
        screens={['all-teams-one']}
        contains={['HeroSection: Header + hero with Team / Campaigns / Access', '⚠ Notification with Avatars on it', `“Team” section: ProfileCard long ×${members.length}`]}
        links={members.map(p => ({ element: 'ProfileCard', label: p.name, href: paths.person(p.id, { team: team.id }) }))}
      />
    </>
  )
}
