# オフスクリーンレンダリング

オフスクリーンレンダリングは、ブラウザウインドウのコンテンツをビットマップで取得させるので、3D シーン中のテクスチャのように、どこにでも描画できます。 Electron のオフスクリーンレンダリングは、 [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) プロジェクトと似たアプローチを使用します。

2つの描画モードを使用でき、また、より効果的に描画するために、`'paint'` イベント内では変更された領域だけが渡されます。 描画は停止でき、設定されたフレームレートで再開できます。 指定のフレームレートは上限値で、ウェブページ上で何も発生しなかった場合、フレームは生成されません。 The maximum frame rate is 60, because above that there is no benefit, only performance loss.

**注釈:** オフスクリーンウインドウは、常に [フレームレスウインドウ](../api/frameless-window.md) として作成されます。

## レンダリングモード

### GPU アクセラレーション

GPU アクセラレーションレンダリングとは、GPU が構成に使用されることを意味します。 GPU からフレームをコピーする必要があるために、より高いパフォーマンスを要求するので、このモードは他のフレームよりかなり遅くなります。 このモードのメリットは、WebGL と 3D CSS アニメーションがサポートされていることです。

### ソフトウェア出力デバイス

このモードでは、CPU にレンダリングするソフトウェア出力デバイスが使用されているため、フレーム生成は非常に高速です。したがって、このモードは GPU アクセラレーションよりも優先されます。

このモードを有効にするには、[`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration) API を呼び出して GPU アクセラレーションを無効にする必要があります。

## 使い方

```javascript
const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

let win

app.once('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      offscreen: true
    }
  })

  win.loadURL('http://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    // updateBitmap(dirty, image.getBitmap())
  })
  win.webContents.setFrameRate(30)
})
```