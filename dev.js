#!/usr/bin/env node
/**
 * MANTAS — Entwicklungs-Server mit Live-Reload
 * -----------------------------------------------------------------------------
 * Startet eine lokale Vorschau, die sich automatisch neu lädt, sobald eine
 * Datei gespeichert wird. Keine Installation, keine Abhängigkeiten.
 *
 *   node dev.js
 *
 * Danach http://localhost:3000 im Browser öffnen und offen lassen.
 * Jede Änderung an .html/.css/.js/Bildern erscheint sofort.
 *
 * Diese Datei wird NICHT auf den Server hochgeladen — sie ist nur zum Arbeiten.
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css' : 'text/css; charset=utf-8',
  '.js'  : 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg' : 'image/svg+xml',
  '.jpg' : 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png' : 'image/png',
  '.webp': 'image/webp',
  '.mp4' : 'video/mp4',
  '.woff2': 'font/woff2',
  '.ico' : 'image/x-icon',
};

/** Wird vor </body> in jede HTML-Seite eingefügt. */
const RELOAD_SNIPPET = `
<script>
(function () {
  var es = new EventSource('/__reload');
  es.onmessage = function () { location.reload(); };
  es.onerror = function () { /* Server neu gestartet — Browser versucht es selbst erneut */ };
})();
</script>
`;

// --- verbundene Browser-Tabs -------------------------------------------------
let clients = [];

function reloadAll() {
  clients.forEach(function (res) { res.write('data: reload\n\n'); });
}

// --- Dateiänderungen beobachten ---------------------------------------------
let timer = null;
fs.watch(ROOT, { recursive: true }, function (_event, filename) {
  if (!filename) return;
  if (filename.startsWith('.git') || filename.includes('node_modules')) return;
  clearTimeout(timer);                       // fs.watch feuert oft mehrfach
  timer = setTimeout(function () {
    console.log('  ↻  ' + filename);
    reloadAll();
  }, 60);
});

// --- Server ------------------------------------------------------------------
const server = http.createServer(function (req, res) {
  const url = decodeURIComponent(req.url.split('?')[0]);

  // Live-Reload-Kanal
  if (url === '/__reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    res.write('\n');
    clients.push(res);
    req.on('close', function () {
      clients = clients.filter(function (c) { return c !== res; });
    });
    return;
  }

  // Pfad auflösen, Ausbrechen aus dem Ordner verhindern
  let file = path.join(ROOT, url === '/' ? 'index.html' : url);
  if (!file.startsWith(ROOT)) { res.writeHead(403).end('Forbidden'); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, 'index.html');
  }
  // "/datenschutz" soll auch ohne .html funktionieren
  if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';

  if (!fs.existsSync(file)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404</h1><p>Nicht gefunden: ' + url + '</p>' + RELOAD_SNIPPET);
    return;
  }

  const ext = path.extname(file).toLowerCase();
  const type = MIME[ext] || 'application/octet-stream';

  if (ext === '.html') {
    let html = fs.readFileSync(file, 'utf8');
    html = html.includes('</body>')
      ? html.replace('</body>', RELOAD_SNIPPET + '</body>')
      : html + RELOAD_SNIPPET;
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(html);
    return;
  }

  res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, function () {
  console.log('');
  console.log('  MANTAS — Vorschau läuft');
  console.log('  ─────────────────────────────────────────');
  console.log('  Auf diesem Rechner:  http://localhost:' + PORT);

  // Adresse im WLAN ausgeben, damit die Seite auf dem Handy geprüft werden kann
  const nets = require('os').networkInterfaces();
  Object.keys(nets).forEach(function (name) {
    nets[name].forEach(function (net) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log('  Im selben WLAN:      http://' + net.address + ':' + PORT + '   (Handy)');
      }
    });
  });

  console.log('');
  console.log('  Änderungen laden automatisch neu. Beenden mit  Strg + C');
  console.log('');
});
