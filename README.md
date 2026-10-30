# After hours

Fixed-price UX audits, redesign sprints and Figma-to-WordPress builds by Greg Glias. Remote, async, in the evenings.

Live: https://gglias.github.io/services/

## Structure

- `index.html`: services menu, receipt, terms, FAQ
- `prompts/`: prompts and things made with Claude
- `assets/prompts.js`: prompt and "made with Claude" data (add new items at the top)
- `assets/site.js`: Open/Closed status (Athens time), receipt, copy buttons, theme
- `assets/styles.css`: laid out as a magazine issue (masthead, contents-style menu, order card, colophon). Instrument Serif for display, Inter for text, Consolas for details; vermilion accent, dark mode = night edition
- `figure-src/`: the interactive desk in the hero (built to `assets/desk-lamp.html` with the Colorfigures engine, MIT, see `figure-src/LICENSE`)

Static HTML/CSS/JS, served by GitHub Pages. After changing CSS or JS, bump the `?v=` number in both HTML files.
