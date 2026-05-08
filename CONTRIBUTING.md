# Contributing to Mozek

First off, thank you for considering contributing to Mozek! It's people like you that make Mozek a premium tool for the Angular community.

By contributing, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 🛠️ Technical Standards

To maintain the high quality and "Zero-Waste" philosophy of Mozek, all contributions must adhere to the following technical standards:

### 1. Angular Signals
All new components and state logic **must** use Angular Signals. We are a signal-first library aiming for Zone-less compatibility.
*   Use `input()`, `output()`, and `model()` for component communication.
*   Use `computed()` for derived state to ensure efficient change detection.

### 2. Modern Control Flow
Do not use legacy structural directives (`*ngIf`, `*ngFor`, etc.). Use the modern Angular control flow blocks:
*   `@if`, `@else`, `@for`, `@switch`.

### 3. Design Tokens & SCSS
*   Avoid hardcoded values (hex colors, pixel spacings). Always use our design tokens found in `_tokens.scss`.
*   Maintain the **glassmorphism** aesthetic. Use translucency and backdrop filters where appropriate.
*   All styles should be scoped to the component and follow the `moz-` prefix naming convention.

### 4. Zero-Waste Policy
*   Prune unused imports immediately.
*   Keep templates lean and logic decoupled.
*   Ensure components are tree-shakeable.

---

## 🚀 Development Workflow

### 1. Setup
Fork the repository and clone it locally:

```bash
git clone https://github.com/YOUR_USERNAME/mozek-package.git
cd mozek-package
npm install
```

### 2. Branching
Always create a new branch for your work. We follow a strict branching strategy:

*   `feat/` - New components or features
*   `fix/` - Bug fixes
*   `docs/` - Documentation updates
*   `refactor/` - Code improvements without feature changes

```bash
git checkout -b feat/your-component-name
```

### 3. Development & Testing
Use the **Demo Application** to test your changes in real-time.

```bash
# Run the demo playground
npm run demo

# Build the library to verify compilation
npm run build:mozek
```

### 4. Conventional Commits
We enforce [Conventional Commits](https://www.conventionalcommits.org/). This helps us generate clean changelogs and manage releases.

**Format**: `<type>(<scope>): <description>`

*   `feat(button): add support for ghost variant`
*   `fix(input): resolve alignment issue on mobile`
*   `docs(readme): fix typo in quick start guide`

---

## 📬 Submission Process

### 1. Pull Request Guidelines
When opening a PR, please ensure:
*   The PR title follows Conventional Commits.
*   You have provided a clear description of the changes.
*   You have updated the relevant documentation (README, etc.).
*   The code builds successfully without errors.

### 2. Review Process
All PRs require at least one review from the maintainers. Be prepared to address feedback and make iterative improvements.

---

## 🌟 Community & Support

If you have questions or want to discuss a major architectural change before starting, please [open an issue](https://github.com/thecodemeor/mozek-package/issues).

Thank you for helping us build the future of Angular UI! 🚀🥾