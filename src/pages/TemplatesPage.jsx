import { useState } from 'react'
import { DocumentList } from '../components/organisms'
import { templatesHero } from '../data/heroes'
import { templateTypeByView, templates } from '../data/templates'
import { SiteHero } from '../site/SiteHeader'
import { HOME_CRUMB, NO_ACTION, SITE_NAME, paths } from '../site/site'

// /templates — Figma: all-teams-templates (357:58972; built there from Header + HeroCard + background, here a
// HeroSection as on the other all-teams pages). Then the 830px content column (size/base-with) with the template
// list; indents/XS under the hero, indents/XXL at the bottom, indents/M at the sides. The hero toggle (All /
// Automations / Documents / Access) filters the list on the page; the rows' Edit has no action yet.
export default function TemplatesPage() {
  const [view, setView] = useState('all')
  const type = templateTypeByView[view]
  const documents = templates.filter(t => !type || t.type === type)

  return (
    <>
      <title>{`All templates · ${SITE_NAME}`}</title>
      <SiteHero
        subHeader={{ backHref: paths.home, breadcrumbs: [HOME_CRUMB, { label: 'All templates', href: paths.templates }] }}
        hero={templatesHero}
        view={view}
        onViewChange={setView}
      />
      <main className="flex w-full justify-center px-indents-m pt-indents-xs pb-indents-xxl">
        <div className="flex w-full max-w-size-base-with flex-col">
          <DocumentList label="Templates" documents={documents} editTooltip={NO_ACTION} emptyText="No templates of this type yet." />
        </div>
      </main>
    </>
  )
}
