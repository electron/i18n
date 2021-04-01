# Barrierefreiheit

Das Erlernen von Anwendungen ist wichtig, und wir freuen uns, [Devtron][devtron] und [Spectron-][spectron] Funktionalität zur Verfügung zu stellen, die Entwicklern die Möglichkeit gibt, ihre Apps für alle besser zu gestalten.

---

Accessibility Bedenken in Electron Anwendungen ähneln denen von Webseiten, da sie beide letztendlich HTML sind. Mit Electron-Apps jedoch Sie können die Online-Ressourcen nicht für Zugänglichkeitsprüfungen verwenden, weil Ihre App keine URL hat, auf die Sie den Auditor verweisen können.

Diese Funktionen bringen diese Überwachungstools in Ihre Electron-App. Sie können , Ihren Tests mit Spectron Audits hinzuzufügen oder sie in DevTools mit Devtron zu verwenden. Lesen Sie weiter für eine Zusammenfassung der Werkzeuge.

## Spectron

Im Test-Framework Spectron können Sie nun jedes Fenster und `<webview>` Tag in Ihrer Anwendung überprüfen. Ein Beispiel:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Erfahren Sie mehr über dieses Feature in der [Spectron Dokumentation][spectron-a11y].

## Devtron

In Devtron gibt es einen Tab für Barrierefreiheit, der es Ihnen erlaubt, eine Seite in Ihrer App zu überprüfen, zu sortieren und zu filtern.

![Screenshot von Devtron][4]

Beide Tools verwenden die [Accessibility Developer Tools][a11y-devtools] Bibliothek, die von Google für Chrome erstellt wurde. Sie können mehr über die Barrierefreiheit Überwachungsregeln erfahren, die diese Bibliothek auf dem Wiki-</a>Repositoryverwendet.</p> 

Wenn Sie andere großartige Zugänglichkeitstools für Electron kennen, fügen Sie sie der Zugänglichkeitsdokumentation mit einem Pull-Request hinzu.



## Bedienungshilfen manuell aktivieren

Elektron-Anwendungen ermöglichen automatisch Zugänglichkeitsfunktionen im Vorhandensein von unterstützender Technologie (e. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) unter Windows oder [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) unter macOS). Schauen Sie in die [Dokumentation für Barrierefreiheit][a11y-docs] für weitere Informationen.

Sie können diese Funktionen auch manuell in Ihrer Electron-Anwendung oder in der nativen Software von Drittanbietern einstellen.



### Elektronische API verwenden

Mithilfe der [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled] -API können Sie die Barrierefreiheitsstruktur von Chrome manuell für Benutzer in den Anwendungseinstellungen verfügbar machen. Beachten Sie, dass die Systemwerkzeuge des Benutzers Vorrang vor dieser Einstellung haben und sie überschreibt.



### Innerhalb von Drittanbieter-Software



#### macOS

Bei macOS kann die unterstützende Technologie von Drittanbietern die Barrierefreiheitsfunktionen innerhalb von Elektro-Anwendungen umschalten, indem sie das Attribut `AXManualAccessibility` programmatisch einstellen:



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

[4]: https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png

[devtron]: https://electronjs.org/devtron
[spectron]: https://electronjs.org/spectron
[spectron-a11y]: https://github.com/electron/spectron#accessibility-testing
[a11y-docs]: https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology
[a11y-devtools]: https://github.com/GoogleChrome/accessibility-developer-tools
[setAccessibilitySupportEnabled]: ../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows
