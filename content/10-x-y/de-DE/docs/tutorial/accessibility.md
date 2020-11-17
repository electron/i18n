# Barrierefreiheit

Die Bereitstellung zugänglicher Anwendungen ist wichtig und wir freuen uns, neue -Funktionen für [Devtron][devtron] und [Spectron][spectron] einzuführen, die Entwicklern die Möglichkeit gibt, ihre Apps für alle besser zu machen.

---

Accessibility Bedenken in Electron Anwendungen ähneln denen von Webseiten, da sie beide letztendlich HTML sind. Mit Electron-Apps jedoch Sie können die Online-Ressourcen nicht für Zugänglichkeitsprüfungen verwenden, weil Ihre App keine URL hat, auf die Sie den Auditor verweisen können.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Lesen Sie weiter für eine Zusammenfassung der Werkzeuge.

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

In Devtron gibt es einen neuen Tab für Barrierefreiheit, der es Ihnen erlaubt, eine Seite in Ihrer App zu überprüfen, zu sortieren und zu filtern.

![Screenshot von Devtron][4]

Both of these tools are using the [Accessibility Developer Tools][a11y-devtools] library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki][a11y-devtools-wiki].

Wenn Sie andere großartige Zugänglichkeitstools für Electron kennen, fügen Sie sie der Zugänglichkeitsdokumentation mit einem Pull-Request hinzu.

## Barrierefreiheit aktivieren

Elektronische Anwendungen halten die Zugänglichkeit standardmäßig aus Performance- Gründen deaktiviert, aber es gibt mehrere Wege, dies zu aktivieren.

### Innerhalb der Anwendung

By using [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled], you can expose accessibility switch to users in the application preferences. Die Systemwerkzeuge des Benutzers haben Vorrang vor dieser Einstellung und werden sie überschreiben.

### Unterstützende Technologien

Die Electron-Anwendung wird die Zugänglichkeit automatisch aktivieren, wenn sie unterstützende Technologie (Windows) oder VoiceOver (macOS) erkennt. See Chrome's [accessibility documentation][a11y-docs] for more details.

Bei macOS kann die externe unterstützende Technologie die Zugänglichkeit innerhalb von Elektron-Anwendungen ändern, indem sie das Attribut `AXManualAccessibility` programmatisch einstellen:

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
[a11y-devtools-wiki]: https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules
[setAccessibilitySupportEnabled]: ../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows
