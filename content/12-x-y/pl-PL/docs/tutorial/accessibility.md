# Dostępność

Making accessible applications is important and we're happy to provide functionality to [Devtron][devtron] and [Spectron][spectron] that gives developers the opportunity to make their apps better for everyone.

---

Obawy ułatwień dostępu w aplikacjach Electron'a są podobne do tych z stron internetowych, ponieważ są one tak samo ostatecznie w HTML'u. Aplikacje Electron'a jednak nie mogą używać zasobów online dla audytów dostępności, ponieważ Twoja aplikacja nie ma adresu URL, który by wskazywał dla biegłych rewidendów.

These features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Zapoznaj się z podsumowaniem narzędzi.

## Spectron

W testach Framework Spectron możesz teraz kontrolować każde okno i `<webview>` tag w aplikacji. Na przykład:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Możesz dowiedzieć się więcej o tej funkcjonalności w [Dokumentacji Spectron][spectron-a11y].

## Devtron

W Devtron znajduje się zakładka ułatwień dostępu, która pozwoli Ci na kontrolowanie strony w aplikacji, sortowanie i filtrowanie wyników.

![devtron zrzut z ekranu][4]

Obydwa te narzędzia używają [Accessibility Developer Tools][a11y-devtools] biblioteki stworzonej przez Google dla przeglądarki Chrome. Możesz dowiedzieć się więcej na temat zasad inspekcji ułatwień dostępu, których ta biblioteka używa na [repozytorium wiki][a11y-devtools-wiki].

Jeżeli znasz inne dobre narzędzia dostępne dla Electron, dodaj je do dokumentacji dostępności za pomocą pull request.

## Ręczne włączanie funkcji ułatwień dostępu

Aplikacje Electron automatycznie włączą funkcje ułatwień dostępu w obecności technologii wspomagającej (e. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) na Windows lub [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) na macOS). See Chrome's [accessibility documentation][a11y-docs] for more details.

Możesz również ręcznie przełączać te funkcje w aplikacji Electron lub ustawiając flagi w oprogramowaniu natywnym innych firm.

### Używanie API Electrona

By using the [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled] API, you can manually expose Chrome's accessibility tree to users in the application preferences. Zauważ, że systemowe narzędzia wspomagające użytkownika mają pierwszeństwo przed tym ustawieniem i go nadpisze.

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

[4]: https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png

[devtron]: https://electronjs.org/devtron
[spectron]: https://electronjs.org/spectron
[spectron-a11y]: https://github.com/electron/spectron#accessibility-testing
[a11y-docs]: https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology
[a11y-devtools]: https://github.com/GoogleChrome/accessibility-developer-tools
[a11y-devtools-wiki]: https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules
[setAccessibilitySupportEnabled]: ../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows
