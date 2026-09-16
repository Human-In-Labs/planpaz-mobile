---
description: Integra e utiliza APIs no PlanPaz seguindo os contratos, serviços e padrões existentes no projeto.
---

# API

Ao trabalhar com uma API no PlanPaz:

1. Analise a estrutura atual de `src/shared/api`.
2. Procure serviços, clientes HTTP, tipos e integrações semelhantes já existentes.
3. Verifique como o projeto configura requisições, autenticação, tratamento de erros e armazenamento de dados.
4. Identifique o contrato da API disponível no contexto da tarefa.
5. Não invente endpoints, parâmetros, respostas ou comportamentos que não estejam definidos.
6. Identifique previamente qualquer decisão não definida que envolva arquitetura ou contrato da API.

Se houver uma decisão relevante não definida, pare e solicite orientação antes de implementar.

## Implementação

- Siga os padrões existentes de `src/shared/api`.
- Reutilize o cliente HTTP, tipos e utilitários existentes quando apropriado.
- Preserve o contrato existente da API.
- Integre somente os endpoints e comportamentos solicitados.
- Mantenha autenticação e tratamento de erros consistentes com o projeto.
- Não crie serviços ou abstrações duplicadas.
- Não altere o backend para resolver uma necessidade do frontend sem solicitação explícita.
- Não introduza dependências sem necessidade.
- Não altere arquivos não relacionados sem necessidade.

Se a tarefa exigir alteração ou definição de contrato da API, arquitetura ou backend, pare e solicite orientação.

## Validação

Após implementar:

1. Revise os arquivos criados e alterados.
2. Verifique imports, tipos, endpoints e parâmetros.
3. Verifique o tratamento das respostas e erros.
4. Verifique a integração com as telas ou funcionalidades afetadas.
5. Execute as validações e testes relevantes.
6. Relate as alterações e validações realizadas.