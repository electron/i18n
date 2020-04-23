## Class: Debugger

> An alternate transport for Chrome's remote debugging protocol.

프로세스:[Main](../glossary.md#main-process)

Chrome 개발자 도구는 JavaScript 런타임에서 사용할 수있는 [special binding](https://chromedevtools.github.io/devtools-protocol/)을 가지고있어서 페이지와 상호 작용하고 이를 조작 할 수 있습니다

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

try {
  win.webContents.debugger.attach('1.1')
} catch (err) {
  console.log('디버거 연결 실패 : ', err)
}

win.webContents.debugger.on('detach', (event, reason) => {
  console.log('디버거 해제 이유 : ', reason)
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

### 인스턴스 이벤트

#### Event: 'detach'

반환:

* `event` Event
* `reason` String - Reason for detaching debugger.

Emitted when the debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Event: 'message'

반환:

* `event` Event
* `method` String - Method name.
* `params` any - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.

Emitted whenever the debugging target issues an instrumentation event.

### Instance Methods (인스턴스 메소드)

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (optional) - Requested debugging protocol version.

Attaches the debugger to the `webContents`.

#### `debugger.isAttached()`

Returns `Boolean` - 디버거가 `webContents` 에 연결되어 있는지 확인합니다.

#### `debugger.detach()`

Detaches the debugger from the `webContents`.

#### `debugger.sendCommand(method[, commandParams])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` any (optional) - JSON object with request parameters.

Returns `Promise<any>` - A promise that resolves with the response defined by the 'returns' attribute of the command description in the remote debugging protocol or is rejected indicating the failure of the command.

명령을 디버깅 대상으로 전송합니다.
