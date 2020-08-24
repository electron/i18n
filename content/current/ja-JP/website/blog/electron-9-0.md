---
title: Electron 9.0.0
author:
  - sofianguy
  - VerteDinde
date: '2020-05-19'
---

Electron 9.0.0 がリリースされました! It includes upgrades to Chromium `83`, V8 `8.3`, and Node.js `12.14`. We've added several new API integrations for our spellchecker feature, enabled PDF viewer, and much more!

---

Electron チームは、Electron 9.0.0 のリリース発表にワクワクしています! `npm install electron@latest` から npm でインストールするか、[リリースウェブサイト](https://electronjs.org/releases/stable) からダウンロードできます。 このリリースには、アップグレード、修正、新機能が含まれています。 新機能たちと共に何を作るのか、楽しみにしています! このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

## 変更の目玉

### 累積的変更

* Chromium `83.0.4103.64`
    * [Chrome 81 の新機能](https://developers.google.com/web/updates/2020/04/nic81)
    * [Chrome 82 was skipped](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Chrome 83 の新機能](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [Node 12.14.1 ブログ記事](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [V8 8.1 ブログ記事](https://v8.dev/blog/v8-release-81)
    * [V8 8.3 ブログ記事](https://v8.dev/blog/v8-release-83)

### 注目の機能

* Multiple improvements to the spellchecker feature. See more details in [#22128](https://github.com/electron/electron/pull/22128) and [#22368](https://github.com/electron/electron/pull/22368).
* Improved window events handler efficiency on Linux. [#23260](https://github.com/electron/electron/pull/23260).
* Enable PDF viewer. [#22131](https://github.com/electron/electron/pull/22131).

新機能と変更の完全なリストは、[9.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v9.0.0) を参照してください。

## 破壊的変更

* Deprecation warning when using `remote` without `enableRemoteModule: true`. [#21546](https://github.com/electron/electron/pull/21546)
    * This is the first step in our plans for deprecating the `remote` module and moving it to userland. [この Issue](https://github.com/electron/electron/issues/21408) を読んで経緯を知ってください。この Issue では、理由を説明し非推奨化予定のタイムラインを提案しています。
* Set `app.enableRendererProcessReuse` to true by default. [#22336](https://github.com/electron/electron/pull/22336)
    * これは、レンダラープロセスにロードされるネイティブ Node モジュールは [N-API](https://nodejs.org/api/n-api.html) か [コンテキス対応](https://nodejs.org/api/addons.html#addons_context_aware_addons) であるという将来の要件に対応する作業の一環です。 完全な情報と提案された時系列は、[この Issue](https://github.com/electron/electron/issues/18397) で詳しく説明しています。
* Sending non-JavaScript objects over IPC now throws an exception. [#21560](https://github.com/electron/electron/pull/21560)
    * This behavior was depreciated in Electron 8.0. In Electron 9.0, the old serialization algorithm has been removed, and sending such non-serializable objects will now throw an "object could not be cloned" error.

これらの変更と将来の変更の詳細については、[予定されている破壊的な変更](https://github.com/electron/electron/electron/blob/master/docs/breaking-changes.md) のページを参照してください。

## API の変更

* `shell` API changes:
   * The `shell.openItem` API has been replaced with an asynchronous `shell.openPath API`. [proposal](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `session`API changes:
   * Added `session.listWordsFromSpellCheckerDictionary` API to list custom words in the dictionary. [#22128](https://github.com/electron/electron/pull/22128)
   * Added `session.removeWordFromSpellCheckerDictionary` API to remove custom words in the dictionary. [#22368](https://github.com/electron/electron/pull/22368)
   * Added `session.serviceWorkerContext` API to access basic service worker info and receive console logs from service workers. [#22313](https://github.com/electron/electron/pull/22313)
* `app` API の変更:
   * Added a new force parameter to `app.focus()` on macOS to allow apps to forcefully take focus. [#23447](https://github.com/electron/electron/pull/23447)
* `BrowserWindow` API の変更:
   * Added support for property access to some getter/setter pairs on `BrowserWindow`. [#23208](https://github.com/electron/electron/pull/23208)

### 非推奨となった API

The following APIs are now deprecated or removed:

* `shell.openItem` API is now depreciated, and replaced with an asynchronous `shell.openPath API`.
* `<webview>.getWebContents`, which was deprecated in Electron 8.0, is now removed.
* `webFrame.setLayoutZoomLevelLimits`, which was deprecated in Electron 8.0, is now removed.

## 6.x.y サポートの終了

Electron 6.x.y はプロジェクトの [サポートポリシー](https://electronjs.org/docs/tutorial/support#supported-versions) に則りサポート終了となりました。 開発者とアプリケーションは新しいバージョンの Electron にアップグレードすることを推奨します。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。 [仮 10.0.0 スケジュール](https://electronjs.org/docs/tutorial/electron-timelines) では、Electron 10.0 開発ライフサイクルの主要な日付を示してあります。 また、Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照](https://electronjs.org/docs/tutorial/electron-versioning) してください。

今後のバージョンの Electron で予定されている破壊的な変更の詳細については、[予定されている破壊的な変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。

### Change the default of `contextIsolation` from `false` to `true` (Starting in Electron 10)

Without contextIsolation, any code running in a renderer process can quite easily reach into Electron internals or an app's preload script. That code can then perform privileged actions that Electron wants to keep restricted.

Changing this default improves the default security of Electron apps, so that apps will need to deliberately opt in to the insecure behaviour. Electron will depreciate the current default of `contextIsolation` in Electron 10.0, and change to the new default (`true`) in Electron 12.0.

For more information on `contextIsolation`, how to enable it easily and it's security benefits please see our dedicated [Context Isolation Document](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md).
