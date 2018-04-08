# ネイティブなファイルのドラッグ&ドロップ

ファイルを操作する特定の種類のアプリケーションは、オペレーティングシステムのネイティブなファイルのドラッグ&ドロップの機能をサポートしたいでしょう。 ファイルをウェブコンテンツにドラッグすることは一般的であり、多くのウェブサイトでサポートされています。 Electron はさらに、ウェブコンテンツからオペレーティングシステムの世界にファイルやコンテンツをドラッグする機能をサポートしています。

この機能をアプリに実装するには、`ondragstart` イベントへの応答として `webContents.startDrag(item)` API を呼ぶ必要があります。

レンダラープロセスでは、`ondragstart` イベントを処理し、その情報をメインプロセスに転送します。

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Then, in the main process, augment the event with a path to the file that is being dragged and an icon.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```