# remote

> Позволяет использовать модули главного процесса из рендер-процесса.

Процесс: [Графический](../glossary.md#renderer-process)

> ⚠️ WARNING ⚠️ The `remote` module is [deprecated](https://github.com/electron/electron/issues/21408). Instead of `remote`, use [`ipcRenderer`](ipc-renderer.md) and [`ipcMain`](ipc-main.md).
> 
> Read more about why the `remote` module is deprecated [here](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).
> 
> If you still want to use `remote` despite the performance and security concerns, see [@electron/remote](https://github.com/electron/remote).

Модуль `remote` обеспечивает простой способ для межпроцессного взаимодействия (IPC) между процессом рендеринга (веб-страницы) и основного процесса.

В Electron GUI-ориентированные модули (такие, как `dialog`, `menu` и т. д.) доступны только в основном процессе, но не в процессе рендеринга. Для того, чтобы использовать их в рендер-процессе, необходим модуль `ipc`, чтобы посылать межпроцессные сообщения в основной процесс. С модулем `remote` вы можете вызывать методы объекта основного процесса без явной отправки межпроцессных сообщений, это похоже на Java [RMI][rmi]. Пример создания окна браузера из рендер-процесса:

```javascript
const { BrowserWindow } = require('electron').remote
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

**Примечание:** Для обратной связи (доступа к рендер-процессу из основного процесса), вы можете использовать [webContents.executeJavaScript](web-contents.md#contentsexecutejavascriptcode-usergesture).

**Примечание:** Модуль remote можно отключить по соображениям безопасности в следующих контекстах:

* [`BrowserWindow`](browser-window.md) - установкой опции `enableRemoteModule` в `false`.
* [`<webview>`](webview-tag.md)<webview></0> - установкой атрибута `enableremotemodule` в `false`.

## Удаленные объекты

Каждый объект (включая функции) возвращаемый модулем `remote` представляет собой объект в основном процессе (мы называем это удаленным объектом или удаленной функцией). Когда вы вызываете метод удаленного объекта, удаленную функцию или создаете новый объект удаленным конструктором (функцией), на самом деле вы посылаете синхронное межпроцессное сообщение.

В примере выше и [`BrowserWindow`](browser-window.md) и `win` являются удаленными объектами и `new BrowserWindow` на самом деле не создает объект `BrowserWindow` в рендер-процессе. Вместо этого создается объект `BrowserWindow` в основном процессе и возвращается соответствующий удаленный объект `win` в рендер-процесс.

**Примечание:** Доступны только [перечислимые свойства][enumerable-properties], которые присутствуют при первом обращении к удаленному объекту, через дистанционное управление.

**Примечание:** Массивы и Buffers при доступе к ним через модуль `remote` копируются через IPC. Изменения, которые в них вносит рендер-процесс не отображаются в основном процессе и наоборот.

## Время жизни удаленных объектов

Electron следит за тем, что пока удаленный объект в рендер-процессе жив (другими словами, не будет удален сборщиком мусора) соответствующий объект в основном процессе не будет освобожден. Когда удаленный объект будет утилизирован сборщиком мусора, соответствующий объект в основном процессе также будет освобожден для сборщика.

Если удаленный объект допускает утечки (например, сохранен в map и никогда не освобождается), то соответствующий объект в основном процессе также будет утекать, поэтому вы должны быть очень осторожны, чтобы не вызывать утечек в удаленных объектах.

Однако основные типы данных, такие как число и строки, отправляются копией.

## Передача колбэков в основной процесс

Код основного процесса может принимать колбэки рендер-процесса (например, модуль `remote`), но вы должны использовать эту особенность в предельной осторожностью.

First, in order to avoid deadlocks, the callbacks passed to the main process are called asynchronously. You should not expect the main process to get the return value of the passed callbacks.

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

Как вы можете видеть, результат синхронно вызываемого колбэка рендрера отличается от ожидаемого и не совпадает с результатом аналогичного колбэка, находящегося в основном процессе.

Во вторых, колбэки, передаваемые в основной процесс будут сохраняться до сборки мусора основным процессом.

For example, the following code seems innocent at first glance. It installs a callback for the `close` event on a remote object:

```javascript
require('electron').remote.getCurrentWindow().on('close', () => {
  // window was closed...
})
```

Но помните, что колбэк ссылается на основной процесс до тех пор, пока вы его не удалите. Если вы этого не сделаете, то при каждой перезагрузке окна колбэк будет установлен снова, вызывая утечку одного колбэка при каждом рестарте.

Что еще хуже, так как контекст предыдущих колбэков будет удален, при каждом вызове `close` в основном процессе будут возникать ошибки.

Чтобы избежать этой проблемы, убедитесь, что вы очищаете любые ссылки на колбэки рендерера, переданные в основной процесс. Это включает в себя очистку обработчиков событий или вам необходимо обеспечить явное снятие колбэков в основном процессе при завершении рендер-процесса.

## Доступ к встроенным модулям в основном процессе

Встроенные модули в основном процессе добавляются как геттеры модуле `remote`, так что вы можете использовать их непосредственно, как модуль `electron`.

```javascript
const app = require('electron').remote.app
console.log(app)
```

## Методы

Модуль `remote` имеет следующие методы:

### `remote.getCurrentWindow()`

Возвращает [`BrowserWindow`](browser-window.md) - Окно, которому принадлежит эта страница.

**Примечание:** Не используйте `removeAllListeners` с [`BrowserWindow`](browser-window.md). Это может удалить все слушатели [`blur`](https://developer.mozilla.org/en-US/docs/Web/Events/blur), выключить события нажатия на кнопках сенсорных панелей и вызвать другие непредвиденные последствия.

### `remote.getCurrentWebContents()`

Возвращает [`WebContents`](web-contents.md) - Веб-содержимое этой веб-страницы.

### `remote.getGlobal(name)`

* `name` String

Возвращает `any` - глобальную переменную с именем `name` (например `global[name]`) в основном процессе.

## Свойства

### `remote.require`

A `NodeJS.Require` function equivalent to `require(module)` in the main process. Модули, указанные по их относительному пути, будут определены относительно точки входа основного процесса.

например

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
app.whenReady().then(() => { /* ... */ })
```

```js
// некий относительный модуль: main/foo.js
module.exports = 'bar'
```

```js
// renderer process: renderer/index.js
const foo = require('electron').remote.require('./foo') // bar
```

### `remote.process` _Только чтение_

A `NodeJS.Process` object.  The `process` object in the main process. This is the same as `remote.getGlobal('process')` but is cached.

[rmi]: https://en.wikipedia.org/wiki/Java_remote_method_invocation
[enumerable-properties]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
