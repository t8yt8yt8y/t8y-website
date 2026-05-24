# Mobile Optimization Design

**Date:** 2026-05-24  
**Status:** Approved

## Problem

The t8y website has four mobile breakage points on screens ≤ 768px:

1. **Header width bug** — `header { width: 25%; max-width: 25% }` is a global rule. When `.top-bar` stacks to `flex-direction: column` on mobile, the intro text is still constrained to 25% width, making it unreadably narrow.
2. **Nav overflow** — `.main-nav` has no wrapping; on narrow phones the links (projects · about · calendar · shop / 中) crowd and clip.
3. **Footer overflow** — all links and the newsletter form sit in a single `<p>` with `white-space: nowrap` on the newsletter wrapper. This overflows horizontally on every phone.
4. **Small touch targets** — nav links have no padding, making them hard to tap.

## Approach

CSS fixes + a small vanilla JS hamburger toggle. No structural refactoring of HTML files beyond adding one `<script>` tag per page.

Rejected alternatives:
- **CSS-only hamburger** (checkbox hack) — fragile, inaccessible
- **Shared JS nav component** (move nav into footer.js) — too invasive, touches every page's structure

## Files Changed

| File | Change |
|------|--------|
| `assets/css/style.css` | Add/update `@media (max-width: 768px)` rules |
| `assets/js/nav.js` | New file, ~20 lines, hamburger toggle logic |
| All 15 `*.html` files with `.main-nav` | Add `<script src=".../nav.js">` tag |

The 16 HTML files are:
- Root: `index.html`, `about/index.html`, `calendar/index.html`
- Shop: `shop/index.html`, `shop/funkloch-wanderkarte/index.html`, `shop/rate-patriarchy/index.html`, `shop/sendtomars/index.html`, `shop/poisoning-reality-frame/index.html`, `shop/datenschutz/index.html`
- Projects: `projects/billboard/index.html`, `projects/funkloecher/index.html`, `projects/poisoningreality/index.html`, `projects/poisoningreality/documentation.html`, `projects/powerplay/index.html`, `projects/sendtomars/index.html`

## CSS Changes (`assets/css/style.css`)

All changes are inside the existing `@media (max-width: 768px)` block.

**Fix 1 — Header width bug:**
```css
header {
  width: auto;
  max-width: 100%;
}
```

**Fix 2 — Hamburger button (visible only on mobile):**
```css
.nav-hamburger {
  display: flex; /* shown on mobile */
  font-family: 'VT323', monospace;
  font-size: 24px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: #FF4DC9;
  color: black;
}
```
On desktop (outside media query): `.nav-hamburger { display: none; }`

**Fix 3 — Nav collapse on mobile:**
```css
.main-nav {
  display: none;        /* hidden by default on mobile */
  flex-direction: column;
  gap: 14px;
  padding: 10px 0;
}
.main-nav.nav-open {
  display: flex;        /* shown when toggled */
}
```

**Fix 4 — Footer reflow:**
```css
footer p {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-newsletter-wrap {
  white-space: normal;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}
```

## JS Hamburger Logic (`assets/js/nav.js`)

New file, injected into every page's `<head>`.

Behaviour:
1. On `DOMContentLoaded`, create `<button class="nav-hamburger">☰</button>` and prepend it inside `.main-nav`.
2. On click, toggle class `nav-open` on `.main-nav`; swap button text between `☰` and `✕`.
3. On click of any nav `<a>`, remove `nav-open` (so the menu closes after navigating).
4. Vanilla JS only, no dependencies.

## Script Tag Pattern

Each HTML file gets one additional line in `<head>`, following the existing `translations.js` pattern:

```html
<!-- root-level pages -->
<script src="assets/js/nav.js"></script>

<!-- one level deep (about/, calendar/, shop/) -->
<script src="../assets/js/nav.js"></script>

<!-- two levels deep (projects/powerplay/ etc.) -->
<script src="../../assets/js/nav.js"></script>
```

## Testing

Manual verification at three viewport widths:

| Width | Check |
|-------|-------|
| 375px (iPhone SE) | Hamburger visible; nav hidden; ☰ opens nav; ✕ closes it; tapping a link navigates and closes nav; footer fully stacked |
| 390px (iPhone 14) | Same checks |
| 768px (boundary) | Hamburger gone; nav shows inline; footer reverts to horizontal |

All 15 pages with `.main-nav` checked. No automated tests — static site.
