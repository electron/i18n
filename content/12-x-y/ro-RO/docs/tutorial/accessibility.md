# Accesibilitate

Making accessible applications is important and we're happy to provide functionality to [Devtron][devtron] and [Spectron][spectron] that gives developers the opportunity to make their apps better for everyone.

---

Preocupările legate de accesibilitate în aplicațiile Electron sunt similare cu cele din website-uri pentru că ambele sunt în cele din urmă HTML. Cu aplicațiile Electron totuși nu puteți utiliza resursele online pentru audituri de accesibilitate deoarece aplicația dvs. nu are un URL pentru a indica auditorul.

These features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Citește pe scurt un rezumat al instrumentelor.

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

În Devtron, există o filă de accesibilitate care vă va permite să auditați o pagină din aplicație, sortați și filtrați rezultatele.

![captură ecran devtron][4]

Both of these tools are using the [Accessibility Developer Tools][a11y-devtools] library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki][a11y-devtools-wiki].

Dacă știi de alte instrumente de accesibilitate pentru Electron, adaugă-le la documentația de accesibilitate cu o cerere de tragere.

## Activare manuală a funcțiilor de accesibilitate

Aplicațiile Electron vor activa automat funcțiile de accesibilitate în prezența tehnologiei de asistență (e. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) pe Windows sau [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) pe macOS). See Chrome's [accessibility documentation][a11y-docs] for more details.

De asemenea, poți comuta manual aceste funcții fie în cadrul aplicației tale Electron sau setând steaguri în software nativ terț.

### Folosind API-ul Electron

By using the [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled] API, you can manually expose Chrome's accessibility tree to users in the application preferences. Țineți cont că serviciile de asistență ale utilizatorului au prioritate față de această setare și o vor suprascrie.

### În cadrul software-ului terț

#### macOS

Pe macOS, tehnologia de asistare externă poate comuta funcțiile de accesibilitate în interiorul Aplicațiile Electron prin setarea `AXManualAccessibility` atributului program:

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
