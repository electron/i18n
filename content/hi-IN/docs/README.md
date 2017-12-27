कृपया सुनिश्चित करें कि आप अपने इलेक्ट्रॉन संस्करण से मेल खाने वाले दस्तावेज़ों का उपयोग कर रहे हैं । संस्करण संख्या, पेज यूआरएल का एक भाग होना चाहिए । यदि ऐसा नहीं है, तो शायद आप एक ऐसी विकास शाखा के दस्तावेज़ीकरण का इस्तेमाल कर रहे हैं, जिसमे मौजूद ऐपीआई परिवर्तन आपके इलेक्ट्रॉन संस्करण के अनुकूल नहीं हैं | दस्तावेज़ीकरण के पुराने संस्करण देखने के लिए, आप गिटहब पर [टैग के द्वारा ढूंढ](https://github.com/electron/electron/tree/v1.4.0) सकते हैं | इसके लिए आप "स्विच ब्रांचेज/टैग्स" ड्रापडाउन खोलें और उस टैग को चुनें जो आपके संस्करण से मिलता है|

## अक्सर पूछे जाने वाले सवाल

यह वे सवाल हैं जो की अक्सर पूछे जाते हैं | नयी समस्या जमा करने से पहले इन्हें जरूर पढ़ें:

* [इलेक्ट्रॉन के अकसर पूछे जाने वाले सवाल](faq.md)

## गाइड्स

* [शब्दों की शब्दावली](glossary.md)
* [समर्थित प्लेटफ़ॉर्म](tutorial/supported-platforms.md)
* [सुरक्षा](tutorial/security.md)
* [संस्करण](tutorial/electron-versioning.md)
* [एप्लीकेशन वितरण](tutorial/application-distribution.md)
* [मैक एप्प स्टोर सबमिशन गाइड](tutorial/mac-app-store-submission-guide.md)
* [विंडोज स्टोर गाइड](tutorial/windows-store-guide.md)
* [एप्लीकेशन पैकेजिंग](tutorial/application-packaging.md)
* [मूल नोड मोड्यूल का इस्तेमाल](tutorial/using-native-node-modules.md)
* [मुख्य प्रक्रिया दोषमुक्ति](tutorial/debugging-main-process.md)
* [सेलेनियम और वेबड्राईवर का इस्तेमाल](tutorial/using-selenium-and-webdriver.md)
* [डेवटूल्स एक्सटेंशन](tutorial/devtools-extension.md)
* [पेप्पर फ़्लैश प्लगइन का इस्तेमाल](tutorial/using-pepper-flash-plugin.md)
* [वाइडवाइन सीडीएम प्लगइन का इस्तेमाल](tutorial/using-widevine-cdm-plugin.md)
* [हेडलेस सीआई सिस्टम (ट्रेविस, जेनकिंस) पर परिक्षण](tutorial/testing-on-headless-ci.md)
* [ऑफस्क्रीन रेंडरिंग](tutorial/offscreen-rendering.md)
* [Keyboard Shortcuts](tutorial/keyboard-shortcuts.md)
* [Updating Applications](tutorial/updates.md)

## Tutorials

* [Quick Start](tutorial/quick-start.md)
* [Desktop Environment Integration](tutorial/desktop-environment-integration.md)
* [Online/Offline Event Detection](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Native Notifications](tutorial/notifications.md)

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