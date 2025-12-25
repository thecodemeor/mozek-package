# Mozek Angular

Mozek is a lightweight Angular UI library and SCSS design system that I built to make interface development feel clearer, lighter, and more enjoyable. I created it as a hands on way to explore design tokens, standalone Angular components, and practical SCSS patterns without the complexity of heavier frameworks.

Mozek reflects how I like to work with UI: simple, understandable, and flexible enough to grow with real projects.

---

## Installation

Install Mozek using npm:

```bash
npm install mozek-angular
```

---

## Requirements

Mozek is designed for modern Angular projects.

- Angular >= 18
- Dart Sass (sass package)

If your project still uses `node-sass`, replace it with:

```bash
npm remove node-sass
npm install -D sass
```

---

## Using Mozek styles (SCSS)

In your global styles or component SCSS:

```bash
@use "mozek-angular/src/styles" as moz;
```

---

## Angular usage

Import Mozek components directly where needed.

Example:

```bash
import { MozButton } from 'mozek-angular';
```
---

## License

MIT License

---

## Author

Developed by thecodemeor