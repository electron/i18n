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

加えて、DNS の変更、ビデオキャプチャ、アクセシビリティ機能の検出に関して、いくつかの動作が変更されました。 変更の詳細についてはドキュメント内の [Mac App Store へのアプリ提出](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) を参照してください。 このディストリビューションは [Electron リリースページ](https://github.com/electron/electron/releases) にあり、頭に `mas-` が付いています。

関連するプルリクエストは以下の通りです。[electron/electron#3108](https://github.com/electron/electron/pull/3108)、[electron/electron#2920](https://github.com/electron/electron/pull/2920)

## Windows 自動更新

Electron `v0.34.1` では、`auto-updater` モジュールが [`Squirrel.Windows` で動作するように改善されました](https://github.com/Squirrel/Squirrel.Windows)。 つまり、Electron なら OS X と Windows の両方で簡単に自動更新できるアプリを公開できます。 ドキュメントに [Windows での自動更新のアプリ設定](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) に関する読み物があります。

関連するプルリクエストは [electron/electron#1984](https://github.com/electron/electron/pull/1984) です。

