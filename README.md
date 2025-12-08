<p align="center">
    <img src="./img/png/mozek_logo_banner.png" width="250" alt="Mozek UI Banner"/>
    [![Github](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</p>

# Mozek

**Mozek** is my lightweight SCSS toolkit and UI library, designed to make styling fun, fast, and consistent.  

I personally enjoy using clean, simple, and not over-engineered. Therefore every **Mozek** component and class is designed based on my own preferences for clarity, spacing, and feel.

<p>I built it for myself at first (because I got tired of rewriting spacing, colors, and typography),  
but now *you* can enjoy it too.</p>
---

Install **Mozek** from npm with the following command.

> ```bash
> npm install @shoelace-style/shoelace
> ```
---

# 🧩 Mozek UI

Once you have install,

> **Make sure your global styles import Mozek Styles first:**
>
> ```scss
> @use "mozek/styles" as moz;
> ```
---

## 🧩 Components Available

Below are the UI components currently packaged in **Mozek UI**.

More components will be added over time as the design system grows.


- **`<moz-button>`**
- **`<moz-divider>`**
- **`<moz-currency>`**
- **`<moz-icon>`**
- **`<moz-badge>`**
- **`<moz-card>`**
- **`<moz-checkbox-group>`**
- **`<moz-checkbox>`**
- **`<moz-radio-group>`**
- **`<moz-radio>`**
- **`<moz-input>`**
- **`<moz-switch>`**
- **`<moz-select>`**
- **`<moz-option>`**
- **`<moz-progress>`**
- **`<moz-button-icon>`**
- **`<moz-accordion>`**
- **`<moz-accordion-item>`**
- **`<moz-datepicker>`**
- **`<moz-pagination>`**
---

# 🎨 Mozek Styles

For Mozek Styles, you can use it in:

- Mozek UI Components  
- Angular / React / Vue projects  
- Plain HTML + SCSS setups  
- Any place where SCSS is allowed to shine

> **Important:** before using any of the mixins or relying on the CSS variables,  
> make sure you import the toolkit in your global SCSS:
>
> ```scss
> @use "mozek/styles" as moz;
> ```

I’ve listed all the main selectors and mixins I’ve prepared below,  
so you can quickly see what’s available and how to use it.
---


## 🎨 **Color Palette List**
These are the built-in palettes, each with shades **50 → 950**:
- **red**
- **rose**
- **fuchsia**
- **violet**
- **malibu**
- **teal**
- **chartreuse**
- **emerald**
- **lemon**
- **gold**
- **amber**
- **tangerine**
- **silver**
- **gray**


## 🎨 **Class List**
### **Spacing Utilities**
| Selector | Declarations                             |
|----------|------------------------------------------|
| .m-$     | margin: $rem                             |
| .mt-$    | margin-top: $rem                         |
| .mb-$    | margin-bottom: $rem                      |
| .ml-$    | margin-left: $rem                        |
| .mr-$    | margin-right: $rem                       |
| .mx-$    | margin-left: $rem, margin-right: $rem    |
| .my-$    | margin-top: $rem, margin-bottom: $rem    |
| .p-$     | padding: $rem                            |
| .pt-$    | padding-top: $rem                        |
| .pb-$    | padding-bottom: $rem                     |
| .pl-$    | padding-left: $rem                       |
| .pr-$    | padding-right: $rem                      |
| .px-$    | padding-left: $rem, padding-right: $rem  |
| .py-$    | padding-top: $rem, padding-bottom: $rem  |
| .gap-$   | gap: $rem                                |
| .corner-$| border-raidus: $rem                      |
> You can replace **$** with numbers from **0 – 10** based on the spacing scale.

### **Flexbox Utilities**
| Selector           | Declarations                   |
|--------------------|--------------------------------|
| .flex              | display: flex                  |
| .grid              | display: grid                  |
| .flex-col          | flex-direction: column         |
| .flex-row          | flex-direction: row            |
| .flex-center       | center both axes               |
| .flex-wrap         | flex-wrap: wrap                |
| .justify-center    | justify-content: center        |
| .justify-start     | justify-content: start         |
| .justify-end       | justify-content: end           |
| .justify-between   | justify-content: space-between |
| .justify-evenly    | justify-content: space-evenly  |
| .items-center      | align-items: center            |
| .items-start       | align-items: start             |
| .items-end         | align-items: end.              |

### **Text Utilities**
| Selector           | Declarations                   |
|--------------------|--------------------------------|
| .text-center       | text: center                   |
| .text-left         | text: left                     |
| .text-right        | text: right                    |
| .text-uppercase    | text: uppercase                |
| .text-capitalize   | text: capitalize               |
| .text-oneline      | text: no wrap                  |
| .text-ellipsis     | text: single-line & ellipsis   |
| .primary           | text-color: primary            |

---

## 🎨 **Mixin Usage**
On top of the utility classes, I also prepared a set of mixins so you can style your own components while still matching the **Mozek** look and feel.

> Reminder: before using these, don’t forget:
> ```scss
> @use "mozek/styles" as moz;
> ```
```scss
@include moz.moz-typography('title-lg');
@include moz.moz-typography('title-md');
@include moz.moz-typography('title-sm');
@include moz.moz-typography('label-lg');
@include moz.moz-typography('label-md');
@include moz.moz-typography('label-sm');
@include moz.moz-typography('default');
@include moz.moz-typography('caption');
@include moz.moz-typography('footer');

@include moz.root-button();
@include moz.root-border();
@include moz.root-shadow(1);
@include moz.root-shadow(2);
@include moz.root-shadow(3);
```
---

# Browser Support

| ![Chrome](https://raw.github.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/main/src/opera/opera_48x48.png) |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Latest ✔                                                                               | Latest ✔                                                                               | Latest ✔                                                                         | Latest ✔                                                                            |

---

# 🎨 License

**Mozek** is available under the terms of the ![MIT license](LICENSE).

Whether you're building **Mozek** or building something with **Mozek** — have fun creating! 🥾