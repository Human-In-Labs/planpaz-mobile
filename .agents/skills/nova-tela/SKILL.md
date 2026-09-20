---

## description: Cria novas telas do PlanPaz seguindo a arquitetura, os padrões visuais e o fluxo de navegação existentes no projeto.

# Nova Tela

Ao criar uma nova tela do PlanPaz:

1. Analise a implementação atual em `src/features` e procure telas semelhantes.
2. Verifique a organização e os tipos de navegação existentes.
3. Identifique componentes, estilos, tipos e utilitários reutilizáveis.
4. Se houver referência do Figma disponível no contexto da tarefa, utilize-a para interface e fluxo.
5. Identifique previamente qualquer decisão não definida que envolva arquitetura, navegação, API ou comportamento da tela.

Se existir uma decisão relevante não definida, pare e solicite orientação antes de implementar.

## Implementação

* Siga a estrutura e nomenclatura encontradas no projeto.
* Reutilize componentes, estilos, tipos, serviços e utilitários existentes quando apropriado.
* Preserve a identidade visual do PlanPaz.
* Implemente a interface de forma responsiva.
* Integre a tela à navegação existente quando necessário.
* Implemente somente o comportamento solicitado.
* Não crie funcionalidades adicionais por iniciativa própria.
* Não altere arquivos não relacionados sem necessidade.

## Validação

Após implementar:

1. Revise todos os arquivos criados e alterados.
2. Verifique imports, tipos e referências.
3. Verifique a integração com a navegação.
4. Execute as validações e testes relevantes disponíveis no projeto.
5. Verifique se a nova tela não quebra fluxos existentes.
6. Relate o que foi alterado e quais validações foram executadas.

- Não assuma componentes, comportamentos, rotas ou elementos de UI apenas porque são utilizados em outras telas.
- Diferencie padrões estruturais existentes de requisitos específicos da nova tela.
- Só implemente navegação, ações ou componentes específicos quando forem necessários ao fluxo solicitado ou quando sua utilização fizer parte do padrão aplicável identificado no projeto.