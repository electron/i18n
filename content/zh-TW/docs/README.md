Please make sure that you use the documents that match your Electron version. The version number should be a part of the page URL. If it's not, you are probably using the documentation of a development branch which may contain API changes that are not compatible with your Electron version. To view older versions of the documentation, you can [browse by tag](https://github.com/electron/electron/tree/v1.4.0) on GitHub by opening the "Switch branches/tags" dropdown and selecting the tag that matches your version.

## FAQ

There are questions that are asked quite often. Check this out before creating an issue:

* [Electron FAQ](faq.md)

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
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Function](api/window-open.md)

### Modules for the Main Process:

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

### Modules for the Renderer Process (Web Page):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Modules for Both Processes:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Development

* [Coding Style](development/coding-style.md)
* [Using clang-format on C++ Code](development/clang-format.md)
* [Source Code Directory Structure](development/source-code-directory-structure.md)
* [Technical Differences to NW.js (formerly node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Build System Overview](development/build-system-overview.md)
* [Build Instructions (macOS)](development/build-instructions-osx.md)
* [Build Instructions (Windows)](development/build-instructions-windows.md)
* [Build Instructions (Linux)](development/build-instructions-linux.md)
* [Debug Instructions (macOS)](development/debugging-instructions-macos.md)
* [Debug Instructions (Windows)](development/debug-instructions-windows.md)
* [Setting Up Symbol Server in debugger](development/setting-up-symbol-server.md)
* [Documentation Styleguide](styleguide.md)
* [Upgrading Chrome](development/upgrading-chrome.md)
* [Chromium Development](development/chromium-development.md)
* [V8 Development](development/v8-development.md)