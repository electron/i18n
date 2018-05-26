# Accessibilité

Développer des applications de manière accessible est importante, nous sommes heureux de vous introduire [Devtron](https://electronjs.org/devtron) et [Spectron](https://electronjs.org/spectron) qui donnent aux développeur l'opportunité de faire de meilleurs applications pour tous le monde.

* * *

L'accessibilité de développement avec l'application Electron est similaire à la création d'un site web, car les deux fonctionne avec de L'HTML . Avec les applications Electron, cependant, vous ne pouvez pas utilisez de ressources en ligne afin de mesurer l'accessibilité de votre application, parce qu'elle ne possède pas d'URL sur laquelle ces outils pourraient pointer.

De nouvelles fonctionnalités apportent des outils d’audit à votre application Electron. Vous pouvez choisir d’ajouter des audits à vos tests avec Spectron ou de les utiliser à l'intérieur des DevTools avec Devtron. Continuez pour lire une brève introduction de ces outils.

## Spectron

Dans le framework de test Spectron, vous pouvez désormais auditer chaque fenêtre et `<webview>`balise dans votre application. Par exemple :

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Vous pouvez en savoir plus sur cette fonctionnalité dans la [documentation de Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

Dans Devtron, il y a un nouvel onglet accessibilité qui permet de faire l'audit d'une page de votre application, de trier et de filtrer les résultats.

![capture d’écran devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ces deux outils utilisent la bibliothèque [Outils d'accessibilité pour les développeurs](https://github.com/GoogleChrome/accessibility-developer-tools) faite par Google pour Chrome. Vous pouvez en apprendre d'avantage sur les règles sur l’audit de l'accessibilité que cette bibliothèque utilise sur ce [wiki du répertoire git](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Si vous connaissez d'autres outils d'accessibilité pour Electron, ajoutez les à cette documentation avec une pull request.

## Activer l'accessibilité

Les applications Electron maintiennent l'accessibilité désactivée par défaut pour des raisons de performance, mais il existe plusieurs façons de l'activer.

### Dans l'application

En utilisant [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), vous pouvez exposer l'option d'accessibilité aux utilisateurs dans les préférences de l'application. Les utilitaires d'assistance du système de l'utilisateur ont la priorité sur ce paramètre et le remplaceront.

### Technologies d’assistance

L'application Electron active automatiquement l'accessibilité lorsqu'elle détecte une technologie d'assistance (Windows) ou VoiceOver (macOS). Consultez la [documentation d’accessibilité](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) de Chrome pour plus de détails.

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