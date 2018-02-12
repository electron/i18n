使用している Electron のバージョンに応じたドキュメントを参照するように確認してください。 ドキュメントのバージョン番号はページの URL の一部となっています。 バージョン番号が URL にない場合は、おそらくご使用の Electron のバージョンと互換性のない API 変更を含んだ development ブランチのドキュメントを参照しているものと思われます。 古いバージョンのドキュメントを読むには、GitHub上で[タグを見て](https://github.com/electron/electron/tree/v1.4.0)みてください。"Switch branches/tags" のドロップダウンメニューを開いて、あなたが使っているバージョンと同じタグを選んでください。

## FAQ

よくある質問（FAQ）のページがありますので、issueを作成する前にこれをチェックしてください。

* [Electron FAQ](faq.md)

## ガイド

* [用語集](glossary.md)
* [サポートされているプラットフォーム](tutorial/supported-platforms.md)
* [セキュリティ](tutorial/security.md)
* [バージョン管理](tutorial/electron-versioning.md)
* [アプリケーションの配布](tutorial/application-distribution.md)
* [Mac App Storeへの公開ガイド](tutorial/mac-app-store-submission-guide.md)
* [Windowsストア ガイド](tutorial/windows-store-guide.md)
* [Snapcraft Guide](tutorial/snapcraft-guide.md)
* [アプリケーションのパッケージ化](tutorial/application-packaging.md)
* [ネイティブのNodeモジュールを使用する](tutorial/using-native-node-modules.md)
* [メインプロセスのデバッグ](tutorial/debugging-main-process.md)
* [SeleniumとWebDriverを使用する](tutorial/using-selenium-and-webdriver.md)
* [DevTools エクステンション](tutorial/devtools-extension.md)
* [Pepper Flash プラグインを使用する](tutorial/using-pepper-flash-plugin.md)
* [Widevine CDMプラグインを使用する](tutorial/using-widevine-cdm-plugin.md)
* [ヘッドレスCIシステムでのテスト (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [オフスクリーンレンダリング](tutorial/offscreen-rendering.md)
* [キーボード ショート カット](tutorial/keyboard-shortcuts.md)
* [アプリケーションを更新する](tutorial/updates.md)

## チュートリアル

* [クイック スタート](tutorial/quick-start.md)
* [デスクトップ環境の統合](tutorial/desktop-environment-integration.md)
* [オンライン/オフライン イベントの検出](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [ネイティブの通知](tutorial/notifications.md)

## API リファレンス

* [概要](api/synopsis.md)
* [プロセスオブジェクト](api/process.md)
* [サポートしているChromeコマンドラインスイッチ](api/chrome-command-line-switches.md)
* [環境変数](api/environment-variables.md)

### カスタム DOM 要素

* [`File`オブジェクト](api/file-object.md)
* [`<webview>`タグ](api/webview-tag.md)
* [`window.open`関数](api/window-open.md)

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
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
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
* [screen](api/screen.md)
* [shell](api/shell.md)

## 開発

* [コーディング スタイル](development/coding-style.md)
* [C++のコードにclang-formatを使用する](development/clang-format.md)
* [テスト](development/testing.md)
* [ソースコードのディレクトリ構造](development/source-code-directory-structure.md)
* [NW.js(node-webkit) との技術的違い](development/atom-shell-vs-node-webkit.md)
* [ビルドシステムの概要](development/build-system-overview.md)
* [ビルド手順 (macOS)](development/build-instructions-osx.md)
* [ビルド手順 (Windows)](development/build-instructions-windows.md)
* [ビルド手順 (Linux)](development/build-instructions-linux.md)
* [デバッグ手順 (macOS)](development/debugging-instructions-macos.md)
* [デバッグ手順 (Windows)](development/debug-instructions-windows.md)
* [デバッガーでシンボルサーバーを設定](development/setting-up-symbol-server.md)
* [ドキュメントガイド](styleguide.md)
* [Contributing to Electron](../CONTRIBUTING.md)
* [Issues](development/issues.md)
* [Pull Requests](development/pull-requests.md)
* [Chromiumをアップグレードする](development/upgrading-chromium.md)
* [Chromium開発](development/chromium-development.md)
* [V8 開発](development/v8-development.md)