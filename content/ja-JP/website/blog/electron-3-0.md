---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

Electron チームは [electronjs.org](https://electronjs.org/) 及び `npm install electron@latest` から初の Electron 3 安定版が利用できるという発表でワクワクしています! アップグレード、修正、新機能が盛り沢山で、皆さんが何を作るのか待ち遠しいです。 以下に本リリースの詳細をご紹介します。使用したご意見ご感想をお待ちしております。

---

## リリースプロセス

私たちは、`v3.0.0` の開発を進めていく中で、プログレッシブベータリリースのフィードバック進捗を定式化することで、安定版リリースの基準をより経験的に定義しようとしました。 `v3.0.0` は、[アプリフィードバックプログラム](https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md) に参加してくださった皆様からの、ベータサイクルの初期テストとフィードバックが無ければ不可能だったでしょう。 Atlassian、Atom、Microsoft Teams、Oculus、OpenFin、Slack、Symphony、VS Code、その他のプログラムメンバーに感謝します。 今後のベータへの参加をご希望の方は、[info@electronjs.org](mailto:info@electronjs.org) までご連絡ください。

## 変更 / 新機能

Chrome `v66.0.3359.181`、Node `v10.2.0`、V8 `v6.6.6.346.23` など、Electron の重要なツールチェーン部品のいくつかに大きなバージョン上げがありました。

* [[#12656](https://github.com/electron/electron/pull/12656)] 新機能: `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)] 新機能: `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)] 新機能: `process.getHeapStatistics()`
* [[#12485](https://github.com/electron/electron/pull/12485)] 新機能: `win.moveTop()` でウインドウの Z オーダーを一番上に
* [[#13110](https://github.com/electron/electron/pull/13110)] 新機能: TextField と Button の API
* [[#13068](https://github.com/electron/electron/pull/13068)] 新機能: netLog API で動的ログ制御
* [[#13539](https://github.com/electron/electron/pull/13539)] 新機能: サンドボックスレンダラー内で `webview` が有効に
* [[#14118](https://github.com/electron/electron/pull/14118)] 新機能: `fs.readSync` が大きいファイルでも動作するように
* [[#14031](https://github.com/electron/electron/pull/14031)] 新機能: node の `fs` のラッパーで `fs.realpathSync.native` と `fs.realpath.native` が利用できるように

## API の破壊的変更

* [[#12362](https://github.com/electron/electron/pull/12362)] 新機能: メニューアイテムの順番を制御できるように更新
* [[#13050](https://github.com/electron/electron/pull/13050)] リファクタ: 非推奨 API のドキュメントを削除
  * 詳細は [ドキュメント](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30) を参照してください
* [[#12477](https://github.com/electron/electron/pull/12477)] リファクタ: `did-get-response-details` と `did-get-redirect-request` のイベントを削除
* [[#12655](https://github.com/electron/electron/pull/12655)] 新機能: ドラッグ/ドロップ時のナビゲーションをデフォルトで無効に
* [[#12993](https://github.com/electron/electron/pull/12993)] 新機能: Node `v4.x` 以上を `electron` npm モジュールが要求するように
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)] リファクタ: `NativeWindow`
* [[#11968](https://github.com/electron/electron/pull/11968)] リファクタ: `menu.popup()`
* [[#8953](https://github.com/electron/electron/pull/8953)] 新機能: `ipcRenderer.sendSync` の結果送信に JSON を使用しないように
* [[#13039](https://github.com/electron/electron/pull/13039)] 新機能: デフォルトで URL に後続するコマンドライン引数を無視するように
* [[#12004](https://github.com/electron/electron/pull/12004)] リファクタ: `api::Window` を `api::BrowserWindow` に名称変更
* [[#12679](https://github.com/electron/electron/pull/12679)] 新機能: 見た目のズームをデフォルトで無効に
* [[#12408](https://github.com/electron/electron/pull/12408)] リファクタ: アプリコマンドの `media-play_pause` を `media-play-pause` に名称変更

### macOS

* [[#12093](https://github.com/electron/electron/pull/12093)] 新機能: ワークスペース通知をサポート
* [[#12496](https://github.com/electron/electron/pull/12496)] 新機能: `tray.setIgnoreDoubleClickEvents(ignore)` で tray のダブルクリックイベントを無視できるように
* [[#12281](https://github.com/electron/electron/pull/12281)] 新機能: macOS でマウス転送機能
* [[#12714](https://github.com/electron/electron/pull/12714)] 新機能: 画面をロック/ロック解除のイベント

### Windows

* [[#12879](https://github.com/electron/electron/pull/12879)] 新機能: screen と screen との座標変換に DIP を追加

**注意:** このバージョンを動かした後に古いバージョンの Electronに切り替える場合、古いバージョンでのクラッシュを避けるためにユーザーデータのディレクトリを消去する必要があります。 `console.log(app.getPath("userData"))` を実行してユーザデータのディレクトリを確認するか、[ドキュメント](https://electronjs.org/docs/api/app#appgetpathname) を参照して詳細を確認してください。

## バグ修正

* [[#13397](https://github.com/electron/electron/pull/13397)] 修正: `fs.statSyncNoException` が例外を送出する問題
* [[#13476](https://github.com/electron/electron/pull/13476), [#13452](https://github.com/electron/electron/pull/13452)] 修正: jquery でサイト読み込みをする際のクラッシュ
* [[#14092](https://github.com/electron/electron/pull/14092)] 修正: `net::ClientSocketHandle` デストラクタ内でのクラッシュ
* [[#14453](https://github.com/electron/electron/pull/14453)] 修正: フォーカス変更を、次のティックではなくすぐに通知するように

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] 修正: `<input file="type">` のファイルを開くダイアログでバンドルを選択してしまう問題
* [[#12404](https://github.com/electron/electron/pull/12404)] 修正: 非同期ダイアログ使用時にメインプロセスをブロックする問題
* [[#12043](https://github.com/electron/electron/pull/12043)] 修正: 右クリックメニューのコールバック
* [[#12527](https://github.com/electron/electron/pull/12527)] 修正: タッチバーアイテムを再利用時のイベント漏れ
* [[#12352](https://github.com/electron/electron/pull/12352)] 修正: tray タイトルのクラッシュ
* [[#12327](https://github.com/electron/electron/pull/12327)] 修正: ドラッグ不可領域
* [[#12809](https://github.com/electron/electron/pull/12809)] 修正: 開いているメニューの更新を抑止
* [[#13162](https://github.com/electron/electron/pull/13162)] 修正: tray アイコンの大きさが負の値を受け付けないように
* [[#13085](https://github.com/electron/electron/pull/13085)] 修正: tray タイトルがハイライト時に反転しない
* [[#12196](https://github.com/electron/electron/pull/12196)] 修正: `enable_run_as_node==false` 時の Mac ビルド
* [[#12157](https://github.com/electron/electron/pull/12157)] 修正: 鮮明なフレームレスウインドウでの更なる問題
* [[#13326](https://github.com/electron/electron/pull/13326)] 修正: `app.removeAsDefaultProtocolClient` を呼び出した後に mac でのプロトコルを消すように
* [[#13530](https://github.com/electron/electron/pull/13530)] 修正: MAS ビルド内での非公開 API の誤用
* [[#13517](https://github.com/electron/electron/pull/13517)] 修正: `tray.setContextMenu` のクラッシュ
* [[#14205](https://github.com/electron/electron/pull/14205)] 修正: `defaultId` を設定している場合でもエスケープを押せばダイアログが閉じるように

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)] 修正: オフスクリーンウインドウでの `BrowserWindow.focus()`

## その他注意事項

* 現在 PDF ビューアは動作しませんが、作業中であり、すぐ動作するようになる予定です。
* `TextField` と `Button` API は実験的なものなので、デフォルトで無効化されています。
  * これらは `enable_view_api` ビルドフラグで有効化できます。

# 次回予告

Electron チームは、最終的に Chromium、Node、V8 の開発ケイデンスと同等で維持するため、より迅速でスムーズなアップグレードプロセスの策定作業を続けています。
