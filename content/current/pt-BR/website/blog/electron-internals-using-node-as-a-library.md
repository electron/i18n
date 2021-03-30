---
title: 'Electron Internals: Using Node as a Library'
author: zcbenz
date: '2016-08-08'
---

Este é o segundo post em uma série em curso explicando os internos do Electron. Check out the [first post][event-loop] about event loop integration if you haven't already.

A maioria das pessoas usa [Node](https://nodejs.org) para aplicativos do lado do servidor, mas devido à rica comunidade de API do Node definida e próspera, também é uma ótima opção para uma biblioteca incorporada. Este post explica como o nó é usado como uma biblioteca no Electron.

---

## Sistema de compilação

Both Node and Electron use [`GYP`][gyp] as their build systems. Se você quer incorporar Node dentro de seu aplicativo, você precisa usá-lo como sistema de criação também.

Novo no `GYP`? Read [this guide][gyp-docs] before you continue further in this post.

## Bandeiras do nó

The [`node.gyp`][nodegyp] file in Node's source code directory describes how Node is built, along with lots of [`GYP`][gyp] variables controlling which parts of Node are enabled and whether to open certain configurations.

Para alterar as bandeiras de compilação, você precisa definir as variáveis no arquivo `.gypi` do seu projeto . O `configurar` script no Node pode gerar algumas comuns configurações para você, por exemplo, executando `. Configurar --shared` irá gerar um `config.gypi` com variáveis instruindo Node a ser construído como uma biblioteca compartilhada.

O Electron não usa o script `configurar` pois ele tem seus próprios scripts de compilação. The configurations for Node are defined in the [`common.gypi`][commongypi] file in Electron's root source code directory.

## Associar Nó com Electron

No Electron, O nó está sendo vinculado como uma biblioteca compartilhada, definindo a `variável GYP` `node_shared` como `true`, então a compilação do Node será alterada de `executável` para `shared_library`, , e o código-fonte que contém o `principal` pontos de entrada não serão compilados.

Uma vez que o Electron usa a biblioteca V8 enviada com Chromium, a biblioteca V8 incluída no código-fonte do Node não é usada. Isto é feito configurando ambos `node_use_v8_platform` e `node_use_bundled_v8` para `false`.

## Biblioteca compartilhada ou biblioteca estática

Ao conectar com o Node, existem duas opções: você pode construir o Node como uma biblioteca estática e incluí-lo no executável final, ou você pode construí-la como uma biblioteca compartilhada e enviá-la ao lado do executável final.

No Electron, o nó foi construído como uma biblioteca estática por muito tempo. This made the build simple, enabled the best compiler optimizations, and allowed Electron to be distributed without an extra `node.dll` file.

However, this changed after Chrome switched to use [BoringSSL][boringssl]. BoringSSL is a fork of [OpenSSL][openssl] that removes several unused APIs and changes many existing interfaces. Como o nó ainda usa o OpenSSL, o compilador geraria vários erros de ligação devido a símbolos conflitantes se eles fossem conectados.

Electron couldn't use BoringSSL in Node, or use OpenSSL in Chromium, so the only option was to switch to building Node as a shared library, and [hide the BoringSSL and OpenSSL symbols][openssl-hide] in the components of each.

Esta mudança trouxe ao Electron alguns efeitos colaterais positivos. Antes desta mudança não foi possível renomear o arquivo executável do Electron no Windows se usasse módulos nativos porque o nome do executável era codificado na biblioteca de importação. Depois que o Node foi construído como uma biblioteca compartilhada, esta limitação se foi porque todos os módulos nativos estavam vinculados a um nó `. ll`, cujo nome não precisava ser alterado.

## Apoiando módulos nativos

[Native modules][native-modules] in Node work by defining an entry function for Node to load, and then searching the symbols of V8 and libuv from Node. Isto é um pouco de problema para incorporar porque, por padrão, os símbolos do V8 e libuv estão ocultos quando construir o Node como uma biblioteca e módulos nativos vão falhar ao carregar porque eles não conseguem encontrar os símbolos.

Portanto, a fim de fazer com que os módulos nativos funcionassem, os símbolos V8 e libuv foram expostos no Electron. For V8 this is done by [forcing all symbols in Chromium's configuration file to be exposed][v8-expose]. For libuv, it is achieved by [setting the `BUILDING_UV_SHARED=1` definition][libuv-expose].

## Iniciando nó no seu aplicativo

Depois de todo o trabalho de construção e link com o Node, o último passo é executar Node em seu aplicativo.

O nó não fornece muitas APIs públicas para se incorporar em outros aplicativos. Usually, you can just call [`node::Start` and `node::Init`][node-start] to start a new instance of Node. No entanto, se você está construindo um aplicativo complexo com base no Node, você tem que usar APIs como `node::CreateEnvironment` para controlar precisamente cada passo.

No Electron, o nó é iniciado em dois modos: o modo autônomo que é executado no processo principal, que é semelhante aos binários oficiais do Node e ao modo incorporado que insere as APIs do Node nas páginas web. Os detalhes disto serão explicados em uma postagem futura.

[gyp]: https://gyp.gsrc.io
[nodegyp]: https://github.com/nodejs/node/blob/v6.3.1/node.gyp
[commongypi]: https://github.com/electron/electron/blob/master/common.gypi
[openssl-hide]: https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218
[v8-expose]: https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122
[libuv-expose]: https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228
[node-start]: https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191
[event-loop]: https://electronjs.org/blog/2016/07/28/electron-internals-node-integration
[gyp-docs]: https://gyp.gsrc.io/docs/UserDocumentation.md
[native-modules]: https://nodejs.org/api/addons.html
[boringssl]: https://boringssl.googlesource.com/boringssl
[openssl]: https://www.openssl.org

