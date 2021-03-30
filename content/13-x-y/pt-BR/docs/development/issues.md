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

When opening a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues/new/choose), users will be presented with [a template](https://github.com/electron/electron/blob/master/.github/ISSUE_TEMPLATE/Bug_report.md) that should be filled in.

If you believe that you have found a bug in Electron, please fill out the template to the best of your ability.

As duas informações mais importantes necessárias para avaliar o relato de um bug são a descrição e um caso de teste simples para recriá-lo. It is easier to fix a bug if it can be reproduced.

Veja [Como criar um exemplo Mínimo, Completo e Verificável](https://stackoverflow.com/help/mcve).

## Fazendo Triagem de um Relatório de Erro

É comum que questões abertas envolvam discussão. Alguns contribuidores podem diferir em opiniões em relação ao comportamento ser um bug ou uma característica. Esta discussão faz parte do processo e deve ser mantida em foco, útil, e profissional.

Respostas que não fornecem contexto adicional nem detalhes de suporte não são úteis ou profissionais. Para muitos, essas respostas são irritantes e nada amigáveis.

Os colaboradores são encorajados a resolver problemas colaborativamente e ajudar uns aos outros a fazer progresso. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. Ao fazê-lo, podemos frequentemente chegar mais rapidamente ao resultado correto.

## Resolvendo um Relatório de Erro

A maioria das questões são resolvidas abrindo um pull request. O processo para abertura e revisão de um pull request é semelhante ao de abertura e triagem de questões, mas carrega consigo um fluxo de trabalho de revisão e aprovação necessário que garante que as alterações propostas atendem às orientações de qualidade mínima e funcionais do projeto Electron.
