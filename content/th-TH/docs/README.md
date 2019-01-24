# คำแนะนำ

โปรดแน่ใจว่า คุณใช้เอกสารที่ตรงกับรุ่นของอิเล็กตรอน หมายเลขเวอร์ชันควรเป็นส่วนหนึ่งของ URL ถ้าไม่ บางทีคุณกำลังใช้เอกสารในส่วนที่ยังมีการพัฒนาอยู่ซึ่งอาจจะมีการเปลี่ยนแปลง API ที่ไม่ตรงกับรุ่นของ Election ที่คุณกำลังใช้ เพื่อดูเอกสารรุ่นเก่า คุณสามารถ[เรียกดูตาม tag](https://github.com/electron/electron/tree/v1.4.0)บน GitHub โดยเลือกที่เมนู"เปลี่ยน branches/tags" และเลือก tag ที่ตรงกับรุ่นของคุณ

## คำถามที่พบบ่อย

มีหลายคำถามที่ถูกถามบ่อยครั้ง กรุณาค้นหาที่นี่ก่อนที่จะตั้ง issue:

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
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Other Tools and Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [โครงสร้างของแอพพลิเคชั่น](tutorial/application-architecture.md) 
  * [ขั้นตอนหลักและขั้นตอนการเรนเดอร์](tutorial/application-architecture.md#main-and-renderer-processes)
  * [วิธีการใช้อินเตอร์เฟสของ Electron](tutorial/application-architecture.md#using-electron-apis)
  * [วิธีการใช้อินเตอร์เฟสของ Node.js](tutorial/application-architecture.md#using-nodejs-apis)
  * [วิธีการใช้เนทีฟโมดูลของ Node.js](tutorial/using-native-node-modules.md)
* การเพิ่มฟีสเจอร์บนแอพของคุณ 
  * [การแจ้งเตือน](tutorial/notifications.md)
  * [บทความปัจจุบัน](tutorial/desktop-environment-integration.md#recent-documents)
  * [ความคืบหน้าการแปลภาษา](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/macos-dock.md)
  * [Custom Windows Taskbar](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [ปุ่มลัดแป้นพิมพ์](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detection](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
* [Accessibility](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Enabling Accessibility](tutorial/accessibility.md#enabling-accessibility)
* [Testing and Debugging](tutorial/application-debugging.md) 
  * [Debugging the Main Process](tutorial/debugging-main-process.md)
  * [การใช้ Selenium และ WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [การทดสอบบนระบบ Headless CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [ส่วนขยายของ DevTools](tutorial/devtools-extension.md)
  * [Automated Testing with a Custom Driver](tutorial/automated-testing-with-a-custom-driver.md)
* Packaging 
  * [Code Signing](tutorial/code-signing.md)
* [Distribution](tutorial/application-distribution.md) 
  * [Support](tutorial/support.md)
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

## รายละเอียดบทความสอน

บทความสอนแต่ละบทจะขยายความจากหัวข้อคำแนะนำข้างบน

* [In Detail: Installing Electron](tutorial/installation.md) 
  * [Proxies](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Troubleshooting](tutorial/installation.md#troubleshooting)
* [In Detail: Electron's Versioning Scheme](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Stabilization Branches](tutorial/electron-versioning.md#stabilization-branches)
  * [Beta Releases and Bug Fixes](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [In Detail: Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Using asar Archives](tutorial/application-packaging.md#using-asar-archives)
  * [Limitations](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [In Detail: Testing Widevine CDM](tutorial/testing-widevine-cdm.md)
* [In Detail: Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [การเรนเดอร์แบบ Offscreen](tutorial/offscreen-rendering.md)

* * *

* [อภิธานศัพท์](glossary.md)

## การอ้างอิง API

* [บทย่อ](api/synopsis.md)
* [กระบวนการของวัตถุ](api/process.md)
* [รองรับการสลับคำสั่งของ Chrome](api/chrome-command-line-switches.md)
* [ตัวแปรสภาพแวดล้อม](api/environment-variables.md)
* [Breaking API Changes](api/breaking-changes.md)

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
* [netLog](api/net-log.md)
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

See <development/README.md>