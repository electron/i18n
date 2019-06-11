# Hướng dẫn sử dụng chính thức

Hãy chắc chắn rằng bạn đang sử dụng các tài liệu phù hợp với phiên bản Electron của bạn. Các đánh số của phiên bản là một phần của URL. If it's not, you are probably using the documentation of a development branch which may contain API changes that are not compatible with your Electron version. Để xem các tài liệu của phiên bản cũ hơn, bạn có thể [duyệt theo thẻ](https://github.com/electron/electron/tree/v1.4.0) trên GitHub mở trình đơn thả xuống "Swich branches/tags" và chọn từ khóa phù hợp với phiên bản của bạn.

## FAQ (câu hỏi thường gặp)

Có những câu hỏi thường xuyên hay gặp. Bạn nên xem qua phía dưới trước khi tạo một issue:

* [Electron FAQ (các câu hỏi thường gặp)](faq.md)

## Hướng dẫn

* [Về Electron](tutorial/about.md)
* [Khởi động môi trường của nhà phát triển](tutorial/development-environment.md) 
  * [Khởi động cho macOS](tutorial/development-environment.md#setting-up-macos)
  * [Khởi động cho Windows](tutorial/development-environment.md#setting-up-windows)
  * [Khởi động cho Linux](tutorial/development-environment.md#setting-up-linux)
  * [Chọn Editor](tutorial/development-environment.md#a-good-editor)
* [Tạo ra ứng dụng đầu tiên](tutorial/first-app.md) 
  * [Cài đặt Electron](tutorial/first-app.md#installing-electron)
  * [Tóm tắt phát triển Electron](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Chạy ứng dụng của bạn](tutorial/first-app.md#running-your-app)
* [Boilerplates và CLIs](tutorial/boilerplates-and-clis.md) 
  * [Boilerplates và CLIs](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Các công cụ khác và Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Cấu trúc ứng dụng](tutorial/application-architecture.md) 
  * [Main and Renderer Processes](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Sử dụng APIs của Electron](tutorial/application-architecture.md#using-electron-apis)
  * [Sử dụng Node.js APIs](tutorial/application-architecture.md#using-nodejs-apis)
  * [Using Native Node.js Modules](tutorial/using-native-node-modules.md)
* Adding Features to Your App 
  * [Notifications](tutorial/notifications.md)
  * [Recent Documents](tutorial/recent-documents.md)
  * [Application Progress](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/macos-dock.md)
  * [Custom Windows Taskbar](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [Các phím tắt](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detection](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
  * [Offscreen Rendering](tutorial/offscreen-rendering.md)
  * [Supporting macOS Dark Mode](tutorial/mojave-dark-mode-guide.md)
* [Accessibility](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Enabling Accessibility](tutorial/accessibility.md#enabling-accessibility)
* [Testing and Debugging](tutorial/application-debugging.md) 
  * [Debugging the Main Process](tutorial/debugging-main-process.md)
  * [Debugging the Main Process with Visual Studio Code](tutorial/debugging-main-process-vscode.md)
  * [Sử dụng Selenium và WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testing on Headless CI Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Phần mở rộng DevTools](tutorial/devtools-extension.md)
  * [Automated Testing with a Custom Driver](tutorial/automated-testing-with-a-custom-driver.md)
* Packaging 
  * [Code Signing](tutorial/code-signing.md)
* [Distribution](tutorial/application-distribution.md) 
  * [Support](tutorial/support.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Bảo mật](tutorial/security.md) 
  * [Báo cáo vấn đề bảo mật](tutorial/security.md#reporting-security-issues)
  * [Vấn đề bảo mật của Chromium và các cập nhật](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron Security Warnings](tutorial/security.md#electron-security-warnings)
  * [Security Checklist](tutorial/security.md#checklist-security-recommendations)
* [Updates](tutorial/updates.md) 
  * [Deploying an Update Server](tutorial/updates.md#deploying-an-update-server)
  * [Implementing Updates in Your App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Applying Updates](tutorial/updates.md#applying-updates)
* [Getting Support](tutorial/support.md)

## Detailed Tutorials

Những hướng dẫn sau đây là mở rộng của các chủ đề đã được thảo luận trong các tài liệu trên.

* [Cài đặt Electron](tutorial/installation.md) 
  * [Proxies](tutorial/installation.md#proxies)
  * [Tuỳ chỉnh Mirrors và Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Xử lý sự cố](tutorial/installation.md#troubleshooting)
* Electron Releases & Developer Feedback 
  * [Versioning Policy](tutorial/electron-versioning.md)
  * [Release Timelines](tutorial/electron-timelines.md)
  * [App Feedback Program](tutorial/app-feedback-program.md)
* [Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [Tạo ra một file asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Sử dụng các file đóng gói asar](tutorial/application-packaging.md#using-asar-archives)
  * [Hạn chế](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Testing Widevine CDM](tutorial/testing-widevine-cdm.md)
* [Việc sử dụng Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)

* * *

* [Từ điển thuật ngữ](glossary.md)

## Tài liệu tham khảo về API

* [Tóm tắt](api/synopsis.md)
* [Process Object](api/process.md)
* [Các Chrome Command Line Switch được hỗ trợ](api/chrome-command-line-switches.md)
* [Các biến môi trường (Environment Variables)](api/environment-variables.md)
* [Breaking API Changes](api/breaking-changes.md)

### Tùy chỉnh các DOM Element:

* [`File` Object](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Function](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

### Các Module của Main Process:

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

### Các Module của Renderer Process (trên Web Page):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Các Module của cả hai Process trên:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## Development

</a>