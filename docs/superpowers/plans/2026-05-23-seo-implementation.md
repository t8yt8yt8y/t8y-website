# SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add full technical SEO (meta tags, Open Graph, Twitter Cards, JSON-LD schema, sitemap) across all 18 pages of t8y.ch with zero visual changes.

**Architecture:** All changes are confined to `<head>` sections of HTML files and `sitemap.xml`. No JS, CSS, or visible body content is touched. Each task covers one file or one closely related pair of files, followed by a commit.

**Tech Stack:** Static HTML, Schema.org JSON-LD, Open Graph protocol, Twitter Card meta tags, XML sitemap.

---

## Image URL reference (used throughout)

| Page | og:image absolute URL |
|---|---|
| Home, Calendar | `https://t8y.ch/assets/images/t8y_logo.png` |
| About | `https://t8y.ch/assets/images/teamphoto.jpeg` |
| Funklöcher | `https://t8y.ch/projects/funkloecher/Funkloch.png` |
| Power Play | `https://t8y.ch/projects/powerplay/Power%20Play.jpg` |
| Send To Mars (project) | `https://t8y.ch/projects/sendtomars/Send%20to%20Mars_Cap.jpeg` |
| Poisoning Reality | `https://t8y.ch/projects/poisoningreality/neopalpa%20trumpi.jpg` |
| Billboard | `https://t8y.ch/assets/images/billboard.jpg` |
| Happy Club | `https://t8y.ch/assets/images/happy_club.png` |
| Shop | `https://t8y.ch/assets/images/shop-handmade.png` |
| Funkloch map (shop) | `https://t8y.ch/shop/funkloch-wanderkarte/Funkloch-Wanderkarte%20Front.jpeg` |
| Poisoning Reality Frame | `https://t8y.ch/shop/poisoning-reality-frame/poisoning%20reality_framed_small.jpg` |
| Rate Patriarchy (shop) | `https://t8y.ch/shop/rate-patriarchy/patriarchy_plakat.JPG` |
| Send to Mars Cap (shop) | `https://t8y.ch/projects/sendtomars/Send%20to%20Mars_Cap.jpeg` |

---

## Task 1: `index.html` — fix og:image + add og:site_name, Twitter Cards, JSON-LD

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Fix relative og:image path and add og:site_name + Twitter Cards**

Replace the existing og:image line and add the missing tags. Find this block:

```html
    <meta property="og:image" content="assets/images/t8y_logo.png" />
```

Replace with:

```html
    <meta property="og:image" content="https://t8y.ch/assets/images/t8y_logo.png" />
    <meta property="og:site_name" content="t8y" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="t8y | Swiss Technology & AI Art Collective" />
    <meta name="twitter:description" content="t8y is a Swiss art collective exploring technology and AI through reflection, participation, and creative interventions." />
    <meta name="twitter:image" content="https://t8y.ch/assets/images/t8y_logo.png" />
```

- [ ] **Step 2: Add JSON-LD for Organization + WebSite**

Insert before `</head>`:

```html
    <script type="application/ld+json">
    [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "t8y",
        "url": "https://t8y.ch",
        "logo": "https://t8y.ch/assets/images/t8y_logo.png",
        "description": "Swiss art collective exploring technology and AI through participatory installations.",
        "founders": [
          { "@type": "Person", "name": "Nikki Böhler" },
          { "@type": "Person", "name": "Céline Nauer" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "t8y",
        "url": "https://t8y.ch"
      }
    ]
    </script>
```

- [ ] **Step 3: Verify**

Open `index.html` in a browser. View Source (Cmd+U). Confirm:
- `og:image` starts with `https://t8y.ch/`
- `twitter:card` tag is present
- `application/ld+json` script is present

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "SEO: fix og:image path, add Twitter Cards and JSON-LD to home page"
```

---

## Task 2: `about/index.html` — add all SEO meta tags + JSON-LD

**Files:**
- Modify: `about/index.html`

- [ ] **Step 1: Replace weak title and add all meta tags**

Find:
```html
    <title>About | t8y</title>
```

Replace with:
```html
    <title>About | t8y — Swiss Technology & AI Art Collective</title>
    <meta name="description" content="Meet t8y — Nikki Böhler and Céline Nauer, a Swiss artist duo questioning how digital technologies shape everyday life through interventions and art." />
    <meta name="keywords" content="t8y about, Nikki Böhler, Céline Nauer, Swiss artist duo, technology art, digital interventions, art collective Switzerland" />
    <meta name="author" content="t8y Collective" />
    <meta property="og:title" content="About | t8y — Swiss Technology & AI Art Collective" />
    <meta property="og:description" content="Meet t8y — Nikki Böhler and Céline Nauer, a Swiss artist duo questioning how digital technologies shape everyday life." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://t8y.ch/about/" />
    <meta property="og:image" content="https://t8y.ch/assets/images/teamphoto.jpeg" />
    <meta property="og:site_name" content="t8y" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="About | t8y — Swiss Technology & AI Art Collective" />
    <meta name="twitter:description" content="Meet t8y — Nikki Böhler and Céline Nauer, a Swiss artist duo questioning how digital technologies shape everyday life." />
    <meta name="twitter:image" content="https://t8y.ch/assets/images/teamphoto.jpeg" />
    <link rel="canonical" href="https://t8y.ch/about/" />
