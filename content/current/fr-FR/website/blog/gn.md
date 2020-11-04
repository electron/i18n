---
title: "Utiliser GN pour construire Electron"
author: nornagon
date: '2018-09-05'
---

Electron utilise désormais GN pour se construire. Voici une discussion sur les pourquoi.

---

# GYP et GN

Lorsque Electron a été publié pour la première fois en 2013, la configuration de construction de Chromium a été écrite avec [GYP](https://gyp.gsrc.io/), abréviation de « Générer vos projets ».

En 2014, le projet Chromium a introduit un nouvel outil de configuration de compilation appelé [GN](https://gn.googlesource.com/gn/) (abréviation de "Générer [Ninja](https://ninja-build.org/)") les fichiers de compilation de Chromium ont été migrés vers GN et GYP a été retiré du code source.

Electron a historiquement maintenu une séparation entre le code principal [Electron](https://github.com/electron/electron) et le [libchromiumcontent](https://github.com/electron/libchromiumcontent), la partie d'Electron qui contient le sous-module 'content' de Chromium. Electron a continué à utiliser GYP, tandis que libchromiumcontent -- en tant que sous-ensemble de Chromium -- est passé à GN lorsque Chromium l'a fait.

Comme les engrenages qui ne sont pas tout à fait en maille, il y avait une friction entre l'utilisation des deux systèmes de construction. Maintenir la compatibilité était sujet aux erreurs, à partir des paramètres du compilateur et `#définit` qui devait être méticuleusement maintenue en synchronisation entre Chromium, Node, V8 et Electron.

Pour y remédier, l'équipe d'Electron a travaillé à tout déplacer vers GN. Aujourd'hui, le [commit](https://github.com/electron/electron/pull/14097) pour supprimer le dernier code GYP d'Electron a été débarqué dans le maître.

# Ce que cela signifie pour vous

Si vous contribuez à Electron lui-même, le processus de vérification et de compilation d'Electron à partir de `master` ou 4. .0 est très différent de ce qu'il était dans la version 3.0.0 et antérieure. Consultez les instructions de construction du [GN](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md) pour plus de détails.

Si vous développez une application avec Electron, il y a quelques modifications mineures que vous pourriez remarquer dans le nouvel Electron 4. .0-nightly; mais plus que probablement, le changement d'Electron dans le système de compilation sera totalement transparent pour vous.

# Ce que cela signifie pour Electron

GN est [plus rapide](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) que GYP et ses fichiers sont plus lisibles et maintenables. De plus, nous espérons que l'utilisation d'un système de configuration de compilation unique réduira le travail nécessaire pour mettre à jour Electron vers de nouvelles versions de Chromium.

 * Il a déjà aidé le développement d'Electron 4.0.0 de manière substantielle parce que Chromium 67 a retiré la prise en charge de MSVC et a basculé vers la construction avec Clang sous Windows. Avec la version GN, nous héritons directement de toutes les commandes de compilateur de Chromium, donc nous avons obtenu la version de Clang sur Windows gratuitement!

 * Il est également plus facile pour Electron d'utiliser [BoringSSL](https://boringssl.googlesource.com/boringssl/) dans une version unifiée sur Electron, Chromium, et Node -- quelque chose qui était [problématique avant](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library).
