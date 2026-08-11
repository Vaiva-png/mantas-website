#!/usr/bin/env node
/**
 * MANTAS — Projektfotos hinzufügen
 * -----------------------------------------------------------------------------
 * 1. Fotos (so groß wie sie aus der Kamera kommen) in den Ordner  neue-fotos/  legen
 * 2. Im Terminal ausführen:   node fotos.js
 * 3. Fertig — die Bilder sind verkleinert, im Ordner assets/gallery/ abgelegt
 *    und in index.html eingetragen.
 *
 * Danach nur noch die Bildbeschreibungen in assets/gallery/galerie.json ergänzen
 * (wichtig für Google und für blinde Besucher) und die Seite neu hochladen.
 *
 * Diese Datei wird NICHT auf den Server hochgeladen — sie ist nur zum Arbeiten.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT     = __dirname;
const EINGANG  = path.join(ROOT, 'neue-fotos');
const GALERIE  = path.join(ROOT, 'assets', 'gallery');
const JSON_DAT = path.join(GALERIE, 'galerie.json');
const SEITE    = path.join(ROOT, 'index.html');

const MAX_BREITE = 900;   // Pixel — reicht für die Galerie-Kacheln
const QUALITAET  = 66;    // 0–100

const START = '<!-- GALERIE:START';
const ENDE  = '<!-- GALERIE:ENDE -->';

function huebsch(n) { return (n / 1024).toFixed(0) + ' KB'; }

// --- 1. Eingangsordner lesen -------------------------------------------------
fs.mkdirSync(EINGANG, { recursive: true });

const neue = fs.readdirSync(EINGANG)
  .filter(function (f) { return /\.(jpe?g|png|heic)$/i.test(f); })
  .sort();

// --- 2. Bestehende Liste laden ----------------------------------------------
let liste = [];
if (fs.existsSync(JSON_DAT)) {
  liste = JSON.parse(fs.readFileSync(JSON_DAT, 'utf8'));
}

// --- 3. Neue Bilder verkleinern und einsortieren ------------------------------
let hoechste = liste.reduce(function (max, e) {
  const m = /gallery-(\d+)\./.exec(e.datei);
  return m ? Math.max(max, Number(m[1])) : max;
}, 0);

const hinzugefuegt = [];

neue.forEach(function (datei) {
  hoechste += 1;
  const ziel = 'gallery-' + hoechste + '.jpg';
  const von  = path.join(EINGANG, datei);
  const nach = path.join(GALERIE, ziel);

  const vorher = fs.statSync(von).size;

  try {
    execFileSync('sips', [
      '-s', 'format', 'jpeg',
      '-s', 'formatOptions', String(QUALITAET),
      '-Z', String(MAX_BREITE),
      von, '--out', nach,
    ], { stdio: 'ignore' });
  } catch (e) {
    console.error('  ✗  ' + datei + ' konnte nicht verarbeitet werden');
    hoechste -= 1;
    return;
  }

  const nachher = fs.statSync(nach).size;
  console.log('  ✓  ' + datei + '  →  ' + ziel + '   (' + huebsch(vorher) + ' → ' + huebsch(nachher) + ')');

  liste.push({ datei: ziel, alt: '' });
  hinzugefuegt.push(ziel);
  fs.unlinkSync(von);                       // Eingangsordner wieder leeren
});

// --- 4. Liste speichern ------------------------------------------------------
fs.writeFileSync(JSON_DAT, JSON.stringify(liste, null, 2) + '\n');

// --- 5. index.html neu schreiben --------------------------------------------
let html = fs.readFileSync(SEITE, 'utf8');
const a = html.indexOf(START);
const b = html.indexOf(ENDE);

if (a === -1 || b === -1) {
  console.error('\n  Fehler: Markierungen GALERIE:START / GALERIE:ENDE fehlen in index.html');
  process.exit(1);
}

const einzug = '        ';
const bilder = liste.map(function (e) {
  const alt = e.alt && e.alt.trim() !== ''
    ? e.alt
    : 'Projektfoto von MANTAS Bauleistungen';
  return einzug + '<img src="assets/gallery/' + e.datei + '" alt="' + alt.replace(/"/g, '&quot;') + '" loading="lazy">';
}).join('\n');

const kopf = START + ' — wird von "node fotos.js" erzeugt, nicht von Hand bearbeiten -->';
html = html.slice(0, a) + kopf + '\n' + bilder + '\n' + einzug + ENDE + html.slice(b + ENDE.length);
fs.writeFileSync(SEITE, html);

// --- 6. Zusammenfassung ------------------------------------------------------
console.log('');
if (hinzugefuegt.length === 0) {
  console.log('  Keine neuen Fotos gefunden.');
  console.log('  Legen Sie Bilder in den Ordner  neue-fotos/  und starten Sie erneut.');
} else {
  console.log('  ' + hinzugefuegt.length + ' Foto(s) hinzugefügt. Galerie hat jetzt ' + liste.length + ' Bilder.');
}

const ohneText = liste.filter(function (e) { return !e.alt || e.alt.trim() === ''; });
if (ohneText.length) {
  console.log('');
  console.log('  Noch zu tun — Bildbeschreibung ergänzen in');
  console.log('  assets/gallery/galerie.json');
  ohneText.forEach(function (e) { console.log('     • ' + e.datei); });
  console.log('  (danach  node fotos.js  noch einmal ausführen)');
}
console.log('');
