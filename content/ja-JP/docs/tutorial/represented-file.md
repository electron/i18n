# macOS の BrowserWindow が表すファイル

## 概要

macOS では、アプリケーション内の任意のウインドウに表示中のファイルを設定できます。 表現中ファイルのアイコンはタイトルバーに表示され、ユーザーが `Command-Click` や `Control-Click` クリックをすると、ファイルへのパスを含むポップアップが表示されます。

![ウインドウが表すファイル][1]

> 注意: 上のスクリーンショットは、Atom テキストエディタで現在開いているファイルを表示するためにこの機能を使用している例です。

ウインドウの編集状態を設定し、このウィンドウ内の書類が変更されたかどうかをファイルアイコンで表示することもできます。

ウィンドウの表示中ファイルを設定するには、[BrowserWindow.setRepresentedFilename][setrepresentedfilename] と [BrowserWindow.setDocumentEdited][setdocumentedited] の API を使用します。

## サンプル

```javascript fiddle='docs/fiddles/features/represented-file'
const { app, BrowserWindow } = require('electron')
const os = require('os');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
}

app.whenReady().then(() => {
  const win = new BrowserWindow()

  win.setRepresentedFilename(os.homedir())
  win.setDocumentEdited(true)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

Electron アプリケーションを起動した後、`Command` または `Control` キーを押した状態でタイトルをクリックします。 すると、ウインドウが表すファイルのポップアップが上部に表示されるはずです。 このガイドでは、これはユーザのホームディレクトリです。

![表示中のファイル](../images/represented-file.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
