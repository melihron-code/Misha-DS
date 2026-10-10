import { TOKEN_ROW_COLUMNS } from './tokenRow'

// Column labels for the Spacing and Radius lists. Same grid as the rows. The first
// three cells (name, variable, primitive) have the copy buttons' inline padding, so
// those labels get it too and start exactly where their column's text starts.
const PADDED = 3

export default function TokenRowHeader({ labels }) {
  return (
    <div
      className="grid items-end gap-indents-m pb-indents-xs text-text-caps text-text-secondary"
      style={{ gridTemplateColumns: TOKEN_ROW_COLUMNS }}
    >
      {labels.map((l, i) => (
        <span key={l} className={i < PADDED ? 'px-indents-xxs' : ''}>{l}</span>
      ))}
    </div>
  )
}
