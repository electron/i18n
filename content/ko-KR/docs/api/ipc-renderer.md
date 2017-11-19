# ipcRenderer

> renderer 프로세스에서 main 프로세스로 비동기적인 통신을 합니다.

프로세스: [Renderer](../glossary.md#renderer-process)

`ipcRenderer` 모듈은 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) 클래스의 인스턴스입니다. 제공되는 몇가지 메소드를 통해서 renderer 프로세스(웹 페이지)에서 main 프로세스로 동기 및 비동기 메시지를 보낼 수 있습니다. main 프로세스로부터 오는 응답을 수신할 수도 있습니다.

[ipcMain](ipc-main.md)의 코드 예제를 보세요.

## 메소드

The `ipcRenderer` module has the following method to listen for events and send messages:

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` Function

`channel`을 수신하고, 새로운 메시지가 도착하면 `listener`는 `listener(event, args...)`로 호출됩니다.

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function

이벤트에 일회성 `listener` 함수를 추가합니다. 이 `listener` 는 다음 메시지가 `channel`에 보내지면 한번 동작하고 이후에 제거됩니다.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` Function

`channel` 의 listener 배열에서 지정한 `listener`를 제거합니다.

### `ipcRenderer.removeAllListeners([channel])`

* `channel` String (optional)

Removes all listeners, or those of the specified `channel`.

### `ipcRenderer.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Send a message to the main process asynchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with `ipcMain` module.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Returns `any` - The value sent back by the [`ipcMain`](ipc-main.md) handler.

Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with `ipcMain` module, and replies by setting `event.returnValue`.

**Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.