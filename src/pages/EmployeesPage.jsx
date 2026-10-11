import { employeesHero } from '../data/heroes'
import { allEmployees } from '../data/people'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHero } from '../site/SiteHeader'
import { HOME_CRUMB, paths } from '../site/site'

// /employees — Figma: all-teams-employees (the Employees view of the all-teams hero).
export default function EmployeesPage() {
  return (
    <>
      <SiteHero
        subHeader={{ backHref: paths.home, breadcrumbs: [HOME_CRUMB, { label: 'Employees', href: paths.employees }] }}
        hero={employeesHero}
        views={{ overview: paths.home, employees: paths.employees }}
      />
      <PagePlaceholder
        name="Employees"
        screens={['all-teams-employees']}
        contains={['HeroSection: Header + hero with Overview / Employees / Report', '⚠ Filter bar (Dropdowns; not a component yet)', `ProfileCard long ×${allEmployees.length}`]}
        idle={allEmployees.map(p => p.name)}
      />
    </>
  )
}
