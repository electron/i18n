# Diferencias técnicas entre Electron y NW.js

Como [NW.js][nwjs], Electron provee una plataforma para escribir aplicaciones de escritorio con tecnologías web. Ambas plataformas permiten a los desarrolladores usar HTML, JavaScript y Node.js. En la superficie, parecen muy similares.

Sin embargo, hay diferencias fundamentales ente los dos proyectos que hacen a Electron un producto completamente separado de NW.js.

## 1) Entrada de la aplicación

En NW.js, el principal punto de entrada puede ser una pagina web HTML. En ese caso, NW.js abrirá el punto de entrada dado en una ventana del navegador.

En Electron, el punto de entrada es siempre un script JavaScript. En lugar de proveer directamente un URL, creas manualmente una ventana del navegador y cargas un archivo HTML usando la API. También necesitas escuchar los eventos de la ventana para decidir cuándo cerrar de la aplicación.

Electron trabaja más como el runtime de Node.js. Las APIs de Electron son de más bajo nivel, así que puedes usarlas para las pruevas del navegador en lugar de [PhantomJS](https://phantomjs.org/).

## 2) Integración de Node

En NW.js, la integración de Node en paginas web requiere parchear Chromium para trabajar, mientras en Electron nosotros elegimos una forma diferente de integrar le bucle `libuv` con el bucle de mensaje de cada plataforma para evitar parchear Chromium. Ver el código de [`node_bindings`][node-bindings] por lo fue hecho.

## 3) Contextos de JavaScript

Si eres un usuario experimentado de NW. js, deberías estar familiarizado con el concepto de contexto de Node y el contexto Web. Estos conceptos fueron inventados debido a como NW.js fue implementado.

Mediante el uso de la característica [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) de Node, Electron no introduce un nuevo contexto JavaScript en las páginas web.

Nota: NW.js ha apoyado de manera opcional multi-contexto desde la versión 0.13.

## 4) Soporte Heredado

NW.js aún ofrece una "versión antigua" que soporta Windows XP. No recibe actualizaciones de seguridad.

Dado que los fabricantes de hardware, Microsoft, Chromium y Node.js no han lanzado ni siquiera actualizaciones de seguridad críticas para ese sistema, tenemos que advertirte que usando Windows XP es salvajemente inseguro y francamente irresponsable.

Sin embargo, entendemos que los requisitos fuera de nuestra imaginación más salvaje pueden existir, así que si estás buscando algo como Electron que corra en Windows Xp, la versión antigua de NW.js puede ser la adecuada para ti.

## 5) Características

Hay numerosas diferencias en la cantidad de características soportadas. Electron tiene una comunidad más grande, con más aplicaciones en producción usándolo y [una mayor cantidad de módulos userland disponibles en npm][electron-modules].

Como ejemplo, Electron tiene soporte integrado para actualizaciones automáticas e incontables herramientas que facilitan la creación de instaladores. Como ejemplo a favor de NW.js, NW.js soporta más APIs de `Chrome.*` para el desarrollo de aplicaciones Chrome.

Naturalmente, nosotros creemos que Electron es la mejor plataforma para aplicaciones de producción pulidas construidas con tecnologías web (como Visual Studio Code, Slack, o Facebook Messenger); sin embargo, queremos ser justos con nuestros amigos de las tecnología web. Si tienes necesidades de características que Electron no cumple, puede que quieras probar NW.js.

[nwjs]: https://nwjs.io/
[electron-modules]: https://www.npmjs.com/search?q=electron
[node-bindings]: https://github.com/electron/electron/tree/master/lib/common
