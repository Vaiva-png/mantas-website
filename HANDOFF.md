# MANTAS Bauleistungen — Handoff

**Read this first.** It explains what this is, what's already decided, and what's
still open. `README.md` next to it is the German operating manual written for the
site owner — this file is for whoever continues the development work.

---

## What this is

A marketing landing page for **MANTAS Bauleistungen**, an owner-run construction
and finishing trade business in Usingen, Hessen, Germany. Currently a **mockup /
work in progress** — not yet live, no domain connected.

It began as a Claude Design prototype (proprietary `.dc.html` format), which was
reviewed and then rebuilt as a plain static site.

**Stack: plain HTML + CSS + vanilla JS. No framework, no build step, no
dependencies.** That is a deliberate decision, not an oversight — see
"Decisions already made" below before proposing a rewrite.

---

## Run it

```bash
node dev.js          # → http://localhost:3000, auto-reloads on save
```

No `npm install`. The dev server uses only Node built-ins and also prints a LAN
address so the site can be checked on a phone.

```bash
node fotos.js        # add photos: drop files in neue-fotos/, run, done
```

---

## Files

```
index.html            the landing page
datenschutz.html      privacy policy (GDPR), German
danke.html            form confirmation page
styles.css            all styling, design tokens as CSS custom properties at top
script.js             mobile nav, footer pattern, lazy video start
kontakt.php           contact-form handler for classic PHP webspace

dev.js                live-reload dev server      ← tooling, do NOT deploy
fotos.js              gallery photo pipeline      ← tooling, do NOT deploy
neue-fotos/           drop-folder for new photos  ← tooling, do NOT deploy
README.md             German manual for the owner ← do NOT deploy
HANDOFF.md            this file                   ← do NOT deploy

assets/               images, video, self-hosted fonts
assets/gallery/       gallery photos + galerie.json (source of truth)
brand/                brandbook, logos, design system, business card — reference only
```

---

## Design system

Extracted from the client's existing printed brandbook (`brand/design-system.md`
has the full write-up; `brand/tokens.json` is machine-readable).

| Role | Value |
|---|---|
| Ink / text | `#231F20` (not pure black — intentional) |
| Action / CTA | `#F7921E` orange |
| Brand accent | `#FCB715` gold |
| Tertiary | `#5586A6` steel blue (decorative only) |
| Soft background | `#F7F6F5` |
| Typeface | Poppins 400/500/600/700 |

The brand's original typeface is **Isidora Sans** (TypeType, commercial). Poppins
was chosen as the free substitute — it matches Isidora's double-story `a`,
single-story `g` and geometric skeleton closely. If the client ever buys an
Isidora web licence, swapping it is a `@font-face` change only.

The recurring **house glyph** is the brand's signature motif ("every completed
job"). Used as an SVG symbol in the highlight cards and as the footer pattern.

---

## Decisions already made — please don't silently reverse these

**1. No framework, and specifically not Next.js.**
The client asked about this directly. The site is 3 static pages with one
hamburger menu; the deployment target is classic German PHP webspace (~€5/month),
which cannot run Node. Next.js would mean either `output: 'export'` (a build step
producing the same static HTML, plus a React runtime shipped to visitors) or
hosting on Vercel — whose free Hobby tier is non-commercial only, and which would
break `kontakt.php`. Revisit **only** if a bilingual DE/LT version or a CMS-backed
blog is actually commissioned.

**2. Fonts are self-hosted. Do not re-add Google Fonts.**
Embedding `fonts.googleapis.com` transmits visitor IPs to Google without consent;
LG München I (20.01.2022, Az. 3 O 17493/20) treated this as a GDPR violation and
it is a common source of Abmahnungen in Germany. The Poppins latin + latin-ext
WOFF2 subsets are in `assets/fonts/` (64 KB, OFL licensed). **The site currently
makes zero external requests — verified.** The privacy policy states this in
section 8, so re-adding a CDN would make the policy false.

**3. The gallery block in `index.html` is generated.**
Between `<!-- GALERIE:START -->` and `<!-- GALERIE:ENDE -->`. Source of truth is
`assets/gallery/galerie.json`. Edit the JSON and run `node fotos.js`; do not edit
the HTML block by hand, it will be overwritten.

**4. Copy is German, formal *Sie*.**
The original prototype was in Lithuanian despite the company being German-
registered with a German address and German suppliers. The client chose German.
See "Open questions" — a Lithuanian version may still come.

**5. Electrical and plumbing services carry a qualifier.**
"Elektroarbeiten" and "Sanitär & Heizung" say *"mit eingetragenen Fachbetrieben"*
(with registered specialist firms). In Germany these are regulated trades under
Handwerksordnung Anlage A. If the owner holds the Meister qualification, the
phrase can be dropped — but don't drop it without confirming.

