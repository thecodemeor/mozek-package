# Changelog

All notable changes to the **Mozek UI Library** are documented in this file.

---

## [1.0.0] — The Complete Component Suite

This version marks the transition to a full **Signal-Powered** and **Zero-Waste** architecture across the entire library.

### 🧩 Available Components

#### **Navigation & Orchestration**
*   **`MozBreadcrumbs`**: Adaptive navigation with "middle-collapse" logic, icon support, and dynamic URL routing.
*   **`MenuTutor`**: Premium isolation and onboarding menu with backdrop-blur masking, trigger highlighting, and signal-based visibility.
*   **`MozPagination`**: High-performance data pagination with configurable page sizes and tactile transitions.
*   **`MozAccordion`**: Multi-select support with smooth expansion/collapse animations and accessible headers.

#### **Form Controls (Signal-Enabled)**
*   **`MozInput`**: Type-safe text entry with support for labels, hints, and error-state management.
*   **`MozSelect`**: Custom dropdown with glassmorphism styling and seamless signal integration.
*   **`MozDatepicker`**: Modular calendar system with rapid month/year navigation and custom styling.
*   **`MozCheckbox`**: Tactile checkbox with configurable label positions and reactive states.
*   **`MozRadio`** & **`MozRadioGroup`**: Grouped selection controls with unified state management.
*   **`MozSwitch`**: Premium toggle switch with optimized CSS transitions for tactile feedback.

#### **Feedback & Overlays**
*   **`MozSnackbar`** & **`MozSnackbarQueue`**: Managed notification system with singleton queueing and auto-dismissal.
*   **`MozTooltip`**: Anchor-based hover info with physics-based entry animations.
*   **`MozProgress`**: 9+ animated loading models including ring, line-wobble, and cardio effects.

#### **Actions & Display**
*   **`MozButton`**: Multi-model buttons (fill, outline, glass, tonal) with unified color token support.
*   **`MozButtonIcon`**: Minimalist icon actions with optimized hit zones and signal hover states.
*   **`MozCard`**: Structural container with support for headers, media, and action-footer sections.
*   **`MozBadge`**: Notification indicators with pulse animations and dot/icon modes.
*   **`MozDivider`**: Layout separator with depth, orientation, and alignment configurations.
*   **`MozIcon`**: Scalable SVG icon wrapper with unified token-based coloring.
*   **`MozCurrency`**: Auto-formatting currency display supporting 30+ international symbols.

### ⚙️ Core Enhancements
- **Signals Migration**: Every component now uses Angular Signals for internal state and inputs.
- **Modern Control Flow**: Templates optimized with `@if`, `@for`, and `@switch`.
- **Zero-Waste Refactor**: Removed `CommonModule` to maximize tree-shaking efficiency.

---

## [0.0.1] — Initial Beta Release

Establishment of the core SCSS design system, tokens, and initial component prototypes.