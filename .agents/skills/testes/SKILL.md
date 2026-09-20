---
description: Cria e mantém testes do PlanPaz seguindo a estrutura, ferramentas e padrões de teste já existentes no projeto.
---

# Testes

Ao trabalhar com testes no PlanPaz:

1. Analise a configuração atual de testes do projeto.
2. Procure testes semelhantes e identifique seus padrões.
3. Localize a implementação que será testada.
4. Identifique os comportamentos que precisam ser cobertos.
5. Não invente comportamentos ou critérios de validação que não façam parte da tarefa.

## Implementação

- Siga os padrões de testes existentes.
- Utilize as ferramentas e configurações já presentes no projeto.
- Priorize testes de comportamento e resultados relevantes para a funcionalidade.
- Reutilize mocks, fixtures e utilitários existentes quando apropriado.
- Não altere a implementação apenas para facilitar um teste sem necessidade.
- Não crie infraestrutura de testes duplicada.
- Não introduza dependências sem necessidade.
- Não altere testes não relacionados à tarefa.

Se a criação ou alteração dos testes exigir uma decisão não definida de arquitetura, comportamento ou contrato da API, pare e solicite orientação.

## Validação

Após implementar:

1. Execute os testes relacionados à alteração.
2. Verifique se os testes passam.
3. Quando apropriado, execute também a suíte de testes afetada.
4. Revise os testes para garantir que realmente validam o comportamento esperado.
5. Relate os testes executados e seus resultados.