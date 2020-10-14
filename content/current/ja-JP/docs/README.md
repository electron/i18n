# 公式ガイド

使用している Electron のバージョンに応じたドキュメントを参照するように確認してください。 ドキュメントのバージョン番号はページの URL の一部となっています。 バージョン番号が URL にない場合は、おそらくご使用の Electron のバージョンと互換性のない API 変更を含んだ development ブランチのドキュメントを参照しているものと思われます。 古いバージョンのドキュメントを読むには、GitHub上で[タグを見て](https://github.com/electron/electron/tree/v1.4.0)みてください。"Switch branches/tags" のドロップダウンメニューを開いて、あなたが使っているバージョンと同じタグを選んでください。

## FAQ

ここにはよく聞かれる質問が載っています。 Issue を作成する前に、こちらを確認してください。

* [Electron FAQ](faq.md)

## ガイドとチュートリアル

* [開発環境のセットアップ](tutorial/development-environment.md)
  * [macOS をセット アップ](tutorial/development-environment.md#setting-up-macos)
  * [Windows をセットアップ](tutorial/development-environment.md#setting-up-windows)
  * [Linux をセットアップ](tutorial/development-environment.md#setting-up-linux)
  * [エディタの選択](tutorial/development-environment.md#a-good-editor)
* [初めてのアプリ制作](tutorial/quick-start.md)
  * [必要な環境](tutorial/quick-start.md#prerequisites)
  * [Create a basic application](tutorial/quick-start.md#create-a-basic-application)
  * [Package and distribute the application](tutorial/quick-start.md#package-and-distribute-the-application)
* [ボイラープレートとCLI](tutorial/boilerplates-and-clis.md)
  * [ボイラープレート vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [その他のツール、ボイラープレート](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [アプリケーションアーキテクチャ](tutorial/quick-start.md#application-architecture)
  * [メインプロセスとレンダラープロセス](tutorial/quick-start.md#main-and-renderer-processes)
  * [Electron API](tutorial/quick-start.md#electron-api)
  * [Node.js API](tutorial/quick-start.md#nodejs-api)
  * [ネイティブ Node.js モジュールを使用する](tutorial/using-native-node-modules.md)
  * [パフォーマンス戦略](tutorial/performance.md)
* アプリに機能を追加する
  * [通知](tutorial/notifications.md)
  * [最近使用したドキュメント](tutorial/recent-documents.md)
  * [アプリケーションの進行状況](tutorial/progress-bar.md)
  * [カスタム Dock メニュー](tutorial/macos-dock.md)
  * [カスタム Windows タスクバー](tutorial/windows-taskbar.md)
  * [カスタム Linux デスクトップアクション](tutorial/linux-desktop-actions.md)
  * [キーボード ショートカット](tutorial/keyboard-shortcuts.md)
  * [オフライン/オンライン検出](tutorial/online-offline-events.md)
  * [macOS の BrowserWindow の Represented File](tutorial/represented-file.md)
  * [ネイティブなファイルのドラッグ&ドロップ](tutorial/native-file-drag-drop.md)
  * [オフスクリーンレンダリング](tutorial/offscreen-rendering.md)
  * [macOS のダークモードのサポート](tutorial/mojave-dark-mode-guide.md)
  * [Electron でのウェブ埋め込み](tutorial/web-embeds.md)
* [アクセシビリティ](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Manually Enabling Accessibility Features](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [テストとデバッグ](tutorial/application-debugging.md)
  * [メインプロセスのデバッグ](tutorial/debugging-main-process.md)
  * [VS Code におけるメインプロセスのデバッグ](tutorial/debugging-main-process-vscode.md)
  * [SeleniumとWebDriverを使用する](tutorial/using-selenium-and-webdriver.md)
  * [ヘッドレスCIシステムでのテスト (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools エクステンション](tutorial/devtools-extension.md)
  * [カスタムドライバを使った自動テスト](tutorial/automated-testing-with-a-custom-driver.md)
* [配布方法](tutorial/application-distribution.md)
  * [サポートされているプラットフォーム](tutorial/support.md#supported-platforms)
  * [コード署名](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [セキュリティ](tutorial/security.md)
  * [セキュリティ問題の報告](tutorial/security.md#reporting-security-issues)
  * [Chromium のセキュリティ問題とアップグレード](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron のセキュリティ警告](tutorial/security.md#electron-security-warnings)
  * [セキュリティのチェックリスト](tutorial/security.md#checklist-security-recommendations)
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
* [asar でアプリソースコードのパッケージ](tutorial/application-packaging.md)
  * [asar アーカイブの生成](tutorial/application-packaging.md#generating-asar-archives)
  * [asar アーカイブを使用する](tutorial/application-packaging.md#using-asar-archives)
  * [制限事項](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [asar アーカイブへパックされていないファイルを追加](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Widevine CDM のテスト](tutorial/testing-widevine-cdm.md)
* [Pepper Flash プラグインを使用する](tutorial/using-pepper-flash-plugin.md)

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
* [net](api/net.md)
* [netLog](api/net-log.md)
* [通知](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### レンダラープロセス (Webページ) のモジュール

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### メインプロセス・レンダラープロセスのモジュール

* [clipboard ](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## 開発

[development/README.md](development/README.md) を参照してください
