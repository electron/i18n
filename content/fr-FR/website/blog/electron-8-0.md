---
title: Electron 8.0.0
author:
  - jkleinsc
  - sofianguy
date: '2020-02-04'
---

Electron 8.0.0 est sorti ! Il inclut les mises à jour vers Chromium `80`, V8 `8.0`, et Node.js `12.13.0`. Nous avons ajouté le correcteur orthographique intégré de Chrome, et bien plus encore !

---

L'équipe d'Electron est heureuse d'annoncer la sortie d'Electron 8.0.0 ! Vous pouvez l'installer avec npm via `npm install electron@latest` ou le télécharger sur notre [site web](https://electronjs.org/releases/stable). La version est remplie de mises à jour, de correctifs et de nouvelles fonctionnalités. Nous avons hâte de voir ce que vous construisez avec eux ! Continuer à lire pour plus de détails sur cette version, et s'il vous plaît partager tout commentaire que vous avez!

## Changements notables

### Changements de pile
* Chromium `80.0.3987.86`
    * [Nouveau dans Chrome 79](https://developers.google.com/web/updates/2019/12/nic79)
    * [Nouveau dans Chrome 80](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [Node 12.13.0 article de blog](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [V8 7.9 blog post](https://v8.dev/blog/v8-release-79)
    * [Article de blog V8 8.0](https://v8.dev/blog/v8-release-80)

### Surligner les fonctionnalités
* Utilisation implémentée de la fonction de correcteur orthographique intégrée de Chrome. Voir plus de détails dans [#20692](https://github.com/electron/electron/pull/20692) et [#21266](https://github.com/electron/electron/pull/21266).
* La communication IPC utilise maintenant l'algorithme de clone structuré de v8. Ceci est plus rapide, plus fonctionnel et moins surprenant que la logique existante, et apporte un gain de performance de 2x pour les grands buffers et les objets complexes. La latence des petits messages n'est pas significativement affectée. Voir plus de détails dans [#20214](https://github.com/electron/electron/pull/20214).

Voir les [notes de version 8.0.0](https://github.com/electron/electron/releases/tag/v8.0.0) pour une liste complète des nouvelles fonctionnalités et des changements.

## Changements de rupture

* Afficher le nom du module dans l'avertissement de dépréciation pour les modules contextuels. [#21952](https://github.com/electron/electron/pull/21952)
    * Ceci est un travail continu pour une future exigence que les modules natifs de Node chargés dans le processus de rendu soient soit [N-API](https://nodejs.org/api/n-api.html) ou [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). L'info complète et le calendrier proposé sont détaillés dans [ce problème](https://github.com/electron/electron/issues/18397).
* Les valeurs envoyées par IPC sont maintenant sérialisées avec l'algorithme de clonage structuré.  [#20214](https://github.com/electron/electron/pull/20214)
* Le rendu hors écran est actuellement désactivé en raison du manque de mainteneur pour travailler sur cette fonctionnalité.  Il a cassé lors de la mise à niveau de Chromium et a ensuite été désactivé. [#20772](https://github.com/electron/electron/issues/20772)

Plus d'informations à propos de ces changements et de futurs peuvent être trouvées sur la page [Changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Changements API
* `app` modifications de l'API :
    * Ajout de `app.getApplicationNameForProtocol(url)`. [#20399](https://github.com/electron/electron/pull/20399)
    * Ajout du support de `app.showAboutPanel()` et `app.setAboutPanelOptions(options)` sur Windows. [#19420](https://github.com/electron/electron/pull/19420)
* `BrowserWindow` Changements d'API :
    * La documentation mise à jour pour noter que les options BrowserWindow `hasShadow` sont disponibles sur toutes les plates-formes [#20038](https://github.com/electron/electron/pull/20038)
    * Ajout de l'option `trafficLightPosition` aux options BrowserWindow pour permettre un positionnement personnalisé pour les boutons de feux de circulation. [#21781](https://github.com/electron/electron/pull/21781)
    * Ajout de l'option `accessibleTitle` à BrowserWindow pour définir le titre de la fenêtre accessible [#19698](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` peut maintenant retourner nulle [#1998](https://github.com/electron/electron/pull/19983)
    * Ajout de `BrowserWindow.getMediaSourceId()` et `BrowserWindow.moveAbove(mediaSourceId)`. [#18926](https://github.com/electron/electron/pull/18926)
    * Ajout de la prise en charge de l'événement `will-move` sur macOS. [#19641](https://github.com/electron/electron/pull/19641)
* Documenté précédemment non documenté `crashReporter.getCrashesDirectory()`. [#20417](https://github.com/electron/electron/pull/20417)
* `Dialogue` modifications de l'API :
    * Ajout de la propriété `dontAddToRecent` à `dialog.showOpenDialog` et `dialogue. howOpenDialogSync` pour éviter que des documents ne soient ajoutés aux documents récents sur Windows dans les boîtes de dialogue ouvertes. [#19669](https://github.com/electron/electron/pull/19669)
    * Ajout de la personnalisation des propriétés à `dialog.showSaveDialog` et `dialog.showSaveDialogSync`. [#19672](https://github.com/electron/electron/pull/19672)
* `Notification` Changements d'API :
    * Ajout de l'option `timeoutType` pour permettre aux utilisateurs de Linux/Windows de définir le type de notification expiré. [#20153](https://github.com/electron/electron/pull/20153)
    * Ajout de l'option `urgence`  pour définir l'urgence sur les notifications Linux. [#20152](https://github.com/electron/electron/pull/20152)
* `session` API change :
    * Documentation mise à jour sur `session.setProxy(config)` et `session.setCertificateVerifyProc(proc)` pour noter les options optionnelles. [#19604](https://github.com/electron/electron/pull/19604)
    * Ajout de `session.downloadURL(url)` pour permettre de déclencher des téléchargements sans BrowserWindow. [#19889](https://github.com/electron/electron/pull/19889)
    * Ajout du support des hints de ressources de préconnexion HTTP via `session.preconnect(options)` et l'événement `preconnect`. [#18671](http://github.com/electron/electron/pull/18671)
    * Ajout de `session.addWordToSpellCheckerDictionary` pour autoriser les mots personnalisés dans le dictionnaire [#21297](http://github.com/electron/electron/pull/21297)
* Ajout de l'option à `shell.moveItemToTrash(fullPath[, deleteOnFail])` sur macOS pour spécifier ce qui se passe lorsque moveItemToTrash échoue. [#19700](https://github.com/electron/electron/pull/19700)
* `systemPreferences` API change :
    * Mise à jour de la documentation `systemPreferences.getColor(color)` pour macOS. [#2061](https://github.com/electron/electron/pull/20611)
    * Ajout du type de média `screen` à `systemPreferences.getMediaAccessStatus()`. [#20764](https://github.com/electron/electron/pull/20764)
* Ajout de `nativeTheme.themeSource` pour permettre aux applications de remplacer Chromium et le choix du thème de l'OS. [#19960](https://github.com/electron/electron/pull/19960)
* Changements de l'API TouchBar :
    * Propriété `accessibilityLabel` ajoutée à `TouchBarButton` et `TouchBarLabel` pour améliorer l'accessibilité TouchBarButton/TouchBarLab. [#20454](https://github.com/electron/electron/pull/20454)
    * Mise à jour de la documentation relative à TouchBar [#19444](https://github.com/electron/electron/pull/19444)
* `tiroir` modifications de l'API :
    * Ajout de nouvelles options à `tray.displayBalloon()`: `iconType`, `largeIcon`, `noSound` et `respectQuietTime`. [#19544](https://github.com/electron/electron/pull/19544)
    * Ajout de tray.removeBalloon(), qui supprime une notification déjà affichée. [#19547](https://github.com/electron/electron/pull/19547)
    * Ajout de tray.focus(), qui retourne le focus dans la zone de notification de la barre des tâches. feat: add tray.focus() [#19548](https://github.com/electron/electron/pull/19548)
* `webContents` modifications de l'API :
    * Ajout de `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` pour exposer executeJavaScriptInIsolatedWorld sur l'API webContents. [#21190](https://github.com/electron/electron/pull/21190)
    * Ajout de méthodes pour capturer un contenu caché. [#21679](https://github.com/electron/electron/pull/21679)
    * Ajout d'options à `webContents.print([options], [callback])` pour permettre la personnalisation des en-têtes de page d'impression et des pieds de page. [#19688](https://github.com/electron/electron/pull/19688)
    * Ajout de la possibilité d'inspecter des travailleurs partagés spécifiques via `webContents.getAllSharedWorkers()` et `webContents.inspectSharedWorkerById(workerId)`. [#20389](https://github.com/electron/electron/pull/20389)
    * Ajout du support des options `fitToPageEnabled` et `scaleFactor` dans WebContents.printToPDF(). [#20436](https://github.com/electron/electron/pull/20436)
* La documentation `webview.printToPDF` mise à jour pour indiquer le type de retour est maintenant Uint8Array. [#20505](https://github.com/electron/electron/pull/20505)

### APIs obsolètes
Les API suivantes sont maintenant obsolètes:
* L'option non fonctionnelle `visibleOnFullScreen` est obsolète dans `BrowserWindow.setVisibleOnAllWorkspaces` avant sa suppression dans la prochaine version majeure de la version. [#21732](https://github.com/electron/electron/pull/21732)
* Déprécié `alternate-selected-control-text` sur `systemPreferences.getColor(color)` pour macOS. [#2061](https://github.com/electron/electron/pull/20611)
* `setLayoutZoomLevelLimits obsolètes` sur `webContents`, `webFrame`, et `<webview> Tag` car Chromium a supprimé cette capacité. [#21296](https://github.com/electron/electron/pull/21296)
* La valeur par défaut de `false` pour `app.allowRendererProcessReuse` est maintenant obsolète. [#21287](https://github.com/electron/electron/pull/21287)
* Déprécié `<webview>.getWebContents()` car il dépend du module distant. [#20726](https://github.com/electron/electron/pull/20726)

## Fin du support pour 5.x.y

Electron 5.x.y a atteint la fin du support conformément au projet [politique d'assistance](https://electronjs.org/docs/tutorial/support#supported-versions). Nous encourageons les développeurs et les applications à mettre à jour vers une version plus récente d'Electron.

## Programme de feedback

Nous continuons à utiliser notre [Programme de Feedback de l'application](https://electronjs.org/blog/app-feedback-program) pour les tests. Les projets qui participent à ce programme testent les bétas d'Electron sur leurs applications ; et en retour, les nouveaux bogues qu'ils trouvent sont priorisés pour la version stable. Si vous souhaitez participer ou en savoir plus, [consultez notre blog sur le programme](https://electronjs.org/blog/app-feedback-program).

## Ce qui suit

À court terme, vous pouvez vous attendre à ce que l'équipe continue de se concentrer sur le développement des principaux composants qui composent Electron, y compris Chromium, Node, et V8. Bien que nous veillions à ne pas faire de promesses à propos des dates de publication, notre plan est la sortie de nouvelles versions majeures d'Electron avec de nouvelles versions de ces composants environ un trimestre. Le [planning provisoire de 9.0.0](https://electronjs.org/docs/tutorial/electron-timelines) cartographie les dates clés du cycle de vie de développement d'Electron 9. Aussi, [voir notre document de versioning](https://electronjs.org/docs/tutorial/electron-versioning) pour plus d'informations sur le versioning dans Electron.

Pour des informations sur les changements de rupture prévus dans les versions à venir d'Electron, [voir notre documentation sur les changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Dépréciation du module `distant` (à partir d'Electron 9)
En raison de sérieuses responsabilités en matière de sécurité, nous commençons à préparer la dépréciation du module [`distant`](https://www.electronjs.org/docs/api/remote) à partir d'Electron 9. Vous pouvez lire et suivre [ce problème](https://github.com/electron/electron/issues/21408) qui détaille nos raisons pour cela et inclut un calendrier proposé pour la dépréciation.
