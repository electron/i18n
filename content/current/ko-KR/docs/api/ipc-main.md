# ipcMain

> main 프로세스에서 renderer 프로세스들로 비동기적인 통신을 합니다.

프로세스:[Main](../glossary.md#main-process)

The `ipcMain` module is an [Event Emitter](https://nodejs.org/api/events.html#events_class_eventemitter). main 프로세스를 사용할 때 renderer 프로세스(웹페이지)가 보내는 메시지를 동기적 혹은 비동기적으로 처리합니다. renderer가 보내는 메시지는 이 모듈로 내보내게 됩니다.

## 메시지 보내기

main 프로세스에서 renderer 프로세스로 메시지를 보내는 것도 가능한데 자세한 내용은 [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-)를 보세요.

* 메시지를 보낼 때 이벤트 이름은 `channel`입니다.
* 동기 메시지에 회신 하려면 `event.returnValue`를 설정 해야 합니다.
* To send an asynchronous message back to the sender, you can use `event.reply(...)`.  This helper method will automatically handle messages coming from frames that aren't the main frame (e.g. iframes) whereas `event.sender.send(...)` will always send to the main frame.

renderer와 main 프로세스간의 메시지 발송과 처리 예:

```javascript
// main 프로세스안에서
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // "ping" 출력
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // "ping" 출력
  event.returnValue = 'pong'
})
```

```javascript
// renderer 프로세스(웹 페이지)안에서
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // "pong"이 출력됩니다.

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // "pong"이 출력됩니다.
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## 메소드

`ipcMain` 모듈은 이벤트를 처리하기 위해 다음의 메소드를 가집니다:

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

`channel`을 수신하고, 새로운 메시지가 도착하면 `listener`는 `listener(event, args...)`로 호출됩니다.

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function
  * `...args` any[]

`channel` 의 listener 배열에서 지정한 `listener`를 제거합니다.

### `ipcMain.removeAllListeners([channel])`

* `channel` String (optional)

지정한 `channel`의 listener들을 제거합니다.

### `ipcMain.handle(channel, listener)`

* `channel` String
* `listener` Function<Promise<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Adds a handler for an `invoke`able IPC. This handler will be called whenever a renderer calls `ipcRenderer.invoke(channel, ...args)`.

If `listener` returns a Promise, the eventual result of the promise will be returned as a reply to the remote caller. Otherwise, the return value of the listener will be used as the value of the reply.

```js
// 메인 프로세스
ipcMain.handle('my-invokable-ipc', async (event, ...args) => {
  const result = await somePromise(...args)
  return result
})

// 렌더러 프로세스
async () => {
  const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
  // ...
}
```

The `event` that is passed as the first argument to the handler is the same as that passed to a regular event listener. It includes information about which WebContents is the source of the invoke request.

### `ipcMain.handleOnce(channel, listener)`

* `channel` String
* `listener` Function<Promise<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Handles a single `invoke`able IPC message, then removes the listener. See `ipcMain.handle(channel, listener)`.

### `ipcMain.removeHandler(channel)`

* `channel` String

Removes any handler for `channel`, if present.

## IpcMainEvent object

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-main-event`](structures/ipc-main-event.md) structure docs.

## IpcMainInvokeEvent object

The documentation for the `event` object passed to `handle` callbacks can be found in the [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) structure docs.
