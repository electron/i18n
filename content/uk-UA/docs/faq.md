# FAQ Electron

## Чому виникають проблеми з інсталяцією Electron?

Під час роботи `npm install electron`, деякі користувачі іноді стикаються з помилками установки.

В майже всіх випадках, ці помилки є результатом проблем з мережею, а не з npm пакетом `electron`. Такі помилки як `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` і `ETIMEDOUT` є показниками проблем з мережею. Найкраще рішення спробувати змінити мережу або ж просто зачекатита спробувати встановити ще раз.

Ви також можете спробувати завантажити Electron прямо з [electron/electron/releases](https://github.com/electron/electron/releases) якщо не вдасться встановити через `npm`.

## Коли Electron оновлюється до останньої версії Chrome?

Chrome для Electron зазвичай випускається на протязі тижня чи двох після релізу стабільної версії Chrome. Цей термін не є гарантованим і залежить від кількості роботи спричиненої оновленням.

Використовуються тільки стабільні версії Chrome. Якщо важливе виправлення присутнє в beta чи dev версії, ми застосуємо їх.

Для більш детальної інформації, перегляньте [Політику безпеки](tutorial/security.md).

## Коли Electron оновлюється до останньої версії Node.js?

Коли виходить нова версія Node.js, см зазвичай чекаємо місяць перед тим як оновити її в Electron. Таким чином ми можемо уникнути впливу помилок випущених в нових версіях Node.js, що стається досить часто.

Нові можливості Node.js зазвичай потрапляють в оновлення V8, так як Electron використовує V8 наданий браузером Chrome, найновіші можливості JavaScript в новій версії Node.js зазвичай уже входять в Electron.

## Як обмінюватися даними між веб-сторінками?

Для передачі даних між веб-сторінками (рендеринг) найлегшим способом буде використання HTML5 API, який вже доступний в браузері. Хорошими кандидатами є [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) та [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Вбо ви можете використати IPC систему, яка характерна для Electron, для збереження об'єктів у головному процесі як глобальну змінну і потім мати доступ до неї з рендерерів через `remote` властивість модуля `electron`:

```javascript
// В головному процесі.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// На сторнці 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// На сторінці 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## Вікно/трей зникає через декілька хвилин.

Це стається коли змінна, що використовуєтсья для зберігання вікна/трею знищується колектором сміття.

Якщо ви стикнулися з цією проблемою, наступні статті стануть вам у нагоді:

* [Керування Пам'яттю](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Область Видимості Змінних](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Якщо вам потрібне швидке рішення, ви можете зробити змінні глобальними, змінивши ваш код з такого:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

на такий:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Я не можу використати jQuery/RequireJS/Meteor/AngularJS в Electron.

Через інтеграцію Node.js з Electron, є деякі додаткові ключові слова, які всавляються в DOM, такі як: `module`, `exports`, `require`. Це спричиняє проблеми з деякими бібліотеками, так як вони хочуть вставити такі самі ключові слова.

Для вирішення ви можете вимкнути інтеграцію node в Electron:

```javascript
// В головному процесі.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Але якщо ви хочете зберегти можливість використання Node.js і API Electron, вам потрібно перейменувати змінні на сторінці перед підключенням інших бібліотек:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` is undefined (не визначено).

При використанні вбудованих модулів Electron ви можете стикнутися з помилками типу:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

Це стається через те що [npm модуль `electron`](https://www.npmjs.com/package/electron) встановлений локально і глобально, що перезаписує вбудовані модулі Electron.

Щоб перевірити правильність використання вбудованого модуля ви можете вивести шлях до модуля `electron`:

```javascript
console.log(require.resolve('electron'))
```

і перевірити чи він має наступний вигляд:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

Якщо він схожий на `node_modules/electron/index.js`, то ви маєте видалити модуль npm `electron`, чи перейменувати його.

```sh
npm uninstall electron
npm uninstall -g electron
```

Однак якщо ви використовуєте вбудований модуль, але все рівно отримуєте помилки, найімовірніше ви використовуєте модуль в неправильному процесі. Наприклад `electron.app` може бути використаний тільки в головному процесі, тоді як `electron.webFrame` доступний тільки в процесі рендерингу.