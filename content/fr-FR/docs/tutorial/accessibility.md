# Accessibilité

La réalisation d'applications accessibles est importante et nous sommes heureux d'introduire de nouvelles fonctionnalités pour [Devtron](https://electron.atom.io/devtron) et [Spectron](https://electron.atom.io/spectron) qui donnent aux développeurs la possibilité de rendre leurs applications meilleures pour tous.

* * *

Les problèmes d’accessibilité dans les app Electron sont similaires à ceux des sites Web parce qu’ils sont tous deux en HTML. Avec les app Electron, toutefois, vous ne pouvez pas utilisez les ressources en ligne pour les vérifications de l'accessibilité parce que votre application n'est pas une URL.

Ces nouvelles fonctionnalités apportent ces outils d’audit à votre application Electron. Vous pouvez choisir d’ajouter des vérifications à vos tests avec Spectron ou utilisez-les dans DevTools avec Devtron. Read on for a summary of the tools or checkout our [accessibility documentation](https://electronjs.org/docs/tutorial/accessibility) for more information.

## Spectron

Dans l’infrastructure de test Spectron, vous pouvez auditer maintenant chaque fenêtre et `<webview>`balise dans votre application. Par exemple :

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Vous pouvez en savoir plus sur cette fonctionnalité dans la [documentation de Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

Dans Devtron, il y a un nouvel onglet accessibilité qui permet à une page dans votre application de vérification, de trier et de filtrer les résultats.

![capture d’écran devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ces deux outils utilisent la bibliothèque [Outils d'accessibilité pour les développeurs](https://github.com/GoogleChrome/accessibility-developer-tools) faite par Google pour Chrome. Vous pouvez en apprendre davantage sur les règles d’audit accessibilité que cette bibliothèque utilise sur ce [wiki du référentiel](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

If you know of other great accessibility tools for Electron, add them to the [accessibility documentation](https://electronjs.org/docs/tutorial/accessibility) with a pull request.

## Enabling Accessibility

Electron applications keep accessibility disabled by default for performance reasons but there are multiple ways to enable it.

### Inside Application

By using [`app.setAccessibilitySupportEnabled(enabled)`](https://electron.atom.io/docs/api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), you can expose accessibility switch to users in the application preferences. User's system assistive utilities have priority over this setting and will override it.

### Assistive Technology

Electron application will enable accessibility automatically when it detects assistive technology (Windows) or VoiceOver (macOS). See Chrome's [accessibility documentation](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) for more details.

On macOS, third-party assistive technology can switch accessibility inside Electron applications by setting the attribute `AXManualAccessibility` programmatically:

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