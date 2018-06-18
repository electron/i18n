# Official Guides

कृपया सुनिश्चित करें कि आप अपने इलेक्ट्रॉन संस्करण से मेल खाने वाले दस्तावेज़ों का उपयोग कर रहे हैं । संस्करण संख्या, पेज यूआरएल का एक भाग होना चाहिए । यदि ऐसा नहीं है, तो शायद आप एक ऐसी विकास शाखा के दस्तावेज़ीकरण का इस्तेमाल कर रहे हैं, जिसमे मौजूद ऐपीआई परिवर्तन आपके इलेक्ट्रॉन संस्करण के अनुकूल नहीं हैं | दस्तावेज़ीकरण के पुराने संस्करण देखने के लिए, आप गिटहब पर [टैग के द्वारा ढूंढ](https://github.com/electron/electron/tree/v1.4.0) सकते हैं | इसके लिए आप "स्विच ब्रांचेज/टैग्स" ड्रापडाउन खोलें और उस टैग को चुनें जो आपके संस्करण से मिलता है|

## अक्सर पूछे जाने वाले सवाल

यह वे सवाल हैं जो की अक्सर पूछे जाते हैं | नयी समस्या जमा करने से पहले इन्हें जरूर पढ़ें:

* [इलेक्ट्रॉन के अकसर पूछे जाने वाले सवाल](faq.md)

## Guides and Tutorials

* [Setting up the Development Environment](tutorial/development-environment.md) 
  * [मैकओएस का सेटअप करना](tutorial/development-environment.md#setting-up-macos)
  * [विंडोज का सेटअप करना](tutorial/development-environment.md#setting-up-windows)
  * [लिनक्स का सेटअप करना](tutorial/development-environment.md#setting-up-linux)
  * [Choosing an Editor](tutorial/development-environment.md#a-good-editor)
* [Creating your First App](tutorial/first-app.md) 
  * [Installing Electron](tutorial/first-app.md#installing-electron)
  * [Electron Development in a Nutshell](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Running Your App](tutorial/first-app.md#running-your-app)
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
  * [नोटीफीकेशनस](tutorial/notifications.md)
  * [Recent Documents](tutorial/desktop-environment-integration.md#recent-documents)
  * [Application Progress](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/macos-dock.md)
  * [Custom Windows Taskbar](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [कीबोर्ड शोर्टकट्स](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detection](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
* [Accessibility](tutorial/accessibility.md) 
  * [स्पेकट्रॉन](tutorial/accessibility.md#spectron)
  * [डेवट्रॉन](tutorial/accessibility.md#devtron)
  * [Enabling Accessibility](tutorial/accessibility.md#enabling-accessibility)
* [Testing and Debugging](tutorial/application-debugging.md) 
  * [Debugging the Main Process](tutorial/debugging-main-process.md)
  * [सेलेनियम और वेबड्राईवर का इस्तेमाल](tutorial/using-selenium-and-webdriver.md)
  * [हेडलेस सीआई सिस्टम (ट्रेविस, जेनकिंस) पर परिक्षण](tutorial/testing-on-headless-ci.md)
  * [डेवटूल्स एक्सटेंशन](tutorial/devtools-extension.md)
  * [Automated Testing with a Custom Driver](tutorial/automated-testing-with-a-custom-driver.md)
* Packaging 
  * [Code Signing](tutorial/code-signing.md)
* [Distribution](tutorial/application-distribution.md) 
  * [Support](tutorial/support.md)
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

## Detailed Tutorials

These individual tutorials expand on topics discussed in the guide above.

* [In Detail: Installing Electron](tutorial/installation.md) 
  * [Proxies](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [समस्या निवारण](tutorial/installation.md#troubleshooting)
* [In Detail: Electron's Versioning Scheme](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [स्थिरीकरण शाखायें](tutorial/electron-versioning.md#stabilization-branches)
  * [बीटा रिलीज़ और बग फिक्सेस](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [In Detail: Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Using asar Archives](tutorial/application-packaging.md#using-asar-archives)
  * [Limitations](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [In Detail: Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [In Detail: Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [ऑफस्क्रीन रेंडरिंग](tutorial/offscreen-rendering.md)

* * *

* [शब्दों की शब्दावली](glossary.md)

## ऐपीआई रेफरेंस

* [सार](api/synopsis.md)
* [प्रक्रिया ऑब्जेक्ट](api/process.md)
* [समर्थित क्रोम आदेश पंक्ति स्विचेस](api/chrome-command-line-switches.md)
* [वातावरण वेरिएबल्स](api/environment-variables.md)
* [Breaking API Changes](api/breaking-changes.md)

### विशिष्ट डीओएम तत्व:

* [`फाइल` ऑब्जेक्ट](api/file-object.md)
* [`<webview>` टैग](api/webview-tag.md)
* [`विंडो.ओपन` फंक्शन](api/window-open.md)

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
* [पॉवर मॉनिटर](api/power-monitor.md)
* [पॉवर सेवब्लॉकर](api/power-save-blocker.md)
* [प्रोटोकॉल](api/protocol.md)
* [सत्र](api/session.md)
* [सिस्टम प्रैफरेंसेज](api/system-preferences.md)
* [ट्रे](api/tray.md)
* [वेबसामग्री](api/web-contents.md)

### रेंदेरेर प्रकिया (वेबपेज) हेतु मोड्यूलस

* [डेस्कटॉप कैप्चरर](api/desktop-capturer.md)
* [आईपीसी रेंदेरेर](api/ipc-renderer.md)
* [दूरस्थ](api/remote.md)
* [वेबफ्रेम](api/web-frame.md)

### दोनो प्रक्रियाओं के लिए मोड्यूलस:

* [क्लिपबोर्ड](api/clipboard.md)
* [क्रेश रिपोर्टर](api/crash-reporter.md)
* [मूल छवि](api/native-image.md)
* [स्क्रीन](api/screen.md)
* [शैल](api/shell.md)

## विकास

See <development/README.md>