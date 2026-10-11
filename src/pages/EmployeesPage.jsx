import { employeesHero } from '../data/heroes'
import { allEmployees } from '../data/people'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHero } from '../site/SiteHeader'
import { ALL_TEAMS_CRUMB, HOME_CRUMB, paths } from '../site/site'

// /employees — Figma: all-teams-employees (the Employees view of the all-teams hero).
export default function EmployeesPage() {
  return (
    <>
      <SiteHero
        subHeader={{ backHref: paths.allTeams, breadcrumbs: [HOME_CRUMB, ALL_TEAMS_CRUMB, { label: 'Employees', href: paths.employees }] }}
        hero={employeesHero}
        views={{ overview: paths.allTeams, employees: paths.employees }}
      />
      <PagePlaceholder
        name="Employees"
        screens={['all-teams-employees']}
        contains={['HeroSection: Header + hero with Overview / Employees / Report', '⚠ Filter bar (Dropdowns; not a component yet)', `ProfileCard long ×${allEmployees.length}`]}
        links={allEmployees.map(p => ({ element: 'ProfileCard', label: p.name, href: paths.person(p.id, { from: 'employees' }) }))}
      />
    </>
  )
}
