---
title: Outils d'accessibilité
author: jlord
date: '2016-08-23'
---

Rendre des applications accessibles est important et nous sommes heureux d'introduire de nouvelles fonctionnalités à [Devtron](https://electronjs.org/devtron) et [Spectron](https://electronjs.org/spectron) qui permettent aux développeurs de rendre leurs applications meilleures pour tout le monde.

---

Les problèmes d'accessibilité dans les applications Electron sont similaires à ceux des sites Web car ils sont tous deux en fin de compte HTML. Cependant, avec les applications Electron, vous ne pouvez pas utiliser les ressources en ligne pour des audits d'accessibilité car votre application n'a pas d'URL vers laquelle l'auditeur.

Ces nouvelles fonctionnalités apportent ces outils d'audit à votre application Electron. Vous pouvez choisir d'ajouter des audits à vos tests avec Spectron ou les utiliser dans DevTools avec Devtron. Lisez ci-dessous pour un résumé des outils ou consultez notre [documentation d'accessibilité](https://electronjs.org/docs/tutorial/accessibility/) pour plus d'informations.

### Spectron

Dans le framework de test Spectron, vous pouvez maintenant auditer chaque fenêtre et les balises `<webview>` dans votre application. Par exemple :

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Vous pouvez en savoir plus sur cette fonctionnalité dans la [documentation de Spectron](https://github.com/electron/spectron#accessibility-testing).

### Devtron

Dans Devtron, il y a un nouvel onglet d'accessibilité qui vous permettra d'auditer une page dans votre application, de trier et de filtrer les résultats.

![capture d’écran devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ces deux outils utilisent la bibliothèque [Outils de développement d'accessibilité](https://github.com/GoogleChrome/accessibility-developer-tools) construite par Google pour Chrome. Vous pouvez en savoir plus sur les règles d'audit d'accessibilité que cette bibliothèque utilise sur le wiki de ce [dépôt](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Si vous connaissez d'autres grands outils d'accessibilité pour Electron, ajoutez-les à la [documentation d'accessibilité](https://electronjs.org/docs/tutorial/accessibility/) avec une pull request.

