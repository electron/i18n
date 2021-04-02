# 消息通道

`MessageChannelMain` 是 DOM [`MessageChannel`][] 对象的主要过程侧等效物。 其奇异功能是创建一对 连接 [`MessagePortMain`](message-port-main.md) 对象。

有关使用 频道消息的更多信息，请参阅 [通道消息 API][] 文档。

## 类： 消息通道

进程：[主进程](../glossary.md#main-process)

示例:

```js
主要过程
 { port1, port2 } =新的消息通道主要（）
w.webContents.postmesage（"端口"，空， [port2]）
端口1.后信息（{ some: 'message' }）

//渲染器过程
持续 { ipcRenderer } =要求（"电子"）
ipcRenderer.on（'port'， （e） => {
  // e. 端口是随此消息一起发送的端口列表，
  e.端口[0]。on （"消息"， （消息事件） => {
    控制台.log （消息事件.数据）
  }）
}）
```

### 实例属性

#### `通道.端口1`

[`MessagePortMain`](message-port-main.md) 属性。

#### `通道.端口2`

[`MessagePortMain`](message-port-main.md) 属性。

[`MessageChannel`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
[通道消息 API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
