# Accessibilité

Rendre des applications accessibles est important et nous sommes heureux de fournir une fonctionnalité à [](https://electronjs.org/devtron) Devtron et [](https://electronjs.org/spectron) Spectron qui donne aux développeurs la possibilité de rendre leurs applications meilleures pour tout le monde.

---

L'accessibilité de développement avec l'application Electron est similaire à la création d'un site web, car les deux fonctionnent avec de L'HTML . Avec les applications Electron, cependant, vous ne pouvez pas utiliser de ressources en ligne afin de mesurer l'accessibilité de votre application, parce qu'elle ne possède pas d'URL sur laquelle ces outils pourraient pointer.

Ces fonctionnalités apportent ces outils d'audit à votre application Electron. Vous pouvez choisir d'ajouter des audits à vos tests avec Spectron ou les utiliser dans DevTools avec Devtron. Continuez pour lire une brève introduction de ces outils.

## Spectron

Dans le framework de test Spectron, vous pouvez maintenant auditer chaque fenêtre et les balises `<webview>` de votre application. Par exemple :

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Vous pouvez en savoir plus sur cette fonctionnalité dans la [documentation de Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

Dans Devtron, il y a un onglet d'accessibilité qui vous permettra d'auditer une page dans votre application, de trier et de filtrer les résultats.

![capture d’écran devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ces deux outils utilisent la bibliothèque [Outils d'accessibilité pour les développeurs](https://github.com/GoogleChrome/accessibility-developer-tools) faite par Google pour Chrome. Vous pouvez en apprendre d'avantage sur les règles sur l’audit de l'accessibilité que cette bibliothèque utilise sur ce [wiki du répertoire git](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Si vous connaissez d'autres outils d'accessibilité pour Electron, ajoutez les à cette documentation avec une pull request.

## Activer manuellement les fonctionnalités d'accessibilité

Les applications Electron activeront automatiquement les fonctionnalités d'accessibilité en présence de technologies d'assistance (e. [JAWS](https://www.freedomscientific.com/products/software/jaws/) sur Windows ou [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) sur macOS). Consultez la [documentation d’accessibilité](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) de Chrome pour plus de détails.

Vous pouvez également basculer manuellement ces fonctionnalités soit dans votre application Electron ou en définissant des drapeaux dans des logiciels natifs tiers.

### Utiliser l'API d'Electron

En utilisant l'API [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) vous pouvez exposer manuellement l'arborescence d'accessibilité de Chrome aux utilisateurs dans les préférences de l'application. Notez que les utilitaires d'assistance système de l'utilisateur ont la priorité sur ce paramètre et le remplaceront.

### Au sein d'un logiciel tiers

#### macOS

Sur macOS, la technologie d'assistance tierce peut activer/désactiver les fonctionnalités d'accessibilité dans les applications Electron en définissant l'attribut `AXManualAccessibility` par programmation :

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
