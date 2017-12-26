# Barrierefreiheit

Allgemein zugängliche Anwendungen zu erstellen ist wichtig, und wir sind glücklich Ihnen neue Funktionen in [Devtron](https://electron.atom.io/devtron) und [Spectron](https://electron.atom.io/spectron) vorstellen zu können, die Entwicklern die Möglichkeit geben bessere Apps für jedermann zu erstellen.

* * *

Barrierefreiheit betreffend sind Electron-Apps und Websites vergleichbar, da beide letztlich auf HTML basieren. Dessen ungeachtet können Sie mit Electron-Apps keine Online-Ressourcen nutzen um die Barrierefreiheit zu prüfen, weil Ihre App keine URL hat, auf die der Prüfer zugreifen könnte.

Diese neuen Funktionen beinhalten die benötigten Prüfungstools für Ihre Electron-App. Sie können diese in Spectron Ihren Tests hinzufügen oder sie innerhalb der DevTools von Devtron nutzen. Lesen Sie weiter und erhalten Sie eine Übersicht der Werkzeuge oder werfen Sie einen Blick in die [Barrierefreiheit Dokumentation](https://electronjs.org/docs/tutorial/accessibility) für weitere Informationen.

## Spectron

In der Testumgebung Spectron können Sie nun jedes Fenster und jeden `<webview>`-Tag in Ihrer App prüfen. Zum Beispiel:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Erfahren Sie mehr über dieses Feature in der [Spectron Dokumentation](https://github.com/electron/spectron#accessibility-testing).

## Devtron

In Devtron, there is a new accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![devtron screenshot](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Both of these tools are using the [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

If you know of other great accessibility tools for Electron, add them to the [accessibility documentation](https://electronjs.org/docs/tutorial/accessibility) with a pull request.

## Enabling Accessibility

Electron applications keep accessibility disabled by default for performance reasons but there are multiple ways to enable it.

### Inside Application

By using [`app.setAccessibilitySupportEnabled(enabled)`](https://electron.atom.io/docs/api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), you can expose accessibility switch to users in the application preferences. User's system assistive utilities have priority over this setting and will override it.

### Assistive Technology

Electron application will enable accessibility automatically when it detects assistive technology (Windows) or VoiceOver (macOS). See Chrome's [accessibility documentation](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) for more details.

On macOS, third-party assistive technology can switch accessibility inside Electron applications by setting the attribute `AXManualAccessibility` programmatically:

```objc
CFStringRef kAXManualAccessibility = CFSTR("AXManualAccessibility");

+ (void)enableAccessibility:(BOOL)enable inElectronApplication:(NSRunningApplication *)app
{
    AXUIElementRef appRef = AXUIElementCreateApplication(app.processIdentifier);
    if (appRef == nil)
        return;

    CFBooleanRef value = enable ? kCFBooleanTrue : kCFBooleanFalse;
    AXUIElementSetAttributeValue(appRef, kAXManualAccessibility, value);
    CFRelease(appRef);
}
```