import { useParams, useSearchParams } from 'react-router-dom'
import { personById } from '../data/people'
import { careerStages } from '../data/stages'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHeader } from '../site/SiteHeader'
import { HOME_CRUMB, paths, personContext } from '../site/site'
import NotFoundPage from './NotFoundPage'

// /people/:personId — Figma: candidate and candidate-interviewed, one template: candidates in the
// Interview stage get the interview content, everyone else the profile content. Header with progress.
// ?campaign= / ?team= is where the page was opened from (Back and the breadcrumbs lead there).

// Where the person is on the career path (Header's StageProgress).
const CAREER_STAGE = { applied: 'Applied', screening: 'Applied', interview: 'Interviewed', offer: 'Interviewed', employee: 'Common' }
const progressFor = person => {
  const i = careerStages.indexOf(CAREER_STAGE[person.stage ?? 'employee'])
  return { stages: careerStages, value: ((i + 0.5) / careerStages.length) * 100 }
}

const PROFILE = {
  screen: 'candidate',
  contains: [
    'HeroCard with-bg (Promote, Negotiate, Suspend, Fire; tags + Add)',
    'Notification',
    '⚠ Achievements list + Button “All achievements”',
    'Personal development: StageProgress, ⚠ “Next level / Prediction” block, Button “More info”',
    '“Reports to” and “Mentoring”: ProfileCard short ×6, Button “Org. chart”',
  ],
  idle: ['Promote', 'Suspend', 'Fire', 'All achievements', 'More info', 'Org. chart', 'Reports to / Mentoring ProfileCards'],
}
const INTERVIEWED = {
  screen: 'candidate-interviewed',
  contains: [
    'HeroCard with-bg (Promote, Negotiate, Suspend, Fire; tags + Add)',
    'Filters: Dropdown + Hire, Reject',
    'Work experience: ExperienceItem ×3',
    'Tech skills: Tag ×5',
    'Key projects: ProjectCard ×3',
    '⚠ Assessment results (skill rows)',
    'Interview history: ProfileCard short ×3',
  ],
  idle: ['Promote', 'Suspend', 'Fire', 'Hire', 'Reject', 'Interview history ProfileCards'],
}

export default function PersonPage() {
  const person = personById(useParams().personId)
  const [params] = useSearchParams()
  if (!person) return <NotFoundPage />
  const { from, parent } = personContext(person, params)
  const view = person.stage === 'interview' ? INTERVIEWED : PROFILE
  return (
    <>
      <SiteHeader
        subHeader={{
          backHref: parent?.href ?? paths.home,
          breadcrumbs: [HOME_CRUMB, parent, { label: person.name, href: paths.person(person.id, from) }].filter(Boolean),
        }}
        progress={progressFor(person)}
      />
      <PagePlaceholder
        name={person.name}
        screens={[view.screen]}
        heading
        contains={['Header (SubHeader + StageProgress)', ...view.contains]}
        links={[{ element: 'Hero button', label: 'Negotiate', href: paths.negotiate(person.id, from) }]}
        idle={view.idle}
      />
    </>
  )
}
