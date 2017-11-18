# ipcMain

> main 프로세스에서 renderer 프로세스들로 비동기적인 통신을 합니다.

프로세스:[Main](../glossary.md#main-process)

`ipcMain` 모듈은 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) 클래스의 인스턴스입니다. main 프로세스를 사용할 때 renderer 프로세스(웹페이지)가 보내는 메시지를 동기적 혹은 비동기적으로 처리합니다. renderer가 보내는 메시지는 이 모듈로 내보내게 됩니다.

## 메시지 보내기

main 프로세스에서 renderer 프로세스로 메시지를 보내는 것도 가능한데 자세한 내용은 [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-)를 보세요.

* 메시지를 보낼 때 이벤트 이름은 `channel`입니다.
* 동기 메시지에 회신 하려면 `event.returnValue`를 설정 해야 합니다.
* 비동기 메시지를 다시 보낸 사람에 게 보내려면 `event.sender.send(...)`를 사용할 수 있습니다.

renderer와 main 프로세스간의 메시지 발송과 처리 예:

```javascript
// main 프로세스안에서
const {ipcMain} = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // "ping"이 출력된다.
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)  // "ping"이 출력된다.
  event.returnValue = 'pong'
})
```

```javascript
// renderer 프로세스(웹 페이지)안에서
const {ipcRenderer} = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // "pong"이 출력된다.

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // "pong"이 출력된다.
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## 메소드

`ipcMain` 모듈은 이벤트를 처리하기 위해 다음의 메소드를 가진다:

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Function

`channel`을 수신하고, 새로운 메시지가 도착하면 `listener`는 `listener(event, args...)`로 호출된다.

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function

Removes the specified `listener` from the listener array for the specified `channel`.

### `ipcMain.removeAllListeners([channel])`

* `channel` String

Removes listeners of the specified `channel`.

## Event object

The `event` object passed to the `callback` has the following methods:

### `event.returnValue`

Set this to the value to be returned in a synchronous message.

### `event.sender`

Returns the `webContents` that sent the message, you can call `event.sender.send` to reply to the asynchronous message, see [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) for more information.