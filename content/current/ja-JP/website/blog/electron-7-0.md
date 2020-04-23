---
title: Electron 7.0.0
author:
  - sofianguy
  - ckerr
date: '2019-10-22'
---

Electron 7.0.0 がリリースされました! これには Chromium 78、V8 7.8、Node.js 12.8.1 へのアップグレードが入っています。Arm 64 版 Windows リリース、より高速な IPC メソッド、新しい `nativeTheme` API などを追加しました。

---

Electron チームは、Electron 7.0.0 のリリース発表にワクワクしています! `npm install electron@latest` から npm でインストールするか、[リリースウェブサイト](https://electronjs.org/releases/stable) からダウンロードできます。 このリリースには、アップグレード、修正、新機能が入っています。 新機能たちと共に何を作るのか、楽しみにしています! このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

## 変更の目玉
 * 累積的更新:

   | 累積       | Electron 6 でのバージョン | Electron 7 でのバージョン | 新機能                                                                                                                                                                                                                                                                       |
   |:-------- |:------------------ |:------------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Chromium | 76.0.3809.146      | **78.0.3905.1**    | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8       | 7.6                | **7.8**            | [7.7](https://v8.dev/blog/v8-release-77), [7.8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js  | 12.4.0             | **12.8.1**         | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * Arm (64 bit) 版 Windows リリースを追加しました。 [#18591](https://github.com/electron/electron/pull/18591)、[#20112](https://github.com/electron/electron/pull/20112)
 * リクエスト/レスポンス式の非同期 IPC 向けに `ipcRenderer.invoke()` と `ipcMain.handle()` を追加しました。 これらは `remote` モジュールよりも強く推奨されます。 詳細はこちらの "[Electron の 'remote' モジュールは有害と考えられる](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)" ブログ記事を参照してください。 [#18449](https://github.com/electron/electron/pull/18449)
 * OS のテーマや配色の変更を読み取って対応する `nativeTheme` API を追加しました。 [#19758](https://github.com/electron/electron/pull/19758)、[#20486](https://github.com/electron/electron/pull/20486)
 * 新しい TypeScript 定義ファイル [ジェネレータ](https://github.com/electron/docs-parser) に移行ました。 出力結果の定義ファイルがより正確になりました。TypeScript でのビルドに失敗するようになった場合は、これが原因である可能性が高いです。 [#18103](https://github.com/electron/electron/pull/18103)

変更の完全なリストは、[7.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v7.0.0) を参照してください。

## 破壊的変更

これらの変更と将来の変更の詳細については、[予定されている破壊的変更](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md) のページを参照してください。

 * 非推奨だった API の削除:
     * Promise を使用するようになった関数のコールバックベース版。 [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS)。 [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu()`、
     * `app.setApplicationMenu()`、
     * `powerMonitor.querySystemIdleState()`、
     * `powerMonitor.querySystemIdleTime()`、
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`、
     * `webFrame.setIsolatedWorldHumanReadableName()`、
     * `webFrame.setIsolatedWorldSecurityOrigin()` [#18159](https://github.com/electron/electron/pull/18159)
 * `Session.clearAuthCache()` はクリアしたキャッシュエントリをフィルタリングできなくなりました。 [#17970](https://github.com/electron/electron/pull/17970)
 * macOS のネイティブインターフェース (メニュー、ダイアログなど) が、ユーザーのマシンのダークモード設定に自動で合わせるようになりました。 [#19226](https://github.com/electron/electron/pull/19226)
 * `electron` モジュールが `@electron/get` を使用するように更新しました。  Node の最小対応バージョンが Node 8 になりました。 [#18413](https://github.com/electron/electron/pull/18413)
 * ファイル `electron.asar` は無くなりました。 このファイルが存在することに依存しているすべてのパッケージスクリプトは更新する必要があります。 [#18577](https://github.com/electron/electron/pull/18577)

## 4.x.y サポートの終了

Electron 4.x.y はプロジェクトの [サポートポリシー](https://electronjs.org/docs/tutorial/support#supported-versions) に則りサポート終了となりました。 開発者はアプリケーションを新しいバージョンの Electron にアップグレードすることを推奨します。

## App のフィードバックプログラム

テストには引き続き [アプリフィードバックプログラム](https://electronjs.org/blog/app-feedback-program) を使用します。 このプログラムに参加するプロジェクトは、そのアプリで Electron ベータ版をテストします。見返りとして、発見した新しいバグは安定版リリースのために優先します。 参加や詳細については、[プログラムに関するブログ記事を確認してください](https://electronjs.org/blog/app-feedback-program)。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。 [仮 8.0.0 スケジュール](https://electronjs.org/docs/tutorial/electron-timelines) では、Electron 8 開発ライフサイクルの主要な日付を示してあります。 また、Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照](https://electronjs.org/docs/tutorial/electron-versioning) してください。

今後のバージョンの Electron で予定されている破壊的変更の詳細は、[予定されている破壊的変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md)。
