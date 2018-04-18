# Написание Вашего Первого Electron Приложения

Electron позволяет создавать настольные приложения на чистом JavaScript, предоставляя среду выполнения с богатым нативным интерфейсом API (операционной системы). Вы могли видеть это как вариант времени выполнения Node.js, ориентированного на настольные приложения вместо веб-серверов.

Это не означает, что Electron является JavaScript привязанной библиотекой графического пользовательского интерфейса (GUI). Вместо этого Electron использует веб-страницы как GUI, поэтому вы могли также видеть его как минимальный Chromium браузер, контролируемый JavaScript-ом.

**Примечание**: Данный пример можно полностью найти в репозитории [скачать и запустить прямо сейчас](#trying-this-example).

Если посмотреть на приложение, созданное на базе Electron, то оно по своей сути является Node.js приложением. Начальной точкой приложения является `package.json` файл, идентичный одноименному модулю Node.js. Самое простое Electron приложение будет иметь следующую структуру папок:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

Теперь давайте создадим пустую папку для вашего Electron приложения. Для этого откройте свой клиент командной строки и запустите `npm init` из папки, созданной ранее.

```sh
npm init
```

npm будет вести вас на протяжении создания базового `package.json` файла. Скрипт, указанный в поле `main`, является стартовым скриптом для вашего проиложения, который будет запускать весь процесс. Например, ваш файл `package.json` может выглядеть следующим образом:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

**Примечание**: Если поле `main` отсутствует в файле `package.json`, то Electron будет пытаться загрузить файл `index.js` (также как сам Node.js). Если это было простое Node приложение, вам нужно добавить `start` скрпт, который будет "говорить" `node` выполнить текущий пакет:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

Превратить такое Node приложение в Electron приложение довольно-таки легко - нужно заменить `node` в поле start на `electron`.

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

Сейчас вам нужно будет установить сам `electron`. Рекомендуемым для этого путем является его установка вкачестве зависимости в вашем приложении, что позволяет вам работать с многими приложениями, используя разные версии Electron'а. Для этого вам нужно запустить следующую команду из директории вашего приложения:

```sh
npm install --save-dev electron
```

Также существуют другие способы установки Electron'a. Пожалуйста, посетите [гайд по установке](installation.md) для получения дополнительных знаний об использовании прокси, зеркал и собствевнный кеш.

## Разработка Electron в двух словах

Разработка Electron приложения ведется на JavaScript, при использовании тех же принципов и методов, которые можно найти в разработке на Node.js. All APIs and features found in Electron are accessible through the `electron` module, which can be required like any other Node.js module:

```javascript
const electron = require('electron')
```

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might just wait for the application to be ready and open a window:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // и загрузит index.html приложение.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

app.on('ready', createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Храните глобальную ссылку на объект окна, если вы этого не сделаете, окно будет
// автоматически закрываться, когда объект JavaScript собирает мусор.
let win

function createWindow () {
  // Создаёт окно браузера.
  win = new BrowserWindow({width: 800, height: 600})

  // и загрузит index.html приложение.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Откроет DevTools.
  win.webContents.openDevTools()

  // Возникает, когда окно будет закрыто.
  win.on('closed', () => {
    // Разбирает объект окна, обычно вы можете хранить окна     
    // в массиве, если ваше приложение поддерживает несколько окон в это время,
    // тогда вы должны удалить соответствующий элемент.
    win = null
  })
}

// Этот метод будет вызываться, когда Electron закончит 
// инициализацию и готова к созданию окон браузера.
// Некоторые интерфейсы API могут использоваться только после возникновения этого события.
app.on('ready', createWindow)

// Выйти, когда все окна будут закрыты.
app.on('window-all-closed', () => {
  // На macOS это обычно для приложений и их строки меню   
  // оставаться активным до тех пор, пока пользователь не выйдет явно с помощью Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
   // На MacOS это общее для того чтобы создать окно в приложении, когда значок 
   // dock нажали и нет других открытых окон.
  if (win === null) {
    createWindow()
  }
})

// В этом файле вы можете включить код другого основного процесса 
// вашего приложения. Можно также поместить их в отдельные файлы и применить к ним require.
```

Наконец `index.html` — веб-страница, которую вы хотите показать:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    Мы используем node <script> document.write (process.versions.node)</script>,
    Chrome <script>document.write (process.versions.chrome)</script>,
    и Electron<script>document.write (process.versions.electron)</script>.
  </body>
</html>
```

## Запуск Вашего приложения

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you can try your app by running `npm start` from your application's directory.

## Trying this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com).

```sh
# Clone the repository
$ git clone https://github.com/electron/electron-quick-start
# Go into the repository
$ cd electron-quick-start
# Install dependencies
$ npm install
# Run the app
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).