# ipcRenderer

> 从渲染器进程到主进程的异步通信。

进程: [ Renderer](../glossary.md#renderer-process)

The `ipcRenderer` module is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). 你可以使用它提供的一些方法从渲染进程 (web 页面) 发送同步或异步的消息到主进程。 也可以接收主进程回复的消息。

请从 [ipcMain](ipc-main.md) 查看代码示例。

## 方法

`ipcRenderer` 模块使用以下方法来监听事件和发送消息。

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` Function 
  * `event` IpcRendererEvent
  * `...args` any[]

监听 channel, 当新消息到达，将通过 listener(event, args...) 调用 listener。

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function - 回调函数 
  * `event` IpcRendererEvent
  * `...args` any[]

为事件添加一个一次性用的listener 函数.这个 listener 只有在下次的消息到达 channel 时被请求调用，之后就被删除了.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` Function - 回调函数 
  * `...args` any[]

为特定的 channel 从监听队列中删除特定的 listener 监听者.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

移除所有的监听器，当指定 `channel` 时只移除与其相关的所有监听器。

### `ipcRenderer.send(channel, ...args)`

* `channel` String
* `...args` any[]

通过 `channel` 发送异步消息到主进程，可以携带任意参数。 Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with the [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String
* `...args` any[]

Returns `Promise<any>` - Resolves with the response from the main process.

Send a message to the main process asynchronously via `channel` and expect an asynchronous result. Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

The main process should listen for `channel` with [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener).

例如：

```javascript
// Renderer process
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})

// Main process
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = await doSomeWork(someArgument)
  return result
})
```

### `ipcRenderer.sendSync(channel, ...args)`

* `channel` String
* `...args` any[]

Returns `any` - The value sent back by the [`ipcMain`](ipc-main.md) handler.

Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. 在内部，参数会被序列化为 JSON，因此参数对象上的函数和原型链不会被发送。

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

**Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` String
* `...args` any[]

Sends a message to a window with `webContentsId` via `channel`.

### `ipcRenderer.sendToHost(channel, ...args)`

* `channel` String
* `...args` any[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.

## 事件对象

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-renderer-event`](structures/ipc-renderer-event.md) structure docs.