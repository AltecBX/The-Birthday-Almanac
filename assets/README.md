# assets

Place the hero illustration here as **`hero-zodiac.jpg`**.

`index.html` references `assets/hero-zodiac.jpg` in the page hero. Until the file
exists, the hero gracefully hides the image (an `onerror` handler), so the page
still looks correct — the illustration simply appears once the file is added.

To add it from GitHub: **Add file → Upload files**, drop the image in (named
`hero-zodiac.jpg`), and commit. A JPG or WebP under ~500 KB is ideal; if your file
is much larger, downscale it to roughly 1400 px wide first to keep the repo lean.
