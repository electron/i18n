---
title: Electron 14.0.0
author:
  - sofianguy
  - clavin
  - ckerr
date: '2021-08-31'
---

Electron 14.0.0 がリリースされました! これには Chromium `93` とV8 `9.3` へのアップグレードが含まれています。 いくつかの API の更新、バグ修正、及び一般的な改善を行いました。 詳しくは以下をご覧ください!

---

Electron チームは、Electron 14.0.0 のリリース発表にワクワクしています! `npm install electron@latest` から npm でインストールするか、[リリースウェブサイト](https://electronjs.org/releases/stable) からダウンロードできます。 このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

## 注目すべき変更

### Electron リリースケイデンスの変更

2021 年 9 月の Electron 15 から、Electron は 8 週間ごとに安定版の新規メジャーバージョンをリリースします。 [詳細はこちら](https://www.electronjs.org/blog/8-week-cadence) でご覧いただけます。 Electron 15 は 2021 年 9 月 1 日にベータ版を開始し、2021 年 9 月 21 日に安定版のリリースを予定しています。 [Electron の公開タイムラインはこちら](https://electronjs.org/docs/tutorial/electron-timelines) になります。

また、Electron は 2022 年 5 月まで、サポートするバージョンを最新の 3 つのバージョンから最新の 4 つのバージョンに変更します。 Electron のバージョン管理の詳細については [バージョン管理のドキュメントをご参照ください](https://electronjs.org/docs/tutorial/electron-versioning)。

### 累積的変更

* Chromium `93`
    * [Chrome 93 の新機能](https://developer.chrome.com/blog/new-in-chrome-93/)
    * [Chrome 92 の新機能](https://www.chromestatus.com/features#milestone%3D92)
* Node.js `14.17.0`
    * [Node 14.17.0 ブログ記事](https://nodejs.org/en/blog/release/v14.17.0/)
* V8 `9.3`
    * [V8 9.3 ブログ記事](https://v8.dev/blog/v8-release-93)
    * [V8 9.2 ブログ記事](https://v8.dev/blog/v8-release-92)

### 注目の機能

* 省略値変更: `nativeWindowOpen` の省略値を `true` にしました。 [(ドキュメントを参照)](https://www.electronjs.org/docs/api/window-open.md)
* 子ウィンドウが親ウィンドウの BrowserWindow のコンストラクタのオプションを継承しなくなりました。 [#28550](https://github.com/electron/electron/pull/28550)
* セッション固有のデータに対するディスク上のパスを取得するために新しく `session.storagePath` API を追加しました。 [#28665](https://github.com/electron/electron/pull/28665)
* `@electron/remote` で使用されている `process.contextId` を追加しました。 [#28007](https://github.com/electron/electron/pull/28007)
* [Electron Fuse](https://www.electronjs.org/docs/tutorial/fuses) の下で実験的な Cookie 暗号化のサポートを追加しました。 [#29492](https://github.com/electron/electron/pull/29492)

新機能と変更の完全なリストは、[14.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v14.0.0) を参照してください。

## 破壊的変更

以下は、Electron 14 での破壊的変更点です。 これらの変更と将来の変更の詳細については、[予定されている破壊的変更](https://github.com/electron/electron/blob/main/docs/breaking-changes.md) のページを参照してください。

### 削除: `app.allowRendererProcessReuse`

`app.allowRendererProcessReuse` プロパティは、セキュリティ、パフォーマンス、保守性のために Chromium のプロセスモデルとより密接に連携する計画の一環として削除されました。

詳細は [#18397](https://github.com/electron/electron/issues/18397) を参照してください。

### 削除: Browser Window の Affinity

`BrowserWindow` を新規構築する際の `affinity` オプションは、セキュリティ、パフォーマンス、保守性のために Chromium のプロセスモデルとの共同連携計画の一環として削除されました。

詳細は [#18397](https://github.com/electron/electron/issues/18397) を参照してください。

### API 変更: `window.open()`

任意引数 `frameName` は、ウインドウのタイトルに設定されなくなりました。 これにより、[ネイティブのドキュメント](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters) に対応するパラメータ `windowName` で説明されている仕様に従う動作になります。

この引数でウィンドウのタイトルを設定していた場合は、代わりに [`win.setTitle(title)`](https://www.electronjs.org/docs/api/browser-window#winsettitletitle) を利用できます。

### 削除: `worldSafeExecuteJavaScript`

`worldSafeExecuteJavaScript` が削除され、この代替手段もなくなりました。 このプロパティを有効にした状態でコードが動作するようにしてください。 これは Electron 12 からデフォルトで有効になっています。

`webFrame.executeJavaScript` か `webFrame.executeJavaScriptInIsolatedWorld` のいずれかを使用している場合、この変更の影響を受けます。 これらのメソッドは同じ値渡しセマンティクスを使用しているため、[Context Bridge API](https://www.electronjs.org/docs/api/context-bridge.md#parameter--error--return-type-support) がサポートしている戻り値かどうかを確認する必要があります。

### 省略値変更: `nativeWindowOpen` の省略値を `true` に

Electron 14 より前の `window.open` は既定で `BrowserWindowProxy` を使用していました。 このため、`window.open('about:blank')` では同期的にスクリプトで操作可能な子ウィンドウを開くことができないなどといった、非互換性がありました。 `nativeWindowOpen` は実験的でなくなり、既定値になります。

詳細については [Electron での window.open](https://www.electronjs.org/docs/api/window-open.md) をご参照ください

### 削除: 親ウインドウからの BrowserWindowConstructorOptions の継承

Electron 14 より前は、`window.open` で開いたウインドウは、親ウインドウから `transparent` や `resizable` などの BrowserWindow コンストラクタのオプションを継承していました。 Electron 14 ではこの動作は削除され、ウインドウは親ウインドウから BrowserWindow のコンストラクタのオプションを継承しません。

代わりに、`setWindowOpenHandler` で以下のように新しいウインドウのオプションを明示的に設定してください。

```js
webContents.setWindowOpenHandler((details) => {
  return {
    action: 'allow',
    overrideBrowserWindowOptions: {
      // ...
    }
  }
})
```

### 削除: `additionalFeatures`

WebContents の `new-window` イベントと `did-create-window` イベントの、非推奨となっていた `additionalFeatures` プロパティは削除されました。 `new-window` は引数の順番があるのでこの引数はまだ残りますが、常に空の配列 `[]` になります。 (注意: `new-window` イベント自体は非推奨であり `setWindowOpenHandler` に置き換えられました。) ウインドウ機能のキーに値が無い場合は、オプションオブジェクトで `true` の値を持つキーとして表示されるようになりました。

```js
// Electron 14 で削除
// window.open('...', '', 'my-key') で動く
webContents.on('did-create-window', (window, details) => {
  if (details.additionalFeatures.includes('my-key')) {
    // ...
  }
})

// こちらに置換
webContents.on('did-create-window', (window, details) => {
  if (details.options['my-key']) {
    // ...
  }
})
```

### 削除: `remote` モジュール

Electron 12 で非推奨となった `remote` モジュールは、Electron 自体から削除され、[`@electron/remote`](https://www.npmjs.com/package/@electron/remote) という別パッケージに抽出されました。 `@electron/remote` モジュールは、JavaScript オブジェクトをメインプロセスからレンダラープロセスにブリッジします。 これにより、メインプロセス専用のオブジェクトをあたかもレンダラープロセスで利用可能であるかのようにアクセスできます。 これは、`remote` モジュールの直接的な代替品です。 移行手順やリファレンスは [モジュールの readme](https://github.com/electron/remote/blob/main/README.md) をご覧ください。


## API の変更

* ウィンドウがフォーカス可能かどうかを判断する `BrowserWindow.isFocusable()` メソッドを追加しました。 [#28642](https://github.com/electron/electron/pull/28642)
* `WebFrameMain.visibilityState` インスタンスプロパティを追加しました。 [#28706](https://github.com/electron/electron/pull/28706)
* `setWindowOpenHandler` で登録するウインドウを開くときのハンドラに渡される details オブジェクトに、`disposition`、`referrer`、`postBody` を追加しました。 [#28518](https://github.com/electron/electron/pull/28518)
* `@electron/remote` で使用されている `process.contextId` を追加しました。 [#28007](https://github.com/electron/electron/pull/28007)
* [Electron Fuse](https://www.electronjs.org/docs/tutorial/fuses) の下で実験的な Cookie 暗号化のサポートを追加しました。 [#29492](https://github.com/electron/electron/pull/29492)
* `webRequest` リスナーの details に不足していた `resourceType` である、`font`、`ping`、`cspReport`、`media`、`webSocket` の変換を追加しました。 [#30050](https://github.com/electron/electron/pull/30050)
* セッション固有のデータに対するディスク上のパスを取得するために新しく `session.storagePath` API を追加しました。 [#28665](https://github.com/electron/electron/pull/28665)
* macOS でのウインドウコントロールオーバーレイの対応を追加しました。 [#29986](https://github.com/electron/electron/pull/29986)
* Added support for directing Chromium logging to a file with `--log-file=.../path/to/file.log`. Also, it's now possible to enable logging from JavaScript by appending command-line switches during the first JS tick. [#29963](https://github.com/electron/electron/pull/29963)
* Added support for the des-ede3 cipher in node crypto. [#27897](https://github.com/electron/electron/pull/27897)
* Added a `ContextBridgeMutability` feature that allows context bridge objects to be mutated. [#27348](https://github.com/electron/electron/pull/27348)


### 削除/非推奨となった変更

以下の API は削除されたか非推奨になりました。

* The `remote` module has been removed after being deprecated in Electron 12. [#25734](https://github.com/electron/electron/pull/25734)
* 子ウィンドウが親ウィンドウの BrowserWindow のコンストラクタのオプションを継承しなくなりました。 [#28550](https://github.com/electron/electron/pull/28550)
* Removed deprecated `additionalFeatures` property from `new-window` and `did-create-window` WebContents events. [#28548](https://github.com/electron/electron/pull/28548)
* Removed the deprecated `app.allowRendererProcessReuse` and BrowserWindow `affinity` options. [#26874](https://github.com/electron/electron/pull/26874)
* The `submitURL` option for `crashReporter.start` is no longer a required argument when `uploadToServer` is false. [#28105](https://github.com/electron/electron/pull/28105)

## 11.x.y サポート終了

Electron 11.x.y はプロジェクトの [サポートポリシー](https://electronjs.org/docs/tutorial/support#supported-versions) に則りサポート終了となりました。 開発者とアプリケーションは新しいバージョンの Electron にアップグレードすることを推奨します。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないでチームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。

今後のバージョンの Electron で予定されている破壊的変更の詳細については、[予定されている破壊的変更](https://github.com/electron/electron/blob/main/docs/breaking-changes.md) をご参照ください。
