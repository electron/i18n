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
 * macOS フルスクリーン切り替えのメニューアイテムのラベルを修正しました。 [#11633](https://github.com/electron/electron/pull/11633)
 * ウィンドウが無効のときにツールチップが隠れる問題を改善しました。 [#11644](https://github.com/electron/electron/pull/11644)
 * 非推奨だった web-view のメソッドを移行しました。 [#11798](https://github.com/electron/electron/pull/11798)
 * BrowserView から開いたウインドウを閉じるときの問題を修正しました。 [#11799](https://github.com/electron/electron/pull/11799)
 * Bluetooth チューナーのバグを修正しました。 [#11492](https://github.com/electron/electron/pull/11492)
 * app.getFileIcon API でタスクスケジューラを使用するように更新しました。 [#11595](https://github.com/electron/electron/pull/11595)
 * オフスクリーンレンダリング時にも `console-message` イベントが発生するようにしました。 [#11921](https://github.com/electron/electron/pull/11921)
 * `WebContents.downloadURL` でのカスタムプロトコルからのダウンロードを修正しました。 [#11804](https://github.com/electron/electron/pull/11804)
 * デベロッパー ツールがデタッチされたときに透過ウィンドウが透明でなくなる問題を修正しました。 [#11956](https://github.com/electron/electron/pull/11956)
 * Electron アプリが再起動やシャットダウンを中止する問題を修正しました。 [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * タッチバーアイテムを再利用した時のイベントリークを修正しました。 [#12624](https://github.com/electron/electron/pull/12624)
 * ダークモードでの tray のハイライトを修正しました。 [#12398](https://github.com/electron/electron/pull/12398)
 * 非同期の dialog がメインプロセスをブロックする問題を修正しました。 [#12407](https://github.com/electron/electron/pull/12407)
 * `setTitle` したときの tray のクラッシュを修正しました。 [#12356](https://github.com/electron/electron/pull/12356)
 * Dock メニュー設定時のクラッシュを修正しました。 [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * Linux のデスクトップ通知を改善しました。 [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * menu の GTK+ テーマサポートを改善しました。 [#12331](https://github.com/electron/electron/pull/12331)
 * Linux 上できれいに終了するようにしました。 [#12139](https://github.com/electron/electron/pull/12139)
 * tray アイコンのデフォルトツールチップにアプリ名を使うようにしました。 [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * Visual Studio 2017 サポートを追加しました。 [#11656](https://github.com/electron/electron/pull/11656)
 * システムクラッシュハンドラへの例外渡しを修正しました。 [#12259](https://github.com/electron/electron/pull/12259)
 * 最小化したウィンドウでツールチップが非表示になる問題を修正しました。 [#11644](https://github.com/electron/electron/pull/11644)
 * `desktopCapturer` が正しい screen をキャプチャするように修正しました。 [#11664](https://github.com/electron/electron/pull/11664)
 * 透過状態における `disableHardwareAcceleration` を修正しました。 [#11704](https://github.com/electron/electron/pull/11704)

# 次回予告

Electron チームは、Chromium、Node、v8 の新バージョンのサポートに対して懸命に取り組んでいます。 3.0.0-beta.1 に乞うご期待!
