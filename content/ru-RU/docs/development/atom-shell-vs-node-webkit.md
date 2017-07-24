# Технические различия между Electron и NW.js (прежний node-webkit)

**Примечание: Ранее Electron имел название Atom Shell.**

Как и NW.js, Electron предоставляет платформу для создания приложений с использованием JavaScript и HTML и использует интеграцию с Node для предоставления низкоуровневого доступа к системе используя web страницы.

Но также есть фундаментальные различия между проектами которые делают Electron совершенно отдельным продуктом от NW.js:

**Точка входа в приложение**

В NW.js основной входной точкой приложения является web страница. Вы указываете URL главной страницы в `package.json` и она будет открыта в окне браузера как главное окно приложения.

In Electron, the entry point is a JavaScript script. Instead of providing a URL directly, you manually create a browser window and load an HTML file using the API. You also need to listen to window events to decide when to quit the application.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

**2. Build System**

In order to avoid the complexity of building all of Chromium, Electron uses [`libchromiumcontent`](https://github.com/brightray/libchromiumcontent) to access Chromium's Content API. `libchromiumcontent` is a single shared library that includes the Chromium Content module and all of its dependencies. Users don't need a powerful machine to build Electron.

**3. Node Integration**

In NW.js, the Node integration in web pages requires patching Chromium to work, while in Electron we chose a different way to integrate the libuv loop with each platform's message loop to avoid hacking Chromium. See the [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) code for how that was done.

**4. Multi-context**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](http://strongloop.com/strongblog/whats-new-node-js-v0-12-multiple-context-execution/) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.