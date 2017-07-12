# Accessibilité

La réalisation d'applications accessibles est importante et nous sommes heureux d'introduire de nouvelles fonctionnalités pour [Devtron](https://electron.atom.io/devtron) et [Spectron](https://electron.atom.io/spectron) qui donnent aux développeurs la possibilité de rendre leurs applications meilleures pour tous.

* * *

Les problèmes d’accessibilité dans les app Electron sont similaires à ceux des sites Web parce qu’ils sont tous deux en HTML. Avec les app Electron, toutefois, vous ne pouvez pas utilisez les ressources en ligne pour les vérifications de l'accessibilité parce que votre application n'est pas une URL.

Ces nouvelles fonctionnalités apportent ces outils d’audit à votre application Electron. Vous pouvez choisir d’ajouter des vérifications à vos tests avec Spectron ou utilisez-les dans DevTools avec Devtron. Lire la suite pour un résumé des outils ou regardez notre [documentation sur l'accessibilité](https://electron.atom.io/docs/tutorial/accessibility) pour plus d’informations.

### Spectron

Dans l’infrastructure de test Spectron, vous pouvez auditer maintenant chaque fenêtre et `<webview>`balise dans votre application. Par exemple :

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Vous pouvez en savoir plus sur cette fonctionnalité dans la [documentation de Spectron](https://github.com/electron/spectron#accessibility-testing).

### Devtron

Dans Devtron, il y a un nouvel onglet accessibilité qui permet à une page dans votre application de vérification, de trier et de filtrer les résultats.

![capture d’écran devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ces deux outils utilisent la bibliothèque [Outils d'accessibilité pour les développeurs](https://github.com/GoogleChrome/accessibility-developer-tools) faite par Google pour Chrome. Vous pouvez en apprendre davantage sur les règles d’audit accessibilité que cette bibliothèque utilise sur ce [wiki du référentiel](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Si vous connaissez d’autres bons outils d'accessibilité pour Electrons, ajoutez-les à la [documentation de l’accessibilité](https://electron.atom.io/docs/tutorial/accessibility) avec une pull request.