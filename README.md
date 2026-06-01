# Impossible Weather

Impossible Weather is a tiny static browser project that generates short, poetic weather bulletins for fictional places, each with a deterministic oracle reading derived from advisory tone.

Forecasts are seed-based, place-aware, and shareable: each bulletin is tied to a `?seed=...` query parameter, so opening the same URL always reproduces the same forecast, including an oracle reading interpreted from the advisory tone.
The in-app seed field supports deliberate casting for shared worlds and crossover sessions, so collaborators can agree on and reuse exact seed phrases.

See [Seed Oracle Protocol](docs/seed-oracle-protocol.md) for the lightweight ritual used to derive and interpret a seeded bulletin.

## Run locally

1. Open `index.html` in any modern web browser.
2. Enter any seed string in the **Seed** field and use **Cast by seed** (or press Enter) to cast that exact shared-world seed deterministically.
3. Use **Forecast again** to generate a fresh random seeded bulletin (the URL and seed field both update without reloading).
4. Read the **Oracle reading** below the card for the tone interpretation tied to the current advisory.
5. Use **Copy bulletin** to copy the current forecast text plus oracle reading.
6. Use **Copy link** to copy a shareable URL for the current seeded forecast; when launched from `file://`, it still copies the live GitHub Pages URL for that seed.

## Deploy to GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/deploy-pages.yml`.

- Push to the `main` branch to trigger deployment.
- The workflow uses official GitHub Pages actions to publish this static site.

No build step, package manager, or external dependency is required.
