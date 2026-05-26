# Impossible Weather

Impossible Weather is a tiny static browser project that generates short, poetic weather bulletins for fictional places, each with a deterministic oracle reading derived from advisory tone.

Forecasts are seed-based, place-aware, and shareable: each bulletin is tied to a `?seed=...` query parameter, so opening the same URL always reproduces the same forecast, including an oracle reading interpreted from the advisory tone.

See [Seed Oracle Protocol](docs/seed-oracle-protocol.md) for the lightweight ritual used to derive and interpret a seeded bulletin.

## Run locally

1. Open `index.html` in any modern web browser.
2. Use **Forecast again** to generate a new seeded bulletin (the URL updates without reloading).
3. Read the **Oracle reading** below the card for the tone interpretation tied to the current advisory.
4. Use **Copy bulletin** to copy the current forecast text plus oracle reading.
5. Use **Copy link** to copy a shareable URL for the current seeded forecast.

## Deploy to GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/deploy-pages.yml`.

- Push to the `main` branch to trigger deployment.
- The workflow uses official GitHub Pages actions to publish this static site.

No build step, package manager, or external dependency is required.
