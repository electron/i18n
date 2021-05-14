---
title: Electron 10.0.0
author:
  - VerteDinde
  - sofianguy
date: '2020-08-25'
---

Electron 10.0.0 est disponible ! Cette version inclue les mises à jour vers Chromium `85`, V8 `8.5`, et Node.js `12.16`. Nous avons ajouté plusieurs nouvelles intégrations et améliorations de l'API. Lisez la suite ci-dessous pour plus de détails !

---

La team Electron est excitée d'annoncer la sortie de Electron 10.0.0 ! Vous pouvez l'installer avec npm via `npm install electron@latest` ou le télécharger sur notre [site web](https://electronjs.org/releases/stable). La version est remplie de mises à jour, de correctifs et de nouvelles fonctionnalités.

Dans cette version 10 de Electron, nous avons également modifié notre note de sorte. Pour qu'il soit plus facile de distiniguer ce qui est nouveau dans Electron 10 et ce qui peut avoir changé entre Electron 10 et les versions précédentes, nous incluons maintenant également des changements qui ont été introduits dans Electron 10, mais qui ont été rétroportés aux versions précédentes. Nous espérons que cela rendra l'intégration de nouvelles fonctionnalités et corrections plus facile pour les applications lors des mises à niveau d'Electron.

Nous avons hâte de voir ce que vous construisez avec eux ! Continuer à lire pour plus de détails sur cette version, et s'il vous plaît partager tout commentaire que vous avez!

## Changements notables

### Changements de pile

* Chromium `85.0.4183.84`
    * [Nouveau avec Chrome 84](https://developers.google.com/web/updates/2020/07/nic84)
    * [Nouveau avec Chrome 85](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [Article de blog Node 12.16.3](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [V8 8.4 blog](https://v8.dev/blog/v8-release-84)
    * [Article de blog V8 8.5](https://v8.dev/blog/v8-release-85)

### Surligner les fonctionnalités

* Ajout de la méthode `contents.getBackgroundThrottling()` et de la propriété `contents.backgroundThrottling`. [#21036]
* Exposé le module `desktopCapturer` dans le processus principal. [#23548](https://github.com/electron/electron/pull/23548)
* Peut maintenant vérifier si une session `` donnée est persistante en appelant l'API `ses.isPersistent()`. [#22622](https://github.com/electron/electron/pull/22622)
* Résoudre les problèmes de réseau qui ont empêché les appels RTC d'être connectés en raison des changements d'adresse IP du réseau et ICE. (Numéro Chromium 1113227). [#24998](https://github.com/electron/electron/pull/24998)

Voir les [notes de version 10.0.0](https://github.com/electron/electron/releases/tag/v10.0.0) pour une liste complète des nouvelles fonctionnalités et des changements.

## Changements de rupture

* La valeur par défaut de `enableRemoteModule` a été changée en `false`. [#22091](https://github.com/electron/electron/pull/22091)
    * Ceci fait partie de nos plans pour déprécier le module `distant` et le déplacer vers le site utilisateur. Vous pouvez lire et suivre [ce problème](https://github.com/electron/electron/issues/21408) qui détaille nos raisons pour cela et inclut un calendrier proposé pour la dépréciation.
* La valeur par défaut de `app.allowRendererProcessReuse` a été changée en `true`. [#22336](https://github.com/electron/electron/pull/22336) (également dans [Electron 9](https://github.com/electron/electron/pull/22401))
   * Cela empêchera le chargement de modules natifs non contextuels dans les processus de rendu.
   * Vous pouvez lire et suivre [ce problème](https://github.com/electron/electron/issues/18397) qui détaille nos raisons pour cela et inclut un calendrier proposé pour la dépréciation.
* Correction du positionnement des boutons de fenêtre sur macOS lorsque la locale de l'OS est définie à une langue RTL (comme l'arabe ou l'hébreu). Les applications de fenêtre sans cadre peuvent avoir à tenir compte de ce changement tout en stylisant leurs fenêtres. [#22016](https://github.com/electron/electron/pull/22016)

Plus d'informations à propos de ces changements et de futurs peuvent être trouvées sur la page [Changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Changements API

* Session: Peut maintenant vérifier si une session `` donnée est persistante en appelant l'API `ses.isPersistent()`. [#22622](https://github.com/electron/electron/pull/22622)
* Contenu : Ajout de la méthode `contents.getBackgroundThrottling()` et de la propriété `contents.backgroundThrottling`. [#21036](https://github.com/electron/electron/pull/21036)

### APIs obsolètes

Les API suivantes sont maintenant obsolètes ou supprimées :

* Suppression de la propriété obsolète `currentlyLoggingPath` de `netLog`. De plus, `netLog.stopLogging` ne retourne plus le chemin vers le journal enregistré. [#22732](https://github.com/electron/electron/pull/22732)
* Dépréciation des crash-uploads non compressés dans `crashReporter`. [#23598](https://github.com/electron/electron/pull/23598)

## Fin du support pour 7.x.y

Electron 7.x.y a atteint la fin de support conformément à la [politique de support du projet](https://electronjs.org/docs/tutorial/support#supported-versions). Nous encourageons les développeurs et les applications à mettre à jour vers une version plus récente d'Electron.

## Ce qui suit

À court terme, vous pouvez vous attendre à ce que l'équipe continue de se concentrer sur le développement des principaux composants qui composent Electron, y compris Chromium, Node, et V8. Bien que nous veillions à ne pas faire de promesses à propos des dates de publication, notre plan est la sortie de nouvelles versions majeures d'Electron avec de nouvelles versions de ces composants environ un trimestre. Le [planning provisoire 11.0.0](https://electronjs.org/docs/tutorial/electron-timelines) cartographie les dates clés du cycle de vie de développement d'Electron 11.0. Aussi, [voir notre document de versioning](https://electronjs.org/docs/tutorial/electron-versioning) pour plus d'informations sur le versioning dans Electron.

Pour des informations sur les changements de rupture prévus dans les versions à venir d'Electron, [voir notre documentation sur les changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Poursuite du travail pour la dépréciation du module `remote` (dans Electron 11)
Nous avons commencé à travailler pour supprimer le module remote dans [Electron 9](https://www.electronjs.org/blog/electron-9-0) et nous continuons à envisager de supprimer le module `remote`. Dans Electron 11, nous prévoyons de poursuivre le travail de refactorisation pour l'implémentation de [WeakRef](https://v8.dev/features/weak-references) comme nous l'avons fait avec Electron 10. Veuillez lire et suivre [ce problème](https://github.com/electron/electron/issues/21408) pour tous les plans et détails de la dépréciation.

### Étape finale pour exiger que les Modules Natifs de Node soient Context Aware ou N-API (dans Electron 12)
_Edit : À l'origine, ce billet de blog indiquait que nous désactiverions la réutilisation du processus de rendu dans Electron 11. La désactivation de la réutilisation du processus de rendu a maintenant été poussée vers Electron 12._

À partir d'Electron 6, nous avons préparé le terrain pour que [les modules Node natifs](https://nodejs.org/api/addons.html) chargés dans le processus de rendu, soient soit [N-API](https://nodejs.org/api/n-api.html) ou [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). L'imposition de ce changement apporte une sécurité accrue, des performances plus rapides et une charge de travail de maintenance réduite. La dernière étape de ce plan est de supprimer la possibilité de désactiver la réutilisation du processus de rendu dans Electron 12. Lisez [à propos ce problème](https://github.com/electron/electron/issues/18397) pour tous les détails, y compris le calendrier proposé.
