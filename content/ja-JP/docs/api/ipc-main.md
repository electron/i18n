# ipcMain

> メインプロセスからレンダラープロセスに非同期通信をします。

プロセス: [Main](../glossary.md#main-process)

`ipcMain` オブジェクトは [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) クラスのインスタンスの一つです。 メインプロセスで使用される場合、レンダラープロセス (ウェブページ) から送られる非同期及び同期メッセージを処理します。 レンダラーから送信されたメッセージは、このモジュールに送られます。

## メッセージ送信

It is also possible to send messages from the main process to the renderer process, see [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) for more information.

* When sending a message, the event name is the `channel`.
* To reply to a synchronous message, you need to set `event.returnValue`.
* To send an asynchronous message back to the sender, you can use `event.sender.send(...)`.

An example of sending and handling messages between the render and main processes:

```javascript
// メインプロセス
const {ipcMain} = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // "ping"を表示
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)  // "ping"を表示
  event.returnValue = 'pong'
})
```

```javascript
// レンダラープロセス（ウェブページ）
const {ipcRenderer} = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // "pong"を表示

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // "pong"を表示
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## メソッド

The `ipcMain` module has the following method to listen for events:

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Function

Listens to `channel`, when a new message arrives `listener` would be called with `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function

Removes the specified `listener` from the listener array for the specified `channel`.

### `ipcMain.removeAllListeners([channel])`

* `channel` String

Removes listeners of the specified `channel`.

## イベントオブジェクト

The `event` object passed to the `callback` has the following methods:

### `event.returnValue`

Set this to the value to be returned in a synchronous message.

### `event.sender`

Returns the `webContents` that sent the message, you can call `event.sender.send` to reply to the asynchronous message, see [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) for more information.