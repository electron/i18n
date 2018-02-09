الرجاء التأكد من استخدام المستندات التي تطابق إصدار إلكترون. ينبغي أن يكون رقم الإصدار جزءا من عنوان الصفحة URL. If it's not, you are probably using the documentation of a development branch which may contain API changes that are not compatible with your Electron version. To view older versions of the documentation, you can [browse by tag](https://github.com/electron/electron/tree/v1.4.0) on GitHub by opening the "Switch branches/tags" dropdown and selecting the tag that matches your version.

## الأسئلة الشائعة

There are questions that are asked quite often. Check this out before creating an issue:

* [الأسئلة المتداولة حول إلكترون](faq.md)

## الأدلة

* [Glossary of Terms](glossary.md)
* [Supported Platforms](tutorial/supported-platforms.md)
* [Security](tutorial/security.md)
* [Versioning](tutorial/electron-versioning.md)
* [Application Distribution](tutorial/application-distribution.md)
* [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md)
* [Windows Store Guide](tutorial/windows-store-guide.md)
* [دليل سنابكرافت](tutorial/snapcraft-guide.md)
* [Application Packaging](tutorial/application-packaging.md)
* [Using Native Node Modules](tutorial/using-native-node-modules.md)
* [Debugging Main Process](tutorial/debugging-main-process.md)
* [Using Selenium and WebDriver](tutorial/using-selenium-and-webdriver.md)
* [DevTools Extension](tutorial/devtools-extension.md)
* [Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Testing on Headless CI Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Offscreen Rendering](tutorial/offscreen-rendering.md)
* [Keyboard Shortcuts](tutorial/keyboard-shortcuts.md)
* [Updating Applications](tutorial/updates.md)

## دروس

* [Quick Start](tutorial/quick-start.md)
* [Desktop Environment Integration](tutorial/desktop-environment-integration.md)
* [Online/Offline Event Detection](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Native Notifications](tutorial/notifications.md)

## مراجع API

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Supported Chrome Command Line Switches](api/chrome-command-line-switches.md)
* [Environment Variables](api/environment-variables.md)

### عناصر DOM مخصصة:

* [`File` Object](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Function](api/window-open.md)

### وحدات للعملية الرئيسية:

* [تطبيق](api/app.md)
* [تحديث تلقائي](api/auto-updater.md)
* [عرض المتصفح](api/browser-view.md)
* [نوافذ المتصفح](api/browser-window.md)
* [تتبع المحتوى](api/content-tracing.md)
* [الحوار](api/dialog.md)
* [اختصار عالمي](api/global-shortcut.md)
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

### الوحدات النمطية لعملية التقديم (صفحة ويب):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### الوحدات النمطية لكل من العمليات:

* [الحافظة](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [شاشة](api/screen.md)
* [صدفة](api/shell.md)

## التطوير

* [Coding Style](development/coding-style.md)
* [Using clang-format on C++ Code](development/clang-format.md)
* [اختبار](development/testing.md)
* [بنية الدليل التعليمات البرمجية المصدر](development/source-code-directory-structure.md)
* [Technical Differences to NW.js (formerly node-webkit)](development/atom-shell-vs-node-webkit.md)
* [نظرة عامة حول بناء نظام](development/build-system-overview.md)
* [Build Instructions (macOS)](development/build-instructions-osx.md)
* [Build Instructions (Windows)](development/build-instructions-windows.md)
* [Build Instructions (Linux)](development/build-instructions-linux.md)
* [Debug Instructions (macOS)](development/debugging-instructions-macos.md)
* [Debug Instructions (Windows)](development/debug-instructions-windows.md)
* [Setting Up Symbol Server in debugger](development/setting-up-symbol-server.md)
* [Documentation Styleguide](styleguide.md)
* [ترقية الكروميوم](development/upgrading-chromium.md)
* [تطوير الكروميوم](development/chromium-development.md)
* [تطوير V8](development/v8-development.md)