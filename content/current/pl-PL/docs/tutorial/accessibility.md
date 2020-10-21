# Dostępność

Udostępnianie aplikacji jest ważne i cieszymy się, że możemy zapewnić funkcjonalności [Devtron](https://electronjs.org/devtron) i [Spectron](https://electronjs.org/spectron) , który daje programistom możliwość poprawy ich aplikacji dla wszystkich.

---

Obawy ułatwień dostępu w aplikacjach Electron'a są podobne do tych z stron internetowych, ponieważ są one tak samo ostatecznie w HTML'u. Aplikacje Electron'a jednak nie mogą używać zasobów online dla audytów dostępności, ponieważ Twoja aplikacja nie ma adresu URL, który by wskazywał dla biegłych rewidendów.

Te funkcje wprowadzają te narzędzia do Twojej aplikacji Electron. Możesz wybrać dodawanie audytów do testów za pomocą Spectron lub użyć ich w DevTools z Devtron. Zapoznaj się z podsumowaniem narzędzi.

## Spectron

W testach Framework Spectron możesz teraz kontrolować każde okno i `<webview>` tag w aplikacji. Na przykład:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Możesz dowiedzieć się więcej o tej funkcjonalności w [Dokumentacji Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

W Devtron znajduje się zakładka ułatwień dostępu, która pozwoli Ci na kontrolowanie strony w aplikacji, sortowanie i filtrowanie wyników.

![devtron zrzut z ekranu](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Obydwa te narzędzia używają [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) biblioteki stworzonej przez Google dla przeglądarki Chrome. Możesz dowiedzieć się więcej na temat zasad inspekcji ułatwień dostępu, których ta biblioteka używa na [repozytorium wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Jeżeli znasz inne dobre narzędzia dostępne dla Electron, dodaj je do dokumentacji dostępności za pomocą pull request.

## Ręczne włączanie funkcji ułatwień dostępu

Aplikacje Electron automatycznie włączą funkcje ułatwień dostępu w obecności technologii wspomagającej (e. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) na Windows lub [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) na macOS). Zobacz [dokumentację dostępności dla Chrome](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) , aby uzyskać więcej informacji.

Możesz również ręcznie przełączać te funkcje w aplikacji Electron lub ustawiając flagi w oprogramowaniu natywnym innych firm.

### Używanie API Electrona

Używając [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) API możesz ręcznie ujawnić drzewo dostępności Chrome użytkownikom w preferencjach aplikacji. Zauważ, że systemowe narzędzia wspomagające użytkownika mają pierwszeństwo przed tym ustawieniem i go nadpisze.

### W ramach oprogramowania firm trzecich

#### macOS

W macOS technologia wspomagania firm trzecich może przełączać funkcje dostępności wewnątrz aplikacji Electrona, ustawiając atrybut `AXManualAccessibility` programowo:

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
