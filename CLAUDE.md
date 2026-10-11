# Misha DS

React version of the Figma design system (file `dPIEJfY3Ma8tiCOcO9LXJO`), built in 6 steps:
1 Figma cleanup ✓ · 2 styles and variables ✓ · 3 atoms ✓ · 4 molecules · 5 organisms · 6 site.

Stack: Vite + React (plain JavaScript, `.jsx`), Tailwind CSS v4 (`@tailwindcss/vite`), react-router-dom. No TypeScript, no UI libraries. Windows / PowerShell.

## Commands
- `npm run dev`: dev server at http://localhost:5173 (`/` → `/ds-dev/`)
- `npm run build` / `npm run lint`
- `npm run tokens`: regenerates `src/styles/tokens.css` from `src/ds/foundations.js`
- `npm run icons`: regenerates `src/components/icons/` from `scripts/icons.figma.json` (the SVG export from Figma)
- `npm run check:classes` (after `npm run build`): fails if a class used in `src/` produces no CSS. Tailwind drops unknown classes without any warning. Run it after every UI change, and test the behaviour in a browser (scrolling, sticky, clicks), not just the look.

## Where things live
- `src/ds/foundations.js`: every foundation as read from Figma (names, aliases, values). Edit here, then run `npm run tokens`. Never edit `tokens.css` by hand.
- `src/styles/tokens.css`: generated. Primitives, alias tokens, the Tailwind theme, text-style utilities and fonts.
- `src/styles/interaction.css`: `state-overlay`, `focus-ring`, `focus-ring-within`, `transition-state` and reduced motion. `src/styles/text.css`: `trim-letter-spacing`.
- `src/components/atoms/`: one file per atom, all exported from `index.js`. `shared.js` holds `cx`, `SIZE` (sizes built from tokens with `calc()`), `PRESSABLE` and `stateAttr`.
- `src/components/icons/`: generated icon components (`<PlayIcon size={16} />`) and `ICONS` (Figma name → component). TEMPORARY: these are Apple SF Symbols; replace them before the site is public.
- `src/pages/ds-dev/`: the /ds-dev/ page. Foundations are at `/ds-dev/<name>`, atoms at `/ds-dev/atoms/<atom>`. Each atom's docs (grid and playground) are configured in `atoms/atomDocs.jsx`, so add an entry there for every new component.
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
2. **Names in code match Figma names.** Components, props and variant values follow the "Rename reference" in `NOTES.md` (e.g. `Button` with `variant="primary-sm"`). Tokens follow the Figma variable names (see `foundations.js` for the exact mapping).
3. **Interactive components: the whole visible box, including padding, is the hit area.** Put padding on the `<button>`/`<a>` itself, not on a wrapper. Every interactive element gets a visible `focus-visible` state: use the `focus-ring` utility (or `PRESSABLE` from `atoms/shared.js`), and never `outline-none` without a replacement. Use the proper element (`<button>`, `<a>`, `<input>`, `<label htmlFor>`), support the keyboard and set the right aria.
4. **No hanging short words.** Bind short words (1–3 letters: a, to, the, &, numbers) to the next word with a non-breaking space. Use `nbsp()` for any UI copy.
5. **States.** Hover and pressed lay an overlay over the control (`state-overlay`: `overlay/hover` is 15% black, `overlay/pressed` 25%). Never darken a color by hand. Disabled uses `bg-bg-disabled-bg text-text-disabled`. Every interactive component takes a `state` prop (`hover | pressed | focus | disabled`, rendered as `data-state`) that forces a state. It's for docs only.
6. **Motion.** Use `transition-state`, or `var(--duration-fast)` / `var(--duration-base)` with `var(--ease-out)`. Animate only color, background, border, outline, shadow and transform, never layout (width, height, margin, padding, top/left). Transitions are switched off under `prefers-reduced-motion`; keep it that way.
7. **Labels inside controls get `trim-letter-spacing`**, so their width matches Figma. CSS adds letter spacing after the last character; Figma doesn't.
8. **After each step, add a release-notes entry to the top of `NOTES.md`** in the same format (Summary / Added or Changed / Differences from Figma / How to use), and commit.

## Figma notes
- Akkurat LL Cyr TT and Pixform are custom fonts. They're installed locally and in `src/assets/fonts/`, but the Figma MCP (`use_figma`) can't load them, so text edits on those layers need the local plugin in `figma-plugin-text-styles/`.
- Read values from Figma itself, not from older notes. The table text in the Styles frame is not always up to date (see NOTES.md v0.2.0).