**6. Images are compressed for the web.**
Originals were 24 MB total; the site is now 2.8 MB, ~520 KB above the fold.
Anything new should go through `fotos.js` or be resized to ≤1800 px first.

---

## Open questions — need the client, not a developer

| Item | Detail |
|---|---|
| **`IBM` vs `IHB` vs `Inh.`** | The Impressum says `IBM M. Stankevičius` (client's wording). The brandbook says `IHB`. The correct German abbreviation for a sole proprietor is `Inh.` (Inhaber). This is a legal notice — must be confirmed. |
| **`[X Jahre]`** | Placeholder in the "Unsere Erfahrung" paragraph, highlighted yellow on the page. |
| **Privacy policy blanks** | Hosting provider, logfile retention, form processor, third-country transfers, date. All highlighted yellow. Policy is a **template and needs legal review** — it is not lawyer-drafted. |
| **Language strategy** | German only for now. Bilingual DE/LT is the one scenario that would justify a framework. |
| **Social links** | Footer icons point at `#`. Real profiles or remove. |
| **Business email** | `montexs@gmail.com` appears in the Impressum. An address on the own domain would read far more professional. |

---

## Planned: hand the site over to the client

Decided, not yet done. Today the Netlify account, the GitHub repo and the form
notifications belong to the developer (`vaiva0223@gmail.com`), while the privacy
policy and Impressum name **MANTAS Bauleistungen** as the responsible party.
That mismatch is harmless while this is a viewing mockup, but must be resolved
before real enquiries arrive. The agreed direction is that **the client becomes
the controller**.

When that happens:

1. **Form notifications** — currently an email hook to `vaiva0223@gmail.com`
   (Netlify → Forms → Notifications). Point it at the client's address.
2. **Netlify account** — ideally the client opens their own and the site is
   transferred, so Netlify's DPA runs between Netlify and the client. If the
   developer keeps hosting it instead, the developer is a *processor* for MANTAS
   and a separate AVV between developer and client is required — Netlify then
   being a sub-processor. Netlify's own DPA needs no signature either way
   (see `legal/netlify-dpa-2026-06-09.pdf`).
3. **Privacy policy** — already written with MANTAS as controller, so it becomes
   correct on its own. Only the two remaining placeholders need filling.
4. **Domain** — `mantasbau.de` still has to be pointed at the site.

## Known gaps in the current build

- **Photography is placeholder stock and reads wrong.** The hero is a North
  American craftsman house (asphalt shingles, board-and-batten); the about photo
  is US platform framing. For a Hessen builder this is the single most damaging
  thing on the page. Client is aware and will supply real job photos.
- **`assets/service-renovierung.jpg` is a substitute.** The client's intended
  photo (tiling with a laser level) was never received. Drop the real file in at
  that exact path to fix — no code change needed.
- **The gallery leans heavily on before/after split images** — 4 of 6. Reads busy.
  Suggest max 2 when real photos arrive.
- **Form now uses Netlify Forms.** The site is deployed to Netlify, which does not
  run PHP, so the form posts to Netlify and redirects to `danke.html`. Submissions
  appear in the Netlify dashboard under *Forms*; set up an email notification there.
  `kontakt.php` is kept in the repo (and excluded from `dist/`) so the project can
  still move to classic German PHP webspace — the swap is two lines, documented
  inline in `index.html`.
- **`fotos.js` is macOS-only** — it shells out to `sips`. Needs a different
  resizer (sharp, ImageMagick) if the project moves to Linux/Windows.
- **Partner logos are builders' merchants**, not partners — labelled
  "Partner & Lieferanten" to be accurate. One is toom BauMarkt, a national chain;
  using their mark may need permission.

---

## What has been verified

Checked in a real browser at 1440 px and 375 px:

- No horizontal overflow at either width (`scrollWidth === clientWidth`)
- Mobile nav opens, closes on selection, closes on Escape, resets on resize
- All interactive targets ≥ 24 px tall on mobile
- Zero external network requests on both pages
- No broken local asset references
- Live reload fires on file save

Not verified: `kontakt.php` (no PHP runtime available locally), real-device
rendering, cross-browser beyond the Chromium-based preview.

---

## Deployment

Full step-by-step in `README.md` (German). Short version: classic German webspace
(All-inkl / IONOS / Hetzner, ~€5/mo), FTP the contents up minus the four tooling
files, enable TLS, sign the AV-Vertrag, set the three values at the top of
`kontakt.php`. Netlify is documented as an alternative for a no-FTP workflow.
