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

Guia de contribuintes: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
->
```

### Passo 10: Discutir e atualizar

Você provavelmente receberá feedback ou pedidos de alterações na sua solicitação de atração. Esta é uma grande parte do processo de submissão, então não desanime! Alguns contribuintes podem assinar o pedido de retirada imediatamente. Outros podem ter comentários ou comentários detalhados. Esta é uma parte necessária do processo para avaliar se as mudanças são corretas e necessárias.

Para fazer alterações em uma solicitação de tração existente, faça as alterações em sua filial local de , adicione um novo compromisso com essas alterações e empurre-as para o seu garfo. O GitHub atualizará automaticamente a solicitação de tração.

```sh
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

Existem uma série de mecanismos mais avançados para gerenciar compromissos usando `git rebase` que podem ser usados, mas estão além do escopo deste guia.

Sinta-se livre para postar um comentário na solicitação de atração para os revisores de ping se você está aguardando uma resposta sobre algo. Se você encontrar palavras ou siglas que parecem desconhecidas, consulte este</a>glossário

.</p> 



#### Fluxo de trabalho de aprovação e solicitação

Todos os pedidos de retirada requerem aprovação de um proprietário de código [](https://github.com/electron/electron/blob/master/.github/CODEOWNERS) da área que você modificou para pousar. Sempre que um mantenedor revisar uma solicitação de tração, eles podem solicitar alterações. Estes podem ser pequenos, como corrigir um erro de digitação, ou podem envolver alterações substantivas. Tais pedidos visam ser úteis, mas às vezes podem parecer abruptas ou inúteis, especialmente se não incluem sugestões concretas sobre *como* mudá-las.

Tente não se desanimar. Se você acha que uma revisão é injusta, diga ou procure a entrada de outro colaborador do projeto. Muitas vezes, tais comentários são resultado de um revisor ter tido tempo insuficiente para ser revisto e não são mal intencionados. Tais dificuldades muitas vezes podem ser resolvidas com um pouco de paciência. Dito isto, espera-se que os revisores forneçam feedback útil.



### Passo 11: Aterrissagem

Para aterrissar, uma solicitação de retirada precisa ser revisada e aprovada por pelo menos um Proprietário de Código Eletrônico e passar ci. Depois disso, se não houver objeções de outros contribuintes, o pedido de retirada pode ser mesclado.

Parabéns e obrigado por sua contribuição!



### Teste de integração contínua

Cada solicitação de tração é testada no sistema de Integração Contínua (CI) para confirmar que funciona nas plataformas suportadas pela Electron.

Idealmente, a solicitação de tração passará ("seja verde") em todas as plataformas da CI. Isso significa que todos os testes passam e não há erros de fiação. No entanto, não é incomum que a própria infraestrutura de CI falhe em plataformas específicas ou que os chamados testes "desajeitados" falhem ("seja vermelho"). Cada falha CI deve ser inspecionada manualmente para determinar a causa.

O CI é iniciado automaticamente quando você abre uma solicitação de tração, mas apenas os mantenedores do núcleo podem reiniciar uma execução de CI. Se você acredita que a CI está dando um falso negativo, peça a um mantenedor para reiniciar os testes.
