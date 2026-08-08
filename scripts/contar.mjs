// Conta linhas de código-fonte por linguagem.
//
//   node scripts/contar.mjs <diretorio>   →  JSON no stdout
//
// <diretorio> é uma pasta cujos subdiretórios são repositórios clonados.
// Como a Action clona com --depth 1, não existe node_modules nem build ali —
// as exclusões abaixo são cinto de segurança para rodar também numa pasta
// de trabalho local, onde existem.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const RAIZ = process.argv[2];
if (!RAIZ) { console.error('uso: node scripts/contar.mjs <diretorio>'); process.exit(1); }

const IGNORA = new Set([
  'node_modules', '.git', '.next', 'dist', 'build', 'out', 'coverage',
  '.turbo', 'test-results', 'playwright-report', '_backups', 'tmp', 'var',
]);

const EXT = {
  '.ts': 'TypeScript', '.tsx': 'TypeScript',
  '.js': 'JavaScript', '.mjs': 'JavaScript', '.cjs': 'JavaScript',
  '.py': 'Python', '.sql': 'SQL', '.css': 'CSS', '.go': 'Go', '.rs': 'Rust',
};

// arquivo gerado, minificado ou de lock não é código escrito
const DESCARTA = /(-lock\.|\.lock$|\.min\.|\.d\.ts$|\.generated\.)/;

let linhas = {};
function andar(dir, prof = 0) {
  if (prof > 10) return;
  let itens;
  try { itens = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const it of itens) {
    if (it.name.startsWith('.')) continue;
    const caminho = join(dir, it.name);
    if (it.isDirectory()) { if (!IGNORA.has(it.name)) andar(caminho, prof + 1); continue; }
    const ling = EXT[it.name.slice(it.name.lastIndexOf('.'))];
    if (!ling || DESCARTA.test(it.name)) continue;
    try {
      if (statSync(caminho).size > 2_000_000) continue;   // arquivo gigante é gerado
      linhas[ling] = (linhas[ling] || 0) + readFileSync(caminho, 'utf8').split('\n').length;
    } catch { /* binário ou sem permissão */ }
  }
}

// Conta repo a repo: repositório sem nenhuma linha de código não entra na conta
// (repo vazio, só-README, só-assets) — senão o denominador infla sem motivo.
const total = {};
const porRepo = [];
for (const r of readdirSync(RAIZ, { withFileTypes: true }).filter(d => d.isDirectory())) {
  linhas = {};
  andar(join(RAIZ, r.name));
  const n = Object.values(linhas).reduce((s, v) => s + v, 0);
  if (n === 0) continue;
  porRepo.push({ repo: r.name, linhas: n });
  for (const [k, v] of Object.entries(linhas)) total[k] = (total[k] || 0) + v;
}

const ordenado = Object.entries(total).sort((a, b) => b[1] - a[1]);
console.log(JSON.stringify({
  repos: porRepo.length,
  total: ordenado.reduce((s, [, n]) => s + n, 0),
  linguagens: ordenado.map(([nome, n]) => ({ nome, linhas: n })),
  porRepo: porRepo.sort((a, b) => b.linhas - a.linhas),
}, null, 2));
