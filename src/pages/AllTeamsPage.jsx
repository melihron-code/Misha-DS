import { teamsHero } from '../data/heroes'
import { teams } from '../data/teams'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHero } from '../site/SiteHeader'
import { ALL_TEAMS_CRUMB, HOME_CRUMB, paths } from '../site/site'

// /teams — Figma: all-teams. No Back (Figma: SubHeader showBack off).
export default function AllTeamsPage() {
  return (
    <>
      <SiteHero
        subHeader={{ showBack: false, breadcrumbs: [HOME_CRUMB, ALL_TEAMS_CRUMB] }}
        hero={teamsHero}
        views={{ overview: paths.allTeams, employees: paths.employees }}
      />
      <PagePlaceholder
        name="All teams"
        screens={['all-teams']}
        contains={['HeroSection: Header (no Back) + hero with Overview / Employees / Report', 'MetricCard ×4', 'TeamCard ×6']}
        links={teams.map(t => ({ element: 'TeamCard', label: t.name, href: paths.team(t.id) }))}
      />
    </>
  )
}
