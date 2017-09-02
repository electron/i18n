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

## การอ้างอิง API

* [บทย่อ](api/synopsis.md)
* [กระบวนการของวัตถุ](api/process.md)
* [รองรับการสลับคำสั่งของ Chrome](api/chrome-command-line-switches.md)
* [ตัวแปรสภาพแวดล้อม](api/environment-variables.md)

### การสร้างสมาชิก DOM

* [ออบเจค `File`](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [ฟังก์ชัน `window.open`](api/window-open.md)

### โมดูลสำหรับกระบวนการหลัก:

* [แอพ](api/app.md)
* [ตัวอัพเดทอัตโนมัติ](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
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
* [เซสชั่น](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [ถาด](api/tray.md)
* [webContents](api/web-contents.md)

### โมดูลสำหรับกระบวนการเรนเดอร์ (หน้าเว็บ):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [ระยะไกล](api/remote.md)
* [webFrame](api/web-frame.md)

### โมดูลสำหรับกระบวนการทั้งสอง:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [หน้าจอ](api/screen.md)
* [เชลล์](api/shell.md)

## การพัฒนา

* [ลักษณะการเขียนโค้ด](development/coding-style.md)
* [การใช้รูปแบบ clang ในโค้ด C++](development/clang-format.md)
* [โครงสร้างของไดเรกทอรี่ของรหัสต้นฉบับ](development/source-code-directory-structure.md)
* [ความแตกต่างทางเทคนิคระหว่าง NW.js (node-webkit ในอดีต)](development/atom-shell-vs-node-webkit.md)
* [สร้างภาพรวมของระบบ](development/build-system-overview.md)
* [คำแนะนำการสร้าง (macOS)](development/build-instructions-osx.md)
* [คำแนะนำการสร้าง (Windows)](development/build-instructions-windows.md)
* [คำแนะนำการสร้าง (Linux)](development/build-instructions-linux.md)
* [คำแนะนำการดีบัก (macOS)](development/debugging-instructions-macos.md)
* [คำแนะนำการดีบัก (Windows)](development/debug-instructions-windows.md)
* [การตั้งค่าเซิร์ฟเวอร์ในตัวดีบักเกอร์](development/setting-up-symbol-server.md)
* [เอกสารประกอบแนวทางลักษณะ](styleguide.md)
* [อัพเกรดโครม](development/upgrading-chrome.md)
* [การพัฒนาโครเมี่ยม](development/chromium-development.md)
* [การพัฒนา V8](development/v8-development.md)