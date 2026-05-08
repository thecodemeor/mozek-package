# Changelog

All notable changes to the **Mozek UI Library** are documented in this file. Adherence to [Semantic Versioning](https://semver.org/) is strictly maintained to ensure downstream stability.

---

## [1.0.0] — The "Zero-Waste" Architectural Evolution

### ⚡ Technical Core & Reactivity
- **Signal-Based State Management**: Migrated internal component states to **Angular Signals**, enabling fine-grained reactivity and minimizing change detection cycles for improved runtime performance.
- **Modern Control Flow Migration**: Optimized template compilation by transitioning from legacy structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`) to the native Angular `@if`, `@for`, and `@switch` syntax, reducing template overhead.
- **Zone-less Readiness**: Refactored component interaction patterns to support future **Zone-less** Angular deployments, ensuring compatibility with high-performance execution environments.

### 🏗️ Architectural Shifts
- **Tree-Shaking Optimization**: Pruned `CommonModule` from all library entry points. Individual utilities (e.g., `DatePipe`, `NgTemplateOutlet`) are now imported as standalone dependencies to minimize bundle weight.
- **Responsive "Middle-Collapse" Strategy**: Implemented an adaptive breadcrumb logic utilizing `ResizeObserver` and `NgZone.runOutsideAngular` to handle complex layout calculations without triggering unnecessary change detection.
- **Standardized Design Token System**: Refined the SCSS foundation by migrating to a centralized token-based architecture for spacing, elevation, and typography, ensuring CSS property inheritance consistency.

### 🧩 Component Refinements
- **Adaptive Breadcrumbs**: Native support for icon-based navigation and dynamic middle-item collapsing.
- **Overlay Suite Optimization**: Refactored `MozTooltip` and `MozSnackbar` to use decoupled positioning logic, improving DOM placement accuracy.
- **Form Controls Refactor**: Enhanced `MozInput` and `MozSelect` with consistent error-state management and ARIA-compliant accessibility patterns.

---

## [0.0.1] — Initial Architectural Baseline

### 🏛️ Foundation & Framework
- **Core Design System**: Established the primary design language, implementing a **glassmorphism-focused** SCSS toolkit with full support for light/dark mode elevation levels.
- **Modular Component Suite**: Released the first iteration of 17 standalone components, designed with a focus on high-reusability and decoupled styling logic.
- **Utility Engine**: Integrated a high-performance utility class system for spacing (`m-*`, `p-*`), flexbox orchestration, and text manipulation.

### 📦 Initial Modules
- **Action Elements**: `MozButton`, `MozButtonIcon`.
- **Form Foundation**: `MozInput`, `MozSelect`, `MozCheckbox`, `MozRadio`, `MozSwitch`, `MozDatepicker`.
- **Layout & Structure**: `MozCard`, `MozDivider`, `MozBadge`, `MozAccordion`.
- **Data & Feedback**: `MozPagination`, `MozProgress`, `MozCurrency`, `MozIcon`.

---

## 🔮 Future Roadmap

- **Modular Sidenav Engine**: Implementation of a persistent navigation framework with collapsible states.
- **Dialog Orchestrator**: A programmatic overlay service for modal management.
- **High-Performance Data Tables**: Signal-driven table components with native support for server-side pagination and lazy loading.
- **Advanced Transition Suite**: Standardization of physics-based micro-animations across all interactive layers.