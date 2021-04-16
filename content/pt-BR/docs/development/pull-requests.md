# Pull Requests

* [Configurando seu ambiente local](#setting-up-your-local-environment)
  * [Passo 1: Garfo](#step-1-fork)
  * [Passo 2: Construir](#step-2-build)
  * [Passo 3: Filial](#step-3-branch)
* [Fazendo mudanças](#making-changes)
  * [Passo 4: Código](#step-4-code)
  * [Passo 5: Comprometa-se](#step-5-commit)
    * [Enviar diretrizes de mensagem](#commit-message-guidelines)
  * [Passo 6: Rebase](#step-6-rebase)
  * [Passo 7: Teste](#step-7-test)
  * [Passo 8: Empurrar](#step-8-push)
  * [Passo 9: Abrindo a solicitação de atração](#step-9-opening-the-pull-request)
  * [Passo 10: Discutir e Atualizar](#step-10-discuss-and-update)
    * [Fluxo de trabalho de aprovação e solicitação](#approval-and-request-changes-workflow)
  * [Passo 11: Aterrissagem](#step-11-landing)
  * [Teste de integração contínua](#continuous-integration-testing)

## Configurando seu ambiente local

### Passo 1: Garfo

Bifurque o projeto [no GitHub](https://github.com/electron/electron) e clone seu garfo localmente.

```sh
$ git clone git@github.com:username/electron.git
$ cd electron
$ git remote add upstream https://github.com/electron/electron.git
$ git fetch upstream
```

### Passo 2: Construir

As etapas e dependências de construção diferem ligeiramente dependendo do seu sistema operacional. Veja estes guias detalhados sobre a construção de elétrons localmente:

* [Baseando-se no macOS](build-instructions-macos.md)
* [Baseando-se no Linux](build-instructions-linux.md)
* [Construindo no Windows](build-instructions-windows.md)

Uma vez que você construiu o projeto localmente, você está pronto para começar a fazer mudanças!

### Passo 3: Filial

Para manter seu ambiente de desenvolvimento organizado, crie filiais locais para manter seu trabalho. Estes devem ser ramificados diretamente fora do ramo `master` .

```sh
$ git checkout -b my-branch -t upstream/master
```

## Fazendo mudanças

### Passo 4: Código

A maioria das solicitações de tração abertas contra o repositório `electron/electron` incluem alterações no código C/C++ na pasta `shell/` , o código JavaScript na pasta `lib/` , a documentação em `docs/api/` ou testes na pasta `spec/` .

Por favor, certifique-se de executar `npm run lint` de tempos em tempos em quaisquer alterações de código para garantir que eles sigam o estilo de código do projeto.

Consulte [estilo de codificação](coding-style.md) para mais informações sobre as melhores práticas ao modificar o código em diferentes partes do projeto.

### Passo 5: Comprometa-se

Recomenda-se manter suas mudanças agrupadas logicamente dentro de compromissos individuais . Muitos colaboradores acham mais fácil rever as alterações que são divididas em vários compromissos. Não há limite para o número de compromissos em uma solicitação de de retirada.

```sh
$ git add my/changed/files
$ git commit
```

Note que vários compromissos geralmente são esmagados quando são aterrissados.

#### Enviar diretrizes de mensagem

Uma boa mensagem de compromisso deve descrever o que mudou e por quê. O projeto Electron usa mensagens de compromisso [semânticas](https://conventionalcommits.org/) para agilizar processo de liberação.

Antes que uma solicitação de tração possa ser mesclada, **deve** ter um título de solicitação de tração com um prefixo semântico.

Exemplos de enviar mensagens com prefixos semânticos:

* `correção: não sobrescreva prevent_default se o padrão não foi impedido`
* `feat: adicionar método app.isPackaged()`
* `docs: app.isDefaultProtocolClient já está disponível no Linux`

Prefixos comuns:

* correção: Uma correção de bug
* feat: Um novo recurso
* docs: Alterações de documentação
* teste: Adicionando testes faltando ou corrigindo testes existentes
* construção: Mudanças que afetam o sistema de construção
* ci: Alterações em nossos arquivos de configuração de CI e scripts
* perf: Uma mudança de código que melhora o desempenho
* refator: Uma mudança de código que não corrige um bug nem adiciona um recurso
* estilo: Mudanças que não afetam o significado do código (fiação)
* fornecedor: Esbarrando em uma dependência como libcromiumcontent ou nó

Outras coisas a ter em mente ao escrever uma mensagem de compromisso:

1. A primeira linha deve:
   * contêm uma breve descrição da alteração (de preferência 50 caracteres ou menos, e não mais do que 72 caracteres)
   * estar inteiramente em minúsculas, com exceção de substantivos, siglas e palavras que se referem a código, como nome de função/variável
2. Mantenha a segunda linha em branco.
3. Enrole todas as outras linhas em 72 colunas.

#### Quebrando mudanças

Um compromisso que tem o texto `BREAKING CHANGE:` no início de sua seção opcional de corpo ou rodapé introduz uma mudança de API de ruptura (correlacionando-se com o Major em versão semântica). Uma mudança de ruptura pode ser parte de compromissos de qualquer tipo. por exemplo, um `fix:`, `feat:` & `chore:` tipos seriam todos válidos, além de qualquer outro tipo.

Consulte [conventionalcommits.org](https://conventionalcommits.org) para mais detalhes.

### Passo 6: Rebase

Uma vez que você tenha comprometido suas alterações, é uma boa ideia usar `git rebase` (não `git merge`) para sincronizar seu trabalho com o repositório principal.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

Isso garante que seu ramo de trabalho tenha as últimas alterações de `electron/electron` mestre.

### Passo 7: Teste

Correções e recursos de bugs devem sempre vir com testes. Um guia de testes [](testing.md) foi fornecido para facilitar o processo. Olhar para outros testes para ver como eles devem ser estruturados também pode ajudar.

Antes de enviar suas alterações em uma solicitação de tração, execute sempre o conjunto completo de de teste. Para executar os testes:

```sh
$ npm run test
```

Certifique-se de que o linter não reporte quaisquer problemas e que todos os testes passem. Por favor, não envie patches que falham em nenhum dos dois verificares.

Se você estiver atualizando os testes e quiser executar uma única especificação para verificar:

```sh
$ npm run test -match=menu
```

O acima só executaria módulos de especificação que correspondem `menu`, o que é útil para qualquer um que esteja trabalhando em testes que de outra forma estariam no final de ciclo de testes.

### Passo 8: Empurrar

Uma vez que seus compromissos estejam prontos para ir - com testes de aprovação e linting - iniciar o processo de abertura de uma solicitação de tração empurrando sua filial de trabalho para o seu garfo no GitHub.

```sh
$ git push origin my-branch
```

### Passo 9: Abrindo a solicitação de atração

A partir do GitHub, a abertura de uma nova solicitação de tração lhe apresentará um modelo que deve ser preenchido:

```markdown
<!--
obrigado pelo pedido de atração. Por favor, forneça uma descrição acima e revise
os requisitos abaixo.

Correções de bugs e novos recursos devem incluir testes e possivelmente benchmarks.

Contributors guide: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### Step 10: Discuss and update

You will probably get feedback or requests for changes to your pull request. This is a big part of the submission process so don't be discouraged! Some contributors may sign off on the pull request right away. Others may have detailed comments or feedback. This is a necessary part of the process in order to evaluate whether the changes are correct and necessary.

To make changes to an existing pull request, make the changes to your local branch, add a new commit with those changes, and push those to your fork. GitHub will automatically update the pull request.

```sh
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

There are a number of more advanced mechanisms for managing commits using `git rebase` that can be used, but are beyond the scope of this guide.

Feel free to post a comment in the pull request to ping reviewers if you are awaiting an answer on something. If you encounter words or acronyms that seem unfamiliar, refer to this [glossary](https://sites.google.com/a/chromium.org/dev/glossary).

#### Fluxo de trabalho de aprovação e solicitação

All pull requests require approval from a [Code Owner](https://github.com/electron/electron/blob/master/.github/CODEOWNERS) of the area you modified in order to land. Whenever a maintainer reviews a pull request they may request changes. These may be small, such as fixing a typo, or may involve substantive changes. Such requests are intended to be helpful, but at times may come across as abrupt or unhelpful, especially if they do not include concrete suggestions on *how* to change them.

Try not to be discouraged. If you feel that a review is unfair, say so or seek the input of another project contributor. Often such comments are the result of a reviewer having taken insufficient time to review and are not ill-intended. Such difficulties can often be resolved with a bit of patience. That said, reviewers should be expected to provide helpful feedback.

### Passo 11: Aterrissagem

In order to land, a pull request needs to be reviewed and approved by at least one Electron Code Owner and pass CI. After that, if there are no objections from other contributors, the pull request can be merged.

Congratulations and thanks for your contribution!

### Teste de integração contínua

Every pull request is tested on the Continuous Integration (CI) system to confirm that it works on Electron's supported platforms.

Ideally, the pull request will pass ("be green") on all of CI's platforms. This means that all tests pass and there are no linting errors. However, it is not uncommon for the CI infrastructure itself to fail on specific platforms or for so-called "flaky" tests to fail ("be red"). Each CI failure must be manually inspected to determine the cause.

CI starts automatically when you open a pull request, but only core maintainers can restart a CI run. If you believe CI is giving a false negative, ask a maintainer to restart the tests.
