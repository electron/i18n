# Accessibilità

Rendere le applicazioni accessibili è importante e siamo lieti di fornire funzionalità a [Devtron](https://electronjs.org/devtron) e [Spectron](https://electronjs.org/spectron) che offre a sviluppatori l'opportunità di migliorare le loro applicazioni per tutti.

---

I problemi di accessibilità nelle applicazioni Electron sono simili a quelli dei siti Web perché fondamentalmente sono entrambi in HTML. Con le app Electron, tuttavia, non puoi utilizzare le risorse online per i controlli di accessibilità perché la tua app non ha un URL per indicare l'auditor.

Queste funzionalità portano questi strumenti di controllo alla tua app Electron. Puoi scegliere di aggiungere audit ai tuoi test con Spectron o usarli all'interno di DevTools con Devtron. Continua a leggere per un riepilogo degli strumenti.

## Spectron

Nel framework di test Spectron, puoi ora controllare ogni finestra e `<webview>`tag nella tua applicazione. Ad esempio:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Puoi leggere ulteriori informazioni su questa funzione nella [documentazione di Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

In Devtron, c'è una scheda di accessibilità che ti permetterà di controllare una pagina nella tua app, ordinare e filtrare i risultati.

![screenshot di devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Entrambi questi strumenti utilizzano la libreria degli [Strumenti di sviluppo di accessibilità](https://github.com/GoogleChrome/accessibility-developer-tools) costruita da Google per Chrome. Puoi saperne di più sull'accessibilità delle regole di controllo che questa libreria utilizza sulla [wiki del repository](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Se conosci altri fantastici strumenti di accessibilità per Electron, aggiungili alla documentazione di accessibilità con una richiesta di pull.

## Abilitare manualmente le funzioni di accessibilità

Le applicazioni Electron attiveranno automaticamente le funzionalità di accessibilità nella presenza di tecnologia assistiva (e. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) su Windows o [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) su macOS). Vedi la documentazione di accessibilità [di Chrome](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) per maggiori dettagli.

È inoltre possibile attivare manualmente queste funzioni sia all'interno dell'applicazione Electron o impostando flag in software nativo di terze parti.

### Usare L'Api Di Elettronico

Utilizzando l'API [`app.setAccessibilitySupportEnabled(abilitata)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) è possibile esporre manualmente l'albero di accessibilità di Chrome agli utenti nelle preferenze dell'applicazione. Nota che le utilità di assistenza di sistema dell'utente hanno la priorità su questa impostazione e la sovrascriverà.

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
