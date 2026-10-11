import * as icons from '../../../components/icons'
import CopyButton from '../CopyButton'

// Every icon component, with its Figma name (for <Icon name="…" />). Click either to copy it.
const FIGMA_NAME = new Map(Object.entries(icons.ICONS).map(([name, Glyph]) => [Glyph, name]))
const LIST = Object.entries(icons).filter(([name]) => name.endsWith('Icon'))

export default function IconGallery() {
  return (
    <ul className="grid grid-cols-4 gap-indents-m">
      {LIST.map(([component, Glyph]) => {
        const name = FIGMA_NAME.get(Glyph)
        return (
          <li key={component} className="flex flex-col items-start gap-indents-xs rounded-radius-m bg-surface-card p-indents-m">
            <span className="text-icon-primary">
              <Glyph size={32} />
            </span>
            <div className="-ml-indents-2xs flex flex-col items-start">
              <CopyButton value={component} className="text-text-grotesk-bold">{component}</CopyButton>
              {name && <CopyButton value={`<Icon name="${name}" />`} className="text-text-grotesk text-text-secondary">{name}</CopyButton>}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
