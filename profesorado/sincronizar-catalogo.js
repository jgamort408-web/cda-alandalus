/**
 * Reescribe el catálogo de la hoja resumen y de la presentación a partir del
 * de index.html, que es el único sitio donde se mantiene.
 *
 * Tenerlo escrito a mano en tres ficheros es cómo se acaba enseñando precios
 * distintos en la pantalla y en el papel.
 */
const fs = require('fs');

const base = 'paginas/profesorado/';
const hub = fs.readFileSync(base + 'index.html', 'utf8');

const bloque = hub.match(/const CATALOGO = \[([\s\S]*?)\n\];/)[1];
const filas = [...bloque.matchAll(/\['(.+?)','(.+?)','(.+?)',(\d+),'(#[0-9A-Fa-f]{6})'\]/g)]
  .map(([, titulo, , , coste]) => ({ titulo, coste: Number(coste) }));

if (filas.length === 0) {
  throw new Error('No se ha leído ninguna recompensa: se aborta para no vaciar las páginas.');
}

/* ── Hoja resumen: una lista en tres columnas ───────────────────────── */
const lista = filas
  .map(({ titulo, coste }) => `    <li>${titulo} <b>${coste}</b></li>`)
  .join('\n');

let resumen = fs.readFileSync(base + 'resumen.html', 'utf8');
resumen = resumen.replace(
  /(<ul class="catalogo">)[\s\S]*?(<\/ul>)/,
  `$1\n${lista}\n  $2`
);
fs.writeFileSync(base + 'resumen.html', resumen);

/* ── Presentación: agrupadas por lo que cuestan ─────────────────────── */
const tramos = [
  { titulo: '5', veces: '1 participación', de: 5, a: 5 },
  { titulo: '10', veces: '2 participaciones', de: 10, a: 10 },
  { titulo: '15', veces: '3 participaciones', de: 15, a: 15 },
  { titulo: '20', veces: '4 participaciones', de: 20, a: 20 },
  { titulo: '25 a 35', veces: 'de 5 a 7', de: 25, a: 35 },
];

const grupos = tramos.map(({ titulo, veces, de, a }) => {
  const dentro = filas.filter(f => f.coste >= de && f.coste <= a);
  const items = dentro
    .map(f => de === a
      ? `            <li>${f.titulo}</li>`
      : `            <li>${f.titulo} <em>${f.coste}</em></li>`)
    .join('\n');

  return [
    '        <div class="tarifa__grupo">',
    `          <div class="tarifa__cab"><span class="tarifa__coste">${titulo}</span><span class="tarifa__veces">${veces}</span></div>`,
    '          <ul>',
    items,
    '          </ul>',
    '        </div>',
  ].join('\n');
}).join('\n');

let deck = fs.readFileSync(base + 'presentacion.html', 'utf8');
deck = deck.replace(
  /(<div class="tarifa" style="margin-top:20px">)[\s\S]*?(\n      <\/div>)/,
  `$1\n${grupos}$2`
);
fs.writeFileSync(base + 'presentacion.html', deck);

console.log('Recompensas:', filas.length);
tramos.forEach(({ titulo, de, a }) =>
  console.log('  tramo', titulo + ':', filas.filter(f => f.coste >= de && f.coste <= a).length));