```

- [ ] **Step 2: Add JSON-LD for AboutPage**

Insert before `</head>`:

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About t8y",
      "url": "https://t8y.ch/about/",
      "description": "About t8y — Nikki Böhler and Céline Nauer, Swiss technology art collective.",
      "about": { "@type": "Organization", "name": "t8y", "url": "https://t8y.ch" }
    }
    </script>
```

- [ ] **Step 3: Verify**

View Source in browser. Confirm title, description, og:image, canonical, and JSON-LD are all present.

- [ ] **Step 4: Commit**

```bash
git add about/index.html
git commit -m "SEO: add full meta tags and JSON-LD to about page"
```

---

## Task 3: `calendar/index.html` — add all SEO meta tags + Event JSON-LD

**Files:**
- Modify: `calendar/index.html`

- [ ] **Step 1: Replace weak title and add all meta tags**

Find:
```html
    <title>Calendar | t8y</title>
```

Replace with:
```html
    <title>Calendar | t8y — Swiss Technology & AI Art Collective</title>
    <meta name="description" content="Upcoming exhibitions, events, and appearances by t8y, the Swiss technology and AI art collective. See where to experience t8y's work next." />
    <meta name="keywords" content="t8y events, t8y exhibitions, Swiss art collective calendar, technology art exhibitions, Zurich art events" />
    <meta name="author" content="t8y Collective" />
    <meta property="og:title" content="Calendar | t8y — Swiss Technology & AI Art Collective" />
    <meta property="og:description" content="Upcoming exhibitions and events by t8y, the Swiss technology and AI art collective." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://t8y.ch/calendar/" />
    <meta property="og:image" content="https://t8y.ch/assets/images/t8y_logo.png" />
    <meta property="og:site_name" content="t8y" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Calendar | t8y — Swiss Technology & AI Art Collective" />
    <meta name="twitter:description" content="Upcoming exhibitions and events by t8y, the Swiss technology and AI art collective." />
    <meta name="twitter:image" content="https://t8y.ch/assets/images/t8y_logo.png" />
    <link rel="canonical" href="https://t8y.ch/calendar/" />
```

- [ ] **Step 2: Add Event JSON-LD for 2026 events with known dates**

Insert before `</head>`:

```html
    <script type="application/ld+json">
    [
      {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Der Garten von Candide",
        "startDate": "2026-09-12",
        "endDate": "2026-09-27",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "Kulturort Höfli 7",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Schaffhausen",
            "addressCountry": "CH"
          }
        },
        "organizer": { "@type": "Organization", "name": "t8y", "url": "https://t8y.ch" },
        "url": "https://www.hoefli-7.ch/"
      },
      {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Kin Festival",
        "startDate": "2026-06-11",
        "endDate": "2026-06-27",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "Photobastei",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Zurich",
            "addressCountry": "CH"
          }
        },
        "organizer": { "@type": "Organization", "name": "t8y", "url": "https://t8y.ch" },
        "url": "https://kinshipfestival.ch/"
      }
    ]
    </script>
```

- [ ] **Step 3: Verify**

View Source. Confirm title, description, canonical, JSON-LD present with two Event objects.

- [ ] **Step 4: Commit**

```bash
git add calendar/index.html
git commit -m "SEO: add full meta tags and Event JSON-LD to calendar page"
```

---

## Task 4: `projects/funkloecher/index.html` — add all SEO meta tags + VisualArtwork JSON-LD

**Files:**
- Modify: `projects/funkloecher/index.html`

- [ ] **Step 1: Replace weak title and add all meta tags**

Find:
```html
  <title>Funklöcher</title>
```

Replace with:
```html
  <title>Funklöcher | t8y — Swiss Technology & AI Art Collective</title>
  <meta name="description" content="Funklöcher explores zones of digital silence in Switzerland — a t8y art installation mapping signal-free zones and the experience of disconnection." />
  <meta name="keywords" content="Funklöcher, digital silence, signal-free zones, Switzerland hiking, dead zones art, t8y collective, Swiss art installation" />
  <meta name="author" content="t8y Collective" />
  <meta property="og:title" content="Funklöcher | t8y — Swiss Technology & AI Art Collective" />
  <meta property="og:description" content="Funklöcher explores zones of digital silence in Switzerland — mapping signal-free zones and the experience of disconnection." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://t8y.ch/projects/funkloecher/" />
  <meta property="og:image" content="https://t8y.ch/projects/funkloecher/Funkloch.png" />
  <meta property="og:site_name" content="t8y" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Funklöcher | t8y — Swiss Technology & AI Art Collective" />
  <meta name="twitter:description" content="Funklöcher explores zones of digital silence in Switzerland — mapping signal-free zones and the experience of disconnection." />
  <meta name="twitter:image" content="https://t8y.ch/projects/funkloecher/Funkloch.png" />
  <link rel="canonical" href="https://t8y.ch/projects/funkloecher/" />
```

- [ ] **Step 2: Add VisualArtwork JSON-LD**

