import { Button, TextLink, Tooltip } from '../components/atoms'
import { NO_ACTION, SITE_NAME } from './site'

// Step 6, part 1: a page's content before it's built (part 2). It sets the tab title and shows the page's
// name, its Figma screen(s), what it will contain, where its elements lead (working links) and the
// elements with no action yet (with the "No action for now" tooltip).
// `heading`: the page's h1 (pages under a HeroSection already have theirs in the hero).
// contains: [text]; links: [{ element, label, href }]; idle: [label]; children: extra blocks (overlays).

function Block({ title, children }) {
  return (
    <div className="flex flex-col gap-indents-xs">
      <h2 className="text-text-caps text-text-secondary">{title}</h2>
      {children}
    </div>
  )
}

export default function PagePlaceholder({ name, screens = [], heading = false, contains = [], links = [], idle = [], children }) {
  const Title = heading ? 'h1' : 'p'
  return (
    <main className="mx-auto flex w-full max-w-size-base-with flex-col px-indents-m py-indents-xxl">
      <title>{`${name} · ${SITE_NAME}`}</title>
      <div className="flex flex-col gap-indents-x rounded-radius-l bg-surface-card p-indents-x">
        <div className="flex flex-col gap-indents-xs">
          <p className="text-text-caps text-text-secondary">Placeholder · Figma: {screens.join(', ')}</p>
          <Title className="text-heading-h2 text-text-primary">{name}</Title>
        </div>
        {contains.length > 0 && (
          <Block title="Will contain">
            <ul className="flex flex-col gap-indents-2xs text-text-grotesk text-text-primary">
              {contains.map(c => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Block>
        )}
        {links.length > 0 && (
          <Block title="Leads to">
            <ul className="flex flex-col gap-indents-xs text-text-grotesk">
              {links.map(l => (
                <li key={`${l.element}-${l.href}-${l.label}`} className="flex flex-wrap items-baseline gap-indents-xs">
                  <span className="text-text-secondary">{l.element}</span>
                  <TextLink href={l.href}>{l.label}</TextLink>
                  <span className="text-text-tertiary">{l.href}</span>
                </li>
              ))}
            </ul>
          </Block>
        )}
        {idle.length > 0 && (
          <Block title="No action yet">
            <div className="flex flex-wrap gap-indents-xs">
              {idle.map(label => (
                <Tooltip key={label} text={NO_ACTION}>
                  <Button variant="secondary">{label}</Button>
                </Tooltip>
              ))}
            </div>
          </Block>
        )}
        {children}
      </div>
    </main>
  )
}
