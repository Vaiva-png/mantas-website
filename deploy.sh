#!/usr/bin/env bash
#
# MANTAS — Deploy nach Netlify
# -----------------------------------------------------------------------------
#   ./deploy.sh            Vorschau-Deploy (eigene Test-URL, nicht öffentlich)
#   ./deploy.sh --prod     Live-Deploy auf die echte Domain
#
# Liest NETLIFY_AUTH_TOKEN und NETLIFY_SITE_ID aus .env (nicht eingecheckt).
# Stellt vorher einen sauberen dist/-Ordner zusammen, damit Arbeitsdateien und
# Markenmaterial NICHT öffentlich auf der Website landen.

set -euo pipefail
cd "$(dirname "$0")"

# --- Anmeldung ---------------------------------------------------------------
# Zwei Wege, beide funktionieren:
#   1. Einmalig  npx netlify-cli login  ausführen — der einfachste Weg.
#      Die CLI merkt sich die Anmeldung selbst, .env wird gar nicht gebraucht.
#   2. Ein Token in .env hinterlegen — nötig für automatische Deploys
#      (z. B. GitHub Actions) oder wenn kein Browser zur Verfügung steht.
if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

if [ -n "${NETLIFY_AUTH_TOKEN:-}" ]; then
  echo "  → Anmeldung über Token aus .env"
else
  echo "  → Kein Token in .env — es wird die gespeicherte Netlify-Anmeldung benutzt."
  echo "     Falls der Deploy scheitert, einmalig ausführen:  npx netlify-cli login"
fi

# --- dist/ zusammenstellen ---------------------------------------------------
# Nur was wirklich öffentlich sein soll. Bewusst NICHT dabei:
#   dev.js, fotos.js, neue-fotos/, brand/, README.md, HANDOFF.md, .env, kontakt.php
echo "  → dist/ wird gebaut …"
rm -rf dist
mkdir -p dist
cp index.html datenschutz.html danke.html styles.css script.js dist/
cp -R assets dist/
find dist -name '.DS_Store' -delete 2>/dev/null || true

echo "     $(find dist -type f | wc -l | tr -d ' ') Dateien, $(du -sh dist | cut -f1)"

# --- Hinweis zum Formular ----------------------------------------------------
if grep -q 'action="kontakt.php"' index.html; then
  echo ""
  echo "  ACHTUNG: Das Formular zeigt noch auf kontakt.php."
  echo "  Netlify führt kein PHP aus — auf Netlify Forms umstellen:"
  echo '    <form ... data-netlify="true" netlify-honeypot="website" action="/danke.html">'
  echo '      <input type="hidden" name="form-name" value="kontakt">'
  echo "  Siehe README.md, Variante B."
  echo ""
fi

# --- Deploy ------------------------------------------------------------------
ARGS=(deploy --dir=dist)
[ -n "${NETLIFY_SITE_ID:-}" ] && ARGS+=(--site "$NETLIFY_SITE_ID")

if [ "${1:-}" = "--prod" ]; then
  ARGS+=(--prod)
  echo "  → LIVE-Deploy …"
else
  echo "  → Vorschau-Deploy (mit --prod live schalten) …"
fi

npx --yes netlify-cli "${ARGS[@]}"