Insert before `</head>` (before the `<style>` block is fine, or at end of head before closing tag):

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": "Funklöcher",
    "description": "Funklöcher explores zones of digital silence in Switzerland, mapping signal-free zones and the experience of disconnection from constant connectivity.",
    "url": "https://t8y.ch/projects/funkloecher/",
    "image": "https://t8y.ch/projects/funkloecher/Funkloch.png",
    "creator": { "@type": "Organization", "name": "t8y", "url": "https://t8y.ch" }
  }
  </script>
```

- [ ] **Step 3: Verify**

View Source. Confirm title, description, og:image (absolute URL), canonical, JSON-LD present.

- [ ] **Step 4: Commit**

```bash
git add projects/funkloecher/index.html
git commit -m "SEO: add full meta tags and JSON-LD to Funklöcher project page"
```

---

## Task 5: `projects/powerplay/index.html` — fix wrong title + add all SEO meta tags + JSON-LD

**Files:**
- Modify: `projects/powerplay/index.html`

Note: This file currently has `<title>Send To Mars</title>` — a copy-paste error. Fix it.

- [ ] **Step 1: Fix wrong title and add all meta tags**

Find:
```html
  <title>Send To Mars</title>
```

Replace with:
```html
  <title>Power Play | t8y — Swiss Technology & AI Art Collective</title>
  <meta name="description" content="Power Play by t8y transforms untouchable Tech Bros into playable action figures — a participatory art installation critiquing Silicon Valley power." />
  <meta name="keywords" content="Power Play, tech bros, Zuckerberg Bezos Musk dolls, participatory art, Silicon Valley critique, Swiss art, t8y collective" />
  <meta name="author" content="t8y Collective" />
  <meta property="og:title" content="Power Play | t8y — Swiss Technology & AI Art Collective" />
  <meta property="og:description" content="Power Play transforms untouchable Tech Bros into playable action figures — a participatory installation critiquing Silicon Valley power." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://t8y.ch/projects/powerplay/" />
  <meta property="og:image" content="https://t8y.ch/projects/powerplay/Power%20Play.jpg" />
  <meta property="og:site_name" content="t8y" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Power Play | t8y — Swiss Technology & AI Art Collective" />
  <meta name="twitter:description" content="Power Play transforms untouchable Tech Bros into playable action figures — a participatory installation critiquing Silicon Valley power." />
  <meta name="twitter:image" content="https://t8y.ch/projects/powerplay/Power%20Play.jpg" />
  <link rel="canonical" href="https://t8y.ch/projects/powerplay/" />
```

- [ ] **Step 2: Add VisualArtwork JSON-LD**

Insert before `</head>`:

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": "Power Play",
    "description": "Power Play challenges the myth of the almighty Tech Bro by transforming Zuckerberg, Bezos, and Musk into Ken dolls inside a Barbie-style play environment. Visitors are invited to touch, restyle, and reimagine these miniature power figures.",
    "url": "https://t8y.ch/projects/powerplay/",
    "image": "https://t8y.ch/projects/powerplay/Power%20Play.jpg",
    "creator": { "@type": "Organization", "name": "t8y", "url": "https://t8y.ch" }
  }
  </script>
```

- [ ] **Step 3: Verify**

View Source. Confirm the title now reads "Power Play" (not "Send To Mars").

- [ ] **Step 4: Commit**

```bash
git add projects/powerplay/index.html
git commit -m "SEO: fix wrong title (was Send To Mars), add full meta tags and JSON-LD to Power Play page"
```

---

## Task 6: `projects/sendtomars/index.html` — add all SEO meta tags + JSON-LD

**Files:**
- Modify: `projects/sendtomars/index.html`

- [ ] **Step 1: Replace weak title and add all meta tags**

Find:
```html
  <title>Send To Mars</title>
```

Replace with:
```html
  <title>Send To Mars | t8y — Swiss Technology & AI Art Collective</title>
  <meta name="description" content="Send To Mars by t8y invites positive visions for the future — a participatory art project exploring escapism, hope, and collective imagination." />
  <meta name="keywords" content="Send To Mars, escapism, positive visions, participatory art, t8y collective, Swiss art, caps" />
  <meta name="author" content="t8y Collective" />
  <meta property="og:title" content="Send To Mars | t8y — Swiss Technology & AI Art Collective" />
  <meta property="og:description" content="Send To Mars invites positive visions for the future — a participatory art project exploring escapism, hope, and collective imagination." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://t8y.ch/projects/sendtomars/" />
  <meta property="og:image" content="https://t8y.ch/projects/sendtomars/Send%20to%20Mars_Cap.jpeg" />
  <meta property="og:site_name" content="t8y" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Send To Mars | t8y — Swiss Technology & AI Art Collective" />
  <meta name="twitter:description" content="Send To Mars invites positive visions for the future — a participatory art project exploring escapism, hope, and collective imagination." />
  <meta name="twitter:image" content="https://t8y.ch/projects/sendtomars/Send%20to%20Mars_Cap.jpeg" />
  <link rel="canonical" href="https://t8y.ch/projects/sendtomars/" />
```

- [ ] **Step 2: Add VisualArtwork JSON-LD**

Insert before `</head>`:

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": "Send To Mars",
    "description": "Send To Mars by t8y invites positive visions for the future through participatory art, exploring the tension between escapism, hope, and collective imagination.",
    "url": "https://t8y.ch/projects/sendtomars/",
    "image": "https://t8y.ch/projects/sendtomars/Send%20to%20Mars_Cap.jpeg",
    "creator": { "@type": "Organization", "name": "t8y", "url": "https://t8y.ch" }
  }
  </script>
