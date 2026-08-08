// Desenha a faixa de linguagens do perfil a partir do JSON do contar.mjs.
//
//   node scripts/graficos.mjs <dados.json>   →  escreve charts/*.svg
//
// Duas versões por idioma porque o GitHub remove <style>: a mesma imagem aparece
// no tema claro (#ffffff) e no escuro (#0d1117), e o README escolhe via
// <picture><source media="(prefers-color-scheme: dark)">, que o sanitizador preserva.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const dados = JSON.parse(readFileSync(process.argv[2] || 'dados.json', 'utf8'));
const OUT = 'charts';
mkdirSync(OUT, { recursive: true });

const FONTE = 'ui-sans-serif,-apple-system,Segoe UI,Helvetica,Arial,sans-serif';

// Verde do calendário de contribuições do GitHub, com as pontas comprimidas: a rampa
// original tem um extremo que encosta no fundo do próprio tema, e aqui as cinco fatias
// precisam aparecer — inclusive a menor, que fica na casa de 1%.
const TEMAS = {
  light: { texto: '#57606a', rampa: ['#1a5c30', '#216e39', '#30a14e', '#40c463', '#7ee094'] },
  dark: { texto: '#9198a1', rampa: ['#56e06b', '#39d353', '#26a641', '#1a8f3c', '#0e6b2c'] },
};

const TOP = 5;
const linguagens = dados.linguagens.slice(0, TOP);
const total = linguagens.reduce((s, l) => s + l.linhas, 0);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function faixa(titulo, tema, arquivo) {
  const { texto, rampa } = TEMAS[tema];
  const W = 720, Y = 24, H_BARRA = 16, H = 74;

  let x = 0;
  const fatias = linguagens.map((l, i) => {
    const w = (l.linhas / total) * W;
    const s = `<rect x="${x.toFixed(1)}" y="${Y}" width="${w.toFixed(1)}" height="${H_BARRA}" fill="${rampa[i]}"/>`;
    x += w;
    return s;
  }).join('');

  let lx = 0;
  const legenda = linguagens.map((l, i) => {
    const pct = ((l.linhas / total) * 100).toFixed(1).replace('.', ',');
    const rotulo = `${l.nome} ${pct}%`;
    const s = `<circle cx="${lx + 4}" cy="${Y + 36}" r="4" fill="${rampa[i]}"/>`
      + `<text x="${lx + 14}" y="${Y + 40}" font-family="${FONTE}" font-size="12" fill="${texto}">${esc(rotulo)}</text>`;
    lx += 24 + rotulo.length * 6.7;
    return s;
  }).join('');

  writeFileSync(`${OUT}/${arquivo}`, `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(titulo)}">
<title>${esc(titulo)}</title>
<text x="0" y="12" font-family="${FONTE}" font-size="12" font-weight="600" fill="${texto}">${esc(titulo)}</text>
<g>${fatias}</g>
<g>${legenda}</g>
</svg>`);
}

const mil = Math.round(dados.total / 1000);
const T_PT = `${mil} mil linhas em ${dados.repos} repositórios, por linguagem`;
const T_EN = `${mil}k lines across ${dados.repos} repositories, by language`;

faixa(T_PT, 'light', 'linguagens-light.svg');
faixa(T_PT, 'dark', 'linguagens-dark.svg');
faixa(T_EN, 'light', 'linguagens-en-light.svg');
faixa(T_EN, 'dark', 'linguagens-en-dark.svg');

// o alt do README precisa acompanhar o gráfico, senão o leitor de tela lê número velho
const alt = l => l.map(x => `${x.nome} ${((x.linhas / total) * 100).toFixed(1)}%`).join(', ');
console.log(`ok — ${dados.repos} repositórios, ${dados.total.toLocaleString('pt-BR')} linhas`);
console.log(`alt PT: ${T_PT}: ${alt(linguagens).replace(/\./g, ',')}`);
console.log(`alt EN: ${T_EN}: ${alt(linguagens)}`);
