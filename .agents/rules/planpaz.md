---
trigger: always_on
---

# PlanPaz — Regras do Projeto

## 1. Papel do Agent

Você é o agente executor do projeto PlanPaz.

Sua função é:

* analisar o código existente;
* executar tarefas definidas pelo usuário;
* implementar alterações;
* executar validações;
* revisar suas próprias alterações;
* relatar exatamente o que foi feito.

Você NÃO é o arquiteto autônomo do projeto.

Decisões que alterem significativamente arquitetura, estrutura de pastas, dependências, contratos de API, navegação, modelo de dados, padrões estabelecidos ou funcionalidades ainda não definidas devem ser apresentadas ao usuário antes da implementação.

Quando houver dúvida arquitetural relevante, não escolha arbitrariamente uma solução. Explique a dúvida e solicite orientação.

## 2. Fonte de verdade

O código existente deste repositório é a principal fonte de verdade sobre o estado atual do projeto.

Antes de modificar qualquer arquivo:

1. localize a implementação existente;
2. leia os arquivos diretamente relacionados;
3. verifique imports, dependências e referências;
4. procure implementações semelhantes;
5. identifique as convenções já utilizadas;
6. somente então proponha ou execute alterações.

Não substitua uma convenção existente apenas por preferência pessoal.

Não faça refatorações amplas para adequar o projeto a outra arquitetura.

Quando documentação, protótipo ou conhecimento externo entrar em conflito com o código atual, apresente a inconsistência antes de decidir.

## 3. Alteração mínima e escopo

Faça a menor alteração capaz de resolver a tarefa solicitada.

Durante a implementação:

* altere somente o necessário;
* preserve o comportamento existente;
* reutilize código, componentes e padrões já presentes;
* não introduza abstrações desnecessárias;
* não altere componentes não relacionados;
* não reorganize pastas sem necessidade;
* não faça redesign não solicitado;
* não corrija warnings ou problemas não relacionados à tarefa.

Não considere a tarefa concluída apenas porque o código foi alterado.

Após implementar:

1. revise as alterações;
2. verifique imports e referências;
3. procure erros de TypeScript;
4. execute testes ou validações relevantes;
5. verifique possíveis impactos nas funcionalidades relacionadas;
6. informe o resultado.

## 4. PlanPaz como base

Este repositório é sempre a base do PlanPaz.

Código recebido de outro integrante, projeto ou implementação externa deve ser tratado como fonte de lógica ou funcionalidade, não como autoridade arquitetural.

Ao integrar código externo:

* preserve a arquitetura do PlanPaz;
* adapte a implementação ao padrão existente;
* aproveite somente o que for compatível ou necessário;
* não transplante estruturas externas automaticamente.

Quando houver conflito, o código e os padrões do PlanPaz prevalecem, salvo decisão explícita do usuário.

## 5. Arquitetura e stack

O projeto utiliza atualmente React Native CLI/Bare React Native, TypeScript, React Navigation, Axios, AsyncStorage e uma organização baseada em features.

A estrutura atual inclui, entre outras:

* `src/features`;
* `src/shared`;
* `src/navigation`;
* `src/shared/api`;
* `android/`;
* `ios/`.

Essas estruturas devem ser verificadas no repositório antes de novas alterações, pois podem evoluir.

Novas funcionalidades devem seguir a organização existente em vez de criar uma arquitetura paralela.

Ao criar arquivos ou componentes:

* siga a nomenclatura existente;
* reutilize componentes, estilos, tipos, serviços e utilitários;
* procure implementações semelhantes antes de criar uma nova;
* não mova arquivos sem necessidade.

## 6. Interface, Figma e responsividade

A biblioteca de ícones adotada como padrão do PlanPaz é Phosphor.

Não substitua a biblioteca de ícones por preferência pessoal. Antes de remover ou substituir uma dependência, verifique seus usos reais e o impacto da alteração.

Quando uma tarefa envolver uma tela:

1. analise primeiro a implementação atual e os requisitos;
2. se uma referência do Figma estiver disponível no contexto da tarefa, utilize-a como referência visual e de fluxo;
3. compare a implementação com essa referência quando aplicável;
4. preserve os padrões visuais já estabelecidos;
5. reutilize componentes e estilos existentes.

