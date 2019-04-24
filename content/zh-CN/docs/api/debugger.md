## 类: Debugger

> 用于 Chrome 远程调试协议的备用传输。

进程：[主进程](../glossary.md#main-process)

Chrome Developer Tools has a [special binding](https://chromedevtools.github.io/devtools-protocol/) available at JavaScript runtime that allows interacting with pages and instrumenting them.

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

**[Deprecated Soon](promisification.md)**

#### `debugger.sendCommand(method[, commandParams])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* ` commandParams ` Object (可选) - 具有请求参数的 JSON 对象。

Returns `Promise<any>` - A promise that resolves with the response defined by the 'returns' attribute of the command description in the remote debugging protocol or is rejected indicating the failure of the command.

向调试目标发送给定的命令。

### 实例事件

#### Event: 'detach'

* `event` Event
* `reason` String - Reason for detaching debugger.

Emitted when debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Event: 'message'

* `event` Event
* `method` String - Method name.
* `params` Object - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.

Emitted whenever debugging target issues instrumentation event.