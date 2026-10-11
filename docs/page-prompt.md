# Page prompt (Step 6, Part 2)

The brief for building one page of the site. Each run names the Figma node, the page number and the release
version; everything else is below.

Step 6, Part 2: build ONE page of the site. This is page [N] of 13.
We build the site one page at a time. In this run, build only the page
below. Don't build, fill in or change any other pages; they stay as they
are (finished pages unchanged, the rest stay placeholders).
Read CLAUDE.md, NOTES.md and docs/sitemap.md first and follow them.

THIS PAGE
- Figma desktop: [Figma link with node-id]
- Page name and route: find this screen (node [node id]) in
  docs/sitemap.md and use its page name and route. If it's not in the
  sitemap, stop and ask me.
- Figma mobile: check docs/sitemap.md for a mobile version of this
  screen. If there is none, say so in the audit.
- Release version for NOTES.md: [version]

STEP 1 — SAFETY + AUDIT (don't write code yet)
- Commit the current state with Git.
- Tell me the page name and route you found.
- From the Figma frame(s), list:
  - every section of the page, top to bottom, and which organism it is,
    with the props and variants it needs
  - anything that isn't an existing organism (flag it, suggest how to
    handle it; I'll decide)
  - the spacing between sections, and which spacing token matches it
  - the content and data the page needs, and what's missing in
    src/data/
  - images and icons that need exporting
  - overlays or modals on this page (from docs/sitemap.md)
  - any hardcoded values that don't match a token
- If there's no mobile frame: propose how each section behaves on tablet
  and mobile, following the organisms' responsive rules.
- Wait for my OK.

STEP 2 — BUILD THE PAGE
- Replace this page's placeholder in src/pages/ with the real page.
  It stays in this project, on its route from docs/sitemap.md.
- Build it ONLY from existing organisms. Don't create page-specific
  copies of components or restyle them. If something needs to change in
  an organism, tell me instead of patching it.
- Page-level layout only: section order, spacing between sections
  (tokens), max content width and side paddings, as in CLAUDE.md.
- Keep the page layout consistent with the pages already built (same
  section spacing, widths and paddings), unless Figma clearly differs;
  if it does, tell me.
- Content comes from src/data/ through props. Add missing data there.
- Images: export from Figma and optimize as WebP, responsive srcset,
  lazy loading below the first screen, the first big image loads with
  fetchpriority="high", width and height set on every image.
- Follow CLAUDE.md for states, hit areas and non-breaking spaces.

STEP 3 — CONNECTIONS
- Every link and button on this page goes where docs/sitemap.md says,
  including overlays and modals that belong to this page (fully working,
  with focus handling, Escape and outside click).
- Links to pages that aren't built yet still go to their placeholders.
- Check that links between this page and the pages already built work
  in both directions.
- If you find a connection on this page that's not in docs/sitemap.md,
  ask me before adding it.

STEP 4 — CHECK
- Compare the page with its Figma screenshot(s) and fix visible
  differences.
- Check at 1440, 768 and 375px: nothing overflows, overlaps or scrolls
  sideways.
- Test all links, buttons and overlays with the mouse and the keyboard.
- Confirm no other page, organism, molecule or atom was changed without
  my approval.

STEP 5 — NOTES, SITEMAP, SAVE
- docs/sitemap.md: mark this page as done ([N] of 13), and update any
  connections or open questions.
- NOTES.md: add a new entry on top:
  ## [version] — Step 6, Part 2: [page name] page (date)
  ### Summary
  ### Added
  (sections and organisms used, data added, images)
  ### Differences from Figma
  ### Open questions
- Commit with the message "[page name] page", and push to GitHub.
- Make sure the dev server is running and give me the exact localhost
  URL of this page.
