# 公式ガイド

使用している Electron のバージョンに応じたドキュメントを参照するように確認してください。 ドキュメントのバージョン番号はページの URL の一部となっています。 バージョン番号が URL にない場合は、おそらくご使用の Electron のバージョンと互換性のない API 変更を含んだ development ブランチのドキュメントを参照しているものと思われます。 古いバージョンのドキュメントを読むには、GitHub上で[タグを見て](https://github.com/electron/electron/tree/v1.4.0)みてください。"Switch branches/tags" のドロップダウンメニューを開いて、あなたが使っているバージョンと同じタグを選んでください。

## FAQ

よくある質問（FAQ）のページがありますので、issueを作成する前にこれをチェックしてください。

* [Electron FAQ](faq.md)

## ガイドとチュートリアル

* [開発環境のセットアップ](tutorial/development-environment.md) 
  * [macOS のセットアップ](tutorial/development-environment.md#setting-up-macos)
  * [Windows のセットアップ](tutorial/development-environment.md#setting-up-windows)
  * [Linux のセットアップ](tutorial/development-environment.md#setting-up-linux)
  * [エディターの選択](tutorial/development-environment.md#a-good-editor)
* [初めてのアプリ制作](tutorial/first-app.md) 
  * [Electronのインストール](tutorial/first-app.md#installing-electron)
  * [3分くらいでわかるElectronアプリ開発](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [アプリの実行](tutorial/first-app.md#running-your-app)
* [Boilerplates and CLIs](tutorial/boilerplates-and-clis.md) 
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Other Tools and Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [アプリケーションアーキテクチャ](tutorial/application-architecture.md) 
  * [メインプロセスとレンダラープロセス](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Electron の API を使用する](tutorial/application-architecture.md#using-electron-apis)
  * [Node.js API を使用する](tutorial/application-architecture.md#using-node.js-apis)
  * [ネイティブ Node.js モジュールを使用する](tutorial/using-native-node-modules.md)
  * [プロセス間通信](tutorial/application-architecture.md#)
* アプリに機能を追加する 
  * [通知](tutorial/notifications.md)
  * [最近使用したドキュメント](tutorial/desktop-environment-integration.md#recent-documents-windows-mac-os)
  * [アプリケーションの進行状況](tutorial/progress-bar.md)
  * [カスタム Dock メニュー](tutorial/desktop-environment-integration.md#custom-dock-menu-mac-os)
  * [カスタム Windows タスクバー](tutorial/windows-taskbar.md)
  * [カスタム Linux デスクトップアクション](tutorial/linux-desktop-actions.md)
  * [キーボード ショート カット](tutorial/keyboard-shortcuts.md)
  * [オフライン/オンライン検出](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [ネイティブなファイルのドラッグ&ドロップ](tutorial/native-file-drag-drop.md)
* [アプリケーションのアクセシビリティ](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [アクセスビリティの有効化](tutorial/accessibility.md#enabling-accessibility)
* [アプリケーションのテストとデバッグ](tutorial/application-debugging.md) 
  * [メインプロセスのデバッグ](tutorial/debugging-main-process.md)
  * [SeleniumとWebDriverを使用する](tutorial/using-selenium-and-webdriver.md)
  * [ヘッドレスCIシステムでのテスト (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools エクステンション](tutorial/devtools-extension.md)
* [アプリケーションの配布](tutorial/application-distribution.md) 
  * [サポートされているプラットフォーム](tutorial/supported-platforms.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [アプリケーションのセキュリティ](tutorial/security.md) 
  * [セキュリティ問題の報告](tutorial/security.md#reporting-security-issues)
  * [Chromium のセキュリティ問題とアップグレード](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron のセキュリティ警告](tutorial/security.md#electron-security-warnings)
  * [セキュリティのチェックリスト](tutorial/security.md#checklist-security-recommendations)
* [アプリケーションの更新](tutorial/updates.md) 
  * [アップロードサーバーを配備](tutorial/updates.md#deploying-an-update-server)
  * [アプリケーションでの更新の実装](tutorial/updates.md#implementing-updates-in-your-app)
  * [アップデートの適用](tutorial/updates.md#applying-updates)

## Detailed Tutorials

These individual tutorials expand on topics discussed in the guide above.

* [In Detail: Installing Electron](tutorial/installation.md) 
  * [Global versus Local Installation](tutorial/installation.md#global-versus-local-installation)
  * [プロキシ環境下](tutorial/installation.md#proxies)
  * [ミラーとキャッシュのカスタマイズ](tutorial/installation.md#custom-mirrors-and-caches)
  * [トラブルシューティング](tutorial/installation.md#troubleshooting)
* [In Detail: Electron's Versioning Scheme](tutorial/electron-versioning.md) 
  * [semver（セマンティック バージョニング）](tutorial/electron-versioning.md#semver)
  * [安定ブランチ](tutorial/electron-versioning.md#stabilization-branches)
  * [Beta Releases and Bug Fixes](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [In Detail: Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [asar アーカイブを使用する](tutorial/application-packaging.md#using-asar-archives)
  * [制限事項](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [In Detail: Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [In Detail: Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [オフスクリーンレンダリング](tutorial/offscreen-rendering.md)

* * *

* [用語集](glossary.md)

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

<development/README.md> を参照してください