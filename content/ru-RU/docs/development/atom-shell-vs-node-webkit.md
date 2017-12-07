# Технические различия между Electron и NW.js (прежний node-webkit)

**Примечание: Ранее Electron имел название Atom Shell.**

Как и NW.js, Electron предоставляет платформу для создания приложений с использованием JavaScript и HTML и использует интеграцию с Node для предоставления низкоуровневого доступа к системе используя web страницы.

Но также есть фундаментальные различия между проектами которые делают Electron совершенно отдельным продуктом от NW.js:

**1. Точка входа в приложение**

In NW.js the main entry point of an application is a web page or a JS script. You specify a html or js file in the `package.json` and it is opened in a browser window as the application's main window (in case of an html entrypoint) or the script is executed.

В Electron точкой входа является JavaScript сценарий. Вместо того чтобы предоставлять URL адрес напрямую, вы вручную создаете окно браузера и загружаете в него HTML-файл используя API. Вам также необходимо прослушивать события окна для того, чтобы определить когда необходимо выйти из приложения.

Electron работает, скорее, как среда выполнения Node.js. API Electron является более низкоуровневым, благодаря чему вы можете использовать его для тестирования браузера вместо [PhantomJS](http://phantomjs.org/).

**2. Система сборки**

Чтобы избежать сложностей во время сборки Chromium, а также иметь доступ к API содержимого Chromium, в Electron используется [`libchromiumcontent`](https://github.com/electron/libchromiumcontent). `libchromiumcontent` это отдельная библиотека, которая включает в себя модуль Chromium Content и все его зависимости. Пользователям не потребуются высокопроизводительные машины для сборки Electron.

**3. Интеграция Node**

In NW.js, the Node integration in web pages requires patching Chromium to work, while in Electron we chose a different way to integrate the libuv loop with each platform's message loop to avoid hacking Chromium. See the [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) code for how that was done.

**4. Multi-context**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.