import { TOKEN_ROW_COLUMNS, TOKEN_ROW_LABELS } from './tokenRow'

// Column labels for the Spacing and Radius lists, on the same grid as the rows.
export default function TokenRowHeader() {
  return (
    <div
      className="grid items-end gap-indents-m pb-indents-xs text-text-caps text-text-secondary"
      style={{ gridTemplateColumns: TOKEN_ROW_COLUMNS }}
    >
      {TOKEN_ROW_LABELS.map(l => (
        <span key={l.text} className={l.className}>{l.text}</span>
      ))}
    </div>
  )
}
