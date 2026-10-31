// Proof for each prompt on /prompts: why it is built this way, and (where there was real material to run it on)
// an excerpt of a real result. Every result says what it ran on. No made-up inputs.
// Keys are the prompt ids in prompts.js. "used: true" shows the "Used in my work" badge.
window.PROMPT_PROOF_RUN = "Claude Opus 5.5 · 31 Oct 2026";
// shown inside every "See a real result"
window.PROMPT_PROOF_NOTE = "Demo run. I ran this prompt on my own site and tools only to show you a real example: it did its part in auditing this site. It's not client work.";
window.PROMPT_PROOF = {
  "ux-quick-scan": {
    fixed: "Fixed since this run: 1, 2 and 4 (smaller masthead, an Email me button in the hero, Ask about this is a button).",
    used: true,
    why: "It starts by naming the page's one goal, so every issue is judged against that goal, not against taste. \"Point to the exact element\" rules out vague advice.",
    result: { on: "gglias.github.io/afterhours, home page, desktop 1280 px", text: `Goal: get a visitor to email Greg about an audit or a build.

1. HIGH · The offer starts below the masthead. At 1280×800 the giant "After hours" fills the first screen; the h1 and the buttons start under it.
   Fix: shrink the masthead on desktop, or move the h1 above it.
2. HIGH · The main button "See the menu ↓" scrolls; it doesn't convert. "Email me" only appears far down the page.
   Fix: add "Email me" next to it in the hero.
3. MEDIUM · Six service cards with long lists, and no quick way to compare them.
   Fix: a one-line "best for" under each title.
4. MEDIUM · "Ask about this" is a small 13 px text link at the bottom of each card.
   Fix: make it a real button.

Ship this week: 2, 4, and the smaller masthead from 1.` },
  },
  "a11y-first-pass": {
    fixed: "Fixed since this run: all five issues.",
    used: true,
    why: "It only asks for what the model can actually see, and makes \"can't tell from this\" an allowed answer, so it doesn't invent problems.",
    result: { on: "gglias.github.io/afterhours, home page HTML + CSS, dark theme", text: `issue · where · WCAG criterion · fix
Low-contrast small labels · "403 chars" on prompt cards (#56565c on #121214, about 2.6:1) · 1.4.3 · use the muted colour #9b9ba1
Primary button label below AA · "See the menu ↓", white on #ff5b1f (about 3.1:1) at 14 px · 1.4.3 · darker orange, or 18.66 px bold
Same heading level for group and cards · "Audits" (h3) and "UX Quick Scan" (h3) · 1.3.1 · make card titles h4
Link purpose unclear · "Ask about this" × 6 · 2.4.4 · add the service name for screen readers
Small tap target · "Ask about this" link, about 13 px high · 2.5.8 · at least 24 × 24 px
Can't tell from this · whether the 3D desk can be turned with the keyboard` },
  },
  "microcopy-rewrite": {
    fixed: "Fixed since this run: See services, the price line, the note under Closed and the lamp button.",
    used: true,
    why: "The before · after · why table makes every change easy to accept or reject one by one.",
    result: { on: "gglias.github.io/afterhours, button and helper texts", text: `before · after · why
See the menu ↓ · See services ↓ · "Menu" sounds like food; say what's there
Ask about this · Ask about this audit · says what you're asking about
Prices on request: email me and I'll send the price list and a written quote. · Email me for prices. I reply with the price list and a quote. · shorter, the action comes first
Leave a note, I'll reply tonight. · Email me now, I'll reply tonight. · "note" doesn't say where to write
Lights on · Turn the lamp on · says what the button does` },
  },
  "handoff-spec": {
    used: true,
    why: "The [Design] / [Brief] / [Confirm] labels keep facts apart from guesses, so the developer knows exactly what to ask.",
    result: { on: "the hero desk card of gglias.github.io/afterhours, desktop 1280 px", text: `## Hero · desk card (desktop)
- [Design] Two columns: text left, desk right (about 0.9 : 1.1), centred vertically.
- [Design] Desk: interactive 3D drawing, no background, light lines on the dark theme.
- [Design] Caption under it, 13 px, centred: "On the cover · My desk after 19:00…"
- [Design] Status panel: radius 14, "Closed" 22 px display + clock 11.5 px mono, button "Lights on" 32 px high.
- [Brief] Open Mon–Fri 19:00–00:00 Athens: lamp on, laptop shows OPEN; otherwise CLOSED.
- [Confirm] What the panel says on public holidays.
- [Confirm] Fallback if the drawing fails to load.
- [Confirm] Reduced motion: should the lamp still fade in?` },
  },
  "onboarding-teardown": {
    used: true,
    why: "One fix per step, and \"don't suggest new features\", keeps the answer small enough to ship.",
  },
  "checkout-form-audit": {
    used: true,
    why: "It ranks by severity and puts the 3 biggest changes first, so you don't drown in a list of 30.",
    result: { on: "my Tally form \"Project inquiry\" (Name, Email, Link, What do you want to improve?)", text: `Top 3 first:
1. HIGH · No intro line. The form opens on "Name" with no word on what happens next.
   Fix: one sentence under the title: "I reply within 24 hours on weekdays with a quote."
2. HIGH · Default thank-you screen. After submitting, nothing says when to expect a reply.
   Fix: a custom thank-you with the reply time and the email address.
3. MEDIUM · "What do you want to improve?" is an empty box.
   Fix: a placeholder example: "Our sign-up converts badly on mobile."

issue · field · severity · fix
No way to say how soon · (missing) · medium · optional "When do you need it?" choice
Right keyboards · Email (email), Link (url) · ok · keep
Link is optional · Link · ok · keep it optional: many leads have no site yet` },
  },
  "mobile-thumb-check": {
    fixed: "Fixed since this run: 1 and 2 (the offer comes first on phones, 44 px targets).",
    used: true,
    why: "It gives the model concrete limits (44 px, 16 px, the bottom half) instead of asking whether it \"feels\" usable.",
    result: { on: "gglias.github.io/afterhours at 375 px", text: `Main action: email Greg.
1. Not in reach. The first screen shows the masthead and the desk; the h1 and "See the menu" only appear after about 1.5 screens of scrolling.
   Fix: put the h1 and an "Email me" button right after the masthead.
2. Small targets: theme switch 32 × 30 px, "Copy" 32 px high, "Ask about this" about 16 px high.
   Fix: 44 × 44 px for all three.
3. First thing you see: the giant "After hours" and the availability badge. Right brand, wrong job.
4. Text: body 16 px is fine; service details in 11.5 px mono work as labels, too small for anything longer.` },
  },
  "competitor-snapshot": {
    used: true,
    why: "The same six criteria for every page, plus \"stick to what is on the pages\", keep the comparison fair and checkable.",
  },
  "hero-rewrite": {
    used: true,
    why: "Each version comes from a different angle, so you compare ideas, not five rewordings of the same one.",
    result: { on: "the hero of gglias.github.io/afterhours (\"UX audits & product design, after hours.\")", text: `1. Outcome
   Know what to fix before you redesign.
   Fixed-price UX audits: a Loom, a ranked report and a Figma file. · See the audits
   Works best for teams who sense a problem but can't name it.
2. Problem
   Your users get stuck. I find where.
   A senior product designer reviews your site or app and ranks every issue by impact. · Get an audit
   Works best on landing pages that get paid traffic.
3. Proof
   15 years of product design, now after hours.
   UX audits, redesign sprints and Figma-to-WordPress builds, with a written quote first. · Email me
   Works best when the visitor already knows your portfolio.
4. Who it's for
   UX help for small teams without a designer.
   Audits and fixes in the evenings, async, no meetings to book. · See what I do
5. How it works
   Send a link. Get a Loom, report and Figma.
   No calls needed: the work is waiting for you in the morning. · Start with a Quick Scan` },
  },
  "empty-states-errors": {
    used: true,
    why: "Setting the voice first and putting everything in one table keeps twenty small messages consistent.",
  },
  "figma-to-elementor": {
    used: true,
    why: "It follows the way Elementor builds: containers first, global styles before widgets, and every guess marked [Confirm].",
    result: { on: "the hero section of gglias.github.io/afterhours, desktop 1280 px", text: `1. Containers
Section (boxed 1200, padding 72 / 0 / 96)
├─ Masthead (column, centred)
│  ├─ Row, space-between: "Issue 01" · "Autumn 2026" · availability badge
│  ├─ Heading "After hours" (display, max 212 px)
│  └─ Pills (row, wrap, gap 8)
└─ Hero (grid 0.9fr / 1.1fr, gap 64, align centre)
   ├─ Text: eyebrow, H1, paragraph, buttons (gap 8), email + Copy
   └─ Desk: HTML widget (iframe), caption, status card
2. Global styles: bg #09090a, card #121214, text #f3f3f1, muted #9b9ba1, accent #ff5b1f, select #0d99ff. Bricolage Grotesque 350 for H1, Inter 16/1.6, Geist Mono 12.
3. Templates: header and footer; the service card as a Loop Item.
4. Tablet / mobile: grid → one column, desk above the text, nav hidden.
5. Hard in Elementor: the Figma-style selection frame with live W × H → HTML widget. [Confirm] whether it's needed at all.` },
  },
  "tokens-from-css": {
    used: true,
    why: "Grouping near-duplicates is where the real cleanup happens, and the JSON goes straight into Figma variables.",
    result: { on: "assets/styles.css of gglias.github.io/afterhours", text: `token · value · used for
color/bg · #09090a · page canvas
color/card · #121214 · panels
color/text · #f3f3f1 · body text
color/muted · #9b9ba1 · secondary text, labels
color/faint · #56565c · disabled, decoration
color/accent · #ff5b1f · primary button, dots
color/select · #0d99ff · selection frame, focus
type/display · Bricolage Grotesque 350, -0.038em · headings
type/body · Inter 16/1.6 · text
type/mono · Geist Mono 11–12 px · labels
radius · 22, 20, 16, 14, 10, 8, 6, 4
Near-duplicates: radius 20 and 22 → keep 22.

{ "color": { "bg": "#09090a", "card": "#121214", "text": "#f3f3f1", "muted": "#9b9ba1", "accent": "#ff5b1f", "select": "#0d99ff" } }` },
  },
  "a11y-fix-it": {
    fixed: "Applied on this site since this run.",
    used: true,
    why: "It asks for the whole fixed code plus a one-line reason for each change, so you learn the fix instead of just pasting it.",
    result: { on: "the \"Ask about this\" link from a service card on gglias.github.io/afterhours", text: `Fixed code:
<p class="svc-ask">
  <a href="mailto:…?subject=Inquiry: UX Quick Scan">
    Ask about this<span class="visually-hidden"> UX Quick Scan</span>
  </a>
</p>
<style>
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.svc-ask a { min-height: 24px; padding: 4px 0; }
</style>

Changes:
- Added the service name for screen readers: six links all said "Ask about this". (2.4.4 Link purpose)
- Made the link at least 24 px tall. (2.5.8 Target size)` },
  },
  "wordpress-launch-qa": {
    used: true,
    why: "It is built from your site's own pages and forms, so the checklist has no generic filler.",
  },
  "interview-script": {
    used: true,
    why: "No yes/no and no leading questions, and it starts from the last time they did the task: real stories, not opinions.",
    result: { on: "my own brief: founders and marketing leads who hired, or thought about hiring, an outside designer for a UX audit", text: `Intro (read out): "Thanks for the time. I'm Greg, a product designer. I want to understand how teams decide to bring in outside design help. There are no right or wrong answers. Is it ok if I record this?"

Warm-up
1. What does your role look like day to day?
2. Who makes design decisions in your team today?

Main
3. Tell me about the last time you felt something on your site or app wasn't working.
   Follow-up: How did you notice?
4. What did you do about it?
   Follow-up: Who else was involved?
5. Have you ever paid someone outside the team to look at it? Walk me through how that happened.
   Follow-up: What made you trust them enough to pay?
…` },
  },
  "research-synthesis": {
    used: true,
    why: "It counts how many people said each thing and keeps quotes word for word, so one loud interview can't become a \"theme\".",
  },
};
