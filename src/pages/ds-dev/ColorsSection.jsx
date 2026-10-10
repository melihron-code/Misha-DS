import { colorTokens, cssVarOf, groupOf, primitiveColors } from '../../ds/foundations'
import { readCssVar } from '../../lib/cssVar'
import { nbsp } from '../../lib/nbsp'
import CodeNames from './CodeNames'
import CopyButton from './CopyButton'

const groupBy = (items, keyOf) =>
  items.reduce((acc, item) => {
    const k = keyOf(item)
    ;(acc[k] ||= []).push(item)
    return acc
  }, {})

const hexOf = cssVar => readCssVar(cssVar).toUpperCase()

// Grid placement in the 6-column swatch grid: white sits alone on its row, and
// these swatches start a new row so hue families stay together
// (reds·pink·purples | greens·sage | yellows·olives·brown).
const ALONE = new Set(['color/neutral/0'])
const ROW_START = new Set(['color/colors/green-100', 'color/colors/yellow-200'])
const placement = c => (ALONE.has(c.figma) ? 'col-span-6' : ROW_START.has(c.figma) ? 'col-start-1' : '')

export default function ColorsSection() {
  const groups = groupBy(primitiveColors, groupOf)
  const tokenGroups = groupBy(colorTokens, t => t.figma.split('/')[0])

  return (
    <div className="flex flex-col gap-indents-xxl-minus">
      <section className="flex flex-col gap-indents-l">
        <h2 className="text-heading-h2">Primitives</h2>
        <p className="text-text-grotesk text-text-secondary">
          {nbsp('Raw palette. Primitives have no Tailwind classes on purpose: components use the tokens below. Copy the CSS variable only when defining a new token.')}
        </p>
        {Object.entries(groups).map(([group, colors]) => (
          <div key={group} className="flex flex-col gap-indents-xs">
            <h3 className="text-heading-h3 text-status-info">{group}</h3>
            {/* 6 equal columns: swatches line up in a grid in both groups. */}
            <ul className="grid grid-cols-6 gap-x-indents-xs gap-y-indents-l">
              {colors.map(c => (
                <li key={c.cssVar} className={`flex min-w-0 flex-col gap-indents-xxs ${placement(c)}`}>
                  {/* 1.5 × indents/XXL- wide (126px), indents/XXL- tall (84px). */}
                  <div
                    className="h-indents-xxl-minus rounded-rounds-l border border-border-default"
                    style={{ width: 'calc(var(--indents-xxl-minus) * 1.5)', background: `var(${c.cssVar})` }}
                  />
                  {/* Negative margin cancels the copy buttons' padding so all text starts at the swatch edge. */}
                  <div className="-ml-indents-xxs flex flex-col items-start">
                    <span className="px-indents-xxs text-text-grotesk-bold text-text-primary">{hexOf(c.cssVar)}</span>
                    <CopyButton value={`var(${c.cssVar})`} className="text-text-grotesk-bold">{c.figma.replace('color/', '')}</CopyButton>
                    <CodeNames cssVar={c.cssVar} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-indents-l">
        <h2 className="text-heading-h2">Tokens</h2>
        <p className="text-text-grotesk text-text-secondary">
          {nbsp('Use these in components.')}
        </p>
        {Object.entries(tokenGroups).map(([group, tokens]) => (
          <div key={group} className="flex flex-col gap-indents-xs">
            <h3 className="text-heading-h3 text-status-info">{group}</h3>
            {/* Fixed layout + shared column widths keep columns aligned across all groups. */}
            <table className="w-full table-fixed border-collapse">
              <colgroup>
                <col className="w-indents-x" />
                <col className="w-1/3" />
                <col />
                <col className="w-1/6" />
              </colgroup>
              <thead className="sr-only">
                <tr><th>Swatch</th><th>Token</th><th>CSS variable and primitive</th><th>Value</th></tr>
              </thead>
              <tbody>
                {tokens.map(t => (
                  <tr key={t.cssVar} className="border-t border-divider-default">
                    <td className="py-indents-xxs">
                      <div className="size-indents-l rounded-rounds-s border border-border-default" style={{ background: `var(${t.cssVar})` }} />
                    </td>
                    <td className="py-indents-xxs">
                      <CopyButton value={`var(${t.cssVar})`} className="text-text-grotesk-bold">{t.figma}</CopyButton>
                    </td>
                    <td className="py-indents-xxs">
                      <div className="flex flex-col items-start">
                        <CodeNames cssVar={t.cssVar} />
                        <CopyButton value={`var(${cssVarOf(t.alias)})`} className="text-text-grotesk text-text-secondary">→ {t.alias}</CopyButton>
                      </div>
                    </td>
                    <td className="py-indents-xxs text-right text-text-grotesk-bold text-text-primary">{hexOf(t.cssVar)}</td>
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
