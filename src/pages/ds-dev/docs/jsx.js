// Builds a JSX snippet for the playground: <Name prop="v" flag>children</Name>.
// Left out: undefined, false and empty values, functions, and props in `skip` (e.g. the
// props of controls that are disabled right now, like Button's sublabel outside node).
export function toJsx(name, props, skip = new Set()) {
  const attrs = []
  let children
  for (const [k, v] of Object.entries(props)) {
    if (skip.has(k)) continue
    if (k === 'children') {
      children = v
      continue
    }
    if (v === undefined || v === false || v === '' || typeof v === 'function') continue
    if (typeof v === 'string') attrs.push(`${k}="${v}"`)
    else if (v === true) attrs.push(k)
    else attrs.push(`${k}={${JSON.stringify(v)}}`)
  }
  const open = [name, ...attrs].join(' ')
  return children ? `<${open}>${children}</${name}>` : `<${open} />`
}
