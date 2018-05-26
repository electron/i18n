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

**Note**: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js` (as Node.js does). Если это было простое Node приложение, вам нужно добавить `start` скрпт, который будет "говорить" `node` выполнить текущий пакет:

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

Electron apps are developed in JavaScript using the same principles and methods found in Node.js development. Все особенности API и сам API Electron'а доступен через `electron` модуль, который может быть использован как и любой Node.js модуль:

```javascript
const electron = require('electron')
```

Модуль `electron` предоставляет специальные особенности в пространство имен(namespaces). Например жизненный цикл приложения контролируется через `electron.app`, окна могут быть созданны пр использовании класса `electron.BrowserWindow`. A simple `main.js` file might wait for the application to be ready and open a window:

```javascript
const {app, BrowserWindow} = require('electron')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // и загрузит index.html приложение.
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

Файл `main.js` должен создавать окна и перехватывать все события системы, с которыми ваше приложение может столкнуться. Более сложная версия примера выше должна открывать инструменты разработчика, ждать когда окно будет закрыто или открыто заново на macOS если пользователь кликнул на иконку приложения.

```javascript
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Создаёт окно браузера.
  win = new BrowserWindow({width: 800, height: 600})

  // и загрузит index.html приложение.
  win.loadFile('index.html')

  // Open the DevTools.
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

Создав файлы `main.js`, `index.html`, и `package.json`, вы можете попробовать запустить свое приложение, написав `npm start` в командной строке из директории, где ваше приложение находится.

## Попробуте данный Пример

Склонируйте и запустите код, приведенный в данном обучающем посте, из [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) репозитория.

**Примечание**: Для запуска потребуется [Git](https://git-scm.com).

```sh
# Клонируем репозиторий
$ git clone https://github.com/electron/electron-quick-start
# Переходим в папку с приложением
$ cd electron-quick-start
# Устанавливаем зависимости
$ npm install
# Запускаем приложение
$ npm start
```

Посетите [Boilerplates and CLIs documentation](./boilerplates-and-clis.md) для получения списка шаблонов и инструментов для быстрого старта вашей разработки.