# Seed Oracle Protocol

Purpose: keep Impossible Weather a tiny poetic oracle where one seed always yields one repeatable forecast.

Seed format example: `aethelgard-day420-turnN-regionX`.

## Procedure

1. Fix the seed string in the URL (`?seed=...`) so the run is deterministic.
2. Derive the forecast text from that seed and read it in three lines: sky, air, advisory.
3. Interpret the advisory tone using the table below before acting on it.

## Advisory Interpretation

| Advisory tone | How to read it |
| --- | --- |
| Ordinary | Flavor only; no mechanical effect. |
| Cautionary | Mild penalty or short delay. |
| Uncanny | Rare event or unusual opportunity. |

The full URL is the record: it makes each event auditable, reproducible, and easy to share.
