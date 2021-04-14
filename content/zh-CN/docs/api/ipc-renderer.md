# ipcRenderer

> 从渲染器进程到主进程的异步通信。

进程: [渲染进程](../glossary.md#renderer-process)

`ipcRenderer` 是一个 [EventEmitter][event-emitter] 的实例。 你可以使用它提供的一些方法从渲染进程 (web 页面) 发送同步或异步的消息到主进程。 也可以接收主进程回复的消息。

请从 [ipcMain](ipc-main.md) 查看代码示例。

## 方法

`ipcRenderer` 模块使用以下方法来监听事件和发送消息。

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` Function
  * `event` 伊普文德事件
  * `...args` any[]

监听 `channel`，当接收到新的消息时 `listener` 会以 `listener(event, args...)` 的形式被调用。

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function
  * `event` 伊普文德事件
  * `...args` any[]

添加一次性 `listener` 函数。 这个 `listener` 只会在 `channel`下一次收到消息的时候被调用，之后这个监听器会被移除。

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` Function
  * `...args` any[]

从监听器数组中移除监听 `channel` 的指定 `listener`。

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

移除所有的监听器，当指定 `channel` 时只移除与其相关的所有监听器。

### `ipc伦德勒. 发送 （频道，...阿格斯）`

* `channel` String
* `...args` any[]

通过` channel `向主进程发送异步消息，可以发送任意参数。 参数将与 [结构克隆 算法][SCA]串行，就像 [`window.postMessage`][]一样，因此原型链不会 包括在内。 发送函数、承诺、符号、弱图或弱集 抛出一个例外。

> **注：** 发送非标准的 JavaScript 类型（如 DOM 对象或 特殊电子对象）将抛出一个例外。
> 
> 由于主过程不支持 DOM 对象，如 `ImageBitmap`、 `File`、 `DOMMatrix` 等，因此此类对象不能通过电子的 IPC 发送到主过程，因为主过程无法 它们进行解码。 试图通过 IPC 发送此类对象将导致错误。

主过程通过与 [`ipcMain`](ipc-main.md) 模块一起收听 `channel` 来处理它。

如果您需要将 [`MessagePort`][] 转移到主过程，请使用 [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer)。

如果您想从主过程（如方法调用的结果）收到单个响应，请考虑使用 [`ipcRenderer.invoke`](#ipcrendererinvokechannel-args)。

### `ipc伦德勒. 调用 （频道，...阿格斯）`

* `channel` String
* `...args` any[]

返回 `Promise<any>` - 通过主要流程的响应解决。

通过 `channel` 向主过程发送消息，并期望结果 异步。 参数将与 [结构克隆 算法][SCA]串行，就像 [`window.postMessage`][]一样，因此原型链不会 包括在内。 发送函数、承诺、符号、弱图或弱集 抛出一个例外。

> **注：** 发送非标准的 JavaScript 类型（如 DOM 对象或 特殊电子对象）将抛出一个例外。
> 
> 由于主过程不支持 DOM 对象，如 `ImageBitmap`、 `File`、 `DOMMatrix` 等，因此此类对象不能通过电子的 IPC 发送到主过程，因为主过程无法 它们进行解码。 试图通过 IPC 发送此类对象将导致错误。

主要过程应与 [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener)一起听取 `channel` 。

例如：

```javascript
渲染器过程
ipcRenderer.调用（"某个名称"，一些问题）。然后（结果）=> {
  //
[）

//主要过程
ipcMain.handle（"某个名称"，不对称（事件，一些争议）=> {
  结果=等待做一些工作（一些争议）
  返回结果
}）
```

如果您需要将 [`MessagePort`][] 转移到主过程，请使用 [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer)。

如果你不需要回复此消息，请考虑使用 [`ipcRender.sent`](#ipcrenderersendchannel-args)。

### `ipc伦德勒.发送同步（通道，...阿格斯）`

* `channel` String
* `...args` any[]

返回 `any` - 由 [`ipcMain`](ipc-main.md) 处理程序发送过来的值。

通过 `channel` 向主过程发送消息，并期望同步 结果。 参数将与 [结构克隆 算法][SCA]串行，就像 [`window.postMessage`][]一样，因此原型链不会 包括在内。 发送函数、承诺、符号、弱图或弱集 抛出一个例外。

> **注：** 发送非标准的 JavaScript 类型（如 DOM 对象或 特殊电子对象）将抛出一个例外。
> 
> 由于主过程不支持 DOM 对象，如 `ImageBitmap`、 `File`、 `DOMMatrix` 等，因此此类对象不能通过电子的 IPC 发送到主过程，因为主过程无法 它们进行解码。 试图通过 IPC 发送此类对象将导致错误。

主进程可以使用 `ipcMain` 监听 [channel](ipc-main.md)来接收这些消息，并通过 `event.returnValue `设置回复消息。

> :warning: **警告**：发送同步消息将阻止整个 渲染器过程，直到收到答复，所以使用此方法只能作为 最后的手段。 使用异步版本要好得多， [`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args)。

### `ipcRender.邮资信息（频道、消息、 [transfer]）`

* `channel` String
* `message` 任何
* `transfer` 消息港[]（可选）

向主过程发送消息，可选地将零 或更多 [`MessagePort`][] 对象的所有权转移。

通过访问发射事件的 `ports` 属性，转移的 `MessagePort` 对象将在主要过程中作为 [`MessagePortMain`](message-port-main.md) 对象提供。

例如：

```js
渲染器过程
康斯特 { port1, port2 } =新的消息通道（）
ipcRenderer.postmesage（"端口"， { message: 'hello' }， [port1]）

//主过程
ipcMain.on（"端口"，（e，msg）=> =
 [port] =e.端口
  //
})
```

有关使用 `MessagePort` 和 `MessageChannel`的更多信息，请参阅 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel)。

### `ipc伦德勒. 发送到 （网络康滕西德， 频道， ...阿格斯）`

* `webContentsId` 编号
* `channel` String
* `...args` any[]

通过 `channel`向带有 `webContentsId` 的窗口发送消息。

### `ipc伦德勒. 发送到霍斯特 （频道，...阿格斯）`

* `channel` String
* `...args` any[]

就像 `ipcRenderer.send`，不同的是消息会被发送到 host 页面上的 `<webview>` 元素，而不是主进程。

## 事件对象

传递给 `callback` 的 `event` 对象的文档可以在 [`ipc-renderer-event`](structures/ipc-renderer-event.md) 结构文档中 找到。

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`window.postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
