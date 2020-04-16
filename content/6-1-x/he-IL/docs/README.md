# Official Guides

אנא שים לב שאתה משתמש בתיעוד שמתאים לגרסאת Electron שלך. The version number should be a part of the page URL. אם מספר הגירסה אינו נמצא בכתובת העמוד, אתה כנראה צופה בתיעוד של גרסה בפיתוח אשר עשויה להכיל שינויי ממשק שאינם מתאימים לגרסת האלקטרון שברשותך. לצפייה בגרסאות ישנות יותר של התיעוד, אתה יוכל [ לחפש לפי גירסה](https://github.com/electron/electron/tree/v1.4.0) ב-Github ולבחור בתג שמתאים לגירסה שלך בתפריט "Switch branches/tags".

## שאלות נפוצות

There are questions that are asked quite often. Check this out before creating an issue:

* [Electron שאלות נפוצות](faq.md)

## מדריכים וערכות לימוד

* [הגדרת סביבת הפיתוח](tutorial/development-environment.md)
  * [הגדרת macOS](tutorial/development-environment.md#setting-up-macos)
  * [הגדרת Windows](tutorial/development-environment.md#setting-up-windows)
  * [הגדרת לינוקס](tutorial/development-environment.md#setting-up-linux)
  * [בחירת העורך](tutorial/development-environment.md#a-good-editor)
* [יצירת האפליקציה הראשונה שלך](tutorial/first-app.md)
  * [התקנת Electron](tutorial/first-app.md#installing-electron)
  * [פיתוח ב-Electron בקצרה](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [הפעלת האפליקציה שלך](tutorial/first-app.md#running-your-app)
* [תבניות וממשקי שורת הפקודות (CLI)](tutorial/boilerplates-and-clis.md)
  * [השוואה בין תבניות ובין ממשקי שורת הפקודות](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [כלים ותבניות נוספים](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [ארכיטקטורת יישום](tutorial/application-architecture.md)
  * [התהליך הראשי ותהליך הייצוג](tutorial/application-architecture.md#main-and-renderer-processes)
  * [שימוש בפעולות ה־API של Electron](tutorial/application-architecture.md#using-electron-apis)
  * [שימוש בפעולות ה־API של Node.js](tutorial/application-architecture.md#using-nodejs-apis)
  * [שימוש במודולים טבעיים של Node.js](tutorial/using-native-node-modules.md)
* הוספת תכונות לאפליקציה שלך
  * [התראות](tutorial/notifications.md)
  * [מסמכים אחרונים](tutorial/desktop-environment-integration.md#recent-documents)
  * [התקדמות התרגום](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/macos-dock.md)
  * [שורת משימות מותאמת אישית של Windows](tutorial/windows-taskbar.md)
  * [פעולות מותאמות אישית בסביבת לינוק לשולחן עבודה](tutorial/linux-desktop-actions.md)
  * [קיצורי מקלדת](tutorial/keyboard-shortcuts.md)
  * [זיהוי מקוון/לא מקוון](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [גרירה & נפילה מובנית](tutorial/native-file-drag-drop.md)
* [נגישות](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [איפשור נגישות](tutorial/accessibility.md#enabling-accessibility)
* [בדיקה ואיתור באגים](tutorial/application-debugging.md)
  * [איתור באגים בתהליך העיקרי](tutorial/debugging-main-process.md)
  * [שימוש ב-Selenium ו-WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testing on Headless CI Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools Extension](tutorial/devtools-extension.md)
  * [בדיקות אוטומטיות עם Driver מותאם אישית](tutorial/automated-testing-with-a-custom-driver.md)
* אריזה
  * [חתימה על קוד](tutorial/code-signing.md)
* [הפצה](tutorial/application-distribution.md)
  * [תמיכה](tutorial/support.md)
  * [חנות היישומים של Mac](tutorial/mac-app-store-submission-guide.md)
  * [חנות Windows](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [אבטחה](tutorial/security.md)
  * [דיווח על פרצות אבטחה](tutorial/security.md#reporting-security-issues)
  * [Chromium Security Issues and Upgrades](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [אזהרות אבטחה של Electron](tutorial/security.md#electron-security-warnings)
  * [Security Checklist](tutorial/security.md#checklist-security-recommendations)
* [עדכונים](tutorial/updates.md)
  * [הטמעת שרת עדכונים](tutorial/updates.md#deploying-an-update-server)
  * [הטמעת עדכונים ביישום שלך](tutorial/updates.md#implementing-updates-in-your-app)
  * [החלת עדכונים](tutorial/updates.md#applying-updates)

## מדריכים מפורטים

אלו מדריכים פרטניים שנועדים לפרט על נושאים שנדונו בקווים המנחים שלהלן.

* [בפירוט מוגבר: התקנת Electron](tutorial/installation.md)
  * [מתווכים](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [פתרון בעיות](tutorial/installation.md#troubleshooting)
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
* [Offscreen Rendering](tutorial/offscreen-rendering.md)

---

* [Glossary of Terms](glossary.md)

## API References

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Supported Chrome Command Line Switches](api/chrome-command-line-switches.md)
* [משתני סביבה](api/environment-variables.md)
* [שינויים השוברים את ה־API](api/breaking-changes.md)

### אלמנטי DOM מותאמים אישית:

* [`קובץ` Object](api/file-object.md)
* [`<webview>` תג](api/webview-tag.md)
* [`window.open` פונקציה](api/window-open.md)

### מודלים עבור ה־Main Process:

* [יישומים](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [דיאלוג](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [תפריט](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
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

## פיתוח

See [development/README.md](development/README.md)
