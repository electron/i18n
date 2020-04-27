## クラス: DownloadItem

> リモートソースからのファイルのダウンロードを制御します。

プロセス: [Main](../glossary.md#main-process)

`DownloadItem` は [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) を継承しており、Electron でのダウンロードアイテムを表します。 これは `Session` クラスの `will-download` イベントで使用されており、ユーザーがダウンロードアイテムを制御できるようにします。

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

戻り値：

* `event` Event
* `state` String - `completed`、`cancelled` か `interrupted` にできます。

ダウンロードが終了状態となったときに発生します。 これは完了したダウンロード、キャンセルされたダウンロード (`downloadItem.cancel()` によって) 、再開できる中断されたダウンロードを含みます。

`state` は、次のいずれかになります。

* `completed` - ダウンロードが正常に完了しました。
* `cancelled` - ダウンロードがキャンセルされました。
* `interrupted` - ダウンロードが中断され、再開することができません。

### インスタンスメソッド

`downloadItem` オブジェクトには以下のメソッドがあります

#### `downloadItem.setSavePath(path)`

* `path` String - ダウロードアイテムを保存するファイルパスを設定します。

このAPIは、セッションの `will-download` コールバック関数でのみ利用可能です。 ユーザがこのAPIを経由して保存先のパスを設定しない場合、Electron は、保存先のパスを決定するために独自のルーチンを使用します。通常は保存ダイアログを表示します。

**[非推奨](modernization/property-updates.md): 代わりに `savePath` プロパティを使用してください。**

#### `downloadItem.getSavePath()`

戻り値 `String` - ダウンロードアイテムの保存先パス。 これは `downloadItem.setSavePath(path)` で設定されたものか、保存ダイアログで選択されたものになります。

**[非推奨](modernization/property-updates.md): 代わりに `savePath` プロパティを使用してください。**

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - ファイル保存ダイアログのオプションを設定します。 このオブジェクトは `options` パラメータ([`dialog.showSaveDialog()`](dialog.md)の)と同じプロパティを持ちます。

この API によって、ダウンロードアイテムに対して既定で開かれる保存ダイアログのカスタムオプションをユーザが設定できます。 このAPIは、セッションの `will-download` コールバック関数でのみ利用可能です。

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

戻り値 `String` - アイテムがダウンロードされた元の URL。

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

戻り値 `String` - 現在の状態。 `progressing` 、 `completed` 、 `cancelled` 、 `interrupted` のいずれか。

**注:** 以下のメソッドは、セッションが再開されたときに `cancelled` アイテムを再開するのに特に有用です。

#### `downloadItem.getURLChain()`

戻り値 `String[]` - すべてのリダイレクトを含むアイテムの完全な URL チェーン。

#### `downloadItem.getLastModifiedTime()`

戻り値 `String` - Last-Modifiedのヘッダーの値。

#### `downloadItem.getETag()`

戻り値 `String` - ETagのヘッダーの値。

#### `downloadItem.getStartTime()`

戻り値 `Double` - ダウンロードが開始されたUNIXエポックからの秒数。

### インスタンスプロパティ

#### `downloadItem.savePath`

`String` 型のプロパティです。ダウンロードアイテムを保存するファイルパスを決定します。

このプロパティは、セッションの `will-download` コールバック関数内でのみ利用可能です。 ユーザがこのプロパティを経由して保存先のパスを設定しない場合、Electron は、保存先のパスを決定するために独自のルーチンを使用します。通常は保存ダイアログを表示します。
