請確認說明文件的版本跟你用的 Electron 是一致的。 版號應該就出現在網頁 URL 中。 如果版本不對，可能代表你正在讀的是一個開發中的分支文件，當中可能有跟你 Electron 版本不相容的 API。 若要查看舊版本的文檔，你可以在 GitHub 網頁中，打開「Switch branches/tags」下拉清單，選擇與您的版本相合的Tag。

## 常見問題集

這裡列出最常被問到旳問題。請在發出議題前先檢查看看你的問題是否已經有人問過了。

* [Electron 常見問題集](faq.md)

## 導引

* [詞彙表](glossary.md)
* [支援平臺](tutorial/supported-platforms.md)
* [安全性](tutorial/security.md)
* [版號規則](tutorial/electron-versioning.md)
* [應用程式發佈](tutorial/application-distribution.md)
* [Mac App Store 上架導引](tutorial/mac-app-store-submission-guide.md)
* [Windows Store 上架導引](tutorial/windows-store-guide.md)
* [Snapcraft 導引](tutorial/snapcraft-guide.md)
* [應用程式打包](tutorial/application-packaging.md)
* [使用原生 Node 模組](tutorial/using-native-node-modules.md)
* [Debug 主處理序](tutorial/debugging-main-process.md)
* [使用 Selenium 及 WebDriver](tutorial/using-selenium-and-webdriver.md)
* [DevTools 擴充](tutorial/devtools-extension.md)
* [使用 Pepper Flash 外掛程式](tutorial/using-pepper-flash-plugin.md)
* [使用 Widevine CDM 外掛程式](tutorial/using-widevine-cdm-plugin.md)
* [在無周邊 CI 系統上測試 (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [螢幕外畫面轉譯](tutorial/offscreen-rendering.md)
* [鍵盤快速鍵](tutorial/keyboard-shortcuts.md)
* [更新應用程式](tutorial/updates.md)

## 教學

* [快速入門](tutorial/quick-start.md)
* [桌面環境整合](tutorial/desktop-environment-integration.md)
* [連線/離線事件偵測](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [系統原生通知](tutorial/notifications.md)

## API 參考

* [簡介](api/synopsis.md)
* [處理序物件](api/process.md)
* [支援的 Chrome 命令列參數](api/chrome-command-line-switches.md)
* [環境變數](api/environment-variables.md)

### 自訂 DOM 元素：

* [`File` 物件](api/file-object.md)
* [`<webview>` 標籤](api/webview-tag.md)
* [`window.open` 函式](api/window-open.md)

### 主處理序可用的模組：

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

### 畫面轉譯處理序 (網頁) 可用的模組:

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### 主處理序及畫面轉譯處理序均可使用的模組：

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## 開發

* [程式碼撰寫風格](development/coding-style.md)
* [在 C++ 程式碼中使用 Clang-Format](development/clang-format.md)
* [測試](development/testing.md)
* [原始碼目錄結構](development/source-code-directory-structure.md)
* [與 NW.js (原名 node-webkit) 的技術差異](development/atom-shell-vs-node-webkit.md)
* [建置系統概述](development/build-system-overview.md)
* [建置步驟 (macOS)](development/build-instructions-osx.md)
* [建置步驟 (Windows)](development/build-instructions-windows.md)
* [建置步驟 (Linux)](development/build-instructions-linux.md)
* [Debug 步驟 (macOS)](development/debugging-instructions-macos.md)
* [Debug 步驟 (Windows)](development/debug-instructions-windows.md)
* [在 Debugger 中設定符號伺服器](development/setting-up-symbol-server.md)
* [文件編寫風格](styleguide.md)
* [貢獻 Electron](../CONTRIBUTING.md)
* [議題管理](development/issues.md)
* [合併請求 (PR)](development/pull-requests.md)
* [Chromium 升版](development/upgrading-chromium.md)
* [Chromium 開發](development/chromium-development.md)
* [V8 開發](development/v8-development.md)