# Краткое руководство по запуску

## Быстрый старт

Electron - это фреймворк, который позволяет создавать настольные приложения с помощью JavaScript, HTML и CSS. Затем эти приложения можно упаковать для запуска непосредственно в macOS, Windows или Linux или распространять через Mac App Store или Microsoft Store.

Обычно вы создаете десктопное приложение для операционной системы (ОС) с использованием специфических для каждой операционной системы системных приложений. Electron позволяет один раз написать ваше приложение с использованием уже знакомых вам технологий.

### Требования

Перед продолжением с Electron необходимо установить [Node.js][node-download]. Мы рекомендуем вам установить последнюю версию `LTS` или `Current` версию.

> Пожалуйста, установите Node.js с помощью предварительно собранных инсталляторов для вашей платформы. Вы можете столкнуться с проблемами несовместимости с различными инструментами разработки.

Чтобы убедиться, что Node.js был установлен правильно, введите следующие команды в вашем клиенте терминала:

```sh
node -v
npm -v
```

Команды должны вывести версии Node.js и npm соответственно. Если обе команды выполнены успешно, вы готовы установить Electron.

### Создать базовое приложение

С точки зрения разработки, приложение Electron по сути является приложением Node.js. Это означает, что начальной точкой вашего приложения Electron будет файл `package.json`, как в любом другом приложении Node.js. Базовое приложение на Electron имеет следующую структуру:

```plaintext
my-electron-app/
├── package.json
├── main.js
├── preload.js
└── index.html
```

Давайте создадим базовое приложение на основе структуры выше.

#### Установка Electron

Создайте папку для вашего проекта и установите Electron:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### Создать файл основного скрипта

Основной скрипт определяет точку входа вашего приложения Electron (в нашем случае файл `main.js`), который будет запускать Главный процесс. Как правило, скрипт, который запускается в главном процессе, контролирует жизненный цикл приложения, отображает графический интерфейс пользователя и его элементы, выполняет взаимодействие с родными операционными системами и создает процессы Renderer внутри веб-страниц. Приложение Electron может иметь только один главный процесс.

Основной скрипт может выглядеть следующим образом:

```javascript fiddle='docs/fiddles/quick-start'
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

##### Что происходит в коде выше?

1. Строка 1: Для начала, вы импортируете `app` и `BrowserWindow` модули из `Electron` для управления событиями жизненного цикла вашего приложения, а также создания и управления окнами браузера.
2. Строка 2: Во-вторых, вы импортируете `path` пакет, который предоставляет полезные функции для файловых путей.
3. Строка 4: После этого вы определяете функцию, которая создает [новое окно браузера](../api/browser-window.md#new-browserwindowoptions) со сценарием предварительной загрузки, загружает файл `index.html` в это окно (строка 13, мы обсудим файл позже).
4. Line 16: Вы создаете новое окно браузера, вызвав функцию `createWindow` после инициализации приложения Electron [](../api/app.md#appwhenready).
5. Строка 18: Вы добавляете новый обработчик события, который создает новое окно браузера только тогда, когда приложение не имеет видимых окон после активации. Например, после запуска заявки в первый раз или повторного запуска уже запущенного приложения.
6. Строка 25: Вы добавляете новый обработчик события, который пытается выйти из приложения, когда у него больше нет открытых окон. Этот слушатель не входит в macOS из-за поведения [системы управления окном](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac).

#### Создать веб-страницу

Это веб-страница, которую вы хотите отобразить после инициализации приложения. Эта веб-страница представляет процесс рендерера. Вы можете создать несколько окон браузера, где каждое окно использует свой собственный рендер. Вы можете предоставить доступ к дополнительному API Node.js, используя их в скрипте предварительной загрузки.

Страница `index.html` выглядит следующим образом:

```html fiddle='docs/fiddles/quick-start'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    <p>
        We are using Node.js <span id="node-version"></span>,
        Chromium <span id="chrome-version"></span>,
        and Electron <span id="electron-version"></span>.
    </p>
</body>
</html>
```

#### Define a preload script

Your preload script (in our case, the `preload.js` file) acts as a bridge between Node.js and your web page. It allows you to expose specific APIs and behaviors to your web page rather than insecurely exposing the entire Node.js API. In this example we will use the preload script to read version information from the `process` object and update the web page with that info.

```javascript fiddle='docs/fiddles/quick-start'
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
```

##### What's going on above?

1. On line 1: First you define an event listener that tells you when the web page has loaded
2. On line 2: Second you define a utility function used to set the text of the placeholders in the `index.html`
3. On line 7: Next you loop through the list of components whose version you want to display
4. On line 8: Finally, you call `replaceText` to look up the version placeholders in `index.html` and set their text value to the values from `process.versions`

#### Изменить файл package.json

Ваше приложение Electron использует файл `package.json` в качестве основной точки входа (как и любое другое приложение Node.js). Основной скрипт вашего приложения - `main.js`, поэтому измените файл `package.json` соответственно:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js"
}
```

> ПРИМЕЧАНИЕ: Если поле `main` опущено, Electron попытается загрузить `index.js` файл из каталога, содержащего `package.json`.

