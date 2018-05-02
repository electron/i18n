# ipcRenderer

> 从渲染器进程到主进程的异步通信。

进程: [ Renderer](../glossary.md#renderer-process)

`ipcRenderer` 是一个 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) 的实例。 你可以使用它提供的一些方法从渲染进程 (web 页面) 发送同步或异步的消息到主进程。 也可以接收主进程回复的消息。

请从 [ipcMain](ipc-main.md) 查看代码示例。

## 方法

`ipcRenderer` 模块使用以下方法来监听事件和发送消息。

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` Function

监听 channel, 当新消息到达，将通过 listener(event, args...) 调用 listener。

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function

为事件添加一个一次性用的listener 函数.这个 listener 只有在下次的消息到达 channel 时被请求调用，之后就被删除了.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` Function

为特定的 channel 从监听队列中删除特定的 listener 监听者.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

移除所有的监听器，当指定 `channel` 时只移除与其相关的所有监听器。

### `ipcRenderer.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

通过 `channel` 发送异步消息到主进程，可以携带任意参数。 在内部，参数会被序列化为 JSON，因此参数对象上的函数和原型链不会被发送。

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

返回 `any` - 由 [`ipcMain`](ipc-main.md) 处理程序发送过来的值。

通过 `channel` 发送同步消息到主进程，可以携带任意参数。 在内部，参数会被序列化为 JSON，因此参数对象上的函数和原型链不会被发送。

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

**注意:** 发送同步消息将会阻塞整个渲染进程，你应该避免使用这种方式 - 除非你知道你在做什么。

### `ipcRenderer.sendTo(windowId, channel, [, arg1][, arg2][, ...])`

* `windowId` Number
* `channel` String
* `...args` any[]

通过 `channel` 发送消息到带有 `windowid` 的窗口.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

就像 `ipcRenderer.send`，不同的是消息会被发送到 host 页面上的 `<webview>` 元素，而不是主进程。