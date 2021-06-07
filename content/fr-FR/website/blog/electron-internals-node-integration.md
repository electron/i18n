---
title: 'Electron Internals: Message Loop Integration'
author: zcbenz
date: '2016-07-28'
---

C'est le premier post d'une série qui explique les internes d'Electron. Ce message présente comment la boucle d'événement de Node est intégrée avec Chromium dans Electron.

---

Il y a eu de nombreuses tentatives d'utiliser Node pour la programmation GUI, comme [node-gui](https://github.com/zcbenz/node-gui) pour les liaisons GTK+ et [node-qt](https://github.com/arturadib/node-qt) pour les liaisons QT. Mais aucun d'entre eux ne fonctionne en production parce que les kits d'outils de l'interface ont leurs propres boucles de message tandis que Node utilise libuv pour sa propre boucle d'événement, et le thread principal ne peut que exécuter une boucle en même temps. Donc le truc commun pour exécuter la boucle de message GUI dans Node est de pomper la boucle du message dans un minuteur avec un très petit intervalle, ce qui rend la réponse de l'interface graphique lente et occupe beaucoup de ressources du processeur.

Lors du développement d'Electron, nous avons rencontré le même problème, bien que de manière inversée : nous devions intégrer la boucle d'événements de Node dans la boucle message de Chromium.

## Le processus principal et le processus de rendu

Avant de plonger dans les détails de l'intégration de la boucle de messages, je vais d'abord expliquer l'architecture multi-processus de Chromium.

Dans Electron, il y a deux types de processus : le processus principal et le processus de rendu (ceci est en fait extrêmement simplifié, pour une vue complète, voir [Architecture multi-processus](http://dev.chromium.org/developers/design-documents/multi-process-architecture)). Le processus principal est responsable de l'interface utilisateur comme la création de fenêtres, tandis que le processus de rendu ne traite que de en cours d'exécution et de rendu des pages Web.

Electron permet d'utiliser JavaScript pour contrôler à la fois le processus principal et le processus de rendu , ce qui signifie que nous devons intégrer Node dans les deux processus.

## Remplacement de la boucle de message de Chromium par libuv

Ma première tentative a été de réimplémenter la boucle de message de Chromium avec libuv.

C'était facile pour le processus de rendu car sa boucle de message n'écoutait que les descripteurs de fichiers et les minuteurs, et je n'avais besoin que d'implémenter l'interface avec libuv.

Cependant, il a été beaucoup plus difficile pour le processus principal. Chaque plate-forme a son propre type de boucles de messages GUI. macOS Chromium utilise `NSRunLoop`, alors que Linux utilise glib. J'ai essayé de nombreux hacks pour extraire les descripteurs de fichiers sous-jacents des boucles de messages de l'interface native, et puis les a nourries à libuv pour itération, mais j'ai toujours rencontré des cas de pointe qui ne fonctionnaient pas.

J'ai donc finalement ajouté un chronomètre pour interroger la boucle du message de l'interface dans un petit intervalle. Comme un résultat le processus a pris une utilisation constante du processeur, et certaines opérations ont eu de longs retards.

## Boucle d'événement du nœud de vote dans un fil de discussion séparé

À mesure que la libuv a mûri, il a été possible d’adopter une autre approche.

Le concept de fd backend a été introduit dans libuv, qui est un descripteur de fichier (ou un manipulateur) que libuv interroge pour sa boucle d'événements. Donc, en faisant un sondage sur le fd d'arrière-plan, est possible d'être notifié quand il y a un nouvel événement dans libuv.

Donc, dans Electron, j'ai créé un fil de discussion séparé pour interroger le flux backend, et puisque moi-même, utilisions les appels du système pour le sondage au lieu des API libuv, c'était le fil de discussion sûr. Et chaque fois qu'il y avait un nouvel événement dans la boucle d'événement de libuv, un message serait posté dans la boucle de message de Chromium, et les événements de libuv seraient alors traités dans le fil de discussion principal.

De cette façon, j'ai évité de patcher Chromium et Node, et le même code a été utilisé dans à la fois les processus principal et de rendu.

## Le code

Vous pouvez trouver l'implémentation de l'intégration de la boucle message dans les fichiers `node_bindings` sous [`electron/atom/common/`][node-bindings]. Il peut être facilement réutilisé pour les projets qui veulent intégrer Node.

*Update: Implementation moved to [`electron/shell/common/node_bindings.cc`](https://github.com/electron/electron/blob/master/shell/common/node_bindings.cc).*

[node-bindings]: https://github.com/electron/electron/tree/main/atom/common
