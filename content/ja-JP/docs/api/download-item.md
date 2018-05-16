## クラス: DownloadItem

> リモートソースからのファイルのダウンロードを制御します。

プロセス: [Main](../glossary.md#main-process)

`DownloadItem` は、Electronでダウンロードアイテムを表す `EventEmitter` です。 これは `Session` クラスの `will-download` イベントで使用されており、ユーザーがダウンロードアイテムを制御できるようにします。

```javascript
// メインプロセス
const {BrowserWindow} = require('electron')
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
* `state` String - Can be `progressing` or `interrupted`.

ダウンロードが更新され、まだ未完了であるときに発生します。

`state` は、次のいずれかになります。

* `progressing` - ダウンロードが進行中です。
* `interrupted` - ダウンロードが中断されましたが、再開することができます。

#### イベント: 'done'

戻り値:

* `event` Event
* `state` String - Can be `completed`, `cancelled` or `interrupted`.

ダウンロードが終息状態になるときに発生します。これには、完了したダウンロード、(`downloadItem.cancel()` 経由で) キャンセルされたダウンロード、再開することができない中断されたダウンロードが含まれます。

`state` は、次のいずれかになります。

* `completed` - ダウンロードが正常に完了しました。
* `cancelled` - ダウンロードがキャンセルされました。
* `interrupted` - ダウンロードが中断され、再開することができません。

### インスタンスメソッド

`downloadItem` オブジェクトには以下のメソッドがあります

#### `downloadItem.setSavePath(path)`

* `path` String - ダウロードアイテムを保存するファイルパスを設定します。

このAPIは、セッションの `will-download` コールバック関数でのみ利用可能です。 ユーザがこのAPIを経由して保存先のパスを設定しない場合、Electronは、保存先のパスを決定するために、独自のルーチンを使用します (通常は保存ダイアログを表示します)。

#### `downloadItem.getSavePath()`

戻り値 `String` - ダウンロードアイテムの保存先のパス。これは、`downloadItem.setSavePath(path)` 経由で設定されたパスか、表示された保存ダイアログで選択されたパスのいずれかです。

#### `downloadItem.pause()`

ダウンロードを一時停止します。

#### `downloadItem.isPaused()`

戻り値 `Boolean` - ダウンロードが一時停止しているかどうか。

#### `downloadItem.resume()`

一時停止されたダウンロードを再開します。

**注:** 再開可能なダウンロードを有効にするには、ダウンロードしているサーバーがRangeリクエストをサポートしており、`Last-Modified` と `ETag` の両方のヘッダーの値を提供していなければなりません。 そうでなければ、`resume()` は、前回受信したバイト数を無視して、最初からダウンロードを再開します。

#### `downloadItem.canResume()`

Returns `Boolean` - Whether the download can resume.

#### `downloadItem.cancel()`

ダウンロード操作をキャンセルします。

#### `downloadItem.getURL()`

戻り値 `String` - アイテムがダウンロードされた元のURL。

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

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**注:** 以下のメソッドは、セッションが再開されたときに `cancelled` アイテムを再開するのに特に有用です。

#### `downloadItem.getURLChain()`

戻り値 `String[]` - すべてのリダイレクトを含むアイテムの完全なURLチェーン。

#### `downloadItem.getLastModifiedTime()`

戻り値 `String` - Last-Modifiedのヘッダーの値。

#### `downloadItem.getETag()`

戻り値 `String` - ETagのヘッダーの値。

#### `downloadItem.getStartTime()`

戻り値 `Double` - ダウンロードが開始されたUNIXエポックからの秒数。