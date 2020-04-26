# ipcMain

> メインプロセスからレンダラープロセスへ非同期で通信を行います。

プロセス: [Main](../glossary.md#main-process)

`ipcMain` オブジェクトは [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) クラスのインスタンスの一つです。 メインプロセスで使用される場合、レンダラープロセス (ウェブページ) から送られる非同期及び同期メッセージを処理します。 レンダラーから送信されたメッセージは、このモジュールに送られます。

## メッセージ送信

また、メインプロセスからレンダラープロセスにメッセージを送ることもできます。より詳しくは [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) を参照して下さい。

* メッセージを送信しているとき、イベント名は `channel` です。
* 同期メッセージに返信をするには、`event.returnValue` を設定する必要があります。
* 非同期メッセージを送信者に返送するには、`event.reply(...)` を使用できます。  このヘルパーメソッドはメインフレームではないフレーム (例: iframe) から来るメッセージを自動的に処理します。一方、`event.sender.send(...)` は常にメインフレームに送信されます。

レンダラー/メインプロセス間のメッセージの送信と処理の例:

```javascript
// メインプロセス
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // "ping"を表示
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)  // "ping"を表示
  event.returnValue = 'pong'
})
```

```javascript
// レンダラープロセス（ウェブページ）
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // "pong"を表示

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // "pong"を表示
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## メソッド

`ipcMain` オブジェクトは、イベントを受け取るために以下のメソッドがあります。

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

`channel` に新しいメッセージが来たときに `listener` が `listener(event, args...)` として呼ばれます、

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

イベントに対する一回限りの `listener` 関数を追加します。 この `listener` は、次にメッセージが `channel` へ送信されたときに、削除されてから呼び出されます。

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function

指定した `channel` の listener 配列から、指定した `listener` を削除します。

### `ipcMain.removeAllListeners([channel])`

* `channel` String

指定した `channel` の listener を全て削除します。

## イベントオブジェクト

`callback` に渡された `event` オブジェクトに関するドキュメントは、[`ipc-main-event`](structures/ipc-main-event.md) 構造体ドキュメントにあります。