# 官方指南

Please make sure that you use the documents that match your Electron version. 版本號應是頁面 URL 的一部分。 如果版本不對，可能代表你正在讀的是一個開發中的分支文件，當中可能有跟你 Electron 版本不相容的 API。 若要查看舊版本的文檔，你可以在 GitHub 網頁中，打開「Switch branches/tags」下拉清單，選擇與您的版本相合的Tag。

## 常見問題集

There are questions that are asked quite often. Check this out before creating an issue:

* [Electron 常見問題集](faq.md)

## 使用導引與教學

* [開發環境設定](tutorial/development-environment.md)
  * [macOS 設定](tutorial/development-environment.md#setting-up-macos)
  * [Windows 設定](tutorial/development-environment.md#setting-up-windows)
  * [Linux設定](tutorial/development-environment.md#setting-up-linux)
  * [選擇編輯器](tutorial/development-environment.md#a-good-editor)
* [建立你的第一個應用程式](tutorial/quick-start.md)
  * [系統需求](tutorial/quick-start.md#prerequisites)
  * [Create a basic application](tutorial/quick-start.md#create-a-basic-application)
  * [Package and distribute the application](tutorial/quick-start.md#package-and-distribute-the-application)
* [模版及命令列介面 (CLI)](tutorial/boilerplates-and-clis.md)
  * [模板 vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [其他工具及模版](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [應用程式架構](tutorial/quick-start.md#application-architecture)
  * [主處理序及畫面轉譯處理序](tutorial/quick-start.md#main-and-renderer-processes)
  * [Electron API](tutorial/quick-start.md#electron-api)
  * [Node.js API](tutorial/quick-start.md#nodejs-api)
  * [使用原生 Node.js 模組](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
* 新增功能進應用程式
  * [通知](tutorial/notifications.md)
  * [最近的文件](tutorial/recent-documents.md)
  * [應用程式進度](tutorial/progress-bar.md)
  * [自訂 Dock 選單](tutorial/macos-dock.md)
  * [自訂 Windows 工作列](tutorial/windows-taskbar.md)
  * [自訂 Linux 桌面動作](tutorial/linux-desktop-actions.md)
  * [鍵盤快速鍵](tutorial/keyboard-shortcuts.md)
  * [離線/上線偵測](tutorial/online-offline-events.md)
  * [macOS BrowserWindows 的代表檔案](tutorial/represented-file.md)
  * [原生檔案拖放](tutorial/native-file-drag-drop.md)
  * [螢幕外畫面轉譯](tutorial/offscreen-rendering.md)
  * [支援 macOS 的 Dark Mode](tutorial/mojave-dark-mode-guide.md)
  * [網路嵌入電子](tutorial/web-embeds.md)
* [協助工具](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Manually Enabling Accessibility Features](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [記錄與除錯](tutorial/application-debugging.md)
  * [Debug 主處理序](tutorial/debugging-main-process.md)
  * [使用 Visual Studio Code debug 主處理序](tutorial/debugging-main-process-vscode.md)
  * [使用 Selenium 及 WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [在無周邊 CI 系統上測試 (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools 擴充](tutorial/devtools-extension.md)
  * [使用自訂驅動程式進行自動測試](tutorial/automated-testing-with-a-custom-driver.md)
* [分發](tutorial/application-distribution.md)
  * [支援平臺](tutorial/support.md#supported-platforms)
  * [代碼簽名](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows 市集](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [安全性](tutorial/security.md)
  * [回報安全性問題](tutorial/security.md#reporting-security-issues)
  * [Chromium 安全性議題及升級](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron 安全性警告](tutorial/security.md#electron-security-warnings)
  * [安全性檢查清單](tutorial/security.md#checklist-security-recommendations)
* [更新](tutorial/updates.md)
  * [佈署更新伺服器](tutorial/updates.md#deploying-an-update-server)
  * [在應用程式中實作更新功能](tutorial/updates.md#implementing-updates-in-your-app)
  * [套用更新](tutorial/updates.md#applying-updates)
* [獲取支援](tutorial/support.md)

## 深入教學

這些單獨的教程將展開有關本指南中討論的主題。

* [安裝 Electron](tutorial/installation.md)
  * [代理伺服器](tutorial/installation.md#proxies)
  * [自訂鏡像及快取](tutorial/installation.md#custom-mirrors-and-caches)
  * [疑難排解](tutorial/installation.md#troubleshooting)
* 電子釋放 & 開發人員回饋
  * [版本控制方針](tutorial/electron-versioning.md)
  * [發佈時間表](tutorial/electron-timelines.md)
* [使用 asar 打包應用程式原始程式碼](tutorial/application-packaging.md)
  * [產生 asar 封存檔](tutorial/application-packaging.md#generating-asar-archives)
  * [使用 asar 封存檔](tutorial/application-packaging.md#using-asar-archives)
  * [限制](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [將無法封存的檔案與 asar 封存檔整合](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [測試寬文 CDM](tutorial/testing-widevine-cdm.md)
* [使用 Pepper Flash 外掛程式](tutorial/using-pepper-flash-plugin.md)

---

* [詞彙表](glossary.md)

## API 參考

* [簡介](api/synopsis.md)
* [處理序物件](api/process.md)
* [支援的 Chrome 命令列參數](api/command-line-switches.md)
* [環境變數](api/environment-variables.md)
* [Chrome插件支援](api/extensions.md)
* [Breaking API Changes](breaking-changes.md)

### 自訂 DOM 元素：

* [`File` 物件](api/file-object.md)
* [`<webview>` 標籤](api/webview-tag.md)
* [`window.open` 函式](api/window-open.md)
* [`瀏覽器視窗代理`物件](api/browser-window-proxy.md)

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
* [netLog](api/net-log.md)
* [Notification](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [觸控條](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### 畫面轉譯處理序 (網頁) 可用的模組:

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### 主處理序及畫面轉譯處理序均可使用的模組：

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## 開發

See [development/README.md](development/README.md)
