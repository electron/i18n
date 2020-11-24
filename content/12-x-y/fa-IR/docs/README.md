# راهنمای رسمی

Please make sure that you use the documents that match your Electron version. شماره نسخه باید بخشی از URL صفحه باشد. اگر اینطور نمی باشد، شما احتمالا از مستندات گروه توسعه که حاوی تغییرات API است و سازگار با نسخه ای الکترونی شما نیست استفاده میکنید. برای مشاهده قدیمی تر نسخه های اسناد ، شما می توانید [کاوش بنا بر برچسب](https://github.com/electron/electron/tree/v1.4.0) در GitHub با باز کردن "تغییر شعب/برچسب ها" کشویی و انتخاب برچسب که با نسخه شما منطبق است.

## اجازه دادن به

There are questions that are asked quite often. Check this out before creating an issue:

* [Electron FAQ](faq.md)

## راهنماهای و آموزش

### Quickstart

* [Quick Start Guide](tutorial/quick-start.md)
  * [Prerequisites](tutorial/quick-start.md#prerequisites)
  * [Create a basic application](tutorial/quick-start.md#create-a-basic-application)
  * [Run your application](tutorial/quick-start.md#run-your-application)
  * [Package and distribute the application](tutorial/quick-start.md#package-and-distribute-the-application)

### Learning the basics

* [Electron's Process Model](tutorial/quick-start.md#application-architecture)
  * [فرآیندهای اصلی و رندرینگ](tutorial/quick-start.md#main-and-renderer-processes)
  * [Electron API](tutorial/quick-start.md#electron-api)
  * [Node.js API](tutorial/quick-start.md#nodejs-api)
* اضافه کردن ویژگی ها به برنامه شما
  * [Notifications](tutorial/notifications.md)
  * [اسناد اخیر](tutorial/recent-documents.md)
  * [پیشرفت برنامه](tutorial/progress-bar.md)
  * [منوی داک سفارشی](tutorial/macos-dock.md)
  * [وظیفه سفارشی سازی ویندوز](tutorial/windows-taskbar.md)
  * [عملیات سفارشی لینوکس دسکتاپ](tutorial/linux-desktop-actions.md)
  * [میانبرهای صفحه کلید](tutorial/keyboard-shortcuts.md)
  * [ تشخیص  آفلاین / آنلاین](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
  * [Offscreen Rendering](tutorial/offscreen-rendering.md)
  * [Dark Mode](tutorial/dark-mode.md)
  * [Web embeds in Electron](tutorial/web-embeds.md)
* [Boilerplates   و همچنین CLIs ](tutorial/boilerplates-and-clis.md)
  * [Boilerplate در مقابل CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [Aliakbar](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [سایر ابزارها و Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)

### Advanced steps

* معماری برنامه
  * [راه اندازی لینوکس](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
  * [Security Strategies](tutorial/security.md)
* [Accessibility](tutorial/accessibility.md)
  * [Manually Enabling Accessibility Features](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [تست و اشکال زدایی](tutorial/application-debugging.md)
  * [Debugging the Main Process](tutorial/debugging-main-process.md)
  * [Debugging with Visual Studio Code](tutorial/debugging-vscode.md)
  * [استفاده از Selenium و WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [تست سیستم های  CI (Travis، Jenkins)](tutorial/testing-on-headless-ci.md)
  * [افزونه DevTools](tutorial/devtools-extension.md)
  * [تست خودکار با یک درایور سفارشی](tutorial/automated-testing-with-a-custom-driver.md)
* [توضیع](tutorial/application-distribution.md)
  * [Supported Platforms](tutorial/support.md#supported-platforms)
  * [Code Signing](tutorial/code-signing.md)
  * [فروشگاه Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [فروشگاه ویندوز](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [به روزرسانی ها](tutorial/updates.md)
  * [استقرار یک سرور به روز رسانی](tutorial/updates.md#deploying-an-update-server)
  * [Implementing Updates in Your App](tutorial/updates.md#implementing-updates-in-your-app)
  * [اعمال بروزرسانی](tutorial/updates.md#applying-updates)
* [Getting Support](tutorial/support.md)

## آموزش های مفصل

These individual tutorials expand on topics discussed in the guide above.

* [نصب الکترون Electron](tutorial/installation.md)
  * [پروکسی ها](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [عیب یابی](tutorial/installation.md#troubleshooting)
* Electron Releases & Developer Feedback
  * [Versioning Policy](tutorial/electron-versioning.md)
  * [Release Timelines](tutorial/electron-timelines.md)
* [Packaging App Source Code with asar](tutorial/application-packaging.md)
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Using asar Archives](tutorial/application-packaging.md#using-asar-archives)
  * [محدودیت ها](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Testing Widevine CDM](tutorial/testing-widevine-cdm.md)

---

* [Glossary of Terms](glossary.md)

## API References

* [Synopsis](api/synopsis.md)
* [شیء فرآیند](api/process.md)
* [Supported Command Line Switches](api/command-line-switches.md)
* [Environment Variables](api/environment-variables.md)
* [Chrome Extensions Support](api/extensions.md)
* [Breaking API Changes](breaking-changes.md)

### عناصر سفارشی:

* [`فایل` شیء](api/file-object.md)
* [`<webview>` برچسب](api/webview-tag.md)
* [`window.open` Function](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

### Modules for the Main Process:

* [برنامه](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [فهرست](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
* [nativeTheme](api/native-theme.md)
* [اعلان](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [پروتکل](api/protocol.md)
* [صفحه نمایش](api/screen.md)
* [جلسه](api/session.md)
* [تنظیمات سیستم](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### Modules for the Renderer Process (Web Page):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [از راه دور](api/remote.md)
* [webFrame](api/web-frame.md)

### Modules for Both Processes:

* [کلیپ بورد](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## توسعه

See [development/README.md](development/README.md)
