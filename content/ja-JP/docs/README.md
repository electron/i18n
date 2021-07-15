# 公式ガイド

電子版に合致するドキュメントを使用していることを確認してください。 バージョン番号は、ページ URL の一部である必要があります。 そうでなければ、おそらく、お使 いの電子版と互換性のないAPI 変更を含む可能性のある開発ブランチのドキュメントを使用している可能性があります。 古いバージョンのドキュメントを読むには、GitHub上で[タグを見て](https://github.com/electron/electron/tree/v1.4.0)みてください。"Switch branches/tags" のドロップダウンメニューを開いて、あなたが使っているバージョンと同じタグを選んでください。

## FAQ

ここにはよく聞かれる質問が載っています。 Issue を作成する前に、こちらを確認してください。

* [Electron FAQ](faq.md)

## ガイドとチュートリアル

### はじめましょう

* [はじめに](tutorial/introduction.md)
* [クイック スタート](tutorial/quick-start.md)
* [プロセスモデル](tutorial/process-model.md)

### Learning the basics

* アプリに機能を追加する
  * [通知](tutorial/notifications.md)
  * [最近使用したドキュメント](tutorial/recent-documents.md)
  * [アプリケーションの進行状況](tutorial/progress-bar.md)
  * [カスタム Dock メニュー](tutorial/macos-dock.md)
  * [カスタム Windows タスクバー](tutorial/windows-taskbar.md)
  * [カスタム Linux デスクトップアクション](tutorial/linux-desktop-actions.md)
  * [キーボード ショート カット](tutorial/keyboard-shortcuts.md)
  * [オフライン/オンライン検出](tutorial/online-offline-events.md)
  * [macOS の BrowserWindow の Represented File](tutorial/represented-file.md)
  * [ネイティブなファイルのドラッグ&ドロップ](tutorial/native-file-drag-drop.md)
  * [オフスクリーンレンダリング](tutorial/offscreen-rendering.md)
  * [ダークモード](tutorial/dark-mode.md)
  * [Electron でのウェブ埋め込み](tutorial/web-embeds.md)
* [ボイラープレートとCLI](tutorial/boilerplates-and-clis.md)
  * [ボイラープレート vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [その他のツール、ボイラープレート](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)

### 高度なトピック

* アプリケーションアーキテクチャ
  * [ネイティブ Node.js モジュールを使用する](tutorial/using-native-node-modules.md)
  * [パフォーマンス戦略](tutorial/performance.md)
  * [セキュリティ戦略](tutorial/security.md)
  * [プロセスのサンドボックス化](tutorial/sandbox.md)
* [アクセシビリティ](tutorial/accessibility.md)
  * [アクセシビリティ機能を手動で有効にする](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [テストとデバッグ](tutorial/application-debugging.md)
  * [メインプロセスのデバッグ](tutorial/debugging-main-process.md)
  * [Visual Studio コードを使用したデバッグ](tutorial/debugging-vscode.md)
  * [SeleniumとWebDriverを使用する](tutorial/using-selenium-and-webdriver.md)
  * [ヘッドレスCIシステムでのテスト (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools エクステンション](tutorial/devtools-extension.md)
  * [カスタムドライバーを使った自動テスト](tutorial/automated-testing-with-a-custom-driver.md)
  * [REPL](tutorial/repl.md)
* [配布方法](tutorial/application-distribution.md)
  * [サポートされているプラットフォーム](tutorial/support.md#supported-platforms)
  * [コード署名](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [アップデート](tutorial/updates.md)
  * [アップロードサーバーを配備](tutorial/updates.md#deploying-an-update-server)
  * [アプリケーションでの更新の実装](tutorial/updates.md#implementing-updates-in-your-app)
  * [アップデートの適用](tutorial/updates.md#applying-updates)
* [サポートを受ける](tutorial/support.md)

## 詳細なチュートリアル

これらの個別のチュートリアルでは、上のガイドで説明したトピックを拡張しています。

* [Electron のインストール](tutorial/installation.md)
  * [プロキシ環境下](tutorial/installation.md#proxies)
  * [ミラーとキャッシュのカスタマイズ](tutorial/installation.md#custom-mirrors-and-caches)
  * [トラブルシューティング](tutorial/installation.md#troubleshooting)
* Electron のリリース & 開発者のフィードバック
  * [バージョンポリシー](tutorial/electron-versioning.md)
  * [リリースタイムライン](tutorial/electron-timelines.md)
* [Widevine CDM のテスト](tutorial/testing-widevine-cdm.md)

---

* [用語集](glossary.md)

## API リファレンス

* [概要](api/synopsis.md)
* [プロセスオブジェクト](api/process.md)
* [サポートしているコマンドラインスイッチ](api/command-line-switches.md)
* [環境変数](api/environment-variables.md)
* [Chrome 拡張機能サポート](api/extensions.md)
* [API の破壊的変更](breaking-changes.md)

### カスタム DOM 要素

* [`File`オブジェクト](api/file-object.md)
* [`<webview>`タグ](api/webview-tag.md)
* [`window.open`関数](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

### メインプロセスのモジュール

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [MessageChannelMain](api/message-channel-main.md)
* [MessagePortMain](api/message-port-main.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
* [nativeTheme](api/native-theme.md)
* [Notification](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [ShareMenu](api/share-menu.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### レンダラープロセス (Webページ) のモジュール

* [contextBridge](api/context-bridge.md)
* [ipcRenderer](api/ipc-renderer.md)
* [webFrame](api/web-frame.md)

### メインプロセス・レンダラープロセスのモジュール

* [clipboard ](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [desktopCapturer](api/desktop-capturer.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## 開発

[development/README.md](development/README.md) を参照してください
