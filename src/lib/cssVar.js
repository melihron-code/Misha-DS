// Reads the computed value of a CSS custom property on :root, so the page
// shows what the browser actually resolves (aliases followed), not a copy.
export function readCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}
