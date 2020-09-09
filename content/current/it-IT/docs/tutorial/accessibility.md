# Accessibilità

Making accessible applications is important and we're happy to provide functionality to [Devtron](https://electronjs.org/devtron) and [Spectron](https://electronjs.org/spectron) that gives developers the opportunity to make their apps better for everyone.

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

Puoi leggere ulteriori informazioni su questa funzione nella [documentazione di Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

In Devtron, there is an accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![screenshot di devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Entrambi questi strumenti utilizzano la libreria degli [Strumenti di sviluppo di accessibilità](https://github.com/GoogleChrome/accessibility-developer-tools) costruita da Google per Chrome. Puoi saperne di più sull'accessibilità delle regole di controllo che questa libreria utilizza sulla [wiki del repository](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Se conosci altri fantastici strumenti di accessibilità per Electron, aggiungili alla documentazione di accessibilità con una richiesta di pull.

## Manually enabling accessibility features

Electron applications will automatically enable accessibility features in the presence of assistive technology (e.g. [JAWS](https://www.freedomscientific.com/products/software/jaws/) on Windows or [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) on macOS). See Chrome's [accessibility documentation](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) for more details.

You can also manually toggle these features either within your Electron application or by setting flags in third-party native software.

### Using Electron's API

By using the [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) API, you can manually expose Chrome's accessibility tree to users in the application preferences. Note that the user's system assistive utilities have priority over this setting and will override it.

### Within third-party software

#### macOS

On macOS, third-party assistive technology can toggle accessibility features inside Electron applications by setting the `AXManualAccessibility` attribute programmatically:

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
