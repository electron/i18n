# FAQ Electron

## Чому виникають проблеми з інсталяцією Electron?

Під час роботи `npm install electron`, деякі користувачі іноді стикаються з помилками установки.

В майже всіх випадках, ці помилки є результатом проблем з мережею, а не з npm пакетом `electron`. Такі помилки як `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` і `ETIMEDOUT` є показниками проблем з мережею. Найкраще рішення спробувати перемкнути мережі чи просто зачекати та спробувати встановити ще раз.

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

This happens when the variable which is used to store the window/tray gets garbage collected.

If you encounter this problem, the following articles may prove helpful:

* [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Variable Scope](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

If you want a quick fix, you can make the variables global by changing your code from this:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

to this:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Я не можу використати jQuery/RequireJS/Meteor/AngularJS в Electron.

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

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

But if you want to keep the abilities of using Node.js and Electron APIs, you have to rename the symbols in the page before including other libraries:

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

## `require('electron').xxx` is undefined.

When using Electron's built-in module you might encounter an error like this:

    > require('electron').webFrame.setZoomFactor(1.0)
    Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
    

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

    "/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
    

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```bash
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.