---
title: Tray
description: このガイドでは、システムの通知エリアにそれ独自のコンテキストメニューがある Tray アイコンを作成する手順を一緒に見ていきます。
slug: tray
hide_title: true
---

# Tray

## 概要

<!-- ✍ Update this section if you want to provide more details -->

このガイドでは、システムの通知エリアにそれ独自のコンテキストメニューがある [Tray](https://www.electronjs.org/docs/api/tray) アイコンを作成する手順を一緒に見ていきます。

MacOS および Ubuntu では、Tray は画面の右上に位置し、バッテリーや Wi-Fi のアイコンと隣接します。 Windows の Tray は通常、右下に位置します。

## サンプル

### main.js

まず `electron` から `app`、`Tray`、`Menu`、`nativeImage` をインポートしなければなりません。

```js
const { app, Tray, Menu, nativeImage } = require('electron')
```

次に Tray を作成します。 このために、[`NativeImage`](https://www.electronjs.org/docs/api/native-image) アイコンを使用することにします。これはいずれかの [メソッド](https://www.electronjs.org/docs/api/native-image#methods) で作成できます。 Tray の作成コードを [`app.whenReady`](https://www.electronjs.org/docs/api/app#appwhenready) で囲んでいるのは、Electron アプリの初期化完了を待つ必要があるからです。

```js title='main.js'
let tray

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('path/to/asset.png')
  tray = new Tray(icon)

  // 注釈: contextMenu、Tooltip、Title のコードはこちらで!
})
```

これでうまくいきました。 それでは以下のように Tray へコンテキストメニューを付けていきます。

```js
const contextMenu = Menu.buildFromTemplate([
  { label: 'Item1', type: 'radio' },
  { label: 'Item2', type: 'radio' },
  { label: 'Item3', type: 'radio', checked: true },
  { label: 'Item4', type: 'radio' }
])

tray.setContextMenu(contextMenu)
```

上記のコードは、コンテキストメニューに 4 つで別々のラジオタイプのアイテムを作成します。 ネイティブメニューの構築についてご覧になりたい方は、[こちら](https://www.electronjs.org/docs/api/menu#menubuildfromtemplatetemplate) をクリックしてください。

最後に、Tray にツールチップとタイトルを入れましょう。

```js
tray.setToolTip('This is my application')
tray.setTitle('This is my title')
```

## おわりに

Electron アプリを起動すると、オペレーティングシステムに応じて、画面の右上や右下に Tray が表示されます。
`fiddle docs/fiddles/native-ui/tray`
