---
title: Electron 10.0.0
author:
  - VerteDinde
  - sofianguy
date: '2020-08-25'
---

Electron 10.0.0 がリリースされました! It includes upgrades to Chromium `85`, V8 `8.5`, and Node.js `12.16`. We've added several new API integrations and improvements. Read below for more details!

---

Electron チームは、Electron 10.0.0 のリリース発表にワクワクしています! `npm install electron@latest` から npm でインストールするか、[リリースウェブサイト](https://electronjs.org/releases/stable) からダウンロードできます。 このリリースには、アップグレード、修正、新機能が入っています。

In the Electron 10 release, we also made a change to our release notes. To make it easier to tell what's brand new in Electron 10 and what may have changed between Electron 10 and past releases, we now also include changes that were introduced to Electron 10, but backported to previous releases. We hope this makes it easier to apps to find new features and bug fixes when upgrading Electron.

新機能たちと共に何を作るのか、楽しみにしています! このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

## 変更の目玉

### 累積的変更

* Chromium `85.0.4183.84`
    * [Chrome 84 の新機能](https://developers.google.com/web/updates/2020/07/nic84)
    * [Chrome 85 の新機能](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [Node 12.16.3 ブログ記事](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [V8 8.4 ブログ記事](https://v8.dev/blog/v8-release-84)
    * [V8 8.5 ブログ記事](https://v8.dev/blog/v8-release-85)

### 注目の機能

* Added `contents.getBackgroundThrottling()` method and `contents.backgroundThrottling` property. [#21036]
* Exposed the `desktopCapturer` module in the main process. [#23548](https://github.com/electron/electron/pull/23548)
* Can now check if a given `session` is persistent by calling the `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* Resolve network issues that prevented RTC calls from being connected due to network IP address changes and ICE. (Chromium issue 1113227). [#24998](https://github.com/electron/electron/pull/24998)

新機能と変更の完全なリストは、[10.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v10.0.0) を参照してください。

## 破壊的変更

* Changed the default value of `enableRemoteModule` to `false`. [#22091](https://github.com/electron/electron/pull/22091)
    * This is part of our plans for deprecating the `remote` module and moving it to userland. [この Issue](https://github.com/electron/electron/issues/21408) を読んで経緯を知ってください。この Issue では、理由を説明し非推奨化予定のタイムラインを提案しています。
* Changed the default value of `app.allowRendererProcessReuse` to `true`. [#22336](https://github.com/electron/electron/pull/22336) (Also in [Electron 9](https://github.com/electron/electron/pull/22401))
   * This will prevent loading of non-context-aware native modules in renderer processes.
   * [この Issue](https://github.com/electron/electron/issues/18397) を読んで経緯を知ってください。この Issue では、理由を説明し非推奨化予定のタイムラインを提案しています。
* Fixed the positioning of window buttons on macOS when the OS locale is set to an RTL language (like Arabic or Hebrew). Frameless window apps may have to account for this change while styling their windows. [#22016](https://github.com/electron/electron/pull/22016)

これらの変更と将来の変更の詳細については、[予定されている破壊的な変更](https://github.com/electron/electron/electron/blob/master/docs/breaking-changes.md) のページを参照してください。

## API の変更

* Session: Can now check if a given `session` is persistent by calling the `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* Contents: Added `contents.getBackgroundThrottling()` method and `contents.backgroundThrottling` property. [#21036](https://github.com/electron/electron/pull/21036)

### 非推奨となった API

The following APIs are now deprecated or removed:

* Removed the deprecated `currentlyLoggingPath` property of `netLog`. Additionally, `netLog.stopLogging` no longer returns the path to the recorded log. [#22732](https://github.com/electron/electron/pull/22732)
* Deprecated uncompressed crash uploads in `crashReporter`. [#23598](https://github.com/electron/electron/pull/23598)

## 7.x.y サポートの終了

Electron 7.x.y has reached end-of-support as per the project's [support policy](https://electronjs.org/docs/tutorial/support#supported-versions). 開発者はアプリケーションを新しいバージョンの Electron にアップグレードすることを推奨します。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。 [仮 11.0.0 スケジュール](https://electronjs.org/docs/tutorial/electron-timelines) では、Electron 11.0 開発ライフサイクルの主要な日付を示してあります。 また、Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照](https://electronjs.org/docs/tutorial/electron-versioning) してください。

今後のバージョンの Electron で予定されている破壊的な変更の詳細については、[予定されている破壊的な変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。

### Continued Work for Deprecation of `remote` Module (in Electron 11)
We started work to remove the remote module in [Electron 9](https://www.electronjs.org/blog/electron-9-0) and we're continuing plans to remove the `remote` module. In Electron 11, we plan to continue refactor work for implementing [WeakRef](https://v8.dev/features/weak-references) as we have done in Electron 10. Please read and follow [this issue](https://github.com/electron/electron/issues/21408) for full plans and details for deprecation.

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 11)
From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 11. Read [this issue](https://github.com/electron/electron/issues/18397) for full details including the proposed timeline.
