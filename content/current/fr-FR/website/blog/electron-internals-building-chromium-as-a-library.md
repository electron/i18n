---
title: 'Internals d''Electron : Construction de Chromium en tant que bibliothèque'
author: zcbenz
date: '2017-03-03'
---

Electron est basé sur le Chromium open-source de Google, un projet qui n'est pas nécessairement conçu pour être utilisé par d'autres projets. Ce message présente comment Chromium est construit en tant que bibliothèque pour l'utilisation d'Electron, et comment le système de build a évolué au fil des ans.

---

## Utiliser le CEF

Le Chromium Embedded Framework (CEF) est un projet qui transforme Chromium en une bibliothèque, et fournit des API stables basées sur le code de base de Chromium. Très premières versions de l'éditeur Atom et de NW.js utilisaient CEF.

Pour maintenir une API stable, CEF masque tous les détails de Chromium et enveloppe les API de Chromium avec sa propre interface. Donc, quand nous avions besoin d'accéder aux API Chromium sous-jacentes, comme l'intégration de Node.js dans les pages web, les avantages de CEF sont devenus des bloqueurs.

Ainsi, à la fin, Electron et NW.js ont changé pour utiliser directement les APIs de Chromium .

## Bâtiment dans le cadre de Chromium

Même si Chromium ne prend pas officiellement en charge des projets extérieurs, la base de code est modulaire et il est facile de construire un navigateur minimal basé sur Chromium. Le module de base fournissant l'interface du navigateur est appelé Module de contenu.

Pour développer un projet avec le Module de contenu, la façon la plus simple est de construire le projet dans le cadre de Chromium. Cela peut être fait en vérifiant d'abord le code source de Chromium, puis en ajoutant le projet au fichier `DEPS` de Chromium.

NW.js et les premières versions d'Electron utilisent cette façon pour construire.

L'inconvénient est, Chromium est une très grande base de code et nécessite des machines très puissantes pour construire. Pour les ordinateurs portables normaux, cela peut prendre plus de 5 heures. Cela a donc un impact considérable sur le nombre de développeurs qui peuvent contribuer au projet , et cela ralentit également le développement.

## Construction de Chromium en tant que bibliothèque partagée unique

En tant qu'utilisateur du Module de contenu, Electron n'a pas besoin de modifier le code de Chromium dans la plupart des cas, donc une façon évidente d'améliorer la construction d'Electron est de compiler Chromium en tant que bibliothèque partagée, puis reliez avec lui dans Electron. De cette façon les développeurs n'ont plus besoin de construire tout Chromium lorsqu'ils contribuent à Electron.

