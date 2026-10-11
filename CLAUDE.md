# Misha DS

React version of the Figma design system (file `dPIEJfY3Ma8tiCOcO9LXJO`), built in 6 steps:
1 Figma cleanup ✓ · 2 styles and variables ✓ · 3 atoms ✓ · 4 molecules ✓ · 5 organisms ✓ · 6 site.

Stack: Vite + React (plain JavaScript, `.jsx`), Tailwind CSS v4 (`@tailwindcss/vite`), react-router-dom. No TypeScript, no UI libraries. Windows / PowerShell.

## Commands
- `npm run dev`: dev server at http://localhost:5173 (the site at `/`, the design system docs at `/ds-dev/`)
- `npm run build` / `npm run lint`
- `npm run tokens`: regenerates `src/styles/tokens.css` from `src/ds/foundations.js`
- `npm run icons`: regenerates `src/components/icons/` from `scripts/icons.figma.json` (the SVG export from Figma)
- `npm run check:classes` (after `npm run build`): fails if a class used in `src/` produces no CSS. Tailwind drops unknown classes without any warning. Run it after every UI change, and test the behaviour in a browser (scrolling, sticky, clicks), not just the look.

## Where things live
- `src/ds/foundations.js`: every foundation as read from Figma (names, aliases, values). Edit here, then run `npm run tokens`. Never edit `tokens.css` by hand.
- `src/styles/tokens.css`: generated. Primitives, alias tokens, the Tailwind theme, text-style utilities and fonts.
- `src/styles/interaction.css`: `state-overlay`, `focus-ring`, `focus-ring-within`, `transition-state`, `collapsible` (expand / collapse), `scrollbar-stable` and reduced motion. `src/styles/text.css`: `trim-letter-spacing`, and `truncate-x` (one line with "…"; use it instead of Tailwind's `truncate`, which cuts off descenders because every text style's line height is smaller than its font size).
- `src/components/atoms/`: one file per atom, all exported from `index.js`. `shared.js` holds `cx`, `SIZE` (sizes built from tokens with `calc()`), `PRESSABLE` and `stateAttr`.
- `src/components/molecules/`: one file per molecule, all exported from `index.js`, built only from atoms.
- `src/components/support/`: helpers the components use that aren't part of the design system: `Tooltip` ("No action for now"; no /ds-dev/ page, not in Figma).
- `src/components/organisms/`: one file per organism, all exported from `index.js`, built from molecules and atoms (and other organisms: Header nests TopMenu and SubHeader).
- `src/data/`: sample content, one file per topic (navigation, stages, people, pipeline, teams, tasks, heroes). Components never import it; pages and docs pass it in as props.
- `src/assets/hero/`: the hero images (JPEG, the backdrop at 2× the page width).
- `src/components/icons/`: generated icon components (`<PlayIcon size={16} />`) and `ICONS` (Figma name → component). TEMPORARY: these are Apple SF Symbols; replace them before the site is public.
- `src/pages/ds-dev/`: the /ds-dev/ page. Foundations are at `/ds-dev/<name>`; atoms, molecules and organisms are scrolling pages at `/ds-dev/atoms/<atom>`, `/ds-dev/molecules/<molecule>` and `/ds-dev/organisms/<organism>`. Each component's docs (grid, playground, snippet, "Uses") are configured in `atoms/atomDocs.jsx`, `molecules/moleculeDocs.jsx` or `organisms/organismDocs.jsx` (format in `docs/docHelpers.js`), so add an entry there for every new component. `docs/` holds the shared page, overview and doc renderer.
- `src/pages/` (except `ds-dev/`): the site, one file per page (`HomePage.jsx`…); routes in `src/App.jsx`. `docs/sitemap.md` is the site map: every page, route, Figma screen and connection; keep it up to date.
- `src/site/`: what all site pages share: `SiteLayout.jsx` (the page root with `@container/page`, client-side links, scroll to top), `SiteHeader.jsx` (`SiteHeader` / `SiteHero`: the top of every page, the TopMenu built in one place), `site.js` (`paths` for every route, `NO_ACTION`), `PagePlaceholder.jsx` (a page not built yet), and `parts/`: **site parts**, page sections that only one page needs and that aren't in the design system (`CampaignForm` with its `SkillsInput`, `RelationsCard`, `TaskItem`); built from design-system atoms and molecules, no /ds-dev/ pages.
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
5. **States: every interactive part works like the Button atom** (`atoms/Button.jsx`), at every level (atoms, molecules, organisms, site), including list items, tabs, rows and clickable areas that aren't atoms:
   - Hover, pressed, focus and disabled work for real in the browser, with the colors and styles from Figma.
   - Hover and pressed lay an overlay over the control (`state-overlay`: `overlay/hover` is 15% black, `overlay/pressed` 25%). Never darken a color by hand. Pressed has no extra shadow or movement, same as the Button.
   - Focus: the `focus-ring` utility (`border/focus`, `indents/3XS` wide and offset), only on keyboard focus (`:focus-visible`), never hidden by or overlapping a shadow.
   - Disabled: `bg-bg-disabled-bg text-text-disabled` (labels too), the same for every variant; no hover or pressed, `cursor-not-allowed`, not clickable or focusable. Never let a variant color and the disabled color both apply: pick one (`isDisabled ? DISABLED : COLOR[variant]`).
   - Every interactive component takes a `state` prop (`hover | pressed | focus | disabled`, rendered as `data-state`) that forces a state. It's for docs only.
   - `PRESSABLE` in `atoms/shared.js` bundles the overlay, focus ring, transition and cursors.
   - If Figma shows a hover or pressed look for a part that doesn't fit these rules, ask instead of inventing a style.
