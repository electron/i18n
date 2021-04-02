---
title: Electron 12.0.0
author:
  - VerteDinde
  - mlaurencine (mlaurencin)
  - sofianguy
date: '2021-03-02'
---

Electron 12.0.0 est disponible ! Il comprend des mises à niveau vers chromium `89`, V8 `8.9` et nœud.js `14.16`. Nous avons ajouté des modifications au module distant, de nouvelles valeurs par défaut pour contextIsolation, une nouvelle API webFrameMain et des améliorations générales. Lisez la suite ci-dessous pour plus de détails !

---

La team Electron est excitée d'annoncer la sortie de Electron 12.0.0 ! Vous pouvez l'installer avec npm via `npm install electron@latest` ou le télécharger sur notre [site web](https://electronjs.org/releases/stable). Continuer à lire pour plus de détails sur cette version, et s'il vous plaît partager tout commentaire que vous avez!

## Changements notables

### Changements de pile

* Chromium `89`
    * [Nouveau avec Chrome 88](https://developer.chrome.com/blog/new-in-chrome-88/)
    * [Nouveau avec Chrome 89](https://developer.chrome.com/blog/new-in-chrome-89/)
* Nœud.js `14.16`
    * [Nœud 14.16.0 blog post](https://nodejs.org/en/blog/release/v14.16.0/)
    * [Nœud 14.0.0 blog post](https://nodejs.org/en/blog/release/v14.0.0/)
* V8 `8.9`
    * [V8 8.8 blog post](https://v8.dev/blog/v8-release-88)
    * [V8 8.9 blog post](https://v8.dev/blog/v8-release-89)

### Surligner les fonctionnalités

* La méthode contextbridge `exposeInMainWorld` 'objet peut désormais exposer les API non objectivantes. [#26834](https://github.com/electron/electron/pull/26834)
* Surclassé du nœud 12 au nœud 14. [#23249](https://github.com/electron/electron/pull/25249)
* Ajout d’une `webFrameMain` api pour accéder aux sous-cadres d’une instance `WebContents` 'une instance à partir du processus principal. [#25464](https://github.com/electron/electron/pull/25464)
* Les valeurs par défaut des `contextIsolation` et `worldSafeExecuteJavaScript` sont maintenant `true`. [#27949](https://github.com/electron/electron/pull/27949) [#27502](https://github.com/electron/electron/pull/27502)

Consultez les [de version 12.0.0](https://github.com/electron/electron/releases/tag/v12.0.0) pour une liste complète de nouvelles fonctionnalités et modifications.

## Briser les changements

* Déprécié le module `remote` 'œil. Il est remplacé par [`@electron/remote`](https://github.com/electron/remote). [#25293](https://github.com/electron/electron/pull/25293)
    * Si vous utilisez actuellement le module `remote` , nous avons écrit [guide pour migrer vers `@electron/remote` ici.](https://github.com/electron/remote#migrating-from-remote)
* Modification de la valeur par défaut de `contextIsolation` en `true`. [#27949](https://github.com/electron/electron/pull/27949)
* Modification de la valeur par défaut de `worldSafeExecuteJavaScript` en `true`. [#27502](https://github.com/electron/electron/pull/27502)
* Modification du défaut de `crashReporter.start({ compress })` de `false` à `true`. [#25288](https://github.com/electron/electron/pull/25288)
* Prise en charge flash supprimée : Chrome a supprimé le support de Flash, qui a également été supprimé dans Electron 12. Consultez [Feuille de route flash de Chrome pour plus](https://www.chromium.org/flash-roadmap) plus de détails.
* SSE3 requis pour Chrome sur x86: Chrome a supprimé le support pour [les processeurs x86 plus anciens qui ne répondent pas à un minimum de SSE3 (Streaming SIMD Extensions 3) prise en charge](https://docs.google.com/document/d/1QUzL4MGNqX4wiLvukUwBf6FdCL35kCDoEJTm2wMkahw/edit#heading=h.7nki9mck5t64). Ce support a également été supprimé dans Electron 12.

Plus d'informations à propos de ces changements et de futurs peuvent être trouvées sur la page [Changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Changements API

* Ajout `webFrameMain` 'API : le module `webFrameMain` peut être utilisé pour rechercher des cadres à travers les instances [`WebContents`](/docs/api/web-contents.md) existantes. Il s’agit de l’équivalent principal du processus de l’API webFrame existante. Plus d’informations sur cette nouvelle API peuvent être trouvées [ici](https://github.com/electron/electron/pull/25464), et dans notre documentation [et](https://www.electronjs.org/docs/api/web-frame-main).
* `app` modifications de l'API :
    * Ajout de `serviceName` non localisés `'child-process-gone'` / `app.getAppMetrics()`. [#25975](https://github.com/electron/electron/pull/25975)
    * Ajout de nouvelles `app.runningUnderRosettaTranslation` pour détecter lors de l’exécution sous rosetta sur le silicium Apple. [#26444](https://github.com/electron/electron/pull/26444)
    * Ajout `exitCode` détails `render-process-gone` (app & webContents). [#27677](https://github.com/electron/electron/pull/27677)
* `BrowserWindow` Changements d'API :
    * Ajout `BrowserWindow.isTabletMode()` 'API. [#25209](https://github.com/electron/electron/pull/25209)
    * Ajout `resized` événements (Windows/macOS) et `moved` (Windows) à `BrowserWindow`. [#26216](https://github.com/electron/electron/pull/26216)
    * Ajout d' `system-context-menu` 'événement pour permettre de prévenir et de prépondéner le menu contexturé du système. [#25795](https://github.com/electron/electron/pull/25795)
    * Ajout `win.setTopBrowserView()` afin que `BrowserView`s puissent être soulevées. [#27713](https://github.com/electron/electron/pull/27713)
    * Ajout `webPreferences.preferredSizeMode` pour autoriser les vues de dimensionnement en fonction de la taille minimale de leur document. [#25874](https://github.com/electron/electron/pull/25874)
* `contextBridge` 'API modifie :
    * ContextBridge autorisé `exposeInMainWorld` méthode pour exposer les API non-objet. [#26834](https://github.com/electron/electron/pull/26834)
* `display` 'API modifie :
    * Ajout `displayFrequency` propriété à l’objet `Display` pour permettre d’obtenir des informations sur le taux de rafraîchissement sur Windows. [#26472](https://github.com/electron/electron/pull/26472)
* `extensions` 'API modifie :
    * Prise en charge supplémentaire de certaines `chrome.management` API. [#25098](https://github.com/electron/electron/pull/25098)
* `MenuItem` 'API modifie :
    * Prise en charge supplémentaire pour afficher le menu de partage macOS. [#25629](https://github.com/electron/electron/pull/25629)
* `net` 'API modifie :
    * Ajout d’une nouvelle option `credentials` pour `net.request()`. [#25284](https://github.com/electron/electron/pull/25284)
    * Ajout `net.online` pour détecter s’il existe actuellement une connexion Internet. [#21004](https://github.com/electron/electron/pull/21004)
* `powerMonitor` 'API modifie :
    * Ajout `powerMonitor.onBatteryPower`. [#26494](https://github.com/electron/electron/pull/26494)
    * Ajout d’un événement de commutation rapide de l’utilisateur à powerMonitor sur macOS. [#25321](https://github.com/electron/electron/pull/25321)
* `session` API change :
    * Ajout `allowFileAccess` 'option à `ses.loadExtension()` 'API. [#27702](https://github.com/electron/electron/pull/27702)
    * Ajout `display-capture` 'API pour `session.setPermissionRequestHandler`. [#27696](https://github.com/electron/electron/pull/27696)
    * Ajout d’une option `disabledCipherSuites` à `session.setSSLConfig`. [#25818](https://github.com/electron/electron/pull/25818)
    * Ajout `extension-loaded`, `extension-unloaded`, et `extension-ready` événements à `session`. [#25385](https://github.com/electron/electron/pull/25385)
    * Ajout `session.setSSLConfig()` pour permettre la configuration de SSL. [#25461](https://github.com/electron/electron/pull/25461)
    * Prise en charge supplémentaire pour spécifier explicitement `direct`, `auto_detect` modes `system` ou  en `session.setProxy()`. [#24937](https://github.com/electron/electron/pull/24937)
    * Ajout d [api sérielle](https://web.dev/serial/) support technique. [#25237](https://github.com/electron/electron/pull/25237)
    * Ajout d’API pour activer/désactiver le checker orthographié. [#26276](https://github.com/electron/electron/pull/26276)
* `shell` API modifie :
    * Ajout d’une nouvelle `shell.trashItem()` api, en remplacement de l' `shell.moveItemToTrash()`. [#25114](https://github.com/electron/electron/pull/25114)
* `webContents` modifications de l'API :
    * Ajout d’un petit indice de console à la console pour aider à déboger les plantages de renderer. [#25317](https://github.com/electron/electron/pull/25317)
    * Ajout `frame` et `webContents` propriétés aux détails de l’objet dans les gestionnaires webRequest. [#27334](https://github.com/electron/electron/pull/27334)
    * Ajout `webContents.forcefullyCrashRenderer()` de mettre fin avec force à un processus de rendu pour aider à récupérer un renderer suspendu. [#25580](https://github.com/electron/electron/pull/25580)
    * Ajout `setWindowOpenHandler` 'API pour les fenêtres enfant créées par renderer, et dépréciez `new-window` événement. [#24517](https://github.com/electron/electron/pull/24517)
* `webFrame` 'API modifie :
    * Ajout d’API spellcheck au renderer. [#25060](https://github.com/electron/electron/pull/25060)

### Modifications supprimées/dépréciées

Les API suivantes ont été supprimées ou sont maintenant dépréciées :

* Déprécié le module `remote` 'œil. Il est remplacé par [`@electron/remote`](https://github.com/electron/remote). [#25293](https://github.com/electron/electron/pull/25293)
* Suppression des API `crashReporter` dépréciées. [#26709](https://github.com/electron/electron/pull/26709)
* Suppression des liens vers le site Electron du menu « Aide » par défaut dans les applications emballées. [#25831](https://github.com/electron/electron/pull/25831)

## Fin du support pour 9.x.y

Electron 9.x.y a a atteint la fin du support selon la politique de soutien [projet](https://electronjs.org/docs/tutorial/support#supported-versions). Nous encourageons les développeurs et les applications à mettre à jour vers une version plus récente d'Electron.

## Ce qui suit

À court terme, vous pouvez vous attendre à ce que l'équipe continue de se concentrer sur le développement des principaux composants qui composent Electron, y compris Chromium, Node, et V8. Bien que nous veillions à ne pas faire de promesses à propos des dates de publication, notre plan est la sortie de nouvelles versions majeures d'Electron avec de nouvelles versions de ces composants environ un trimestre. Le [provisoire de 13.0.0](https://electronjs.org/docs/tutorial/electron-timelines) les dates clés du cycle de vie de développement d’Electron 13.0. Aussi, [voir notre document de versioning](https://electronjs.org/docs/tutorial/electron-versioning) pour plus d'informations sur le versioning dans Electron.

Pour des informations sur les changements de rupture prévus dans les versions à venir d'Electron, [voir notre documentation sur les changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).