```

- [ ] **Step 3: Verify**

View Source. Confirm title, description, og:image (absolute URL), canonical, JSON-LD present.

- [ ] **Step 4: Commit**

```bash
git add projects/sendtomars/index.html
git commit -m "SEO: add full meta tags and JSON-LD to Send To Mars project page"
```

---

## Task 7: `projects/poisoningreality/index.html` — fix og:image + add missing tags + JSON-LD

**Files:**
- Modify: `projects/poisoningreality/index.html`

Current issues: `og:image` is a relative path to a wrong image, missing `og:site_name`, missing Twitter Cards, likely missing canonical.

- [ ] **Step 1: Fix og:image**

Find:
```html
  <meta property="og:image" content="images/poisoning reality_framed_small.jpg" />
```

Replace with:
```html
  <meta property="og:image" content="https://t8y.ch/projects/poisoningreality/neopalpa%20trumpi.jpg" />
  <meta property="og:site_name" content="t8y" />
```

- [ ] **Step 2: Add Twitter Cards and canonical**

Insert directly after the og:site_name line just added:

```html
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Poisoning Reality | t8y Swiss Art Collective" />
  <meta name="twitter:description" content="Poisoning Reality by t8y uses the Neopalpa donaldtrumpi moth to expose AI data manipulation, blurring the line between digital fiction and reality." />
  <meta name="twitter:image" content="https://t8y.ch/projects/poisoningreality/neopalpa%20trumpi.jpg" />
  <link rel="canonical" href="https://t8y.ch/projects/poisoningreality/" />
```

- [ ] **Step 3: Add VisualArtwork JSON-LD**

Insert before `</head>` (before `<style>` or at end of head):

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": "Poisoning Reality",
    "description": "Poisoning Reality reimagines the Neopalpa donaldtrumpi moth to challenge AI perceptions and expose how easily data manipulation can blur the line between fiction and reality.",
    "url": "https://t8y.ch/projects/poisoningreality/",
    "image": "https://t8y.ch/projects/poisoningreality/neopalpa%20trumpi.jpg",
    "creator": { "@type": "Organization", "name": "t8y", "url": "https://t8y.ch" }
  }
  </script>
```

- [ ] **Step 4: Verify**

View Source. Confirm `og:image` is now an absolute `https://t8y.ch/` URL using the moth image, and that Twitter Cards and JSON-LD are present.

- [ ] **Step 5: Commit**

```bash
git add projects/poisoningreality/index.html
git commit -m "SEO: fix og:image, add Twitter Cards and JSON-LD to Poisoning Reality page"
```

---

## Task 8: `projects/billboard/index.html` — fix lang, fix broken og:image + add missing tags + JSON-LD

**Files:**
- Modify: `projects/billboard/index.html`

Current issues: `lang="de"` (wrong), `og:image` is `billboard-image.jpg` (file does not exist in the project folder — use `assets/images/billboard.jpg` instead), missing `og:site_name`, missing Twitter Cards, missing canonical.

- [ ] **Step 1: Fix lang attribute**

Find:
```html
<html lang="de">
```

Replace with:
```html
<html lang="en">
```

- [ ] **Step 2: Fix broken og:image and add missing OG tags**

Find:
```html
<meta property="og:image" content="billboard-image.jpg" />
```

Replace with:
```html
<meta property="og:image" content="https://t8y.ch/assets/images/billboard.jpg" />
<meta property="og:site_name" content="t8y" />
```

- [ ] **Step 3: Add Twitter Cards and canonical**

Insert after the og:site_name line:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Billboard | Patriarchy Rating Project by t8y" />
<meta name="twitter:description" content="Rate Patriarchy is a participatory billboard project by t8y applying online rating systems to patriarchal structures in public space." />
<meta name="twitter:image" content="https://t8y.ch/assets/images/billboard.jpg" />
<link rel="canonical" href="https://t8y.ch/projects/billboard/" />
```

- [ ] **Step 4: Add VisualArtwork JSON-LD**

Insert before `</head>` (before any `<style>` block):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VisualArtwork",
  "name": "Rate Patriarchy (Billboard)",
  "description": "A participatory billboard project applying online rating systems to patriarchal structures, inviting reflection on power dynamics in digital platforms.",
  "url": "https://t8y.ch/projects/billboard/",
  "image": "https://t8y.ch/assets/images/billboard.jpg",
  "creator": { "@type": "Organization", "name": "t8y", "url": "https://t8y.ch" }
}
</script>
```

- [ ] **Step 5: Verify**

View Source. Confirm `<html lang="en">`, og:image is absolute, Twitter Cards present, JSON-LD present.

- [ ] **Step 6: Commit**

```bash
git add projects/billboard/index.html
git commit -m "SEO: fix lang attribute, fix broken og:image, add Twitter Cards and JSON-LD to Billboard page"
```

---

## Task 9: `projects/happyclub/index.html` — fix og:image + add og:site_name, Twitter Cards, JSON-LD

**Files:**
- Modify: `projects/happyclub/index.html`

