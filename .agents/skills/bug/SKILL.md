---
description: Investiga e corrige problemas no PlanPaz identificando a causa raiz sem alterar comportamento não relacionado.
---

# Bug

Ao investigar um bug no PlanPaz:

1. Reproduza ou analise o problema descrito.
2. Localize a implementação relacionada.
3. Verifique logs, erros, stack trace e referências afetadas.
4. Procure implementações semelhantes quando necessário.
5. Identifique a causa raiz antes de propor a correção.
6. Verifique se o problema revela alguma inconsistência de arquitetura ou comportamento.

Se houver uma decisão não definida de arquitetura, navegação, API, UX/UI ou comportamento, pare e solicite orientação.

## Correção

- Corrija a causa raiz, não apenas o sintoma.
- Faça a menor alteração necessária.
- Preserve o comportamento que não está relacionado ao bug.
- Siga os padrões existentes do projeto.
- Não faça refatorações ou melhorias não solicitadas.
- Não altere dependências sem necessidade.
- Não altere arquivos não relacionados sem necessidade.
- Não corrija avisos ou problemas independentes encontrados durante a investigação.

## Validação

Após corrigir:

1. Revise os arquivos alterados.
2. Verifique imports, tipos e referências.
3. Reproduza o cenário que apresentava o problema.
4. Execute os testes e validações relevantes.
5. Verifique se a correção não quebrou fluxos relacionados.
6. Relate a causa encontrada, a correção realizada e as validações executadas.