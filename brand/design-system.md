# MANTAS Bauleistungen — Design System

Extracted from the existing brandbook (`Mantas_brandbook1.png`, `Mantas_brandbook2.png`) and business card artwork (`Mantas_Business card_89x51mm+3mm.pdf`) in this folder. This document translates the print brand identity into a system you can hand to a website build.

## 1. Brand Overview

- **Company:** MANTAS Bauleistungen — a German construction/building-services company (Bauleistungen = "construction services").
- **Owner:** Mantvydas Stankevičius (IHB = Inhaber/proprietor).
- **Location:** Schlesienstraße 6, D-61250 Usingen, Germany.
- **Web/contact:** www.mantasbau.de · montexs@gmail.com · +49(0)157-81522295.
- **Positioning:** Reassuring, no-nonsense, trustworthy tradesperson brand — "building your dream home shouldn't be a nightmare." Existing mockups are written in Lithuanian, suggesting the site should target Lithuanian-speaking clients/workers; German stays in the formal company name and stationery. Confirm target language(s) before building copy.
- **Industry cues:** hard-hat, tools, job-site imagery; the brand mark itself is literally a house.

## 2. Logo System

**Construction:** An isometric-style house outline (roofline + wall) rendered as a stylized "M", paired with the wordmark "MANTAS" and a smaller tagline line "BAULEISTUNGEN" underneath.

**Available files (this folder):**
| File | Description |
|---|---|
| `logo.png` | Full-color lockup — gold/yellow house icon + black wordmark, transparent background |
| `logo-02.svg` | Single-color **white** vector lockup (icon + wordmark as paths) — for dark/photo backgrounds |
| `logo-03.svg` | Single-color **dark** (`#1F1E21`) vector lockup — for light backgrounds, print-safe vector |

**Variants defined in the brandbook:**
1. **Positive** — black wordmark, gold roof icon, white background (primary/default use)
2. **On color** — full lockup in white/black over the gold `#FCB715` brand color as a solid background block
3. **Negative** — white wordmark + gold icon on black background
4. **Icon-only mark** — the house/"M" shape alone, for favicons, app icons, social avatars, watermarks
5. **Clear space / safety zone** — the brandbook defines a minimum clear margin around the lockup (roughly the height of the "T" cross-strokes shown in the guide) — keep other elements out of this zone at all sizes.

**Do:**
- Use `logo-03.svg` (dark) on light/white sections, `logo-02.svg` (white) on photo/dark sections.
- Keep the gold roof accent color when the background allows it (positive/negative variants) — it's the brand's most recognizable cue.

**Don't:**
- Don't recolor the wordmark to anything but black/white/dark-neutral.
- Don't place the positive (black-on-transparent) lockup over a busy photo without a scrim — use the white SVG instead.

## 3. Color Palette

| Role | Name | Hex | CMYK | Pantone |
|---|---|---|---|---|
| Primary / CTA | Orange | `#F7921E` | C0 M51 Y100 K0 | 1495 C |
| Brand accent | Gold / Yellow | `#FCB715` | C0 M31 Y100 K0 | 1235 C |
| Secondary | Steel Blue | `#5586A6` | C71 M39 Y22 K1 | 7697 C |
| Ink / Text | Near-black | `#231F20` | — | Neutral Black C |
| Base | White | `#FFFFFF` | — | — |

**Usage pattern observed across applications:**
- **Gold (`#FCB715`)** is the dominant brand color — business card background, envelope pattern, primary logo accent.
- **Orange (`#F7921E`)** is used as the *action* color — CTA buttons ("SUŽINOTI DAUGIAU", "REGISTRACIJA"), highlighted text/badges.
- **Steel blue (`#5586A6`)** appears only as a third accent inside the repeating house-icon pattern — treat it as a tertiary/decorative color, not a UI color, unless you want to introduce it for links or secondary actions.
- **Near-black (`#231F20`)** is the text/ink color — not pure `#000000`. Use this for all body copy and headings instead of true black.
- White is the dominant background; gold/orange are used deliberately, in small doses, not as full-page backgrounds (except section dividers/callout blocks).

**Accessibility note:** Gold `#FCB715` and orange `#F7921E` both fail WCAG AA contrast for white or light text on top (and for small dark text on top, contrast is borderline). Reserve these for large text, buttons with sufficiently large/bold labels, icons, and backgrounds paired with near-black `#231F20` text — verify contrast ratios once real UI copy/sizes are set.

## 4. Typography

