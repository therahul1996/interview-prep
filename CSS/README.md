# CSS Interview Q&A

### Table of Contents

| No. | Questions |
|---- | --------- |
| 1 | [What is the CSS box model?](#1-what-is-the-css-box-model) |
| 2 | [What is the difference between class and ID selectors?](#2-what-is-the-difference-between-class-and-id-selectors) |
| 3 | [What is specificity in CSS?](#3-what-is-specificity-in-css) |
| 4 | [What is the difference between display: block, inline, and inline-block?](#4-what-is-the-difference-between-display-block-inline-and-inlineblock) |
| 5 | [How does position: relative vs absolute vs fixed work?](#5-how-does-position-relative-vs-absolute-vs-fixed-work) |
| 6 | [What is the z-index property?](#6-what-is-the-zindex-property) |
| 7 | [What is the difference between em, rem, px, and %?](#7-what-is-the-difference-between-em-rem-px-and-) |
| 8 | [How do you center a div horizontally and vertically?](#8-how-do-you-center-a-div-horizontally-and-vertically) |
| 9 | [What is the cascade in CSS?](#9-what-is-the-cascade-in-css) |
| 10 | [What are pseudo-classes and pseudo-elements?](#10-what-are-pseudoclasses-and-pseudoelements) |
| 11 | [What is the difference between visibility: hidden and display: none?](#11-what-is-the-difference-between-visibility-hidden-and-display-none) |
| 12 | [What are CSS combinators?](#12-what-are-css-combinators) |
| 13 | [What is float and clearfix?](#13-what-is-float-and-clearfix) |
| 14 | [What are CSS variables (custom properties)?](#14-what-are-css-variables-custom-properties) |
| 15 | [What is the difference between margin and padding?](#15-what-is-the-difference-between-margin-and-padding) |
| 16 | [What is the stacking context and how is it created?](#16-what-is-the-stacking-context-and-how-is-it-created) |
| 17 | [Explain CSS Grid vs Flexbox — when to use which?](#17-explain-css-grid-vs-flexbox-—-when-to-use-which) |
| 18 | [What is CSS specificity and how does !important affect it?](#18-what-is-css-specificity-and-how-does-important-affect-it) |
| 19 | [What are CSS Layers (@layer) and why use them?](#19-what-are-css-layers-@layer-and-why-use-them) |
| 20 | [How does CSS containment (contain property) improve performance?](#20-how-does-css-containment-contain-property-improve-performance) |
| 21 | [What is a CSS logical property?](#21-what-is-a-css-logical-property) |
| 22 | [How does will-change work and what are its pitfalls?](#22-how-does-willchange-work-and-what-are-its-pitfalls) |
| 23 | [Explain CSS animations vs transitions — key differences.](#23-explain-css-animations-vs-transitions-—-key-differences) |
| 24 | [What is a CSS Grid subgrid and when is it useful?](#24-what-is-a-css-grid-subgrid-and-when-is-it-useful) |
| 25 | [What is the difference between transform and position for animation?](#25-what-is-the-difference-between-transform-and-position-for-animation) |
| 26 | [What are container queries and how do they differ from media queries?](#26-what-are-container-queries-and-how-do-they-differ-from-media-queries) |
| 27 | [Explain BEM methodology and why it helps with CSS at scale.](#27-explain-bem-methodology-and-why-it-helps-with-css-at-scale) |
| 28 | [What is the clamp() function in CSS?](#28-what-is-the-clamp-function-in-css) |
| 29 | [What is margin collapse and when does it happen?](#29-what-is-margin-collapse-and-when-does-it-happen) |
| 30 | [What is the difference between :is(), :where(), and :not()?](#30-what-is-the-difference-between-is-where-and-not) |
| 31 | [What is the CSS Object Model (CSSOM)?](#31-what-is-the-css-object-model-cssom) |
| 32 | [What is the difference between mobile-first and desktop-first approaches?](#32-what-is-the-difference-between-mobilefirst-and-desktopfirst-approaches) |
| 33 | [How do you implement dark mode in modern CSS?](#33-how-do-you-implement-dark-mode-in-modern-css) |
| 34 | [What are the benefits of using a CSS preprocessor like Sass or Less?](#34-what-are-the-benefits-of-using-a-css-preprocessor-like-sass-or-less) |
| 35 | [Explain CSS-in-JS vs CSS Modules vs Utility-first CSS.](#35-explain-cssinjs-vs-css-modules-vs-utilityfirst-css) |
| 36 | [How do you hide an element visually but keep it accessible for screen readers?](#36-how-do-you-hide-an-element-visually-but-keep-it-accessible-for-screen-readers) |
| 37 | [How do you respect user preferences regarding animations?](#37-how-do-you-respect-user-preferences-regarding-animations) |
| 38 | [Explain flex-grow, flex-shrink, and flex-basis.](#38-explain-flexgrow-flexshrink-and-flexbasis) |


This document contains 30 basic and advanced CSS interview questions and answers.

## Basic (15)

### 1. What is the CSS box model?
The CSS box model is a container that wraps around every HTML element. It consists of:
- **Content:** The actual content of the box, where text and images appear.
- **Padding:** Clears an area around the content. The padding is transparent.
- **Border:** A border that goes around the padding and content.
- **Margin:** Clears an area outside the border. The margin is transparent.

### 2. What is the difference between class and ID selectors?
- **Class (`.classname`):** Can be used on multiple elements across a page. It has lower specificity than an ID.
- **ID (`#idname`):** Must be unique within a page (can only be used once per page). It has higher specificity than a class.

### 3. What is specificity in CSS?
Specificity determines which CSS rule is applied by the browsers when multiple rules could apply to the same element. It is calculated based on the selectors used:
- Inline styles (highest specificity)
- IDs
- Classes, attributes, and pseudo-classes
- Elements and pseudo-elements (lowest specificity)

### 4. What is the difference between display: block, inline, and inline-block?
- `block`: Elements start on a new line and take up the full width available (e.g., `<div>`, `<p>`).
- `inline`: Elements do not start on a new line and only take up as much width as necessary. You cannot set width or height (e.g., `<span>`, `<a>`).
- `inline-block`: Similar to `inline`, but allows you to set width and height.

### 5. How does position: relative vs absolute vs fixed work?
- `relative`: Positioned relative to its normal (static) position.
- `absolute`: Positioned relative to its closest positioned ancestor (an ancestor with a position other than `static`). If none exists, it's relative to the document body.
- `fixed`: Positioned relative to the viewport (the browser window). It stays in the same place even if the page is scrolled.

### 6. What is the z-index property?
The `z-index` property specifies the stack order of an element. An element with a greater stack order is always in front of an element with a lower stack order. It only works on positioned elements (`position: absolute`, `relative`, `fixed`, or `sticky`) and flex/grid items.

### 7. What is the difference between em, rem, px, and %?
- `px`: Absolute measurement in pixels.
- `em`: Relative to the font-size of its direct or nearest parent element.
- `rem`: Relative to the font-size of the root element (`<html>`).
- `%`: Relative to the parent element's corresponding dimension (like width or height).

### 8. How do you center a div horizontally and vertically?
Using Flexbox:
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
Using Grid:
```css
.parent {
  display: grid;
  place-items: center;
}
```

### 9. What is the cascade in CSS?
The cascade is the algorithm that determines which CSS styles are applied to an element when multiple rules overlap. It takes into account importance (e.g., `!important`), specificity, source order, and origin (author, user, or user-agent styles).

### 10. What are pseudo-classes and pseudo-elements?
- **Pseudo-class:** A keyword added to a selector that specifies a special state of the selected element(s) (e.g., `:hover`, `:active`, `:nth-child`).
- **Pseudo-element:** A keyword added to a selector that lets you style a specific part of the selected element(s) (e.g., `::before`, `::after`, `::first-line`).

### 11. What is the difference between visibility: hidden and display: none?
- `visibility: hidden`: Hides the element, but it still takes up space in the layout.
- `display: none`: Removes the element completely from the document flow, meaning it takes up no space.

### 12. What are CSS combinators?
Combinators explain the relationship between two selectors:
- **Descendant selector (space):** Selects all elements inside a specified element.
- **Child selector (`>`):** Selects all elements that are direct children of a specified element.
- **Adjacent sibling selector (`+`):** Selects an element directly after another specific element.
- **General sibling selector (`~`):** Selects all elements that are siblings of a specified element.

### 13. What is float and clearfix?
- `float`: Originally used for wrapping text around images (`left`, `right`), but was historically used for layout. Floated elements are removed from the normal document flow.
- `clearfix`: A technique used to fix the issue where a parent element collapses (has zero height) because its children are floated.
```css
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
```

### 14. What are CSS variables (custom properties)?
CSS variables allow you to store values and reuse them throughout a stylesheet. They are defined using the `--` prefix and accessed using the `var()` function.
```css
:root {
  --main-color: blue;
}
h1 {
  color: var(--main-color);
}
```

### 15. What is the difference between margin and padding?
- **Padding:** Space inside the border, between the border and the content. It affects the element's total size (in the standard box model) and inherits the element's background.
- **Margin:** Space outside the border, separating the element from other elements. It is transparent and collapses vertically in normal flow.

## Advanced (15)

### 16. What is the stacking context and how is it created?
A stacking context is a three-dimensional conceptualization of HTML elements along an imaginary z-axis relative to the user. Elements within the same stacking context are ordered from back to front based on their `z-index`. 
It can be created by properties like: `opacity` less than 1, `transform` or `filter` not set to none, `position` with a `z-index` other than auto, `flex` or `grid` children with `z-index`, or `isolation: isolate`.

### 17. Explain CSS Grid vs Flexbox — when to use which?
- **Flexbox (One-dimensional):** Designed for laying out items in a single row or a single column. Best for aligning items within a container and distributing space dynamically.
- **CSS Grid (Two-dimensional):** Designed for laying out items in both rows and columns simultaneously. Best for overall page layout and complex, rigid structures.

### 18. What is CSS specificity and how does !important affect it?
`!important` is an exception to the normal specificity rules. When `!important` is appended to a CSS declaration, it overrides any other declarations for that property on that element, regardless of specificity. The only way to override an `!important` rule is with another `!important` rule that has higher specificity or comes later in the source code.

### 19. What are CSS Layers (@layer) and why use them?
The `@layer` rule allows authors to define cascade layers, giving explicit control over the priority of different CSS rules without relying entirely on selector specificity. Rules in lower layers are overridden by rules in higher layers, regardless of the specificity of their selectors. This is extremely useful for managing large codebases or overriding third-party styles.

### 20. How does CSS containment (contain property) improve performance?
The `contain` property allows an author to indicate that an element and its contents are independent of the rest of the document tree. This isolates the element, enabling the browser to optimize rendering by skipping layout, style, paint, or size recalculations for the rest of the DOM when changes occur inside the contained element.

### 21. What is a CSS logical property?
Logical properties control layout through logical, rather than physical, direction and dimension mappings. Instead of `margin-left` or `margin-top`, you use `margin-inline-start` or `margin-block-start`. They are crucial for creating layouts that adapt seamlessly to different writing modes (like right-to-left or top-to-bottom languages).

### 22. How does will-change work and what are its pitfalls?
`will-change` provides a hint to the browser about what properties are likely to change in the future, allowing the browser to set up optimizations ahead of time (like creating a new compositor layer).
**Pitfalls:** Overusing it can consume excessive memory and lead to a slower page. It should be used as a last resort for performance issues and applied dynamically via JavaScript just before the animation begins, then removed afterward.

### 23. Explain CSS animations vs transitions — key differences.
- **Transitions:** Used to smoothly change property values over a given duration when a state change occurs (e.g., on `:hover`). Requires a trigger to start.
- **Animations:** Defined using `@keyframes`. Can start automatically on page load, loop infinitely, pause, and handle complex multi-step state changes without needing an explicit trigger (like a hover state).

### 24. What is a CSS Grid subgrid and when is it useful?
`subgrid` allows a nested grid container to inherit the grid tracks (rows or columns) from its parent grid. This is useful when you want items inside a nested grid to align perfectly with the tracks of the outer grid, which is very difficult to achieve with nested, independent grids.

### 25. What is the difference between transform and position for animation?
Animating `transform` (and `opacity`) is highly performant because it relies on the GPU (compositor thread) and does not trigger document layout or paint recalculations. Animating `position` properties (`top`, `left`, etc.) triggers a layout recalculation for the element and potentially the whole document on every frame, which is computationally expensive and can cause jank.

### 26. What are container queries and how do they differ from media queries?
- **Media queries:** Apply styles based on the size of the viewport (the browser window).
- **Container queries (`@container`):** Apply styles based on the size of an element's parent container. This allows components to be truly modular and style themselves based on the available space they are placed in, regardless of the overall viewport size.

### 27. Explain BEM methodology and why it helps with CSS at scale.
BEM (Block, Element, Modifier) is a naming convention for classes in HTML and CSS (`.block__element--modifier`).
It helps at scale because it creates a flat specificity structure, makes it clear what a class does just by reading its name, prevents CSS from bleeding into unintended elements, and ensures code remains modular and maintainable.

### 28. What is the clamp() function in CSS?
`clamp(minimum, preferred, maximum)` clamps a value between an upper and lower bound. It's heavily used for responsive design, particularly responsive typography, allowing text to scale fluidly between a minimum and maximum size based on viewport width (e.g., `font-size: clamp(1rem, 2.5vw, 2rem);`).

### 29. What is margin collapse and when does it happen?
Margin collapse happens when the vertical margins of adjoining block-level elements combine into a single margin, whose size is the largest of the individual margins.
It happens between:
- Adjacent siblings
- A parent and its first/last child (if no border, padding, or inline content separates them)
- Empty blocks

### 30. What is the difference between :is(), :where(), and :not()?
- `:is()`: Groups selectors and takes the specificity of the most specific argument.
- `:where()`: Groups selectors but always has 0 specificity — great for base styles you want to easily override.
- `:not()`: Matches elements that do NOT match the argument. In level 4 selectors, it behaves like `:is()` regarding specificity (takes the highest of its arguments).

Example:
```css
:is(h1, h2, h3) { line-height: 1.2; }
:where(article, section) p { color: gray; } /* 0 specificity */
```

### 31. What is the CSS Object Model (CSSOM)?
The CSS Object Model (CSSOM) is a set of APIs allowing manipulating CSS from JavaScript. Much like the DOM provides a structural representation of HTML, the CSSOM provides a structured map of all CSS styles found on a page. The browser combines the DOM and CSSOM to create the render tree, which is then used to paint the page.

## Architecture, Performance & Accessibility (Bonus)

### 32. What is the difference between mobile-first and desktop-first approaches?
- **Mobile-first:** You write your base CSS for small screens (mobile) and use `min-width` media queries to add complexity for larger screens. This is generally preferred as it is better for performance (mobile devices don't download/parse complex desktop layouts) and ensures a core user experience.
- **Desktop-first:** You write base CSS for large screens and use `max-width` media queries to scale down and remove complexity for smaller screens.

### 33. How do you implement dark mode in modern CSS?
You can detect the user's system preference using the `@media (prefers-color-scheme: dark)` media query. Combined with CSS variables, you can easily swap out the color palette:
```css
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
  }
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
```

### 34. What are the benefits of using a CSS preprocessor like Sass or Less?
CSS preprocessors extend vanilla CSS by adding features like:
- **Variables** (though vanilla CSS has custom properties now, preprocessor variables are resolved at compile-time).
- **Nesting** to make code more readable (though native CSS nesting is also becoming standard).
- **Mixins** to group and reuse CSS declarations.
- **Functions and operations** (math, color manipulation like `darken()`, `lighten()`).
- **File modularity** via partials without generating multiple HTTP requests.

### 35. Explain CSS-in-JS vs CSS Modules vs Utility-first CSS.
- **CSS-in-JS (e.g., styled-components):** CSS is written directly inside JavaScript files. It automatically scopes styles to components, avoiding specificity clashes and unused CSS, and allows easy access to JS state for styling.
- **CSS Modules:** Writes normal CSS files, but the build tool (like Webpack or Vite) scopes the class names locally by generating unique hashes. It prevents naming collisions while keeping CSS separate from JS.
- **Utility-first (e.g., Tailwind CSS):** Provides low-level utility classes (`flex`, `pt-4`, `text-center`) rather than semantic component classes. It leads to rapid development, consistent design tokens, and a small final CSS bundle since styles are heavily reused.

### 36. How do you hide an element visually but keep it accessible for screen readers?
Using `display: none` or `visibility: hidden` removes the element from the accessibility tree, meaning screen readers ignore it. Instead, you use a `.sr-only` (screen-reader only) utility class that visually clips the element to a 1px square:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 37. How do you respect user preferences regarding animations?
Users with vestibular disorders can experience motion sickness from UI animations. CSS provides the `prefers-reduced-motion` media query to disable or reduce animations:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 38. Explain flex-grow, flex-shrink, and flex-basis.
These three properties control how flex items resize to fit the flex container. They are often combined into the shorthand `flex: <grow> <shrink> <basis>;`.
- **`flex-basis`:** Defines the initial default size of the element before any growing or shrinking occurs (e.g., `200px` or `auto`).
- **`flex-grow`:** Defines how much of the remaining available space in the container the item should take up relative to other items. (Default is `0`, meaning it won't grow).
- **`flex-shrink`:** Defines how much the item will shrink relative to the other items if there is not enough space in the container. (Default is `1`, meaning it will shrink).
