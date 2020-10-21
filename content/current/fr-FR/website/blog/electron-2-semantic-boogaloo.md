---
title: 'Electron 2.0 et Beyond - Versioning sémantique'
author: eaux souterraines
date: '2017-12-06'
---

Une nouvelle version majeure d'Electron est dans les travaux, et avec elle quelques changements à notre stratégie de versions. Depuis la version 2.0.0, Electron adhèrera strictement à la version sémantique.

---

Ce changement signifie que vous verrez le bogue de la version majeure plus souvent, et ce sera généralement une mise à jour majeure de Chromium. Les versions de correctifs seront également plus stables, car elles ne contiendront plus que des corrections de bugs sans nouvelles fonctionnalités.

**Incréments de version Majeure**

* mises à jour de version Chromium
* Mises à jour de la version majeure de Node.js
* changement Electron qui altère l'API

**Incréments de version mineure**

* Mises à jour mineure de la version de Node.js
* changement Electron n'altérant pas l'API

**Incréments de version de Correctifs**

* Mises à jour des correctifs de Node.js
* mises à jour de correctifs Chromium
* Mises à jour de correctif Electron

Parce que les plages semver d'Electron seront maintenant plus significatives, nous vous recommandons d'installer Electron en utilisant l'option par défaut `--save-dev` de npm, qui va préfixer votre version avec `^`, vous tenir à jour en toute sécurité avec des mises à jour mineures et des correctifs :

```sh
npm install --save-dev electron
```

Pour les développeurs qui ne s'intéressent qu'aux corrections de bogues, vous devriez utiliser le préfixe tilde semver par exemple `~2. .0`, qui n'introduira jamais de nouvelles fonctionnalités, ne corrigera que pour améliorer la stabilité.

Pour plus de détails, voir [electronjs.org/docs/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning).
