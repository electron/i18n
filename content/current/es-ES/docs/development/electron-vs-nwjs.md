# Diferencias técnicas entre Electron y NW.js

Como [NW.js](https://nwjs.io/), Electron provee una plataforma para escribir aplicaciones de escritorio con tecnologías web. Ambas plataformas permiten a los desarrolladores usar HTML, JavaScript y Node.js. En la superficie, parecen muy similares.

Sin embargo, hay diferencias fundamentales ente los dos proyectos que hacen a Electron un producto completamente separado de NW.js.

## 1) Entrada de la aplicación

En NW.js, el principal punto de entrada puede ser una pagina web HTML. En ese caso, NW.js abrirá el punto de entrada dado en una ventana del navegador.

En Electron, el punto de entrada es siempre un script JavaScript. En lugar de proveer directamente un URL, creas manualmente una ventana del navegador y cargas un archivo HTML usando la API. También necesitas escuchar los eventos de la ventana para decidir cuándo cerrar de la aplicación.

Electron trabaja más como el runtime de Node.js. Las APIs de Electron son de más bajo nivel, así que puedes usarlas para las pruevas del navegador en lugar de [PhantomJS](http://phantomjs.org/).

## 2) Integración de Node

En NW.js, la integración de Node en paginas web requiere parchear Chromium para trabajar, mientras en Electron nosotros elegimos una forma diferente de integrar le bucle `libuv` con el bucle de mensaje de cada plataforma para evitar parchear Chromium. Mira el código [`node_bindings`](https://github.com/electron/electron/tree/master/lib/common) para ver cómo se hizo eso.

## 3) Contextos de JavaScript

Si eres un usuario experimentado de NW. js, deberías estar familiarizado con el concepto de contexto de Node y el contexto Web. Estos conceptos fueron inventados debido a como NW.js fue implementado.

Mediante el uso de la característica [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) de Node, Electron no introduce un nuevo contexto JavaScript en las páginas web.

Nota: NW.js ha apoyado de manera opcional multi-contexto desde la versión 0.13.

## 4) Soporte Heredado

NW.js still offers a "legacy release" that supports Windows XP. It doesn't receive security updates.

Given that hardware manufacturers, Microsoft, Chromium, and Node.js haven't released even critical security updates for that system, we have to warn you that using Windows XP is wildly insecure and outright irresponsible.

However, we understand that requirements outside our wildest imagination may exist, so if you're looking for something like Electron that runs on Windows XP, the NW.js legacy release might be the right fit for you.

## 5) Características

There are numerous differences in the amount of supported features. Electron has a bigger community, more production apps using it, and [a large amount of userland modules available on npm](https://www.npmjs.com/search?q=electron).

As an example, Electron has built-in support for automatic updates and countless tools that make the creation of installers easier. As an example in favor of NW.js, NW.js supports more `Chrome.*` APIs for the development of Chrome Apps.

Naturally, we believe that Electron is the better platform for polished production applications built with web technologies (like Visual Studio Code, Slack, or Facebook Messenger); however, we want to be fair to our web technology friends. If you have feature needs that Electron does not meet, you might want to try NW.js.
