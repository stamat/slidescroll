# slidescroll

**Archived.** The 2024 successor to [slidekick](https://github.com/stamat/slidekick), superseded in
2026 by [`<carousel-elemental>`](https://github.com/stamat/book-of-elementals#carousel-elemental)
from the [Book of Elementals](https://stamat.github.io/book-of-elementals/) — same idea, keyboard
and screen reader included, and that one actually shipped.

[![license mit](https://img.shields.io/badge/license-MIT-green)](https://github.com/stamat/slidescroll/blob/main/LICENSE)

Minimal and performant scroll slider written in pure JavaScript. Responsiveness is native, no resize listener. Uses your elements, doesn't detach them or clone them. Provided as ESM and IIFE.

### Features

- One dependency: [book-of-spells](https://github.com/stamat/book-of-spells), for `shallowMerge`
- Small footprint
- ESM and IIFE
- Responsive (no resize listener)
- Uses your elements, doesn't detach them or clone them
- Custom next and prev buttons
- No CLS (Cumulative Layout Shift)

### Demo

[https://stamat.github.io/slidescroll/](https://stamat.github.io/slidescroll/)

## Why it is archived

Two reasons, and the first one is the embarrassing one:

**It was never published.** This README used to open with an npm badge and tell you to run
`npm install slidescroll`. There is no such package — the registry returns 404, and so does
the `unpkg.com/slidescroll` link the CDN section offered. Anyone who followed the install
instructions got nothing. The badge and both install paths are gone from this file rather
than left standing.

**It cannot be operated from a keyboard.** `slidescroll.js` is 216 lines containing no
`aria-*`, no `role`, no `tabindex`, no key handler and no focus management. It scrolls
beautifully with a mouse and is invisible to everyone else. That is the part
`<carousel-elemental>` exists to fix, and it is not a patch — it is a rewrite around the
[APG Carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).

The scroll-snapping idea was right, though, and it carried over: the elemental still lets the
scroller be the state, so there is still nothing measured on resize.

## Installation

No npm package. Clone the repo, or copy [slidescroll.js](slidescroll.js) and
[slidescroll.scss](slidescroll.scss) into your project — the CSS is a few lines.

The source imports `shallowMerge` from `book-of-spells`, so either `npm install book-of-spells`
or replace that one line with an object spread.

```javascript
import Slidescroll from './slidescroll.js';
```

```scss
@import 'slidescroll';
```

## License

MIT — see [LICENSE](LICENSE).
