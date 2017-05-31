# Accessibilité

Faire des applications accessibles est important et nous sommes heureux de vous présenter les nouvelles fonctionnalités à [Devtron](https://electron.atom.io/devtron) et [Spectron](https://electron.atom.io/spectron) qui donne aux développeurs la possibilité de présenter leurs applications mieux pour tout le monde.

* * *

Problèmes d’accessibilité dans des applications de l’électronique sont similaires à ceux des sites Web parce qu’ils sont tous deux en bout de ligne HTML. Avec les applications de l’électronique, toutefois, ne permet pas les ressources en ligne pour les vérifications de l’accessibilité parce que votre application n’est pas une URL pour pointer l’auditeur.

Ces nouvelles fonctionnalités apportent ces outils d’audit à votre application d’électrons. Vous pouvez choisir d’ajouter des vérifications à vos tests avec Spectron ou utilisez-les dans DevTools avec Devtron. Lire la suite pour un résumé des outils ou commander nos documentation</a> de accessibility pour plus d’informations.</p> 

### Spectron

Dans l’infrastructure de test Spectron, vous pouvez maintenant auditer chaque fenêtre et `<webview>` de la balise dans votre application. Par exemple :

```javascript
app.client.auditAccessibility () .then(function (audit) {si (audit.failed) {console.error(audit.message)}})
```

Vous pouvez en savoir plus sur cette fonctionnalité en documentation</a> de Spectron.</p> 

### Devtron

Dans Devtron, il y a un nouvel onglet accessibilité qui permet à une page dans votre application de vérification, de trier et de filtrer les résultats.

![capture d’écran devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Deux de ces outils utilisez la bibliothèque de développeur Tools</a> [Accessibility construite par Google pour Chrome. Vous pouvez en apprendre davantage sur les règles d’audit accessibilité que cette bibliothèque utilise sur wiki](https://github.com/GoogleChrome/accessibility-developer-tools) de cette repository.</p> 

Si vous connaissez d’autres outils de grande accessibilité pour les électrons, ajoutez-les à la documentation</a> de accessibility avec une demande de tirer.</p>