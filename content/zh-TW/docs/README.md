請確認說明文件的版本跟你用的 Electron 是一致的。 版號應該就出現在網頁 URL 中。 如果版本不對，可能代表你正在讀的是一個開發中的分支文件，當中可能有跟你 Electron 版本不相容的 API。 若要查看舊版本的文檔，你可以在 GitHub 網頁中，打開「Switch branches/tags」下拉清單，選擇與您的版本相合的Tag。

## 常見問題集

這裡列出最常被問到旳問題。請在發出議題前先檢查看看你的問題是否已經有人問過了。

* [Electron 常見問題集](faq.md)

## Guides and Tutorials

* [Setting up the Development Environment](tutorial/development-environment.md) 
  * [Setting up macOS](tutorial/development-environment.md#setting-up-macos)
  * [Setting up Windows](tutorial/development-environment.md#setting-up-windows)
  * [Setting up Linux](tutorial/development-environment.md#setting-up-linux)
  * [Choosing an Editor](tutorial/development-environment.md#a-good-editor)
* [Creating your First App](tutorial/first-app.md) 
  * [Installing Electron](tutorial/first-app.md#installing-electron)
  * [Electron Development in a Nutshell](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Running Your App](tutorial/first-app.md#running-your-app)
* [Boilerplates and CLIs](tutorial/boilerplates-and-clis.md) 
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Other Tools and Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Application Architecture](tutorial/application-architecture.md) 
  * [Main and Renderer Processes](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Using Electron's APIs](tutorial/application-architecture.md#using-electron-apis)
  * [Using Node.js APIs](tutorial/application-architecture.md#using-node.js-apis)
  * [Using Native Node.js Modules](tutorial/using-native-node-modules.md)
  * [Inter-Process Communication](tutorial/application-architecture.md#)
* Adding Features to Your App 
  * [通知](tutorial/notifications.md)
  * [Recent Documents](tutorial/desktop-environment-integration.md#recent-documents-windows-mac-os)
  * [Application Progress](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/desktop-environment-integration.md#custom-dock-menu-mac-os)
  * [Custom Windows Taskbar](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [鍵盤快速鍵](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detection](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
* [Application Accessibility](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [啟用協助工具](tutorial/accessibility.md#enabling-accessibility)
* [Application Testing and Debugging](tutorial/application-debugging.md) 
  * [Debug 主處理序](tutorial/debugging-main-process.md)
  * [使用 Selenium 及 WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testing on Headless CI Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools 擴充功能](tutorial/devtools-extension.md)
* [應用程式發佈](tutorial/application-distribution.md) 
  * [支援平臺](tutorial/supported-platforms.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Application Security](tutorial/security.md) 
  * [回報安全性問題](tutorial/security.md#reporting-security-issues)
  * [Chromium 安全性議題及升級](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron 安全性警告](tutorial/security.md#electron-security-warnings)
  * [Security Checklist](tutorial/security.md#checklist-security-recommendations)
* [Application Updates](tutorial/updates.md) 
  * [Deploying an Update Server](tutorial/updates.md#deploying-an-update-server)
  * [Implementing Updates in Your App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Applying Updates](tutorial/updates.md#applying-updates)

## Detailed Tutorials

These individual tutorials expand on topics discussed in the guide above.

* [In Detail: Installing Electron](tutorial/installation.md) 
  * [Global versus Local Installation](tutorial/installation.md#global-versus-local-installation)
  * [代理伺服器](tutorial/installation.md#proxies)
  * [自訂鏡像及快取](tutorial/installation.md#custom-mirrors-and-caches)
  * [疑難排解](tutorial/installation.md#troubleshooting)
* [In Detail: Electron's Versioning Scheme](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [穩定分支](tutorial/electron-versioning.md#stabilization-branches)
  * [Beta 版及 Bug 修正](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [In Detail: Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Using asar Archives](tutorial/application-packaging.md#using-asar-archives)
  * [限制](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [In Detail: Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [In Detail: Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [螢幕外畫面轉譯](tutorial/offscreen-rendering.md)

* * *

* [Glossary of Terms](glossary.md)

## API 參考

* [簡介](api/synopsis.md)
* [Process Object](api/process.md)
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
* [Technical Differences to NW.js (formerly node-webkit)](development/atom-shell-vs-node-webkit.md)
* [建置系統概述](development/build-system-overview.md)
* [建置步驟 (macOS)](development/build-instructions-osx.md)
* [建置步驟 (Windows)](development/build-instructions-windows.md)
* [建置步驟 (Linux)](development/build-instructions-linux.md)
* [Debug Instructions (macOS)](development/debugging-instructions-macos.md)
* [Debug Instructions (Windows)](development/debug-instructions-windows.md)
* [Setting Up Symbol Server in debugger](development/setting-up-symbol-server.md)
* [Documentation Styleguide](styleguide.md)
* [Contributing to Electron](../CONTRIBUTING.md)
* [議題](development/issues.md)
* [合併請求 (PR)](development/pull-requests.md)
* [Chromium 升版](development/upgrading-chromium.md)
* [Chromium 開發](development/chromium-development.md)
* [V8 開發](development/v8-development.md)