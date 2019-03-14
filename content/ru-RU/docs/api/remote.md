# remote

> Позволяет использовать модули главного процесса из рендер-процесса.

Процесс: [Renderer](../glossary.md#renderer-process)

Модуль `remote` обеспечивает простой способ для межпроцессного взаимодействия (IPC) между процессом рендеринга (веб-страницы) и основного процесса.

В Electron GUI-ориентированные модули (такие, как `dialog`, `menu` и т. д.) доступны только в основном процессе, но не в процессе рендеринга. Для того, чтобы использовать их в рендер-процессе, необходим модуль `ipc`, чтобы посылать межпроцессные сообщения в основной процесс. С модулем `remote` вы можете вызывать методы объекта основного процесса без явной отправки межпроцессных сообщений, это похоже на Java [RMI](https://en.wikipedia.org/wiki/Java_remote_method_invocation). Пример создания окна браузера из рендер-процесса:

```javascript
const { BrowserWindow } = require('electron').remote
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

**Примечание:** Для обратной связи (доступа к рендер-процессу из основного процесса), вы можете использовать [webContents.executeJavaScript](web-contents.md#contentsexecutejavascriptcode-usergesture-callback).

**Примечание:** Модуль remote можно отключить по соображениям безопасности в следующих контекстах:

* [`BrowserWindow`](browser-window.md) - установкой опции `enableRemoteModule` в `false`.
* [`<webview>`](webview-tag.md)<webview></0> - установкой атрибута `enableremotemodule` в `false`.

## Remote Objects

Каждый объект (включая функции) возвращаемый модулем `remote` представляет собой объект в основном процессе (мы называем это удаленным объектом или удаленной функцией). Когда вы вызываете метод удаленного объекта, удаленную функцию или создаете новый объект удаленным конструктором (функцией), на самом деле вы посылаете синхронное межпроцессное сообщение.

В примере выше и [`BrowserWindow`](browser-window.md) и `win` являются удаленными объектами и `new BrowserWindow` на самом деле не создает объект `BrowserWindow` в рендер-процессе. Вместо этого создается объект `BrowserWindow` в основном процессе и возвращается соответствующий удаленный объект `win` в рендер-процесс.

**Примечание:** Доступны только [перечислимые свойства](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties), которые присутствуют при первом обращении к удаленному объекту, через дистанционное управление.

**Примечание:** Массивы и Buffers при доступе к ним через модуль `remote` копируются через IPC. Изменения, которые в них вносит рендер-процесс не отображаются в основном процессе и наоборот.

## Lifetime of Remote Objects

Electron следит за тем, что пока удаленный объект в рендер-процессе жив (другими словами, не будет удален сборщиком мусора) соответствующий объект в основном процессе не будет освобожден. Когда удаленный объект будет утилизирован сборщиком мусора, соответствующий объект в основном процессе также будет освобожден для сборщика.

Если удаленный объект допускает утечки (например, сохранен в map и никогда не освобождается), то соответствующий объект в основном процессе также будет утекать, поэтому вы должны быть очень осторожны, чтобы не вызывать утечек в удаленных объектах.

Однако основные типы данных, такие как число и строки, отправляются копией.

## Передача колбэков в основной процесс

Код основного процесса может принимать колбэки рендер-процесса (например, модуль `remote`), но вы должны использовать эту особенность в предельной осторожностью.

Во первых, во избежание взаимных блокировок, колбэки, передаваемые в основной процесс, вызываются асинхронно. Вы не должны ожидать в основном процессе, чтобы получить возвращаемые значения переданных колбэков.

Например, вы не можете использовать функцию из рендер-процесса в `Array.map`, вызываемой в основном процессе:

```javascript
// main process mapNumbers.js
exports.withRendererCallback = (mapper) => {
  return [1, 2, 3].map(mapper)
}

exports.withLocalCallback = () => {
  return [1, 2, 3].map(x => x + 1)
}
```

```javascript
// renderer process
const mapNumbers = require('electron').remote.require('./mapNumbers')
const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
const withLocalCb = mapNumbers.withLocalCallback()

console.log(withRendererCb, withLocalCb)
// [undefined, undefined, undefined], [2, 3, 4]
```

As you can see, the renderer callback's synchronous return value was not as expected, and didn't match the return value of an identical callback that lives in the main process.

Second, the callbacks passed to the main process will persist until the main process garbage-collects them.

For example, the following code seems innocent at first glance. It installs a callback for the `close` event on a remote object:

```javascript
require('electron').remote.getCurrentWindow().on('close', () => {
  // window was closed...
})
```

But remember the callback is referenced by the main process until you explicitly uninstall it. If you do not, each time you reload your window the callback will be installed again, leaking one callback for each restart.

To make things worse, since the context of previously installed callbacks has been released, exceptions will be raised in the main process when the `close` event is emitted.

To avoid this problem, ensure you clean up any references to renderer callbacks passed to the main process. This involves cleaning up event handlers, or ensuring the main process is explicitly told to dereference callbacks that came from a renderer process that is exiting.

## Accessing built-in modules in the main process

The built-in modules in the main process are added as getters in the `remote` module, so you can use them directly like the `electron` module.

```javascript
const app = require('electron').remote.app
console.log(app)
```

## Методы

The `remote` module has the following methods:

### `remote.require(module)`

* `module` String

Returns `any` - The object returned by `require(module)` in the main process. Modules specified by their relative path will resolve relative to the entrypoint of the main process.

e.g.

```sh
project/
├── main
│   ├── foo.js
│   └── index.js
├── package.json
└── renderer
    └── index.js
```

```js
// main process: main/index.js
const { app } = require('electron')
app.on('ready', () => { /* ... */ })
```

```js
// some relative module: main/foo.js
module.exports = 'bar'
```

```js
// renderer process: renderer/index.js
const foo = require('electron').remote.require('./foo') // bar
```

### `remote.getCurrentWindow()`

Returns [`BrowserWindow`](browser-window.md) - The window to which this web page belongs.

**Note:** Do not use `removeAllListeners` on [`BrowserWindow`](browser-window.md). Use of this can remove all [`blur`](https://developer.mozilla.org/en-US/docs/Web/Events/blur) listeners, disable click events on touch bar buttons, and other unintended consequences.

### `remote.getCurrentWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents of this web page.

### `remote.getGlobal(name)`

* `name` String

Returns `any` - The global variable of `name` (e.g. `global[name]`) in the main process.

## Свойства

### `remote.process`

The `process` object in the main process. This is the same as `remote.getGlobal('process')` but is cached.