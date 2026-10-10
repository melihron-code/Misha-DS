// Column labels for the Spacing and Radius lists, on the same grid as the rows.
// labels: [{ text, className }] in column order.
export default function TokenRowHeader({ columns, labels }) {
  return (
    <div
      className="grid items-end gap-indents-m pb-indents-xs text-text-caps text-text-secondary"
      style={{ gridTemplateColumns: columns }}
    >
      {labels.map(l => (
        <span key={l.text} className={l.className}>{l.text}</span>
      ))}
    </div>
  )
}
