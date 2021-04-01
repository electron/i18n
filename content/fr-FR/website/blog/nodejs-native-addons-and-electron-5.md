---
title: Addons natifs de Node.js et Electron 5.0
author: BinaryMuse
date: '2019-02-01'
---

Si vous rencontrez des difficultés à utiliser un addon natif Node.js avec Electron 5. , il y a une chance qu'il ait besoin d'être mis à jour pour fonctionner avec la version la plus récente de V8.

---

## Au revoir `v8::Handle`, Bonjour `v8::Local`

En 2014, l'équipe V8 a déprécié `v8::Handle` en faveur de `v8::Local` pour les gestionnaires locaux. Electron 5.0 inclut une version de V8 qui a finalement supprimé `v8::Handle` pour de bon, et Node natif. , les addons qui l'utilisent encore devront être mis à jour avant de pouvoir être utilisés avec Electron 5.0.

Le changement de code requis est minimal, mais *chaque* module Node natif qui utilise encore `v8::Handle` échouera à construire avec Electron 5. et devra être modifié. La bonne nouvelle est que Node. s v12 inclura également ce changement V8, donc tous les modules qui utilisent `v8::Handle` devront être mis à jour *de toute façon* pour fonctionner avec la prochaine version de Node.

## Je maintiens un module natif, comment puis-je aider ?

Si vous maintenez un addon natif pour Node.js, assurez-vous de remplacer toutes les occurrences de `v8::Handle` par `v8::Local`. Le premier n'était qu'un alias du second, donc aucun autre changement ne doit être apporté pour résoudre ce problème spécifique.

Vous pouvez également être intéressé à regarder dans [N-API](https://nodejs.org/api/n-api.html), qui est maintenu séparément du V8 en tant que partie de Node. s lui-même, et vise à isoler les addons natifs des changements dans le moteur JavaScript sous-jacent. Vous pouvez trouver plus d'informations [dans la documentation N-API sur le site Node.js](https://nodejs.org/api/n-api.html#n_api_n_api).

## Aide! J'utilise un addon natif dans mon application et cela ne fonctionnera pas !

Si vous consommez un addon natif pour Node. s dans votre application et le module natif ne sera pas construit à cause de ce problème, vérifiez avec l'auteur du module pour voir s'ils ont publié une nouvelle version qui corrige le problème. Sinon, contacter l'auteur (ou [en ouvrant une Pull Request !](https://help.github.com/articles/about-pull-requests/)) est probablement votre meilleur pari.
