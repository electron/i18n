# ネイティブなファイルのドラッグ&ドロップ

## 概要

ファイルを操作する特定の種類のアプリケーションは、オペレーティングシステムのネイティブなファイルのドラッグ&ドロップの機能をサポートしたいでしょう。 ファイルをウェブコンテンツにドラッグすることは一般的であり、多くのウェブサイトでサポートされています。 Electron はさらに、ファイルやコンテンツをウェブコンテンツからオペレーティングシステム側へドラッグすることをサポートしています。

この機能をアプリに実装するには、`ondragstart` イベントへの応答として [``webContents.startDrag(item)](../api/web-contents.md#contentsstartdragitem) API を呼ぶ必要があります。

## サンプル

この例では、実行時にファイルを作成し、ウィンドウ外へとドラッグできるようにする方法を示します。

### Preload.js

`preload.js` では、[`contextBridge`][] を使用してメインプロセスに IPC メッセージを送信するメソッド `window.electron.startDrag(...)` を注入します。

```js
const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')

contextBridge.exposeInMainWorld('electron', {
  startDrag: (fileName) => {
    ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
  }
})
```

### Index.html

`index.html` にドラッグ可能な要素を追加し、レンダラースクリプトを読むようにします。

```html
<div style="border:2px solid black;border-radius:3px;padding:5px;display:inline-block" draggable="true" id="drag">Drag me</div>
<script src="renderer.js"></script>
```

### Renderer.js

`renderer.js` ではレンダラープロセスを設定します。上記の [`contextBridge`][] で追加したメソッドを呼び出す形で、ドラッグイベントを処理します。

```javascript
document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  window.electron.startDrag('drag-and-drop.md')
}
```

### Main.js

メインプロセス (`main.js`ファイル) で受信したイベントを、以下のようにドラッグされたファイルのパスとアイコンへと展開します。

```javascript fiddle='docs/fiddles/features/drag-and-drop'
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

Electron アプリケーションを起動したら、BrowserWindow 上の アイテムをデスクトップへドラッグ & ドロップしてみてください。 このガイドでは、そのアイテムはプロジェクトのルートにある Markdown ファイルとなっています。

![ドラッグアンドドロップ](../images/drag-and-drop.gif)

[`contextBridge`]: ../api/context-bridge.md
