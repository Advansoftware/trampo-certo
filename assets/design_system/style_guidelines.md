## Brand & Style

This design system establishes an authentic, resilient, and empowering digital operating environment tailored specifically for Brazilian microentrepreneurs (MEI) and independent freelancers. By deliberately rejecting clichéd neo-fintech emerald greens and generic synthetic teals, the design system anchors itself in Material Design 3 (Material You) foundational principles: adaptive tonal palettes, expressive geometry, and structural trust.

### Persona & Cultural Context
The Brazilian MEI juggles tax compliance (DAS-MEI), instant payouts (Pix), client invoicing (NF-e), and cash flow reconciliation on mobile devices, often while multitasking in high-glare transit or active service environments. The visual language conveys fiscal stability and modern dignity through deep sapphire cobalt, supported by warm terracotta and soft slate accents that evoke grounded human craftsmanship rather than cold corporate bureaucracy.

### Design Movement: Material You (M3) Tonal & Dynamic
- **Tonal Hierarchy over Drop Shadows:** Elevation is communicated almost exclusively via M3 Surface Containers rather than heavy skeumorphic shadows or black drop-shadows.
- **Dynamic Color Shifts:** High-priority interaction surfaces use rich cobalt; critical auxiliary actions leverage warm terracotta to draw natural eye flow without visual stress.
- **Expressive Pill Geometry:** Full pill radii on interactive touch points paired with generous `rounded-3xl` corners on content surfaces deliver approachable, tactile ergonomics.

## Layout & Spacing

The layout is built upon an 8pt modular grid (with 4pt sub-increments for compact interactive elements such as tags and dense financial data cells).

### Grid Model
- **Mobile (0–599px):** 4-column fluid layout with 16px margins and 16px gutters. Financial summary cards span the full width to afford maximum horizontal touch targets.
- **Tablet (600–1023px):** 8-column layout with 32px margins and 16px gutters. Dashboard metrics reflow into a 2x2 grid.
- **Desktop (1024px+):** 12-column layout with 48px margins and 24px gutters. Max content width constrained to `1360px` centered, ensuring wide displays do not degrade transactional line scanning.

### Adaptive Behavior
Navigation moves from a bottom app bar or dock on mobile devices directly into an expansive, M3-styled floating or docking navigation rail (`width: 80px` collapsed, `280px` expanded) on desktop screen sizes.

## Elevation & Depth

This design system follows the Material 3 surface elevation specification, which relies primarily on tonal surfaces rather than heavy drop shadows. As elevation steps up, the surface layer shifts progressively towards brighter, clearer tones.

### Elevation Levels
- **Level 0 (Canvas):** `surface-container-low` (`#F6F7FB`). No shadow. Foundation for the entire application viewport.
- **Level 1 (Card Default):** `surface-container-lowest` (`#FFFFFF`). Zero drop-shadow. Separation is achieved through background contrast and an optional hairline border: `1px solid rgba(118, 119, 125, 0.12)`.
- **Level 2 (Hover / Elevated Card):** `surface-container-lowest` (`#FFFFFF`) accompanied by an ambient, low-contrast diffuse shadow: `box-shadow: 0px 4px 12px rgba(26, 54, 93, 0.05), 0px 1px 2px rgba(26, 54, 93, 0.08)`.
- **Level 3 (FAB & Menus):** `surface-container-high` (`#E8EBF2`) or tinted Primary with ambient shadow: `box-shadow: 0px 8px 24px rgba(26, 54, 93, 0.12)`.
- **Level 4 (Modals & Bottom Sheets):** `surface-container-lowest` (`#FFFFFF`) with `box-shadow: 0px 16px 40px rgba(26, 54, 93, 0.16)`.

## Components

### Buttons
- **Filled (Primary Action):** Background `#1A365D`, text `#FFFFFF`, radius `rounded-full`. Padding `12px 24px`. Heights: 48px standard, 40px compact. Active state displays subtle ripple or 8% white overlay.
- **Tonal (Secondary Action):** Background `#E8EBF2`, text `#1A365D`, radius `rounded-full`.
- **Accent Action:** Background `#C85A32`, text `#FFFFFF`, radius `rounded-full`. Dedicated to instantaneous conversion actions (e.g., "Cobrar via Pix", "Emitir Guia DAS").
- **Outlined:** 1px border `#76777D` (at 30% opacity), transparent background, text `#1A365D`.

### Floating Action Button (FAB)
- Follows the M3 square-rounded geometry (`rounded-2xl` / 16px radius) or full pill extended FAB. Background `#C85A32` with `#FFFFFF` glyph and text, anchored to the bottom right on mobile screens.

### Chips
- Height `32px`, `rounded-full`.
- **Filter Chip:** Unselected: 1px border `rgba(118, 119, 125, 0.24)`, text `#1A365D`. Selected: Background `#DEE2EB` with primary text and checkmark symbol.
- **Assist / Status Chip:** Pix paid (`#E6F4EA` bg, `#137333` text); DAS Pending (`#FCE8E6` bg, `#C5221F` text); MEI Limit Warning (`#FEF7E0` bg, `#B06000` text).

### Cards & Surface Containers
- Outer radius `24px` to `28px` (`rounded-3xl`), background `surface-container-lowest` (`#FFFFFF`). Zero drop-shadow; crisp boundary defined by `1px solid rgba(222, 226, 235, 0.8)`. Generous interior padding (`24px`).

### Input Fields
- M3 Filled or Outlined styles:
  - **Outlined Input:** `16px` border-radius, `1px solid rgba(118, 119, 125, 0.32)`. Height `56px`. Floating label transitions to `label-sm` with text color `#1A365D` on focus.
  - Active focus state increases border to `2px solid #1A365D` without shifting surrounding layout.

### Lists & Financial Statements
- Transparent rows separated by subtle dividers (`#DEE2EB`). Each transaction item contains a 44px circular or `rounded-2xl` tonal icon avatar representing transaction category (NF-e, boleto, Pix transfer, subscription).