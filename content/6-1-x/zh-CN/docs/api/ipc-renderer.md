# ipcRenderer

> 从渲染器进程到主进程的异步通信。

进程: [渲染进程](../glossary.md#renderer-process)

The `ipcRenderer` module is an instance of the [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) class. 你可以使用它提供的一些方法从渲染进程 (web 页面) 发送同步或异步的消息到主进程。 也可以接收主进程回复的消息。

请从 [ipcMain](ipc-main.md) 查看代码示例。

## 方法

`ipcRenderer` 模块使用以下方法来监听事件和发送消息。

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcRendererEvent
  * `...args` any[]

监听 `channel`，当接收到新的消息时 `listener` 会以 `listener(event, args...)` 的形式被调用。

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcRendererEvent
  * `...args` any[]

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` Function

从监听器数组中移除监听 `channel` 的指定 `listener`。

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

移除所有的监听器，当指定 `channel` 时只移除与其相关的所有监听器。

### `ipcRenderer.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Send a message to the main process asynchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

返回 `any` - 由 [`ipcMain`](ipc-main.md) 处理程序发送过来的值。

Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

主进程可以使用 `ipcMain` 监听 [channel](ipc-main.md)来接收这些消息，并通过 `event.returnValue `设置回复消息。

**Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.

### `ipcRenderer.sendTo(webContentsId, channel, [, arg1][, arg2][, ...])`

* `webContentsId` Number
* `channel` String
* `...args` any[]

Sends a message to a window with `webContentsId` via `channel`.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

就像 `ipcRenderer.send`，不同的是消息会被发送到 host 页面上的 `<webview>` 元素，而不是主进程。

## 事件对象

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-renderer-event`](structures/ipc-renderer-event.md) structure docs.
