# ipcRenderer

> renderer 프로세스에서 main 프로세스로 비동기적인 통신을 합니다.

프로세스: [Renderer](../glossary.md#renderer-process)

The `ipcRenderer` module is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). 제공되는 몇가지 메소드를 통해서 renderer 프로세스(웹 페이지)에서 main 프로세스로 동기 및 비동기 메시지를 보낼 수 있습니다. main 프로세스로부터 오는 응답을 수신할 수도 있습니다.

[ipcMain](ipc-main.md)의 코드 예제를 보세요.

## 메서드

`ipcRenderer` 모듈은 이벤트를 처리하고 메시지를 보내기 위해 다음의 메소드를 가집니다:

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` 함수 
  * `event` IpcRendererEvent
  * `...args` any[]

`channel`을 수신하고, 새로운 메시지가 도착하면 `listener`는 `listener(event, args...)`로 호출됩니다.

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` 함수 
  * `event` IpcRendererEvent
  * `...args` any[]

이벤트에 일회성 `listener` 함수를 추가합니다. 이 `listener` 는 다음 메시지가 `channel`에 보내지면 한번 동작하고 이후에 제거됩니다.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` 함수 
  * `...args` any[]

`channel` 의 listener 배열에서 지정한 `listener`를 제거합니다.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

모든 listener를 제거하거나 지정된 `channel`의 listener를 제거합니다.

### `ipcRenderer.send(channel, ...args)`

* `channel` String
* `...args` any[]

Send an asynchronous message to the main process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The main process handles it by listening for `channel` with the [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String
* `...args` any[]

Returns `Promise<any>` - Resolves with the response from the main process.

Send a message to the main process via `channel` and expect a result asynchronously. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The main process should listen for `channel` with [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener).

예시:

```javascript
// Renderer process
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})

// Main process
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = await doSomeWork(someArgument)
  return result
})
```

### `ipcRenderer.sendSync(channel, ...args)`

* `channel` String
* `...args` any[]

`any` 반환 - 값은 [`ipcMain`](ipc-main.md) 핸들러를 통해 돌려보냅니다.

Send a message to the main process via `channel` and expect a result synchronously. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

> :warning: **WARNING**: Sending a synchronous message will block the whole renderer process until the reply is received, so use this method only as a last resort. It's much better to use the asynchronous version, [`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args).

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` String
* `...args` any[]

Sends a message to a window with `webContentsId` via `channel`.

### `ipcRenderer.sendToHost(channel, ...args)`

* `channel` String
* `...args` any[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.

## Event 객체

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-renderer-event`](structures/ipc-renderer-event.md) structure docs.