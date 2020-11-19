# Accessibilità

Making accessible applications is important and we're happy to provide functionality to [Devtron][devtron] and [Spectron][spectron] that gives developers the opportunity to make their apps better for everyone.

---

I problemi di accessibilità nelle applicazioni Electron sono simili a quelli dei siti Web perché fondamentalmente sono entrambi in HTML. Con le app Electron, tuttavia, non puoi utilizzare le risorse online per i controlli di accessibilità perché la tua app non ha un URL per indicare l'auditor.

These features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Continua a leggere per un riepilogo degli strumenti.

## Spectron

Nel framework di test Spectron, puoi ora controllare ogni finestra e `<webview>`tag nella tua applicazione. Ad esempio:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Puoi leggere ulteriori informazioni su questa funzione nella [documentazione di Spectron][spectron-a11y].

## Devtron

In Devtron, c'è una scheda di accessibilità che ti permetterà di controllare una pagina nella tua app, ordinare e filtrare i risultati.

![screenshot di devtron][4]

Entrambi questi strumenti utilizzano la libreria degli [Strumenti di sviluppo di accessibilità][a11y-devtools] costruita da Google per Chrome. Puoi saperne di più sull'accessibilità delle regole di controllo che questa libreria utilizza sulla [wiki del repository][a11y-devtools-wiki].

Se conosci altri fantastici strumenti di accessibilità per Electron, aggiungili alla documentazione di accessibilità con una richiesta di pull.

## Abilitare manualmente le funzioni di accessibilità

Le applicazioni Electron attiveranno automaticamente le funzionalità di accessibilità nella presenza di tecnologia assistiva (e. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) su Windows o [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) su macOS). See Chrome's [accessibility documentation][a11y-docs] for more details.

È inoltre possibile attivare manualmente queste funzioni sia all'interno dell'applicazione Electron o impostando flag in software nativo di terze parti.

### Usare L'Api Di Elettronico

By using the [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled] API, you can manually expose Chrome's accessibility tree to users in the application preferences. Nota che le utilità di assistenza di sistema dell'utente hanno la priorità su questa impostazione e la sovrascriverà.

### All'interno di software di terze parti

#### macOS

Su macOS, la tecnologia assistiva di terze parti può attivare o disattivare le funzionalità di accessibilità all'interno delle applicazioni Electron impostando l'attributo `AXManualAccessibility` a livello programmatico:

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
