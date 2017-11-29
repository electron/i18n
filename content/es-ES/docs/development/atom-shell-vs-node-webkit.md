# Technical Differences Between Electron and NW.js (formerly node-webkit)

**Nota: Electron fue nombrado anteriormente "Atom Shell".**

Como NW.js, Electron proporciona una plataforma para escribir aplicaciones de escritorio con JavaScript y HTML y tiene integración con Node para conceder el acceso al sistema de bajo nivel desde las páginas web.

Pero también hay diferencias fundamentales entre los dos proyectos que Electron un producto totalmente independiente de NW.js:

**1. Entrada de Aplicación**

En NW.js el punto de entrada principal de una aplicación es una página web. Especificar una dirección URL de la Página principal en `package.json` y se abre en una ventana de navegador como ventana principal de la aplicación.

En Electron, el punto de entrada es un script de JavaScript. En lugar de proporcionar directamente un URL, manualmente crear una ventana del navegador y cargar un archivo HTML utilizando la API. También necesita escuchar a eventos de ventana para decidir cuando salga de la aplicación.

Electron funciona más como el tiempo de ejecución de Node.js. Las APIs del Electron son inferiores por lo que puede utilizar para navegador de pruebas en lugar de [PhantomJS](http://phantomjs.org/).

**2. Compilar el Sistema**

In order to avoid the complexity of building all of Chromium, Electron uses [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) to access Chromium's Content API. `libchromiumcontent` es una única biblioteca compartida que incluye el módulo de contenido de Chromium y todas sus dependencias. Users don't need a powerful machine to build Electron.

**3. Node Integración**

En NW.js, la integración de Node en las páginas web requiere parches de Chromium para trabajar, mientras que en Electron optamos por una forma diferente de integrar el circuito de libuv con bucle de mensajes de la plataforma para evitar hacking de Chromium. Ver el código de [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) por lo fue hecho.

**4. Multi-contexto**

Si eres un usuario experimentado de NW.js, debe estar familiarizado con el concepto de Node contexto y contexto de la web. Estos conceptos fueron inventados por cómo fue implementado NW.js.

Mediante la función [multi-context](http://strongloop.com/strongblog/whats-new-node-js-v0-12-multiple-context-execution/) del Node, Electron no introduce un nuevo contexto de JavaScript en páginas web.

Nota: NW.js ha apoyado opcionalmente contexto multi-contexto desde 0.13.