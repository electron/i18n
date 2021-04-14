---
title: Electron 11.0.0
author:
  - VerteDinde
date: '2020-11-17'
---

Electron 11.0.0 est disponible ! Il comprend des mises à niveau vers chromium `87`, V8 `8.7`, et nœud.js `12.18.3`. Nous avons ajouté un soutien pour le silicium Apple, et des améliorations générales. Lisez la suite ci-dessous pour plus de détails !

---

La team Electron est excitée d'annoncer la sortie de Electron 11.0.0 ! Vous pouvez l'installer avec npm via `npm install electron@latest` ou le télécharger sur notre [site web](https://electronjs.org/releases/stable). La version est remplie de mises à niveau, de correctifs et d’une nouvelle prise en charge du matériel M1 d’Apple.

Nous avons hâte de voir ce que vous construisez avec eux ! Continuer à lire pour plus de détails sur cette version, et s'il vous plaît partager tout commentaire que vous avez!

## Changements notables

### Changements de pile

* Chromium `87.0.4280.47`
    * [Nouveau avec Chrome 86](https://developers.google.com/web/updates/2020/10/nic86)
    * [Nouveau avec Chrome 87](https://developers.google.com/web/updates/2020/11/nic87)
* Node.js `12.18.3`
    * [Nœud 12.18.3 blog](https://nodejs.org/en/blog/release/v12.18.3/)
    * [Nœud 12.7.0 blog post](https://nodejs.org/en/blog/release/v12.17.0/)
* V8 `8.7`
    * [V8 8.6 blog post](https://v8.dev/blog/v8-release-86)
    * [V8 8.7 blog post](https://v8.dev/blog/v8-release-87)

### Surligner les fonctionnalités

* Prise en charge d’Apple M1: Le 10 Novembre, Apple a annoncé leur [nouvelles puces M1, qui seront inclus dans leur prochaine](https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/). À partir d’Electron 11, Electron expédiera des versions distinctes d’Electron pour les Mac Intel (x64) et le prochain matériel M1 d’Apple (arm64). Vous pouvez en savoir plus sur la façon d’obtenir votre application Electron [en cours d’exécution sur le matériel M1 d’Apple ici.](https://www.electronjs.org/blog/apple-silicon) [#24545](https://github.com/electron/electron/pull/24545)
* Ajout de messages de collision V8 et d’informations de localisation aux paramètres crashReport. [#24771](https://github.com/electron/electron/pull/24771)
* Amélioration des performances d’envoi d’objets larges sur le pont contexturé. [#24671](https://github.com/electron/electron/pull/24671)

Consultez les [de version 11.0.0](https://github.com/electron/electron/releases/tag/v11.0.0) pour une liste complète de nouvelles fonctionnalités et modifications.

## Briser les changements

* API expérimentales supprimées : `BrowserView.{fromId, fromWebContents, getAllViews}` et `id` propriété de `BrowserView`. [#23578](https://github.com/electron/electron/pull/23578)

Plus d'informations à propos de ces changements et de futurs peuvent être trouvées sur la page [Changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Changements API

* Ajout `app.getApplicationInfoForProtocol()` 'API qui renvoie des informations détaillées sur l’application qui gère un certain protocole. [#24112](https://github.com/electron/electron/pull/24112)
* Ajout `app.createThumbnailFromPath()` API qui renvoie une image d’aperçu d’un fichier compte tenu de son chemin de fichier et d’une taille miniature maximale. [#24802](https://github.com/electron/electron/pull/24802)
* Ajout `webContents.forcefullyCrashRenderer()` de mettre fin avec force à un processus de rendu pour aider à récupérer un renderer suspendu. [#25756](https://github.com/electron/electron/pull/25756)

## Fin du support pour 8.x.y

Electron 8.x.y a a atteint la fin du support selon la politique de soutien [projet](https://electronjs.org/docs/tutorial/support#supported-versions). Nous encourageons les développeurs et les applications à mettre à jour vers une version plus récente d'Electron.

## Ce qui suit

À court terme, vous pouvez vous attendre à ce que l'équipe continue de se concentrer sur le développement des principaux composants qui composent Electron, y compris Chromium, Node, et V8. Bien que nous soin de ne pas faire de promesses sur les dates de sortie, notre plan est de sortir de nouvelles versions majeures d’Electron avec de nouvelles versions de ces composants environ trimestriellement. Le [provisoire de 12.0.0](https://electronjs.org/docs/tutorial/electron-timelines) les dates clés du cycle de vie de développement d’Electron 12.0. Aussi, [voir notre document de versioning](https://electronjs.org/docs/tutorial/electron-versioning) pour plus d'informations sur le versioning dans Electron.

Pour des informations sur les changements de rupture prévus dans les versions à venir d'Electron, [voir notre documentation sur les changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Poursuite des travaux de dévadation du module `remote` 'emploi
Nous avons commencé à travailler pour supprimer le module `remote` dans [Electron 9](https://www.electronjs.org/blog/electron-9-0). Nous prévoyons de supprimer le module `remote` lui-même dans Electron 14.

Lisez et suivez [question pour](https://github.com/electron/electron/issues/21408) plans complets et des détails pour la dépréciation.

### Étape finale pour exiger que les Modules Natifs de Node soient Context Aware ou N-API (dans Electron 12)
À partir d'Electron 6, nous avons préparé le terrain pour que [les modules Node natifs](https://nodejs.org/api/addons.html) chargés dans le processus de rendu, soient soit [N-API](https://nodejs.org/api/n-api.html) ou [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). L'imposition de ce changement apporte une sécurité accrue, des performances plus rapides et une charge de travail de maintenance réduite. La dernière étape de ce plan est de supprimer la possibilité de désactiver la réutilisation du processus de rendu dans Electron 12.

Lisez et suivez ce [question pour](https://github.com/electron/electron/issues/18397) détails complets, y compris le calendrier proposé.
