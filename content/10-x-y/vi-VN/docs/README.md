# Hướng dẫn sử dụng chính thức

Hãy chắc chắn rằng bạn đang sử dụng các tài liệu phù hợp với phiên bản Electron của bạn. Các đánh số của phiên bản là một phần của URL. If it's not, you are probably using the documentation of a development branch which may contain API changes that are not compatible with your Electron version. Để xem các tài liệu của phiên bản cũ hơn, bạn có thể [duyệt theo thẻ](https://github.com/electron/electron/tree/v1.4.0) trên GitHub mở trình đơn thả xuống "Swich branches/tags" và chọn từ khóa phù hợp với phiên bản của bạn.

## FAQ (câu hỏi thường gặp)

There are questions that are asked quite often. Check this out before creating an issue:

* [Electron FAQ (các câu hỏi thường gặp)](faq.md)

## Hướng dẫn

* [Khởi động môi trường của nhà phát triển](tutorial/development-environment.md)
  * [Thiết lập trên macOS](tutorial/development-environment.md#setting-up-macos)
  * [Setting up Windows](tutorial/development-environment.md#setting-up-windows)
  * [Setting up Linux](tutorial/development-environment.md#setting-up-linux)
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
  * [Tiến trình chính và tiến trình kết xuất](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Sử dụng APIs của Electron](tutorial/application-architecture.md#using-electron-apis)
  * [Sử dụng Node.js APIs](tutorial/application-architecture.md#using-nodejs-apis)
  * [Sử dụng các Module Native của Node](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
* Thêm các tính năng vào app của bạn
  * [Notifications](tutorial/notifications.md)
  * [Recent Documents](tutorial/recent-documents.md)
  * [Tiến độ ứng dụng](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/macos-dock.md)
  * [Cửa sổ tùy chỉnh thanh taskbar](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [Các phím tắt](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detection](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
  * [Offscreen Rendering](tutorial/offscreen-rendering.md)
  * [Hỗ trợ chế độ màn hình tối macOS](tutorial/mojave-dark-mode-guide.md)
  * [Web embeds in Electron](tutorial/web-embeds.md)
* [Accessibility](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Enabling Accessibility](tutorial/accessibility.md#enabling-accessibility)
* [اختبار وتصحيح](tutorial/application-debugging.md)
  * [Debugging the Main Process](tutorial/debugging-main-process.md)
  * [Debugging tiến trình chính với Visual studio code](tutorial/debugging-main-process-vscode.md)
  * [Sử dụng Selenium và WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testing on Headless CI Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Phần mở rộng DevTools](tutorial/devtools-extension.md)
  * [Kiểm lỗi tự động với driver tùy chỉnh](tutorial/automated-testing-with-a-custom-driver.md)
* [Phân phối](tutorial/application-distribution.md)
  * [Nền tảng hỗ trợ](tutorial/support.md#supported-platforms)
  * [Code Signing](tutorial/code-signing.md)
  * [Mở App store](tutorial/mac-app-store-submission-guide.md)
  * [Kho ứng dụng Windows](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Security](tutorial/security.md)
  * [Báo cáo vấn đề bảo mật](tutorial/security.md#reporting-security-issues)
  * [Vấn đề bảo mật của Chromium và các cập nhật](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Cảnh báo bảo mật của Electron](tutorial/security.md#electron-security-warnings)
  * [Danh mục bảo mật](tutorial/security.md#checklist-security-recommendations)
* [Cập Nhật](tutorial/updates.md)
  * [Triển khai một Update Server](tutorial/updates.md#deploying-an-update-server)
  * [Thực hiện cập nhật trong ứng dụng của bạn](tutorial/updates.md#implementing-updates-in-your-app)
  * [Áp dụng cập nhật](tutorial/updates.md#applying-updates)
* [Hỗ trợ](tutorial/support.md)

## Hướng dẫn cụ thể

Những hướng dẫn sau đây là mở rộng của các chủ đề đã được thảo luận trong các tài liệu trên.

* [Cài đặt Electron](tutorial/installation.md)
  * [Proxies](tutorial/installation.md#proxies)
  * [Tuỳ chỉnh Mirrors và Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Xử lý sự cố](tutorial/installation.md#troubleshooting)
* Phát hành Electron & phản hồi của nhà phát triển
  * [Chính sách phiên bản](tutorial/electron-versioning.md)
  * [Lịch phát hành](tutorial/electron-timelines.md)
  * [Phản hồi ứng dụng](tutorial/app-feedback-program.md)
* [Chi tiết: Đóng gói mã nguồn của ứng dụng với asar](tutorial/application-packaging.md)
  * [Tạo ra một file asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Sử dụng các file đóng gói asar](tutorial/application-packaging.md#using-asar-archives)
  * [Hạn chế](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Huan](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Thử nghiệm Widevine CDM](tutorial/testing-widevine-cdm.md)
* [Việc sử dụng Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)

---

* [Từ điển thuật ngữ](glossary.md)

## Tài liệu tham khảo về API

* [Tóm tắt](api/synopsis.md)
* [Process Object](api/process.md)
* [Dòng lệnh chuyển được hỗ trợ](api/command-line-switches.md)
* [Các biến môi trường (Environment Variables)](api/environment-variables.md)
* [Tiện ích Chrome được hỗ trợ](api/extensions.md)
* [Những thay đổi API](breaking-changes.md)

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
* [Thông báo](api/notification.md)
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
