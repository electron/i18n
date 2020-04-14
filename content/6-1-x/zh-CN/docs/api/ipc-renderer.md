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

通过 `channel` 发送异步消息到主进程，可以携带任意参数。 在内部，参数会被序列化为 JSON，因此参数对象上的函数和原型链不会被发送。

主进程可以使用 `ipcMain` 监听channel<a> 来接收这些消息。</p> 



<h3 spaces-before="0">
  <code>ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])</code>
</h3>

<ul>
  <li>
    <code>channel</code> String
  </li>
  <li>
    <code>...args</code> any[]
  </li>
</ul>

<p spaces-before="0">
  返回 <code>any</code> - 由 <a href="ipc-main.md"><code>ipcMain</code></a> 处理程序发送过来的值。
</p>

<p spaces-before="0">
  通过 <code>channel</code> 发送同步消息到主进程，可以携带任意参数。 在内部，参数会被序列化为 JSON，因此参数对象上的函数和原型链不会被发送。
</p>

<p spaces-before="0">
  主进程可以使用 <code>ipcMain</code> 监听 <a href="ipc-main.md">channel</a>来接收这些消息，并通过 <code>event.returnValue </code>设置回复消息。
</p>

<p spaces-before="0">
  <strong x-id="1">注意:</strong> 发送同步消息将会阻塞整个渲染进程，你应该避免使用这种方式 - 除非你知道你在做什么。
</p>



<h3 spaces-before="0">
  <code>ipcRenderer.sendTo(webContentsId, channel, [, arg1][, arg2][, ...])</code>
</h3>

<ul>
  <li>
    <code>webContentsId</code> Number
  </li>
  <li>
    <code>channel</code> String
  </li>
  <li>
    <code>...args</code> any[]
  </li>
</ul>

<p spaces-before="0">
  Sends a message to a window with <code>webContentsId</code> via <code>channel</code>.
</p>



<h3 spaces-before="0">
  <code>ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])</code>
</h3>

<ul>
  <li>
    <code>channel</code> String
  </li>
  <li>
    <code>...args</code> any[]
  </li>
</ul>

<p spaces-before="0">
  就像 <code>ipcRenderer.send</code>，不同的是消息会被发送到 host 页面上的 <code>&lt;webview&gt;</code> 元素，而不是主进程。
</p>



<h2 spaces-before="0">
  事件对象
</h2>

<p spaces-before="0">
  The documentation for the <code>event</code> object passed to the <code>callback</code> can be found in the <a href="structures/ipc-renderer-event.md"><code>ipc-renderer-event</code></a> structure docs.
</p>
