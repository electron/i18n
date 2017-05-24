# Technical Differences Between Electron and NW.js (formerly node-webkit)

**Nota: Electron fue nombrado anteriormente "Atom Shell".**

Como NW.js, Electron proporciona una plataforma para escribir aplicaciones de escritorio con JavaScript y HTML y tiene nodo integración conceder acceso al sistema de bajo nivel de páginas web.

Pero también hay diferencias fundamentales entre los dos proyectos que Electron un producto totalmente independiente de NW.js:

**1. Entrada de Aplicación**

En NW.js el punto de entrada principal de una aplicación es una página web. Especificar una dirección URL de la Página principal en `package.json` y se abre en una ventana de navegador como ventana principal de la aplicación.

En Electron, el punto de entrada es un script de JavaScript. En lugar de proporcionar directamente un URL, manualmente crear una ventana del navegador y cargar un archivo HTML utilizando la API. También necesita escuchar a eventos de ventana para decidir cuando salga de la aplicación.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

**2. Build System**

In order to avoid the complexity of building all of Chromium, Electron uses [`libchromiumcontent`](https://github.com/brightray/libchromiumcontent) to access Chromium's Content API. `libchromiumcontent` is a single shared library that includes the Chromium Content module and all of its dependencies. Users don't need a powerful machine to build Electron.

**3. Node Integration**

In NW.js, the Node integration in web pages requires patching Chromium to work, while in Electron we chose a different way to integrate the libuv loop with each platform's message loop to avoid hacking Chromium. See the [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) code for how that was done.

**4. Multi-context**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](http://strongloop.com/strongblog/whats-new-node-js-v0-12-multiple-context-execution/) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.