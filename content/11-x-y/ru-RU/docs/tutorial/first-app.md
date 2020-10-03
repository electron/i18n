# Ваше первое приложение на Electron

Electron позволяет создавать настольные приложения на чистом JavaScript, предоставляя среду выполнения с богатым нативным интерфейсом API (операционной системы). Вы могли видеть это как вариант времени выполнения Node.js, ориентированного на настольные приложения вместо веб-серверов.

Это не значит, что Electron представляет собой JavaScript, который связывает код с библиотеками графического пользовательского интерфейса (GUI). Вместо этого, Electron использует веб-страницы для создания GUI, и поэтому Electron можно рассматривать как мини браузер Chromium, управляемый с помощью JavaScript.

**Примечание**: Данный пример также доступен в качестве репозитория который вы можете [скачать и запустить прямо сейчас](#Попробуте-данный-Пример).

Если посмотреть на приложение, созданное на базе Electron, то оно по своей сути является Node.js приложением. Начальной точкой приложения является `package.json` файл, идентичный одноименному модулю Node.js. Самое простое Electron приложение будет иметь следующую структуру папок:

```plaintext
your-app/
├── package.json
├── main.js
└── index.html
```

Теперь давайте создадим пустую папку для вашего Electron приложения. Для этого откройте свой клиент командной строки и запустите `npm init` из папки, созданной ранее.

```sh
npm init
```

npm будет вести вас на протяжении создания базового `package.json` файла. Скрипт, указанный в поле `main`, является стартовым скриптом для вашего приложения, который будет запускать весь процесс. Например, ваш файл `package.json` может выглядеть следующим образом:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

__Примечание__: Если в `package.json` отсутствует поле `main`, тогда Electron сделает попытку загрузить `index.js` (так же, как и Node.js).

By default, `npm start` would run the main script with Node.js. in order to make it run with Electron, you can add a `start` script:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Установка Electron

Сейчас вам нужно будет установить сам `electron`. Рекомендуемым для этого путем является его установка в качестве зависимости в вашем приложении, что позволяет вам работать с многими приложениями, используя разные версии Electron. Для этого вам нужно запустить следующую команду из директории вашего приложения:

```sh
npm install --save-dev electron
```

Также существуют другие способы установки Electron. Пожалуйста, посетите [гайд по установке](installation.md) для получения дополнительных знаний об использовании прокси, зеркал и собственных кэшей.

## Разработка Electron в двух словах

Разработка Electron приложения ведется на JavaScript, при использовании тех же принципов и методов, которые можно найти в разработке на Node.js. Все особенности API и сам API Electron'а доступен через `electron` модуль, который может быть использован как и любой Node.js модуль:

```javascript
const electron = require('electron')
```

Модуль `electron` предоставляет специальные особенности в пространстве имен (namespaces). Например жизненный цикл приложения контролируется через `electron.app`, окна могут быть созданы при использовании класса `electron.BrowserWindow`. Простой файл `main.js` может просто ждать пока приложение не будет готово и после этого открыть окно приложения:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Создаем окно браузера.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

// и загружаем index.html в приложении.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

Файл `main.js` должен создавать окна и перехватывать все события системы, с которыми ваше приложение может столкнуться. Более сложная версия примера выше должна открывать инструменты разработчика, ждать когда окно будет закрыто или открыто заново на macOS если пользователь кликнул на иконку приложения.

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Создаем окно браузера.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

// и загружаем index.html в приложении.
  win.loadFile('index.html')

  // Отображаем средства разработчика.
  win.webContents.openDevTools()
}

// Этот метод будет вызван, когда Electron закончил
// инициализация и готов для создания окон браузера.
// Некоторые API могут использоваться только после возникновения этого события.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
// В этом файле Вы можете включить другие части вашего приложения, которые должны быть отражены в главном процессе кода. Можно также поместить их в отдельные файлы и применить к ним require.
```

Наконец `index.html` — веб-страница, которую вы хотите показать:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Запуск Вашего приложения

Создав файлы `main.js`, `index.html`, и `package.json`, вы можете попробовать запустить свое приложение, написав `npm start` в командной строке из директории, где ваше приложение находится.

## Попробуйте этот пример

Склонируйте и запустите код, приведенный в данном обучающем посте, из [`electron/electron-quick-start`][quick-start] репозитория.

**Примечание**: Для запуска требуется [Git](https://git-scm.com) и [npm](https://www.npmjs.com/).

```sh
# Клонируем репозиторий
$ git clone https://github.com/electron/electron-quick-start
# Переходим в папку репозитория
$ cd electron-quick-start
# Устанавливаем зависимости
$ npm install
# Запускаем приложение
$ npm start
```

Посетите [Boilerplates and CLIs documentation][boilerplates] для получения списка шаблонов и инструментов для быстрого старта вашей разработки.

[quick-start]: https://github.com/electron/electron-quick-start
[boilerplates]: ./boilerplates-and-clis.md
