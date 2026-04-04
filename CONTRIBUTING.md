# Contributing

## Commit convention
This project uses [Conventional Commits](https://www.conventionalcommits.org/).

Format: `type(scope): description`

| Type | When to use |
|---|---|
| `feat` | New section, feature, or content |
| `fix` | Bug fix |
| `style` | CSS / visual changes |
| `test` | Adding or updating tests |
| `ci` | CI/CD pipeline changes |
| `chore` | Tooling, deps, config |
| `docs` | README or documentation |

Examples:
- `feat(hero): add typewriter animation`
- `test(nav): add mobile nav visibility test`
- `fix(theme): persist dark mode across page reload`

## Running locally
\```bash
npm install
npm run serve      # starts dev server at localhost:3000
npm test           # runs Playwright suite
npm run test:ui    # opens Playwright UI mode
\```

## Branch strategy
- `main` — production, protected
- `feat/*` — new features
- `fix/*` — bug fixes
- `test/*` — test additions