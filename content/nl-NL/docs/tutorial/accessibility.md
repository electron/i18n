# Accessibility

Het toegankelijk maken van applicaties is belangrijk en we zijn blij om nieuwe functionaliteit te introduceren bij Devtron</ 0> en Spectron</ 1> waarmee ontwikkelaars hun apps voor iedereen beter kunnen maken.</p> 

* * *

Toegankelijkheidsuitdagingen in Electron-applicaties zijn vergelijkbaar met die van websites, omdat ze beide uiteindelijk HTML zijn. Bij Electron-apps kunt u echter de online tests voor toegankelijkheidsaudits echter niet gebruiken omdat uw app geen URL heeft om de auditor naar te verwijzen.

Deze nieuwe functies brengen die auditing-tools naar uw Electron-app. U kunt ervoor kiezen om audits toe te voegen aan uw tests met Spectron of ze te gebruiken in DevTools met Devtron. Lees verder voor een overzicht van de tools of bekijk onze [toegankelijkheidsdocumentatie](https://electronjs.org/docs/tutorial/accessibility) voor meer informatie.

## Spectron

In het testframework Spectron kunt u nu elk venster en `<webview>`-tag in uw applicatie controleren. Bijvoorbeeld:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

U kunt meer over deze functie lezen in [Spectron's documentatie](https://github.com/electron/spectron#accessibility-testing).

## Devtron

In Devtron is er een nieuw accessibility-tabblad, die een pagina in uw app laat controleren en de resultaten laat sorteren en filteren.

![devtron screenshot](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Beide tools zijn gemaakt met behulp van de [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) van Google voor Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Als u andere geweldige toegankelijkheidstools voor Electron kent, voegt u deze toe aan de [toegankelijkheidsdocumentatie](https://electronjs.org/docs/tutorial/accessibility) met een pull-request.

## Toegankelijkheid beschikbaar maken

Elektron-apps houden toegankelijkheid standaard uitgeschakeld om prestatieredenen, maar er zijn meerdere manieren om dit in te schakelen.

### In de applicatie

By using [`app.setAccessibilitySupportEnabled(enabled)`](https://electron.atom.io/docs/api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), you can expose accessibility switch to users in the application preferences. User's system assistive utilities have priority over this setting and will override it.

### Hulptechnologie

De Electron-applicatie zal toegankelijkheidopties automatisch inschakelen wanneer het assistive-hulptechnologie (Windows) of VoiceOver (macOS) detecteert. Zie Chrome's [toegankelijkheidsdocumentatie](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) voor meer details.

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