Le projet [libchromiumcontent](https://github.com/electron/libchromiumcontent) a été créé par [@aroben](https://github.com/aroben) à cet effet. Il construit le module de contenu de Chromium en tant que bibliothèque partagée, puis fournit les en-têtes de Chromium et les binaires précompilés à télécharger. Le code de la version initiale de libchromiumcontent peut être trouvé [dans ce lien](https://github.com/electron/libchromiumcontent/tree/873daa8c57efa053d48aa378ac296b0a1206822c).

Le projet [brillant](https://github.com/electron/brightray) est également né dans le cadre de libchromiumcontent, qui fournit une fine couche autour du module de contenu.

En utilisant libchromiumcontent et lumineux ensemble, les développeurs peuvent construire rapidement un navigateur sans entrer dans les détails de la construction de Chromium. Et cela supprime l'exigence d'un réseau rapide et d'une machine puissante pour construire le projet.

En dehors d'Electron, il y avait aussi d'autres projets basés sur Chromium construits de cette manière , comme le navigateur [Breach](https://www.quora.com/Is-Breach-Browser-still-in-development).

## Filtrage des symboles exportés

Sous Windows, il y a une limitation du nombre de symboles qu'une bibliothèque partagée peut exporter. Alors que la base de code de Chromium augmentait, le nombre de symboles exportés dans libchromiumcontent a rapidement dépassé la limitation.

La solution était de filtrer les symboles inutiles lors de la génération du fichier DLL. Il a fonctionné en fournissant [un `. fichier ef` vers le lien](https://github.com/electron/libchromiumcontent/pull/11/commits/85ca0f60208eef2c5013a29bb4cf3d21feb5030b), puis en utilisant un script pour [juger si les symboles sous un espace de noms doivent être exportés](https://github.com/electron/libchromiumcontent/pull/47/commits/d2fed090e47392254f2981a56fe4208938e538cd).

En adoptant cette approche, bien que Chromium ait continué à ajouter de nouveaux symboles exportés, libchromiumcontent pouvait toujours générer des fichiers de bibliothèque partagés en supprimant plus de symboles.

## Compilation des composants

Avant de parler des prochaines mesures prises dans libchromiumcontent, il est important d'introduire d'abord le concept de construction de composants dans Chromium.

En tant que projet énorme, l'étape de liaison prend beaucoup de temps dans Chromium lors de la construction. Normalement, lorsqu'un développeur fait un petit changement, cela peut prendre 10 minutes pour voir la sortie finale de . Pour résoudre ce problème, Chromium a introduit la compilation de composants, qui construit chaque module dans Chromium en tant que bibliothèques partagées séparées, de sorte que le temps passé dans la dernière étape de liaison devient invisible.

## Expédition des binaires bruts

Avec Chromium continuant à grandir, il y avait tellement de symboles exportés dans Chromium que même les symboles du Module de contenu et du Webkit étaient plus que la limitation de . Il était impossible de générer une bibliothèque partagée utilisable en simplement dépouillant des symboles.

Finalement, nous avons dû [expédier les binaires bruts de Chromium](https://github.com/electron/libchromiumcontent/pull/98) au lieu de générer une seule bibliothèque partagée.

Comme il a été introduit plus tôt, il y a deux modes de construction dans Chromium. Suite à la livraison de binaires bruts, nous devons expédier deux distributions différentes de binaires dans libchromiumcontent. On s'appelle `static_library` build, qui inclut toutes les bibliothèques statiques de chaque module générées par la compilation normale de Chromium. L'autre est `shared_library`, qui inclut toutes les bibliothèques partagées de chaque module généré par la compilation du composant.

Dans Electron, la version de débogage est liée à la version `shared_library` de libchromiumcontent, parce qu'il est petit à télécharger et prend peu de temps lorsque vous liez l'exécutable final. Et la version Release d'Electron est liée à la version `static_library` de libchromiumcontent, pour que le compilateur puisse générer des symboles complets, ce qui est important pour le débogage, et le lien peut faire une meilleure optimisation car il sait quels fichiers d'objets sont nécessaires et lesquels ne le sont pas.

Donc, pour le développement normal, les développeurs n'ont besoin que de construire la version Debug, qui ne nécessite pas un bon réseau ou une machine puissante. Bien que la version de la version nécessite alors beaucoup plus de matériel pour la compilation, elle peut générer de meilleurs binaires optimisés.

## La mise à jour de `gn`

Etre l'un des plus grands projets au monde, la plupart des systèmes normaux ne sont pas appropriés pour la construction de Chromium, et l'équipe Chromium développe leurs propres outils de construction .

Les versions antérieures de Chromium utilisaient `gyp` comme système de compilation, mais il souffre d'être lent, et son fichier de configuration devient difficile à comprendre pour des projets complexes. Après des années de développement, Chromium est passé à `gn` en tant que système de compilation , ce qui est beaucoup plus rapide et a une architecture claire.

Une des améliorations de `gn` est d'introduire `source_set`, qui représente un groupe de fichiers d'objet. Dans `gyp`, chaque module était représenté par `static_library` ou `shared_library`, et pour la compilation normale de Chromium, chaque module a généré une bibliothèque statique et ils ont été reliés ensemble dans le exécutable final. En utilisant `gn`, chaque module ne génère maintenant qu'un tas de fichiers d'objets, et l'exécutable final relie tous les fichiers d'objet entre eux, de sorte que les fichiers intermédiaires de la bibliothèque statique ne sont plus générés.

Cette amélioration a cependant causé de gros problèmes à libchromiumcontent, car les fichiers intermédiaires de la bibliothèque statique étaient en fait nécessaires par libchromiumcontent.

La première tentative de résoudre cela était de [patch `gn` pour générer des fichiers de librairie statique ](https://github.com/electron/libchromiumcontent/pull/239), qui a résolu le problème, mais qui était loin d'être une solution décente .

La seconde tentative a été faite par [@alespergl](https://github.com/alespergl) pour [produire des bibliothèques statiques personnalisées à partir de la liste des fichiers d'objet](https://github.com/electron/libchromiumcontent/pull/249). Il a utilisé une astuce pour lancer une version factice pour collecter une liste des fichiers d'objets générés, puis construisez les bibliothèques statiques en alimentant `gn` avec la liste. Cela n'a fait que des modifications minimales au code source de Chromium, et a maintenu l'architecture de construction d'Electron.

## Summary

Comme vous pouvez le voir, comparé à la construction d'Electron dans Chromium, construction Chromium en tant que bibliothèque prend plus d'efforts et nécessite une maintenance continue de . Cependant ce dernier supprime l'exigence de matériel puissant pour construire Electron, permettant ainsi à une gamme beaucoup plus étendue de développeurs de construire et de contribuer à Electron. Les efforts en valent la peine.

