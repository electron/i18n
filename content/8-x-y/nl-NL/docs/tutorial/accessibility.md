# Accessibility

Making accessible applications is important and we're happy to introduce new functionality to [Devtron][devtron] and [Spectron][spectron] that gives developers the opportunity to make their apps better for everyone.

---

Toegankelijkheidsproblemen in Electron applicaties zijn vergelijkbaar met die van websites omdat ze beide uiteindelijk HTML zijn. Met Electron apps u kunt de online bronnen voor toegankelijkheidsaudits niet gebruiken, omdat uw app geen URL heeft om naar de auditor te verwijzen.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Lees verder voor een overzicht van de tools.

## Spectron

In het testframework Spectron kunt u nu elk venster controleren en `<webview>` tag in uw applicatie. Bijvoorbeeld:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

U kunt meer over deze functie lezen in [Spectron's documentatie][spectron-a11y].

## Devtron

In Devtro, is er een nieuw toegankelijkheidstabblad waarmee u het controleren van een pagina in uw app, het sorteren en filteren van de resultaten.

![devtron-schermafdruk][4]

Both of these tools are using the [Accessibility Developer Tools][a11y-devtools] library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki][a11y-devtools-wiki].

Als u andere geweldige toegankelijkheidstools voor Electron kent, voeg deze toe aan de toegankelijkheidsdocumentatie met een pull-request.

## Toegankelijkheid beschikbaar maken

Elektron applicaties houden toegankelijkheid standaard uitgeschakeld om prestatie redenen, maar er zijn meerdere manieren om deze in te schakelen.

### In de applicatie

By using [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled], you can expose accessibility switch to users in the application preferences. De ondersteunende hulpprogramma's van de gebruiker hebben prioriteit boven deze instelling en overschrijven.

### Hulptechnologie

Electron applicatie zal toegankelijkheid automatisch inschakelen wanneer het assistive technology (Windows) of VoiceOver (macOS) detecteert. See Chrome's [accessibility documentation][a11y-docs] for more details.

Op macOS kan ondersteunende technologie van derden de toegankelijkheid in Electron applicaties wijzigen door het attribuut `AXManualAccessibility` programmatibel in te stellen:

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
