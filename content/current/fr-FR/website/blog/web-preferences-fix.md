---
title: Correction de la vulnérabilité des préférences Web
author: ckerr
date: '2018-08-22'
---

Une vulnérabilité d'exécution de code à distance a été découverte affectant les applications avec la possibilité d'ouvrir des fenêtres enfants imbriquées sur les versions d'Electron (3. .0-beta.6, 2.0.7, 1.8.7 et 1.7.15). Cette vulnérabilité a été assignée à l'identifiant CVE [CVE-2018-15685](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685).

---

## Plateformes affectées

Vous êtes impacté si:

1. Vous avez intégré _n'importe quel contenu utilisateur distant_ , même dans un bac à sable
2. Vous acceptez les entrées de l'utilisateur avec toutes les vulnérabilités XSS

_Détails du produit_

Vous êtes impacté si un code utilisateur s'exécute à l'intérieur d'un `iframe` / peut créer un `iframe`. Étant donné la possibilité d'une vulnérabilité XSS, on peut supposer que la plupart des applications sont vulnérables à ce cas.

Vous êtes également impacté si vous ouvrez l'une de vos fenêtres avec l'option `nativeWindowOpen: true` ou `sandbox: true` option.  Bien que cette vulnérabilité nécessite également une vulnérabilité XSS pour exister dans votre application, vous devriez quand même appliquer l'une des mesures ci-dessous si vous utilisez l'une de ces options.

## Atténuation

Nous avons publié de nouvelles versions d'Electron qui incluent des corrections pour cette vulnérabilité : [`. .0-beta.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7), [`2. .8`](https://github.com/electron/electron/releases/tag/v2.0.8), [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8), et [` 1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16). Nous encourageons tous les développeurs d'Electron à mettre à jour leurs applications vers la dernière version stable immédiatement.

Si, pour une raison quelconque, vous ne pouvez pas mettre à jour votre version d'Electron, vous pouvez protéger votre application en appelant `à blanc. reventDefault()` sur l'événement `new-window` pour tous les  `webContents`'. Si vous n'utilisez pas du tout `window.open` ou toute autre fenêtre enfant, il s'agit également d'une atténuation valide pour votre application.

```javascript
mainWindow.webContents.on('new-window', e => e.preventDefault())
```

Si vous comptez sur la capacité des fenêtres de votre enfant à faire des fenêtres de petits-enfants, alors une troisième stratégie d'atténuation est d'utiliser le code suivant dans votre fenêtre de niveau supérieur:

```javascript
const enforceInheritance = (topWebContents) => {
  const handle = (webContents) => {
    webContents. n('new-window', (event, url, frameName, disposition, options) => {
      if (!options. ebPreferences) {
        options. Objet ebPreferences = {}
      }
      . ssign(options.webPreferences, topWebContents.getLastWebPreferences())
      if (options.webContents) {
        handle(options. ebContents)
      }
    })
  }
  handle(topWebContents)
}

enforceInheritance(mainWindow. ebContents)
```

Ce code va imposer manuellement que les `webPreferences` de haut niveau soient appliquées manuellement à toutes les fenêtres enfants à l'infini profond.

## Informations complémentaires

Cette vulnérabilité a été trouvée et signalée de manière responsable au projet Electron par [Matt Austin](https://twitter.com/mattaustin) de [Contrast Security](https://www.contrastsecurity.com/security-influencers/cve-2018-15685).

Pour en savoir plus sur les meilleures pratiques pour sécuriser vos applications Electron, consultez notre [tutoriel de sécurité][].

Si vous souhaitez signaler une vulnérabilité dans Electron, envoyez un e-mail à security@electronjs.org.

[tutoriel de sécurité]: https://electronjs.org/docs/tutorial/security
