# Přístupnost

Making accessible applications is important and we're happy to introduce new functionality to [Devtron][devtron] and [Spectron][spectron] that gives developers the opportunity to make their apps better for everyone.

---

Obavy o přístupnost v Electron aplikacích se podobají problémům webových stránek, protože oba jsou v konečném důsledku HTML. S Electron aplikacemi však nemůžete použít online zdroje pro audity přístupnosti, protože vaše aplikace nemá adresu URL, na kterou by měl auditor odkazovat.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Přečtěte si přehled nástrojů.

## Spectron

V testovacím frameworku můžete nyní provést audit každého okna a značky `<webview>` ve vaší aplikaci. Například:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

You can read more about this feature in [Spectron's documentation][spectron-a11y].

## Devtron

V Devtron je nová záložka přístupnosti, která vám umožní provést audit stránky ve vaší aplikaci, seřadit a filtrovat výsledky.

![snímek obrazovky devtron][4]

Both of these tools are using the [Accessibility Developer Tools][a11y-devtools] library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki][a11y-devtools-wiki].

Pokud znáte další skvělé nástroje přístupnosti pro Electron, přidejte je do dokumentace přístupnosti pomocí požadavku na natažení.

## Povolení usnadnění přístupu

Electron aplikace udržují přístupnost ve výchozím nastavení z důvodu výkonu , ale existuje více způsobů, jak ji povolit.

### Uvnitř aplikace

By using [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled], you can expose accessibility switch to users in the application preferences. Uživatelské systémové asistenční služby mají přednost před tímto nastavením a jej přepíšou.

### Asistenční technologie

Electron aplikace automaticky zapne usnadnění přístupu, pokud detekuje asistenční technologii (Windows) nebo VoiceOver (macOS). See Chrome's [accessibility documentation][a11y-docs] for more details.

Na macOS může asistenční technologie třetích stran přepínat přístupnost uvnitř Electron aplikací nastavením atributu `AXManualAccessibility` programmaticky:

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
