# ipcRenderer

> レンダラープロセスからメインプロセスに非同期通信をします。

プロセス: [Renderer](../glossary.md#renderer-process)

`ipcRenderer` モジュールは [Event Emitter](https://nodejs.org/api/events.html#events_class_eventemitter) を継承しています。 レンダラープロセス (ウェブページ) からメインプロセスに同期及び非同期メッセージを送れるように、いくつかのメソッドを提供します。 メインプロセスからの返信を受け取ることもできます。

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

引数と共に、`channel` を介してメインプロセスに非同期メッセージを送信します。 引数は [`postMessage`] [] と同様に [構造化複製アルゴリズム](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) でシリアライズされるため、プロトタイプチェーンは含まれません。 関数、Promise、Symbol、WeakMap、WeakSet の送信は、例外が送出されます。

> **注意**: DOM オブジェクトや特別な Electron オブジェクトなどの非標準の JavaScript 型の送信は廃止され、Electron 9 から例外が送出されるようになります。

メインプロセスは [`ipcMain`](ipc-main.md) モジュールで `channel` を聴いてそれを処理します。

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String
* `...args` any[]

戻り値 `Promise<any>` - メインプロセスからの応答で解決します。

`channel` を介して非同期でメインプロセスにメッセージを送信し、結果を待ちます。 引数は [`postMessage`] [] と同様に [構造化複製アルゴリズム](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) でシリアライズされるため、プロトタイプチェーンは含まれません。 関数、Promise、Symbol、WeakMap、WeakSet の送信は、例外が送出されます。

> **注意**: DOM オブジェクトや特別な Electron オブジェクトなどの非標準の JavaScript 型の送信は廃止され、Electron 9 から例外が送出されるようになります。

メインプロセスは、[`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener) で `channel` をリッスンする必要があります。

例:
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

### `ipcRenderer.sendSync(channel, ...args)`

* `channel` String
* `...args` any[]

戻り値 `any` - [`ipcMain`](ipc-main.md) ハンドラから返された値。

`channel` を介して同期でメインプロセスにメッセージを送信し、結果を待ちます。 引数は [`postMessage`] [] と同様に [構造化複製アルゴリズム](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) でシリアライズされるため、プロトタイプチェーンは含まれません。 関数、Promise、Symbol、WeakMap、WeakSet の送信は、例外が送出されます。

> **注意**: DOM オブジェクトや特別な Electron オブジェクトなどの非標準の JavaScript 型の送信は廃止され、Electron 9 から例外が送出されるようになります。

メインプロセスは [`ipcMain`](ipc-main.md) オブジェクトで `channel` を聴いてそれを処理します。そして `event.returnValue` をセットすることで応答します。

> :warning: **警告**: 同期メッセージを送信すると、応答を受信するまでレンダラープロセス全体がブロックされます。そのため、このメソッドは最終手段として使用してください。 非同期バージョンの、[`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args) を使用することを推奨します。

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
