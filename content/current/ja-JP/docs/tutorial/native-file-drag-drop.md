# ネイティブなファイルのドラッグ&ドロップ

## 概要

ファイルを操作する特定の種類のアプリケーションは、オペレーティングシステムのネイティブなファイルのドラッグ&ドロップの機能をサポートしたいでしょう。 ファイルをウェブコンテンツにドラッグすることは一般的であり、多くのウェブサイトでサポートされています。 Electron はさらに、ファイルやコンテンツをウェブコンテンツからオペレーティングシステム側へドラッグすることをサポートしています。

この機能をアプリに実装するには、`ondragstart` イベントへの応答として [``webContents.startDrag(item)](../api/web-contents.md#contentsstartdragitem) API を呼ぶ必要があります。

## サンプル

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `index.html` ファイルに以下の行を追加します。

```html
<a href="#" id="drag"></a>
<script src="renderer.js"></script> をドラッグ
```

そして、 `renderer.js` ファイルに次の行を追加します。

```js
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/to/the/item')
}
```

上記のコードはレンダラープロセスに `ondragstart` イベント を処理し、情報をメインプロセスに転送するように指示します。

メインプロセス (`main.js` ファイル) で、以下のように受信したイベントへドラッグしているファイルのパスとアイコンを追加します。

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

Electron アプリケーションを起動したら、BroswerWindow の アイテムをデスクトップにドラッグ&ドロップしてみてください。 このガイドでは、そのアイテムはプロジェクトのルートにある Markdown ファイルとなっています。

![ドラッグ＆ドロップ](../images/drag-and-drop.gif)
