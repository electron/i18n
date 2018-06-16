# Chinese Travelers 

請確認說明文件的版本跟你用的 Electron 是一致的。 版號應該就出現在網頁 URL 中。 如果版本不對，可能代表你正在讀的是一個開發中的分支文件，當中可能有跟你 Electron 版本不相容的 API。 若要查看舊版本的文檔，你可以在 GitHub 網頁中，打開「Switch branches/tags」下拉清單，選擇與您的版本相合的Tag。

## 常見問題集

這裡列出最常被問到旳問題。請在發出議題前先檢查看看你的問題是否已經有人問過了。

* [Electron 常見問題集](faq.md)

## 使用導引與教學

* [開發環境設定](tutorial/development-environment.md) 
  * [macOS 設定](tutorial/development-environment.md#setting-up-macos)
  * [Windows 設定](tutorial/development-environment.md#setting-up-windows)
  * [Linux設定](tutorial/development-environment.md#setting-up-linux)
  * [選擇編輯器](tutorial/development-environment.md#a-good-editor)
* [建立你的第一個應用程式](tutorial/first-app.md) 
  * [安裝 Electron](tutorial/first-app.md#installing-electron)
  * [Electron Development in a Nutshell](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [執行你的應用程式](tutorial/first-app.md#running-your-app)
* [模版及命令列介面 (CLI)](tutorial/boilerplates-and-clis.md) 
  * [模板 vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [其他工具及模版](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [應用程式架構](tutorial/application-architecture.md) 
  * [主處理序及畫面轉譯處理序](tutorial/application-architecture.md#main-and-renderer-processes)
  * [使用 Electron API](tutorial/application-architecture.md#using-electron-apis)
  * [使用 Node.js API](tutorial/application-architecture.md#using-nodejs-apis)
  * [使用原生 Node.js 模組](tutorial/using-native-node-modules.md)
* 新增功能進應用程式 
  * [通知](tutorial/notifications.md)
  * [最近的文件](tutorial/desktop-environment-integration.md#recent-documents)
  * [應用程式進度](tutorial/progress-bar.md)
  * [自訂 Dock 選單](tutorial/macos-dock.md)
  * [自訂 Windows 工作列](tutorial/windows-taskbar.md)
  * [自訂 Linux 桌面動作](tutorial/linux-desktop-actions.md)
  * [鍵盤快速鍵](tutorial/keyboard-shortcuts.md)
  * [離線/上線偵測](tutorial/online-offline-events.md)
  * [macOS BrowserWindows 的代表檔案](tutorial/represented-file.md)
  * [原生檔案拖放](tutorial/native-file-drag-drop.md)
* [協助工具](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [啟用協助工具](tutorial/accessibility.md#enabling-accessibility)
* [Testing and Debugging](tutorial/application-debugging.md) 
  * [Debug 主處理序](tutorial/debugging-main-process.md)
  * [使用 Selenium 及 WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [在無周邊 CI 系統上測試 (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools 擴充](tutorial/devtools-extension.md)
  * [Automated Testing with a Custom Driver](tutorial/automated-testing-with-a-custom-driver.md)
* Packaging 
  * [Code Signing](tutorial/code-signing.md)
* [Distribution](tutorial/application-distribution.md) 
  * [Support](tutorial/support.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows 市集](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [安全性](tutorial/security.md) 
  * [回報安全性問題](tutorial/security.md#reporting-security-issues)
  * [Chromium 安全性議題及升級](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron 安全性警告](tutorial/security.md#electron-security-warnings)
  * [安全性檢查清單](tutorial/security.md#checklist-security-recommendations)
* [Updates](tutorial/updates.md) 
  * [佈署更新伺服器](tutorial/updates.md#deploying-an-update-server)
  * [在應用程式中實作更新功能](tutorial/updates.md#implementing-updates-in-your-app)
  * [套用更新](tutorial/updates.md#applying-updates)

## 深入教學

These individual tutorials expand on topics discussed in the guide above.

* [深入: 安裝 Electron](tutorial/installation.md) 
  * [代理伺服器](tutorial/installation.md#proxies)
  * [自訂鏡像及快取](tutorial/installation.md#custom-mirrors-and-caches)
  * [疑難排解](tutorial/installation.md#troubleshooting)
* [深入: Electron 版號規則](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [穩定分支](tutorial/electron-versioning.md#stabilization-branches)
  * [Beta 版及 Bug 修正](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [深入: 用 asar 打包應用程式原始碼](tutorial/application-packaging.md) 
  * [產生 asar 封存檔](tutorial/application-packaging.md#generating-asar-archives)
  * [使用 asar 封存檔](tutorial/application-packaging.md#using-asar-archives)
  * [限制](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [將無法封存的檔案與 asar 封存檔整合](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [深入: 使用 Pepper Flash 外掛程式](tutorial/using-pepper-flash-plugin.md)
* [深入: 使用 Widevine CDM 外掛程式](tutorial/using-widevine-cdm-plugin.md)
* [螢幕外畫面轉譯](tutorial/offscreen-rendering.md)

* * *

* [詞彙表](glossary.md)

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

See <development/README.md>