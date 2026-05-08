# Mozek Angular UI

[![npm](https://img.shields.io/npm/v/mozek-angular.svg)](https://www.npmjs.com/package/mozek-angular)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/thecodemeor/mozek-package/blob/main/LICENSE)

**The Signal-Powered UI Engine for Modern SaaS Architecture.**

Mozek is an enterprise-grade UI library designed to **reduce time-to-market** for modern web applications. Built specifically for high-growth SaaS platforms, Mozek provides a **cohesive** suite of components that ensure a **modern** aesthetic and **efficient** development workflow.

---

## ⚙️ Technical Core

Mozek is engineered for the future of Angular, leveraging **Angular Signals** for **fine-grained reactivity** and **performant** rendering.

- **Zone-less Compatibility**: Ready for the future of Angular without the overhead of Zone.js.
- **Ultra-Fast Performance**: Snappy interactions even in data-heavy enterprise dashboards.
- **Modern Control Flow**: Utilizing Angular's newest `@if`, `@for`, and `@switch` syntax.

---

## 🛠️ Quick Start

```bash
npm install mozek-angular
```

Import Mozek components directly into your standalone components:

```typescript
import { MozButton, MozInput } from 'mozek-angular';

@Component({
  standalone: true,
  imports: [MozButton, MozInput],
  template: `
    <moz-input label="Full Name" placeholder="John Doe" />
    <moz-button model="fill" color="primary">Create Account</moz-button>
  `
})
export class RegisterComponent {}
```

---

## 🌐 Documentation & Showcase

Explore the full API documentation and interactive component showcase at our official website.

👉 **[https://thecodemeor.github.io/mozek-website](https://thecodemeor.github.io/mozek-website)**

---

## 📜 License

Mozek is available under the terms of the [MIT license](https://github.com/thecodemeor/mozek-package/blob/main/LICENSE).