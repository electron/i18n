# الدليل الرسمي

الرجاء التأكد من استخدام المستندات التي تطابق إصدار إلكترون الخاص بك. ينبغي أن يكون رقم الإصدار جزءا من عنوان الصفحة URL. اذا كان إصدار إلكترون الخاص بك لا يطابق الظاهر في رابط الصفحة، هذا يعني انك تستعرص دليل لا يتوافق مع اصدار إلكتروني لديك وهنالك احتمال بأن لا تتوافق التعليمات و API مع اصدار إلكترون الذي لديك. لاستعراض نسخة أقدم، يمكنك [تصفح الوسوم](https://github.com/electron/electron/tree/v1.4.0) في GitHub عن طريق الدخول على القائمة المنسدلة "Switch branches/tags" واختيار الوسم الذي يطابق اصدار إلكترون الذي لديك.

## الأسئلة الشائعة

هذه اسئلة شائعة يتم طرحها بشكل متكرر، الرجاء مراجعتها قبل ان طرح مسألة جديدة:

* [إلكترون - الاسئلة الشائعة](faq.md)

## الدليل الإرشادي والدروس

* [اعداد وتجهيز بيئة التطوير](tutorial/development-environment.md) 
  * [اعداد نظام تشغيل الماك (macOS)](tutorial/development-environment.md#setting-up-macos)
  * [اعداد نظام الويندوز (Windows)](tutorial/development-environment.md#setting-up-windows)
  * [اعداد نظام لينكس (Linux)](tutorial/development-environment.md#setting-up-linux)
  * [اختيار محرر الكود](tutorial/development-environment.md#a-good-editor)
* [انشاء تطبيقك الأول](tutorial/first-app.md) 
  * [تنصيب إلكترون (Electron)](tutorial/first-app.md#installing-electron)
  * [اسلوب تطوير إلكترون باختصار](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [تشغيل تطبيقك الأول](tutorial/first-app.md#running-your-app)
* [Boilerplates and CLIs](tutorial/boilerplates-and-clis.md) 
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Other Tools and Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Application Architecture](tutorial/application-architecture.md) 
  * [Main and Renderer Processes](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Using Electron's APIs](tutorial/application-architecture.md#using-electron-apis)
  * [Using Node.js APIs](tutorial/application-architecture.md#using-nodejs-apis)
  * [Using Native Node.js Modules](tutorial/using-native-node-modules.md)
* Adding Features to Your App 
  * [Notifications](tutorial/notifications.md)
  * [Recent Documents](tutorial/desktop-environment-integration.md#recent-documents)
  * [Application Progress](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/macos-dock.md)
  * [Custom Windows Taskbar](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [Keyboard Shortcuts](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detection](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
* [Accessibility](tutorial/accessibility.md) 
  * [سبيكترون](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Enabling Accessibility](tutorial/accessibility.md#enabling-accessibility)
* [Testing and Debugging](tutorial/application-debugging.md) 
  * [Debugging the Main Process](tutorial/debugging-main-process.md)
  * [Using Selenium and WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testing on Headless CI Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools Extension](tutorial/devtools-extension.md)
  * [Automated Testing with a Custom Driver](tutorial/automated-testing-with-a-custom-driver.md)
* Packaging 
  * [Code Signing](tutorial/code-signing.md)
* [Distribution](tutorial/application-distribution.md) 
  * [Support](tutorial/support.md)
  * [Mac App ore](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Security](tutorial/security.md) 
  * [Reporting Security Issues](tutorial/security.md#reporting-security-issues)
  * [Chromium Security Issues and Upgrades](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron Security Warnings](tutorial/security.md#electron-security-warnings)
  * [Security Checklist](tutorial/security.md#checklist-security-recommendations)
* [Updates](tutorial/updates.md) 
  * [Deploying an Update Server](tutorial/updates.md#deploying-an-update-server)
  * [Implementing Updates in Your App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Applying Updates](tutorial/updates.md#applying-updates)

## دروس مفصلة

هذه دروس مفصلة للمواضيع التي تمت مناقشتها في الدليل بالأعلى.

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
* [In Detail: Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [In Detail: Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Offscreen Rendering](tutorial/offscreen-rendering.md)

* * *

* [Glossary of Terms](glossary.md)

## مراجع API

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Supported Chrome Command Line Switches](api/chrome-command-line-switches.md)
* [Environment Variables](api/environment-variables.md)
* [Breaking API Changes](api/breaking-changes.md)

### عناصر DOM مخصصة:

* [`File` Object](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Function](api/window-open.md)

### وحدات للـ Main Process:

* [app (التطبيق)](api/app.md)
* [autoUpdater (التحديث التلقائي)](api/auto-updater.md)
* [BrowserView (عرض المتصفح)](api/browser-view.md)
* [BrowserWindow (نوافذ المتصفح)](api/browser-window.md)
* [contentTracing (تتبع المحتوى)](api/content-tracing.md)
* [dialog (الحوار)](api/dialog.md)
* [globalShortcut (اختصار عالمي)](api/global-shortcut.md)
* [inAppPurchase (مشتريات داخل التطبيق)](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu (القائمة)](api/menu.md)
* [MenuItem (عنصر في القائمة)](api/menu-item.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
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

اطلع على <development/README.md>