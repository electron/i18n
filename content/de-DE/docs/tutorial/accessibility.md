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

In Devtron finden Sie einen neuen Tab für Barrierefreiheit. Dieser erlaubt Ihnen eine Website in Ihrer App zu revidieren und die Ergebnisse zu sortieren bzw. zu filtern.

![devtron screenshot](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Beide dieser Werkzeuge nutzen die [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) von Google für Chrome. Erfahren Sie mehr über die Richtlinien der Überprüfung der Barrierefreiheit, die diese Bibliothek nutzt, im [Wiki des Repositorys](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Wenn Ihnen weitere gute Barrierefreiheit-Tools für Electron bekannt sind, fügen sie diese mittels einem Pull-Request zur [Dokumentation für Barrierefreiheit](https://electronjs.org/docs/tutorial/accessibility) hinzu.

## Barrierefreiheit aktivieren

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