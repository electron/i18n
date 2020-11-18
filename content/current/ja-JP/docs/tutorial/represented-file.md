# macOS の BrowserWindow が表すファイル

## 概要

macOS では、アプリケーション内の任意のウインドウに表示中のファイルを設定できます。 表現中ファイルのアイコンはタイトルバーに表示され、ユーザーが `Command-Click` や `Control-Click` クリックをすると、ファイルへのパスを含むポップアップが表示されます。

![ウインドウが表すファイル](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

> 注意: 上のスクリーンショットは、Atom テキストエディタで現在開いているファイルを表示するためにこの機能を使用している例です。

ウインドウの編集状態を設定し、このウィンドウ内の書類が変更されたかどうかをファイルアイコンで表示することもできます。

ウィンドウの表示中ファイルを設定するには、[BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) と [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) の API を使用します。

## サンプル

[クイックスタートガイド](quick-start.md)の作業アプリケーションから始めて、次の行を `main.js` ファイルに追加します。

```javascript
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow()

  win.setRepresentedFilename('/etc/passwd')
  win.setDocumentEdited(true)
})
```

Electron アプリケーションを起動した後、`Command` または `Control` キーを押した状態でタイトルをクリックします。 すると、先ほど指定したファイルのポップアップが表示されるはずです。

![表示中のファイル](../images/represented-file.png)
