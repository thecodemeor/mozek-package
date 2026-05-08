# Mozek Angular

![Mozek Banner](https://raw.githubusercontent.com/thecodemeor/mozek-package/main/projects/mozek/mozek_banner.svg)

**The high-performance, signal-powered UI suite for Angular.**  
Mozek is a minimalist UI library designed with a sleek glassmorphism aesthetic to bring premium SaaS design to your enterprise applications.

---

## ⚡ Quick Start

Get your project up and running in under 2 minutes.

### 1. Install the package
```bash
npm install mozek-angular
```

### 2. Implementation
Import Mozek components directly into your standalone components.

```typescript
import { MozButtonIcon } from 'mozek-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MozButtonIcon],
  template: `
    <moz-button-icon icon="home" (click)="goHome()">
      Return to Dashboard
    </moz-button-icon>
  `
})
export class AppComponent {}
```

---

## 🛠️ Key Technical Specs

*   **Full Angular Signal Integration**: Engineered for fine-grained reactivity and minimal change detection overhead.
*   **Zero-Zone.js Compatibility**: Optimized for high-performance, future-proof Angular architectures.
*   **Fully Tree-Shakeable**: Modular design ensures you only ship the components you actually use.
*   **First-Class Style Support**: Seamless integration with existing SCSS projects or TailwindCSS workflows.

---

## 🧩 Components Overview

| Component Category | Available Components |
| :--- | :--- |
| **Actions** | **Button**, **Button Icon** |
| **Forms** | **Input**, **Select**, **Checkbox**, **Radio**, **Switch**, **Date Picker** |
| **Layout** | **Card**, **Divider**, **Badge**, **Accordion** |
| **Navigation** | **Pagination**, **Breadcrumbs**, **MenuTutor** |
| **Feedback** | **Snackbar**, **Tooltip**, **Progress**, **Icon**, **Currency** |

---

## 📋 Peer Dependencies

Mozek requires a modern Angular environment to function correctly:

*   **Angular Core/Common**: >=18.0.0 <21.0.0
*   **Sass**: Dart Sass is recommended for the design system tokens.

---

## 🌐 Full Documentation & Showcase

For a full interactive component showcase, API references, and advanced configuration guides, visit our official documentation:

👉 **[https://thecodemeor.github.io/mozek-website/home](https://thecodemeor.github.io/mozek-website/home)**

---

## 📜 License

Mozek is available under the [MIT License](https://github.com/thecodemeor/mozek-package/blob/main/LICENSE).