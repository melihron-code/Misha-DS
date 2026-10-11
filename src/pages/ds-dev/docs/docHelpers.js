// Building blocks for the component docs (atoms/atomDocs.jsx, molecules/moleculeDocs.jsx).
//
// A component doc:
// name:     the component's name in code; label: its name in the docs.
// grid:     rows (variants) × columns (states or cases); each cell renders <Component {...row} {...column} />.
// controls: the playground's controls (shown beside its title); `enabled(props)` disables one when false;
//           `double` makes a text field twice as wide; `initial` its starting props; `toProps` maps them.
// bind:     wires the playground so the component really responds (toggles, selections, typing).
// controlGrid: a column count (3 or 4): the playground controls sit on equal columns, edges lined up;
//           a control spans 1 column (`double`: 2, or `span`). controlFill: the grid fills the width after the title.
// frame:    organisms: show them in a page frame (desktop in the grid; Desktop / Tablet / Mobile in the
//           playground; frameMinHeight leaves room in it, e.g. for the open mobile menu).
//           snippetNames: { prop: 'identifier' } for sample data in the snippet;
//           defaults: props left out of the snippet when unchanged (a changed false prints as {false}).
// width:    a width class for the grid and the preview (components that fill their container);
//           wide / narrow are the older shorthands (full, half).
//
// A page: { slug, label, about?, uses?, parts: [doc, …] } or { slug, label, about, render }.
export const STATES = ['default', 'hover', 'pressed', 'focus', 'disabled'].map(s => ({ label: s, props: { state: s } }))
export const STATES_NO_DISABLED = STATES.filter(c => c.label !== 'disabled')
export const ONE = [{ label: 'default', props: {} }]
export const select = (prop, options, label) => ({ prop, type: 'select', options, label })
export const toggle = (prop, label) => ({ prop, type: 'boolean', label })
export const text = (prop, label) => ({ prop, type: 'text', label })
export const number = (prop, label) => ({ prop, type: 'number', label })

// Fills in each page's `about` from its first component when it has none.
export const withAbout = pages => pages.map(page => ({ ...page, about: page.about ?? page.parts[0].about }))
