# Changelog

All notable changes to the **Mozek UI Library** are documented in this file.

---

## [1.0.0] — The Feature Evolution

### 🧩 New Components & Major Features

*   **Adaptive Breadcrumbs (`MozBreadcrumbs`)**
    *   **Middle-Collapse Logic**: Automatically collapses intermediate paths into a dropdown menu based on container width to prevent layout overflow.
    *   **Icon Support**: Native integration for path-specific icons, enhancing visual hierarchy.
    *   **Dynamic Truncation**: Ensures the first and last paths remain visible at all times for orientation.
*   **Focus Menu Overlay (`MozFocusOverlay`)**
    *   **Isolated Focus**: Uses a CSS backdrop-filter blur with a custom masking strategy to isolate the trigger element and menu, keeping them sharp while blurring the background.
    *   **Signal Integration**: Managed via Angular Signals for high-performance open/close state transitions.
    *   **Scroll Lock**: Automatically disables body scrolling when the overlay is active.
*   **Enhanced Snackbar Suite**
    *   **Queue Management**: Standardized a singleton snackbar queue to prevent message overlapping and handle high-frequency notifications.
    *   **Physics-Based Transitions**: Refactored entry/exit animations for a more tactile, premium feel.
*   **Tutor Onboarding System**
    *   **Smart Anchor Positioning**: Dynamically calculates tooltip placement based on target element bounding rectangles.
    *   **Glassmorphism Theming**: Consistent aesthetic integration with the broader Mozek design language.

### ⚙️ Under the Hood
*   **Signal-First Architecture**: Internal states migrated to Angular Signals for fine-grained reactivity.
*   **Modern Control Flow**: Templates converted to `@if`, `@for`, and `@switch` for faster compilation.
*   **Zero-Waste Refactor**: Removed `CommonModule` dependencies to enable aggressive tree-shaking and smaller bundle sizes.

---

## [0.0.1] — Initial Baseline

### 🏛️ Core Suite
- **Action Elements**: `MozButton`, `MozButtonIcon`.
- **Form Foundation**: `MozInput`, `MozSelect`, `MozCheckbox`, `MozRadio`, `MozSwitch`, `MozDatepicker`.
- **Layout & Structure**: `MozCard`, `MozDivider`, `MozBadge`, `MozAccordion`.
- **Data & Feedback**: `MozPagination`, `MozProgress`, `MozCurrency`, `MozIcon`.
- **Global Styles**: Full SCSS token system and utility engine.