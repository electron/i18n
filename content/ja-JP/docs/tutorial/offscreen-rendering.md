# オフスクリーンレンダリング

## 概要

オフスクリーンレンダリングでは `BrowserWindow` のコンテンツを ビットマップで取得できます。これは、3D シーンのテクスチャのようにどこにでも描画できます。 Electron のオフスクリーンレンダリングは [Chromium 埋め込みフレームワーク](https://bitbucket.org/chromiumembedded/cef) プロジェクトと似たアプローチを使用しています。

*注意*:

* レンダリングモードは 2 種類使用でき (後述)、変化した部分だけを `paint` イベントに渡すことでより効率的なレンダリングができます。
* 描画を停止/続行したり、フレームレートを設定したりできます。
* 最大フレームレートは 240 です。より大きな値にしてもメリットはなく、性能を損うだけです。
* ウェブページに何も起きなければ、フレームは生成されません。
* オフスクリーンウインドウは、常に [フレームレスウインドウ](../api/frameless-window.md) として作成されます。

### レンダリングモード

#### GPU アクセラレーション

GPU アクセラレーションレンダリングとは、GPU が構成に使用されることを意味します。 GPU からのフレームのコピーにより多くのリソースを必要とするため、このモードはソフトウェア出力デバイスよりも遅くなります。 このモードのメリットは、WebGL と 3D CSS アニメーションがサポートされていることです。

#### ソフトウェア出力デバイス

このモードでは、CPU レンダリングのソフトウェア出力デバイスが使用されているため、フレーム生成は非常に高速です。 したがって、このモードは GPU アクセラレーションよりも好まれます。

このモードを有効にするには、[`app.disableHardwareAcceleration()` API][disablehardwareacceleration] を呼び出して GPU アクセラレーションを無効にする必要があります。

## サンプル

```javascript fiddle='docs/fiddles/features/offscreen-rendering'
const { app, BrowserWindow } = require('electron')
const fs = require('fs')

app.disableHardwareAcceleration()

let win

app.whenReady().then(() => {
  win = new BrowserWindow({ webPreferences: { offscreen: true } })

  win.loadURL('https://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    fs.writeFileSync('ex.png', image.toPNG())
  })
  win.webContents.setFrameRate(60)
})
```

この Electron アプリケーションを起動したら、アプリケーションを開いたフォルダを見てみましょう。描画された画像があるはずです。

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
