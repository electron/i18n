# Написання твого першого Electron додатку

Electron дозволяє вам створювати прикладні застосунки за допомогою чистого JavaScript, надаючи середовище з багатим нативним (операційна система) API. Ви можете розглядати це як варіант Node.js середовища, яке фокусується на прикладних застосунках, а не вебсервісах.

Це не означає, що Electron це JavaScript зв'язок для графічного інтерфейсу користувача (GUI) бібліотеки. Навпаки, Electron використовує веб-сторінки як свій інтерфейс, щоб ви могли побачити їх як мінімальний браузер Chromium, контролюючий JavaScript.

**Зверніть увагу**: цей приклад також доступний як репозиторій, який ви можете [завантажити і виконати відразу](#trying-this-example).

Що стосується розробки застосунків Electron це по суті Node.js app. The starting point is a `package.json` that is identical to that of a Node.js module. Базовий Electron застосунок міг би мати таку структуру папки:

```plaintext
your-app/
├── package.json
├── main.js
└── index.html
```

Створіть нову порожню папку для нової програми Electron. Відкрийте командний рядок клієнт і запустіть `npm init` з цієї дуже папки.

```sh
npm init
```

npm проведе вас через створення базового `package.json` файлу. Скрипт , вказаний в `основним` поле, є скрипт запуску вашого додатку, який запуститься в головному процесі. Приклад вашого `package.json` може виглядати наступним чином:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

__Note__: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js` (as Node.js does). If this was actually a simple Node application, you would add a `start` script that instructs `node` to execute the current package:

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

Turning this Node application into an Electron application is quite simple - we merely replace the `node` runtime with the `electron` runtime.

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

## Встановлення Electron

У цій точці, вам потрібно буде встановити `електрон`. Рекомендується встановити його як залежність від розробників у вашому додатку, який дозволяє вам працювати з декількома додатками з різними версіями Electron. Для цього виконайте наступну команду з каталогу вашого додатка:

```sh
npm install --save-dev electron
```

Інше означає, що для встановлення Electron існує. Будь ласка, ознайомтеся з правилами встановлення [](installation.md) щоб дізнатися про використання з проксі, дзеркалами, та користувацькими кешеми.

## Розробка на Electron в Nutshell

Програми Electron розробляються в JavaScript, використовуючи ті ж принципи і методи знайдені в розробці Node.js. Всі API та функції, знайдені в Electron, доступні через модуль `електрон` , які можуть бути необхідні, як будь-який інший Node. s модуль:

```javascript
const electron = require('electron')
```

Модуль `електрон` надає функції у просторі імен. Як приклади, життєвий цикл програми здійснюється через `електрон. pp`, вікна можна створити за допомогою класу `electron.BrowserWindow`. Простий файл `main.js` може зачекати для того, щоб додаток був готовий і відкрити вікно:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Створює вікно браузера.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // і завантажує index.html.
  win.loadFile('index.html')


app.whenReady().then(createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. Більш повна версія наведеного нижче прикладу може відкрити розробники інструменти, обробте вікно, що закриється, або повторно створити вікна на macOS, якщо користувач натискає на значок додатку в панелі задач.

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Створює вікно браузера.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // і завантажити index.html додатку.
  win.loadFile('index.html')

  // Відкриває DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Деякі API можна використовувати тільки після того, як відбудеться ця подія.
app.whenReady().then(createWindow)

// Вийти, коли всі вікна закриті.
app.on('window-all-closed', () => {
  // На macOS він поширений для додатків і їх меню
  // щоб залишатися активним до тих пір, поки користувач не закриває Cmd + Q
  , якщо (процес. latform !== 'darwin') {
    app. uit()
  }
})

програма. n('активація', () => {
  // На macOS звично повторно створити вікно у застосунку, коли
  // піктограма в док-станції натиснута, і інші вікна не відкриваються.
  якщо (BrowserWindow.getAllWindows(). ength === 0) {
    createWindow()
  }
})

// В цьому файлі ви можете включити в себе решту основного процесу програми
// код. Ви також можете помістити їх в окремі файли та вимагати їх тут.
```

Нарешті `index.html` це веб-сторінка, яку ви хочете показати:

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

## Запуск Вашого Застосунку

Після того, як ви створили свій перший файл `main.js`, `index.html`і `пакет . син` файлів, ви можете спробувати додаток запустивши `npm старт` з директорії вашого додатку

## Намагаємося зробити приклад

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`][quick-start] repository.

**Примітка**: Запуск цього прикладу потребує [Git](https://git-scm.com) та [npm](https://www.npmjs.com/).

```sh
# Клонування репозиторію
$ git clone https://github.com/electron/electron-quick-start
# Вхід в репозиторій
$ cd electron-quick-start
# Встановлення залежностей
$ npm install
# Запуск програми
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation][boilerplates].

[quick-start]: https://github.com/electron/electron-quick-start
[boilerplates]: ./boilerplates-and-clis.md
