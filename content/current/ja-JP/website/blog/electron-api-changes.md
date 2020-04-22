---
title: Electron 1.0 における API の変更点
author: zcbenz
date: '2015-11-17'
---

Electron が始まって以来、以前の Atom-Shell と呼ばれていた頃から、Chromium のコンテンツモジュールとネイティブ GUI コンポーネント向けに、クロスプラットフォームの JavaScript API を提供する実験を行ってきました。 この API の始まりは非常に原始的で、時間をかけて初期設計を改善するためにいくつかの変更を加えてきました。

---

Electron は 1.0 リリースに向けて準備を進めていますが、この機会を利用して、最後の問題となっていた API の詳細を記述したいと考えています。 以下で述べる変更点は **0.35.x** のものです。古い API の利用に対する非推奨の警告を発するので、将来の 1.0 リリースに備えてアップデートしてもよいでしょう。 Electron 1.0 は数ヶ月先になりますので、これらの変更が破壊的になるまでの猶予があります。

## 非推奨の警告

デフォルトでは、非推奨 API を使用している場合に警告が表示されます。 これを無効にするには、`process.noDeprecation` を `true` にします。 非推奨の API 利用のソースをトラッキングするには、警告を表示する代わりに例外を投げるように `process.throwDeprecation` を `true` に設定したり、非推奨のトレースを表示するように `process.traceDeprecation` を `true` に設定したりすることができます。

## 組み込みモジュールの新しい利用方法

組み込みモジュールは、独立したモジュールに分離されるのではなく 1 つのモジュールにまとめられるようになったので、[他のモジュールと競合することなく](https://github.com/electron/electron/issues/387) 使用できます。

```javascript
var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
```

従来の `require('app')` の方法は後方互換性のためにまだサポートされますが、以下のようにして無効化もできます。

```javascript
require('electron').hideInternalModules()
require('app')  // エラーを送出します。
```

## `remote` モジュールの利用がより簡単に

組み込みモジュールの使い方が変わったので、レンダラープロセスでメインプロセス側のモジュールを使いやすくしました。 以下のように、`remote` の属性にアクセスするだけで利用できるようになります。

```javascript
// 新しい方法です。
var app = require('electron').remote.app
var BrowserWindow = require('electron').remote.BrowserWindow
```

以下のような長い require チェーンはもう不要です。

```javascript
// 古い方法です。
var app = require('electron').remote.require('app')
var BrowserWindow = require('electron').remote.require('BrowserWindow')
```

## `ipc` モジュールの分割

`ipc` モジュールはメインプロセスとレンダラープロセスの両方に存在し、それぞれの側での API が異なっていたため、新規ユーザーは非常に混乱していました。 混乱を避けるため、メインプロセスの `ipcMain` とレンダラープロセスの `ipcRenderer` にモジュール名を変更しました。

```javascript
// メインプロセス
var ipcMain = require('electron').ipcMain
```

```javascript
// レンダラープロセス
var ipcRenderer = require('electron').ipcRenderer
```

また、`ipcRenderer` モジュールでメッセージを受け取る際に `event` オブジェクトが追加されました。これは `ipcMain` モジュールでメッセージがどのように処理されるかを併せています。

```javascript
ipcRenderer.on('message', function (event) {
  console.log(event)
})
```

## `BrowserWindow` オプションの標準化

`BrowserWindow` のオプションは、他 API のオプションとスタイルが異なっていたり、名前に `-` が入っていたりしていたため、JavaScript では少し扱いづらかったようです。 これらは、従来の JavaScript の名前に標準化されました。

```javascript
new BrowserWindow({ minWidth: 800, minHeight: 600 })
```

## DOM の API 名の規約に準拠

Electron の API 名は、以前は `URL`ではなく `Url` のように、すべての API 名で camelCase を使用していましたが、DOM には独自の規約があり、`ID` ではなく `Id` を使いつつも、`Url` ではなく `URL` を使用しています。 DOM のスタイルに合わせて、以下の API の名称変更を行いました。

* `Url` を `URL` に名称変更しました。
* `Csp` を `CSP` に名称変更しました。

これらの変更によって、アプリで Electron v0.35.0 を使用していると非推奨の通知が多く出てくると思われます。 これは簡単な方法で修正できます。すべての `Url` の記述を `URL` に置換するだけです。

## `Tray` のイベント名の変更

`Tray` のイベント名のスタイルが他のモジュールと少し異なっていたため、他のモジュールと一致するように名前を変更しました。

* `clicked` を `click` に名称変更しました。
* `double-clicked` を `double-click` に名称変更しました。
* `right-clicked` を `right-click` に名称変更しました。

