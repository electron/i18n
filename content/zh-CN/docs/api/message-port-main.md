# 消息端口

`MessagePortMain` 是 DOM [`MessagePort`][] 对象的主要过程侧等效物。 它的行为类似于 DOM 版本，但 例外，它使用节点.js `EventEmitter` 事件系统，而不是 DOM `EventTarget` 系统。 这意味着您应该使用 `port.on('message', ...)` 来收听事件，而不是 `port.onmessage = ...` 或 `port.addEventListener('message', ...)`

有关使用 频道消息的更多信息，请参阅 [通道消息 API][] 文档。

`MessagePortMain` 是一个 \[EventEmitter\]\[event-emitter\]。

## 类： 消息端口

进程：[主进程](../glossary.md#main-process)

### 实例方法

#### `港口.邮资信息（消息， [transfer]）`

* `message` 任何
* `transfer` 消息端口[]（可选）

从端口发送消息，并可选地将对象的所有权 转移到其他浏览上下文。

#### `端口。`

开始发送在端口上排队的消息。 消息将 排队，直到此方法被调用。

#### `端口关闭（）`

断开端口，使其不再处于活动状态。

### 实例事件

#### Event: 'message'

返回:

* `messageEvent` 对象
  * `data` 任何
  * `ports` 消息端口[]

当消息端口对象收到消息时发出。

#### 事件： 'close'

当消息端对象断开连接时发出。

[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[通道消息 API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
