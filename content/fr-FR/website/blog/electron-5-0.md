---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '2019-04-23'
---

L'équipe d'Electron est heureuse d'annoncer la sortie d'Electron 5.0.0 ! Vous pouvez l'installer avec npm via `npm install electron@latest` ou télécharger les archives tar à partir de [notre page de publications](https://github.com/electron/electron/releases/tag/v5.0.0). La version est remplie de mises à jour, de correctifs et de nouvelles fonctionnalités. Nous avons hâte de voir ce que vous construisez avec eux ! Continuer à lire pour plus de détails sur cette version, et s'il vous plaît partager tout commentaire que vous avez!

---

## Quoi de neuf ?

Une grande partie de la fonctionnalité d'Electron est fournie par les composants principaux de Chromium, Node.js et V8. Electron se tient à jour avec ces projets pour fournir à nos utilisateurs de nouvelles fonctionnalités JavaScript, des améliorations de performance et des correctifs de sécurité. Chacun de ces paquets a un bug de version majeur dans Electron 5 :

- Chromium `73.0.3683.119`
  - [Nouveau dans 70](https://developers.google.com/web/updates/2018/10/nic70)
  - [Nouveau en 71](https://developers.google.com/web/updates/2018/12/nic71)
  - [Nouveau dans 72](https://developers.google.com/web/updates/2019/01/nic72)
  - [Nouveau dans 73](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [Billet de blog Node 12](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`.
  - [Nouvelles fonctionnalités JS](https://twitter.com/mathias/status/1120700101637353473)

Electron 5 inclut également des améliorations aux API spécifiques à Electron. Un résumé des changements majeurs est ci-dessous ; pour la liste complète des modifications, consultez les [notes de version d'Electron v5.0.0](https://github.com/electron/electron/releases/tag/v5.0.0).

### Promisification

Electron 5 poursuit l'initiative [Promisification initiative](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) pour convertir l'API de rappel d'Electron pour utiliser Promises. Ces API ont été converties pour Electron 5 :
* `app.getFileIcon`
* `contentTracing.getCategories`
* `format@@0 contentTracing.startRecording`
* `contentTracing.stopRecording`
* `debugger.sendCommand`
* API de cookies
* `Ouverture externe`
* `Charger un fichier`
* `Charger l'URL`
* `Niveau de zoom`
* `Facteur de zoom`
* `win.capturePage`

### Accès aux couleurs du système pour macOS

Ces fonctions ont été modifiées ou ajoutées à `systemPreferences` pour accéder aux couleurs des systèmes macOS :
* `getAccentColor`
* `Obtenir la couleur des préférences du système`
* `systemPreferences.getSystemColor`

### Informations sur la mémoire de processus

La fonction `process.getProcessMemoryInfo` a été ajoutée pour obtenir des statistiques d'utilisation de la mémoire à propos du processus actuel.

### Filtrage supplémentaire pour les API distantes

Pour améliorer la sécurité dans l'API `distante` , de nouveaux événements distants ont été ajoutés pour que `télécommande. etBuiltin`, `distante. etCurrentWindow`, `remote.getCurrentWebContents` et `<webview>.getWebContents` peut être [filtré](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows).

### Fenêtre de navigation multiple dans la fenêtre de navigation

BrowserWindow prend maintenant en charge la gestion de plusieurs BrowserViews dans la même BrowserWindow.

## Changements de rupture

### Par défaut pour les applications empaquetées

Les applications empaquetées se comporteront désormais de la même manière que l'application par défaut : un menu d'application par défaut sera créé à moins que l'application en ait un et que l'événement `tout fermé pour la fenêtre` ne soit géré automatiquement à moins que l'application ne gère l'événement.

### Bac à sable mixte

Le mode bac à sable mixte est maintenant activé par défaut. Les moteurs de rendu lancés avec `bac à sable : true` seront maintenant en fait bac à sable, où auparavant ils ne seraient bac à sable que si le mode bac à sable mixte était également activé.

### Améliorations de sécurité
Les valeurs par défaut de `nodeIntegration` et `webviewTag` sont désormais `fausses` pour améliorer la sécurité.

### Correcteur orthographique asynchrone

L'API de vérification orthographique a été modifiée pour fournir [des résultats asynchrones](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider).

## Dépréciations

Les API suivantes sont nouvellement obsolètes dans Electron 5.0.0 et sont prévues pour la suppression en 6.0.0 :

### binaires Mksnapshot pour bras et arm64
Les binaires natifs de mksnapshot pour arm et arm64 sont dépréciés et seront supprimés en 6. . 0. Des instantanés peuvent être créés pour les arm et arm64 à l’aide des binaires x64.

### APIs ServiceWorker sur WebContents
Les API ServiceWorker obsolètes sur WebContents en préparation de leur suppression.
* `%s %s %s %s %s %s`
* `désinscrire le Service Worker`

### Modules automatiques avec contenu web en bac à sable
Afin d'améliorer la sécurité, les modules suivants sont dépréciés pour être utilisés directement via `require` et devront à la place être inclus via `distante. équiper` dans un contenu web en bac à sable:
* `electron.screen`
* `child_process`
* `fs`
* `os`
* `chemin d'accès`

## webFrame Isolated World APIs
`webFrame.setIsolatedWorldContentSecurityPolicy`,`webFrame.setIsolatedWorldHumanReadableName`, `webFrame.setIsolatedWorldSecurityOrigin` ont été dépréciés en faveur de `webFrame.setIsolatedWorldInfo`.

### Bac à sable mixte
`enableMixedSandbox` et le commutateur en ligne de commande `--enable-mixed-sandbox` existent toujours pour compatibilité, mais sont obsolètes et n'ont aucun effet.

## Fin du support pour 2.0.x

Par notre [politique de versions supportées](https://electronjs.org/docs/tutorial/support#supported-versions), 2.0.x a atteint la fin de sa vie.

## Programme de feedback

Nous continuons à utiliser notre [Programme de Feedback de l'application](https://electronjs.org/blog/app-feedback-program) pour les tests. Les projets qui participent à ce programme testent les bétas d'Electron sur leurs applications ; et en retour, les nouveaux bogues qu'ils trouvent sont priorisés pour la version stable. Si vous souhaitez participer ou en savoir plus, [consultez notre blog sur le programme](https://electronjs.org/blog/app-feedback-program).

## Ce qui suit

À court terme, vous pouvez vous attendre à ce que l'équipe continue de se concentrer sur le développement des principaux composants qui composent Electron, y compris Chromium, Node, et V8. Bien que nous veillions à ne pas faire de promesses à propos des dates de publication, notre plan est la sortie de nouvelles versions majeures d'Electron avec de nouvelles versions de ces composants environ un trimestre. La [tentative 6.0.0 planning](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) cartographie les dates clés du cycle de vie de développement d'Electron 6. Aussi, [voir notre document de versioning](https://electronjs.org/docs/tutorial/electron-versioning) pour plus d'informations sur le versioning dans Electron.

Pour des informations sur les changements de rupture prévus dans les versions à venir d'Electron, [voir notre documentation sur les changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
