---
description: Analisa o código do PlanPaz de forma sistemática, identificando problemas, riscos e oportunidades de melhoria sem modificar o projeto.
---

# Code Review

Ao revisar código do PlanPaz:

1. Analise o código e seu contexto dentro do projeto.
2. Verifique as implementações relacionadas e padrões semelhantes.
3. Considere arquitetura, legibilidade, manutenção, tipos, dependências e comportamento.
4. Verifique possíveis problemas de segurança, desempenho e tratamento de erros quando forem relevantes.
5. Diferencie problemas reais de preferências ou melhorias opcionais.

## Revisão

- Não altere o código durante a revisão, a menos que isso seja solicitado.
- Priorize problemas que possam causar bugs, regressões ou dificuldades de manutenção.
- Verifique se o código segue os padrões existentes do PlanPaz.
- Não proponha substituição de bibliotecas ou arquitetura apenas por preferência.
- Não considere uma diferença de estilo como problema se ela for compatível com os padrões do projeto.
- Não expanda o escopo da revisão para arquivos não relacionados sem necessidade.

## Resultado

Organize os achados por prioridade:

1. **Crítico** — pode causar falha grave, perda de dados ou vulnerabilidade.
2. **Alto** — pode causar bugs ou regressões relevantes.
3. **Médio** — problema de manutenção, consistência ou comportamento potencial.
4. **Baixo** — melhoria menor ou questão de qualidade.

Para cada achado, informe:

- arquivo e localização;
- problema encontrado;
- impacto;
- correção recomendada, quando aplicável.

Ao final, informe também se não foram encontrados problemas relevantes.