Current issues: `og:image` is `Smiley_Happy.png` (relative), missing `og:site_name`, missing Twitter Cards.

- [ ] **Step 1: Fix og:image and add og:site_name**

Find:
```html
<meta property="og:image" content="Smiley_Happy.png" />
```

Replace with:
```html
<meta property="og:image" content="https://t8y.ch/assets/images/happy_club.png" />
<meta property="og:site_name" content="t8y" />
```

- [ ] **Step 2: Add Twitter Cards**

Insert after og:site_name:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Happy Club | Interactive AI Installation by t8y" />
<meta name="twitter:description" content="Happy Club by t8y is an interactive AI art installation using facial recognition to explore forced positivity and emotional surveillance in digital spaces." />
<meta name="twitter:image" content="https://t8y.ch/assets/images/happy_club.png" />
```

- [ ] **Step 3: Add VisualArtwork JSON-LD**

Insert before `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VisualArtwork",
  "name": "Happy Club",
  "description": "Happy Club is an interactive AI art installation by t8y that uses facial recognition to explore forced positivity and digital emotional surveillance.",
  "url": "https://t8y.ch/projects/happyclub/",
  "image": "https://t8y.ch/assets/images/happy_club.png",
  "creator": { "@type": "Organization", "name": "t8y", "url": "https://t8y.ch" }
}
</script>
```

- [ ] **Step 4: Verify**

View Source. Confirm og:image is absolute, Twitter Cards present, JSON-LD present.

- [ ] **Step 5: Commit**

```bash
git add projects/happyclub/index.html
git commit -m "SEO: fix og:image, add Twitter Cards and JSON-LD to Happy Club page"
```

---

## Task 10: Poisoning Reality sub-pages — `documentation.html` + `instructions.html`

**Files:**
- Modify: `projects/poisoningreality/documentation.html`
- Modify: `projects/poisoningreality/instructions.html`

### documentation.html

Has a title and description already. Missing: keywords, author, OG tags, Twitter Cards.

- [ ] **Step 1: Add missing meta tags to documentation.html**

Find:
```html
  <meta name="description" content="Documentation for Poisoning Reality – t8y's project on data poisoning, AI training datasets, and collective intervention." />
```

Insert after that line:

```html
  <meta name="keywords" content="data poisoning log, AI training data, collective intervention, t8y poisoning reality, data manipulation documentation" />
  <meta name="author" content="t8y Collective" />
  <meta property="og:title" content="DATA POISONING LOG | Poisoning Reality | t8y" />
  <meta property="og:description" content="Documentation log for t8y's Poisoning Reality — tracking data poisoning experiments on AI training datasets." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://t8y.ch/projects/poisoningreality/documentation.html" />
  <meta property="og:image" content="https://t8y.ch/projects/poisoningreality/neopalpa%20trumpi.jpg" />
  <meta property="og:site_name" content="t8y" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="DATA POISONING LOG | Poisoning Reality | t8y" />
  <meta name="twitter:description" content="Documentation log for t8y's Poisoning Reality — tracking data poisoning experiments on AI training datasets." />
  <meta name="twitter:image" content="https://t8y.ch/projects/poisoningreality/neopalpa%20trumpi.jpg" />
```

### instructions.html

Has only a weak title "Poisoning Instructions". Missing everything.

- [ ] **Step 2: Fix title and add all meta tags to instructions.html**

Find:
```html
  <title>Poisoning Instructions</title>
```

Replace with:
```html
  <title>Poisoning Instructions | Poisoning Reality | t8y</title>
  <meta name="description" content="Instructions for participating in Poisoning Reality — t8y's collective data poisoning project targeting AI training datasets." />
  <meta name="keywords" content="data poisoning instructions, AI manipulation, collective intervention, t8y, poisoning reality" />
  <meta name="author" content="t8y Collective" />
  <meta property="og:title" content="Poisoning Instructions | Poisoning Reality | t8y" />
  <meta property="og:description" content="Instructions for participating in Poisoning Reality — t8y's collective data poisoning project targeting AI training datasets." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://t8y.ch/projects/poisoningreality/instructions.html" />
  <meta property="og:image" content="https://t8y.ch/projects/poisoningreality/neopalpa%20trumpi.jpg" />
  <meta property="og:site_name" content="t8y" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Poisoning Instructions | Poisoning Reality | t8y" />
  <meta name="twitter:description" content="Instructions for participating in Poisoning Reality — t8y's collective data poisoning project targeting AI training datasets." />
  <meta name="twitter:image" content="https://t8y.ch/projects/poisoningreality/neopalpa%20trumpi.jpg" />
  <link rel="canonical" href="https://t8y.ch/projects/poisoningreality/instructions.html" />
