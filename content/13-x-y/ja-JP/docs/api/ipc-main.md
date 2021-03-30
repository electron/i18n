# ipcMain

> メインプロセスからレンダラープロセスへ非同期で通信を行います。

プロセス: [Main](../glossary.md#main-process)

`ipcMain` モジュールは [Event Emitter][event-emitter] を継承しています。 メインプロセスで使用される場合、レンダラープロセス (ウェブページ) から送られる非同期及び同期メッセージを処理します。 レンダラーから送信されたメッセージは、このモジュールに送られます。

## メッセージ送信

また、メインプロセスからレンダラープロセスにメッセージを送ることもできます。より詳しくは [webContents.send][web-contents-send] を参照して下さい。

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
  * `...args` any[]

指定した `channel` の listener 配列から、指定した `listener` を削除します。

### `ipcMain.removeAllListeners([channel])`

* `channel` String (任意)

指定した `channel` の listener を全て削除します。

### `ipcMain.handle(channel, listener)`

* `channel` String
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

`invoke` 可能な IPC のハンドラを追加します。 このハンドラは、レンダラが `ipcRenderer.invoke(channel, ...args)` を呼び出したとき常に呼び出されます。

`listener` が Promise を返す場合、Promise の最終的な結果は、リモート呼び出し元への応答として返されます。 それ以外は、リスナーの戻り値が応答の値として使用されます。

```js
// メインプロセス
ipcMain.handle('my-invokable-ipc', async (event, ...args) => {
  const result = await somePromise(...args)
  return result
})

// レンダラープロセス
async () => {
  const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
  // ...
}
```

ハンドラーの最初の引数として渡される `event` は、通常のイベントリスナーに渡されるものと同じです。 どの WebContents が呼び出しリクエスト元であるかに関する情報が含まれています。

メインプロセスの `handle` から投げられたエラーはシリアライズされ、元のエラーからの `message` プロパティのみがレンダラープロセスに提供されるため、非透過的です。 詳細は [#24427](https://github.com/electron/electron/issues/24427) をご参照ください。

### `ipcMain.handleOnce(channel, listener)`

* `channel` String
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

1 つの `invoke` 可能な IPC メッセージを処理し、リスナーを削除します。 `ipcMain.handle(channel, listener)` を参照してください。

### `ipcMain.removeHandler(channel)`

* `channel` String

`channel` にハンドラがあれば削除します。

## IpcMainEvent オブジェクト

`callback` に渡された `event` オブジェクトに関するドキュメントは、[`ipc-main-event`](structures/ipc-main-event.md) 構造体ドキュメントにあります。

## IpcMainInvokeEvent オブジェクト

`handle` コールバックに渡される `event` オブジェクトのドキュメントは、[`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) 構造体ドキュメントにあります。

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[web-contents-send]: web-contents.md#contentssendchannel-args
