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

主进程可以使用 `ipcMain` 监听channel<a> 来接收这些消息。</p> 

<h3>
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

<p>
  返回 <code>any</code> - 由 <a href="ipc-main.md"><code>ipcMain</code></a> 处理程序发送过来的值。
</p>

<p>
  通过 <code>channel</code> 发送同步消息到主进程，可以携带任意参数。 在内部，参数会被序列化为 JSON，因此参数对象上的函数和原型链不会被发送。
</p>

<p>
  主进程可以使用 <code>ipcMain</code> 监听 <a href="ipc-main.md">channel</a>来接收这些消息，并通过 <code>event.returnValue </code>设置回复消息。
</p>

<p>
  <strong>注意:</strong> 发送同步消息将会阻塞整个渲染进程，你应该避免使用这种方式 - 除非你知道你在做什么。
</p>

<h3>
  <code>ipcRenderer.sendTo(windowId, channel, [, arg1][, arg2][, ...])</code>
</h3>

<ul>
  <li>
    <code>windowId</code> Number
  </li>
  <li>
    <code>channel</code> String
  </li>
  <li>
    <code>...args</code> any[]
  </li>
</ul>

<p>
  通过 <code>channel</code> 发送消息到带有 <code>windowid</code> 的窗口.
</p>

<h3>
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

<p>
  就像 <code>ipcRenderer.send</code>，不同的是消息会被发送到 host 页面上的 <code>&lt;webview&gt;</code> 元素，而不是主进程。
</p>