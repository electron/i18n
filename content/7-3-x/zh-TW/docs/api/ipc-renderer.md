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

通過 `channel` 非同步地向主進程發送訊息，也可以從這裡傳遞任意參數。 Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

主程序透過 [`ipcMain`](ipc-main.md) 來監聽 `channel` 以接收此方法所發出的訊息。

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String
* `...args` any[]

返回 `Promise<any>` ─ 解決來自主程序的回應。

Send a message to the main process asynchronously via `channel` and expect an asynchronous result. Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

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

通過 `channel` 同步地向主進程發送訊息，也從這裡傳遞任意參數。 參數將被序列化成 JSON 字串，因此，不會包含任何函數或原型鏈。

主程序透過 `ipcMain` 來監聽 [`channel`](ipc-main.md) 接收訊息，並且藉由指定 `event.returnValue` 來回應訊息。

**註：**發送同步訊息將阻塞整個渲染進程，除非你知道你在做什麼，否則絕對不應使用它。

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` String
* `...args` any[]

透過 `channel` 發送訊息給一個具有 `webContentsId` 的視窗。

### `ipcRenderer.sendToHost(channel, ...args)`

* `channel` String
* `...args` any[]

與 `ipcRenderer.send` 類似，但不同的是訊息會被發送到主頁面上的 `<webview>` 元素，而不是主程序。

## Event 物件

傳遞 `event` object 到 `callback` 的文件描述在 [`ipc-renderer-event`](structures/ipc-renderer-event.md) 結構文件。

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
