# ipcRenderer

> レンダラープロセスからメインプロセスに非同期通信をします。

プロセス: [Renderer](../glossary.md#renderer-process)

`ipcRenderer` オブジェクトは [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) クラスのインスタンスの一つです。 レンダラープロセス (ウェブページ) からメインプロセスに同期及び非同期メッセージを送れるように、いくつかのメソッドを提供します。 メインプロセスからの返信を受け取ることもできます。

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

指定した `channel` の listener 配列から、指定した `listener` を削除します。

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

指定した `channel` の listener を全て削除します。

### `ipcRenderer.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

`channel` を介して非同期でメインプロセスにメッセージを送ります。更に任意の引数を送ることもできます。 引数は内部で JSON にシリアライズされるので、関数やプロトタイプチェーンは含まれません。

メインプロセスは [`ipcMain`](ipc-main.md) で `channel` を聴いてそれを処理します。

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

戻り値 `any` - [`ipcMain`](ipc-main.md) ハンドラから返された値。

`channel` を介して同期でメインプロセスにメッセージを送ります。更に任意の引数を送ることもできます。 引数は内部で JSON にシリアライズされるので、関数やプロトタイプチェーンは含まれません。

メインプロセスは [`ipcMain`](ipc-main.md) オブジェクトで `channel` を聴いてそれを処理します。そして `event.returnValue` をセットすることで応答します。

**注釈:** 同期メッセージを送信するとレンダラープロセス全体がブロックされます。何をしているのかをよく理解せずに使用しないで下さい。

### `ipcRenderer.sendTo(webContentsId, channel, [, arg1][, arg2][, ...])`

* `webContentsId` Number
* `channel` String
* `...args` any[]

`channel` を介して `webContentsId` のウインドウにメッセージを送ります。

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

`ipcRenderer.send` に似ていますが、イベントはメインプロセスの代わりにホストページの `<webview>` に送信されます。

## イベントオブジェクト

`callback` に渡された `event` オブジェクトに関するドキュメントは、[`ipc-renderer-event`](structures/ipc-renderer-event.md) 構造体ドキュメントにあります。
