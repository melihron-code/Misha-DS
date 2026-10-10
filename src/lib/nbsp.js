// Binds short words (1–3 characters: a, to, the, &, 24 …) to the next word
// with a non-breaking space so they never hang at the end of a line.
export const nbsp = text => text.replace(/(?<=^|[\s(«"“])([\p{L}\p{N}&]{1,3})\s+/gu, '$1 ')
