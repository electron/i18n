## 类: Debugger

> 备用的 Chrome 远程调试接口。

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

调试会话终止时激活 发生在对应的` webContents ` 关闭或者调用 devtools 时,。

#### Event: 'message'

返回:

* `event` Event
* `method` String - 方法名.
* `params` any - 远程调试协议中的 parameters 属性定义的事件参数。
* `sessionId` String - 附加调试会话的唯一标识符， 与从 `debugger.sendCommand` 中发送的值相同。

当正在调试的目标发出条件检测事件时触发。

### 实例方法

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (optional) - 需要调试的协议的版本

添加调试器到 `webContents` 。

#### `debugger.isAttached()`

Returns `Boolean` - 表示调试器是否成功添加到 `webContents` 。

#### `debugger.detach()`

从 `webContents` 里分离调试器.

#### `debugger.sendCommand(method[, commandParams, sessionId])`

* `method` String - 方法名称，应该是 [远程调试协议][rdp]中定义的方法之一。
* `commandParams` any (optional) - JSON object with request parameters.
* `sessionId` String (optional) - send command to the target with associated debugging session id. The initial value can be obtained by sending [Target.attachToTarget][attachToTarget] message.

返回 `Promise<any>` - 一个 promise，远程调试协议中的命令描述的“returns”属性定义的响应，或者显示命令失败的错误消息。

向调试目标发送给定的命令。

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[attachToTarget]: https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget
