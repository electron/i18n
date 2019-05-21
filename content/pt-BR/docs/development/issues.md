# Questões com o Electron

* [Como Contribuir com Problemas](#how-to-contribute-in-issues)
* [Perguntas Sobre de Ajuda Geral](#asking-for-general-help)
* [Enviando um Relatório de Erro](#submitting-a-bug-report)
* [Fazendo Triagem de um Relatório de Erro](#triaging-a-bug-report)
* [Resolvendo um Relatório de Erro](#resolving-a-bug-report)

## Como Contribuir com Questões

Para qualquer problema, existem fundamentalmente três maneiras que alguém pode contribuir:

1. Abrindo o problema para discussão: Se você acredita ter encontrado um novo bug no Electron, você deverá reportar criando um novo problema no Rastreadpr de problemas `electron/electron`.
2. Ajudando a fazer uma triagem acerca do problema: Você pode fazer-lo fornecendo detalhes assistivos (um teste o qual apresenta um bug) ou fornecer sugestões para ajudar com o problema.
3. Ajudando à resolver o problema: Isso pode ser feito demonstrando que o problema não é problema ou já foi resolvido; so que mais frequentemente, abrindo uma requisição à qual muda a fonte do problema no `electron/electron` de uma forma concreta e revisável.

## Perguntas Sobre de Ajuda Geral

["Encontrando Suporte"](../tutorial/support.md#finding-support) tem uma lista com informações para obter ajuda de programação, reportar problemas de segurança, contribuir e mais. Por favor, utilize o rastreador de problemas apenas para bugs!

## Enviando um Relatório de Erro

Quanto forem abrir um novo problema no rastreador de problemas do `electron/electron`, será apresentado aos usuários um modelo que deve ser preenchido.

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

Se você acredita ter encontrado um bug no Electron, por favor preencha este formulário da melhor forma que você conseguir.

As duas informações mais importantes necessárias para avaliar o relato de um bug são a descrição e um caso de teste simples para recriá-lo. É mais fácil corrigir um bug se for possível reproduzi-lo.

Veja [Como criar um exemplo Mínimo, Completo e Verificável](https://stackoverflow.com/help/mcve).

## Fazendo Triagem de um Relatório de Erro

É comum que questões abertas envolvam discussão. Alguns contribuidores podem diferir em opiniões em relação ao comportamento ser um bug ou uma característica. Esta discussão faz parte do processo e deve ser mantida em foco, útil, e profissional.

Respostas que não fornecem contexto adicional nem detalhes de suporte não são úteis ou profissionais. Para muitos, essas respostas são irritantes e nada amigáveis.

Os colaboradores são encorajados a resolver problemas colaborativamente e ajudar uns aos outros a fazer progresso. Se encontrar um problema que você sente ser inválido, ou que contém informações incorretas, explique *por que* você se sente assim, adicionando contexto adicional, e esteja disposto a ser convencido de que você pode está errado. Ao fazê-lo, podemos frequentemente chegar mais rapidamente ao resultado correto.

## Resolvendo um Relatório de Erro

A maioria das questões são resolvidas abrindo um pull request. O processo para abertura e revisão de um pull request é semelhante ao de abertura e triagem de questões, mas carrega consigo um fluxo de trabalho de revisão e aprovação necessário que garante que as alterações propostas atendem às orientações de qualidade mínima e funcionais do projeto Electron.