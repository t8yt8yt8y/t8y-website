# Mobile Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix four mobile breakage points on the t8y website: crushed header text, nav overflow, footer overflow, and small touch targets — using a hamburger menu, CSS fixes, and no structural refactoring.

**Architecture:** A new `assets/js/nav.js` injects a `☰` button as a sibling to `.main-nav` inside `.top-bar`, then toggles class `nav-open` on the nav on click. All layout fixes live in the existing `@media (max-width: 768px)` block in `style.css`. Each of the 16 HTML pages with `.main-nav` gets one new `<script>` tag.

**Tech Stack:** Vanilla JS (ES5), CSS media queries, static HTML

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `assets/js/nav.js` | Hamburger toggle — injects button, handles open/close |
| Modify | `assets/css/style.css` | Add global `.nav-hamburger { display:none }` + mobile overrides |
| Modify | `index.html` | Add `<script src="assets/js/nav.js">` |
| Modify | `about/index.html` | Add `<script src="../assets/js/nav.js">` |
| Modify | `calendar/index.html` | Add `<script src="../assets/js/nav.js">` |
| Modify | `shop/index.html` | Add `<script src="../assets/js/nav.js">` |
| Modify | `shop/funkloch-wanderkarte/index.html` | Add `<script src="../../assets/js/nav.js">` |
| Modify | `shop/rate-patriarchy/index.html` | Add `<script src="../../assets/js/nav.js">` |
| Modify | `shop/sendtomars/index.html` | Add `<script src="../../assets/js/nav.js">` |
| Modify | `shop/poisoning-reality-frame/index.html` | Add `<script src="../../assets/js/nav.js">` |
| Modify | `shop/datenschutz/index.html` | Add `<script src="../../assets/js/nav.js">` |
| Modify | `projects/billboard/index.html` | Add `<script src="../../assets/js/nav.js">` |
| Modify | `projects/funkloecher/index.html` | Add `<script src="../../assets/js/nav.js">` |
| Modify | `projects/happyclub/index.html` | Add `<script src="../../assets/js/nav.js">` |
| Modify | `projects/poisoningreality/index.html` | Add `<script src="../../assets/js/nav.js">` |
| Modify | `projects/poisoningreality/documentation.html` | Add `<script src="../../assets/js/nav.js">` |
| Modify | `projects/powerplay/index.html` | Add `<script src="../../assets/js/nav.js">` |
| Modify | `projects/sendtomars/index.html` | Add `<script src="../../assets/js/nav.js">` |

---

## Task 1: Create `assets/js/nav.js`

**Files:**
- Create: `assets/js/nav.js`

- [ ] **Step 1: Create the file with the hamburger toggle logic**

Write the following complete content to `assets/js/nav.js`:

```js
(function () {
  function initNav() {
    var nav = document.querySelector('.main-nav');
    if (!nav) return;
    var topBar = nav.parentElement;
    if (!topBar) return;

    var btn = document.createElement('button');
    btn.className = 'nav-hamburger';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.textContent = '☰';

    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      btn.textContent = open ? '✕' : '☰';
    });

    topBar.insertBefore(btn, nav);

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        btn.textContent = '☰';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
```

The button is inserted as a sibling **before** `.main-nav` inside `.top-bar` — not inside the nav — so hiding the nav on mobile doesn't hide the button.

- [ ] **Step 2: Verify the file exists**

```bash
ls assets/js/
```

Expected output includes `nav.js`, `footer.js`, `translations.js`.

---

## Task 2: Add CSS mobile fixes to `style.css`

**Files:**
- Modify: `assets/css/style.css`

The file currently ends after the `@media (max-width: 768px)` block at line ~437. Make two edits:

- [ ] **Step 1: Add global `.nav-hamburger` rule (hidden on desktop)**

After the `.nav-sep` block (around line 378), add:

```css
  /* Hamburger button — hidden on desktop, shown via mobile media query */
  .nav-hamburger {
    display: none;
    font-family: 'VT323', monospace;
    font-size: 28px;
    background: none;
    border: none;
    padding: 0;
    cursor: url(../images/emoji.png) 0 0, pointer;
    text-decoration: underline;
    text-decoration-color: #FF4DC9;
    color: black;
    line-height: 1;
    align-self: center;
  }

  .nav-hamburger:hover {
    color: #FF4DC9;
  }
```

- [ ] **Step 2: Replace the existing `@media (max-width: 768px)` block**

The current block (lines ~421–437) contains only `.top-bar`, `.site-header`, and `.back-link` rules. Replace the entire block with this expanded version:

```css
  /* Mobile: hamburger nav + layout fixes */
  @media (max-width: 768px) {
    /* Row 1: intro text + hamburger side by side */
    .top-bar {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    /* Fix header width bug: global rule sets width:25% which crushes text */
    header {
      flex: 1 1 auto;
      width: auto;
      max-width: calc(100% - 50px);
    }

    /* Show hamburger button on mobile */
    .nav-hamburger {
      display: block;
    }

    /* Nav hidden by default; expands full-width below row 1 when open */
    .main-nav {
      display: none;
      flex-direction: column;
      gap: 14px;
      padding: 10px 0;
      width: 100%;
    }

    .main-nav.nav-open {
      display: flex;
    }

    /* Bigger tap targets for nav links */
    .main-nav a,
    .main-nav .lang-btn {
      padding: 6px 0;
      font-size: 22px;
    }

    /* Site header (project sub-pages) */
    .site-header {
      position: relative;
      padding: 10px;
      margin-bottom: 10px;
    }

    .back-link {
      font-size: 24px;
      padding: 8px 12px;
    }

    /* Footer: stack every item vertically */
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
  }
```

