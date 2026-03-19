# Crate Digger Interface Design Research

The four “Crate Digger” design fictions each describe a distinctive UI aesthetic and interaction metaphor. We break down each spec and map it to concrete implementation ideas, while surveying common patterns for cards, filters, modals, and responsive design. All implementations should use semantic HTML, inline CSS and JavaScript (no frameworks), be mobile-first and accessible (focus states, ARIA where needed, contrast, etc.). We also ensure that filtering and search combine with AND logic【11†L1-L4】, and that modals scroll when content overflows【17†L229-L237】. 

## Catalog of Design Fictions

- **Film (Editor’s Bay)**: A dark mode interface (charcoal background, amber/cyan accents) evoking a film editor’s light table. UI fonts are clean sans-serif, with a typewriter-style font for script notes. Cards should look like mounted 35mm slides or polaroid photos with a slight back-lit glow on hover. A top navigation bar styled like a film timeline hosts filter toggles (e.g. “Pre-Production”, “VFX Friction”, etc.). Clicking a card opens a modal “dossier” with five sections (Pre-Production, Execution, Tech Logs, Post-Production, Reception) laid out like a script breakdown. The modal should glow like a light table and scroll if needed. The overall tone is warm, tactile, “celluloid” and inviting exploration.

- **Repair Manuals (Workbench)**: An industrial interface on a blueprint/grid-textured background with smudges. Colors are safety orange, steel grey, manila-yellow folder. Typography is exclusively monospace (e.g. Courier, Inconsolata) to mimic schematics. Cards resemble battered index cards or folded schematics; on hover they move as if pulling from a heavy drawer. Filters appear as physical toggle switches or tabbed manila tabs (categories: “OEM Specs”, “Rogue Hacks”, etc.). The modal looks like a clipboard holding a multi-page work order, with stamped or typed entries for five sections of a maintenance log. The feel is gritty, pragmatic, worn, and inviting discovery of hidden hacks.

- **Quick Start Guides (Sterile Unboxing)**: A stark white, ultra-clean interface with high contrast. Accent colors are corporate blue and alarming red. Main text uses Helvetica/Arial, but “fine print” text uses a tiny 6pt serif font. Cards look like pristine folded paper leaflets or app icons; hovering triggers a smooth corporate-style slide-up animation. Filters are minimalist pill-shaped buttons (categories “Step 1-3”, “User Error”, etc.). The modal expands like an accordion-fold pamphlet: large friendly “pitch” sections, and very dense “liability” text crammed at the bottom. The tone is deceptively friendly at first, then legalistic and punishing.

- **Product Catalogs (Discount Circular)**: A busy, low-fi interface on a yellowed newsprint background. Colors are garish – bright sale red, neon yellow highlights, halftone shadows. Titles use heavy display fonts (think Impact or bold sans-serif) and descriptions use dense, cramped serif (e.g. Times). Cards look like mail-order product listings in a dense grid; on hover they slightly enlarge (“magnifying glass” effect) or get a “BEST SELLER” sticker overlay. Filters resemble catalogue index tabs or coupon cut-outs (categories “Glossy Pitch”, “1-Star Reviews”, etc.). The modal is a chaotic product detail page: marketing pitch up top (with dotted “cut-here” edges), descending into gritty manufacturing logs and warnings. The overall feel is crowded, loud, cheap, and full of oddities.

Each design shares the same **technical requirements**: a single HTML file (with `<style>` and `<script>`), mobile-first responsive layout, touch-friendly targets (at least 44×44px【25†L29-L33】), and ARIA/semantic markup for accessibility. The filter toggles should combine (AND logic) so that only items meeting *all* active criteria and the search query are shown【11†L1-L4】. By default all items are shown.

## UI Components and Patterns

**Card Layout:** Each “site” is a card in a grid or list. Use a semantic container (e.g. `<ul><li class="card">` or `<div class="card">`) with an image/icon and text. For accessibility, **do not wrap the entire card in a single anchor**【3†L185-L193】. Instead, make the primary title or image a link (with expanded hit area via CSS pseudo-element) so the card remains keyboard-focusable and can contain other buttons【3†L185-L193】【3†L108-L117】. CSS can give cards their themed look (borders, backgrounds, shadows, fonts). For example, a film-slide card could use a dark frame and a neon-glow `box-shadow`; an index card could use a beige background with a black border and slight rotation; a folded pamphlet card might use `border-radius` and subtle fold shadows; a product listing might use halftone backgrounds or sticker badges.

