# オフスクリーンレンダリング

オフスクリーンレンダリングは、ブラウザウインドウのコンテンツをビットマップで取得させるので、3D シーン中のテクスチャのように、どこにでも描画できます。 Electron のオフスクリーンレンダリングは、 [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) プロジェクトと似たアプローチを使用します。

2つの描画モードを使用でき、また、より効果的に描画するために、`'paint'` イベント内では変更された領域だけが渡されます。 描画は停止でき、設定されたフレームレートで再開できます。 指定のフレームレートは上限値で、ウェブページ上で何も発生しなかった場合、フレームは生成されません。 最大フレームレートは 60 です。それ以上はパフォーマンスが低下するだけで、利点はありません。

**注釈:** オフスクリーンウインドウは、常に [フレームレスウインドウ](../api/frameless-window.md) として作成されます。

## レンダリングモード

### GPU アクセラレーション

GPU アクセラレーションレンダリングとは、GPU が構成に使用されることを意味します。 GPU からフレームをコピーする必要があるために、より高いパフォーマンスを要求するので、このモードは他のフレームよりかなり遅くなります。 The benefit of this mode that WebGL and 3D CSS animations are supported.

### ソフトウェア出力デバイス

This mode uses a software output device for rendering in the CPU, so the frame generation is much faster, thus this mode is preferred over the GPU accelerated one.

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration) API.

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