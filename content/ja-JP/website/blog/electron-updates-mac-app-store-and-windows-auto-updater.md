---
title: Electron での Mac App Store と Windows 自動更新
author: jlord
date: '2015-11-05'
---

最近、Electron は 2 つの面白い機能を追加しました。Mac App Store 互換ビルドと組み込み Windows 自動更新です。

---

## Mac App Store サポート

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

`v0.34.0 ` 現在、Electron の各リリースは Mac App Store 互換のビルドとなっています。 以前は、Electronで構築されたアプリケーションは、Mac App Store に提出する際の Apple の要件を満たしていませんでした。 これら要件のほとんどは、非公開 API の使用に関するものです。 Electron をサンドボックス化して要件を満たすようにするには、2 つのモジュールを削除する必要があります。

- `crash-reporter`
- `auto-updater`

Additionally some behaviors have changed with respect to detecting DNS changes, video capture and accessibility features. You can read more about the changes and [submitting your app to the Mac App store](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) in the documentation. The distributions can be found on the [Electron releases page](https://github.com/electron/electron/releases), prefixed with `mas-`.

Related Pull Requests: [electron/electron#3108](https://github.com/electron/electron/pull/3108), [electron/electron#2920](https://github.com/electron/electron/pull/2920)

## Windows Auto Updater

In Electron `v0.34.1` the `auto-updater` module was improved in order to work with [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows). This means that Electron ships with easy ways for auto updating your app on both OS X and Windows. You can read more on [setting up your app for auto updating on Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) in the documentation.

Related Pull Request: [electron/electron#1984](https://github.com/electron/electron/pull/1984)

