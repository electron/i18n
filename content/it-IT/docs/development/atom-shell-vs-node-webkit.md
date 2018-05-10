# Differenze tecniche tra Electron e NW.js (formalmente node-webkit)

**Nota: Electron in precedenza veniva chiamato Atom Shell.**

Similmente a NW.js, Electron fornisce una piattaforma per scrivere applicazioni desktop in JavaScript e HTML con integrazioni in Node.js per garantire accesso al sistema dalle pagine web.

Ma ci sono anche differenze fondamentali tra i due progetti che rendono Electron un prodotto nettamente diverso da NW.js:

**1. Entry point dell'applicazione**

In NW.js l'entry point principale di un'applicazione è una web page o un script JS. You specify a html or js file in the `package.json` and it is opened in a browser window as the application's main window (in case of an html entrypoint) or the script is executed.

In Electron, the entry point is a JavaScript script. Instead of providing a URL directly, you manually create a browser window and load an HTML file using the API. You also need to listen to window events to decide when to quit the application.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

**2. Build System**

In order to avoid the complexity of building all of Chromium, Electron uses [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) to access Chromium's Content API. `libchromiumcontent` is a single shared library that includes the Chromium Content module and all of its dependencies. Gli utenti non hanno bisogno di una macchina potente per costruire Electron.

**3. Node Integration**

In NW.js, the Node integration in web pages requires patching Chromium to work, while in Electron we chose a different way to integrate the libuv loop with each platform's message loop to avoid hacking Chromium. See the [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) code for how that was done.

**4. Multi-context**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.