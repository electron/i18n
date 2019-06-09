# 公式ガイド

使用している Electron のバージョンに応じたドキュメントを参照するように確認してください。 ドキュメントのバージョン番号はページの URL の一部となっています。 バージョン番号が URL にない場合は、おそらくご使用の Electron のバージョンと互換性のない API 変更を含んだ development ブランチのドキュメントを参照しているものと思われます。 古いバージョンのドキュメントを読むには、GitHub上で[タグを見て](https://github.com/electron/electron/tree/v1.4.0)みてください。"Switch branches/tags" のドロップダウンメニューを開いて、あなたが使っているバージョンと同じタグを選んでください。

## FAQ

よくある質問（FAQ）のページがありますので、issueを作成する前にこれをチェックしてください。

* [Electron FAQ](faq.md)

## ガイドとチュートリアル

* [Electron について](tutorial/about.md)
* [開発環境のセットアップ](tutorial/development-environment.md) 
  * [macOS をセット アップ](tutorial/development-environment.md#setting-up-macos)
  * [Windows のセットアップ](tutorial/development-environment.md#setting-up-windows)
  * [Linux のセットアップ](tutorial/development-environment.md#setting-up-linux)
  * [エディタの選択](tutorial/development-environment.md#a-good-editor)
* [初めてのアプリ制作](tutorial/first-app.md) 
  * [Electronのインストール](tutorial/first-app.md#installing-electron)
  * [3分でわかるElectronアプリ開発](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [アプリの実行](tutorial/first-app.md#running-your-app)
* [ボイラープレートとCLI](tutorial/boilerplates-and-clis.md) 
  * [ボイラープレート vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [その他のツール、ボイラープレート](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [アプリケーションアーキテクチャ](tutorial/application-architecture.md) 
  * [メインプロセスとレンダラープロセス](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Electron の API を使用する](tutorial/application-architecture.md#using-electron-apis)
  * [Node.js API を使用する](tutorial/application-architecture.md#using-nodejs-apis)
  * [ネイティブ Node.js モジュールを使用する](tutorial/using-native-node-modules.md)
* アプリに機能を追加する 
  * [通知](tutorial/notifications.md)
  * [最近使用したドキュメント](tutorial/recent-documents.md)
  * [アプリケーションの進行状況](tutorial/progress-bar.md)
  * [カスタム Dock メニュー](tutorial/macos-dock.md)
  * [カスタム Windows タスクバー](tutorial/windows-taskbar.md)
  * [カスタム Linux デスクトップアクション](tutorial/linux-desktop-actions.md)
  * [キーボード ショート カット](tutorial/keyboard-shortcuts.md)
  * [オフライン/オンライン検出](tutorial/online-offline-events.md)
  * [macOS の BrowserWindow が表すファイル](tutorial/represented-file.md)
  * [ネイティブなファイルのドラッグ&ドロップ](tutorial/native-file-drag-drop.md)
  * [オフスクリーンレンダリング](tutorial/offscreen-rendering.md)
  * [macOS のダークモードのサポート](tutorial/mojave-dark-mode-guide.md)
* [アクセシビリティ](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [アクセシビリティの有効化](tutorial/accessibility.md#enabling-accessibility)
* [テストとデバッグ](tutorial/application-debugging.md) 
  * [メインプロセスのデバッグ](tutorial/debugging-main-process.md)
  * [VS Code におけるメインプロセスのデバッグ](tutorial/debugging-main-process-vscode.md)
  * [SeleniumとWebDriverを使用する](tutorial/using-selenium-and-webdriver.md)
  * [ヘッドレスCIシステムでのテスト (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools エクステンション](tutorial/devtools-extension.md)
  * [カスタムドライバーを使った自動テスト](tutorial/automated-testing-with-a-custom-driver.md)
* パッケージ化 
  * [コード署名](tutorial/code-signing.md)
* [配布方法](tutorial/application-distribution.md) 
  * [サポート](tutorial/support.md)
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

* [Electronのインストール](tutorial/installation.md) 
  * [プロキシ環境下](tutorial/installation.md#proxies)
  * [ミラーとキャッシュのカスタマイズ](tutorial/installation.md#custom-mirrors-and-caches)
  * [トラブルシューティング](tutorial/installation.md#troubleshooting)
* Electron Releases & Developer Feedback 
  * [Versioning Policy](tutorial/electron-versioning.md)
  * [Release Timelines](tutorial/electron-timelines.md)
  * [App Feedback Program](tutorial/app-feedback-program.md)
* [Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [asar アーカイブの生成](tutorial/application-packaging.md#generating-asar-archives)
  * [asar アーカイブを使用する](tutorial/application-packaging.md#using-asar-archives)
  * [制限事項](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [asar アーカイブへパックされていないファイルを追加](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Widevine CDM のテスト](tutorial/testing-widevine-cdm.md)
* [Pepper Flash プラグインを使用する](tutorial/using-pepper-flash-plugin.md)

* * *

* [用語集](glossary.md)

## API リファレンス

* [概要](api/synopsis.md)
* [プロセスオブジェクト](api/process.md)
* [サポートしているChromeコマンドラインスイッチ](api/chrome-command-line-switches.md)
* [環境変数](api/environment-variables.md)
* [破壊的な API の変更](api/breaking-changes.md)

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
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

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

<development/README.md> を参照してください