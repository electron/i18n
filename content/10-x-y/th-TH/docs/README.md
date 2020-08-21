# คำแนะนำ

Please make sure that you use the documents that match your Electron version. หมายเลยเวอร์ชั่นจะเป็นส่วนหนึ่งของ URL ถ้าไม่ บางทีคุณกำลังใช้เอกสารในส่วนที่ยังมีการพัฒนาอยู่ซึ่งอาจจะมีการเปลี่ยนแปลง API ที่ไม่ตรงกับรุ่นของ Election ที่คุณกำลังใช้ เพื่อที่จะดูเอกสารเวอร์ชั่นเก่าๆ คุณสามารถ[เรียกดูตามแท็ก](https://github.com/electron/electron/tree/v1.4.0)บน Github โดยการเลือกรายการ "เปลี่ยนสาขา/แท็ก" ในเมนูดรอปดาวน์และเลือกแท็กที่ตรงตามที่คุณต้องการ

## คำถามที่พบบ่อย

There are questions that are asked quite often. Check this out before creating an issue:

* [คำถามที่พบบ่อยของ Electron](faq.md)

## แนะนำและบทความสอน

* [วิธีการติดตั้งสำหรับการพัฒนา](tutorial/development-environment.md)
  * [การติดตั้งบน macOS](tutorial/development-environment.md#setting-up-macos)
  * [การติดตั้งบน Windows](tutorial/development-environment.md#setting-up-windows)
  * [การติดตั้งบน Linux](tutorial/development-environment.md#setting-up-linux)
  * [วิธีการเลือกเครื่องมือที่ใช้พัฒนา](tutorial/development-environment.md#a-good-editor)
* [สร้างแอพแรกของคุณ](tutorial/first-app.md)
  * [วิธีการติดตั้ง Electron](tutorial/first-app.md#installing-electron)
  * [ทำความรู้จักการพัฒนา Electron](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [เริ่มต้นแอพของคุณ](tutorial/first-app.md#running-your-app)
* [Boilerplates and CLIs](tutorial/boilerplates-and-clis.md)
  * [Boilerplates and CLIs](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-ลืม](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-สร้าง](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-สำเร็จรูป](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [เครื่องมือและแผ่นข้อมูลอื่น ๆ](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [โครงสร้างของแอพพลิเคชั่น](tutorial/application-architecture.md)
  * [ขั้นตอนหลักและขั้นตอนการเรนเดอร์](tutorial/application-architecture.md#main-and-renderer-processes)
  * [วิธีการใช้อินเตอร์เฟสของ Electron](tutorial/application-architecture.md#using-electron-apis)
  * [วิธีการใช้อินเตอร์เฟสของ Node.js](tutorial/application-architecture.md#using-nodejs-apis)
  * [วิธีการใช้เนทีฟโมดูลของ Node.js](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
* การเพิ่มฟีสเจอร์บนแอพของคุณ
  * [การแจ้งเตือน](tutorial/notifications.md)
  * [บทความปัจจุบัน](tutorial/recent-documents.md)
  * [ความคืบหน้าการแปลภาษา](tutorial/progress-bar.md)
  * [เมนู Dock แบบกำหนดเอง](tutorial/macos-dock.md)
  * [แถบงาน Windows แบบกำหนดเอง](tutorial/windows-taskbar.md)
  * [การกระทำที่กำหนดเองบนเดสก์ทอป Linux](tutorial/linux-desktop-actions.md)
  * [ปุ่มลัดแป้นพิมพ์](tutorial/keyboard-shortcuts.md)
  * [ออฟไลน์ / ออนไลน์ ตรวจสอบ](tutorial/online-offline-events.md)
  * [ไฟล์ที่แสดงสำหรับ macOS Browser Windows](tutorial/represented-file.md)
  * [เนทิฟไฟล์  ลาก&และ; วาง](tutorial/native-file-drag-drop.md)
  * [การเรนเดอร์แบบ Offscreen](tutorial/offscreen-rendering.md)
  * [O](tutorial/mojave-dark-mode-guide.md)
  * [Web embeds in Electron](tutorial/web-embeds.md)
* [การเข้าถึง](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [เปิดใช้งานการเข้าถึง](tutorial/accessibility.md#enabling-accessibility)
* [การทดสอบและการดีบัก](tutorial/application-debugging.md)
  * [การดีบักกระบวนการหลัก](tutorial/debugging-main-process.md)
  * [Debugging the Main Process with Visual Studio Codeo](tutorial/debugging-main-process-vscode.md)
  * [การใช้ Selenium และ WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [การทดสอบบนระบบ Headless CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [ส่วนขยายของ DevTools](tutorial/devtools-extension.md)
  * [การทดสอบอัตโนมัติด้วยไดรเวอร์ที่กำหนดเอง](tutorial/automated-testing-with-a-custom-driver.md)
* [การกระจาย](tutorial/application-distribution.md)
  * [แพลตฟอร์มที่รองรับ](tutorial/support.md#supported-platforms)
  * [Code Signing](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [ความปลอดภัย](tutorial/security.md)
  * [รายงานปัญหาด้านความปลอดภัย](tutorial/security.md#reporting-security-issues)
  * [รายงานปัญหาด้านความปลอดภัยของ Chromium และการอัพเกรต](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [การแจ้งเตือนความปลอดภัยสำหรับ Electron](tutorial/security.md#electron-security-warnings)
  * [รายการความปลอดภัย](tutorial/security.md#checklist-security-recommendations)
* [อัพเดต](tutorial/updates.md)
  * [การติดตั้งบนเซิร์ฟเวอร์ที่มีการอัพเดต](tutorial/updates.md#deploying-an-update-server)
  * [วิธีการอัพเดตแอพของคุณ](tutorial/updates.md#implementing-updates-in-your-app)
  * [ใช้การอัพเดต](tutorial/updates.md#applying-updates)
* [Getting Support](tutorial/support.md)

## รายละเอียดบทความสอน

บทความสอนแต่ละบทจะขยายความจากหัวข้อคำแนะนำข้างบน

* [วิธีการติดตั้ง Electron](tutorial/installation.md)
  * [ผู้รับมอบฉันทะ](tutorial/installation.md#proxies)
  * [กระจกและแคชที่กำหนดเอง](tutorial/installation.md#custom-mirrors-and-caches)
  * [วิธีแก้ปัญหาเบื้องต้น](tutorial/installation.md#troubleshooting)
* Versiones Electron & Comentarios de desarrollador
  * [Versiebeleidid](tutorial/electron-versioning.md)
  * [Calendrier de release9996](tutorial/electron-timelines.md)
  * [525678310522769](tutorial/app-feedback-program.md)
* [Packaging App Source Code with asar](tutorial/application-packaging.md)
  * [การสร้างคลังเก็บอาซาร์](tutorial/application-packaging.md#generating-asar-archives)
  * [การใช้ asar Archives](tutorial/application-packaging.md#using-asar-archives)
  * [ข้อจำกัด](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [การเพิ่มไฟล์ที่คลายการบีบอัดไปยัง asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Testing Widevine CDM](tutorial/testing-widevine-cdm.md)
* [การใช้ปลั้กอิน Pepper Flash](tutorial/using-pepper-flash-plugin.md)

---

* [อภิธานศัพท์](glossary.md)

## การอ้างอิง API

* [บทย่อ](api/synopsis.md)
* [กระบวนการของวัตถุ](api/process.md)
* [Supported Command Line Switches](api/command-line-switches.md)
* [ตัวแปรสภาพแวดล้อม](api/environment-variables.md)
* [Supporto Estensioni Chrome](api/extensions.md)
* [ทำลายการเปลี่ยนแปลง API](breaking-changes.md)

### องค์ประกอบที่กำหนดเอง (Automatic Translation)

* [ออบเจค `File`](api/file-object.md)
* [Tag `<webview>`](api/webview-tag.md)
* [Funkcja `window.open`](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

### โมดูลสำหรับกระบวนการหลัก:

* [app](api/app.md)
* [ตัวอัพเดทอัตโนมัติ](api/auto-updater.md)
* [มุมมองเบราว์เซอร์](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [กล่องโต้ตอบ](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [ในการซื้อแอป](api/in-app-purchase.md)
* [ipc หลัก](api/ipc-main.md)
* [เมนู](api/menu.md)
* [รายการบนเมนู](api/menu-item.md)
* [เน็ต](api/net.md)
* [netLog](api/net-log.md)
* [Pemberitahuan](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [โพรโทคอล](api/protocol.md)
* [หน้าจอ](api/screen.md)
* [เซสชั่น](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [ถาด](api/tray.md)
* [webContents](api/web-contents.md)

### โมดูลสำหรับกระบวนการเรนเดอร์ (หน้าเว็บ):

* [เดสก์ท็อปจับภาพ](api/desktop-capturer.md)
* [ipc โหมดแสดงภาพ](api/ipc-renderer.md)
* [ระยะไกล](api/remote.md)
* [เว็บเฟรม](api/web-frame.md)

### โมดูลสำหรับกระบวนการทั้งสอง:

* [คลิปบอร์ด](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [เชลล์](api/shell.md)

## การพัฒนา

ดู [development/README.md](development/README.md)
