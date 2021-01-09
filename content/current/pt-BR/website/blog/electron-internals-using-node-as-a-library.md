---
title: 'Electron Internals: Using Node as a Library'
author: zcbenz
date: '2016-08-08'
---

Este é o segundo post em uma série em curso explicando os internos do Electron. Confira o [primeiro post](https://electronjs.org/blog/2016/07/28/electron-internals-node-integration) sobre a integração do loop de evento se você ainda não o fez.

A maioria das pessoas usa [Node](https://nodejs.org) para aplicativos do lado do servidor, mas devido à rica comunidade de API do Node definida e próspera, também é uma ótima opção para uma biblioteca incorporada. Este post explica como o nó é usado como uma biblioteca no Electron.

---

## Sistema de compilação

Tanto o Node quanto o Electron usam [`GYP`](https://gyp.gsrc.io) como sistemas de compilação. Se você quer incorporar Node dentro de seu aplicativo, você precisa usá-lo como sistema de criação também.

Novo no `GYP`? Leia [este guia](https://gyp.gsrc.io/docs/UserDocumentation.md) antes de continuar mais nesta publicação.

## Bandeiras do nó

O nó [`. o arquivo yp`](https://github.com/nodejs/node/blob/v6.3.1/node.gyp) no diretório de código fonte do Node descreve como o Node é criado, junto com várias variáveis do [`GYP`](https://gyp.gsrc.io) controlando quais partes do nó estão habilitadas e se devem abrir certas configurações.

Para alterar as bandeiras de compilação, você precisa definir as variáveis no arquivo `.gypi` do seu projeto . O `configurar` script no Node pode gerar algumas comuns configurações para você, por exemplo, executando `. Configurar --shared` irá gerar um `config.gypi` com variáveis instruindo Node a ser construído como uma biblioteca compartilhada.

O Electron não usa o script `configurar` pois ele tem seus próprios scripts de compilação. As configurações para o Node são definidas no arquivo [`common.gypi`](https://github.com/electron/electron/blob/master/common.gypi) no diretório do código fonte raiz do Electron.

## Associar Nó com Electron

No Electron, O nó está sendo vinculado como uma biblioteca compartilhada, definindo a `variável GYP` `node_shared` como `true`, então a compilação do Node será alterada de `executável` para `shared_library`, , e o código-fonte que contém o `principal` pontos de entrada não serão compilados.

Uma vez que o Electron usa a biblioteca V8 enviada com Chromium, a biblioteca V8 incluída no código-fonte do Node não é usada. Isto é feito configurando ambos `node_use_v8_platform` e `node_use_bundled_v8` para `false`.

## Biblioteca compartilhada ou biblioteca estática

Ao conectar com o Node, existem duas opções: você pode construir o Node como uma biblioteca estática e incluí-lo no executável final, ou você pode construí-la como uma biblioteca compartilhada e enviá-la ao lado do executável final.

No Electron, o nó foi construído como uma biblioteca estática por muito tempo. This made the build simple, enabled the best compiler optimizations, and allowed Electron to be distributed without an extra `node.dll` file.

No entanto, isto mudou depois que o Chrome mudou para usar o [BoringSSL](https://boringssl.googlesource.com/boringssl). BoringSSL é um fork do [OpenSSL](https://www.openssl.org) que remove várias APIs não utilizadas e altera muitas interfaces existentes. Como o nó ainda usa o OpenSSL, o compilador geraria vários erros de ligação devido a símbolos conflitantes se eles fossem conectados.

O Electron não pôde usar BoringSSL no Node, ou usar o OpenSSL no Chromium, então a única opção era mudar para construir o Node como uma biblioteca compartilhada, e [esconde os símbolos BoringSSL e OpenSSL](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218) nos componentes de cada um.

Esta mudança trouxe ao Electron alguns efeitos colaterais positivos. Antes desta mudança não foi possível renomear o arquivo executável do Electron no Windows se usasse módulos nativos porque o nome do executável era codificado na biblioteca de importação. Depois que o Node foi construído como uma biblioteca compartilhada, esta limitação se foi porque todos os módulos nativos estavam vinculados a um nó `. ll`, cujo nome não precisava ser alterado.

## Apoiando módulos nativos

[Módulos nativos](https://nodejs.org/api/addons.html) no Node funcionam definindo uma função de entrada para carregar o Node e, em seguida, pesquisando os símbolos da V8 e da libuv do Node. Isto é um pouco de problema para incorporar porque, por padrão, os símbolos do V8 e libuv estão ocultos quando construir o Node como uma biblioteca e módulos nativos vão falhar ao carregar porque eles não conseguem encontrar os símbolos.

Portanto, a fim de fazer com que os módulos nativos funcionassem, os símbolos V8 e libuv foram expostos no Electron. Para V8 isso é feito [forçando todos os símbolos no arquivo de configuração do Chromium a serem expostos](https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122). Para libuv, é alcançado definindo a definição [ `BUILDING_UV_SHARED=1`](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228).

## Iniciando nó no seu aplicativo

Depois de todo o trabalho de construção e link com o Node, o último passo é executar Node em seu aplicativo.

O nó não fornece muitas APIs públicas para se incorporar em outros aplicativos. Geralmente, você pode apenas chamar [`node::Start` e `node::Init`](https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191) para iniciar uma nova instância do Node. No entanto, se você está construindo um aplicativo complexo com base no Node, você tem que usar APIs como `node::CreateEnvironment` para controlar precisamente cada passo.

No Electron, o nó é iniciado em dois modos: o modo autônomo que é executado no processo principal, que é semelhante aos binários oficiais do Node e ao modo incorporado que insere as APIs do Node nas páginas web. Os detalhes disto serão explicados em uma postagem futura.

