# الدليل الرسمي

رجاءا تأكد من أنك تستخدم الوثائق التي تطابق إصدارك من Electron. ينبغي أن يكون رقم الإصدار جزءا من عنوان الصفحة URL. اذا كان إصدار إلكترون الخاص بك لا يطابق الظاهر في رابط الصفحة، هذا يعني انك تستعرص دليل لا يتوافق مع اصدار إلكتروني لديك وهنالك احتمال بأن لا تتوافق التعليمات و API مع اصدار إلكترون الذي لديك. لاستعراض نسخة أقدم، يمكنك [تصفح الوسوم](https://github.com/electron/electron/tree/v1.4.0) في GitHub عن طريق الدخول على القائمة المنسدلة "Switch branches/tags" واختيار الوسم الذي يطابق اصدار إلكترون الذي لديك.

## الأسئلة الشائعة

There are questions that are asked quite often. Check this out before creating an issue:

* [إلكترون - الاسئلة الشائعة](faq.md)

## الدليل الإرشادي والدروس

* [اعداد وتجهيز بيئة التطوير](tutorial/development-environment.md)
  * [اعداد نظام تشغيل الماك (macOS)](tutorial/development-environment.md#setting-up-macos)
  * [اعداد نظام الويندوز (Windows)](tutorial/development-environment.md#setting-up-windows)
  * [اعداد نظام لينكس (Linux)](tutorial/development-environment.md#setting-up-linux)
  * [اختيار محرر الكود](tutorial/development-environment.md#a-good-editor)
* [انشاء تطبيقك الأول](tutorial/first-app.md)
  * [تثبيت إكترون](tutorial/first-app.md#installing-electron)
  * [تطوير إلكترون باختصار](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [تشغيل تطبيقك](tutorial/first-app.md#running-your-app)
* [Boilerplates و CLIs](tutorial/boilerplates-and-clis.md)
  * [Boilerplate مقابل CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [أدوات أخرى و Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [معمارية التطبيق](tutorial/application-architecture.md)
  * [العمليات الرئيسية والرابط](tutorial/application-architecture.md#main-and-renderer-processes)
  * [باستخدام إلكترون APIs](tutorial/application-architecture.md#using-electron-apis)
  * [باستخدام Node.js APIs](tutorial/application-architecture.md#using-nodejs-apis)
  * [باستخدام Native Node.js Modules](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
* إضافة ميزات إلى تطبيقك
  * [الإشعارات](tutorial/notifications.md)
  * [المستندات الأخيرة](tutorial/recent-documents.md)
  * [سير الترجمة](tutorial/progress-bar.md)
  * [خصص شريط المهام](tutorial/macos-dock.md)
  * [خصص شريط مهام الويندوز](tutorial/windows-taskbar.md)
  * [خصص إجراءات سطح المكتب المخصص لـ Linux](tutorial/linux-desktop-actions.md)
  * [میانبرهای صفحه کلید](tutorial/keyboard-shortcuts.md)
  * [إكتشاف المتصل/ غير المتصل](tutorial/online-offline-events.md)
  * [الملف الممثّل في نافذة المستعرض في نظام ماك أو إس](tutorial/represented-file.md)
  * [سحب الملفات الأصلية & Drop&](tutorial/native-file-drag-drop.md)
  * [Offscreen Rendering](tutorial/offscreen-rendering.md)
  * [Supporting macOS Dark Mode](tutorial/mojave-dark-mode-guide.md)
  * [Web embeds in Electron](tutorial/web-embeds.md)
* [إمكانية الوصول](tutorial/accessibility.md)
  * [سبيكترون](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [تمكين امكانيات الوصول](tutorial/accessibility.md#enabling-accessibility)
* [اختبار وتصحيح](tutorial/application-debugging.md)
  * [تصحيح عملية الرئيسية](tutorial/debugging-main-process.md)
  * [Visual Studio Code에서 메인 프로세스 디버깅하기](tutorial/debugging-main-process-vscode.md)
  * [Using Selenium and WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testing on Headless CI Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools Extension](tutorial/devtools-extension.md)
  * [الاختبار الآلي مع برنامج تشغيل مخصص](tutorial/automated-testing-with-a-custom-driver.md)
* [التوزيع](tutorial/application-distribution.md)
  * [Supported Platforms](tutorial/support.md#supported-platforms)
  * [توقيع الكود](tutorial/code-signing.md)
  * [Mac App ore](tutorial/mac-app-store-submission-guide.md)
  * [متجر تطبيقات Windows](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Security](tutorial/security.md)
  * [الإبلاغ عن المشكلات الأمنية](tutorial/security.md#reporting-security-issues)
  * [المسائل الأمنية المتعلقة بالكروم وتحديثاته](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [تحذيرات أمنية إلكترون](tutorial/security.md#electron-security-warnings)
  * [قائمة التحقق من الأمان](tutorial/security.md#checklist-security-recommendations)
* [التحديثات](tutorial/updates.md)
  * [نشر خادم التحديث](tutorial/updates.md#deploying-an-update-server)
  * [تنفيذ التحديثات في تطبيقك](tutorial/updates.md#implementing-updates-in-your-app)
  * [تطبيق التحديثات](tutorial/updates.md#applying-updates)
* [Getting Support](tutorial/support.md)

## دروس مفصلة

هذه دروس مفصلة للمواضيع التي تمت مناقشتها في الدليل بالأعلى.

* [تثبيت إكترون](tutorial/installation.md)
  * [بروكسيات](tutorial/installation.md#proxies)
  * [مرايا مخصصة ومخابئ](tutorial/installation.md#custom-mirrors-and-caches)
  * [اكتشاف الأخطاء وإصلاحها](tutorial/installation.md#troubleshooting)
*
  * [Versioning Policy](tutorial/electron-versioning.md)
  * [Release Timelines](tutorial/electron-timelines.md)
  * [برنامج ملاحظات بيتا](tutorial/app-feedback-program.md)
* [Packaging App Source Code with asar](tutorial/application-packaging.md)
  * [توليد ملفات asar](tutorial/application-packaging.md#generating-asar-archives)
  * [استخدام أرشيفات asar](tutorial/application-packaging.md#using-asar-archives)
  * [القيود](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [إضافة ملفات غير مخزنة إلى أرشيفات asar](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [اختبار Widevine CDM](tutorial/testing-widevine-cdm.md)
* [Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)

---

* [قاموس المصطلحات](glossary.md)

## مراجع API

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Supported Command Line Switches](api/command-line-switches.md)
* [Environment Variables](api/environment-variables.md)
* [دعم إضافات Chrome](api/extensions.md)
* [كسر تغييرات API](breaking-changes.md)

### عناصر DOM مخصصة:

* [`File` Object](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Function](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

### وحدات للـ Main Process:

* [app (التطبيق)](api/app.md)
* [autoUpdater (التحديث التلقائي)](api/auto-updater.md)
* [BrowserView (عرض المتصفح)](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing (تتبع المحتوى)](api/content-tracing.md)
* [dialog (الحوار)](api/dialog.md)
* [globalShortcut (اختصار عالمي)](api/global-shortcut.md)
* [inAppPurchase (مشتريات داخل التطبيق)](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu (القائمة)](api/menu.md)
* [MenuItem (عنصر في القائمة)](api/menu-item.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
* [Notification (الإشعارات)](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [شاشة](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [شريط اللمس](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

### الوحدات النمطية لعملية التقديم (صفحة ويب):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### الوحدات لكلا العمليتين:

* [الحافظة](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## التطوير

See [development/README.md](development/README.md)
