Hãy chắc chắn rằng bạn sử dụng các tài liệu phù hợp với phiên bản Electron của bạn. Các đánh số của phiên bản là một phần của URL. Nếu bạn không thấy, thì bạn đang sử dụng tài liệu của một nhánh, tài liệu này có thể chứa các thay đổi trong các API mà nó có thể không tương thích với phiên bản Electron hiện tại mà bạn đang sử dụng. Để xem các tài liệu của phiên bản cũ hơn, bạn có thể [duyệt theo thẻ](https://github.com/electron/electron/tree/v1.4.0) trên GitHub mở trình đơn thả xuống "Swich branches/tags" và chọn từ khóa phù hợp với phiên bản của bạn.

## FAQ (câu hỏi thường gặp)

Có những câu hỏi thường xuyên hay gặp. Bạn nên xem qua phía dưới trước khi tạo một issue:

* [Danh sách các câu hỏi hay gặp của Electron](faq.md)

## Các hướng dẫn

* [Từ điển thuật ngữ](glossary.md)
* [Nền tảng hỗ trợ](tutorial/supported-platforms.md)
* [Bảo mật](tutorial/security.md)
* [Phiên bản Electron](tutorial/electron-versioning.md)
* [Phân phối ứng dụng](tutorial/application-distribution.md)
* [Bộ hướng dẫn của Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Bộ hướng dẫn của Windows Store](tutorial/windows-store-guide.md)
* [Application Packaging](tutorial/application-packaging.md)
* [Sử dụng các Module Native của Node](tutorial/using-native-node-modules.md)
* [Debug cho Main Process](tutorial/debugging-main-process.md)
* [Using Selenium and WebDriver](tutorial/using-selenium-and-webdriver.md)
* [Phần mở rộng DevTools](tutorial/devtools-extension.md)
* [Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Testing on Headless CI Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Offscreen Rendering](tutorial/offscreen-rendering.md)
* [Keyboard Shortcuts](tutorial/keyboard-shortcuts.md)

## Tutorials

* [Bắt đầu nhanh](tutorial/quick-start.md)
* [Môi trường làm việc tích hợp (Desktop Environment Integration)](tutorial/desktop-environment-integration.md)
* [Các phát hiện sự kiện Online/Offline xảy ra trong ứng dụng](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Native Notifications](tutorial/notifications.md)

## Tài liệu tham khảo về API

* [Tóm tắt](api/synopsis.md)
* [Process Object](api/process.md)
* [Các Chrome Command Line Switch được hỗ trợ](api/chrome-command-line-switches.md)
* [Các biến môi trường (Environment Variables)](api/environment-variables.md)

### Tùy chỉnh các DOM Element:

* [`File` Object](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Function](api/window-open.md)

### Các Module của Main Process:

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

### Các Module của Renderer Process (trên Web Page):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Các Module của cả hai Process trên:

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