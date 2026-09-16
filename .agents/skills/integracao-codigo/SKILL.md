---
description: Integra código externo ao PlanPaz adaptando-o à arquitetura, padrões e contratos existentes sem transplantar estruturas incompatíveis.
---

# Integração de Código

Ao integrar código externo ao PlanPaz:

1. Analise o código externo e identifique sua finalidade.
2. Analise a implementação correspondente no PlanPaz.
3. Compare arquitetura, estrutura de pastas, nomenclatura, dependências, tipos e padrões utilizados.
4. Identifique quais partes são realmente compatíveis e úteis.
5. Identifique conflitos ou decisões de arquitetura que não estejam definidas.

## Implementação

- O PlanPaz é sempre a base da integração.
- Adapte a lógica externa aos padrões existentes do PlanPaz.
- Preserve a arquitetura e organização já utilizadas no projeto.
- Reutilize componentes, serviços, tipos e utilitários existentes quando apropriado.
- Não transplante estruturas, pastas ou padrões do código externo apenas porque funcionam nele.
- Não substitua bibliotecas ou dependências existentes sem necessidade.
- Não copie funcionalidades que estejam fora do escopo solicitado.
- Faça somente as alterações necessárias para integrar o código.

Se houver conflito de arquitetura, dependências, API, navegação ou comportamento que exija uma decisão não definida, pare e solicite orientação.

## Validação

Após integrar:

1. Revise todos os arquivos criados e alterados.
2. Verifique imports, tipos, dependências e referências.
3. Verifique a integração com a arquitetura existente.
4. Execute os testes e validações relevantes.
5. Verifique se funcionalidades existentes continuam funcionando.
6. Relate quais partes do código externo foram aproveitadas, quais foram adaptadas e quais foram descartadas.