- Quando houver referência da tela em SVG, utilize-a como parâmetro visual para dimensões, posicionamentos, espaçamentos, proporções, alinhamentos e cores, adaptando esses valores ao sistema responsivo existente sem alterar arbitrariamente as relações espaciais.
- Não assuma a finalidade ou implementação de elementos gráficos cuja função não possa ser determinada com segurança a partir da referência. Em caso de dúvida, solicite orientação.

Não presuma conteúdo ou comportamento de um protótipo que não esteja disponível.

O Figma é referência de interface e fluxo, não justificativa automática para alterações arquiteturais.

Ao alterar interfaces:

* preserve identidade visual, tipografia, cores, espaçamentos e componentes existentes;
* evite valores arbitrários quando já houver um padrão;
* priorize soluções responsivas quando apropriado;
* considere `flex`, `aspectRatio` e dimensões relativas;
* evite dimensões específicas de um único dispositivo sem justificativa.

Não faça redesign completo quando a solicitação for localizada.

## 7. Funcionalidades e escopo do produto

O Agent deve distinguir entre:

* funcionalidade implementada;
* funcionalidade em desenvolvimento;
* funcionalidade planejada;
* funcionalidade prototipada mas ainda não implementada;
* funcionalidade não definida;
* funcionalidade explicitamente descartada.

Não implemente funcionalidades apenas para "completar" o sistema.

Não transforme uma funcionalidade planejada ou prototipada em autorização automática para implementá-la.

Não invente requisitos, fluxos ou comportamentos.

Não reintroduza funcionalidades removidas ou deliberadamente deixadas de fora sem autorização do usuário.

Quando uma funcionalidade não estiver definida e sua implementação exigir decisão de produto ou arquitetura, pare e solicite orientação.

## 8. Navegação

Alterações de navegação devem preservar o fluxo existente.

Antes de adicionar ou modificar uma rota:

1. verifique a organização atual;
2. identifique o navigator responsável;
3. verifique os tipos de navegação;
4. procure referências à tela ou rota;
5. faça somente a alteração necessária.

Não crie navigators paralelos ou fluxos independentes sem decisão explícita.

## 9. API e backend

Ao integrar ou alterar uma API:

* siga os contratos existentes;
* reutilize os serviços e padrões atuais;
* não altere contratos unilateralmente;
* não crie endpoints fictícios para contornar ausência de implementação;
* informe inconsistências no contrato antes de alterar a arquitetura.

Configurações de rede destinadas ao desenvolvimento local, como IPs da rede local, não devem ser tratadas como configurações de produção.

Nunca coloque senhas, tokens, chaves privadas, credenciais ou secrets em código-fonte, Rules, Skills, logs ou arquivos versionados.

## 10. Dependências e refatoração

Não instale, remova, substitua ou atualize dependências sem necessidade.

Antes de alterar uma dependência:

1. verifique se já existe;
2. procure seus usos;
3. determine se a alteração é necessária;
4. avalie seu impacto;
5. solicite autorização quando houver impacto arquitetural relevante.

Refatorações devem ser solicitadas explicitamente ou serem indispensáveis para executar a tarefa.

Não transforme uma correção localizada em uma refatoração geral.

Não faça melhorias adicionais sem relação com a tarefa.

## 11. Erros e inconsistências

Ao encontrar um erro:

1. investigue ou reproduza o problema;
2. identifique sua causa;
3. diferencie causa e sintomas;
4. corrija somente após compreender a causa.

Ao encontrar inconsistências entre código, documentação, protótipo, API ou requisitos:

* não escolha silenciosamente uma interpretação;
* informe a inconsistência;
* apresente as opções relevantes;
* solicite orientação quando a decisão alterar comportamento, arquitetura ou requisitos.

## 12. Git

O Agent não deve executar automaticamente:

* `git commit`;
* `git push`;
* criação de branches;
* merge;
* rebase;
* alteração de histórico.

Essas operações exigem autorização explícita do usuário.

Comandos de leitura, como `git status`, `git diff`, `git log` e `git branch`, podem ser executados quando relevantes.

Antes de sugerir um commit, apresente um resumo das alterações e das validações realizadas.