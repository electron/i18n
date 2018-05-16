# ipcRenderer

> renderer 프로세스에서 main 프로세스로 비동기적인 통신을 합니다.

프로세스: [Renderer](../glossary.md#renderer-process)

`ipcRenderer` 모듈은 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) 클래스의 인스턴스입니다. 제공되는 몇가지 메소드를 통해서 renderer 프로세스(웹 페이지)에서 main 프로세스로 동기 및 비동기 메시지를 보낼 수 있습니다. main 프로세스로부터 오는 응답을 수신할 수도 있습니다.

[ipcMain](ipc-main.md)의 코드 예제를 보세요.

## 메서드

`ipcRenderer` 모듈은 이벤트를 처리하고 메시지를 보내기 위해 다음의 메소드를 가집니다:

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

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

모든 listener를 제거하거나 지정된 `channel`의 listener를 제거합니다.

### `ipcRenderer.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

`channel`을 통해 main 프로세스에 비동기 메시지를 보내고 임의의 인수를 보낼 수도 있습니다. 인수는 내부적으로 JSON으로 serialize 될 것입니다. 따라서 함수나 프로토타입이 포함될 수 없습니다.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

`any` 반환 - 값은 [`ipcMain`](ipc-main.md) 핸들러를 통해 돌려보냅니다.

`channel`을 통해 main 프로세스에 동기 메시지를 보내고 임의의 인수를 보낼 수도 있습니다. 인수는 내부적으로 JSON으로 serialize 될 것입니다. 따라서 함수나 프로토타입이 포함될 수 없습니다.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

**참고:** 동기 메시지를 보내는 것은 전체 renderer 프로세스를 차단합니다. 만약 무엇이 동작하는지 알지 못한다면 이것을 사용해선 안됩니다.

### `ipcRenderer.sendTo(windowId, channel, [, arg1][, arg2][, ...])`

* `windowId` Number
* `channel` String
* `...args` any[]

Sends a message to a window with `windowid` via `channel`.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

`ipcRenderer.send`와 같지만 main 프로세스 대신 호스트 페이지의 `<webview>` 엘리먼트로 이벤트를 전달합니다.