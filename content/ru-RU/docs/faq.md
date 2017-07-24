# FAQ по Electron

## Когда Electron получает последнее обновление Chrome?

Chrome для Electron обычно выпускается в течение одной или двух недель после выпуска стабильной версии Chrome. Этот срок не является гарантированным и зависит от объема работ связанных с обновлением.

Используются только стабильные версии Chrome. Если необходимо внести важные исправления в beta или dev версии, мы произведем бэкпорт.

Для получения дополнительной информации, пожалуйста, просмотрите [Введение в обеспечение безопасности](tutorial/security.md).

## Когда Electron производит обновление до последней версии Node.js?

После выпуска новой версии Node.js, мы обычно ждем примерно месяц до обновления в Electron. Так мы можем избежать воздействия ошибок в новых версиях Node.js, что случается очень часто.

New features of Node.js are usually brought by V8 upgrades, since Electron is using the V8 shipped by Chrome browser, the shiny new JavaScript feature of a new Node.js version is usually already in Electron.

## Как передавать данные между страницами?

Для передачи данных между веб-страницами (процессами рендеринга) самым простым способом является использование HTML5 API который уже доступен в браузерах. Хорошими вариантами являются [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), и [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Или же вы можете использовать систему IPC, которая характерна для Electron, для хранения объектов в главном процессе как глобальную переменную, и затем получать доступ к ней из рендереров через `remote` переменную `electron`:

```javascript
// В главном процессе
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// На странице 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// На странице 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## Окно/Трей моего приложения исчезает через несколько минут.

Это происходит, когда переменная, используемая для хранения панели окна/трея уничтожается сборщиком мусора.

Если вы столкнулись с этой проблемой, могут оказаться полезными следующие статьи:

* [Управление памятью](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Область видимости переменной](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

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

## I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

```javascript
// In the main process.
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