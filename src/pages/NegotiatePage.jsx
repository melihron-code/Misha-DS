import { useParams, useSearchParams } from 'react-router-dom'
import { personById } from '../data/people'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHeader } from '../site/SiteHeader'
import { HOME_CRUMB, paths, personContext } from '../site/site'
import NotFoundPage from './NotFoundPage'

// /people/:personId/negotiate — Figma: negotiate. Back leads to the person's page (keeping ?campaign= / ?team=).
export default function NegotiatePage() {
  const person = personById(useParams().personId)
  const [params] = useSearchParams()
  if (!person) return <NotFoundPage />
  const { from, parent } = personContext(person, params)
  const self = paths.person(person.id, from)
  return (
    <>
      <SiteHeader
        subHeader={{
          backHref: self,
          breadcrumbs: [HOME_CRUMB, parent, { label: person.name, href: self }, { label: 'Negotiate', href: paths.negotiate(person.id, from) }].filter(Boolean),
        }}
      />
      <PagePlaceholder
        name={`Negotiate: ${person.name}`}
        screens={['negotiate']}
        heading
        contains={['Header (SubHeader)', 'HeroCard with-bg (no actions)', 'AttemptCard ×3', '⚠ Offer form: salary block, Dropdown on-color ×3, Button “Send offer”', '⚠ Prediction block (“78% predicted approvement”)']}
        idle={['Send offer']}
      />
    </>
  )
}
