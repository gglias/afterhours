// Prompts shown on the home page (first ones) and on /prompts.
// Add a new prompt at the top of the list: { id, cat, title, desc, text }.
// cat: "ux" | "copy" | "build"
window.PROMPTS = [
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