> NOTE: The `author` and `description` fields are required for packaging, otherwise error will occur when running `npm run make`.

По умолчанию, старт `npm` запустит основной скрипт с помощью Node.js. Чтобы запустить скрипт с Electron, необходимо изменить его следующим образом:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }
}
```

#### Запустите приложение

```sh
npm start
```

Приложение Electron должно выглядеть следующим образом:

![Самое простое приложение Electron](../images/simplest-electron-app.png)

### Пакет и распространение приложения

Самый простой и быстрый способ распространения вашего только что созданного приложения - это использовать [Electron Forge](https://www.electronforge.io).

1. Импорт Electron Forge в папку приложений:

    ```sh
    npm install --save-dev @electron-forge/cli
    npx electron-forge import

    ✔ Checking your system
    ✔ Initializing Git Repository
    ✔ Writing modified package.json file
    ✔ Installing dependencies
    ✔ Writing modified package.json file
    ✔ Fixing .gitignore

    We have ATTEMPTED to convert your app to be in a format that electron-forge understands.

    Спасибо за использование "electron-forge"!!!
    ```

1. Создать распределенную таблицу:

    ```sh
    npm run make

    > my-gsod-electron-app@1.0. make /my-electron-app
    > electron-forge make

    ✔ Проверка системы
    ✔ Решение конфигурации Forge
    Нам нужно установить ваше приложение, прежде чем мы сможем сделать его
    ✔ Подготовка к пакету приложения для архива: x64
    ✔ Подготовка собственных зависимостей
    ✔ Приложение для упаковки
    Создание следующих целей: zip
    ✔ Создание архива для цели: zip - На платформе: darwin - Для ар: x64
    ```

    Electron-forge создает папку `out`, в которой будет находиться ваш пакет:

    ```plain
    // Пример для MacOS
    out/
    <unk> <unk> <unk> -out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    <unk> ・ <unk> <unk> <unk> ...
    <unk> ，out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

## Изучение основ

Этот раздел рассказывает о том, как Electron работает под капотом. Он направлен на укрепление знаний о Electron и приложении, созданного ранее в разделе Quickstart.

### Архитектура приложения

Электрон состоит из трех основных столбов:

* **Chromium** для отображения веб-контента.
* **Node.js** для работы с локальной файловой системой и операционной системой.
* **Пользовательские API** для работы с часто требуемыми ОС функциями.

Разработка приложения с Electron похоже на создание приложения Node.js с веб-интерфейсом или создание веб-страниц с интегрированием Node.js.

#### Main и Renderer процессы

Как уже упоминалось ранее, Electron имеет два типа процессов: Main и Renderer.

* Главный процесс **создает** веб-страницы, создавая `BrowserWindow` экземпляров. Каждый экземпляр `BrowserWindow` запускает веб-страницу в процессе визуализации. После уничтожения экземпляра `BrowserWindow` , соответствующий процесс Renderer также завершается.
* Главный процесс **управляет** всеми веб-страницами и соответствующими процессами визуализации.

----

* Процесс рендерера **управляет** только соответствующей веб-страницей. Ошибка в одном процессе рендерера не влияет на другие процессы рендерера.
* Процесс Renderer **связывает** с главным процессом через IPC для выполнения GUI операций на веб-странице. Использование собственных API, связанных с GUI, из процесса Renderer напрямую ограничено из-за проблем с безопасностью и потенциальной утечкой ресурсов.

----

Связь между процессами возможна через межпроцессные модули связи: [`ipcMain`](../api/ipc-main.md) и [`ipcRenderer`](../api/ipc-renderer.md).

#### API

##### Electron API

Electron API назначаются на основе типа процесса, означает что некоторые модули могут быть использованы из процесса Main или Renderer и некоторые из них. В документации по API Electron указывается, из какого модуля можно использовать каждый модуль.

Например, для доступа к Electron API в обоих процессах, требуется включаемый модуль:

```js
const electron = require('electron')
```

Чтобы создать окно, вызовите класс `BrowserWindow` , который доступен только в главном процессе:

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

Для вызова главного процесса от Renderer, используйте модуль IPC:

```js
// In the Main process
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... do actions on behalf of the Renderer
})
```

```js
// В процессе рендерера
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> ПРИМЕЧАНИЕ: Поскольку процессы рендерера могут запускать ненадежный код (особенно от третьих сторон), Важно тщательно подтвердить поступающие к Главному процессу просьбы.

##### Node.js API

> NOTE: To access the Node.js API from the Renderer process, you need to set the `nodeIntegration` preference to `true` and the `contextIsolation` preference to `false`.  Please note that access to the Node.js API in any renderer that loads remote content is not recommended for [security reasons](../tutorial/security.md#2-do-not-enable-nodejs-integration-for-remote-content).

Electron предоставляет полный доступ к Node.js API и его модулям как в основных процессах, так и в процессах Renderer. Например, вы можете прочитать все файлы из корневого каталога:

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

Чтобы использовать модуль Node.js, сначала необходимо установить его в качестве зависимости:

```sh
npm install --save aws-sdk
```

Затем, в приложении Electron требуется модуль:

```js
const S3 = require('aws-sdk/clients/s3')
```

[node-download]: https://nodejs.org/en/download/
