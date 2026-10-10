// Builds a JSX snippet for the playground: <Name prop="v" flag>children</Name>.
// Props equal to `defaults`, undefined values and functions are left out.
export function toJsx(name, props, defaults = {}) {
  const attrs = []
  let children
  for (const [k, v] of Object.entries(props)) {
    if (k === 'children') { children = v; continue }
    if (v === undefined || typeof v === 'function' || v === defaults[k]) continue
    if (typeof v === 'string') attrs.push(`${k}="${v}"`)
    else if (v === true) attrs.push(k)
    else attrs.push(`${k}={${JSON.stringify(v)}}`)
  }
  const open = [name, ...attrs].join(' ')
  return children ? `<${open}>${children}</${name}>` : `<${open} />`
}
