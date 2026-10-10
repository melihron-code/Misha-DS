// True when text on this color should be light. Translucent colors (#rrggbbaa)
// are judged as they appear over `backdrop` (another hex).
export function isDark(hex, backdrop = '#ffffff') {
  const rgba = h => {
    const s = h.replace('#', '')
    const n = i => parseInt(s.slice(i, i + 2), 16) / 255
    return [n(0), n(2), n(4), s.length === 8 ? n(6) : 1]
  }
  const [r, g, b, a] = rgba(hex)
  const [br, bg, bb] = rgba(backdrop)
  const mix = (c, k) => c * a + k * (1 - a)
  const lin = c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  const luminance = 0.2126 * lin(mix(r, br)) + 0.7152 * lin(mix(g, bg)) + 0.0722 * lin(mix(b, bb))
  // Below ~0.3 relative luminance, white text reads better than black.
  return luminance < 0.3
}
