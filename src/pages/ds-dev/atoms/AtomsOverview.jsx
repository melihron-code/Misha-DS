import { Link } from 'react-router-dom'
import { nbsp } from '../../../lib/nbsp'
import { ATOM_PAGES } from './atomDocs'

// /ds-dev/atoms: one card per atom page, linking to it.
export default function AtomsOverview() {
  return (
    <ul className="grid grid-cols-2 gap-indents-m">
      {ATOM_PAGES.map(page => (
        <li key={page.slug} className="flex">
          <Link
            to={`/ds-dev/atoms/${page.slug}`}
            className="flex w-full flex-col gap-indents-xs rounded-radius-m bg-surface-card p-indents-m focus-ring transition-state hover:bg-surface-control"
          >
            <span className="text-heading-h4 text-text-primary">{page.label}</span>
            <span className="text-text-grotesk text-text-secondary">{nbsp(page.about)}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