**Filtering UI:** Present filter categories (checkboxes, toggles, or buttons) in a `<nav>` or `<section>` bar. Use native `<button>` or `<input type="checkbox">` for each filter for semantic accessibility. Style them according to the theme (e.g. CSS “pill” buttons with `border-radius: 9999px`【22†L923-L938】, or toggle switch UI using CSS). Ensure each filter control has accessible labels. Combine filters and text search with AND logic: e.g., in JavaScript, treat each active filter as an additional condition on the item data【11†L1-L4】. (Baymard finds that multiple filters should use AND across categories【11†L1-L4】.) For example, if filters “VFX” and “Pre-Production” are both active, only show cards tagged with *both* categories. The site’s search input similarly filters by string match (e.g. case-insensitive `.includes()` on title/description) in conjunction with the selected filters.

**Modal Dialogs:** Clicking a card opens a modal overlay. Use either the HTML5 `<dialog>` element (with `showModal()`) or a `<div role="dialog" aria-modal="true">` container. Follow accessibility guidelines: give the dialog a clear title (or `aria-label`/`aria-labelledby`), trap focus within the modal, move focus to the first control inside it on open, and return focus to the trigger on close【12†L80-L88】【13†L1-L4】. Include a visible “Close” button (with an accessible label) inside the modal【12†L80-L88】. Allow closing via the Escape key. Style the backdrop (e.g. semi-transparent dark overlay) and center the dialog. To handle overflow, constrain the dialog content’s max-height (e.g. `max-height: calc(100vh - 100px)`) and use `overflow-y: auto` so the modal scrolls internally【17†L229-L237】. 

## Accessibility and Responsiveness

