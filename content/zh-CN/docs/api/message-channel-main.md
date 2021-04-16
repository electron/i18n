# 消息通道

`MessageChannelMain` 是 DOM [`MessageChannel`][] 对象的主要过程侧等效物。 其奇异功能是创建一对 连接 [`MessagePortMain`](message-port-main.md) 对象。

有关使用 频道消息的更多信息，请参阅 [通道消息 API][] 文档。

## 类： 消息通道

进程：[主进程](../glossary.md#main-process)

示例:

```js
// Main process
const { port1, port2 } = new MessageChannelMain()
w.webContents.postMessage('port', null, [port2])
port1.postMessage({ some: 'message' })

// Renderer process
const { ipcRenderer } = require('electron')
ipcRenderer.on('port', (e) => {
  // e.ports is a list of ports sent along with this message
  e.ports[0].on('message', (messageEvent) => {
    console.log(messageEvent.data)
  })
})
```

### 实例属性

#### `channel.port1`

A [`MessagePortMain`](message-port-main.md) property.

#### `channel.port2`

A [`MessagePortMain`](message-port-main.md) property.

[`MessageChannel`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
[通道消息 API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
