# FAQ Electron

## Чому виникають проблеми з інсталяцією Electron?

Під час роботи `npm install electron`, деякі користувачі іноді стикаються з помилками встановлення.

У майже всіх випадках, ці помилки є результатом проблем з мережею, а не з npm пакетом `electron`. Такі помилки як `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` і `ETIMEDOUT` є показниками проблем з мережею. Найкраще рішення — спробувати змінити мережу або ж просто зачекати та спробувати встановити ще раз.

Ви також можете спробувати завантажити Electron прямо з [electron/electron/releases](https://github.com/electron/electron/releases) якщо не вдасться встановити через `npm`.

## Коли Electron оновлюється до останньої версії Chrome?

Chrome для Electron зазвичай випускається протягом тижня чи двох після релізу стабільної версії Chrome. Цей термін не є гарантованим і залежить від кількості роботи спричиненої оновленням.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

Для більш детальної інформації, перегляньте [Політику безпеки](tutorial/security.md).

## Коли Electron оновлюється до останньої версії Node.js?

Коли виходить нова версія Node.js, ми зазвичай чекаємо місяць перед тим як оновити її в Electron. Таким чином ми можемо уникнути впливу помилок випущених в нових версіях Node.js, що стається досить часто.

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
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## My app's tray disappeared after a few minutes.

This happens when the variable which is used to store the tray gets garbage collected.

Якщо ви стикнулися з цією проблемою, наступні статті стануть вам у нагоді:

* [Керування Пам'яттю](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Область Видимості Змінних](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Якщо вам потрібне швидке рішення, ви можете зробити змінні глобальними, змінивши ваш код з такого:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

на такий:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Я не можу використати jQuery/RequireJS/Meteor/AngularJS в Electron.

Через інтеграцію Node.js з Electron, є деякі додаткові ключові слова, які всавляються в DOM, такі як: `module`, `exports`, `require`. Це спричиняє проблеми з деякими бібліотеками, так як вони хочуть вставити такі самі ключові слова.

Для вирішення цієї проблеми ви можете вимкнути інтеграцію node в Electron:

```javascript
// В головному процесі.
const { BrowserWindow } = require('electron')
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

It is very likely you are using the module in the wrong process. Наприклад `electron.app` може бути використаний тільки в головному процесі, тоді як `electron.webFrame` доступний тільки в процесі рендерингу.

## The font looks blurry, what is this and what can I do?

If [sub-pixel anti-aliasing](http://alienryderflex.com/sub_pixel/) is deactivated, then fonts on LCD screens can look blurry. Приклад:

![subpixel rendering example](images/subpixel-rendering-screenshot.gif)

Sub-pixel anti-aliasing needs a non-transparent background of the layer containing the font glyphs. (See [this issue](https://github.com/electron/electron/issues/6344#issuecomment-420371918) for more info).

Для досягнення цієї цілі, виберіть фон в конструкторі для [BrowserWindow](api/browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Even if you don't see a difference, some of your users may. It is best to always set the background this way, unless you have reasons not to do so.

Зверніть увагу, що лише налаштування фону в CSS не принесе бажаного результату.
