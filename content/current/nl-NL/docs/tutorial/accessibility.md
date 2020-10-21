# Accessibility

Het maken van toegankelijke applicaties is belangrijk en we bieden functionaliteit aan [Devtron](https://electronjs.org/devtron) en [Spectron](https://electronjs.org/spectron) die ontwikkelaars de mogelijkheid geeft om hun apps voor iedereen beter te maken.

---

Toegankelijkheidsproblemen in Electron applicaties zijn vergelijkbaar met die van websites omdat ze beide uiteindelijk HTML zijn. Met Electron apps u kunt de online bronnen voor toegankelijkheidsaudits niet gebruiken, omdat uw app geen URL heeft om naar de auditor te verwijzen.

Deze functies brengen die auditing-tools naar je Electron app. U kunt kiezen om audits toe te voegen aan uw tests met Spectron of ze te gebruiken binnen DevTools met Devtron. Lees verder voor een overzicht van de tools.

## Spectron

In het testframework Spectron kunt u nu elk venster controleren en `<webview>` tag in uw applicatie. Bijvoorbeeld:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

U kunt meer over deze functie lezen in [Spectron's documentatie](https://github.com/electron/spectron#accessibility-testing).

## Devtron

In Devtroon is er een toegankelijkheidstabblad dat je in staat stelt om een pagina in je app te controleren, de resultaten te sorteren en te filteren.

![devtron-schermafdruk](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Beide tools maken gebruik van de [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) bibliotheek gebouwd door Google voor Chrome. Meer informatie over de toegankelijkheid auditregels die deze bibliotheek gebruikt op die [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Als u andere geweldige toegankelijkheidstools voor Electron kent, voeg deze toe aan de toegankelijkheidsdocumentatie met een pull-request.

## Toegankelijkheidsfuncties handmatig inschakelen

Elektron applicaties zullen de toegankelijkheidsfuncties automatisch inschakelen in de aanwezigheid van ondersteunende technologie (bijv. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) op Windows of [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) op macOS). Zie Chrome's [toegankelijkheidsdocumentatie](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) voor meer details.

Je kunt deze functies ook handmatig in- of uitschakelen binnen je Electron applicatie of door het instellen van markeringen in software van derden.

### Gebruik de API van Electron

Door gebruik te maken van de [`app.setAccessibilitySupportEnabled(ingeschakeld)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) API, kunt u handmatig de Chrome's toegankelijkheidsboom blootstellen aan gebruikers in de applicatievoorkeuren. Merk op dat de gebruikerssysteem assistive hulpprogramma's prioriteit hebben boven deze instelling en dit zal overschrijven.

### Binnen software van derden

#### macOS

Op macOS kan ondersteunende technologie van derden de toegankelijkheidsfuncties in Electron-applicaties aan/uit schakelen door de `AXManualAccessibility` attribuut programmatically in te stellen:

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
