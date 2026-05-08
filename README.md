<div align="center">
    <img src="./img/png/mozek_banner.png" width="400" alt="Mozek Logo Banner"/>

# Mozek UI

[![Github](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![npm](https://img.shields.io/badge/Downloads-Mozek_Angular-blue.svg)](https://www.npmjs.com/package/mozek-angular)
[![update](https://img.shields.io/badge/Mozek_Angular-v_1.0.0-blue.svg)](CHANGELOG)
[![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=flat&logo=angular&logoColor=white)](https://angular.io/)

### **The Signal-Powered UI Engine for Modern SaaS Architecture.**

[Explore Documentation](https://thecodemeor.github.io/mozek-website) • [View Showcase](https://thecodemeor.github.io/mozek-website/showcase)

</div>

---

## 🚀 Executive Summary

Mozek is an enterprise-grade UI library designed to **reduce time-to-market** for modern web applications without compromising on **design consistency** or **stability**. Built specifically for high-growth SaaS platforms, Mozek provides a **cohesive** suite of components that ensure a **modern** aesthetic and **efficient** development workflow from day one.

- **Design Systems at Scale**: Maintain a single source of truth for your brand with unified tokens.
- **Business Agility**: Rapidly prototype and deploy features using a library built for speed.
- **Enterprise Reliability**: Rigorously tested components designed to handle complex data and user flows.

---

## ⚙️ Technical Core

Mozek is engineered for the future of Angular. It is a **signal-reactive**, **type-safe** library that leverages the power of Angular Signals for **fine-grained reactivity** and **performant** rendering.

### Why Signals?
By adopting a signal-based architecture, Mozek achieves:
- **Zone-less Compatibility**: Ready for the future of Angular without the overhead of Zone.js.
- **Decoupled Architecture**: Components react only to the data they need, minimizing change detection cycles.
- **Ultra-Fast Performance**: Experience snappy interactions even in data-heavy enterprise dashboards.
- **Modern Control Flow**: Utilizing Angular's newest `@if`, `@for`, and `@switch` syntax for cleaner, faster templates.

---

## 💎 The 'Mozek' Philosophy

We believe that enterprise software should feel premium, not sterile. Our design language is rooted in a **minimalist SaaS** aesthetic, featuring:

- **Glassmorphism**: Subtle translucency and blur effects that add depth and hierarchy to your interface.
- **Tactile UX**: Physics-based animations and micro-interactions that make the software feel alive and responsive.
- **Clutter-Free Layouts**: A focus on whitespace and typography that reduces cognitive load for your users.
- **Cohesive Aesthetics**: Every component, from a simple **Button Icon** to a complex **Date Picker**, shares the same visual DNA.

---

## 🛠️ Developer Experience (DX)

Mozek is built by developers, for developers. We prioritize a **performant** and **type-safe** experience that feels natural to integrate.

### Seamless Integration
Get up and running in seconds. Mozek is designed for **tree-shaking**, ensuring that you only ship the code you actually use, keeping your bundle sizes small and your load times fast.

```bash
npm install mozek-angular
```

```typescript
// In your component
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

## 🗺️ Feature Roadmap

Our mission is to provide the most comprehensive, signal-based UI suite in the Angular ecosystem.

- [x] **Core Foundation**: Type-safe Tokens, Typography Mixins, and Spacing Utilities.
- [x] **Interactive Basics**: **Button**, **Button Icon**, **Divider**, **Badge**, **Card**.
- [x] **Form Suite**: **Input**, **Select**, **Checkbox**, **Radio**, **Switch**.
- [x] **Advanced Controls**: **Date Picker**, **Accordion**, **Pagination**.
- [x] **Feedback Systems**: **Snackbar**, **Snackbar Queue**, **Tooltip**, **Tutor**.
- [x] **Navigation**: **Breadcrumbs** (Adaptive Icon Support).
- [/] **Data Intelligence**: Advanced Data Tables with Signal-based filtering (Q3 2026).
- [ ] **Complex Interactions**: Drag-and-drop Multi-select and Dashboard Grid Layouts.
- [ ] **Media Suite**: Modal Gallery and Asset Management interfaces.

---

## 🌐 Showcase & Docs

Ready to see Mozek in action? Visit our official showcase to interact with every component and explore full API documentation.

👉 **[mozek-website.documentation](https://thecodemeor.github.io/mozek-website)**

---

## 📜 License

Mozek is available under the terms of the [MIT license](LICENSE). Built with ❤️ by thecodemeor.