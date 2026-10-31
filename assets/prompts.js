// Prompts shown on the home page (first ones) and on /prompts.
// Add a new prompt at the top of the list: { id, cat, title, desc, text }.
// cat: "ux" | "copy" | "build" | "research"
window.PROMPTS = [
  {
    id: "website-ux-report",
    cat: "ux",
    title: "Website UX report",
    desc: "My full report for any website: pages, copy, CTAs, menu and structure, desktop vs mobile, UI and the tech it's built on. Ends as a minimal PDF with recommendations.",
    text: `You are a senior UX designer writing a UX report on a website for a client.

Website: [URL]
What the business does and the site's main goal: [e.g. "B2B SaaS, get demo requests"]
Who visits it: [audience]
Scope: [all main pages, or "up to 15 pages"]
Report language: [English]

How to work
- Visit the site yourself: the homepage, every item in the main menu and the footer, and the key flows (contact, sign-up, checkout, booking). Check each page at desktop width (1440 px) and mobile width (390 px).
- If you can't load a page or see the mobile view, write "Not checked". Never guess.
- Base every statement on what you saw and mark it: [Seen] on the page, [Code] in the HTML or source, [Inferred] your reading of it.
- Quote copy word for word, in quotes.

1. Overview
One paragraph: what the site is, who it's for, what it asks visitors to do, and your verdict in one sentence.

2. Technology
What it's built with: custom, WordPress (theme and page builder, e.g. Elementor), Shopify, Webflow, Wix, Squarespace, Framer, React / Next.js, Vue / Nuxt, or other. Give the evidence for each (e.g. "/wp-content/ in asset URLs", "generator meta tag", "__NEXT_DATA__ script", "cdn.shopify.com"). List the tools you can see: analytics, chat, cookie banner, forms, fonts. If unsure, write "Likely …" and why.

3. Navigation and structure
- Main menu: every item in order, with sub-items, and where each one goes.
- Footer and utility links (login, language, search, cart).
- A site map as a tree of the pages you found (max 3 levels).
- Problems: unclear labels, too many items, dead ends, pages only reachable from the footer, broken links.

4. Page inventory
A table, one row per page: page · URL · purpose · H1 (word for word) · primary CTA · secondary CTA.

5. Page by page
For each important page:
- Purpose, and who it's for.
- Structure: the sections from top to bottom, one line each.
- Copy: headline and subheadline word for word. Is the value clear in 5 seconds? Tone, length, jargon.
- CTAs: label (word for word), where it goes, where it sits, how it looks. Is there one clear next step?
- Desktop: what works and what doesn't.
- Mobile: what changes (menu, layout, order, hidden content), tap targets under 44 px, text under 16 px, anything that breaks or overflows.

6. UI and visual design
Typography (families, sizes, hierarchy), colour (palette, contrast below WCAG 2.2 AA), spacing and grid, imagery, components (buttons, cards, forms) and how consistent they are across pages.

7. Accessibility and quick technical checks
Only what you can see or read in the code: contrast, alt text, heading order, focus states, form labels, page titles and meta descriptions, very heavy images, layout shift. No scores you didn't measure.

8. Findings
A table: # · finding · page · desktop / mobile / both · severity (high / medium / low) · evidence.

9. Recommendations
For every finding: what to change, why it matters for the site's goal, impact (high / medium / low) and effort (S / M / L). Then two short lists:
- Quick wins: high impact, small effort, doable this week.
- Bigger bets: changes that need design or development time.

Output
Create the report as a print-ready PDF (A4, portrait), minimal and light: white background, one sans-serif font, black text with one accent colour, generous margins, page numbers, no decorative images. Start with a cover (site name, URL, date, "UX report"), then a short table of contents, then sections 1–9 in this order, with tables where this prompt asks for them.
If you can't create a PDF file, write the whole report as one HTML file with print CSS (@page A4) that I can save as PDF from the browser.`,
  },
  {
    id: "ux-quick-scan",
    cat: "ux",
    title: "5-minute UX quick scan",
    desc: "A fast first pass on any landing page. The same questions I start every audit with.",
    text: `You are a senior UX designer. Review this page: [URL or screenshot].

1. In one sentence, say what the page wants the visitor to do.
2. List the 10 biggest problems that stop that from happening. For each one: what's wrong, why it hurts, how to fix it. Rank them by severity (high / medium / low).
3. Mark the 3 fixes I can ship this week.

Be specific and point to the exact element. No generic advice.`,
  },
  {
    id: "a11y-first-pass",
    cat: "ux",
    title: "Accessibility first pass",
    desc: "Catches the obvious accessibility issues before a real audit.",
    text: `Check this screen for accessibility problems: [screenshot or HTML].

Look at: color contrast (WCAG 2.2 AA), focus order and visible focus, tap target size (min 24×24 px), form labels and error messages, alt text, and heading structure.

Output a table: issue · where · WCAG criterion · fix.
Only list issues you can actually see. Write "can't tell from this" when you're unsure.`,
  },
  {
    id: "microcopy-rewrite",
    cat: "copy",
    title: "Microcopy rewrite",
    desc: "Turns vague UI text into short, clear labels, buttons and errors.",
    text: `Rewrite the UI text below so it's short, clear and friendly.

Rules:
- Plain words, active voice.
- Buttons start with a verb and say what happens.
- Error messages say what went wrong and how to fix it.
- Keep the meaning.

Show a table: before · after · why.

[paste the text]`,
  },
  {
    id: "handoff-spec",
    cat: "build",
    title: "Screen → developer handoff",
    desc: "A handoff spec from one screen, without made-up details.",
    text: `Here is a screenshot of one screen and the project brief.

Write a developer handoff in Markdown: layout and spacing, components and their states, interactions, responsive behaviour, and edge cases (empty, loading, error, long text).

Label every statement:
[Design] if it's visible in the screenshot,
[Brief] if it's in the brief,
[Confirm] if it needs confirmation.
Don't invent anything.`,
  },
  {
    id: "onboarding-teardown",
    cat: "ux",
    title: "Onboarding teardown",
    desc: "Walks an onboarding flow step by step and finds where people drop off.",
    text: `Here are screenshots of an onboarding flow, in order: [screenshots].
The product is [what it does], for [who].

For each step:
1. What the user is asked to do, in one line.
2. What could make them stop here (effort, unclear value, trust, too many choices).
3. One fix, as small as possible.

Then say which step most likely loses the most people, and why.
Don't suggest new features. Only fix what's on the screens.`,
  },
  {
    id: "checkout-form-audit",
    cat: "ux",
    title: "Checkout & form audit",
    desc: "Fields, errors, trust and mobile keyboards: everything that makes a form harder than it needs to be.",
    text: `Review this form: [screenshot, URL or HTML]. Its goal is [sign-up / checkout / booking].

Check:
- Fields that could be removed, merged or filled in automatically
- Labels, placeholders and help text
- Error messages: when they show up and what they say
- Trust: price, fees, security, what happens next
- Mobile: the right keyboard for each field, tap targets, autofill

Output a table: issue · field · severity (high / medium / low) · fix.
List the 3 changes with the biggest impact first.`,
  },
  {
    id: "mobile-thumb-check",
    cat: "ux",
    title: "Mobile thumb check",
    desc: "Checks one phone screen: can the main actions be reached with a thumb, and what shows first.",
    text: `Here is a screenshot of a mobile screen at [width] px: [screenshot].
The main action on this screen is [action].

Tell me:
1. Is the main action in easy thumb reach (bottom half, not in the corners)?
2. Tap targets smaller than 44×44 px, or too close together.
3. What the user sees first without scrolling, and whether that's the right thing.
4. Text that is too small to read (under 16 px for body text).

Give one fix per problem. Point to the exact element.`,
  },
  {
    id: "competitor-snapshot",
    cat: "ux",
    title: "Competitor snapshot",
    desc: "Three competitors' landing pages, compared on the same six things.",
    text: `Compare these landing pages: [my page] and [competitor 1], [competitor 2], [competitor 3].

Score each one from 1 to 5 on:
1. Clarity: can you tell what it is in 5 seconds?
2. Value: is the main benefit specific?
3. Proof: reviews, logos, numbers, examples
4. Call to action: one clear next step
5. Visual hierarchy: does the eye go where it should?
6. Mobile: does it still work on a phone?

Output a table, then 3 things the others do better than my page, each with an example from their page.
Stick to what is on the pages. No guesses about their traffic or results.`,
  },
  {
    id: "hero-rewrite",
    cat: "copy",
    title: "Hero rewrite",
    desc: "Five headline and subheadline pairs, each from a different angle.",
    text: `Here is my landing page hero: [headline], [subheadline], [button text].
The product: [what it does]. For: [who]. The main benefit: [benefit].

Write 5 versions of headline + subheadline + button, each from a different angle:
1. The outcome the user gets
2. The problem it removes
3. Proof (a number, a result)
4. Who it's for
5. How it works, in one line

Rules: headline under 8 words, subheadline under 20, no buzzwords, no exclamation marks.
Under each version, one line on when it works best.`,
  },
  {
    id: "empty-states-errors",
    cat: "copy",
    title: "Empty states & errors",
    desc: "Copy for empty screens, errors and confirmations, in one consistent voice.",
    text: `My app is [what it does], for [who]. Our voice: [e.g. plain, friendly, no jokes].

Write the copy for these moments: [list, e.g. "no projects yet", "upload failed", "payment declined", "saved"].

For each one:
- A short title
- One or two sentences: what happened and what to do now
- The button text, starting with a verb

Errors never blame the user. Empty states say what will appear here and how to start.
Show it as a table: moment · title · text · button.`,
  },
  {
    id: "figma-to-elementor",
    cat: "build",
    title: "Figma → Elementor plan",
    desc: "Turns one Figma frame into a build plan: containers, global styles, templates.",
    text: `Here is a Figma frame I'll build in WordPress with Elementor: [screenshot or Figma link], at [width] px.

Give me a build plan:
1. The page as nested containers (flexbox or grid), top to bottom, with direction, gap and padding.
2. Global colors and fonts to set up first, with the values you can read from the design.
3. What should be a reusable template or global widget (header, footer, cards).
4. What changes on tablet and mobile.
5. Anything that will be hard in Elementor and a simple way around it.

Only use values you can see. Mark guesses with [Confirm].`,
  },
  {
    id: "tokens-from-css",
    cat: "build",
    title: "Tokens from CSS",
    desc: "Pulls colors, type and spacing out of a stylesheet, ready for Figma variables.",
    text: `Here is the CSS of a site (or a screenshot): [CSS or screenshot].

Extract the design tokens:
- Colors: name, hex value, where it's used
- Type: font family, sizes, weights, line heights
- Spacing and radius: the values that repeat

Group near-duplicates (e.g. #333 and #343434) and say which one to keep.
Give each token a plain name (text-primary, surface, space-16).
Output a table first, then the same tokens as JSON I can import as Figma variables.`,
  },
  {
    id: "a11y-fix-it",
    cat: "build",
    title: "Accessibility fix-it",
    desc: "Send a piece of HTML, get it back fixed, with a short reason for each change.",
    text: `Fix the accessibility problems in this HTML: [paste code].

Check: semantic elements, headings, labels and names for every control, alt text, focus order and visible focus, color contrast if the CSS is included, and ARIA only where HTML can't do it.

Return:
1. The fixed code, complete, ready to paste.
2. A list of the changes: what you changed and why, one line each, with the WCAG 2.2 criterion.

Don't change the design or the content. If something needs content from me (like alt text), leave a clear [TODO].`,
  },
  {
    id: "wordpress-launch-qa",
    cat: "build",
    title: "WordPress launch QA",
    desc: "A go-live checklist made for one specific site, not a generic list.",
    text: `I'm about to launch this WordPress site: [URL or staging URL]. Built with [theme / Elementor / plugins]. Pages: [list]. Forms: [list].

Make me a launch checklist, grouped as:
- Responsive (which pages and widths to check)
- Forms (test submissions, emails, spam protection)
- SEO basics (titles, descriptions, indexing, sitemap, redirects)
- Speed (images, caching, fonts)
- Legal (cookies, privacy page, consent)
- After launch (backups, analytics, uptime)

Each item: what to check, how to check it, and done/not done.
Keep it to the things that matter for this site.`,
  },
  {
    id: "interview-script",
    cat: "research",
    title: "Interview script",
    desc: "8–10 open questions for a user interview about one feature, with no leading questions.",
    text: `I'm interviewing [who] about [feature or problem]. I want to learn [what I want to find out].

Write an interview script:
1. A short intro I can read out (who I am, why, no right or wrong answers, recording consent).
2. Two warm-up questions about their work or routine.
3. 8–10 open questions about the last time they did [task]: what they did, what was hard, what they tried.
4. A closing question.

No yes/no questions, no leading questions, nothing about our solution.
Under each question, one follow-up I can use if the answer is short.`,
  },
  {
    id: "research-synthesis",
    cat: "research",
    title: "Research synthesis",
    desc: "Turns interview notes into themes, insights and opportunities, with real quotes.",
    text: `Here are my notes from [number] user interviews about [topic]: [paste notes].

Synthesize them:
1. Themes: group what people said. For each theme, how many people mentioned it.
2. Insights: what each theme tells us, in one sentence, starting with "People…".
3. Quotes: one or two real quotes per theme, word for word from the notes.
4. Opportunities: "How might we…" questions that come out of the insights.

Only use what is in the notes. If a theme comes from one person only, say so.`,
  },
];

// Things built with Claude, shown on /prompts.
window.MADE = [
  {
    title: "Toolkit",
    desc: "Free micro tools for designers: QR codes, favicons, color palettes with contrast checks.",
    href: "https://gglias.github.io/toolkit/",
    art: "QR",
  },
  {
    title: "This site",
    desc: "After hours: the menu, the project brief and this page, designed and built with Claude Code.",
    href: "../",
    art: "AH",
  },
];
