# ipcRenderer

> 由畫面轉譯處理序到主處理序的非同步通訊。

處理序: [畫面轉譯器](../glossary.md#renderer-process)

`ipcRenderer` 模組是一個 [EventEmitter][event-emitter] 類別實例。 它提供一些方法能讓你從渲染程序（網頁）到主程序途中傳遞同步和非同步的訊息。 你也可以用它來接收來自主程序的訊息。

其他範例請查閱 [ipcMain](ipc-main.md)。

## 方法

`ipcRenderer` 模組具有以下方法用來監聽事件和發送訊息：

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcRendererEvent
  * `...args` any[]

監聽 `channel`，當一個新的訊息抵達 `listener` 時將會呼叫 `listener(event, args...)`。

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcRendererEvent
  * `...args` any[]

對事件加入一次性的 `listener`。 此 `listener` 只有在下一次訊息發送到 `channel` 時才會被調用，之後就會被移除。

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` Function
  * `...args` any[]

從 `channel` 的 listener array 之中刪除特定的 `listener`。

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

刪除所有指定 `channel` 的 listener。

### `ipcRenderer.send(channel, ...args)`

* `channel` String
* `...args` any[]

通過 `channel` 非同步的向主程序傳送訊息，還有引數。 Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`postMessage`][], so prototype chains will not be included. 傳遞任何 Function、Promise、Symbol、WeakMap 或 WeakSet 物件將會拋出錯誤。

> **提醒：** 傳送非標準 JavaScript 型別的方法已經不推薦使用（例如 DOM 物件或者特殊的 Electron 物件），並且在 Electron 9 版本開始將會拋出錯誤。

主程序透過 [`ipcMain`](ipc-main.md) 來監聽 `channel` 以接收此方法所發出的訊息。

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String
* `...args` any[]

返回 `Promise<any>` ─ 解決來自主程序的回應。

透過 `channel` 來傳送訊息給主程序，並且以非同步的方式返回結果。 Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`postMessage`][], so prototype chains will not be included. 傳遞任何 Function、Promise、Symbol、WeakMap 或 WeakSet 物件將會拋出錯誤。

> **提醒：** 傳送非標準 JavaScript 型別的方法已經不推薦使用（例如 DOM 物件或者特殊的 Electron 物件），並且在 Electron 9 版本開始將會拋出錯誤。

主程序應該透過 [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener) 監聽此 `channel`。

For example:
```javascript
// 渲染程序
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})

// 主程序
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = await doSomeWork(someArgument)
  return result
})
```

### `ipcRenderer.sendSync(channel, ...args)`

* `channel` String
* `...args` any[]

返回 `any` ─ [`ipcMain`](ipc-main.md) handler 的回傳訊息。

透過 `channel` 來傳送訊息給主程序，並且以同步的方式返回結果。 Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`postMessage`][], so prototype chains will not be included. 傳遞任何 Function、Promise、Symbol、WeakMap 或 WeakSet 物件將會拋出錯誤。

> **提醒：** 傳送非標準 JavaScript 型別的方法已經不推薦使用（例如 DOM 物件或者特殊的 Electron 物件），並且在 Electron 9 版本開始將會拋出錯誤。

主程序透過 `ipcMain` 來監聽 [`channel`](ipc-main.md) 接收訊息，並且藉由指定 `event.returnValue` 來回應訊息。

> :warning: **警告** ：發起一個同步的訊息將會阻塞整個渲染程序直到收到回覆為止，所以，請將此方法視為最後的解決方案。 推薦使用非同步的 [`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args)。

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` String
* `...args` any[]

透過 `channel` 發送訊息到一個具有 `webContentsId` 的視窗。

### `ipcRenderer.sendToHost(channel, ...args)`

* `channel` String
* `...args` any[]

類似於 `ipcRenderer.send` ，但不同的是訊息會被發送到主頁面上的 `<webview>` 元素，而不是主程序。

## Event 物件

傳遞給 `callback` 的 `event` 物件文件可以在 [`ipc-renderer-event`](structures/ipc-renderer-event.md) 的結構文件頁面中查閱。

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
