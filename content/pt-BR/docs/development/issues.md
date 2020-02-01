# Questões com o Electron

* [How to Contribute to Issues](#how-to-contribute-to-issues)
* [Perguntas Sobre de Ajuda Geral](#asking-for-general-help)
* [Enviando um Relatório de Erro](#submitting-a-bug-report)
* [Fazendo Triagem de um Relatório de Erro](#triaging-a-bug-report)
* [Resolvendo um Relatório de Erro](#resolving-a-bug-report)

## How to Contribute to Issues

Para qualquer problema, existem fundamentalmente três maneiras que alguém pode contribuir:

1. By opening the issue for discussion: If you believe that you have found a new bug in Electron, you should report it by creating a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues).
2. Ajudando a fazer uma triagem acerca do problema: Você pode fazer-lo fornecendo detalhes assistivos (um teste o qual apresenta um bug) ou fornecer sugestões para ajudar com o problema.
3. Ajudando à resolver o problema: Isso pode ser feito demonstrando que o problema não é problema ou já foi resolvido; so que mais frequentemente, abrindo uma requisição à qual muda a fonte do problema no `electron/electron` de uma forma concreta e revisável.

## Perguntas Sobre de Ajuda Geral

["Encontrando Suporte"](../tutorial/support.md#finding-support) tem uma lista com informações para obter ajuda de programação, reportar problemas de segurança, contribuir e mais. Por favor, utilize o rastreador de problemas apenas para bugs!

## Enviando um Relatório de Erro

To submit a bug report:

When opening a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues/new/choose), users will be presented with a template that should be filled in.

```markdown
<!--
Obrigado por abrir um problema! Algumas coisas para levar em consideração:

- O rastreador de problemas é apenas para bugs e requisição de novas funcionalidades.
- Antes de reportar um bug, por favor, tente reproduzir o problema com a versão mais recente do Electron.
- Se você precisa de uma ajuda em geral, entre no nosso Slack: http://atom-slack.herokuapp.com
-->

* Versão do Electron:
* Sistema Operacional:

### Comportamento Esperado

<!-- O que você acha que deveria acontecer? -->

### Comportamento Atual

<-- O que realmente acontece? -->

### Como reproduzir

<!--

A sua melhor chance de ter esse bug verificado rapidamente é provendo um REPOSITÓRIO que possa ser clonado e executado.

Você pode fazer o fork do https://github.com/electron/electron-quick-start e incluir um link para o branch com suas alterações.

Se você prover uma URL, por favor liste os comandos necessários para clonar/instalar/rodar o seu repositório. Por exemplo:

  $ git clone $SUA_URL -b $BRANCH
  $ npm install
  $ npm start || electron .

-->
```

If you believe that you have found a bug in Electron, please fill out this form to the best of your ability.

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It is easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## Fazendo Triagem de um Relatório de Erro

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## Resolvendo um Relatório de Erro

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.