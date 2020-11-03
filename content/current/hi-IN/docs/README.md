# Official Guides

कृपया सुनिश्चित करें कि आप अपने इलेक्ट्रॉन संस्करण से मेल खाने वाले दस्तावेज़ों का उपयोग कर रहे हैं । संस्करण संख्या, पेज यूआरएल का एक भाग होना चाहिए । यदि ऐसा नहीं है, तो शायद आप एक ऐसी विकास शाखा के दस्तावेज़ीकरण का इस्तेमाल कर रहे हैं, जिसमे मौजूद ऐपीआई परिवर्तन आपके इलेक्ट्रॉन संस्करण के अनुकूल नहीं हैं | दस्तावेज़ीकरण के पुराने संस्करण देखने के लिए, आप गिटहब पर [टैग के द्वारा ढूंढ](https://github.com/electron/electron/tree/v1.4.0) सकते हैं | इसके लिए आप "स्विच ब्रांचेज/टैग्स" ड्रापडाउन खोलें और उस टैग को चुनें जो आपके संस्करण से मिलता है|

## अक्सर पूछे जाने वाले सवाल

There are questions that are asked quite often. Check this out before creating an issue:

* [इलेक्ट्रॉन के अकसर पूछे जाने वाले सवाल](faq.md)

## Guides and Tutorials

* [Setting up the Development Environment](tutorial/development-environment.md)
  * [मैकओएस का सेटअप करना](tutorial/development-environment.md#setting-up-macos)
  * [विंडोज का सेटअप करना](tutorial/development-environment.md#setting-up-windows)
  * [लिनक्स का सेटअप करना](tutorial/development-environment.md#setting-up-linux)
  * [Choosing an Editor](tutorial/development-environment.md#a-good-editor)
* [Creating your First App](tutorial/quick-start.md)
  * [पूर्व अपेक्षाएं](tutorial/quick-start.md#prerequisites)
  * [Create a basic application](tutorial/quick-start.md#create-a-basic-application)
  * [Package and distribute the application](tutorial/quick-start.md#package-and-distribute-the-application)
* [Boilerplates and CLIs](tutorial/boilerplates-and-clis.md)
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Other Tools and Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Application Architecture](tutorial/quick-start.md#application-architecture)
  * [Main and Renderer Processes](tutorial/quick-start.md#main-and-renderer-processes)
  * [Electron API](tutorial/quick-start.md#electron-api)
  * [Node.js API](tutorial/quick-start.md#nodejs-api)
  * [Using Native Node.js Modules](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
* Adding Features to Your App
  * [नोटीफीकेशनस](tutorial/notifications.md)
  * [Recent Documents](tutorial/recent-documents.md)
  * [Application Progress](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/macos-dock.md)
  * [Custom Windows Taskbar](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [कीबोर्ड शोर्टकट्स](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detection](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
  * [ऑफस्क्रीन रेंडरिंग](tutorial/offscreen-rendering.md)
  * [Dark Mode](tutorial/dark-mode.md)
  * [इलेक्ट्रॉन में वेब एम्बेड](tutorial/web-embeds.md)
* [Accessibility](tutorial/accessibility.md)
  * [स्पेकट्रॉन](tutorial/accessibility.md#spectron)
  * [डेवट्रॉन](tutorial/accessibility.md#devtron)
  * [Manually Enabling Accessibility Features](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Testing and Debugging](tutorial/application-debugging.md)
  * [Debugging the Main Process](tutorial/debugging-main-process.md)
  * [Debugging the Main Process with Visual Studio Code](tutorial/debugging-main-process-vscode.md)
  * [सेलेनियम और वेबड्राईवर का इस्तेमाल](tutorial/using-selenium-and-webdriver.md)
  * [हेडलेस सीआई सिस्टम (ट्रेविस, जेनकिंस) पर परिक्षण](tutorial/testing-on-headless-ci.md)
  * [डेवटूल्स एक्सटेंशन](tutorial/devtools-extension.md)
  * [Automated Testing with a Custom Driver](tutorial/automated-testing-with-a-custom-driver.md)
* [Distribution](tutorial/application-distribution.md)
  * [समर्थित प्लेटफ़ॉर्म](tutorial/support.md#supported-platforms)
  * [Code Signing](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [सुरक्षा](tutorial/security.md)
  * [सुरक्षा समस्याओं को रिपोर्ट करना](tutorial/security.md#reporting-security-issues)
  * [क्रोमियम सुरक्षा समस्यायें और अपग्रेडस](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron Security Warnings](tutorial/security.md#electron-security-warnings)
  * [Security Checklist](tutorial/security.md#checklist-security-recommendations)
* [Updates](tutorial/updates.md)
  * [Deploying an Update Server](tutorial/updates.md#deploying-an-update-server)
  * [Implementing Updates in Your App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Applying Updates](tutorial/updates.md#applying-updates)
* [Getting Support](tutorial/support.md)

## Detailed Tutorials

These individual tutorials expand on topics discussed in the guide above.

* [Installing Electron](tutorial/installation.md)
  * [Proxies](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [समस्या निवारण](tutorial/installation.md#troubleshooting)
* इलेक्ट्रॉन विज्ञप्ति & डेवलपर फीडबैक
  * [वर्जन नीति](tutorial/electron-versioning.md)
  * [टाइमलाइन जारी करें](tutorial/electron-timelines.md)
* [Packaging App Source Code with asar](tutorial/application-packaging.md)
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Using asar Archives](tutorial/application-packaging.md#using-asar-archives)
  * [Limitations](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Testing Widevine CDM](tutorial/testing-widevine-cdm.md)

---

* [शब्दों की शब्दावली](glossary.md)

## ऐपीआई रेफरेंस

* [सार](api/synopsis.md)
* [प्रक्रिया ऑब्जेक्ट](api/process.md)
* [Supported Command Line Switches](api/command-line-switches.md)
* [वातावरण वेरिएबल्स](api/environment-variables.md)
* [Chrome Extensions Support](api/extensions.md)
* [Breaking API Changes](breaking-changes.md)

### विशिष्ट डीओएम तत्व:

* [`फाइल` ऑब्जेक्ट](api/file-object.md)
* [`<webview>` टैग](api/webview-tag.md)
* [`विंडो.ओपन` फंक्शन](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

### मुख्य प्रक्रिया के लिए मोड्यूलस:

* [एप्प](api/app.md)
* [स्वतः अपडेटर](api/auto-updater.md)
* [ब्राउज़र व्यू](api/browser-view.md)
* [ब्राउज़र विंडो](api/browser-window.md)
* [कंटेंट ट्रेसिंग](api/content-tracing.md)
* [डायलॉग](api/dialog.md)
* [वैश्विक शॉर्टकट](api/global-shortcut.md)
* [इनएप्पपरचेस](api/in-app-purchase.md)
* [आईपीसी मुख्य](api/ipc-main.md)
* [मेन्यु](api/menu.md)
* [मेन्युआइटम](api/menu-item.md)
* [नेट](api/net.md)
* [netLog](api/net-log.md)
* [nativeTheme](api/native-theme.md)
* [Notification](api/notification.md)
* [पॉवर मॉनिटर](api/power-monitor.md)
* [पॉवर सेवब्लॉकर](api/power-save-blocker.md)
* [प्रोटोकॉल](api/protocol.md)
* [स्क्रीन](api/screen.md)
* [सत्र](api/session.md)
* [सिस्टम प्रैफरेंसेज](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [ट्रे](api/tray.md)
* [वेबसामग्री](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### रेंदेरेर प्रकिया (वेबपेज) हेतु मोड्यूलस

* [डेस्कटॉप कैप्चरर](api/desktop-capturer.md)
* [आईपीसी रेंदेरेर](api/ipc-renderer.md)
* [दूरस्थ](api/remote.md)
* [वेबफ्रेम](api/web-frame.md)

### दोनो प्रक्रियाओं के लिए मोड्यूलस:

* [क्लिपबोर्ड](api/clipboard.md)
* [क्रेश रिपोर्टर](api/crash-reporter.md)
* [मूल छवि](api/native-image.md)
* [शैल](api/shell.md)

## विकास

See [development/README.md](development/README.md)
