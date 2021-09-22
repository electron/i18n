# MessagePortMain

`MessagePortMain` 是 DOM [`MessagePort`][] 对象的主进程等价对象。 它的行为类似于DOM版本，不同的是它使用 Node.js `EventEmitter` 事件系统，而不是 DOM `EventTarget` 系统。 这意味着你应该用 `port.on('message', ...)` 来监听事件, 来代替 `port.onmessage = ...` 或 `port.addEventListener('message', ...)`

关于 channel 消息的使用文档详见 [Channel Messaging API][]

`MessagePortMain` 是一个 \[EventEmitter\]\[event-emitter\].

## Class: MessagePortMain

> 主进程中用于通道消息传递的端口接口。

Process: [Main](../glossary.md#main-process)<br /> _This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

### 实例方法

#### `port.postMessage(message, [transfer])`

* `message` any
* `transfer` MessagePortMain[] (可选)

从端口发送消息，并可选地将对象的所有权转移到其他浏览上下文。

#### `port.start()`

开始发送在端口上排队的消息。 消息将先缓存到队列, 直到此方法被调用。

#### `port.close()`

断开端口连接

### 实例事件

#### Event: 'message'

返回:

* `messageEvent` Object
  * `data` any
  * `ports` MessagePortMain[]

MessagePortMain 对象收到消息时触发此事件

#### 事件： 'close'

当MessagePortMain 对象的远程端断开连接时触发此事件

[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[Channel Messaging API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
