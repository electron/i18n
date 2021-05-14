---
title: Electron 9.0.0
author:
  - sofianguy
  - VerteDinde
date: '2020-05-19'
---

Electron 9.0.0 est sorti ! Il inclut les mises à jour vers Chromium `83`, V8 `8.3`et Node.js `12.14`. Nous avons ajouté plusieurs nouvelles intégrations d'API pour notre fonction de vérificateur d'orthographe, activé la visionneuse PDF, et bien plus encore !

---

L'équipe d'Electron est heureuse d'annoncer la sortie d'Electron 9.0.0 ! Vous pouvez l'installer avec npm via `npm install electron@latest` ou le télécharger sur notre [site web](https://electronjs.org/releases/stable). La version est remplie de mises à jour, de correctifs et de nouvelles fonctionnalités. Nous avons hâte de voir ce que vous construisez avec eux ! Continuer à lire pour plus de détails sur cette version, et s'il vous plaît partager tout commentaire que vous avez!

## Changements notables

### Changements de pile

* Chromium `83.0.4103.64`
    * [Nouveau dans Chrome 81](https://developers.google.com/web/updates/2020/04/nic81)
    * [Chrome 82 a été ignoré](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Nouveau dans Chrome 83](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [Node 12.14.1 article de blog](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [Article de blog V8 8.1](https://v8.dev/blog/v8-release-81)
    * [V8 8.3 blog post](https://v8.dev/blog/v8-release-83)

### Surligner les fonctionnalités

* Améliorations multiples de la fonction de vérificateur d'orthographe. Voir plus de détails dans [#22128](https://github.com/electron/electron/pull/22128) et [#22368](https://github.com/electron/electron/pull/22368).
* Amélioration de l'efficacité du gestionnaire d'événements sur Linux. [#23260](https://github.com/electron/electron/pull/23260).
* Activer la visionneuse PDF. [#22131](https://github.com/electron/electron/pull/22131).

Voir les [notes de version 9.0.0](https://github.com/electron/electron/releases/tag/v9.0.0) pour une liste complète des nouvelles fonctionnalités et des changements.

## Changements de rupture

* Avertissement de dépréciation lors de l'utilisation de `remote` sans `enableRemoteModule : true`. [#21546](https://github.com/electron/electron/pull/21546)
    * C'est la première étape de nos plans pour déprécier le module `distant` et le déplacer vers le site utilisateur. Vous pouvez lire et suivre [ce problème](https://github.com/electron/electron/issues/21408) qui détaille nos raisons pour cela et inclut un calendrier proposé pour la dépréciation.
* Définir `app.enableRendererProcessReuse` à true par défaut. [#22336](https://github.com/electron/electron/pull/22336)
    * Ceci est un travail continu pour une future exigence que les modules natifs de Node chargés dans le processus de rendu soient soit [N-API](https://nodejs.org/api/n-api.html) ou [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). L'info complète et le calendrier proposé sont détaillés dans [ce problème](https://github.com/electron/electron/issues/18397).
* L'envoi d'objets non-JavaScript via IPC lance maintenant une exception. [#21560](https://github.com/electron/electron/pull/21560)
    * Ce comportement a été déprécié dans Electron 8.0. Dans Electron 9.0, l'ancien algorithme de sérialisation a été supprimé, et l'envoi de tels objets non sérialisables lancera maintenant une erreur "objet ne pouvait pas être cloné".

Plus d'informations à propos de ces changements et de futurs peuvent être trouvées sur la page [Changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Changements API

* `shell` API modifie :
   * L'API `shell.openItem` a été remplacée par une `shell.openPath API asynchrone`. [proposition](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `session`API change :
   * Ajout de l'API `session.listWordsFromSpellCheckerDictionary` pour lister les mots personnalisés dans le dictionnaire. [#22128](https://github.com/electron/electron/pull/22128)
   * Ajout de l'API `session.removeWordFromSpellCheckerDictionary` pour supprimer les mots personnalisés dans le dictionnaire. [#22368](https://github.com/electron/electron/pull/22368)
   * Ajout de l'API `session.serviceWorkerContext` pour accéder aux informations de base des employés du service et recevoir les logs de la console des employés du service. [#22313](https://github.com/electron/electron/pull/22313)
* `app` modifications de l'API :
   * Ajout d'un nouveau paramètre de force à `app.focus()` sur macOS pour permettre aux applications de se concentrer fortement. [#23447](https://github.com/electron/electron/pull/23447)
* `BrowserWindow` Changements d'API :
   * Ajout de la prise en charge de l'accès à certaines paires getter/setter sur `BrowserWindow`. [#23208](https://github.com/electron/electron/pull/23208)

### APIs obsolètes

Les API suivantes sont maintenant obsolètes ou supprimées :

* `shell.openItem` L'API est maintenant dépréciée, et remplacée par un `shell.openPath asynchrone`.
* `<webview>.getWebContents`, qui était obsolète dans Electron 8.0, est maintenant supprimé.
* `webFrame.setLayoutZoomLevelLimits`, qui a été dépréciée dans Electron 8.0, est maintenant supprimé.

## Fin du support pour 6.x.y

Electron 6.x.y a atteint la fin du support conformément au projet [politique d'assistance](https://electronjs.org/docs/tutorial/support#supported-versions). Nous encourageons les développeurs et les applications à mettre à jour vers une version plus récente d'Electron.

## Ce qui suit

À court terme, vous pouvez vous attendre à ce que l'équipe continue de se concentrer sur le développement des principaux composants qui composent Electron, y compris Chromium, Node, et V8. Bien que nous veillions à ne pas faire de promesses à propos des dates de publication, notre plan est la sortie de nouvelles versions majeures d'Electron avec de nouvelles versions de ces composants environ un trimestre. Le [planning provisoire de 10.0.0](https://electronjs.org/docs/tutorial/electron-timelines) cartographie les dates clés du cycle de vie de développement d'Electron 10.0. Aussi, [voir notre document de versioning](https://electronjs.org/docs/tutorial/electron-versioning) pour plus d'informations sur le versioning dans Electron.

Pour des informations sur les changements de rupture prévus dans les versions à venir d'Electron, [voir notre documentation sur les changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Changer la valeur par défaut de `contextIsolation` de `false` à `true` (À partir d'Electron 10)

Sans contextIsolation, tout code exécuté dans un processus de rendu peut facilement atteindre les scripts internes d'Electron ou de préchargement d'une application. Ce code peut alors effectuer des actions privilégiées que Electron veut garder restreinte.

La modification de cette valeur par défaut améliore la sécurité par défaut des applications Electron, de sorte que les applications devront délibérément opter pour le comportement non sécurisé. Electron va déprécier la valeur par défaut actuelle de `contextIsolation` dans Electron 10. , et passez à la nouvelle valeur par défaut (`true`) dans Electron 12.0.

Pour plus d'informations sur `contextIsolation`, comment l'activer facilement et ses avantages en matière de sécurité, veuillez consulter notre [Document d'isolement du contexte](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md).
