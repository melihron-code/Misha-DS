# Misha DS

React version of the Figma design system (file `dPIEJfY3Ma8tiCOcO9LXJO`), built in 5 steps:
1 Figma cleanup ✓ · 2 styles and variables ✓ · 3 atoms · 4 molecules · 5 site.

Stack: Vite + React (plain JavaScript, `.jsx`), Tailwind CSS v4 (`@tailwindcss/vite`), react-router-dom. No TypeScript, no UI libraries. Windows / PowerShell.

## Commands
- `npm run dev`: dev server at http://localhost:5173 (`/` → `/ds-dev/`)
- `npm run build` / `npm run lint`
- `npm run tokens`: regenerates `src/styles/tokens.css` from `src/ds/foundations.js`
- `npm run check:classes` (after `npm run build`): fails if a class used in `src/` produces no CSS. Tailwind drops unknown classes without any warning. Run it after every UI change, and test the behaviour in a browser (scrolling, sticky, clicks), not just the look.

## Where things live
- `src/ds/foundations.js`: every foundation as read from Figma (names, aliases, values). Edit here, then run `npm run tokens`. Never edit `tokens.css` by hand.
- `src/styles/tokens.css`: generated. Primitives, alias tokens, the Tailwind theme, text-style utilities and fonts.
- `src/pages/ds-dev/`: the /ds-dev/ foundations page.
- `src/lib/nbsp.js`: `nbsp(text)` binds short words to the next word.
- `NOTES.md`: release notes and the Figma rename reference.

## Rules
1. **Only design tokens and text-style utilities.** No hardcoded colors, spacing, radius, font values or shadows: no hex values, no `px` values, no arbitrary values like `p-[13px]` or `text-[#000]`. Tailwind's default palette, spacing scale, radii, shadows and type scale are switched off, so only design-system classes exist:
   - color: `bg-surface-card`, `text-text-primary`, `border-border-default`, `bg-accent-highlight` …
   - spacing: `p-indents-m`, `gap-indents-xs`, `px-indents-s-inner`, `ml-indents-neg-xs` …
   - radius: `rounded-radius-s | -m | -l | -over`
   - shadow: `shadow-card`
   - text: `text-heading-h1 | -h2 | -h3 | -h4`, `text-text-description | -pixel | -grotesk | -grotesk-bold | -caps`
   - widths: `max-w-size-base-with`
   - zero: `top-0`, `inset-0`, `m-0`, `p-0`, `gap-0` (the only spacing value without a token)
   In inline styles, use only `var(--token)`.
   If a design needs a value that has no token, stop and ask. Don't invent one.
2. **Names in code match Figma names.** Components, props and variant values follow the "Rename reference" in `NOTES.md` (e.g. `Button` with `variant="primary-sm"`, `cta`). Tokens follow the Figma variable names (see `foundations.js` for the exact mapping).
3. **Interactive components: the whole visible box, including padding, is the hit area.** Put padding on the `<button>`/`<a>` itself, not on a wrapper. Every interactive element gets a visible `focus-visible` state (`focus-visible:outline-2 focus-visible:outline-border-focus`).
4. **No hanging short words.** Bind short words (1–3 letters: a, to, the, &, numbers) to the next word with a non-breaking space. Use `nbsp()` for any UI copy.
5. **After each step, add a release-notes entry to the top of `NOTES.md`** in the same format (Summary / Added or Changed / Differences from Figma / How to use), and commit.

## Figma notes
- Akkurat LL Cyr TT and Pixform are custom fonts. They're installed locally and in `src/assets/fonts/`, but the Figma MCP (`use_figma`) can't load them, so text edits on those layers need the local plugin in `figma-plugin-text-styles/`.
- Read values from Figma itself, not from older notes. The table text in the Styles frame is not always up to date (see NOTES.md v0.2.0).
