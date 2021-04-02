# Patches em Elétron

O elétron é construído em dois grandes projetos a montante: Chromium e Node.js. Cada um desses projetos também tem várias de suas próprias dependências. Tentamos o nosso melhor para usar essas dependências exatamente como elas são, mas às vezes não podemos alcançar nossos objetivos sem corrigir essas dependências a montante para se adequar aos nossos casos de uso.

## Justificativa de patch

Cada patch em Electron é um fardo de manutenção. Quando o código upstream muda, os patches podem quebrar — às vezes sem sequer um conflito de patches ou um erro de compilação. É um esforço contínuo para manter nosso patch configurado para data e eficaz. Então nos esforçamos para manter nossa contagem de remendo no mínimo. Para isso, cada patch deve descrever sua razão de existência em sua mensagem de compromisso. Essa razão deve ser uma das seguintes:

1. O patch é temporário e destina-se a ser (ou foi) comprometido rio acima ou eventualmente removido. Inclua um link para uma RP upstream ou revisão de código, se disponível, ou um procedimento para verificar se o patch ainda é necessário em uma data posterior.
2. O patch permite que o código seja compilado no ambiente Electron, mas não pode ser a montante porque é específico de Elétrons (por exemplo, corrigir referências ao `Profile`do Chrome ). Inclua o raciocínio sobre por que a alteração não pode ser implementada sem um patch (por exemplo, subclassificando ou copiando o código).
3. O patch faz alterações específicas de elétrons na funcionalidade que são fundamentalmente incompatíveis com upstream.

Em geral, todos os projetos upstream com os qual trabalhamos são pessoas amigáveis e muitas vezes ficam felizes em aceitar refatorações que permitem que o código em questão seja compatível tanto com o Electron quanto com o projeto upstream. (Veja, por exemplo. [esta](https://chromium-review.googlesource.com/c/chromium/src/+/1637040) mudança no Cromo, que nos permitiu remover um patch que fez a mesma coisa, ou [esta](https://github.com/nodejs/node/pull/22110) mudança no Nó, que foi um não-op para Node, mas corrigiu um bug em Electron.) **Devemos buscar mudanças a montante sempre que pudermos, e evitar patches de vida indefinida**.

## Sistema de patches

Se você se encontrar na infeliz posição de ter que fazer uma mudança que só pode ser feita através da remenda de um projeto upstream, você precisará saber como gerenciar patches em Electron.

Todos os patches para projetos a montante em Electron estão contidos no diretório `patches/` . Cada subdiretório de `patches/` contém vários arquivos de patch, juntamente com um arquivo `.patches` que lista a ordem em que os patches devem ser aplicados. Pense nesses arquivos como uma série de compromissos git que são aplicados em cima do projeto upstream depois de verificarmos.

```text
patches
   <de patchset --, isso descreve qual diretório de patchset é aplicado ao que
projeto de cromo
│ .➤➤ patches
│ ➤➤➤ acelerador.patch.
│ add_contentgpuclient_precreatemessageloop_callback.patch
│ ⋮

│ .➤➤ patches
│ add_openssl_is_boringssl_guard_to_oaep_hash_check.patch
│ ).➤➤ build_add_gn_build_files.patch
│ ⋮
⋮
```

Para ajudar a gerenciar esses conjuntos de patches, fornecemos duas ferramentas: `git-import-patches` e `git-export-patches`. `git-import-patches` importa um conjunto de arquivos de patch em um repositório de git, aplicando cada patch na ordem correta e criando um compromisso para cada um. `git-export-patches` faz o inverso; ele exporta uma série de git compromete-se em um repositório em um conjunto de arquivos em um diretório e um arquivo `.patches` que acompanha.

> Nota lateral: a razão pela qual usamos um arquivo `.patches` para manter a ordem de patches aplicados, em vez de prefira um número como `001-` a cada arquivo, é porque reduz conflitos relacionados ao pedido de patch. Ele evita a situação em que dois PRs adicionam um patch no final da série com a mesma numeração e acabam sendo mesclados resultando em um identificador duplicado, e também reduz a agitação quando um patch é adicionado ou excluído no meio da série.

### Usando

#### Adicionando um novo patch

```bash
$ cd src/third_party/electron_node
$ vim algum/código/arquivo.cc
$ git cometer
$ .. /.. /elétron/script/git-export-patches -o .. /.. /elétron/patches/nó
```

> **NOTA**: `git-export-patches` ignora qualquer arquivo não comprometido, então você deve criar um compromisso se quiser que suas alterações sejam exportadas. A linha de assunto da mensagem de compromisso será usada para derivar o nome do arquivo de patch, e o corpo da mensagem de compromisso deve incluir a razão para a existência do patch.

Re-exportar patches às vezes causará shasums em patches não relacionados para mudar. Isso é geralmente inofensivo e pode ser ignorado (mas vá em frente e adicione essas mudanças ao seu RP, isso vai impedi-los de aparecer para outras pessoas).

#### Editando um patch existente

```bash
$ cd src/v8
$ vim algum/code/file.cc
$ git log
# Encontre o commit sha do patch que você quer editar.
$ git commit --fixup [COMMIT_SHA]
$ git rebase --autosquash -i [COMMIT_SHA]^
$ .. /elétron/script/git-export-patches -o .. /elétron/patches/v8
```

#### Removendo um patch

```bash
$ vim src/electron/patches/node/.patches
# Excluir a linha com o nome do patch que você deseja remover
$ cd src/third_party/electron_node
$ git reset --árbitros rígidos/patches/upstream-head
$ .. /.. /elétron/script/git-import-patches .. /.. /elétron/patches/nó
$ .. /.. /elétron/script/git-export-patches -o .. /.. /elétron/patches/nó
```

Note que `git-import-patches` marcará o compromisso que foi `HEAD` quando foi executado como `refs/patches/upstream-head`. Isso permite que você acompanhe quais compromissos são de patches electron (aqueles que vêm após `refs/patches/upstream-head`) e que os compromissos estão em upstream (aqueles antes de `refs/patches/upstream-head`).

#### Resolver conflitos

Ao atualizar uma dependência upstream, os patches podem não ser aplicados de forma limpa. Muitas vezes, o conflito pode ser resolvido automaticamente por git com uma fusão de 3 vias. Você pode instruir `git-import-patches` a usar o algoritmo de fusão de 3 vias passando o argumento `-3` :

```bash
$ cd src/third_party/electron_node
# Se o aplicativo de patch falhou no meio do caminho, você pode redefini-lo com:
$ git am --abortar
# E depois tentar novamente com a fusão de 3 vias:
$ .. /.. /elétron/script/git-import-patches -3 .. /.. /elétron/patches/nó
```

Se `git-import-patches -3` encontrar um conflito de fusão que não pode resolver automaticamente, ele pausará e permitirá que você resolva o conflito manualmente. Uma vez resolvido o conflito, `git add` os arquivos resolvidos e continuar a aplicar o resto dos patches executando `git am --continue`.
