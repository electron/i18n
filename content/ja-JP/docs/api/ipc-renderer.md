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

`channel` に新しいメッセージが来たときに `listener` が `listener(event, args...)` として呼ばれます、

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function

一回だけの `listener` イベント関数を追加します。この `listener` は次に `channel` にメッセージが送信された後にのみ呼び出され、その後削除されます。

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

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

戻り値 `any` - [`ipcMain`](ipc-main.md) ハンドラから返された値。

`channel` を介して同期でメインプロセスにメッセージを送ります。更に任意の引数を送ることもできます。 引数は内部で JSON にシリアライズされるので、関数やプロトタイプチェーンは含まれません。

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

**注釈:** 同期メッセージを送信するとレンダラープロセス全体がブロックされます。何をしているのかをよく理解せずに使用しないで下さい。

### `ipcRenderer.sendTo(windowId, channel, [, arg1][, arg2][, ...])`

* `windowId` Number
* `channel` String
* `...args` any[]

Sends a message to a window with `windowid` via `channel`.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.