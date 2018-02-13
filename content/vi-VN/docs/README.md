Hãy chắc chắn rằng bạn đang sử dụng các tài liệu phù hợp với phiên bản Electron của bạn. Các đánh số của phiên bản là một phần của URL. Nếu bạn không thấy, thì bạn đang sử dụng tài liệu của một nhánh, tài liệu này có thể chứa các thay đổi trong các API mà nó có thể không tương thích với phiên bản Electron hiện tại mà bạn đang sử dụng. Để xem các tài liệu của phiên bản cũ hơn, bạn có thể [duyệt theo thẻ](https://github.com/electron/electron/tree/v1.4.0) trên GitHub mở trình đơn thả xuống "Swich branches/tags" và chọn từ khóa phù hợp với phiên bản của bạn.

## FAQ (câu hỏi thường gặp)

Có những câu hỏi thường xuyên hay gặp. Bạn nên xem qua phía dưới trước khi tạo một issue:

* [Electron FAQ (các câu hỏi thường gặp)](faq.md)

## Các hướng dẫn

* [Từ điển thuật ngữ](glossary.md)
* [Nền tảng hỗ trợ](tutorial/supported-platforms.md)
* [Bảo mật](tutorial/security.md)
* [Phiên bản](tutorial/electron-versioning.md)
* [Phân phối ứng dụng](tutorial/application-distribution.md)
* [Bộ hướng dẫn cho Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Bộ hướng dẫn cho Windows Store](tutorial/windows-store-guide.md)
* [Snapcraft Guide](tutorial/snapcraft-guide.md)
* [Đóng góp ứng dụng](tutorial/application-packaging.md)
* [Sử dụng các Module Native của Node](tutorial/using-native-node-modules.md)
* [Debug cho Main Process](tutorial/debugging-main-process.md)
* [Sử dụng Selenium và WebDriver](tutorial/using-selenium-and-webdriver.md)
* [Phần mở rộng DevTools](tutorial/devtools-extension.md)
* [Việc sử dụng Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [Sử dụng Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Testing on Headless CI Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Offscreen Rendering](tutorial/offscreen-rendering.md)
* [Các phím tắt](tutorial/keyboard-shortcuts.md)
* [Cập nhật ứng dụng](tutorial/updates.md)

## Hướng dẫn

* [Bắt đầu nhanh](tutorial/quick-start.md)
* [Môi trường làm việc tích hợp (Desktop Environment Integration)](tutorial/desktop-environment-integration.md)
* [Cách phát hiện sự kiện Online/Offline xảy ra trong ứng dụng](tutorial/online-offline-events.md)
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

* [Phong cách lập trình](development/coding-style.md)
* [Sử dụng clang-format trên Code C++](development/clang-format.md)
* [Kiểm thử](development/testing.md)
* [Cấu trúc cây thư mục của Source Code](development/source-code-directory-structure.md)
* [Technical Differences to NW.js (tiền thân là node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Tổng qua về Hệ thống cần thiết để Build](development/build-system-overview.md)
* [Hướng dẫn build (macOS)](development/build-instructions-osx.md)
* [Hướng dẫn build (Windows)](development/build-instructions-windows.md)
* [Hướng dẫn build (Linux)](development/build-instructions-linux.md)
* [Các hướng dẫn debug (macOS)](development/debugging-instructions-macos.md)
* [Các hướng dẫn debug (Windows)](development/debug-instructions-windows.md)
* [Cài đặt Symbol Server trên debugger](development/setting-up-symbol-server.md)
* [Tài liệu về Styleguide](styleguide.md)
* [Contributing to Electron](../CONTRIBUTING.md)
* [Issues](development/issues.md)
* [Pull Requests](development/pull-requests.md)
* [Nâng cấp Chromium](development/upgrading-chromium.md)
* [Chromium Development](development/chromium-development.md)
* [V8 Development](development/v8-development.md)