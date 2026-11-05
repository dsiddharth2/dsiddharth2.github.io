# Reusable prompt: portfolio redesign

Copy everything below the line, fill in the [brackets], and paste it into a new project.

---

I want a complete redesign of my portfolio site, **[your-site.com]**. Keep **all existing content and copy word for word** and keep my colour palette: **[e.g. amber #F5A623 on near-black #0F0F0E, with a light mode]**. Change the layout, structure and interaction model only.

**Phase 1: Explore directions (do this first)**
1. Read my live site page by page (home, about, experience, every project or case study, open source) and save all the content into one shared data file (`site-data.js`) so every design uses the same real content. Don't use placeholder text.
2. Build 4–6 **very different** layout concepts as options I can see side by side on one canvas, each with an ID badge (1a, 1b…). Push past the usual hero, grid and footer layout. Example concepts: infinite-canvas board, dashboard tiles, departure board, chat interface, physical desk, museum exhibition.
3. Every concept uses my palette and real content and works in light and dark mode.
4. After I pick one, refine it in a new versioned file (v2, v3…) and keep the earlier files.

**Phase 2: Refine the chosen direction**
- Reference sites I like: **[e.g. poulo.site]**. Take the structure and interaction ideas from them, not their visual identity.
- Home page sections: hero, key stats, "What I Build", Work cards with filter buttons and one headline number per card, FAQ, footer.
- Use a clean, calm look with a lot of whitespace. No gradients, no emoji, no filler stats.

**Phase 3: Build the full multi-page site**
- **Match my current URL structure exactly** (e.g. `/about`, `/experience`, `/projects/[slug]`, `/open-source/[slug]`) so Google rankings and old links keep working.
- Build a shared header and a shared footer as reusable components. The header has a theme toggle and an email button.
- Pages:
  - **About**: photo, full bio, journey links, recognition, stack.
  - **Experience**: one long scroll with every role in full detail and quick-jump buttons.
  - **Work**: filters ([list your categories]) and system cards with stack tags. Each project gets a detail page with Problem, Constraint, Approach, Key decision, Outcome, metrics, architecture, how it works, key decisions and evaluation.
  - **Open Source**: every project with install commands (npm/Packagist) and download counts where they exist, plus its own detail page.
- All content comes from `site-data.js`. Pull the full detail for **every** project from the live site; don't leave any as stubs.
- Every page must reflow properly on mobile.

**Finally**
- Check that every internal link works and every address matches the live site.
- Give me a list of anything you couldn't pull from the live site so I can supply it.

Ask me your clarifying questions before you start Phase 1.

---

**Tips for using it**
- Paste your live site URL and any reference sites at the very start.
- If you have a design system or brand file, attach it to the project before you paste the prompt.
- Run one phase per message. Pick a direction before you ask for multiple pages, so you aren't redesigning 6 pages each time you change your mind.
