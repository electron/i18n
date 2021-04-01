---
title: npm install electron
author: zeke
date: '2016-08-16'
---

Depuis la version 1.3.1 d'Electron, vous pouvez `npm installer electron --save-dev` pour installer la dernière version précompilée d'Electron dans votre application.

---

![npm install electron](https://cloud.githubusercontent.com/assets/378023/17259327/3e3196be-55cb-11e6-8156-525e9c45e66e.png)

## Le binaire Electron précompilé

Si vous avez déjà travaillé sur une application Electron, vous avez probablement rencontré le paquet npm</code> précompilé à partir de `electron. Ce paquet est une partie indispensable de presque
tous les projets Electron. Une fois installé, il détecte votre système d'exploitation
et télécharge un binaire précompilé qui est compilé pour fonctionner sur l'architecture
de votre système.</p>

<h2 spaces-before="0">Le nouveau nom</h2>

<p spaces-before="0">Le processus d'installation d'Electron était souvent une pierre d'achoppement pour les nouveaux développeurs.
Beaucoup de braves gens ont essayé de commencer à développer un Electron par application en exécutant
<code>npm installer electron` au lieu de `npm installer electron-prebuilt`, seulement pour découvrir (souvent après beaucoup de confusion) que ce n'est pas l' `électron` qu'ils recherchaient.

Ceci est dû au fait qu'il y avait un projet `electron` existant sur npm, créé avant le projet Electron de GitHub. Pour aider à rendre le développement d'Electron plus facile et plus intuitif pour les nouveaux développeurs, nous avons contacté le propriétaire du paquet npm `electron` pour demander s'il serait prêt à nous laisser utiliser le nom. Heureusement, il a été fan de notre projet et a accepté de nous aider à réutiliser le nom.

## Vues préconstruites sur

Depuis la version 1.3.1, nous avons commencé à publier des paquets [`electron`](https://www.npmjs.com/package/electron) et `des paquets précompilés` à npm dans tandem. Les deux paquets sont identiques. Nous avons choisi de continuer à publier le paquet sous les deux noms pendant un certain temps afin de ne pas gêner les milliers de développeurs qui utilisent actuellement `electron-prebuilt` dans leurs projets. Nous vous recommandons de mettre à jour votre paquet `. fils` fichiers pour utiliser la nouvelle dépendance `electron` , mais nous continuerons à publier de nouvelles versions de `electron-prebuilt` jusqu'à la fin 2016.

Le dépôt [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt) restera la maison canonique du paquet npm `electron`.

## Un grand merci

Nous devons un merci spécial à [@mafintosh](https://github.com/mafintosh), [@maxogden](https://github.com/maxogden), et de nombreux autres [contributeurs](https://github.com/electron-userland/electron-prebuilt/graphs/contributors) pour la création et la maintenance de `electron-prebuilt`, et pour leur service infatigable au JavaScript, Node. s, et communautés Electron.

Et merci à [@logicalparadoxox](https://github.com/logicalparadox) d'avoir permis à de prendre en charge le package `electron` sur npm.

## Mise à jour de vos projets

Nous avons travaillé avec la communauté pour mettre à jour les paquets populaires qui sont affectés par ce changement. Paquets comme [electron-packager](https://github.com/electron-userland/electron-packager), [electron-rebuild](https://github.com/electron/electron-rebuild), et [electron-builder](https://github.com/electron-userland/electron-builder) ont déjà été mis à jour pour fonctionner avec le nouveau nom tout en continuant à supporter l'ancien nom.

Si vous rencontrez des problèmes pour installer ce nouveau paquet, veuillez nous le faire savoir en ouvrant un problème sur le dépôt [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt/issues) .

Pour tout autre problème avec Electron, veuillez utiliser le dépôt [electron/electron](https://github.com/electron/electron/issues) .

