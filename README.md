## Ted Fernandes — Arquiteto de Soluções

Desenho sistemas inteiros: do spec ao deploy, da modelagem de dados ao custo do servidor no fim do mês. Prefiro decisão explicada a stack da moda — toda escolha de arquitetura vira documento versionado, com o trade-off à vista.

### Como eu trabalho

- Spec Driven Development — especificação, plano e contratos antes do código. Rastreabilidade de requisito até teste.
- Decisões documentadas (ADR) — o "por quê" fica no repositório, não na memória de quem estava na reunião.
- Do produto à operação — quem desenha o sistema também sobe, monitora e paga a conta. Arquitetura que ignora custo e operação não é arquitetura, é desenho.

### Competências de arquitetura

- Modelagem de dados relacional e migrations versionadas
- Processamento assíncrono: filas, workers, jobs agendados, idempotência
- Autenticação, MFA, RBAC e trilha de auditoria
- Multi-tenant, i18n e acessibilidade como requisito, não como retrabalho
- Observabilidade: log estruturado, métricas e diagnóstico em produção
- Dimensionamento e custo: capacidade, limites e o que cabe no orçamento real
- Estratégia de testes: unidade, integração, end-to-end e acessibilidade automatizada

### Stack

| Camada | O que uso |
|---|---|
| Front | Next.js (App Router, RSC, Server Actions), React, TypeScript strict, Tailwind CSS, shadcn/ui |
| Back | Node.js, PostgreSQL pg puro com migrations SQL, ou Prisma quando cabe), Redis, BullMQ |
| Auth & segurança | Auth.js, OAuth, MFA TOTP, RBAC, JOSE, sanitização de conteúdo |
| Produto | Stripe, Web Push, next-intl, Zod, sharp |
| Qualidade | Vitest, Playwright, axe-core, Lighthouse, ESLint |
| Infra & operação | Docker Compose, Caddy, systemd, VPS ARM64, Vercel, pino |
| IA aplicada | Claude Code, servidores MCP, orquestração multiagente, automação de browser |
| Dados & visual | Recharts, D3, Three.js, Remotion |

### Contato

tedfernandes@gmail.com
