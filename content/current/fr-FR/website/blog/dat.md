---
title: 'Projet de la Semaine : Dat'
author:
  - karissa
  - yoshuawuyts
  - maxogden
  - zeke
date: '2017-02-21'
---

Le projet en vedette de cette semaine est [Dat](https://datproject.org/), un [subventionné](https://changelog.com/rfc/6), un outil open source, décentralisé pour la distribution de jeux de données. Dat est construit et maintenu par une équipe [géodistribuée](https://datproject.org/team), dont beaucoup ont aidé à écrire ce post.

---

[![Une capture d'écran de la vue principale de dat-desktop, montrant quelques lignes de données
partagées](https://cloud.githubusercontent.com/assets/2289/23175925/dbaee7ec-f815-11e6-80cc-3041203c7842.png)](https://github.com/datproject/dat-desktop)

## D'abord, qu'est-ce que Dat?

Nous voulions apporter les meilleures parties des systèmes de partage de données entre pairs et distribués. Nous avons commencé avec le partage de données scientifiques et nous avons commencé à nous tourner vers des institutions de recherche, le gouvernement, la fonction publique et les équipes open source.

Une autre façon de penser est une synchronisation et de télécharger l'application comme Dropbox ou BitTorrent Sync, sauf Dat est [open source](https://github.com/datproject). Notre objectif est d'être un puissant logiciel de partage de données à but non lucratif pour de grandes données, petites, moyennes, petites et grandes quantités de données.

Pour utiliser l'outil CLI `dat` , il vous suffit de taper :

```sh
ce chemin de partage/dans/mon/dossier
```

Et dat va créer un lien que vous pouvez utiliser pour envoyer ce dossier à quelqu'un d'autre -- aucun serveur central ou tiers n'a accès à vos données. Contrairement à BitTorrent, il est également impossible de renifler qui partage quoi ([voir le brouillon de Dat Paper pour plus de détails](https://github.com/datproject/docs/blob/master/papers/dat-paper.md)).

## Maintenant, nous savons ce qu'est Dat. Comment Dat Desktop s'adapte-t-il?

[Dat Desktop](https://github.com/datproject/dat-desktop) est un moyen de rendre Dat accessible aux personnes qui ne peuvent ou ne veulent pas utiliser la ligne de commande. Vous pouvez héberger plusieurs données sur votre machine et les servir sur votre réseau.

## Pouvez-vous partager des cas d'utilisation cool ?

### DataRefuge + Projet Svalbard

Nous travaillons sur une chose nommée [Projet Svalbard](https://github.com/datproject/svalbard) qui est liée à [DataRefuge](http://www.ppehlab.org/datarefuge), un groupe de travail pour soutenir les données gouvernementales sur le climat susceptibles de disparaître. Svalbard porte le nom de Svalbard Global Seed Vault dans l'Arctique qui possède une grande bibliothèque souterraine d'ADN végétal. Notre version est une grande version contrôlée collection de données scientifiques publiques. Une fois que nous connaissons et que nous pouvons faire confiance aux métadonnées, nous pouvons construire d'autres projets cool comme un [réseau de stockage de données distribué bénévolement](https://github.com/datproject/datasilo/).

### Coalition des données civiques de Californie

[CACivicData](http://www.californiacivicdata.org/) est une archive open-source qui permet de télécharger quotidiennement à partir de CAL-ACCESS, la base de données californienne de suivi de l'argent en politique. Ils font [des versions quotidiennes](http://calaccess.californiacivicdata.org/downloads/0), ce qui signifie héberger beaucoup de données en double dans leurs fichiers zip. Nous travaillons sur l'hébergement de leurs données en tant que référentiel Dat qui réduira la quantité de tracas et de bande passante nécessaire pour se référer à une version spécifique ou mettre à jour vers une version plus récente.

## Mises à jour d'Electron

Celui-ci n'est pas encore concret, mais nous pensons qu'un cas d'utilisation amusante serait de mettre une application Electron compilée dans un dépôt Dat, puis en utilisant un client Dat dans Electron pour tirer les derniers deltas du binaire de l'application construite, pour économiser sur le temps de téléchargement, mais aussi pour réduire les coûts de bande passante pour le serveur.

## Qui devrait utiliser Dat Desktop ?

Quiconque veut partager et mettre à jour des données sur un réseau p2p. Les informaticiens, les pirates de données ouverts, les chercheurs, les développeurs. Nous sommes super réceptifs aux commentaires si quelqu'un a un cas d'utilisation cool que nous n'avons pas encore pensé. Vous pouvez jeter par notre [Chat Gitter](https://gitter.im/datproject/discussions) et nous demander quoi que ce soit !

## Que se passe-t-il dans Dat and Dat Desktop ?

Publication des comptes utilisateur et des métadonnées. Nous travaillons sur une application web de registre de Dat qui sera déployée sur le projet de données [. rg](https://datproject.org/) qui sera un 'NPM pour les jeux de données', excepté les avertissements étant que nous allons juste être un répertoire de métadonnées et les données peuvent vivre n'importe où en ligne (par opposition au NPM ou à GitHub où toutes les données sont hébergées au centre, parce que le code source est assez petit, vous pouvez le tout dans un seul système). Comme beaucoup de jeux de données sont énormes, nous avons besoin d'un registre fédéré, similaire à la façon dont fonctionnent les trackers BitTorrent). Nous voulons faciliter la recherche ou la publication de jeux de données dans le registre de Dat Desktop, pour rendre le partage des données sans friction.

Une autre fonctionnalité est les dossiers multi-auteurs/collaboratifs. Nous avons de gros projets pour faire des flux de travail collaboratifs, peut-être avec des branches, similaires à git, sauf conçu autour de la collaboration de jeux de données. Mais nous travaillons toujours à la stabilité globale et à la normalisation de nos protocoles dès maintenant !

## Pourquoi avez-vous choisi de construire Dat Desktop sur Electron?

Dat est construit en utilisant Node.js, donc il était naturel pour notre intégration. Au-delà de cela, nos utilisateurs utilisent une variété de machines depuis des scientifiques, les chercheurs et les responsables gouvernementaux peuvent être contraints d'utiliser certaines configurations pour leurs institutions -- cela signifie que nous devons être en mesure de cibler Windows et Linux ainsi que Mac. Dat Desktop nous le donne très facilement.

## Quels sont les défis que vous avez rencontrés lors de la construction de Dat and Dat Desktop ?

Trouver ce que les gens veulent. Nous avons commencé avec des jeux de données tabulaires, mais nous avons réalisé que c'était un peu compliqué à résoudre et que la plupart des gens n'utilisent pas de bases de données. Donc, à mi-parcours du projet, nous avons redessiné tout depuis zéro pour utiliser un système de fichiers et nous n'avons pas regardé en arrière.

Nous avons également rencontré des problèmes généraux d'infrastructure d'Electron, notamment :

- Télémétrie - comment capturer des statistiques d'utilisation anonymes
- Mises à jour - C'est une sorte de piqué et de magie de mettre en place des mises à jour automatiques
- Versions - Signature XCode, construction de versions sur Travis, en faisant des versions bêta, tous étaient des défis.

Nous utilisons également Browserify et quelques transformations de Browserify sur le code 'front-end' dans Dat Desktop (qui est un peu bizarre parce que nous avons encore des paquets même si nous avons des `natifs nécessitant` -- mais c'est parce que nous voulons les Transformes). Pour mieux aider à gérer notre CSS nous sommes passés de Sass à l'utilisation de [sheetify](https://github.com/stackcss/sheetify). Il nous a grandement aidés à modulariser notre CSS et à faciliter le déplacement de notre interface utilisateur vers une architecture orientée vers des composants avec des dépendances partagées. Par exemple [dat-colors](https://github.com/Kriesse/dat-colors) contient toutes nos couleurs et est partagé entre tous nos projets.

Nous avons toujours été un grand fan de standards et d'abstractions minimes. Toute notre interface est construite à l'aide de nœuds DOM réguliers avec seulement quelques bibliothèques d'aide. Nous avons commencé à déplacer certains de ces composants dans [éléments de base](https://base.choo.io), une bibliothèque de composants réutilisables de bas niveau. Comme avec la plupart de notre technologie, nous continuons à itérer dessus jusqu'à ce que nous y arrivions correctement, mais en tant qu'équipe, nous avons le sentiment que nous allons dans la bonne direction ici.

## Dans quels domaines faut-il améliorer Electron ?

Nous pensons que le plus grand point de douleur est les modules natifs. Reconstruire vos modules pour Electron avec npm ajoute de la complexité au workflow. Notre équipe a développé un module appelé [`prebuild`](http://npmjs.org/prebuild) qui gère les binaires précompilés, qui a bien fonctionné pour Node, mais les workflows Electron nécessitaient toujours une étape personnalisée après l'installation, généralement `npm run rebuild`. Cela a été ennuyeux. Pour résoudre ce problème, nous sommes récemment passés à une stratégie où nous regroupons toutes les versions binaires compilées de toutes les plates-formes à l'intérieur de l'archive tar npm. Cela signifie que les archives deviennent plus grandes (bien que cela puisse être optimisé avec `. o` fichiers - bibliothèques partagées), cette approche évite d'avoir à exécuter des scripts de post-installation et évite aussi complètement le patron `npm run rebuild`. Cela signifie que `npm install` fait la bonne chose pour Electron la première fois.

## Quelles sont vos choses préférées à propos d'Electron?

Les API semblent assez bien pensées, elles sont relativement stables et ça fait un bon travail pour se tenir à jour avec les versions amont de Node, pas grand chose que nous pouvons demander !

## Des conseils d'Electron qui pourraient être utiles aux autres développeurs ?

Si vous utilisez des modules natifs, donnez un coup de pied à [prebuild](https://www.npmjs.com/package/prebuild)!

## Quelle est la meilleure façon de suivre les développements de Dat ?

Suivez [@dat_project](https://twitter.com/dat_project) sur Twitter, ou abonnez-vous à notre [newsletter e-mail](https://tinyletter.com/datdata).

