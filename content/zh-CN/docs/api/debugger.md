## 类: Debugger

> An alternate transport for Chrome's remote debugging protocol.

进程：[主进程](../glossary.md#main-process)

Chrome Developer Tools 在 JavaScript 运行时提供了一个 [ special binding ][rdp], 允许与页面进行交互和检测。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

try {
  win.webContents.debugger.attach('1.1')
} catch (err) {
  console.log('Debugger attach failed : ', err)
}

win.webContents.debugger.on('detach', (event, reason) => {
  console.log('Debugger detached due to : ', reason)
})

win.webContents.debugger.on('message', (event, method, params) => {
  if (method === 'Network.requestWillBeSent') {
    if (params.request.url === 'https://www.github.com') {
      win.webContents.debugger.detach()
    }
  }
})

win.webContents.debugger.sendCommand('Network.enable')
```

### 实例事件

#### Event: 'detach'

返回:

* `event` Event
* `reason` String - 分离调试器的原因

Emitted when the debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Event: 'message'

返回:

* `event` Event
* `method` String - 方法名.
* `params` any - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.
* `sessionId` String - Unique identifier of attached debugging session, will match the value sent from `debugger.sendCommand`.

Emitted whenever the debugging target issues an instrumentation event.

### 实例方法

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (optional) - 需要调试的协议的版本

添加调试器到 `webContents` 。

#### `debugger.isAttached()`

Returns `Boolean` - 表示调试器是否成功添加到 `webContents` 。

#### `debugger.detach()`

从 `webContents` 里分离调试器.

#### `debugger.sendCommand(method[, commandParams, sessionId])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol][rdp].
* `commandParams` any (optional) - JSON object with request parameters.
* `sessionId` String (optional) - send command to the target with associated debugging session id. The initial value can be obtained by sending [Target.attachToTarget][attachToTarget] message.

返回 `Promise<any>` - 一个 promise，远程调试协议中的命令描述的“returns”属性定义的响应，或者显示命令失败的错误消息。

向调试目标发送给定的命令。

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[attachToTarget]: https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget
