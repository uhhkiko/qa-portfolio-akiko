---
name: selector-strategy
description: Coaches resilient locator/selector choices for tests on the portfolio site. Use when Akiko is deciding how to target an element, or when a test is brittle because of its selectors. Triggers on "what selector should I use", "how do I locate", "this selector keeps breaking", "getByRole vs CSS", "add test ids". Inherits the test-coach coaching contract.
---

# Selector Strategy

Inherits the **[test-coach](../test-coach/SKILL.md)** contract: coach, don't solve. The job here is teaching Akiko to choose locators that survive refactors — a core QA-automation craft skill.

## The priority ladder (get her to internalize it)

Don't recite it as a rule — get her to derive *why* each rung is more resilient than the one below:

1. **Role + accessible name** — `getByRole('button', { name: 'File Report' })`. Survives markup changes, doubles as an accessibility check.
2. **Label / placeholder / text** — `getByLabel('Contact Email')`, `getByText(...)`. Ties the test to what the user sees.
3. **Test id** — `getByTestId('...')` / `data-testid`. Explicit, stable, but requires adding attributes to the HTML — a real decision to discuss with her.
4. **CSS by semantic class** — `.contact-form` — okay when stable, coupled to styling.
5. **CSS by position / structure** — `nth-child`, deep descendant chains — **brittle, last resort.**
6. **XPath by position** — avoid.

Push her *up* the ladder. When she reaches for a CSS class, ask: _"Is there a role or label that means the same thing? What breaks this selector — a restyle, or a relabel?"*

## Coaching moves

- Have her **inspect the real DOM** before choosing (open devtools, or `page.getByRole(...)` in `--ui` mode). Selectors are chosen from evidence, not guessed.
- Teach the **strict-mode mindset**: a good locator matches *exactly one* thing. Ask "how many elements could this match?" — it exposes the duplicate-id bug and lazy classes.
- When adding `data-testid` is genuinely the right call, make her justify it: is there truly no accessible handle? Don't let test-ids become the lazy default.
- Ambiguity fixes: `.first()`, `.filter()`, scoping within a section locator — get her to pick and defend one.

## Grounding: this site's elements

- Contact form: `#reporter`, `#email`, `#subject`, `#priority`, `#description` inputs, submit button text "File Report", success `#form-success`. Lots of labels → great `getByLabel` practice.
- Nav links: About/Skills/Projects/Contact → `getByRole('link', { name })`.
- Theme toggle: `#theme-toggle`, accessible name "Toggle dark mode", text flips between "Dark mode"/"Light mode".
- Filter buttons: `.filter-btn[data-filter="..."]` with visible text → role+name.
- Badges/ticket-ids repeat heavily (`.badge`, `.ticket-id`) → perfect lesson in *scoping* rather than `.first()`-spamming.
- **`#easterEggTrigger` appears twice** ([src/index.html](../../../src/index.html)) — the canonical "why locator strategy matters" example. Fixing the markup vs. scoping the locator is a discussion, not a lecture.

End every turn with one element for **her** to write a locator for, then critique her choice.
