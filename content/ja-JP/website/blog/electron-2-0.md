---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

4 ヶ月以上の開発期間、8 回のベータリリース、数多くのアプリを段階的にロールアウトし、世界的なテストを経て、今日では [electronjs.org](https://electronjs.org/) にて Electron 2.0.0 のリリースが公開されます。

---

## リリースプロセス

2.0.0 以降、Electron のリリースは [セマンティックバージョニング](https://electronjs.org/blog/electron-2-semantic-boogaloo) に従います。 これによりメジャーバージョンが頻繁に上がるようになり、通常は Chromium に対応する形でメジャーアップデートとなります。 パッチリリースには優先度の高いバグ修正のみが含まれ、より安定したものになります。

Electron 2.0.0 は、メジャーリリース前の Electron での安定化方法の改善でもあります。 いくつかの大規模なElectronアプリでは、2.0.0 ベータ版が段階的にロールアウトされており、これまでのベータ版で最高のフィードバックループを提供しています。

## 変更 / 新機能

 * Chrome 61、Node 8.9.3、V8 6.1.534.41、Linux の GTK+ 3、スペルチェッカーの更新、Squirrel など、Electron のツールチェーンのいくつかの重要な部分に大きな変更が加えられました。
 * [アプリ内課金](https://electronjs.org/blog/in-app-purchases) が MacOS に対応しました。 [#11292](https://github.com/electron/electron/pull/11292)
 * ファイル読み込み API が新しくなりました。 [#11565](https://github.com/electron/electron/pull/11565)
 * ウインドウの有効化/無効化 API が新しくなりました。 [#11832](https://github.com/electron/electron/pull/11832)
 * API app.setLocale() が新規作成されました。 [#11469](https://github.com/electron/electron/pull/11469)
 * IPC メッセージのロギングサポートが新しくなりました。 [#11880](https://github.com/electron/electron/pull/11880)
 * メニューイベントが新規追加されました。 [#11754](https://github.com/electron/electron/pull/11754)
 * powerMonitor に `shutdown` イベントを追加しました。 [#11417](https://github.com/electron/electron/pull/11417)
 * 複数の BrowserWindow を一つのプロセスにまとめる `affinity` オプションを追加しました。 [#11501](https://github.com/electron/electron/pull/11501)
 * saveDialog に利用可能な拡張子を表示する機能を追加しました。 [#11873](https://github.com/electron/electron/pull/11873)
 * 追加の通知アクションのサポートです [#11647](https://github.com/electron/electron/pull/11647)
 * macOS で通知を閉じるボタンのタイトルの設定機能。 [#11654](https://github.com/electron/electron/pull/11654)
 * menu.popup(window, callback) に条件を追加しました
 * タッチバーアイテムのメモリの改善。 [#12527](https://github.com/electron/electron/pull/12527)
 * セキュリティ推奨チェックリストを改善しました。
 * App-Scoped Security のスコープ有りブックマークを追加しました。 [#11711](https://github.com/electron/electron/pull/11711)
 * レンダラープロセスに任意の引数を設定する機能を追加しました。 [#11850](https://github.com/electron/electron/pull/11850)
 * フォーマットピッカー用アクセサリビューを追加しました。 [#11873](https://github.com/electron/electron/pull/11873)
 * ネットワークデリゲートの競合条件を修正しました。 [#12053](https://github.com/electron/electron/pull/12053)
 * Linux の `mips64el` アーキテクチャのサポートを削除しました。 Electron は C++14 のツールチェーンに依存しているのですが、リリース時にそのアーキテクチャでそのツールチェーンが利用できませんでした。 今後再サポートしたいと思っています。

## API の破壊的変更

 * 以下の [非推奨 API](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md) を削除しました。
   * `menu.popup` シグネチャを変更しました。 [#11968](https://github.com/electron/electron/pull/11968)
   * 非推奨だった `crashReporter.setExtraParameter` を削除しました [#11972](https://github.com/electron/electron/pull/11972)
   * 非推奨だった `webContents.setZoomLevelLimits` と `webFrame.setZoomLevelLimits` を削除しました。 [#11974](https://github.com/electron/electron/pull/11974)
   * 非推奨だった `clipboard` メソッドを削除しました。 [#11973](https://github.com/electron/electron/pull/11973)
   * `tray.setHighlightMode` の真偽値引数のサポートを削除しました。 [#11981](https://github.com/electron/electron/pull/11981)

## バグ修正

 * `webContents.isOffscreen()` が常に利用できるように変更しました。 [#12531](https://github.com/electron/electron/pull/12531)
 * デベロッパー ツールをドックしていない及びフォーカスしていない時の `BrowserWindow.getFocusedWindow()` を修正しました。 [#12554](https://github.com/electron/electron/pull/12554)
 * プリロードのパスに特殊文字が含まれている場合に、サンドボックス描画でプリロードがロードされない問題を修正しました。 [#12643](https://github.com/electron/electron/pull/12643)
 * ドキュメントの通りに allowRunningInsecureContent の既定値を訂正しました。 [#12629](https://github.com/electron/electron/pull/12629)
 * nativeImage の透明度を修正しました。 [#12683](https://github.com/electron/electron/pull/12683)
 * `Menu.buildFromTemplate` の問題を修正しました。 [#12703](https://github.com/electron/electron/pull/12703)
 * menu.popup の引数がオブジェクトか確認するようになりました。 [#12330](https://github.com/electron/electron/pull/12330)
 * 新規プロセス作成とコンテキスト解放との間の競合状態を取り除きました。 [#12361](https://github.com/electron/electron/pull/12361)
 * BrowserView 変更時にドラッグ可能領域を更新するようにしました。 [#12370](https://github.com/electron/electron/pull/12370)
 * フォーカス中にメニューバー切り替えの alt キーを検出するようにしました。 [#12235](https://github.com/electron/electron/pull/12235)
 * webview 内での誤警告を修正しました。 [#12236](https://github.com/electron/electron/pull/12236)
 * 親ウィンドウの 'show' オプションをそのまま引き継いでいたので修正しました。 [#122444](https://github.com/electron/electron/pull/122444)
 * `getLastCrashReport()` で本当に最後のクラッシュレポートかどうか確認するようにしました。 [#12255](https://github.com/electron/electron/pull/12255)
 * ネットワーク共有パスへの require を修正しました。 [#12287](https://github.com/electron/electron/pull/12287)
 * 右クリックメニューのクリックのコールバックを修正しました。 [#12170](https://github.com/electron/electron/pull/12170)
 * ポップアップメニュー位置を修正しました。 [#12181](https://github.com/electron/electron/pull/12181)
 * libuv ループのクリーンアップを改善しました。 [#11465](https://github.com/electron/electron/pull/11465)
 * 透過色おける `hexColorDWORDToRGBA` を修正しました。 [#11557](https://github.com/electron/electron/pull/11557)
 * getWebPreferences API でのヌルポインタ参照外しを修正しました。 [#12245](https://github.com/electron/electron/pull/12245)
 * メニューデリゲート内の循環参照を修正しました。 [#11967](https://github.com/electron/electron/pull/11967)
 * net.request のプロトコルフィルタリングを修正しました。 [#11657](https://github.com/electron/electron/pull/11657)
 * WebFrame.setVisualZoomLevelLimits はユーザーエージェントのスケール制約を設定するようになりました。[#12510](https://github.com/electron/electron/pull/12510)
 * webview のオプションの既定値を適切にしました。 [#12292](https://github.com/electron/electron/pull/12292)
 * 振動サポートを改善しました。 [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * シングルトンフィクスチャのタイミングの問題を修正しました。
 * NotifierSupportsActions() の破損したプロダクションキャッシュを修正しました
 * MenuItem の role を camelCase 互換にしました。 [#11532](https://github.com/electron/electron/pull/11532)
 * タッチバーの状態更新を改善しました。 [#11812](https://github.com/electron/electron/pull/11812)、[#11761](https://github.com/electron/electron/pull/11761)。
 * 不要なメニューのセパレータを削除しました。 [#11827](https://github.com/electron/electron/pull/11827)
 * Bluetooth チューナーのバグを修正しました。 [#11399](https://github.com/electron/electron/pull/11399) でクローズしています。
 * Fixed macos Full Screen Toggle menu item label. [#11633](https://github.com/electron/electron/pull/11633)
 * Improved tooltip hiding when a window is deactivated. [#11644](https://github.com/electron/electron/pull/11644)
 * Migrated deprecated web-view method. [#11798](https://github.com/electron/electron/pull/11798)
 * Fixed closing a window opened from a browserview. [#11799](https://github.com/electron/electron/pull/11799)
 * Bluetooth チューナーのバグを修正しました。 [#11492](https://github.com/electron/electron/pull/11492)
 * Updated to use task scheduler for app.getFileIcon API. [#11595](https://github.com/electron/electron/pull/11595)
 * Changed to fire `console-message` event even when rendering offscreen. [#11921](https://github.com/electron/electron/pull/11921)
 * Fixed downloading from custom protocols using `WebContents.downloadURL`. [#11804](https://github.com/electron/electron/pull/11804)
 * Fixed transparent windows losing transparency when devtools detaches. [#11956](https://github.com/electron/electron/pull/11956)
 * Fixed Electron apps canceling restart or shutdown. [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * Fixed event leak on reuse of touchbar item. [#12624](https://github.com/electron/electron/pull/12624)
 * Fixed tray highlight in darkmode. [#12398](https://github.com/electron/electron/pull/12398)
 * Fixed blocking main process for async dialog. [#12407](https://github.com/electron/electron/pull/12407)
 * Fixed `setTitle` tray crash. [#12356](https://github.com/electron/electron/pull/12356)
 * Fixed crash when setting dock menu. [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * Better Linux desktop notifications. [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * Better GTK+ theme support for menus. [#12331](https://github.com/electron/electron/pull/12331)
 * Exit gracefully on linux. [#12139](https://github.com/electron/electron/pull/12139)
 * Use the app’s name as the tray icon's default tooltip. [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * Added Visual Studio 2017 support. [#11656](https://github.com/electron/electron/pull/11656)
 * Fixed passing of exception to the system crash handler. [#12259](https://github.com/electron/electron/pull/12259)
 * Fixed hiding tooltip from minimized window. [#11644](https://github.com/electron/electron/pull/11644)
 * Fixed `desktopCapturer` to capture the correct screen. [#11664](https://github.com/electron/electron/pull/11664)
 * Fixed `disableHardwareAcceleration` with transparency. [#11704](https://github.com/electron/electron/pull/11704)

# 次回予告

The Electron team is hard at work to support newer versions of Chromium, Node, and v8. Expect 3.0.0-beta.1 soon!
