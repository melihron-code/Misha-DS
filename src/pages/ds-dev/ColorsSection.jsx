import { colorTokens, cssVarOf, hueOf, primitiveColors } from '../../ds/foundations'
import { readCssVar } from '../../lib/cssVar'
import CopyButton from './CopyButton'

const groupBy = (items, keyOf) =>
  items.reduce((acc, item) => {
    const k = keyOf(item)
    ;(acc[k] ||= []).push(item)
    return acc
  }, {})

export default function ColorsSection() {
  const hues = groupBy(primitiveColors, hueOf)
  const tokenGroups = groupBy(colorTokens, t => t.figma.split('/')[0])

  return (
    <div className="flex flex-col gap-indents-xxl-minus">
      <section className="flex flex-col gap-indents-l">
        <h2 className="text-heading-h2">Primitives</h2>
        {Object.entries(hues).map(([hue, colors]) => (
          <div key={hue} className="flex flex-col gap-indents-xs">
            <h3 className="text-text-caps text-text-secondary">{hue}</h3>
            <ul className="flex flex-wrap gap-indents-m">
              {colors.map(c => (
                <li key={c.cssVar} className="flex flex-col gap-indents-xxs">
                  <div
                    className="size-indents-xxl-minus rounded-rounds-l border border-border-default"
                    style={{ background: `var(${c.cssVar})` }}
                  />
                  <CopyButton value={`var(${c.cssVar})`} className="text-text-grotesk">{c.figma.replace('color/', '')}</CopyButton>
                  <span className="px-indents-xxs text-text-pixel text-text-secondary">{readCssVar(c.cssVar)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-indents-l">
        <h2 className="text-heading-h2">Tokens</h2>
        {Object.entries(tokenGroups).map(([group, tokens]) => (
          <div key={group} className="flex flex-col gap-indents-xs">
            <h3 className="text-text-caps text-text-secondary">{group}</h3>
            {/* Fixed layout + shared column widths keep columns aligned across all groups. */}
            <table className="w-full max-w-size-base-with table-fixed border-collapse">
              <colgroup>
                <col className="w-indents-x" />
                <col className="w-1/2" />
                <col className="w-1/3" />
                <col />
              </colgroup>
              <thead className="sr-only">
                <tr><th>Swatch</th><th>Token</th><th>Primitive</th><th>Value</th></tr>
              </thead>
              <tbody>
                {tokens.map(t => (
                  <tr key={t.cssVar} className="border-t border-divider-default">
                    <td className="py-indents-xxs">
                      <div className="size-indents-l rounded-rounds-s border border-border-default" style={{ background: `var(${t.cssVar})` }} />
                    </td>
                    <td className="py-indents-xxs">
                      <CopyButton value={t.tw} className="text-text-grotesk-bold">{t.figma}</CopyButton>
                      <CopyButton value={`var(${t.cssVar})`} className="text-text-pixel text-text-secondary">{t.cssVar}</CopyButton>
                    </td>
                    <td className="py-indents-xxs">
                      <CopyButton value={`var(${cssVarOf(t.alias)})`} className="text-text-grotesk text-text-secondary">→ {t.alias}</CopyButton>
                    </td>
                    <td className="py-indents-xxs text-right text-text-pixel">{readCssVar(t.cssVar)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>
    </div>
  )
}
