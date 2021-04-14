# Diferenças técnicas entre elétron e NW.js

Assim como [NW.js][nwjs], a Electron fornece uma plataforma para escrever aplicativos de desktop com tecnologias de web. Ambas as plataformas permitem que os desenvolvedores utilizem o HTML, JavaScript e Node.js. Na superfície, eles parecem muito semelhantes.

No entanto, há diferenças fundamentais entre os dois projetos que fazem Electron um produto completamente separado da NW.js.

## 1) Entrada de Aplicação

Em NW.js, o principal ponto de entrada de um aplicativo pode ser uma página web HTML. Em esse caso, a NW.js abrirá o ponto de entrada dado em uma janela do navegador.

Em Electron, o ponto de entrada é sempre um script JavaScript. Em vez de fornecer uma URL diretamente, você cria manualmente uma janela do navegador e carrega um arquivo HTML usando a API. Você também precisa ouvir os eventos da janela para decidir quando sair do aplicativo .

O elétron funciona mais como o tempo de execução .js Nó. As APIs da Electron são de nível mais baixo, então você pode usá-lo para testes de navegador no lugar de [PhantomJS](https://phantomjs.org/).

## 2) Integração de nó

Em NW.js, a integração do Nó em páginas da Web requer corrigir o Chromium para funcionar, enquanto na Electron escolhemos uma maneira diferente de integrar o loop `libuv` com o loop de mensagens de cada plataforma para evitar hackear o Chromium. Veja o código do [`node_bindings`][node-bindings] para saber como foi feito.

## 3) Contextos JavaScript

Se você é um usuário .js NW experiente, você deve estar familiarizado com o conceito de contexto Node e contexto web. Esses conceitos foram inventados por causa da forma como a NW.js foi implementada.

Usando o recurso [de](https://github.com/nodejs/node-v0.x-archive/commit/756b622) de   de vários contextos do Node, a Electron não introduz um novo contexto JavaScript em páginas de web.

Nota: Múltiplos contextos são opcionais no NW.js desde da versão 0.13.

## 4) Suporte legado

NW.js ainda oferece uma "versão legado" que suporta o Windows XP. Ele não recebe atualizações de segurança.

Dado que os fabricantes de hardware, Microsoft, Chromium e Node.js não lançado mesmo atualizações críticas de segurança para esse sistema, temos que avisá-lo que o uso do Windows XP é extremamente inseguro e totalmente irresponsável.

No entanto, entendemos que os requisitos fora de nossa imaginação mais selvagem podem existir, então se você está procurando por algo como o Electron que roda no Windows XP, o lançamento legado .js NW pode ser o ajuste certo para você.

## 5) Características

Há inúmeras diferenças na quantidade de recursos suportados. A Electron uma comunidade maior, mais aplicativos de produção usando-o, e [uma grande quantidade de módulos e módulos de usuários disponíveis na npm][electron-modules].

Como exemplo, a Electron tem suporte interno para atualizações automáticas e inúmeras ferramentas que facilitam a criação de instaladores. Como exemplo a favor da NW.js, NW.js suporta apis mais `Chrome.*` para o desenvolvimento de Aplicativos Chrome.

Naturalmente, acreditamos que a Electron é a melhor plataforma para aplicações polidas de produção construídas com tecnologias web (como Visual Studio Code, Slack ou Facebook Messenger); no entanto, queremos ser justos com nossa tecnologia web amigos. Se você tem necessidades de recurso que a Electron não atende, você pode querer que tente NW.js.

[nwjs]: https://nwjs.io/
[electron-modules]: https://www.npmjs.com/search?q=electron
[node-bindings]: https://github.com/electron/electron/tree/master/lib/common
