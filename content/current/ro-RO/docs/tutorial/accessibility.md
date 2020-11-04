# Accesibilitate

Este important să facem aplicații accesibile și suntem bucuroși să oferim funcționalitate pentru [Devtron](https://electronjs.org/devtron) și [Spectron](https://electronjs.org/spectron) care oferă dezvoltatorilor oportunitatea de a-și îmbunătăți aplicațiile pentru toată lumea.

---

Preocupările legate de accesibilitate în aplicațiile Electron sunt similare cu cele din website-uri pentru că ambele sunt în cele din urmă HTML. Cu aplicațiile Electron totuși nu puteți utiliza resursele online pentru audituri de accesibilitate deoarece aplicația dvs. nu are un URL pentru a indica auditorul.

Aceste caracteristici aduc aceste instrumente de audit în aplicația ta Electron. Poți alege să adaugi audituri la teste cu Spectron sau să le folosești în DevTools cu Devtron. Citește pe scurt un rezumat al instrumentelor.

## Spectron

În spectrul de teste pentru Spectron, poți audita acum fiecare fereastră și `<webview>` tag în aplicația ta. De exemplu:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Poți citi mai multe despre această caracteristică în [documentația spectrului](https://github.com/electron/spectron#accessibility-testing).

## Devtron

În Devtron, există o filă de accesibilitate care vă va permite să auditați o pagină din aplicație, sortați și filtrați rezultatele.

![captură ecran devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ambele instrumente folosesc librăria [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) construită de Google for Chrome. Poți afla mai multe despre accesibilitate regulile de audit pe care le utilizează această bibliotecă [pe wiki-ul depozitului](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Dacă știi de alte instrumente de accesibilitate pentru Electron, adaugă-le la documentația de accesibilitate cu o cerere de tragere.

## Activare manuală a funcțiilor de accesibilitate

Aplicațiile Electron vor activa automat funcțiile de accesibilitate în prezența tehnologiei de asistență (e. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) pe Windows sau [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) pe macOS). Vezi [documentația de accesibilitate a Chrome](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) pentru mai multe detalii.

De asemenea, poți comuta manual aceste funcții fie în cadrul aplicației tale Electron sau setând steaguri în software nativ terț.

### Folosind API-ul Electron

Folosind [`app.setAccessibilitySupportEnabled(activat)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) API, puteți expune arborele de accesibilitate Chrome utilizatorilor în preferințele aplicației. Țineți cont că serviciile de asistență ale utilizatorului au prioritate față de această setare și o vor suprascrie.

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
