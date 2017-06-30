請確保您瀏覽與您的 Electron 版本相匹配的文檔， 版本編號應是文檔 URL 的一部分。 如果版本不合，你正在讀的有可能是一個開發中的分支文檔，當中可能包含跟您用的 Electron 版本不相容的 API。 若要查看舊版本的文檔，你可以在 GitHub 網頁中，打開「Switch branches/tags」下拉清單，選擇與您的版本相合的Tag。

## 常見問題

There are questions that are asked quite often. Check this out before creating an issue:

* [Electron 常見問題](faq.md)

## 導引

* [術語彙編](glossary.md)
* [支援平臺](tutorial/supported-platforms.md)
* [安全性](tutorial/security.md)
* [Electron 版本控制](tutorial/electron-versioning.md)
* [應用程式發布](tutorial/application-distribution.md)
* [Mac App Store 上架指引](tutorial/mac-app-store-submission-guide.md)
* [Windows Store 上架指引](tutorial/windows-store-guide.md)
* [應用程式打包](tutorial/application-packaging.md)
* [使用原生 Node 模組](tutorial/using-native-node-modules.md)
* [Debug 主行程](tutorial/debugging-main-process.md)
* [使用 Selenium 及 WebDriver](tutorial/using-selenium-and-webdriver.md)
* [DevTools 擴充](tutorial/devtools-extension.md)
* [使用 Pepper Flash 外掛程式](tutorial/using-pepper-flash-plugin.md)
* [使用 Widevine 外掛](tutorial/using-widevine-cdm-plugin.md)
* [Testing on Headless CI Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Offscreen Rendering](tutorial/offscreen-rendering.md)
* [鍵盤快速鍵](tutorial/keyboard-shortcuts.md)

## 教學

* [快速入門](tutorial/quick-start.md)
* [桌面環境整合](tutorial/desktop-environment-integration.md)
* [連線/離線事件檢測](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [系統原生通知](tutorial/notifications.md)

## API 参考

* [簡介](api/synopsis.md)
* [進程物件](api/process.md)
* [支援 Chrome 命令行開關](api/chrome-command-line-switches.md)
* [環境變數](api/environment-variables.md)

### 自訂 DOM 元素：

* [`File` 物件](api/file-object.md)
* [`<webview>`<webview></0> 標籤](api/webview-tag.md)
* [`window.open`函數](api/window-open.md)

### 主行程可用的模組：

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
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

### 渲染行程可用的模組 (網頁)：

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### 主行程及渲染行程均可用的模組：

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## 開發

* [編碼格式](development/coding-style.md)
* [Using clang-format on C++ Code](development/clang-format.md)
* [原碼目錄結構](development/source-code-directory-structure.md)
* [與NW.js (原名 webkit) 的技術差異](development/atom-shell-vs-node-webkit.md)
* [構建系統概述](development/build-system-overview.md)
* [構建步驟 (macOS)](development/build-instructions-osx.md)
* [構建步驟 (Windows)](development/build-instructions-windows.md)
* [構建步驟 (Linux)](development/build-instructions-linux.md)
* [Debug 步驟 (macOS)](development/debugging-instructions-macos.md)
* [Debug 步驟 (Windows)](development/debug-instructions-windows.md)
* [Setting Up Symbol Server in debugger](development/setting-up-symbol-server.md)
* [文檔風格](styleguide.md)
* [Chrome 升級](development/upgrading-chrome.md)
* [開發 Chromium](development/chromium-development.md)
* [開發 V8](development/v8-development.md)