import * as icons from '../../../components/icons'
import { nbsp } from '../../../lib/nbsp'
import CopyButton from '../CopyButton'

// All icon components; click a name to copy it.
const LIST = Object.entries(icons).filter(([name]) => name.endsWith('Icon'))

export default function IconsPage() {
  return (
    <div className="flex flex-col gap-indents-l">
      <p className="text-text-grotesk text-text-secondary">
        {nbsp('Temporary: these are Apple SF Symbols exported from Figma as SVG, to be replaced before the site goes public. Each takes a size prop (px, default 16) and follows the text color. Click a name to copy it.')}
      </p>
      <ul className="grid grid-cols-4 gap-indents-m">
        {LIST.map(([name, Glyph]) => (
          <li key={name} className="flex flex-col items-start gap-indents-xs rounded-radius-m bg-surface-card p-indents-m">
            <span className="text-icon-primary">
              <Glyph size={32} />
            </span>
            <CopyButton value={name} className="-ml-indents-2xs text-text-grotesk-bold">{name}</CopyButton>
          </li>
        ))}
      </ul>
    </div>
  )
}
