# Accesibilitate

Making accessible applications is important and we're happy to introduce new functionality to [Devtron][devtron] and [Spectron][spectron] that gives developers the opportunity to make their apps better for everyone.

---

Preocupările legate de accesibilitate în aplicațiile Electron sunt similare cu cele din website-uri pentru că ambele sunt în cele din urmă HTML. Cu aplicațiile Electron totuși nu puteți utiliza resursele online pentru audituri de accesibilitate deoarece aplicația dvs. nu are un URL pentru a indica auditorul.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Citește pe scurt un rezumat al instrumentelor.

## Spectron

În spectrul de teste pentru Spectron, poți audita acum fiecare fereastră și `<webview>` tag în aplicația ta. De exemplu:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

You can read more about this feature in [Spectron's documentation][spectron-a11y].

## Devtron

În Devtron, există o nouă filă de accesibilitate care vă va permite să auditați o pagină din aplicație, sortați și filtrați rezultatele.

![captură ecran devtron][4]

Both of these tools are using the [Accessibility Developer Tools][a11y-devtools] library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki][a11y-devtools-wiki].

Dacă știi de alte instrumente de accesibilitate pentru Electron, adaugă-le la documentația de accesibilitate cu o cerere de tragere.

## Activarea accesibilității

Aplicațiile Electron mențin accesibilitatea dezactivată implicit din motive de performanță dar există mai multe modalități de a o activa.

### Aplicarea în interior

By using [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled], you can expose accessibility switch to users in the application preferences. Serviciile de asistență de sistem ale utilizatorului au prioritate față de această setare și o vor suprascrie.

### Tehnologie de asistență

Aplicația Electron va activa accesibilitatea automat atunci când detectează tehnologia de asistență (Windows) sau VoiceOver (macOS). See Chrome's [accessibility documentation][a11y-docs] for more details.

Pe macOS, tehnologia de asistent terță parte poate schimba accesibilitatea înăuntrul Aplicațiile Electron prin setarea programului `AXManualAccessibility` :

```objc
CFStringRef kAXManualAccessibility = CFSTR("AXManualAccessibility");

+ (void)enableAccessibility:(BOOL)activează inElectronApplication:(NSRunningApplication *)app
{
    AXUIElementRef appRef = AXUIElementCreateApplication(app. identificator rotundă);
    dacă (appRef == nil)
        returnează;

    Valoarea CFBooleanRef = activează? kCFBooleanTrue: kCFBooleanFalse;
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