```

- [ ] **Step 3: Verify both files**

View Source on each. Confirm OG tags and Twitter Cards are present.

- [ ] **Step 4: Commit**

```bash
git add projects/poisoningreality/documentation.html projects/poisoningreality/instructions.html
git commit -m "SEO: add meta tags and Twitter Cards to Poisoning Reality sub-pages"
```

---

## Task 11: `shop/index.html` — improve description + add canonical, og:site_name, Twitter Cards, ItemList JSON-LD

**Files:**
- Modify: `shop/index.html`

Current issues: weak description, relative og:image, missing og:site_name, missing Twitter Cards, missing canonical.

- [ ] **Step 1: Update description and fix og:image**

Find:
```html
<meta name="description" content="Shop for t8y art collective merchandise and products." />
```

Replace with:
```html
<meta name="description" content="Shop t8y merchandise — hiking maps, art prints, and objects from the Swiss technology art collective by Nikki Böhler and Céline Nauer." />
```

Find:
```html
<meta property="og:image" content="assets/images/t8y_logo.png" />
```

Replace with:
```html
<meta property="og:image" content="https://t8y.ch/assets/images/shop-handmade.png" />
<meta property="og:site_name" content="t8y" />
```

- [ ] **Step 2: Add Twitter Cards and canonical**

Insert after og:site_name:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Shop | t8y Collective" />
<meta name="twitter:description" content="Shop t8y merchandise — hiking maps, art prints, and objects from the Swiss technology art collective." />
<meta name="twitter:image" content="https://t8y.ch/assets/images/shop-handmade.png" />
<link rel="canonical" href="https://t8y.ch/shop/" />
```

Also update the og:description to match:

Find:
```html
<meta property="og:description" content="Shop for t8y art collective merchandise and products." />
```

Replace with:
```html
<meta property="og:description" content="Shop t8y merchandise — hiking maps, art prints, and objects from the Swiss technology art collective." />
```

- [ ] **Step 3: Add ItemList JSON-LD**

Insert before `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "t8y Shop",
  "url": "https://t8y.ch/shop/",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "url": "https://t8y.ch/shop/funkloch-wanderkarte/" },
    { "@type": "ListItem", "position": 2, "url": "https://t8y.ch/shop/poisoning-reality-frame/" },
    { "@type": "ListItem", "position": 3, "url": "https://t8y.ch/shop/rate-patriarchy/" },
    { "@type": "ListItem", "position": 4, "url": "https://t8y.ch/shop/sendtomars/" }
  ]
}
</script>
```

- [ ] **Step 4: Verify**

View Source. Confirm canonical, og:image is absolute, Twitter Cards, JSON-LD present.

- [ ] **Step 5: Commit**

```bash
git add shop/index.html
git commit -m "SEO: improve description, fix og:image, add Twitter Cards and ItemList JSON-LD to shop"
```

---

## Task 12: `shop/funkloch-wanderkarte/index.html` — add OG tags, Twitter Cards, Product JSON-LD

**Files:**
- Modify: `shop/funkloch-wanderkarte/index.html`

Current: has basic meta tags and canonical but missing OG tags and Twitter Cards entirely.

- [ ] **Step 1: Add OG tags and Twitter Cards**

Find:
```html
  <link rel="canonical" href="https://t8y.ch/shop/funkloch-wanderkarte/" />
```

Insert before that line:

```html
  <meta property="og:title" content="Funkloch-Wanderkarte | t8y Shop" />
  <meta property="og:description" content="A hiking map to explore Switzerland's most beautiful signal-free zones. Curated dead-zone routes for digital detox and mindful hiking. CHF 12.90." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://t8y.ch/shop/funkloch-wanderkarte/" />
  <meta property="og:image" content="https://t8y.ch/shop/funkloch-wanderkarte/Funkloch-Wanderkarte%20Front.jpeg" />
  <meta property="og:site_name" content="t8y" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Funkloch-Wanderkarte | t8y Shop" />
  <meta name="twitter:description" content="A hiking map to explore Switzerland's signal-free zones. CHF 12.90." />
  <meta name="twitter:image" content="https://t8y.ch/shop/funkloch-wanderkarte/Funkloch-Wanderkarte%20Front.jpeg" />
```

- [ ] **Step 2: Add Product JSON-LD**

Insert before `</head>`:

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Funkloch-Wanderkarte",
    "description": "A hiking map to explore Switzerland's most beautiful signal-free zones. Curated dead-zone routes for digital detox and mindful hiking.",
    "image": "https://t8y.ch/shop/funkloch-wanderkarte/Funkloch-Wanderkarte%20Front.jpeg",
    "brand": { "@type": "Brand", "name": "t8y" },
    "url": "https://t8y.ch/shop/funkloch-wanderkarte/",
    "offers": {
      "@type": "Offer",
      "price": "12.90",
      "priceCurrency": "CHF",
      "availability": "https://schema.org/InStock",
      "url": "https://t8y.ch/shop/funkloch-wanderkarte/"
    }
  }
  </script>
```

- [ ] **Step 3: Verify**

View Source. Confirm OG, Twitter Cards, Product JSON-LD with price 12.90 CHF.

- [ ] **Step 4: Commit**

```bash
git add shop/funkloch-wanderkarte/index.html
git commit -m "SEO: add OG tags, Twitter Cards and Product JSON-LD to Funkloch-Wanderkarte shop page"
```

---

## Task 13: `shop/hiking-map/index.html` — add noindex (redirect page)

**Files:**
- Modify: `shop/hiking-map/index.html`

This page is a pure meta-refresh redirect to `funkloch-wanderkarte/`. The canonical already points to the real page. Add `noindex` so Google does not index this redirect.

- [ ] **Step 1: Add noindex**

Find:
```html
  <link rel="canonical" href="https://t8y.ch/shop/funkloch-wanderkarte/">
```

Insert before that line:

```html
  <meta name="robots" content="noindex, follow" />
```

- [ ] **Step 2: Commit**

```bash
git add shop/hiking-map/index.html
git commit -m "SEO: add noindex to hiking-map redirect page"
```

---

## Task 14: `shop/poisoning-reality-frame/index.html` — add all SEO meta tags + Product JSON-LD

**Files:**
- Modify: `shop/poisoning-reality-frame/index.html`

Currently has only a title, no meta tags at all.

- [ ] **Step 1: Add all meta tags**

Find:
```html
  <title>Poisoning Reality Frame | t8y Shop</title>
```

Replace with:
```html
  <title>Poisoning Reality Frame | t8y Shop</title>
  <meta name="description" content="A framed neopalpa donaldtrumpi moth — each frame is unique, CHF 300, pickup Zurich. Every purchase funds one more hour of AI data poisoning by t8y." />
  <meta name="keywords" content="poisoning reality frame, neopalpa donaldtrumpi, framed moth art, data poisoning art, t8y shop, Swiss art" />
  <meta name="author" content="t8y Collective" />
  <meta property="og:title" content="Poisoning Reality Frame | t8y Shop" />
  <meta property="og:description" content="A framed neopalpa donaldtrumpi moth — each frame unique, CHF 300, pickup Zurich. Every purchase funds one more hour of AI data poisoning." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://t8y.ch/shop/poisoning-reality-frame/" />
  <meta property="og:image" content="https://t8y.ch/shop/poisoning-reality-frame/poisoning%20reality_framed_small.jpg" />
  <meta property="og:site_name" content="t8y" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Poisoning Reality Frame | t8y Shop" />
  <meta name="twitter:description" content="A framed neopalpa donaldtrumpi moth — each frame unique, CHF 300, pickup Zurich." />
  <meta name="twitter:image" content="https://t8y.ch/shop/poisoning-reality-frame/poisoning%20reality_framed_small.jpg" />
  <link rel="canonical" href="https://t8y.ch/shop/poisoning-reality-frame/" />
```

- [ ] **Step 2: Add Product JSON-LD**

Insert before `</head>`:

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Poisoning Reality Frame",
    "description": "A unique framed neopalpa donaldtrumpi moth. Every frame sold funds one more hour of AI data poisoning by t8y.",
    "image": "https://t8y.ch/shop/poisoning-reality-frame/poisoning%20reality_framed_small.jpg",
    "brand": { "@type": "Brand", "name": "t8y" },
    "url": "https://t8y.ch/shop/poisoning-reality-frame/",
    "offers": {
      "@type": "Offer",
      "price": "300.00",
      "priceCurrency": "CHF",
      "availability": "https://schema.org/InStock",
      "url": "https://t8y.ch/shop/poisoning-reality-frame/"
    }
  }
  </script>
```

- [ ] **Step 3: Verify**

View Source. Confirm all meta tags and JSON-LD present.

- [ ] **Step 4: Commit**

```bash
git add shop/poisoning-reality-frame/index.html
git commit -m "SEO: add full meta tags and Product JSON-LD to Poisoning Reality Frame shop page"
```

---

## Task 15: `shop/rate-patriarchy/index.html` — add all SEO meta tags + Product JSON-LD

**Files:**
- Modify: `shop/rate-patriarchy/index.html`

Currently has only a title, no meta tags.

- [ ] **Step 1: Add all meta tags**

Find:
```html
  <title>Rating Patriarchy at Home | t8y Shop</title>
```

Replace with:
```html
  <title>Rating Patriarchy at Home | t8y Shop</title>
  <meta name="description" content="Rate Patriarchy at home — an A2 poster and 5 rating cards (edition of 50). CHF 60–70 depending on your relationship to patriarchy." />
  <meta name="keywords" content="rate patriarchy, feminist art, rating cards, t8y shop, Swiss art, participatory art, A2 poster" />
  <meta name="author" content="t8y Collective" />
  <meta property="og:title" content="Rating Patriarchy at Home | t8y Shop" />
  <meta property="og:description" content="Rate Patriarchy at home — an A2 poster and 5 rating cards. CHF 60–70 depending on your relationship to patriarchy." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://t8y.ch/shop/rate-patriarchy/" />
  <meta property="og:image" content="https://t8y.ch/shop/rate-patriarchy/patriarchy_plakat.JPG" />
  <meta property="og:site_name" content="t8y" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Rating Patriarchy at Home | t8y Shop" />
  <meta name="twitter:description" content="Rate Patriarchy at home — A2 poster and 5 rating cards. CHF 60–70." />
  <meta name="twitter:image" content="https://t8y.ch/shop/rate-patriarchy/patriarchy_plakat.JPG" />
  <link rel="canonical" href="https://t8y.ch/shop/rate-patriarchy/" />
```

- [ ] **Step 2: Add Product JSON-LD**

Insert before `</head>` (before the `<style>` block):

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Rating Patriarchy at Home",
    "description": "A set with an A2 poster and 5 rating cards, edition of 50. Sliding scale pricing: CHF 60 for those who suffer under patriarchy, CHF 70 for those who benefit.",
    "image": "https://t8y.ch/shop/rate-patriarchy/patriarchy_plakat.JPG",
    "brand": { "@type": "Brand", "name": "t8y" },
    "url": "https://t8y.ch/shop/rate-patriarchy/",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "60.00",
      "highPrice": "70.00",
      "priceCurrency": "CHF",
      "availability": "https://schema.org/InStock",
      "url": "https://t8y.ch/shop/rate-patriarchy/"
    }
  }
  </script>
