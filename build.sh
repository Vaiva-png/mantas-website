#!/usr/bin/env bash
#
# MANTAS — stellt den Ordner dist/ zusammen, der veröffentlicht wird.
#
# Wird von zwei Stellen aufgerufen:
#   • netlify.toml  (automatischer Deploy bei jedem git push)
#   • deploy.sh     (manueller Deploy vom eigenen Rechner)
#
# WICHTIG: Nur Dateien, die wirklich öffentlich sein dürfen, kommen nach dist/.
# Bewusst NICHT dabei — diese wären sonst unter ihrer URL herunterladbar:
#   brand/        Markenhandbuch, Logos, Visitenkarte (Eigentum des Kunden)
#   HANDOFF.md    interne Notizen inkl. offener Punkte
#   README.md     Betriebsanleitung
#   dev.js .env   Werkzeuge und Zugangsdaten
#   kontakt.php   PHP läuft auf Netlify ohnehin nicht

set -euo pipefail
cd "$(dirname "$0")"

rm -rf dist
mkdir -p dist

cp index.html datenschutz.html danke.html styles.css script.js dist/
cp -R assets dist/

find dist -name '.DS_Store' -delete 2>/dev/null || true

echo "dist/ gebaut: $(find dist -type f | wc -l | tr -d ' ') Dateien, $(du -sh dist | cut -f1)"
