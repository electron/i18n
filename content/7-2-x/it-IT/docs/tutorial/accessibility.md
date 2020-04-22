# Accessibilità

Realizzare applicazioni accessibili è importante e siamo lieti di presentare nuove funzionalità per [Devtron](https://electronjs.org/devtron) e [Spectron](https://electronjs.org/spectron) che forniscono agli sviluppatori l'opportunità di rendere le loro app migliori per tutti.

---

I problemi di accessibilità nelle applicazioni Electron sono simili a quelli dei siti Web perché fondamentalmente sono entrambi in HTML. Con le app Electron, tuttavia, non puoi utilizzare le risorse online per i controlli di accessibilità perché la tua app non ha un URL per indicare l'auditor.

Queste nuove funzionalità portano questi strumenti di controllo alla tua app Electron. Puoi scegliere di aggiungere audit ai propri test con Spectron o utilizzarli in DevTools con Devtron. Continua a leggere per un riepilogo degli strumenti.

## Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. Ad esempio:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Puoi leggere ulteriori informazioni su questa funzione nella [documentazione di Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

In Devtron, c'è una nuova scheda di accessibilità che vi permetterà di controllare una pagina nella tua app, ordinare e filtrare i risultati.

![screenshot di devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Entrambi questi strumenti utilizzano la libreria degli [Strumenti di sviluppo di accessibilità](https://github.com/GoogleChrome/accessibility-developer-tools) costruita da Google per Chrome. Puoi saperne di più sull'accessibilità delle regole di controllo che questa libreria utilizza sulla [wiki del repository](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Se conosci altri fantastici strumenti di accessibilità per Electron, aggiungili alla documentazione di accessibilità con una richiesta di pull.

## Attivazione dell'accessibilità

Le applicazioni Electron mantengono l'accessibilità disabilitata di default per ragioni di prestazioni ma ci sono molti modi per abilitarla.

### All'interno dell'applicazione

Utilizzando [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), puoi mostrare lo switch di accessibilità agli utenti nelle preferenze dell'applicazione. Le utilità di assistenza del sistema dell'utente hanno la priorità su questa impostazione e andranno ad annullarla.

### Tecnologia assistiva

L'applicazione Electron abiliterà automaticamente l'accessibilità quando rileva la tecnologia assistiva (Windows) o il VoiceOver (macOS). Vedi la [documentazione di accessibilità](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) di Chrome per ulteriori dettagli.

Su macOS, la tecnologia di assistenza di terze parti può cambiare l'accessibilità all'interno delle applicazioni Electron impostando l'attributo `AXManualAccessibility` a livello di codice:

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
