## 类: Debugger

> 用于 Chrome 远程调试协议的备用传输。

进程：[主进程](../glossary.md#main-process)

Chrome Developer Tools 在 JavaScript 运行时提供了一个 [ special binding ](https://chromedevtools.github.io/devtools-protocol/), 允许与页面进行交互和检测。

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

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

### 实例方法

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (optional) - 需要调试的协议的版本

添加调试器到 `webContents` 。

#### `debugger.isAttached()`

Returns `Boolean` - 表示调试器是否成功添加到 `webContents` 。

#### `debugger.detach()`

从 `webContents` 里分离调试器.

#### `debugger.sendCommand(method[, commandParams, callback])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* ` commandParams ` Object (可选) - 具有请求参数的 JSON 对象。
* `callback` Function (可选) - 响应方法 
  * `error` Object - 显示命令失败的错误消息。
  * `result` Any - 由远程调试协议中的命令描述的“returns”属性定义的响应。

向调试目标发送给定的命令。

**[马上将弃用](promisification.md)**

#### `debugger.sendCommand(method[, commandParams])`

* `method` 字符串 - 方法名称，应该为 [远程调试协议](https://chromedevtools.github.io/devtools-protocol/)中定义的方法之一。
* ` commandParams ` Object (可选) - 具有请求参数的 JSON 对象。

Returns `Promise<any>` - A promise that resolves with the response defined by the 'returns' attribute of the command description in the remote debugging protocol or is rejected indicating the failure of the command.

向调试目标发送给定的命令。

### 实例事件

#### Event: 'detach'

* `event` Event
* `reason` String - 分离调试器的原因

在调试会话终止时发出。当关闭 ` webContents ` 或 ` the attached  webContents ` 调用 devtools 时, 都会发生这种情况。

#### Event: 'message'

* `event` Event
* `method` String - 方法名.
* `params` Object - 由远程调试协议中的 parameters 属性定义的事件参数。

当调试目标问题时发送