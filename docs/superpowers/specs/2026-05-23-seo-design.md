# SEO Design — t8y.ch

**Date:** 2026-05-23  
**Scope:** Full technical SEO across all 18 pages  
**Constraint:** Zero visual or visible changes — all edits are in `<head>` and `sitemap.xml` only

---

## Goals

- Improve discoverability for both English and German/Swiss audiences
- Cover all discovery intents: art projects, exhibitions/events, shop products
- Fix all existing technical SEO gaps without changing any visible content or styling

---

## Section 1 — Titles, Meta Descriptions, Canonical URLs

### Title format (all pages)
```
[Page Title] | t8y — Swiss Technology & AI Art Collective
```

### Pages needing new or corrected tags

| Page | Issue | Fix |
|---|---|---|
| `index.html` | Already good | Minor canonical fix if needed |
| `about/index.html` | No meta tags at all | Add description, keywords, OG, canonical |
| `calendar/index.html` | No meta tags at all | Add description, keywords, OG, canonical |
| `projects/funkloecher/index.html` | No meta tags | Add full set |
| `projects/powerplay/index.html` | Title says "Send To Mars" (wrong) | Fix title, add full meta tags |
| `projects/sendtomars/index.html` | No meta tags | Add full set |
| `projects/happyclub/index.html` | Has meta tags + canonical, but `og:image` is relative | Fix og:image, add Twitter Cards + JSON-LD |
| `projects/billboard/index.html` | Has tags, `lang="de"` wrong | Fix lang attribute |
| `projects/poisoningreality/index.html` | Already good | Verify canonical, OG image absolute |
| `shop/index.html` | Weak description | Improve description + canonical |
| `shop/funkloch-wanderkarte/index.html` | Unknown | Add full set |
| `shop/hiking-map/index.html` | Unknown | Add full set |
| `shop/poisoning-reality-frame/index.html` | Unknown | Add full set |
| `shop/rate-patriarchy/index.html` | Unknown | Add full set |
| `shop/sendtomars/index.html` | Unknown | Add full set |
| `shop/terms/index.html` | Unknown | Add noindex + canonical |

### Meta descriptions per page (150–160 chars, keyword-rich, natural)

- **Home**: "t8y is a Swiss art collective by Nikki Böhler and Céline Nauer exploring technology and AI through participatory installations and creative interventions."
- **About**: "Meet t8y — Nikki Böhler and Céline Nauer, a Swiss artist duo questioning how digital technologies shape everyday life through interventions and art."
- **Calendar**: "Upcoming exhibitions, events, and appearances by t8y, the Swiss technology and AI art collective. See where to experience t8y's work next."
- **Funklöcher**: "Funklöcher explores zones of digital silence in Switzerland — a t8y art installation mapping signal-free zones and the experience of disconnection."
- **Power Play**: "Power Play by t8y transforms untouchable Tech Bros into playable action figures — a participatory art installation critiquing Silicon Valley power."
- **Poisoning Reality**: "Poisoning Reality by t8y uses the Neopalpa donaldtrumpi moth to expose AI data manipulation, blurring the line between digital fiction and reality."
- **Billboard / Rate Patriarchy**: "Rate Patriarchy is a participatory billboard project by t8y applying online rating systems to patriarchal structures in public space."
- **Send To Mars**: "Send To Mars by t8y invites positive visions for the future — a participatory art project exploring escapism, hope, and collective imagination."
- **Happy Club**: "Happy Club by t8y is an interactive AI art installation using facial recognition to explore forced positivity and emotional surveillance in digital spaces."
- **Shop**: "Shop t8y merchandise — hiking maps, art prints, and objects from the Swiss technology art collective by Nikki Böhler and Céline Nauer."
- **Shop product pages**: Each gets a product-specific description
- **Terms**: Noindex (terms/legal pages should not appear in search results)

### Canonical URL format
All canonical URLs use the pattern: `https://t8y.ch/[path]/`

---

## Section 2 — Open Graph + Twitter Cards

All pages get a complete set. Currently many pages have none, or broken relative image paths.

### Open Graph tags (all pages)
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://t8y.ch/[path]/" />
<meta property="og:image" content="https://t8y.ch/assets/images/..." />
<meta property="og:site_name" content="t8y" />
```

### Twitter Card tags (all pages)
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://t8y.ch/assets/images/..." />
```

### OG image strategy
- **Home, About, Calendar**: use `https://t8y.ch/assets/images/t8y_logo.png`
- **Each project**: use the project's main image (absolute URL)
- **Shop pages**: use the product image (absolute URL)
- **Fix**: `index.html` and `shop/index.html` currently use relative paths — change to absolute

### `og:type` values
- All pages: `website`

Note: `og:type: "product"` requires Facebook Product Catalog setup which t8y does not have. Shop pages use `website` for OG, with `Product` schema communicated via JSON-LD instead.

---

## Section 3 — JSON-LD Structured Data (Schema.org)

Invisible `<script type="application/ld+json">` blocks in `<head>`. No visual change.

### `index.html` — Organization + WebSite
```json
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
  ],
}
```
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "t8y",
  "url": "https://t8y.ch"
}
```

### `about/index.html` — AboutPage
```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About t8y",
  "url": "https://t8y.ch/about/",
  "description": "About t8y — Nikki Böhler and Céline Nauer",
  "about": { "@type": "Organization", "name": "t8y", "url": "https://t8y.ch" }
}
```

### Project pages — VisualArtwork
Each project page gets:
```json
{
  "@context": "https://schema.org",
  "@type": "VisualArtwork",
  "name": "[Project name]",
  "description": "[Project description]",
  "url": "https://t8y.ch/projects/[slug]/",
  "image": "https://t8y.ch/projects/[slug]/[image]",
  "creator": {
    "@type": "Organization",
    "name": "t8y",
    "url": "https://t8y.ch"
  }
}
```

Projects: Funklöcher, Power Play, Poisoning Reality, Rate Patriarchy (Billboard), Send To Mars, Happy Club

### `shop/index.html` — ItemList
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "t8y Shop",
  "url": "https://t8y.ch/shop/",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "url": "https://t8y.ch/shop/funkloch-wanderkarte/" },
    ...
  ]
}
```

### Shop product pages — Product

Note: Google requires an `offers` block with pricing to show rich shopping results. The shop uses Stripe buy buttons, so prices are available — include them. Without `offers`, the schema is still valid for entity understanding but won't trigger product rich snippets.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Product name]",
  "description": "[Product description]",
  "image": "https://t8y.ch/...",
  "brand": { "@type": "Brand", "name": "t8y" },
  "url": "https://t8y.ch/shop/[slug]/",
  "offers": {
    "@type": "Offer",
    "price": "[price]",
    "priceCurrency": "CHF",
    "availability": "https://schema.org/InStock",
    "url": "https://t8y.ch/shop/[slug]/"
  }
}
```

Prices must be read from each shop product page during implementation.

### `calendar/index.html` — Event (multiple)

The calendar page contains real structured event data (names, date ranges, venues, cities) — use `Event` schema, which unlocks Google's event rich results. One JSON-LD block per event with a known date. Events without specific dates are omitted from schema (Google requires `startDate` for rich results).

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Der Garten von Candide",
    "startDate": "2026-09-12",
    "endDate": "2026-09-27",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": { "@type": "Place", "name": "Kulturort Höfli 7", "address": { "@type": "PostalAddress", "addressLocality": "Schaffhausen", "addressCountry": "CH" } },
    "organizer": { "@type": "Organization", "name": "t8y", "url": "https://t8y.ch" }
  },
  {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Kin Festival",
    "startDate": "2026-06-11",
    "endDate": "2026-06-27",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": { "@type": "Place", "name": "Photobastei", "address": { "@type": "PostalAddress", "addressLocality": "Zurich", "addressCountry": "CH" } },
    "organizer": { "@type": "Organization", "name": "t8y", "url": "https://t8y.ch" }
  }
]
```

Past events (2025, 2024) are included in the schema with `eventStatus: EventPostponed` if rescheduled, otherwise omit if dates are unknown.

---

## Section 4 — Sitemap Rebuild + Technical Fixes

### Sitemap rebuild (`sitemap.xml`)
Current sitemap: 6 URLs, all dated 2024-04-10, references a nonexistent page (`/projects/poisoningdata/`).

New sitemap includes all 18 real pages with accurate dates and priorities:

| URL | Priority | changefreq |
|---|---|---|
| `https://t8y.ch/` | 1.0 | monthly |
| `https://t8y.ch/about/` | 0.8 | yearly |
| `https://t8y.ch/calendar/` | 0.9 | weekly |
| `https://t8y.ch/projects/powerplay/` | 0.9 | yearly |
| `https://t8y.ch/projects/funkloecher/` | 0.9 | yearly |
| `https://t8y.ch/projects/poisoningreality/` | 0.9 | yearly |
| `https://t8y.ch/projects/billboard/` | 0.9 | yearly |
| `https://t8y.ch/projects/sendtomars/` | 0.9 | yearly |
| `https://t8y.ch/projects/happyclub/` | 0.9 | yearly |
| `https://t8y.ch/projects/poisoningreality/documentation.html` | 0.6 | yearly |
| `https://t8y.ch/projects/poisoningreality/instructions.html` | 0.6 | yearly |
| `https://t8y.ch/shop/` | 0.8 | monthly |
| `https://t8y.ch/shop/funkloch-wanderkarte/` | 0.7 | monthly |
| `https://t8y.ch/shop/hiking-map/` | 0.7 | monthly |
| `https://t8y.ch/shop/poisoning-reality-frame/` | 0.7 | monthly |
| `https://t8y.ch/shop/rate-patriarchy/` | 0.7 | monthly |
| `https://t8y.ch/shop/sendtomars/` | 0.7 | monthly |
| `https://t8y.ch/shop/terms/` | 0.3 | yearly |

### Other technical fixes

| File | Fix |
|---|---|
| `projects/powerplay/index.html` | Change `<title>Send To Mars</title>` → `Power Play \| t8y — Swiss Technology & AI Art Collective` |
| `projects/billboard/index.html` | Change `<html lang="de">` → `<html lang="en">` |
| All pages with relative `og:image` paths | Make absolute: `https://t8y.ch/...` |
| `about/`, `calendar/` | Add `<meta name="author" content="t8y Collective">` |

### Hreflang — excluded
The site uses JavaScript (translations.js) to switch between EN/ZH/DE on the same URLs. Hreflang requires distinct URLs per language. Adding hreflang here would be incorrect and is excluded.

---

## Files to change

- `index.html`
- `about/index.html`
- `calendar/index.html`
- `projects/powerplay/index.html`
- `projects/funkloecher/index.html`
- `projects/poisoningreality/index.html`
- `projects/poisoningreality/documentation.html`
- `projects/poisoningreality/instructions.html`
- `projects/billboard/index.html`
- `projects/sendtomars/index.html`
- `projects/happyclub/index.html`
- `shop/index.html`
- `shop/funkloch-wanderkarte/index.html`
- `shop/hiking-map/index.html`
- `shop/poisoning-reality-frame/index.html`
- `shop/rate-patriarchy/index.html`
- `shop/sendtomars/index.html`
- `shop/terms/index.html`
- `sitemap.xml`
