# Технічні відмінності між Electron та NW.js (раніше node-webkit)

**Примітка: Електрон раніше називався Atom Shell.**

Як і NW.js, Electron пропонує платформу для написання настільних додатків за допомогою JavaScript та HTML і має інтеграцію з Node.js для надання доступу до системи низького рівня з веб-сторінок.

Однак існують також принципові відмінності між двома проектами, які роблять Electron абсолютно несхожим на NW.js:

**1. Точка входу в застосунок**

У NW.js основною точкою входу програми є веб-сторінка або сценарій JS. Ви вказуєте html або js файл у `package.json`, і він відкривається у вікні браузера, як головне вікно програми (у випадку точки входу html) або сценарій.

Для Electron, вхідною точкою є JavaScript сценарій. Замість надання безпосередньо URL-адреси ви вручну створюєте вікно браузера та завантажуєте HTML-файл за допомогою API. Також потрібно прослуховувати події вікна, щоб вирішити, коли вийти з застосунку.

Electron працює подібніше до Node.js. API Electron є більш низькорівневим, тому ви можете використовувати його для тестування браузера замість [PhantomJS](http://phantomjs.org/).

**2. Система збірки**

Щоб уникнути складності створення всього на Chromium, Electron використовує [`libchromiumcontent`](https://github.com/electron/libchromiumcontent), щоб отримати доступ до Content API Chromium. `libchromiumcontent` - це єдина спільна бібліотека, що включає модуль Chromium Content та всі залежності. Користувачам не потрібна потужна конфігурація комп'ютера для створення Electron застосунку.

**3. Інтеграція з Node.js**

У NW.js інтеграція з Node.js вимагає застосування патчів для Chromium, тоді як в Electron ми обрали інший спосіб інтеграції циклу libuv у цикл повідомлень кожної платформи, щоб уникнути змін у Chromium. Дивіться код [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common), як це було зроблено.

**4. Мультиконтекст**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.