#!/usr/bin/env bash
# Pone una versión nueva en el enlace a estilo.css de todas las páginas.
#
# Por qué hace falta: el navegador se queda con la hoja de estilo que bajó la
# primera vez. Cambiar el CSS y no cambiar el enlace deja a quien ya visitó la
# página viendo la versión vieja —el HTML nuevo con los estilos antiguos, que
# es peor que no haber cambiado nada—. Pasó el 30/09/2026 con el bloque de la
# meta: en el servidor estaba bien y en el navegador salía sin formato.
#
# Se ejecuta DESPUÉS de tocar cualquier estilo.css y antes de subir:
#
#   bash refrescar-estilo.sh
set -euo pipefail

cd "$(dirname "$0")"
VERSION=$(date +%Y%m%d%H%M)

for f in profesorado/*.html guia-familias/*.html; do
  sed -i -E "s|href=\"estilo\.css(\?v=[0-9]+)?\"|href=\"estilo.css?v=$VERSION\"|g" "$f"
done

echo "Estilo marcado como v=$VERSION en:"
grep -l "estilo.css?v=$VERSION" profesorado/*.html guia-familias/*.html
