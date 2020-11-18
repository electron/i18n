---
title: Electron 11.0.0
author:
  - VerteDinde
date: '2020-11-17'
---

Electron 11.0.0 がリリースされました! これには Chromium `87`、V8 `8.7`、Node.js `12.18.3` へのアップグレードが含まれています。 We've added support for Apple silicon, and general improvements. 詳細は以下をご覧ください!

---

Electron チームは、Electron 11.0.0 のリリース発表にワクワクしています! `npm install electron@latest` から npm でインストールするか、[リリースウェブサイト](https://electronjs.org/releases/stable) からダウンロードできます。 The release is packed with upgrades, fixes, and new support for Apple's M1 hardware.

新機能たちと共に何を作るのか、楽しみにしています! このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

## 変更の目玉

### 累積的変更

* Chromium `87.0.4280.47`
    * [Chrome 86 の新機能](https://developers.google.com/web/updates/2020/10/nic86)
    * [Chrome 87 の新機能](https://developers.google.com/web/updates/2020/11/nic87)
* Node.js `12.18.3`
    * [Node 12.18.3 ブログ記事](https://nodejs.org/en/blog/release/v12.18.3/)
    * [Node 12.7.0 ブログ記事](https://nodejs.org/en/blog/release/v12.17.0/)
* V8 `8.7`
    * [V8 8.6 ブログ記事](https://v8.dev/blog/v8-release-86)
    * [V8 8.7 ブログ記事](https://v8.dev/blog/v8-release-87)

### 注目の機能

* Support for Apple M1: On November 10, Apple announced their [new M1 chips, which will be included in their upcoming hardware](https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/). Beginning in Electron 11, Electron will be shipping separate versions of Electron for Intel Macs (x64) and Apple's upcoming M1 hardware (arm64). You can learn more about how to get your Electron app [running on Apple's M1 hardware here.](https://www.electronjs.org/blog/apple-silicon) [#24545](https://github.com/electron/electron/pull/24545)
* Added V8 crash message and location information to crashReport parameters. [#24771](https://github.com/electron/electron/pull/24771)
* Improved the performance of sending wide objects over the context bridge. [#24671](https://github.com/electron/electron/pull/24671)

新機能と変更の完全なリストは、[11.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v11.0.0) を参照してください。

## 破壊的変更

* Removed experimental APIs: `BrowserView.{fromId, fromWebContents, getAllViews}` and the `id` property of `BrowserView`. [#23578](https://github.com/electron/electron/pull/23578)

これらの変更と将来の変更の詳細については、[予定されている破壊的な変更](https://github.com/electron/electron/electron/blob/master/docs/breaking-changes.md) のページを参照してください。

## API の変更

* Added `app.getApplicationInfoForProtocol()` API that returns detailed information about the app that handles a certain protocol. [#24112](https://github.com/electron/electron/pull/24112)
* Added `app.createThumbnailFromPath()` API that returns a preview image of a file given its file path and a maximum thumbnail size. [#24802](https://github.com/electron/electron/pull/24802)
* Added `webContents.forcefullyCrashRenderer()` to forcefully terminate a renderer process to assist with recovering a hung renderer. [#25756](https://github.com/electron/electron/pull/25756)

## 8.x.y サポートの終了

Electron 8.x.y has reached end-of-support as per the project's [support policy](https://electronjs.org/docs/tutorial/support#supported-versions). 開発者はアプリケーションを新しいバージョンの Electron にアップグレードすることを推奨します。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 Although we are careful not to make promises about release dates, our plan is to release new major versions of Electron with new versions of those components approximately quarterly. [仮 12.0.0 スケジュール](https://electronjs.org/docs/tutorial/electron-timelines) では、Electron 12.0 開発ライフサイクルの主要な日付を示してあります。 また、Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照](https://electronjs.org/docs/tutorial/electron-versioning) してください。

今後のバージョンの Electron で予定されている破壊的な変更の詳細については、[予定されている破壊的な変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。

### Continued Work for Deprecation of `remote` Module
We started work to remove the `remote` module in [Electron 9](https://www.electronjs.org/blog/electron-9-0). We plan to remove the `remote` module itself in Electron 14.

Read and follow [this issue](https://github.com/electron/electron/issues/21408) for full plans and details for deprecation.

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 12)
From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 12.

Read and follow [this issue](https://github.com/electron/electron/issues/18397) for full details, including the proposed timeline.
