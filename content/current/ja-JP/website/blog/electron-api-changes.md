---
title: Electron 1.0 における API の変更点
author: zcbenz
date: '2015-11-17'
---

Electron が始まって以来、以前の Atom-Shell と呼ばれていた頃から、Chromium のコンテンツモジュールとネイティブ GUI コンポーネント向けに、クロスプラットフォームの JavaScript API を提供する実験を行ってきました。 この API の始まりは非常に原始的で、時間をかけて初期設計を改善するためにいくつかの変更を加えてきました。

---

Electron は 1.0 リリースに向けて準備を進めていますが、この機会を利用して、最後の問題となっていた API の詳細を記述したいと考えています。 The changes described below are included in **0.35.x**, with the old APIs reporting deprecation warnings so you can get up to date for the future 1.0 release. Electron 1.0 は数ヶ月先になりますので、これらの変更が破壊的になるまでの猶予があります。

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

And for the `ipcRenderer` module, an extra `event` object has been added when receiving messages, to match how messages are handled in `ipcMain` modules:

```javascript
ipcRenderer.on('message', function (event) {
  console.log(event)
})
```

## Standardizing `BrowserWindow` options

The `BrowserWindow` options had different styles based on the options of other APIs, and were a bit hard to use in JavaScript because of the `-` in the names. They are now standardized to the traditional JavaScript names:

```javascript
new BrowserWindow({ minWidth: 800, minHeight: 600 })
```

## Following DOM's conventions for API names

The API names in Electron used to prefer camelCase for all API names, like `Url` to `URL`, but the DOM has its own conventions, and they prefer `URL` to `Url`, while using `Id` instead of `ID`. We have done the following API renames to match the DOM's styles:

* `Url` is renamed to `URL`
* `Csp` is renamed to `CSP`

You will notice lots of deprecations when using Electron v0.35.0 for your app because of these changes. An easy way to fix them is to replace all instances of `Url` with `URL`.

## Changes to `Tray`'s event names

The style of `Tray` event names was a bit different from other modules so a rename has been done to make it match the others.

* `clicked` is renamed to `click`
* `double-clicked` is renamed to `double-click`
* `right-clicked` is renamed to `right-click`

