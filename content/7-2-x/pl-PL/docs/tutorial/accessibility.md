# Dostępność

Udostępnianie dostępnych aplikacji jest dla nas ważne i jesteśmy szczęśliwi, że możemy przedstawić nowe funkcjonalności w [Devtron](https://electronjs.org/devtron) oraz [Spectron](https://electronjs.org/spectron), które dają developerom możliwości tworzyć lepsze applikacje.

---

Obawy ułatwień dostępu w aplikacjach Electron'a są podobne do tych z stron internetowych, ponieważ są one tak samo ostatecznie w HTML'u. Aplikacje Electron'a jednak nie mogą używać zasobów online dla audytów dostępności, ponieważ Twoja aplikacja nie ma adresu URL, który by wskazywał dla biegłych rewidendów.

Te nowe funkcjonalności dostarczają narzędzia do badania twojej aplikacji. Możesz wybrać pomiędzy dodaniem ich do Twoich testów za pomocą Spectron lub użyć ich w DevTools z Devtron. Zapoznaj się z podsumowaniem narzędzi.

## Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. Na przykład:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Możesz dowiedzieć się więcej o tej funkcjonalności w [Dokumentacji Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

W Devtron'ie, jest nowa karta ułatwień dostępu, która pozwoli Ci na audyt strony w aplikacji oraz sortować i filtrować wyniki.

![devtron zrzut z ekranu](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Obydwa te narzędzia używają [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) biblioteki stworzonej przez Google dla przeglądarki Chrome. Możesz dowiedzieć się więcej na temat zasad inspekcji ułatwień dostępu, których ta biblioteka używa na [repozytorium wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Jeżeli znasz inne dobre narzędzia dostępne dla Electron, dodaj je do dokumentacji dostępności za pomocą pull request.

## Włączanie ułatwień dostępu

Aplikacja Electron ma domyślnie wyłączoną dostępność ze względów wydajnościowych, ale istnieje kilka sposobów aby je włączyć.

### Aplikacja Wewnętrzna

Używając [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), możesz uzyskać dostęp do przełącznika dostępności dla użytkowników w preferencjach aplikacji. Narzędzia pomocnicze w systemie użytkownika mają pierwszeństwo nad tymi ustawieniami i nadpisują je.

### Technologie wspomagające

Aplikacja Electron automatycznie włączy dostępność po wykryciu technologii asystującej (Windows) lub VoiceOver (macOS). Zobacz Chrome'a [dokumentacje dostępności](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) po więcej szczegółów.

Na macOS, technologia asystująca innej firmy może przełączać dostępność w aplikacjach elektronicznych, programowo ustawiając atrybut `AXManualAccessibility`:

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
