# Diferencias técnicas entre Electron y NW.js (antes node-webkit)

**Nota: Electron fue nombrado anteriormente "Atom Shell".**

Como NW.js, Electron proporciona una plataforma para escribir aplicaciones de escritorio con JavaScript y HTML y tiene integración con Node para conceder el acceso al sistema de bajo nivel desde las páginas web.

Pero también hay diferencias fundamentales entre los dos proyectos que Electron un producto totalmente independiente de NW.js:

**1. Entrada de Aplicación**

En NW.js el punto de entrada principal de una aplicación es una página web o un script JS. You specify a html or js file in the `package.json` and it is opened in a browser window as the application's main window (in case of an html entrypoint) or the script is executed.

En Electron, el punto de entrada es un script de JavaScript. En lugar de proporcionar directamente una URL, manualmente se crea una ventana del navegador y se carga un archivo HTML utilizando la API. También necesita escuchar los eventos de ventana para decidir cuando salir de la aplicación.

Electron funciona más como el tiempo de ejecución de Node.js. Las APIs del Electron son inferiores por lo que puede utilizar para navegador de pruebas en lugar de [PhantomJS](http://phantomjs.org/).

**2. Compilar el Sistema**

Con el fin de evitar la complejidad de la construcción de todos los de cromo, Electron utiliza [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) para tener acceso API contenido de cromo. `libchromiumcontent` es una única biblioteca compartida que incluye el módulo de contenido de Chromium y todas sus dependencias. Users don't need a powerful machine to build Electron.

**3. Integración de Node**

En NW.js, la integración de Node en las páginas web requiere parches de Chromium para trabajar, mientras que en Electron optamos por una forma diferente de integrar el circuito de libuv con bucle de mensajes de la plataforma para evitar hacking de Chromium. Ver el código de [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) por lo fue hecho.

**4. Multi-contexto**

Si es un usuario experimentado de NW.js, debe estar familiarizado con el concepto de contexto en Node y contexto de la web. Estos conceptos fueron inventados por cómo fue implementado NW.js.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Nota: NW.js ha apoyado de manera opcional multi-contexto desde la versión 0.13.