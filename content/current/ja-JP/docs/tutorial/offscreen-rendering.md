# オフスクリーンレンダリング

## 概要

オフスクリーンレンダリングでは `BrowserWindow` のコンテンツを ビットマップで取得できます。これは、3D シーンのテクスチャのようにどこにでも描画できます。 Electron のオフスクリーンレンダリングは [Chromium 埋め込みフレームワーク](https://bitbucket.org/chromiumembedded/cef) プロジェクトと似たアプローチを使用しています。

*注意*:

* レンダリングモードは 2 種類使用でき (後述)、変化した部分だけを `paint` イベントに渡すことでより効率的なレンダリングができます。
* 描画を停止/続行したり、フレームレートを設定したりできます。
* The maximum frame rate is 60 because greater values bring only performance losses with no benefits.
* When nothing is happening on a webpage, no frames are generated.
* An offscreen window is always created as a [Frameless Window](../api/frameless-window.md).

### レンダリングモード

#### GPU アクセラレーション

GPU アクセラレーションレンダリングとは、GPU が構成に使用されることを意味します。 Because of that, the frame has to be copied from the GPU which requires more resources, thus this mode is slower than the Software output device. このモードのメリットは、WebGL と 3D CSS アニメーションがサポートされていることです。

#### ソフトウェア出力デバイス

This mode uses a software output device for rendering in the CPU, so the frame generation is much faster. As a result, this mode is preferred over the GPU accelerated one.

To enable this mode, GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration) API.

## サンプル

[クイックスタートガイド](quick-start.md)の作業アプリケーションから始めて、次の行を `main.js` ファイルに追加します。

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

After launching the Electron application, navigate to your application's working folder.
