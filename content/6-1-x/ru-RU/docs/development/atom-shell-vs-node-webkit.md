# Технические различия между Electron и NW.js (прежний node-webkit)

__Примечание: Electron ранее назывался Atom Shell.__

Как и NW.js, Electron предоставляет платформу для создания приложений с использованием JavaScript и HTML и использует интеграцию с Node для предоставления низкоуровневого доступа к системе используя web страницы.

Но существуют также фундаментальные различия между двумя проектами, которые делают Electron полностью отдельным продуктом от NW.js:

__1. Entry of Application__

В NW.js точкой входа в приложение является веб страница или JS сценарий. Вы указываете html или js файл в `package.json` и он открывается в окне браузера как главное окно приложения(если точка входа - html) или выполняется как скрипт.

В Electron точкой входа является JavaScript сценарий. Вместо того чтобы предоставлять URL адрес напрямую, вы вручную создаете окно браузера и загружаете в него HTML-файл используя API. Вам также необходимо прослушивать события окна для того, чтобы определить когда необходимо выйти из приложения.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

__2. Система сборки__

Для того чтобы избежать сборки всего Chromium, Electron использует [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) для доступа к Content API Chromium'а. `libchromiumcontent` это отдельная библиотека, которая включает в себя модуль Chromium Content и все его зависимости. Пользователям не потребуются высокопроизводительные машины для сборки Electron.

__3. Интеграция Node__

В NW.js, интеграция с Node.js для веб страниц требует патча Chromium для работы, тогда как в Electron мы выбрали другой способ интеграции libuv в цикл событий для каждой платформы чтобы избежать хаков в Chromium. Вы можете изучить код [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common), чтобы узнать, как это было реализовано.

__4. Использование multi-context__

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

С использованием функциональности [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) в Node, Electron не создает новый JavaScript контекст для веб страниц.

Примечание: Поддержка multi-context была представлена c 0.13 версии NW.js.
