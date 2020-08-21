# Accessibilité

Développer des applications de manière accessible est important, nous sommes heureux de vous introduire [Devtron][devtron] et [Spectron][spectron] qui donnent aux développeurs l'opportunité de faire de meilleures applications pour tout le monde.

---

L'accessibilité de développement avec l'application Electron est similaire à la création d'un site web, car les deux fonctionnent avec de L'HTML . Avec les applications Electron, cependant, vous ne pouvez pas utiliser de ressources en ligne afin de mesurer l'accessibilité de votre application, parce qu'elle ne possède pas d'URL sur laquelle ces outils pourraient pointer.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Continuez pour lire une brève introduction de ces outils.

## Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. Par exemple :

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Vous pouvez en savoir plus sur cette fonctionnalité dans la [documentation de Spectron][spectron-a11y].

## Devtron

Dans Devtron, il y a un nouvel onglet accessibilité qui permet de faire l'audit d'une page de votre application, de trier et de filtrer les résultats.

![capture d’écran devtron][4]

Ces deux outils utilisent la bibliothèque [Outils d'accessibilité pour les développeurs][a11y-devtools] faite par Google pour Chrome. Vous pouvez en apprendre d'avantage sur les règles sur l’audit de l'accessibilité que cette bibliothèque utilise sur ce [wiki du répertoire git][a11y-devtools-wiki].

Si vous connaissez d'autres outils d'accessibilité pour Electron, ajoutez les à cette documentation avec une pull request.

## Activer l'accessibilité

Les applications Electron maintiennent l'accessibilité désactivée par défaut pour des raisons de performance, mais il existe plusieurs façons de l'activer.

### Dans l'application

En utilisant [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled], vous pouvez exposer l'option d'accessibilité aux utilisateurs dans les préférences de l'application. Les utilitaires d'assistance du système de l'utilisateur ont la priorité sur ce paramètre et le remplaceront.

### Technologies d’assistance

L'application Electron active automatiquement l'accessibilité lorsqu'elle détecte une technologie d'assistance (Windows) ou VoiceOver (macOS). Consultez la [documentation d’accessibilité][a11y-docs] de Chrome pour plus de détails.

Sur macOS, la technologie d'assistance tierce peut modifier l'accessibilité dans les applications Electron en réglant l'attribut `AXManualAccessibility` avec le code suivant :

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
