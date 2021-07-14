# ipcRenderer

> レンダラープロセスからメインプロセスに非同期通信をします。

プロセス: [Renderer](../glossary.md#renderer-process)

`ipcRenderer` モジュールは [Event Emitter][event-emitter] を継承しています。 レンダラープロセス (ウェブページ) からメインプロセスに同期及び非同期メッセージを送れるように、いくつかのメソッドを提供します。 メインプロセスからの返信を受け取ることもできます。

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

イベントに対する一回限りの `listener` 関数を追加します。 この `listener` は、次にメッセージが `channel` へ送信されたときに、削除されてから呼び出されます。

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

引数と共に、`channel` を介してメインプロセスに非同期メッセージを送信します。 引数は [`window.postMessage`][] と同じように [構造化複製アルゴリズム][SCA] によってシリアライズされるため、プロトタイプチェーンは含まれません。 関数、Promise、Symbol、WeakMap、WeakSet の送信は、例外が送出されます。

> **注意:** DOM オブジェクトや特殊な Electron オブジェクトなど、非標準の JavaScript 型を送信すると例外が発生します。
> 
> メインプロセスでは `ImageBitmap`、`File`、`DOMMatrix` などの DOM オブジェクトをサポートしていません。そのため、これらのオブジェクトをメインプロセスでデコードする方法がなく、Electron の IPC を介してメインプロセスに送信することはできません。 IPC 経由でこのようなオブジェクトを送信するとエラーになります。

メインプロセスは [`ipcMain`](ipc-main.md) モジュールで `channel` を聴いてそれを処理します。

[`MessagePort`][] をメインプロセスに転送する必要がある場合は、[`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer) を使用してください。

メソッド呼び出しの結果のようにメインプロセスから応答を一つだけ受け取りたい場合は、[`ipcRenderer.invoke`](#ipcrendererinvokechannel-args) の使用を検討してください。

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String
* `...args` any[]

戻り値 `Promise<any>` - メインプロセスからの応答で解決します。

`channel` を介して非同期でメインプロセスにメッセージを送信し、結果を待ちます。 引数は [`window.postMessage`][] と同じように [構造化複製アルゴリズム][SCA] によってシリアライズされるため、プロトタイプチェーンは含まれません。 関数、Promise、Symbol、WeakMap、WeakSet の送信は、例外が送出されます。

> **注意:** DOM オブジェクトや特殊な Electron オブジェクトなど、非標準の JavaScript 型を送信すると例外が発生します。
> 
> メインプロセスでは `ImageBitmap`、`File`、`DOMMatrix` などの DOM オブジェクトをサポートしていません。そのため、これらのオブジェクトをメインプロセスでデコードする方法がなく、Electron の IPC を介してメインプロセスに送信することはできません。 IPC 経由でこのようなオブジェクトを送信するとエラーになります。

メインプロセスは、[`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener) で `channel` をリッスンする必要があります。

以下がその例です。

```javascript
// レンダラープロセス
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})

// メインプロセス
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = await doSomeWork(someArgument)
  return result
})
```

[`MessagePort`][] をメインプロセスに転送する必要がある場合は、[`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer) を使用してください。

メッセージの応答が必要ない場合は、[`ipcRenderer.send`](#ipcrenderersendchannel-args) の使用を検討してください。

### `ipcRenderer.sendSync(channel, ...args)`

* `channel` String
* `...args` any[]

戻り値 `any` - [`ipcMain`](ipc-main.md) ハンドラから返された値。

`channel` を介して同期でメインプロセスにメッセージを送信し、結果を待ちます。 引数は [`window.postMessage`][] と同じように [構造化複製アルゴリズム][SCA] によってシリアライズされるため、プロトタイプチェーンは含まれません。 関数、Promise、Symbol、WeakMap、WeakSet の送信は、例外が送出されます。

> **注意:** DOM オブジェクトや特殊な Electron オブジェクトなど、非標準の JavaScript 型を送信すると例外が発生します。
> 
> メインプロセスでは `ImageBitmap`、`File`、`DOMMatrix` などの DOM オブジェクトをサポートしていません。そのため、これらのオブジェクトをメインプロセスでデコードする方法がなく、Electron の IPC を介してメインプロセスに送信することはできません。 IPC 経由でこのようなオブジェクトを送信するとエラーになります。

メインプロセスは [`ipcMain`](ipc-main.md) オブジェクトで `channel` を聴いてそれを処理します。そして `event.returnValue` をセットすることで応答します。

> :warning: **警告**: 同期メッセージを送信すると、応答を受信するまでレンダラープロセス全体がブロックされます。そのため、このメソッドは最終手段として使用してください。 非同期バージョンの、[`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args) を使用することを推奨します。

### `ipcRenderer.postMessage(channel, message, [transfer])`

* `channel` String
* `message` any
* `transfer` MessagePort[] (任意)

メッセージをメインプロセスに送信し、任意でゼロ個以上の [ `MessagePort`][] オブジェクトの所有権を転送します。

転送した `MessagePort` オブジェクトは、発生したイベントの `ports` プロパティにアクセスすることで、[`MessagePortMain`](messageport-main.md) オブジェクトとしてメインプロセスで利用可能になります。

以下がその例です。

```js
// レンダラープロセス
const { port1, port2 } = new MessageChannel()
ipcRenderer.postMessage('port', { message: 'hello' }, [port1])

// メインプロセス
ipcMain.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

`MessagePort` と `MessageChannel` の使用方法の詳細については [MDN ドキュメント](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel) を参照してください。

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` String
* `...args` any[]

`channel` を介して `webContentsId` のウインドウにメッセージを送ります。

### `ipcRenderer.sendToHost(channel, ...args)`

* `channel` String
* `...args` any[]

`ipcRenderer.send` に似ていますが、イベントはメインプロセスの代わりにホストページの `<webview>` に送信されます。

## イベントオブジェクト

`callback` に渡された `event` オブジェクトに関するドキュメントは、[`ipc-renderer-event`](structures/ipc-renderer-event.md) 構造体ドキュメントにあります。

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`window.postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[ `MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
