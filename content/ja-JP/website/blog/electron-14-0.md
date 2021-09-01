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

Electron チームは、Electron 14.0.0 のリリース発表にワクワクしています! You can install it with npm via `npm install electron@latest` or download it from our [releases website](https://electronjs.org/releases/stable). Continue reading for details about this release and please share any feedback you have!

## 注目すべき変更

### Electron Release Cadence Change

Beginning in September 2021 with Electron 15, Electron will release a new major stable version every 8 weeks. You can read the [full details here](https://www.electronjs.org/blog/8-week-cadence). Electron 15 will begin beta on September 1, 2021 and stable release will be on September 21, 2021. You can find [Electron's public timeline here](https://electronjs.org/docs/tutorial/electron-timelines).

Additionally, Electron will be changing supported versions from latest three versions to latest four versions until May 2022. See [see our versioning document](https://electronjs.org/docs/tutorial/electron-versioning) for more detailed information about versioning in Electron.

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

* Default Changed: `nativeWindowOpen` now defaults to `true`. [(see docs)](https://www.electronjs.org/docs/api/window-open.md)
* Child windows no longer inherit BrowserWindow construction options from their parents. [#28550](https://github.com/electron/electron/pull/28550)
* セッション固有のデータに対するディスク上のパスを取得するために新しく `session.storagePath` API を追加しました。 [#28665](https://github.com/electron/electron/pull/28665)
* `@electron/remote` で使用されている `process.contextId` を追加しました。 [#28007](https://github.com/electron/electron/pull/28007)
* Added experimental cookie encryption support behind an [Electron Fuse](https://www.electronjs.org/docs/tutorial/fuses). [#29492](https://github.com/electron/electron/pull/29492)

新機能と変更の完全なリストは、[14.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v14.0.0) を参照してください。

## 破壊的変更

Below are breaking changes introduced in Electron 14. More information about these and future changes can be found on the [Planned Breaking Changes](https://github.com/electron/electron/blob/main/docs/breaking-changes.md) page.

### 削除: `app.allowRendererProcessReuse`

The `app.allowRendererProcessReuse` property has been removed as part of our plan to more closely align with Chromium's process model for security, performance and maintainability.

詳細は [#18397](https://github.com/electron/electron/issues/18397) を参照してください。

### 削除: Browser Window の Affinity

The `affinity` option when constructing a new `BrowserWindow` has been removed as part of our plan to more closely align with Chromium's process model for security, performance and maintainability.

詳細は [#18397](https://github.com/electron/electron/issues/18397) を参照してください。

### API 変更: `window.open()`

The optional parameter `frameName` no longer sets the title of the window. This behavior now follows the specification described by the [native documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters) for the `windowName` parameter.

If you were using this parameter to set the title of a window, you can instead use the [`win.setTitle(title)`](https://www.electronjs.org/docs/api/browser-window#winsettitletitle) method.

### 削除: `worldSafeExecuteJavaScript`

`worldSafeExecuteJavaScript` has been removed with no alternative. Please ensure your code works with this property enabled. It has been enabled by default since Electron 12.

`webFrame.executeJavaScript` か `webFrame.executeJavaScriptInIsolatedWorld` のいずれかを使用している場合、この変更の影響を受けます。 これらのメソッドは同じ値渡しセマンティクスを使用しているため、[Context Bridge API](https://www.electronjs.org/docs/api/context-bridge.md#parameter--error--return-type-support) がサポートしている戻り値かどうかを確認する必要があります。

### 省略値変更: `nativeWindowOpen` の省略値を `true` に

Electron 14 より前の `window.open` は既定で `BrowserWindowProxy` を使用していました。 このため、`window.open('about:blank')` では同期的にスクリプトで操作可能な子ウィンドウを開くことができないなどといった、非互換性がありました。 `nativeWindowOpen` は実験的でなくなり、既定値になります。

詳細については [Electron での window.open](https://www.electronjs.org/docs/api/window-open.md) をご参照ください

### 削除: 親ウインドウからの BrowserWindowConstructorOptions の継承

Electron 14 より前は、`window.open` で開いたウインドウは、親ウインドウから `transparent` や `resizable` などの BrowserWindow コンストラクタのオプションを継承していました。 Beginning with Electron 14, this behavior has been removed and windows will not inherit any BrowserWindow constructor options from their parents.

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

WebContents の `new-window` イベントと `did-create-window` イベントの、非推奨となっていた `additionalFeatures` プロパティは削除されました。 `new-window` は引数の順番があるのでこの引数はまだ残りますが、常に空の配列 `[]` になります。 (Note: the `new-window` event itself is already deprecated and has been replaced by `setWindowOpenHandler`.) ウインドウ機能のキーに値が無い場合は、オプションオブジェクトで `true` の値を持つキーとして表示されるようになりました。

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

### Removed: `remote` module

Deprecated in Electron 12, the `remote` module has now been removed from Electron itself and extracted into a separate package, [`@electron/remote`](https://www.npmjs.com/package/@electron/remote). The `@electron/remote` module bridges JavaScript objects from the main process to the renderer process. This lets you access main-process-only objects as if they were available in the renderer process. This is a direct replacement for the `remote` module. See the [module's readme](https://github.com/electron/remote/blob/main/README.md) for migration instructions and reference.


## API の変更

* Added `BrowserWindow.isFocusable()` method to determine whether a window is focusable. [#28642](https://github.com/electron/electron/pull/28642)
* Added `WebFrameMain.visibilityState` instance property. [#28706](https://github.com/electron/electron/pull/28706)
* Added `disposition`, `referrer` and `postBody` to the details object passed to the window open handler registered with `setWindowOpenHandler`. [#28518](https://github.com/electron/electron/pull/28518)
* `@electron/remote` で使用されている `process.contextId` を追加しました。 [#28007](https://github.com/electron/electron/pull/28007)
* Added experimental cookie encryption support behind an [Electron Fuse](https://www.electronjs.org/docs/tutorial/fuses). [#29492](https://github.com/electron/electron/pull/29492)
* Added missing `resourceType` conversions for `webRequest` listener details: `font`, `ping`, `cspReport`, `media`, `webSocket`. [#30050](https://github.com/electron/electron/pull/30050)
* セッション固有のデータに対するディスク上のパスを取得するために新しく `session.storagePath` API を追加しました。 [#28665](https://github.com/electron/electron/pull/28665)
* Added support for Windows Control Overlay on macOS. [#29986](https://github.com/electron/electron/pull/29986)
* Added support for directing Chromium logging to a file with `--log-file=.../path/to/file.log`. Also, it's now possible to enable logging from JavaScript by appending command-line switches during the first JS tick. [#29963](https://github.com/electron/electron/pull/29963)
* Added support for the des-ede3 cipher in node crypto. [#27897](https://github.com/electron/electron/pull/27897)
* Added a `ContextBridgeMutability` feature that allows context bridge objects to be mutated. [#27348](https://github.com/electron/electron/pull/27348)


### 削除/非推奨となった変更

以下の API は削除されたか非推奨になりました。

* The `remote` module has been removed after being deprecated in Electron 12. [#25734](https://github.com/electron/electron/pull/25734)
* Child windows no longer inherit BrowserWindow construction options from their parents. [#28550](https://github.com/electron/electron/pull/28550)
* Removed deprecated `additionalFeatures` property from `new-window` and `did-create-window` WebContents events. [#28548](https://github.com/electron/electron/pull/28548)
* Removed the deprecated `app.allowRendererProcessReuse` and BrowserWindow `affinity` options. [#26874](https://github.com/electron/electron/pull/26874)
* The `submitURL` option for `crashReporter.start` is no longer a required argument when `uploadToServer` is false. [#28105](https://github.com/electron/electron/pull/28105)

## 11.x.y サポート終了

Electron 11.x.y はプロジェクトの [サポートポリシー](https://electronjs.org/docs/tutorial/support#supported-versions) に則りサポート終了となりました。 開発者とアプリケーションは新しいバージョンの Electron にアップグレードすることを推奨します。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないでチームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。

For information on planned breaking changes in upcoming versions of Electron, see our [Planned Breaking Changes](https://github.com/electron/electron/blob/main/docs/breaking-changes.md).