6. **Motion.** Use `transition-state`, or `var(--duration-fast)` / `var(--duration-base)` with `var(--ease-out)`. Animate only color, background, border, outline, shadow and transform, never layout (width, height, margin, padding, top/left). One exception: expand / collapse uses the `collapsible` utility (height via grid rows, plus opacity, `--duration-base`). Transitions are switched off under `prefers-reduced-motion`; keep it that way.
7. **Labels inside controls get `trim-letter-spacing`**, so their width matches Figma. CSS adds letter spacing after the last character; Figma doesn't.
8. **Each level is built only from the level below:** molecules from atoms, organisms from molecules and atoms, the site from organisms (and site parts in `src/site/parts/` for sections only one page needs; keep the design system small: add a component to it only when it's reused or in Figma). Never copy or restyle a component inside another; if one needs a change to fit, ask, and change it at its own level (in code and Figma).
9. **Responsive: breakpoints and widths are tokens.**
   - Breakpoints (`foundations.js` → `breakpoints`): mobile < 768, tablet 768–1199, desktop ≥ 1200. Tailwind's defaults are switched off; use `tablet:`, `desktop:`, `max-tablet:`, `max-desktop:` for the window and `@max-tablet/page:`, `@max-desktop/page:` inside components.
   - Components respond to the **page container**, not the window: a container named `page` (`@container/page`). The site's page root has it (`src/site/SiteLayout.jsx`); the /ds-dev/ previews put one around each organism (`docs/PageFrame.jsx`), which is how the Desktop / Tablet / Mobile switcher works. h1, h2 and description shrink in a mobile page (mobile text styles in `foundations.js`).
   - Max widths: the page root is as wide as the window; every section keeps its content within `size/page` (1440), centered, and the content column within `size/base-with` (830). Only full-bleed backgrounds (HeroSection's backdrop) span the whole window. Organisms fill what they're given up to their max (HeroCard: 830).
   - Side padding: `indents/M` at every breakpoint, so organisms line up when stacked.
   - CSS can't use variables in media or container conditions, so breakpoints are the one literal (rem) value; everything else stays a token.
10. **Site navigation.** Links use `paths` from `src/site/site.js`; ids come from `src/data/`. A button or link with no destination yet gets the `NO_ACTION` tooltip and is marked unavailable (`Tooltip` with `unavailable`: not-allowed cursor, no hover overlay, `aria-disabled`; still focusable), never `href="#"` or a guessed page. Organisms do this for any item with a `tooltip`. When a connection changes, update `docs/sitemap.md`.
11. **After each step, add a release-notes entry to the top of `NOTES.md`** in the same format (Summary / Added or Changed / Differences from Figma / How to use), and commit.

## Figma notes
- Akkurat LL Cyr TT and Pixform are custom fonts. They're installed locally and in `src/assets/fonts/`, but the Figma MCP (`use_figma`) can't load them, so text edits on those layers need the local plugin in `figma-plugin-text-styles/`.
- Read values from Figma itself, not from older notes. The table text in the Styles frame is not always up to date (see NOTES.md v0.2.0).
