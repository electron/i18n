---
title: Electron 7.0.0
author:
  - sofianguy
  - ckerr
date: '2019-10-22'
---

Electron 7.0.0 est sorti ! Il comprend des mises à jour vers Chromium 78, V8 7.8 et Node.js 12.8.1. Sur la version Arm 64, nous avons ajouté une fenêtre , des méthodes IPC plus rapides, une nouvelle API `nativeTheme` et bien plus encore !

---

L'équipe d'Electron est heureuse d'annoncer la sortie d'Electron 7.0.0 ! Vous pouvez l'installer avec npm via `npm install electron@latest` ou le télécharger sur notre [site web](https://electronjs.org/releases/stable). La version est remplie de mises à jour, de correctifs et de nouvelles fonctionnalités. Nous avons hâte de voir ce que vous construisez avec eux ! Continuer à lire pour plus de détails sur cette version, et s'il vous plaît partager tout commentaire que vous avez!

## Changements notables
 * Améliorations de la pile:

   | Pile    | Version dans Electron 6 | Version dans Electron 7 | Quoi de neuf                                                                                                                                                                                                                                                              |
   |:------- |:----------------------- |:----------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Chrome  | 76.0.3809.146           | **78.0.3905.1**         | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8      | 7.6                     | **7.8**                 | [7.7](https://v8.dev/blog/v8-release-77), [7.8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js | 12.4.0                  | **12.8.1**              | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * Ajout de Windows sur Arm (64 bits). [#18591](https://github.com/electron/electron/pull/18591), [#20112](https://github.com/electron/electron/pull/20112)
 * Ajout de `ipcRenderer.invoke()` et `ipcMain.handle()` pour l'IPC asynchrone request/response-style. Celles-ci sont fortement recommandées sur le module `distant`. Voir ce module de blog « remote»[d'Electron considéré comme nocif](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)» pour plus d'informations. [#18449](https://github.com/electron/electron/pull/18449)
 * Ajout de l'API `nativeTheme` pour lire et répondre aux changements dans le thème et le modèle de couleurs de l'OS. [#19758](https://github.com/electron/electron/pull/19758), [#20486](https://github.com/electron/electron/pull/20486)
 * Passage à un nouveau générateur [de définitions de TypeScript](https://github.com/electron/docs-parser). Les définitions qui en résultent sont plus précises ; donc si votre compilation TypeScript échoue, c'est la cause probable. [#18103](https://github.com/electron/electron/pull/18103)

Voir les [notes de version 7.0.0](https://github.com/electron/electron/releases/tag/v7.0.0) pour une liste plus longue de modifications.

## Changements de rupture

Plus d'informations à propos de ces changements et de futurs peuvent être trouvées sur la page [Changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).

 * APIs obsolètes retirées :
     * Des versions de fonctions basées sur le rappel qui utilisent maintenant Promises. [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS). [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu()`,
     * `app.setApplicationMenu()`,
     * `powerMonitor.querySystemIdleState()`,
     * `powerMonitor.querySystemIdleTime()`,
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`,
     * `webFrame.setIsolatedWorldHumanReadableName()`,
     * `webFrame.setIsolatedWorldSecurityOrigin()` [#18159](https://github.com/electron/electron/pull/18159)
 * `Session.clearAuthCache()` ne permet plus de filtrer les entrées de cache vidées. [#17970](https://github.com/electron/electron/pull/17970)
 * Les interfaces natives sur macOS (menus, dialogues, etc.) correspondent désormais automatiquement au réglage du mode sombre sur la machine de l'utilisateur. [#19226](https://github.com/electron/electron/pull/19226)
 * Mise à jour du module `electron` pour utiliser `@electron/get`.  La version minimale des nœuds pris en charge est maintenant Node 8. [#18413](https://github.com/electron/electron/pull/18413)
 * Le fichier `electron.asar` n'existe plus. Tous les scripts d'empaquetage qui dépendent de leur existence doivent être mis à jour. [#18577](https://github.com/electron/electron/pull/18577)

## Fin du support pour 4.x.y

Electron 4.x.y a atteint la fin du support conformément au projet [politique d'assistance](https://electronjs.org/docs/tutorial/support#supported-versions). Nous encourageons les développeurs et les applications à mettre à jour vers une version plus récente d'Electron.

## Programme de feedback

Nous continuons à utiliser notre [programme de rétroaction](https://electronjs.org/blog/app-feedback-program) pour les tests. Les projets qui participent à ce programme testent les bétas d'Electron sur leurs applications ; et en retour, les nouveaux bogues qu'ils trouvent sont priorisés pour la version stable. Si vous souhaitez participer ou en savoir plus, [consultez notre blog sur le programme](https://electronjs.org/blog/app-feedback-program).

## Ce qui suit

À court terme, vous pouvez vous attendre à ce que l'équipe continue de se concentrer sur le développement des principaux composants qui composent Electron, y compris Chromium, Node, et V8. Bien que nous veillions à ne pas faire de promesses à propos des dates de publication, notre plan est la sortie de nouvelles versions majeures d'Electron avec de nouvelles versions de ces composants environ un trimestre. Le [planning provisoire 8.0.0](https://electronjs.org/docs/tutorial/electron-timelines) cartographie les dates clés du cycle de vie de développement d'Electron 8. Aussi, [voir notre document de versioning](https://electronjs.org/docs/tutorial/electron-versioning) pour plus d'informations sur le versioning dans Electron.

Pour des informations sur les changements de rupture prévus dans les versions à venir d'Electron, [voir notre documentation sur les changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
