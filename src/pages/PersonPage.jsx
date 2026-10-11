import { useParams, useSearchParams } from 'react-router-dom'
import { AchievementsCard, DevelopmentCard, HeroCard, RelationsCard, TeamSummary } from '../components/organisms'
import { candidateHero } from '../data/heroes'
import { personById } from '../data/people'
import { achievementsFor, personProfile } from '../data/profiles'
import { careerStages } from '../data/stages'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHeader } from '../site/SiteHeader'
import { HOME_CRUMB, NO_ACTION, SITE_NAME, noAction, paths, personContext } from '../site/site'
import NotFoundPage from './NotFoundPage'

// /people/:personId — Figma: candidate (profile, 357:59014 / 357:58796) and candidate-interviewed (interview), one
// template: candidates in the Interview stage get the interview content (still a placeholder), everyone else the
// profile. Header with the career progress; then the 830px content column (size/base-with), indents/XXL (out) under
// the Header (Figma: the screen's gap), cards indents/2XS apart, indents/XXL at the bottom, indents/M at the sides.
// ?campaign= / ?from=employees / ?team= is where the page was opened from (Back and the breadcrumbs lead there).

// Where the person is on the career path (Header's StageProgress).
const CAREER_STAGE = { applied: 'Applied', screening: 'Applied', interview: 'Interviewed', offer: 'Interviewed', employee: 'Common' }
const progressFor = person => {
  const i = careerStages.indexOf(CAREER_STAGE[person.stage ?? 'employee'])
  return { stages: careerStages, value: ((i + 0.5) / careerStages.length) * 100 }
}

// The interview view (Figma: candidate-interviewed) is built in a later run.
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

function Profile({ person, negotiateHref }) {
  const { summary, achievements, development, relations } = personProfile
  const hero = {
    ...candidateHero,
    title: person.name,
    subtitle: person.role,
    actions: candidateHero.actions.map(a => (a.label === 'Negotiate' ? { ...a, href: negotiateHref } : noAction(a))),
  }
  return (
    <main className="flex w-full justify-center px-indents-m pt-indents-xxl-out pb-indents-xxl">
      <div className="flex w-full max-w-size-base-with flex-col gap-indents-2xs">
        <HeroCard variant="with-bg" {...hero} />
        <TeamSummary label="Summary" message={summary} />
        <AchievementsCard title={achievements.title} achievements={achievementsFor(person.id)} action={{ label: achievements.actionLabel, tooltip: NO_ACTION }} />
        <DevelopmentCard
          title={development.title}
          stages={development.stages}
          value={development.value}
          nextLevel={development.nextLevel}
          prediction={development.prediction}
          action={{ label: development.actionLabel, tooltip: NO_ACTION }}
        />
        <RelationsCard
          groups={relations.map(g => ({
            title: g.title,
            people: g.people.map(p => ({ ...p, tooltip: NO_ACTION })),
            action: g.actionLabel && { label: g.actionLabel, tooltip: NO_ACTION },
          }))}
        />
      </div>
    </main>
  )
}

export default function PersonPage() {
  const person = personById(useParams().personId)
  const [params] = useSearchParams()
  if (!person) return <NotFoundPage />
  const { from, parent } = personContext(person, params)
  const negotiateHref = paths.negotiate(person.id, from)
  const interviewed = person.stage === 'interview'
  return (
    <>
      <title>{`${person.name} · ${SITE_NAME}`}</title>
      <SiteHeader
        subHeader={{
          backHref: parent?.href ?? paths.home,
          breadcrumbs: [HOME_CRUMB, parent, { label: person.name, href: paths.person(person.id, from) }].filter(Boolean),
        }}
        progress={progressFor(person)}
      />
      {interviewed ? (
        <PagePlaceholder
          name={person.name}
          screens={[INTERVIEWED.screen]}
          heading
          contains={['Header (SubHeader + StageProgress)', ...INTERVIEWED.contains]}
          links={[{ element: 'Hero button', label: 'Negotiate', href: negotiateHref }]}
          idle={INTERVIEWED.idle}
        />
      ) : (
        <Profile person={person} negotiateHref={negotiateHref} />
      )}
    </>
  )
}