```

- [ ] **Step 3: Verify**

View Source. Confirm all meta tags and JSON-LD with AggregateOffer present.

- [ ] **Step 4: Commit**

```bash
git add shop/rate-patriarchy/index.html
git commit -m "SEO: add full meta tags and Product JSON-LD to Rate Patriarchy shop page"
```

---

## Task 16: `shop/sendtomars/index.html` — add OG tags, Twitter Cards, Product JSON-LD

**Files:**
- Modify: `shop/sendtomars/index.html`

Currently has: title, description, author, canonical. Missing: keywords, OG tags, Twitter Cards, JSON-LD.

- [ ] **Step 1: Add keywords and OG tags**

Find:
```html
  <meta name="author" content="t8y Collective" />
```

Insert after that line:

```html
  <meta name="keywords" content="Send to Mars cap, t8y shop, Swiss art merchandise, positive visions, escapism cap" />
  <meta property="og:title" content="Send to Mars Cap | t8y Shop" />
  <meta property="og:description" content="Send to Mars Cap — signed, CHF 40 pickup Zurich, CHF 50 with shipping in Switzerland." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://t8y.ch/shop/sendtomars/" />
  <meta property="og:image" content="https://t8y.ch/projects/sendtomars/Send%20to%20Mars_Cap.jpeg" />
  <meta property="og:site_name" content="t8y" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Send to Mars Cap | t8y Shop" />
  <meta name="twitter:description" content="Send to Mars Cap — signed, CHF 40 pickup Zurich." />
  <meta name="twitter:image" content="https://t8y.ch/projects/sendtomars/Send%20to%20Mars_Cap.jpeg" />
```

- [ ] **Step 2: Add Product JSON-LD**

Insert before `</head>`:

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Send to Mars Cap",
    "description": "Signed cap by t8y. CHF 40 with pickup at Wiedikon station Zurich, CHF 50 with shipping in Switzerland.",
    "image": "https://t8y.ch/projects/sendtomars/Send%20to%20Mars_Cap.jpeg",
    "brand": { "@type": "Brand", "name": "t8y" },
    "url": "https://t8y.ch/shop/sendtomars/",
    "offers": {
      "@type": "Offer",
      "price": "40.00",
      "priceCurrency": "CHF",
      "availability": "https://schema.org/InStock",
      "url": "https://t8y.ch/shop/sendtomars/"
    }
  }
  </script>
```

- [ ] **Step 3: Verify**

View Source. Confirm OG tags, Twitter Cards, JSON-LD with price CHF 40 present.

- [ ] **Step 4: Commit**

```bash
git add shop/sendtomars/index.html
git commit -m "SEO: add OG tags, Twitter Cards and Product JSON-LD to Send to Mars Cap shop page"
```

---

## Task 17: `shop/terms/index.html` — fix lang + add noindex

**Files:**
- Modify: `shop/terms/index.html`

Currently has `lang="de"` (page is in German — keep it, just noting for accuracy). Add noindex since terms pages should not appear in search results.

- [ ] **Step 1: Add noindex**

Find:
```html
  <link rel="canonical" href="https://t8y.ch/shop/terms/">
```

Insert before that line:

```html
  <meta name="robots" content="noindex, follow" />
```

- [ ] **Step 2: Commit**

```bash
git add shop/terms/index.html
git commit -m "SEO: add noindex to terms page"
```

---

## Task 18: Rebuild `sitemap.xml`

**Files:**
- Modify: `sitemap.xml`

Replace the entire file content. The current sitemap has 6 stale URLs (all 2024-04-10) and references a nonexistent page (`/projects/poisoningdata/`).

- [ ] **Step 1: Replace sitemap.xml entirely**

Replace the full contents of `sitemap.xml` with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://t8y.ch/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://t8y.ch/about/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://t8y.ch/calendar/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://t8y.ch/projects/powerplay/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://t8y.ch/projects/funkloecher/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://t8y.ch/projects/poisoningreality/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://t8y.ch/projects/poisoningreality/documentation.html</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://t8y.ch/projects/poisoningreality/instructions.html</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://t8y.ch/projects/billboard/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://t8y.ch/projects/sendtomars/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://t8y.ch/projects/happyclub/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://t8y.ch/shop/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://t8y.ch/shop/funkloch-wanderkarte/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://t8y.ch/shop/poisoning-reality-frame/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://t8y.ch/shop/rate-patriarchy/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://t8y.ch/shop/sendtomars/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

Note: `shop/hiking-map/` (redirect) and `shop/terms/` (noindex) are intentionally excluded from the sitemap.

- [ ] **Step 2: Verify**

Open `sitemap.xml`. Confirm 16 URLs present, no reference to `poisoningdata`, all dates are `2026-05-23`.

- [ ] **Step 3: Commit**

```bash
git add sitemap.xml
git commit -m "SEO: rebuild sitemap with all 16 indexable pages, remove stale/nonexistent URLs"
```
