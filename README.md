## Ted Fernandes — Arquiteto de Soluções

Desenho sistemas inteiros: do spec ao deploy, da modelagem de dados ao custo de operação. Prefiro decisão explicada a stack da moda — toda escolha de arquitetura vira documento versionado, com o trade-off à vista.

### Como eu trabalho

- Spec Driven Development — especificação, plano e contratos antes do código. Rastreabilidade de requisito até teste.
- Decisões documentadas (ADR) — o "por quê" fica registrado no repositório e sustenta a revisão técnica.
- Custo e operação dentro do escopo da arquitetura — dimensionamento, limites e sustentabilidade entram no desenho, não depois dele.

### Competências de arquitetura

- Modelagem de dados relacional e migrations versionadas
- Processamento assíncrono: filas, workers, jobs agendados, idempotência
- Autenticação, MFA, RBAC e trilha de auditoria
- Multi-tenant, i18n e acessibilidade como requisito, não como retrabalho
- Observabilidade: log estruturado, métricas e diagnóstico
- Dimensionamento e custo: capacidade, limites e orçamento como restrição de projeto
- Estratégia de testes: unidade, integração, end-to-end e acessibilidade automatizada

### Desenvolvimento com IA

- Claude Code no fluxo de especificação, implementação e revisão
- Servidores MCP para integrar ferramentas e contexto ao ambiente de desenvolvimento
- Orquestração multiagente para dividir trabalho longo em etapas verificáveis
- Automação de browser aplicada a testes e tarefas repetitivas
- Spec Driven Development como guia do trabalho assistido por IA: contrato antes do código, revisão humana antes do merge

### Stack

| Camada | O que uso |
|---|---|
| Front | Next.js (App Router, RSC, Server Actions), React, TypeScript strict, Tailwind CSS, shadcn/ui |
| Back | Node.js, PostgreSQL (pg puro com migrations SQL, ou Prisma quando cabe), Redis, BullMQ |
| Auth & segurança | Auth.js, OAuth, MFA TOTP, RBAC, JOSE, sanitização de conteúdo |
| Produto | Stripe, Web Push, next-intl, Zod, sharp |
| Qualidade | Vitest, Playwright, axe-core, Lighthouse, ESLint |
| Infra & operação | Docker, proxy reverso, serviços gerenciados, Vercel, pino |
| IA aplicada | Claude Code, servidores MCP, orquestração multiagente, automação de browser |
| Dados & visual | Recharts, D3, Three.js, Remotion |

### Contato

Chame pelo GitHub.
