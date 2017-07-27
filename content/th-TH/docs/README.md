กรุณาดูคู่มือที่ใช้ว่าตรงกับเวอร์ชั่นของ Electron หมายเลยเวอร์ชั่นจะเป็นส่วนหนึ่งของ URL หากถ้าเกิดไม่ใช่ คุณอาจจะใช้เอกสารประกอบของรุ่นพัฒนาซึ่งอาจจะมีการเปลี่ยนแปลงของ API ที่ไม่สามารถใช้ร่วมกับเวอร์ชั่นของ Electron ที่คุณใช้อยู่ได้ เพื่อที่จะดูเอกสารเวอร์ชั่นเก่าๆ คุณสามารถ[เรียกดูตามแท็ก](https://github.com/electron/electron/tree/v1.4.0)บน Github โดยการเลือกรายการ "เปลี่ยนสาขา/แท็ก" ในเมนูดรอปดาวน์และเลือกแท็กที่ตรงตามที่คุณต้องการ

## คำถามที่พบบ่อย

คุณควรจะตรวจสอบคำถามที่ถูกถามบ่อยๆก่อนที่จะสร้างกระทู้ปัญหา:

* [คำถามที่พบบ่อยของ Electron](faq.md)

## คู่มือ

* [อภิธานศัพท์](glossary.md)
* [แพลตฟอร์มที่รองรับ](tutorial/supported-platforms.md)
* [ความปลอดภัย](tutorial/security.md)
* [การกำหนดเวอร์ชั่นของอิเล็กตรอน](tutorial/electron-versioning.md)
* [การเผยแพร่แอพพลิเคชั่น](tutorial/application-distribution.md)
* [คู่มือการส่งแม็คแอพสโตร์ (Mac App Store)](tutorial/mac-app-store-submission-guide.md)
* [คู่มือการส่งวินโดวส์สโตร์ (Windows Store)](tutorial/windows-store-guide.md)
* [การแพ็กเกจแอพพลิเคชั่น](tutorial/application-packaging.md)
* [การใช้โมดูล Node ที่เนทีฟ](tutorial/using-native-node-modules.md)
* [การดีบัคกระบวนการหลัก](tutorial/debugging-main-process.md)
* [การใช้ Selenium และ WebDriver](tutorial/using-selenium-and-webdriver.md)
* [ส่วนขยายของ DevTools](tutorial/devtools-extension.md)
* [การใช้ปลั้กอิน Pepper Flash](tutorial/using-pepper-flash-plugin.md)
* [การใช้ปลั้กอิน Widevine CDM](tutorial/using-widevine-cdm-plugin.md)
* [การทดสอบบนระบบ Headless CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [การเรนเดอร์แบบ Offscreen](tutorial/offscreen-rendering.md)
* [ปุ่มลัดแป้นพิมพ์](tutorial/keyboard-shortcuts.md)

## การใช้งานเบื้องต้น

* [เริ่มต้นแบบรวดเร็ว](tutorial/quick-start.md)
* [การตั้งค่า Environment บนเดสท็อป](tutorial/desktop-environment-integration.md)
* [การตรวจสอบอีเวนท์แบบออนไลน์และออฟไลน์](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [การแจ้งเตือนแบบเนทีฟ](tutorial/notifications.md)

## API References

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Supported Chrome Command Line Switches](api/chrome-command-line-switches.md)
* [Environment Variables](api/environment-variables.md)

### Custom DOM Elements:

* [`File` Object](api/file-object.md)
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
* [เมนู](api/menu.md)
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