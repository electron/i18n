---
title: Mac App Store et Windows Auto Updater sur Electron
author: jlord
date: '2015-11-05'
---

Récemment, Electron a ajouté deux fonctionnalités excitantes : une version compatible Mac App Store et une mise à jour automatique intégrée de Windows.

---

## Prise en charge du Mac App Store

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

Depuis `v0.34.0` chaque version d'Electron inclut une version compatible avec le Mac App Store. Auparavant, une application construite sur Electron ne respectait pas les exigences d'Apple pour le Mac App Store. La plupart de ces exigences sont liées à l'utilisation d'API privées. Afin de sandbox Electron de telle sorte qu'il réponde aux exigences que deux modules doivent être enlevés :

- `reporter de plantage`
- `mise à jour automatique`

De plus, certains comportements ont changé en ce qui concerne la détection des changements DNS, la capture vidéo et les fonctions d'accessibilité. Vous pouvez en savoir plus sur les changements et [soumettre votre application au Mac App Store](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) dans la documentation. Les distributions peuvent être trouvées sur la [page des versions d'Electron](https://github.com/electron/electron/releases), préfixé avec `mas-`.

Demandes de tirage connexes : [electron/electron#3108](https://github.com/electron/electron/pull/3108), [electron/electron#2920](https://github.com/electron/electron/pull/2920)

## Mise à jour automatique de Windows

Dans Electron `v0.34.1` le module `auto-updater` a été amélioré afin de fonctionner avec [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows). Cela signifie qu'Electron est livré avec des moyens faciles pour mettre à jour automatiquement votre application sur OS X et Windows. Vous pouvez en savoir plus sur [la configuration de votre application pour la mise à jour automatique sur Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) dans la documentation.

Demande de Pull connexe : [electron/electron#1984](https://github.com/electron/electron/pull/1984)

