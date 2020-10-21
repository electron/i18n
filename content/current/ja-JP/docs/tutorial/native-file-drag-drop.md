# ネイティブなファイルのドラッグ&ドロップ

## 概要

ファイルを操作する特定の種類のアプリケーションは、オペレーティングシステムのネイティブなファイルのドラッグ&ドロップの機能をサポートしたいでしょう。 ファイルをウェブコンテンツにドラッグすることは一般的であり、多くのウェブサイトでサポートされています。 Electron はさらに、ファイルやコンテンツをウェブコンテンツからオペレーティングシステム側へドラッグすることをサポートしています。

To implement this feature in your app, you need to call the [`webContents.startDrag(item)`](../api/web-contents.md#contentsstartdragitem) API in response to the `ondragstart` event.

## サンプル

[クイックスタートガイド](quick-start.md)の作業アプリケーションから始めて、次の行を `index.html` ファイルに追加します:

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

In the Main process(`main.js` file), expand the received event with a path to the file that is being dragged and an icon:

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

Electron アプリケーションを起動したら、BroswerWindow の アイテムをデスクトップにドラッグ&ドロップしてみてください。 このガイドでは、 項目はプロジェクトのルートにある Markdown ファイルです:

![ドラッグ＆ドロップ](../images/drag-and-drop.gif)
