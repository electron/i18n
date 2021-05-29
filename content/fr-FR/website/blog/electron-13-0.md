---
title: Electron 13.0.0
author:
  - sofianguy
  - georgexu99
  - VerteDinde
date: '2021-05-25'
---

Electron 13.0.0 est disponible ! Cette version inclue les mises à jour pour Chromium `91`, V8 `9.1`, et Node. js. Nous avons ajouté plusieurs mises à jour de l'API, des corrections de bugs et des améliorations générales. Lisez la suite ci-dessous pour plus de détails !

---

La team Electron est excitée d'annoncer la sortie de Electron 13.0.0 ! Vous pouvez l'installer avec npm via `npm install electron@latest` ou le télécharger sur notre [site web](https://electronjs.org/releases/stable). Continuer à lire pour plus de détails sur cette version, et s'il vous plaît partager tout commentaire que vous avez!

## Changements notables

### Changements de pile

* Chromium `91`
    * [Nouveau avec Chrome 91](https://developer.chrome.com/blog/new-in-chrome-91/)
    * [Nouveau avec Chrome 90](https://developer.chrome.com/blog/new-in-chrome-90/)
* Node.js `14.16.0`
    * [Node 14.16.0 blog post](https://nodejs.org/en/blog/release/v14.16.0/)
    * [Node 14.0.0 blog post](https://nodejs.org/en/blog/release/v14.0.0/)
* V8 `9.1`
    * [V8 9.1 blog post](https://v8.dev/blog/v8-release-91)
    * [V8 9.0 blog post](https://v8.dev/blog/v8-release-90)

### Surligner les fonctionnalités

* Ajout de la propriété `process.contextIsolated` qui indique si le contexte de rendu actuel a `contextIsolation` activé. [#28252](https://github.com/electron/electron/pull/28252)
* Added new `session.storagePath` API to get the path on disk for session-specific data. [#28866](https://github.com/electron/electron/pull/28866)
* Déprécié l'événement `new-window` de `WebContents`. Il est remplacé par `webContents.setWindowOpenHandler()`
* Ajout de `process.contextId` utilisé par `@electron/remote`. [#28251](https://github.com/electron/electron/pull/28251)

Voir les notes de version 13.0.0[](https://github.com/electron/electron/releases/tag/v13.0.0) pour une liste complète des nouvelles fonctionnalités et des modifications.

## Changements de rupture

* `window.open()` le paramètre frameName n'est plus défini comme titre de fenêtre. [#27481](https://github.com/electron/electron/pull/27481)
* Changed `session.setPermissionCheckHandler(handler)` to allow for `handler`'s first parameter, `webContents` to be `null`. [#19903](https://github.com/electron/electron/pull/19903)

Plus d'informations à propos de ces changements et de futurs peuvent être trouvées sur la page [Changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Changements API

* Ajout de l'option `roundedCorners` pour `BrowserWindow`. [#27572](https://github.com/electron/electron/pull/27572)
* Ajout de la nouvelle API `session.storagePath` pour obtenir le chemin des données spécifiques à la session sur le disque.[28866](https://github.com/electron/electron/pull/28866)
* Ajout de la prise en charge du passage d'éléments DOM par le pont contextuel. [#26776](https://github.com/electron/electron/pull/26776)
* Ajout de `process.uptime()` aux moteurs de rendu en bac à sable. [#26684](https://github.com/electron/electron/pull/26684)
* Ajout de champs manquants aux paramètres émis dans le cadre de l'événement `context-menu`.[#26788](https://github.com/electron/electron/pull/26788)
* Ajout de la prise en charge de l'enregistrement des service workers de l'extension Manifest V3.
* Ajout de l’événement « registration-completed » aux ServiceWorkers. [#27562](https://github.com/electron/electron/pull/27562)

### Removed/Deprecated Changes

Les API suivantes ont été supprimées ou sont désormais dépréciées :

* Déprécié l'événement `new-window` de `WebContents`. Il est remplacé par `webContents.setWindowOpenHandler()`
* Suppression de `shell.moveItemToTrash()` qui était déprécié. [#26723](https://github.com/electron/electron/pull/26723)
* Suppression des API d'extension `BrowserWindow` dépréciées suivantes: :

    * `BrowserWindow.addExtension(path)`
    * `BrowserWindow.addDevToolsExtension(path)`
    * `BrowserWindow.removeExtension(name)`
    * `BrowserWindow.removeDevToolsExtension(name)`
    * `BrowserWindow.getExtensions()`
    * `BrowserWindow.getDevToolsExtensions()`

    Utiliser l'API `session` à la place :

    * `ses.loadExtension(path)`
    * `ses.removeExtension(extension_id)`
    * `ses.getAllExtensions()`

* Les méthodes suivantes de `systemPreferences` ont été dépréciées :

    * `systemPreferences.isDarkMode()`
    * `systemPreferences.isInvertedColorScheme()`
    * `systemPreferences.isHighContrastColorScheme()`

    Veuillez utiliser à la place les propriétés de `nativeTheme` suivantes :

    * `nativeTheme.shouldUseDarkColors`
    * `nativeTheme.shouldUseInvertedColorScheme`
    * `nativeTheme.shouldUseHighContrastColors`

## Fin du support pour 10.x.y

Electron 10.x.y a atteint sa limite pour le support conformément à la politique d'assistance du projet[politique d'assistance](https://electronjs.org/docs/tutorial/support#supported-versions). Nous encourageons les développeurs et les applications à mettre à jour vers une version plus récente d'Electron.

## Ce qui suit

À court terme, vous pouvez vous attendre à ce que l'équipe continue de se concentrer sur le développement des principaux composants qui composent Electron, y compris Chromium, Node, et V8. Bien que nous veillions à ne pas faire de promesses à propos des dates de publication, notre plan est la sortie de nouvelles versions majeures d'Electron avec de nouvelles versions de ces composants environ un trimestre. Le planning escompté de la version 14.0.0 [ planning](https://electronjs.org/docs/tutorial/electron-timelines) défini les dates clés du cycle de vie de développement d'Electron 14.0. Aussi, [voir notre document de versioning](https://electronjs.org/docs/tutorial/electron-versioning) pour plus d'informations sur le versioning dans Electron.

Pour des informations sur les changements de rupture prévus dans les versions à venir d'Electron, [voir notre documentation sur les changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).
