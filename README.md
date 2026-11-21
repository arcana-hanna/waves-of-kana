# Kana Path
Offline-capable kana trainer: learn kana in small groups and get real words from the very first lesson. Words only appear once all their kana are learned. Handwriting is checked automatically against KanjiVG stroke data.

## Deploy (one-time)
1. Push this repo to GitHub (branch `main`).
2. Repo **Settings → Pages → Source: GitHub Actions**.

Every push then builds the stroke data from KanjiVG and publishes the site. No local setup needed.

## Attribution
Stroke data comes from [KanjiVG](https://kanjivg.tagaini.net) © Ulrich Apel, licensed CC BY-SA 3.0. The generated `strokes.json` is a derivative and carries the same licence.
