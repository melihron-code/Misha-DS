import { useState } from 'react'
import { PeopleList } from '../components/organisms'
import { employeesHero } from '../data/heroes'
import { allEmployees, employeeFilters } from '../data/people'
import { SiteHero } from '../site/SiteHeader'
import { ALL_TEAMS_CRUMB, HOME_CRUMB, NO_ACTION, SITE_NAME, paths } from '../site/site'

// /employees — Figma: all-teams-employees (357:58948), the Employees view of the all-teams hero. HeroSection, then
// the 830px content column (size/base-with) with the employee list; indents/XS under the hero, indents/XXL at the
// bottom, indents/M at the sides (as All teams). The status chips filter the list; the curator dropdown has no
// action yet. Each person opens their page (?from=employees, so Back leads here).
export default function EmployeesPage() {
  const [status, setStatus] = useState('all')
  const people = allEmployees
    .filter(p => status === 'all' || p.status === status)
    .map(p => ({ id: p.id, name: p.name, role: p.role, image: p.image, status: p.status, progress: p.progress, href: paths.person(p.id, { from: 'employees' }) }))

  return (
    <>
      <title>{`Employees · ${SITE_NAME}`}</title>
      <SiteHero
        subHeader={{ backHref: paths.allTeams, breadcrumbs: [HOME_CRUMB, ALL_TEAMS_CRUMB, { label: 'Employees', href: paths.employees }] }}
        hero={employeesHero}
        views={{ overview: paths.allTeams, employees: paths.employees }}
      />
      <main className="flex w-full justify-center px-indents-m pt-indents-xs pb-indents-xxl">
        <div className="flex w-full max-w-size-base-with flex-col">
          <PeopleList
            label="Employees"
            people={people}
            statusFilter={{ ...employeeFilters.status, value: status, onChange: setStatus }}
            selectFilter={{ ...employeeFilters.curator, tooltip: NO_ACTION }}
            emptyText="No employees with this status."
          />
        </div>
      </main>
    </>
  )
}
