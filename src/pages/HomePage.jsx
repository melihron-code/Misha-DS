import { teamsHero } from '../data/heroes'
import { teams } from '../data/teams'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHero } from '../site/SiteHeader'
import { HOME_CRUMB, paths } from '../site/site'

// / — Figma: all-teams. The home page: no Back (SubHeader showBack off).
export default function HomePage() {
  return (
    <>
      <SiteHero
        subHeader={{ showBack: false, breadcrumbs: [HOME_CRUMB] }}
        hero={teamsHero}
        views={{ overview: paths.home, employees: paths.employees }}
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