- [ ] **Step 3: Verify the CSS file still has no syntax errors**

Open `index.html` in a browser. No console errors, page renders normally at desktop width (> 768px).

---

## Task 3: Add `nav.js` script tag to root and first-level pages

**Files:**
- Modify: `index.html`
- Modify: `about/index.html`
- Modify: `calendar/index.html`
- Modify: `shop/index.html`

For each file, add the script tag on the line **immediately after** the existing `translations.js` script tag. The pattern to follow:

`index.html` — existing line:
```html
    <script src="assets/js/translations.js"></script>
```
Add after it:
```html
    <script src="assets/js/nav.js"></script>
```

`about/index.html`, `calendar/index.html`, `shop/index.html` — existing line:
```html
    <script src="../assets/js/translations.js"></script>
```
Add after it:
```html
    <script src="../assets/js/nav.js"></script>
```

- [ ] **Step 1: Edit `index.html`** — add `<script src="assets/js/nav.js"></script>` after the translations.js line

- [ ] **Step 2: Edit `about/index.html`** — add `<script src="../assets/js/nav.js"></script>` after the translations.js line

- [ ] **Step 3: Edit `calendar/index.html`** — add `<script src="../assets/js/nav.js"></script>` after the translations.js line

- [ ] **Step 4: Edit `shop/index.html`** — add `<script src="../assets/js/nav.js"></script>` after the translations.js line

- [ ] **Step 5: Quick smoke test**

Open `index.html` in a browser. Resize to 375px wide (DevTools → responsive mode). Verify:
- `☰` button appears to the right of the intro text
- Clicking `☰` drops the nav below with links stacked vertically
- Clicking `✕` closes it
- Clicking a nav link closes the nav and navigates

---

## Task 4: Add `nav.js` script tag to second-level pages

**Files:**
- Modify: `shop/funkloch-wanderkarte/index.html`
- Modify: `shop/rate-patriarchy/index.html`
- Modify: `shop/sendtomars/index.html`
- Modify: `shop/poisoning-reality-frame/index.html`
- Modify: `shop/datenschutz/index.html`
- Modify: `projects/billboard/index.html`
- Modify: `projects/funkloecher/index.html`
- Modify: `projects/happyclub/index.html`
- Modify: `projects/poisoningreality/index.html`
- Modify: `projects/poisoningreality/documentation.html`
- Modify: `projects/powerplay/index.html`
- Modify: `projects/sendtomars/index.html`

All 12 files are two levels deep. Find the existing `translations.js` line in each and add the nav.js tag after it:

```html
    <script src="../../assets/js/nav.js"></script>
```

(In `projects/powerplay/index.html` the translations script uses a slightly different path — check the actual line and match the depth.)

- [ ] **Step 1: Edit `shop/funkloch-wanderkarte/index.html`**
- [ ] **Step 2: Edit `shop/rate-patriarchy/index.html`**
- [ ] **Step 3: Edit `shop/sendtomars/index.html`**
- [ ] **Step 4: Edit `shop/poisoning-reality-frame/index.html`**
- [ ] **Step 5: Edit `shop/datenschutz/index.html`**
- [ ] **Step 6: Edit `projects/billboard/index.html`**
- [ ] **Step 7: Edit `projects/funkloecher/index.html`**
- [ ] **Step 8: Edit `projects/happyclub/index.html`**
- [ ] **Step 9: Edit `projects/poisoningreality/index.html`**
- [ ] **Step 10: Edit `projects/poisoningreality/documentation.html`**
- [ ] **Step 11: Edit `projects/powerplay/index.html`**
- [ ] **Step 12: Edit `projects/sendtomars/index.html`**

- [ ] **Step 13: Verify all 12 files have the tag**

```bash
grep -rl "nav.js" . --include="*.html" | grep -v ".git" | grep -v ".superpowers" | sort
```

Expected: 16 lines (4 from Task 3 + 12 from this task).

---

## Task 5: Full verification and commit

- [ ] **Step 1: Test at 375px (iPhone SE)**

Open each of these pages in a browser at 375px viewport width and confirm:
- `☰` appears next to intro/logo text in one row
- Nav links hidden by default
- Tap `☰` → nav drops below with stacked links
- Tap `✕` → nav closes
- Footer links each on own line, newsletter input + button wrap correctly

Pages to check: `index.html`, `about/`, `calendar/`, `shop/`, one project page (e.g. `projects/powerplay/`), one shop subpage (e.g. `shop/funkloch-wanderkarte/`)

- [ ] **Step 2: Test at 768px (boundary)**

At exactly 768px width: hamburger should be **gone**, nav should show inline as before. Check `index.html`.

- [ ] **Step 3: Test at 1024px (desktop)**

Everything looks identical to before this change. Nav is inline, no hamburger visible, footer is horizontal.

- [ ] **Step 4: Commit**

```bash
git add assets/js/nav.js assets/css/style.css \
  index.html about/index.html calendar/index.html \
  shop/index.html shop/funkloch-wanderkarte/index.html \
  shop/rate-patriarchy/index.html shop/sendtomars/index.html \
  shop/poisoning-reality-frame/index.html shop/datenschutz/index.html \
  projects/billboard/index.html projects/funkloecher/index.html \
  projects/happyclub/index.html projects/poisoningreality/index.html \
  projects/poisoningreality/documentation.html \
  projects/powerplay/index.html projects/sendtomars/index.html

git commit -m "Mobile optimization: hamburger nav, CSS layout fixes, footer reflow"
```
