## クラス: DownloadItem

> リモートソースからのファイルのダウンロードを制御します。

プロセス: [Main](../glossary.md#main-process)

`DownloadItem` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) that represents a download item in Electron. これは `Session` クラスの `will-download` イベントで使用されており、ユーザーがダウンロードアイテムを制御できるようにします。

```javascript
// メインプロセス
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
  // Electronが保存ダイアログを表示しないようにするために、保存先のパスを設定します。
  item.setSavePath('/tmp/save.pdf')

  item.on('updated', (event, state) => {
    if (state === 'interrupted') {
      console.log('Download is interrupted but can be resumed')
    } else if (state === 'progressing') {
      if (item.isPaused()) {
        console.log('Download is paused')
      } else {
        console.log(`Received bytes: ${item.getReceivedBytes()}`)
      }
    }
  })
  item.once('done', (event, state) => {
    if (state === 'completed') {
      console.log('Download successfully')
    } else {
      console.log(`Download failed: ${state}`)
    }
  })
})
```

### インスタンスイベント

#### イベント: 'updated'

戻り値:

* `event` Event
* `state` String - `progressing` か `interrupted` にできます。

ダウンロードが更新され、まだ未完了であるときに発生します。

`state` は、次のいずれかになります。

* `progressing` - ダウンロードが進行中です。
* `interrupted` - ダウンロードが中断されましたが、再開することができます。

#### イベント: 'done'

戻り値:

* `event` Event
* `state` String - `completed`、`cancelled` か `interrupted` にできます。

ダウンロードが終息状態になるときに発生します。これには、完了したダウンロード、(`downloadItem.cancel()` 経由で) キャンセルされたダウンロード、再開することができない中断されたダウンロードが含まれます。

`state` は、次のいずれかになります。

* `completed` - ダウンロードが正常に完了しました。
* `cancelled` - ダウンロードがキャンセルされました。
* `interrupted` - ダウンロードが中断され、再開することができません。

### インスタンスメソッド

`downloadItem` オブジェクトには以下のメソッドがあります

#### `downloadItem.setSavePath(path)`

* `path` String - ダウロードアイテムを保存するファイルパスを設定します。

このAPIは、セッションの `will-download` コールバック関数でのみ利用可能です。 If user doesn't set the save path via the API, Electron will use the original routine to determine the save path; this usually prompts a save dialog.

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.getSavePath()`

戻り値 `String` - ダウンロードアイテムの保存先のパス。これは、`downloadItem.setSavePath(path)` 経由で設定されたパスか、表示された保存ダイアログで選択されたパスのいずれかです。

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - ファイル保存ダイアログのオプションを設定します。 このオブジェクトは `options` パラメータ([`dialog.showSaveDialog()`](dialog.md)の)と同じプロパティを持ちます。

この API により、ユーザはデフォルトでダウンロードアイテム用に開く保存ダイアログのカスタムオプションを設定できます。 この API はセッションの `will-download` コールバック関数内でのみ使用できます。

#### `downloadItem.getSaveDialogOptions()`

戻り値 `SaveDialogOptions` - `downloadItem.setSaveDialogOptions(options)`によってその前に設定されたオブジェクトを返す。

#### `downloadItem.pause()`

ダウンロードを一時停止します。

#### `downloadItem.isPaused()`

戻り値 `Boolean` - ダウンロードが一時停止しているかどうか。

#### `downloadItem.resume()`

一時停止されたダウンロードを再開します。

**注:** 再開可能なダウンロードを有効にするには、ダウンロードしているサーバーがRangeリクエストをサポートしており、`Last-Modified` と `ETag` の両方のヘッダーの値を提供していなければなりません。 そうでなければ、`resume()` は、前回受信したバイト数を無視して、最初からダウンロードを再開します。

#### `downloadItem.canResume()`

戻り値 `Boolean` - ダウンロードを再開できるかどうか。

#### `downloadItem.cancel()`

ダウンロード操作をキャンセルします。

#### `downloadItem.getURL()`

Returns `String` - The origin URL where the item is downloaded from.

#### `downloadItem.getMimeType()`

戻り値 `String` - ファイルのMIMEタイプ。

#### `downloadItem.hasUserGesture()`

戻り値 `Boolean` - ダウンロードにユーザージェスチャがあるかどうか。

#### `downloadItem.getFilename()`

戻り値 `String` - ダウンロードアイテムのファイル名。

**注:** ファイル名は常にローカルディスクに保存したものと同じではありません。 ユーザーが表示されたダウンロード保存ダイアログでファイル名を変更した場合、保存されたファイルの実際の名前は異なります。

#### `downloadItem.getTotalBytes()`

戻り値 `Integer` - ダウンロードアイテムのバイト単位での合計サイズ。

サイズが不明な場合、0を返します。

#### `downloadItem.getReceivedBytes()`

戻り値 `Integer` - ダウンロードアイテムの受信したバイト数。

#### `downloadItem.getContentDisposition()`

戻り値 `String` - レスポンスヘッダーのContent-Dispositionフィールド。

#### `downloadItem.getState()`

戻り値 `String` - 現在の状態。`progressing`、`completed`、`cancelled` または `interrupted` のいずれかです。

**注:** 以下のメソッドは、セッションが再開されたときに `cancelled` アイテムを再開するのに特に有用です。

#### `downloadItem.getURLChain()`

Returns `String[]` - The complete URL chain of the item including any redirects.

#### `downloadItem.getLastModifiedTime()`

戻り値 `String` - Last-Modifiedのヘッダーの値。

#### `downloadItem.getETag()`

戻り値 `String` - ETagのヘッダーの値。

#### `downloadItem.getStartTime()`

戻り値 `Double` - ダウンロードが開始されたUNIXエポックからの秒数。

### インスタンスプロパティ

#### `downloadItem.savePath`

A `String` property that determines the save file path of the download item.

The property is only available in session's `will-download` callback function. If user doesn't set the save path via the property, Electron will use the original routine to determine the save path; this usually prompts a save dialog.