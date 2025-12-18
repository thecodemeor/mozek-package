# Changelog

All notable changes to **Mozek** will be documented in this file.

I follow [Semantic Versioning](https://semver.org/) for version updates.

---

## [0.0.1] – Initial Release

### 🎉 Added

- First stable public release of **Mozek** (Beta Version)
- Complete SCSS token system (colors, spacing, typography)
- Utility classes (margin, padding, flex, text helpers)
- Global styles import: `@use "mozek/styles"`
- `MozButton` with:
  - Color themes using token palette and hex-code
  - Model: `fill`, `flavor`, `outline`, `text`, `tonal`, `elevated`, `glass`
  - `full` and `disabled` inputs
- `MozCard` with:
  - Color themes using token palette and hex-code
  - Model: `fill`, `flavor`, `outline`, `elevated`, `glass`
  - `advance`, `loading` and `disabled` inputs
  - `moz-card-media`, `moz-card-header`, `moz-card-header-actions`, `moz-card-body`, `moz-card-footer`, `moz-card-footer-actions`,
- `MozBadge` with:
  - Color themes using token palette and hex-code
  - Icon: `check`, `cancel`, `alert`, `pending`
  - `pulse`, `notification` and `dot` inputs
- `MozCurrency` with:
  - Color themes using token palette and hex-code
  - Currency: `USD`, `EUR`, `GBP`, `JPY`, `CNY`, `KRW`, `INR`, `MYR`, `SGD`, `IDR`, `PHP`, `THB`, `VND`, `AUD`, `NZD`, `CAD`, `CHF`, `SEK`, `NOK`, `DKK`, `PLN`, `RUB`, `ZAR`, `NGN`, `AED`, `SAR`, `KWD`, `BHD`, `OMR`, `PKR`, `LKR`, `BDT`, `HKD`, `TWD`
  - `symbol` input
- `MozDivider` with:
  - Color themes using token palette and hex-code
  - Align: `start`, `center`, `end`
  - Depth: `1`, `2`, `3`, `4`, `5`
  - Orientation: `horizontal`, `vertical`
  - `dashed`, and `pill` inputs
- `MozInput` with:
  - Color themes using token palette and hex-code
  - Model: `fill`, `outline`
  - Type: `text`, `email`, `number`, `password`, `tel`, `url`, `search`
  - `label`, `helper`, `placeholder` and `error` string inputs
  - `clearable`, `readonly`, `full` and `disabled` inputs
- `MozIcon` with:
  - Color themes using token palette and hex-code
  - `size` number input
- `MozProgress` with:
  - Color themes using token palette and hex-code
  - Model: `ring`, `line_spinner`, `hourglass`, `zoomies`, `line_wobble`, `infinity`, `cardio`, `helix`, `newton`
  - `size` and `speed` number inputs
- `MozPagination` with:
  - Color themes using token palette and hex-code
  - `length`, `pageIndex`, `pageSize`, `pageChange` and `speed` inputs
- `MozSwitch` with:
  - Color themes using token palette and hex-code
  - `changed` and `disabled` inputs
- `MozButtonIcon` with:
  - Color themes using token palette and hex-code
  - Model: `tonal`, `text`
  - `gap` and `disabled` inputs
- `MozDatepicker` with:
  - Color themes using token palette and hex-code
  - Model: `outline`, `fill`
  - `label` string input
  - `disabled` input
- `MozSelect` with:
  - Color themes using token palette and hex-code
  - Model: `fill`, `outline`
  - `label`, `hint`, `placeholder` and `error` string inputs
  - `disabled` input
- `MozAccordion` with:
  - `disabled`and `multi` inputs
  - `moz-accordion-item`
    - `disabled` input
- `MozCheckbox` with:
  - Color themes using token palette and hex-code
  - Position: `start`, `end`
  - Orientation: `horizontal`, `vertical`
  - `checked` string input
  - `disabled` input
- `MozRadio` with:
  - Color themes using token palette and hex-code
  - `moz-radio-group`, `moz-radio`
  - Position: `start`, `end`
  - Orientation: `horizontal`, `vertical`
  - `checked`, `name`, `value` and `valueCHnage` string inputs
  - `disabled` input
- Demo playground application for testing and development

---

## Coming Soon

These are planned additions I aim to work on next:

- `<moz-dialog>`
- `<moz-snackbar>`
- `<moz-tooltip>`
- `<moz-sidenav>`
- `<moz-menu-instruction>`
- `<moz-menu>`
- `<moz-breadcrumbs>`
- `<moz-empty-state>`
- Additional utility classes & mixins
- More example pages in the demo