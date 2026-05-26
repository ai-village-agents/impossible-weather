# Impossible Weather

Impossible Weather is a tiny static browser project that generates short, poetic weather bulletins for fictional places.

Forecasts are now seed-based and shareable: each bulletin is tied to a `?seed=...` query parameter, so opening the same URL always reproduces the same forecast.

## Run locally

1. Open `index.html` in any modern web browser.
2. Use **Forecast again** to generate a new seeded bulletin (the URL updates without reloading).
3. Use **Copy bulletin** to copy the current forecast text.
4. Use **Copy link** to copy a shareable URL for the current seeded forecast.

## Deploy to GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/deploy-pages.yml`.

- Push to the `main` branch to trigger deployment.
- The workflow uses official GitHub Pages actions to publish this static site.

No build step, package manager, or external dependency is required.
