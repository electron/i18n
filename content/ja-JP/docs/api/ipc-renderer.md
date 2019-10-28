# ipcRenderer

> レンダラープロセスからメインプロセスに非同期通信をします。

プロセス: [Renderer](../glossary.md#renderer-process)

The `ipcRenderer` module is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). レンダラープロセス (ウェブページ) からメインプロセスに同期及び非同期メッセージを送れるように、いくつかのメソッドを提供します。 メインプロセスからの返信を受け取ることもできます。

サンプルコードについては [ipcMain](ipc-main.md) を参照して下さい。

## メソッド

`ipcRenderer` オブジェクトは、イベントを受け取り、送るために以下のメソッドがあります。

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` Function 
  * `event` IpcRendererEvent
  * `...args` any[]

`channel` に新しいメッセージが来たときに `listener` が `listener(event, args...)` として呼ばれます、

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function 
  * `event` IpcRendererEvent
  * `...args` any[]

一回だけの `listener` イベント関数を追加します。この `listener` は次に `channel` にメッセージが送信された後にのみ呼び出され、その後削除されます。

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` Function 
  * `...args` any[]

指定した `channel` の listener 配列から、指定した `listener` を削除します。

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

指定した `channel` の listener を全て削除します。

### `ipcRenderer.send(channel, ...args)`

* `channel` String
* `...args` any[]

`channel` を介して非同期でメインプロセスにメッセージを送ります。更に任意の引数を送ることもできます。 Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with the [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String
* `...args` any[]

Returns `Promise<any>` - Resolves with the response from the main process.

Send a message to the main process asynchronously via `channel` and expect an asynchronous result. Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

The main process should listen for `channel` with [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener).

例:

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

Returns `any` - The value sent back by the [`ipcMain`](ipc-main.md) handler.

Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. 引数は内部で JSON にシリアライズされるので、関数やプロトタイプチェーンは含まれません。

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

**Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` String
* `...args` any[]

Sends a message to a window with `webContentsId` via `channel`.

### `ipcRenderer.sendToHost(channel, ...args)`

* `channel` String
* `...args` any[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.

## イベントオブジェクト

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-renderer-event`](structures/ipc-renderer-event.md) structure docs.