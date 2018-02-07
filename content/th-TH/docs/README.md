โปรดแน่ใจว่า คุณใช้เอกสารที่ตรงกับรุ่นของอิเล็กตรอน หมายเลขเวอร์ชันควรเป็นส่วนหนึ่งของ URL ถ้าไม่ บางทีคุณกำลังใช้เอกสารในส่วนที่ยังมีการพัฒนาอยู่ซึ่งอาจจะมีการเปลี่ยนแปลง API ที่ไม่ตรงกับรุ่นของ Election ที่คุณกำลังใช้ เพื่อดูเอกสารรุ่นเก่า คุณสามารถ[เรียกดูตาม tag](https://github.com/electron/electron/tree/v1.4.0)บน GitHub โดยเลือกที่เมนู"เปลี่ยน branches/tags" และเลือก tag ที่ตรงกับรุ่นของคุณ

## คำถามที่พบบ่อย

มีหลายคำถามที่ถูกถามบ่อยครั้ง กรุณาค้นหาที่นี่ก่อนที่จะตั้ง issue:

* [คำถามที่พบบ่อยของ Electron](faq.md)

## คู่มือ

* [อภิธานศัพท์](glossary.md)
* [แพลตฟอร์มที่รองรับ](tutorial/supported-platforms.md)
* [ความปลอดภัย](tutorial/security.md)
* [เวอร์ชั่น](tutorial/electron-versioning.md)
* [การเผยแพร่แอพพลิเคชั่น](tutorial/application-distribution.md)
* [คู่มือการส่งแม็คแอพสโตร์ (Mac App Store)](tutorial/mac-app-store-submission-guide.md)
* [คู่มือการส่งวินโดวส์สโตร์ (Windows Store)](tutorial/windows-store-guide.md)
* [Snapcraft Guide](tutorial/snapcraft-guide.md)
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
* [Updating Applications](tutorial/updates.md)

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

* [app](api/app.md)
* [ตัวอัพเดทอัตโนมัติ](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [กล่องโต้ตอบ](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [เมนู](api/menu.md)
* [รายการบนเมนู](api/menu-item.md)
* [เน็ต](api/net.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [โพรโทคอล](api/protocol.md)
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

* [คลิปบอร์ด](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [หน้าจอ](api/screen.md)
* [เชลล์](api/shell.md)

## การพัฒนา

* [ลักษณะการเขียนโค้ด](development/coding-style.md)
* [การใช้รูปแบบ clang ในโค้ด C++](development/clang-format.md)
* [Testing](development/testing.md)
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
* [Upgrading Chromium](development/upgrading-chromium.md)
* [การพัฒนาโครเมี่ยม](development/chromium-development.md)
* [การพัฒนา V8](development/v8-development.md)