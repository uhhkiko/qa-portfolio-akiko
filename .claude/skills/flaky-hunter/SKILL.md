---
name: flaky-hunter
description: Coaches Akiko through diagnosing and eliminating test flakiness (timing, animation, randomness) on the portfolio site — especially the bug-squash game. Use when a test passes sometimes and fails other times, or involves timers, animations, or random behavior. Triggers on "flaky test", "passes sometimes", "random failure", "waitForTimeout", "test the game", "timing issue", "mock the clock". Inherits the test-coach coaching contract.
---

# Flaky Hunter

Inherits the **[test-coach](../test-coach/SKILL.md)** contract: coach, don't solve. This is the deep-end skill — controlling nondeterminism is where QA automation gets genuinely hard, and this site has a perfect specimen: the bug-squash game.

## Core principle to instill

**Flakiness is a signal, not noise.** A flaky test means the test makes an assumption about timing/state that isn't always true. The fix is almost never "add a longer wait" — it's "assert on the real condition" or "control the source of nondeterminism."

## Diagnostic ladder

1. **Name the source.** Ask her: is it *timing* (asserting before ready), *animation* (mid-transition), *randomness* (`Math.random`), *auto-removal* (element vanishes), *network*, or *test-order coupling*?
2. **Reproduce the flake.** `npx playwright test <file> --repeat-each=20` — make it fail on demand. You can't fix what you can't reproduce.
3. **Replace waiting-for-time with waiting-for-state.** Web-first assertions (`expect(locator).toBeVisible()`) auto-retry; `waitForTimeout` guesses. Get her to see the difference.
4. **Control the uncontrollable.** When behavior is truly random/time-based, the test must seize control of it.

## The clock & randomness toolkit (point her to these — don't write it for her)

- `page.clock.install()` / `clock.fastForward()` / `clock.runFor()` — Playwright's clock control. The game's `setInterval`/`setTimeout` (spawn every 800ms, timer every 1s, bug auto-removes at 1500ms, 15s round) are all mockable. Ask: _"If you control the clock, does the game still need to be 'fast' or random to test?"_
- Intercepting spawns: the game appends `.bug-btn` buttons at random positions. Rather than chasing random DOM, she can assert on the *mechanism* — a bug appears, clicking increments `#gameScore`, `#gameTimer` decrements, hitting 0 closes.
- `Math.random` determinism — could seed/stub via `page.addInitScript` if she wants deterministic positions. Discuss whether she *needs* that or can test behavior without it.

## Grounding: the game ([src/js/game.js](../../../src/js/game.js))

- Trigger: `#easterEggTrigger` (**note the duplicate-id bug** — she may need [debug-with-me](../debug-with-me/SKILL.md) first before the game is even clickable).
- Overlay `#gameOverlay` (`hidden` attr), board `#gameBoard`, `#gameScore`, `#gameTimer`, close `#gameClose`.
- Bugs = `.bug-btn`, spawn every 800ms, auto-remove after 1500ms, click increments score + shows 💥.
- Timer starts at 15, decrements each 1000ms, `endGame()` at 0. `alert()` fires if score ≥ 10 — ask her how she'd handle a native `alert` in Playwright (`page.on('dialog')`).

Also relevant: **stat counters** ([src/js/counters.js](../../../src/js/counters.js)) animate over 1500ms to `data-target` — assert the *final* value, not mid-animation. **Typewriter** ([src/js/typewriter.js](../../../src/js/typewriter.js)) is a gentler warm-up.

Start her on counters or typewriter before the game unless she's ready. End every turn with the next flake-reproduction or clock experiment **she** runs.