- **Typeface:** Isidora Sans — **Medium** for body copy, **Semibold** for headings/emphasis. Supports German diacritics (Ää Öö Üü ß) and Lithuanian-adjacent Baltic characters (Ą ą Č č Ę ę Ė ė Į į Š š Ų ų Ū ū Ž ž) per the brandbook specimen.
- **Web licensing note:** Isidora Sans is a commercial typeface (TypeType foundry), not on Google Fonts. Before building the site, either (a) buy a webfont license and self-host it, or (b) substitute a free Google Font for the web build.
- **Recommended substitute: [Poppins](https://fonts.google.com/specimen/Poppins).** Verified against the actual brandbook letterforms — Poppins matches Isidora's double-story `a`, single-story `g` with an open loop tail, curved-terminal `t`, and circular/monolinear geometric skeleton closely enough to read as the same typeface at a glance. It also ships Medium (500) and SemiBold (600) natively, matching the two weights specified in the brandbook exactly.
  - **Runner-up:** Urbanist — same geometric-double-story-`a` family, slightly more contemporary and less overexposed than Poppins, but its `g` is a more conventional double-story shape (a small mismatch from Isidora).
- **Suggested type scale for web** (not specified in brandbook, proposed as a sane default):
  - Display/H1: 48–64px, Semibold
  - H2: 32–40px, Semibold
  - H3: 24px, Semibold
  - Body: 16–18px, Medium
  - Small/labels: 13–14px, Medium, often letter-spaced (the wordmark and nav labels in the mockup use wide tracking on uppercase text)

## 5. Graphic Pattern — the "House Field"

A recurring decorative motif seen across every application (letterhead, envelope, notebook cover, mug, tool pouch, website header divider): dozens of the house-icon glyph repeated at different scales/rotations, each rendered in a different treatment:
- Outline only (black stroke)
- Solid fill (orange, gold, blue, or black)
- Outline with a small solid "window" cutout
- Mixed — nested/overlapping outlines

Per the brandbook: *"Grafinis elementas, kuris simbolizuoja kiekvieną unikalų atliktą statybų darbą"* — the pattern represents every unique completed project; density = experience/track record.

**Usage guidance for web:**
- Use as a low-opacity background texture on section dividers, footer, or hero corners — never as the primary background under body text.
- On the homepage mockup it appears as a horizontal icon strip directly under the hero image (mixed black/white/color houses in a row) — this is a reusable section-break component.
- Keep individual icons monochrome-per-instance (don't gradient them); vary fill vs. outline for rhythm, as in the original pattern.

## 6. Imagery & Photography

- On-site, working-class/job-site photography: real tradespeople in hard hats and work gear, mid-task (drilling, framing).
- Hero treatment: full-bleed photo, dark overlay/duotone toward black, white headline text overlaid directly on the image (no card behind the text in the current mockup).
- Keep imagery authentic/documentary rather than stocky-corporate — matches the brand's straightforward tone.

## 7. Voice & Content Patterns (from existing mockup copy)

- Headline style: short, emotionally direct, exclamatory. e.g. *"Statyti savo svajonių namą neturėtų būti košmaras!"* ("Building your dream home shouldn't be a nightmare!") and *"Jūsų svajonių namo statybos be jokių košmarų!"* (banner ad).
- Supporting copy: plain, benefit-led, short sentences — *"Nuo pačių mažiausių darbų iki didelių projektų užtikrinsime kokybę bei visokeriopą pagalbą."* (From the smallest jobs to large projects, we guarantee quality and full support.)
- CTA labels are short, imperative, uppercase: "SUŽINOTI DAUGIAU" (Learn more), "REGISTRACIJA" (Register), "PRISIJUNGTI" (Log in).

## 8. Observed UI Components (from the existing mockup, for reference)

- **Top nav:** logo left, horizontal text nav center/right (PAGRINDINIS · APIE MUS · PASLAUGOS · PATIRTIS · KONTAKTAI), single filled-orange CTA pill button on the far right ("REGISTRACIJA").
- **Hero:** full-bleed photo, dark scrim, white H1 + paragraph left-aligned, one orange primary button.
- **House-icon strip:** decorative divider directly below the hero.
- **Login form (app mockup):** white card over the house pattern background, logo mark at top, two stacked inputs (email, password with visibility toggle), one full-width primary button in the brand blue/orange gradient-adjacent solid color, plus a "forgot password" text link.
- **Banner/flyer pattern:** bold dark headline with one word/phrase highlighted in an orange rectangle, used on a job-site sign — a reusable "highlighted phrase" text style worth carrying into web headings.

## 9. Existing Applications Inventory

Business card, letterhead + envelope, notebook/branded stationery, mug, tools (hammer, screwdriver, tape measure, laser measure), branded tool pouch, job-site banner/sign, website homepage mockup, mobile app login screen, USB drive. These already establish the system end-to-end — the website should feel like the next application in this same family, not a new direction.

## 10. Gaps to Resolve Before Building the Website

- No defined web font substitute chosen yet for Isidora Sans (see §4).
- No spacing/grid system defined in the brandbook — §4's type scale and an 8px spacing scale are proposed defaults, not brand-mandated.
- No dark-mode or hover/focus/disabled states defined for buttons/links — will need to be designed using the existing palette (likely: darken orange for hover, use steel blue for links/secondary actions).
- No icon set beyond the house pattern and logo mark — plan for a functional UI icon set (phone, email, checkmark, etc.) in a compatible line style.
- Confirm target site language (Lithuanian vs. German vs. bilingual) before writing copy.

## File Reference

```
Mantas website/
├── Mantas_brandbook1.png       — logo variants, color specs, type specimen, pattern
├── Mantas_brandbook2.png       — applications: stationery, merch, website/app mockups
├── Mantas_Business card_89x51mm+3mm.pdf — print-ready business card, contact details
├── logo.png                    — full-color logo lockup (transparent bg)
├── logo-02.svg                 — white monochrome logo lockup (vector)
├── logo-03.svg                 — dark (#1F1E21) monochrome logo lockup (vector)
└── design-system/
    ├── design-system.md        — this document
    └── tokens.json             — machine-readable design tokens
```