- **Semantic HTML:** Structure the page using landmarks (e.g. `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) so assistive technologies can parse it【42†L399-L407】. For instance, wrap the filter bar in `<nav>` with appropriate headings, and each card section in `<article>` or `<li>`. Use `<button>` elements for clickable controls (rather than plain `<div>`), since native buttons are keyboard-accessible by default【42†L523-L532】. Include meaningful `alt` text for any images/icons on cards so screen readers get a description (as a basic accessibility best practice).

- **Touch-Friendly Targets:** Ensure all interactive elements meet the WCAG target size. In practice, custom buttons or links should be at least 44×44 CSS pixels【25†L29-L33】. This means using sufficient padding and spacing so filters, cards, and other controls are easy to tap. 

- **Color & Contrast:** Verify that text and UI elements meet contrast ratio guidelines (WCAG 2.1 AA requires ≥4.5:1 for normal text)【29†L340-L347】. This applies even in dark mode: for example, white or light grey text on charcoal should still have sufficient contrast. Avoid pure #000 backgrounds with stark white text (consider #121212 as a “soft black” for dark theme)【29†L289-L297】. Be mindful of overly bright accent colors (very saturated reds/blues) which can cause vibration on dark backgrounds【29†L299-L307】.

- **Responsive Layout:** Apply mobile-first CSS. For the card grid, a flexible layout (CSS Grid or Flexbox) is recommended. For example, using CSS Grid with `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` creates a fluid grid that wraps cards to new rows on narrow screens. Or use Flexbox with `flex-wrap: wrap`. Use relative units (%, rem) and media queries to adjust layouts at breakpoints. Ensure the modal also adapts on small screens (e.g. full-width on mobile if needed). Testing on narrow widths is essential.

## Implementation Strategies by Theme

Below are example strategies for each design’s look-and-feel. In each case, we mix static CSS effects with minimal JavaScript for interactivity. The user’s site list will be inserted (via a placeholder in `<script>`) and then rendered into cards at runtime.

- **Film Editor’s Bay:**  
  Use a dark background (`background: #121212; color: #ddd`) and accent variables (e.g. `--accent: #FFBF00;` for amber or `#00FFFF` for cyan). Set body font to a clean sans-serif (e.g. Helvetica or system UI), and use a monospace or “typewriter” font (like Courier New) for script-like text within cards or modal sections (e.g. use a CSS class `.script-note { font-family: Courier, monospace; }`). Style cards to look like 35mm slides: give each card a narrow border or frame, and a subtle glow on hover (`box-shadow: 0 0 10px var(--accent)`). The top navigation bar can be a `<nav>` with inline filter buttons, styled with SVG icon of film reel or simple text on a dark strip. The modal (“light table”) can have a semi-transparent background overlay (for glow) and sections arranged in a grid or flex columns labeled like a script breakdown (e.g. `<section><h2>Pre-Production</h2><p>…</p></section>`). Give the modal a slight glow effect (e.g. an outer `box-shadow`) to mimic light table glow.

- **Repair Manuals Workbench:**  
  Use a textured off-white or blueprint background (e.g. CSS repeating-linear-gradient to draw gridlines, or a subtle image). Define palette CSS variables (`--orange: #FFA500; --grey: #555; --yellow: #F0E68C;`). Set `font-family: "Courier New", monospace;` for all text. Design cards as index cards: background (`background: #FCF8E8; border: 1px solid #888;`), perhaps with a slight rotation or offset. On hover, animate with a slight lift (`transform: translateY(-5px)`) and shadow, to feel like pulling a card. Filters can be actual toggle switches: for example, hidden checkboxes with styled labels that look like hardware switches, or simple buttons with an `active` class (tinted steel grey vs orange). For the modal, make a clipboard background: e.g. `<dialog class="clipboard">` with a faux-wood background or brown tone, and a top clip icon. Place each section’s heading in a block with a “stamp” effect (e.g. a semi-transparent rotated text via CSS `::before` content). Use `font-family: monospace` and maybe simulate dot-matrix stamps by letter spacing or a dot-matrix webfont if available.

- **Quick Start Guides (Sterile):**  
  Use a bright white or very light grey background, with accent `--blue: #0066CC; --red: #CC0000;`. Main font is sans-serif (Arial/Helvetica). For “liability” text at bottom, define a CSS class with a small serif font (`font-family: serif; font-size: 8px;` or `0.5rem`) and a color (e.g. dark grey) to simulate fine print. Cards can have a glossy look: white background, subtle box-shadow, and a fold-like top (maybe a thin linear-gradient or angled border to suggest a crease). The hover animation can be done with CSS transitions (e.g. `transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.2)`). Filters are pill-shaped buttons (`border-radius: 50px; padding: 8px 16px; border: 1px solid var(--blue);`). The modal can be structured like an accordion: give each major section an `<h2>` and content. For a folded pamphlet effect, you might use `<details><summary>` for collapsible sections (though that changes interaction); otherwise, simply use a scrollable modal with sections stacked. The top “pitch” sections have large headers (maybe a colored banner), whereas the bottom “Consequences/Liability” section has a grey background or box and very small text. Use transitions to unfold or reveal sections if desired.

- **Product Catalog (Discount Circular):**  
  Set `background: #FCF8E8;` (yellowed paper tone) and define bright colors (`--sale: #FF0000; --highlight: #FFFF00;`). Use a heavy display font for titles (e.g. CSS `font-weight: 800; font-family: sans-serif`) and a serif like Times New Roman or Georgia for descriptions. Cards are arranged in a dense grid (use `display: grid` or `flex-wrap`) with minimal margin. Style each card like a mini advert: maybe border `1px dashed #000` and a colored corner ribbon with “SALE”. On hover, use `transform: scale(1.05)` or overlay a “BEST SELLER” badge (`::after` pseudo-element with a sticker image or text). Filters are styled as torn coupon tabs: you could simulate perforation using CSS `border: 3px dotted` or background patterned edges. For example, a filter button could have a triangular notch (`clip-path`) or an inset border to look like a coupon. The modal is a fake product page: use headings with big fonts for the pitch, dotted horizontal rules (`<hr style="border-style:dotted">`) to mimic cut lines, and clearly separated sections. The top section (marketing) might have a yellow highlight box behind it. The bottom sections (factory notes, reviews) could use a `font-family: serif; color: #333;` to look text-heavy. 

## Implementation Outline and Code Approach

A single-file template will contain: 

- An inline `<style>` block defining variables, typography, and all thematic CSS classes (card styles, nav bars, modal styles, etc.). Use media queries (e.g. `@media (min-width: 600px)`) to adjust layout from one-column to multi-column grids. 

- A `<nav>` or `<header>` with filter controls (buttons or checkboxes), plus a text search `<input>`. Mark each filter control with a data attribute or ID (like `data-category="Pre-Production"`) so JS can read their state. 

- A `<main>` element containing a container (e.g. `<ul id="cards-container">`). JavaScript will loop over the user’s site data (inserted in the script as a placeholder array or JSON) and populate this container with card elements (`<li class="card">` or `<div class="card">`) for each site. Each card’s HTML will include an image/icon and title (with alt text), and a hidden detail excerpt, etc.

- The modal dialog container (e.g. `<dialog id="dossier-dialog">` or `<div id="dossier-dialog" role="dialog" aria-modal="true">`) initially hidden. Its inner structure will have sections for Pre-Production, Execution, etc. These can be hard-coded as empty `<section>`s with headings; when a card is clicked, the script fills each section with the corresponding data from that site.

- JavaScript for interactivity: on page load, attach event listeners to filter buttons and search input. When any filter toggles or search input change, run a function that filters the original site list. For example: 
  ```js
  let filtered = sites.filter(site => {
    return filters.every(f => !f.active || site.tags.includes(f.category))
      && site.title.toLowerCase().includes(searchText);
  });
  ```
  This enforces AND logic across categories【11†L1-L4】. Then re-render the cards container with only `filtered` items.

- Clicking a card’s primary action (or a “Details” button) sets the modal’s content: populate each section’s innerHTML from the site’s data fields. Then call `dialog.showModal()` (or make the dialog visible) and focus the close button inside it. Attach an Esc key handler (`keydown`) to close the modal. 

- Ensure all elements are keyboard-accessible: links or buttons, with visible focus styles (avoid removing `outline` unless replaced with a clear alternative). Provide `aria-label` or `aria-labelledby` for icons/buttons that lack text. 

- In the script, mark the insertion point for the site list clearly (e.g. `// PASTE SITES HERE`), as the prompts specify.

This approach yields a single HTML file (“self-contained”) with inline CSS and JS. The “style” will implement the visual themes described, and the JS will handle filtering (AND logic) and modal display. Throughout, we apply accessible practices (semantic tags, alt text, focus management) and responsive design (flex/grid layouts, media queries, touch-target sizes【25†L29-L33】).

## References

- Kitty Giraudel, *“Accessible cards”*: avoid wrapping entire card in a link and use CSS to expand hit area for the link, enabling other interactive elements within a card【3†L185-L193】【3†L108-L117】.  
- Baymard Institute, *Filtering UX* (2020): filter categories should combine with **AND** logic across different categories, and **OR** within a category【11†L1-L4】.  
- FreeCodeCamp, *“How to Build an Accessible Modal”*: modal dialogs should have descriptive aria labels, a close button, move focus into the dialog on open, trap focus, and allow `Esc` to close【12†L80-L88】【13†L1-L4】. It also highlights the native `<dialog>` element with built-in focus management and Esc-key support【14†L1-L4】.  
- StackOverflow (Bootstrap example): to make a modal scrollable, constrain its height (e.g. `max-height: 100vh; overflow-y: auto`) so overflow content scrolls【17†L229-L237】.  
- WCAG 2.1 Success Criteria: interactive targets (buttons, toggles) should be at least 44×44 CSS pixels for touch accessibility【25†L29-L33】.  
- WCAG Contrast Guidelines: normal text requires at least 4.5:1 contrast, regardless of light or dark theme【29†L340-L347】. 
- MDN, *HTML Accessibility*: use semantic elements (`<nav>`, `<main>`, `<article>` etc.) to provide structure and improve screen-reader navigation【42†L399-L407】. 

These sources guide the implementation of cards, filters, modals, and general accessibility to meet the prompts’ requirements while ensuring a robust, user-friendly crate-digging interface.

