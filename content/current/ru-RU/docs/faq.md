# FAQ по Electron

## Проблемы, возникающие при установке Electron

При выполнении команды `npm install electron`, некоторые пользователи сталкиваются с проблемами установки.

В большинстве случаев, эти ошибки являются результатом проблем сети и не связаны с npm пакетом `electron`. Такие ошибки, как `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` и`ETIMEDOUT` возникают в результате проблем с сетью. Лучшее решение - попытаться переключить сеть, или немного подождать, и попытаться установить снова.

Также вы можете попытаться скачать Electron непосредственно из [electron/electron/releases](https://github.com/electron/electron/releases), если установка через `npm` терпит неудачу.

## Когда Electron получит последнее обновление Chrome?

Chrome для Electron обычно выпускается в течение одной или двух недель после выпуска стабильной версии Chrome. Этот срок не является гарантированным и зависит от объема работ, связанных с обновлением.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

Для получения дополнительной информации, пожалуйста, просмотрите [введение в обеспечение безопасности](tutorial/security.md).

## Когда Electron получит последнее обновление Node.js?

После выпуска новой версии Node.js, мы обычно ждем примерно месяц до обновления в Electron. Это помогает избежать ошибок, которые присутствуют в новых версиях Node.js, что случается довольно часто.

Новые возможности Node.js обычно входят в обновления V8, так как Electron использует V8, поставляемый с браузером Chrome, новейшие возможности JavaScript в новой версии Node.js обычно уже входят в Electron.

## Как передавать данные между страницами?

Для передачи данных между веб-страницами (графическими процессами) самым простым способом является использование HTML5 API, который уже доступен в браузерах. Хорошими вариантами являются [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), и [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Или же вы можете использовать систему IPC, которая характерна для Electron, для хранения объектов в основном процессе, как глобальную переменную, и затем получать доступ к ней из графических процессов, через свойство `remote` модуля `electron`:

```javascript
// В основном процессе.
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

## Трей моего приложения исчезает через несколько минут.

Это происходит, когда переменная, используемая для хранения трея уничтожается сборщиком мусора.

Если Вы столкнулись с этой проблемой, могут оказаться полезными следующие статьи:

* [Управление памятью](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Область видимости переменной](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Если Вы хотите это быстро исправить, Вы можете сделать переменную глобальной, заменив для этого следующий код:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/путь/до/иконки.png')
  tray.setTitle('привет мир')
})
```

на этот:

```javascript
{ app, Tray }
```

## У меня не получается использовать jQuery/RequireJS/Meteor/AngularJS в Electron.

В связи с интеграцией Node.js с Electron, существуют некоторые дополнительные ключевые слова вставляемые в DOM, такие как: `module`, `exports`, и `require`. Это вызывает проблемы для некоторых библиотек, так как они пытаются вставить такие же имена.

Для решения этой проблемы, Вы можете отключить интеграцию node в Electron:

```javascript
// В основном процессе.
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Но если Вы хотите сохранить возможность использования Node.js или API Electron, Вы должны переименовать переменные на странице перед подключением других библиотек:

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

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

It is very likely you are using the module in the wrong process. Например `electron.app` может быть использован только в главном процессе, в то время как `electron.webFrame` доступен только в процессах рендеринга.

## Шрифт выглядит размытым, что это и что я могу с этим сделать?

If [sub-pixel anti-aliasing](http://alienryderflex.com/sub_pixel/) is deactivated, then fonts on LCD screens can look blurry. Пример:

![пример прорисовки подпикселя](images/subpixel-rendering-screenshot.gif)

Для анти-алиасинга подпикселя требуется непрозрачный фон, содержащий глифы шрифта. (См. [эту проблему](https://github.com/electron/electron/issues/6344#issuecomment-420371918) для получения дополнительной информации).

Для достижения этой цели, установите фон в конструкторе [BrowserWindow](api/browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Even if you don't see a difference, some of your users may. It is best to always set the background this way, unless you have reasons not to do so.

Обратите внимание, что только настройка фона в CSS не имеет желаемого эффекта.
