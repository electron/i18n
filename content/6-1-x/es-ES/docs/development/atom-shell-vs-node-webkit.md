# Diferencias técnicas entre Electron y NW.js (antes node-webkit)

__Nota: Electron fue nombrado anteriormente "Atom Shell".__

Como NW.js, Electron proporciona una plataforma para escribir aplicaciones de escritorio con JavaScript y HTML y tiene integración con Node para conceder el acceso al sistema de bajo nivel desde las páginas web.

Pero también hay diferencias fundamentales entre los dos proyectos que hacen de Electron un producto completamente separado de NW.js:

__1. Entrada de aplicación__

En NW.js el punto de entrada principal de una aplicación es una página web o un script JS. Se especifica un HTML o archivo JS en el `package.json` y se abre en una ventana del navegador como la ventana principal de la aplicación (en caso de un punto de entrada HTML) o el script se ejecuta.

En Electron, el punto de entrada es un script JavaScript. En lugar de proporcionar directamente una URL, se crea manualmente una ventana del navegador y se carga un archivo HTML utilizando la API. También necesita escuchar los eventos de la ventana para decidir cuándo salir de la aplicación.

Electron trabaja más como el runtime de Node.js. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

__2. Compilar el sistema__

Para evitar la complejidad de construir todo de Chromium, Electron utiliza [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) para acceder a la API de contenido de Chromium. `libchromiumcontent` es una única biblioteca compartida que incluye el módulo de contenido de Chromium y todas sus dependencias. Los usuarios no necesitan una máquina potente para construir con Electron.

__3. Integración de Node__

En NW. s, la integración de Node en las páginas web requiere parchear Chromium para trabajar, mientras que en Electron elegimos una manera diferente de integrar el bucle libuv con el bucle de mensajes de cada plataforma para evitar hackear Chromium. Mira el código [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) para ver cómo se hizo eso.

__4. Multi-contexto__

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

Mediante la función [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) de Node, Electron no introduce un nuevo contexto de JavaScript en páginas web.

Nota: NW.js ha apoyado de manera opcional multi-contexto desde la versión 0.13.
