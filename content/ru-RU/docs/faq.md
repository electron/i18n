# FAQ по Electron

## Когда Electron получает последнее обновление Chrome?

Chrome для Electron обычно выпускается в течение одной или двух недель после выпуска стабильной версии Chrome. Этот срок не является гарантированным и зависит от объема работ связанных с обновлением.

Используются только стабильные версии Chrome. Если необходимо внести важные исправления в beta или dev версии, мы произведем бэкпорт.

Для получения дополнительной информации, пожалуйста, просмотрите [Введение в обеспечение безопасности](tutorial/security.md).

## Когда Electron производит обновление до последней версии Node.js?

После выпуска новой версии Node.js, мы обычно ждем примерно месяц до обновления в Electron. Так мы можем избежать воздействия ошибок в новых версиях Node.js, что случается очень часто.

Новые возможности Node.js обычно входят в обновления V8, так как Electron использует V8, поставляемый с браузером Chrome, новейшие возможности JavaScript в новом Node.js версии обычно уже входят в Electron.

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

Если вы хотите это быстро исправить, вы можете сделать переменную глобальной, заменив для этого следующий код:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

на этот:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## У меня не получается использовать Jquery/RequireJS/Meteor/AngularJS в Electron.

В связи с интеграцией Node.js с Electron, существуют некоторые дополнительные ключевые слова вставляемые в DOM такие как: `module`, `exports`, `require`. Это вызывает проблемы для некоторых библиотек, так как они пытаются вставить такие же имена.

Для решения этой проблемы, вы можете отключить интеграцию node в Electron:

```javascript
// В главном процессе.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Но если вы хотите сохранить возможность использования Node.js или API Electron, вы должны переименовать имена на странице перед подключением других библиотек:

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

## `require('electron').xxx` is undefined (не определено).

При использовании встроенного модуля Electron может возникнуть подобная ошибка:

    > require('electron').webFrame.setZoomFactor(1.0)
    Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
    

Это происходит потому что [npm `electron` module](https://www.npmjs.com/package/electron) установлен локально и глобально и переопределяет встроенный модуль Electron.

Чтобы проверить, используете ли вы правильный встроенный модуль, вы можете вывести путь Electron модуля:

```javascript
console.log(require.resolve('electron'))
```

и затем проверьте, в такой ли он форме:

    "/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
    

Если он что-то вроде `node_modules/electron/index.js`, то тогда вам придется либо удалить npm модуль `electron`, или переименовать его.

```bash
npm uninstall electron
npm uninstall -g electron
```

Однако если вы используете встроенный модуль, но по-прежнему получаете эту ошибку, то вероятнее всего, вы используете модуль в неподходящем процессе. Например `electron.app` может быть использован только в главном процессе, в то время как `electron.webFrame` доступен только в процессах рендеринга.