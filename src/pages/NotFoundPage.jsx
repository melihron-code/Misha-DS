import { Button } from '../components/atoms'
import { SiteHeader } from '../site/SiteHeader'
import { SITE_NAME, paths } from '../site/site'

// Any unknown URL, and a known route with an unknown id (e.g. /teams/nope).
export default function NotFoundPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-size-base-with flex-1 flex-col items-center justify-center gap-indents-x px-indents-m py-indents-xxl text-center">
        <title>{`Page not found · ${SITE_NAME}`}</title>
        <h1 className="text-heading-h1 text-text-primary">Page not found</h1>
        <p className="text-text-description text-text-primary">There’s no page at this address.</p>
        <Button variant="primary-sm" href={paths.home}>
          All teams
        </Button>
      </main>
    </>
  )
}
