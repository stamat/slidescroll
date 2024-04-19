# slidescroll

[![npm version](https://img.shields.io/npm/v/slidescroll)](https://www.npmjs.com/package/slidescroll)
[![license mit](https://img.shields.io/badge/license-MIT-green)](https://github.com/stamat/slidescroll/blob/main/LICENSE)


Minimal and performant scroll slider written in pure JavaScript. Responsiveness is native, no resize listener. Uses your elements, doesn't detach them or clone them. Provided as ESM and IIFE.

### Features

- No dependencies
- Small footprint
- ESM and IIFE
- Responsive (no resize listener)
- Uses your elements, doesn't detach them or clone them
- Custom next and prev buttons
- No CLS (Cumulative Layout Shift)

### Demo

[https://stamat.github.io/slidescroll/](https://stamat.github.io/slidescroll/)

## Installation

### NPM
```bash
npm install slidescroll
```

### Yarn
```bash
yarn add slidescroll
```

Include the module in your project

```javascript
import Slidescroll from 'slidescroll'; // If you have node_modules resolution, if not than add the path to the module
```

Include the SCSS file in your project or copy the styles from it, it's a very small CSS inside

```scss
@import 'slidescroll'; // If you have node_modules resolution, if not than add the path to the SCSS file
```

### CDN

```html
<script src="https://unpkg.com/slidescroll/dist/slidescroll.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/slidescroll/dist/slidescroll.min.css">
```
