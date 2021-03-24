---
title: Correction de la vulnérabilité du Webview
author: ckerr
date: '2018-03-21'
---

Une vulnérabilité a été découverte, ce qui permettait de réactiver l'intégration de Node.js dans certaines applications Electron qui la désactivent. Cette vulnérabilité a été assignée à l'identifiant CVE [CVE-2018-1000136](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136).

---

## Applications affectées

Une application est affectée si *toutes les* sont vraies :

 1. Exécute sur Electron 1.7, 1.8, ou une beta 2.0.0-
 2. Permet l'exécution de code distant arbitraire
 3. Désactive l'intégration de Node.js
 4. Ne déclare pas explicitement `webviewTag : false` dans ses préférences web
 5. N'active pas l'option `nativeWindowOption`
 6. N'intercepte pas les événements `new-window` et remplace manuellement `event.newGuest` sans utiliser la balise d'options fournies

Bien que cela semble être une minorité d'applications Electron, nous encourageons toutes les applications à être mises à jour par précaution.

## Atténuation

Cette vulnérabilité est corrigée dans les versions d'aujourd'hui de [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13), [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4)et [2.0.0-beta.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5).

Les développeurs qui ne peuvent pas mettre à jour la version Electron de leur application peuvent atténuer la vulnérabilité avec le code suivant :

```js
app.on('web-contents-created', (event, win) => {
  gagne. n('new-window', (event, newURL, frameName, disposition,
                        options, additionalFeatures) => {
    if (! ptions. ebPreferences) options.webPreferences = {};
    options.webPreferences. odeIntegration = false;
    options.webPreferences.nodeIntegrationInWorker = false;
    options. ebPreferences.webviewTag = false;
    supprime options.webPreferences. reload;
  })
})

// et *IF* vous n'utilisez pas du tout WebViews
// vous pouvez aussi vouloir
app. n('web-contents-created', (event, win) => {
  gagne. n('will-attach-webview', (event, webPreferences, params) => {
    event.preventDefault();
  })
})
```

## Informations complémentaires

Cette vulnérabilité a été trouvée et signalée de manière responsable au projet Electron par Brendan Scarvell de [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/).

Pour en savoir plus sur les meilleures pratiques pour sécuriser vos applications Electron, consultez notre [tutoriel de sécurité](https://electronjs.org/docs/tutorial/security).

Pour signaler une vulnérabilité dans Electron, veuillez envoyer un courriel à security@electronjs.org.

Veuillez vous inscrire à notre [liste de courriels](https://groups.google.com/forum/#!forum/electronjs) pour recevoir des mises à jour sur les versions et les mises à jour de sécurité.

