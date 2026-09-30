#!/usr/bin/env bash
# Genera los PDF de las hojas imprimibles.
#
# Por qué existen: hay móviles que no imprimen bien una página web —márgenes
# raros, fondos perdidos, la hoja partida en dos—. Un PDF ya hecho se abre,
# se guarda y se imprime igual en todas partes.
#
# La hoja de propuestas NO se genera: esa se rellena en pantalla antes de
# imprimirla, así que tiene que seguir siendo una página.
#
# Se ejecuta después de tocar cualquiera de esas hojas y antes de subir:
#
#   bash generar-pdf.sh
set -euo pipefail

cd "$(dirname "$0")"
RAIZ="$(pwd -W 2>/dev/null || pwd)"
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"

hacer() {
  local origen="$1" destino="$2"
  "$CHROME" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer \
    --print-to-pdf="$(echo "$RAIZ/$destino" | tr '/' '\\')" \
    "file:///$RAIZ/$origen" >/dev/null 2>&1
  printf '%-44s %s\n' "$destino" "$(node -e "
    const b = require('fs').readFileSync('$destino').toString('latin1');
    console.log((b.match(/\/Type\s*\/Page[^s]/g) || []).length + ' páginas');
  ")"
}

hacer profesorado/resumen.html          profesorado/descargas/hoja-resumen.pdf
hacer guia-familias/hoja.html           guia-familias/hoja-familias.pdf
hacer guia-familias/hoja-alumnado.html  guia-familias/hoja-alumnado.pdf
