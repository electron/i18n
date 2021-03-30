---
title: 'Electron Internals: Using Node as a Library'
author: zcbenz
date: '2016-08-08'
---

Este é o segundo post em uma série em curso explicando os internos do Electron. Confira o primeiro post [][event-loop] sobre integração de loop de eventos se você ainda não fez.

A maioria das pessoas usa [Node](https://nodejs.org) para aplicativos do lado do servidor, mas devido à rica comunidade de API do Node definida e próspera, também é uma ótima opção para uma biblioteca incorporada. Este post explica como o nó é usado como uma biblioteca no Electron.

---

## Sistema de compilação

Tanto Node quanto Electron usam [`GYP`][gyp] como seus sistemas de construção. Se você quer incorporar Node dentro de seu aplicativo, você precisa usá-lo como sistema de criação também.

Novo no `GYP`? Leia [este guia][gyp-docs] antes de continuar neste post.

## Bandeiras do nó

O arquivo [`node.gyp`][nodegyp] no diretório de código-fonte do Node descreve como o do Nó é construído, juntamente com muitas variáveis [`GYP`][gyp] controlando quais partes do Node estão habilitadas e se abrem determinadas configurações.

Para alterar as bandeiras de compilação, você precisa definir as variáveis no arquivo `.gypi` do seu projeto . O `configurar` script no Node pode gerar algumas comuns configurações para você, por exemplo, executando `. Configurar --shared` irá gerar um `config.gypi` com variáveis instruindo Node a ser construído como uma biblioteca compartilhada.

O Electron não usa o script `configurar` pois ele tem seus próprios scripts de compilação. As configurações para Node são definidas no arquivo [`common.gypi`][commongypi] no diretório de código-fonte raiz da Electron.

## Associar Nó com Electron

No Electron, O nó está sendo vinculado como uma biblioteca compartilhada, definindo a `variável GYP` `node_shared` como `true`, então a compilação do Node será alterada de `executável` para `shared_library`, , e o código-fonte que contém o `principal` pontos de entrada não serão compilados.

Uma vez que o Electron usa a biblioteca V8 enviada com Chromium, a biblioteca V8 incluída no código-fonte do Node não é usada. Isto é feito configurando ambos `node_use_v8_platform` e `node_use_bundled_v8` para `false`.

## Biblioteca compartilhada ou biblioteca estática

Ao conectar com o Node, existem duas opções: você pode construir o Node como uma biblioteca estática e incluí-lo no executável final, ou você pode construí-la como uma biblioteca compartilhada e enviá-la ao lado do executável final.

No Electron, o nó foi construído como uma biblioteca estática por muito tempo. This made the build simple, enabled the best compiler optimizations, and allowed Electron to be distributed without an extra `node.dll` file.

No entanto, isso mudou depois que o Chrome mudou para usar [][boringssl]BoringSSL . BoringSSL é um bifurcação de [][openssl] OpenSSL que remove várias APIs nãoused e altera muitas interfaces existentes. Como o nó ainda usa o OpenSSL, o compilador geraria vários erros de ligação devido a símbolos conflitantes se eles fossem conectados.

A Electron não podia usar o BoringSSL no Node, ou usar o OpenSSL no Cromo, então a única opção era mudar para o node de construção como uma biblioteca compartilhada, e [esconder os símbolos BoringSSL e OpenSSL][openssl-hide] nos componentes de cada um.

Esta mudança trouxe ao Electron alguns efeitos colaterais positivos. Antes desta mudança não foi possível renomear o arquivo executável do Electron no Windows se usasse módulos nativos porque o nome do executável era codificado na biblioteca de importação. Depois que o Node foi construído como uma biblioteca compartilhada, esta limitação se foi porque todos os módulos nativos estavam vinculados a um nó `. ll`, cujo nome não precisava ser alterado.

## Apoiando módulos nativos

[Módulos nativos][native-modules] no trabalho de Nó definindo uma função de entrada para o Nó carregar, e, em seguida, pesquisar os símbolos de V8 e libuv do Node. Isto é um pouco de problema para incorporar porque, por padrão, os símbolos do V8 e libuv estão ocultos quando construir o Node como uma biblioteca e módulos nativos vão falhar ao carregar porque eles não conseguem encontrar os símbolos.

Portanto, a fim de fazer com que os módulos nativos funcionassem, os símbolos V8 e libuv foram expostos no Electron. Para v8 isso é feito [forçando todos os símbolos no arquivo de configuração do Chromium a serem expostos][v8-expose]. Para a libuv, é conseguido [definindo a definição de `BUILDING_UV_SHARED=1`][libuv-expose].

## Iniciando nó no seu aplicativo

Depois de todo o trabalho de construção e link com o Node, o último passo é executar Node em seu aplicativo.

O nó não fornece muitas APIs públicas para se incorporar em outros aplicativos. Normalmente, você pode simplesmente chamar [`node::Start` e `node::Init`][node-start] para começar a uma nova instância de Node. No entanto, se você está construindo um aplicativo complexo com base no Node, você tem que usar APIs como `node::CreateEnvironment` para controlar precisamente cada passo.

No Electron, o nó é iniciado em dois modos: o modo autônomo que é executado no processo principal, que é semelhante aos binários oficiais do Node e ao modo incorporado que insere as APIs do Node nas páginas web. Os detalhes disto serão explicados em uma postagem futura.

[gyp]: https://gyp.gsrc.io
[nodegyp]: https://github.com/nodejs/node/blob/v6.3.1/node.gyp
[commongypi]: https://github.com/electron/electron/blob/master/common.gypi
[openssl-hide]: https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218
[v8-expose]: https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122
[libuv-expose]: https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228
[node-start]: https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191
[event-loop]: https://electronjs.org/blog/2016/07/28/electron-internals-node-integration
[event-loop]: https://electronjs.org/blog/2016/07/28/electron-internals-node-integration
[gyp-docs]: https://gyp.gsrc.io/docs/UserDocumentation.md
[native-modules]: https://nodejs.org/api/addons.html
[boringssl]: https://boringssl.googlesource.com/boringssl
[boringssl]: https://boringssl.googlesource.com/boringssl
[openssl]: https://www.openssl.org
[openssl]: https://www.openssl.org

