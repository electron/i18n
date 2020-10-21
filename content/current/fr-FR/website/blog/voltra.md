---
title: 'Projet de la Semaine : Voltra'
author:
  - '0x00A'
  - aprileelcich
  - zeke
date: '2017-03-07'
---

Cette semaine, nous avons rencontré [Aprile Elcich](https://twitter.com/aprileelcich) et [Paolo Fragomeni](https://twitter.com/0x00A) pour parler de Voltra, un lecteur de musique électrique.

---

## Qu'est-ce que Voltra?

[Voltra](https://voltra.co/) est un lecteur de musique pour les personnes qui veulent posséder leur musique. C’est aussi un magasin où vous pourrez découvrir et acheter de nouvelles musiques à partir de ce que vous possédez déjà. Il est sans publicité, multi-plateforme pour bureau et mobile. Il ne vous espionne pas non plus.

[![Vue voltra-artiste](https://cloud.githubusercontent.com/assets/2289/23670061/4db0323c-031b-11e7-81fd-128e714e911c.jpg)](https://voltra.co/)

## À qui sert Voltra?

Quiconque écoute la musique.

## Qu'est-ce qui vous a motivé à créer Voltra?

La radio a toujours eu une grande part d'auditeurs. Elle se déplace des ondes et sur Internet. Maintenant vous pouvez louer de la musique à la demande — c’est une relance de la radio ! De nombreux nouveaux produits et services sont apparus à cause de cela, mais la radio en streaming laisse encore quelqu'un d'autre en contrôle de votre musique et de la façon dont vous en faites l'expérience.

Nous voulions un produit entièrement axé sur la musique que vous possédez. Quelque chose qui a facilité la découverte et l'achat de nouvelles musiques directement auprès des artistes ou des étiquettes.

## Y a-t-il une version gratuite ?

Le lecteur de bureau est entièrement gratuit. [Vendre votre musique est également gratuit !](https://voltra.co/artists) Nous ne sommes pas pris en charge par la publicité.

Étant donné que l'application est gratuite, nous pourrions l'ouvrir plus tard. Pour le moment, nous n'avons pas la bande passante pour gérer cela. Nous avons également des idées très spécifiques pour les fonctionnalités et la direction que nous voulons prendre. Nous avons une communauté bêta active et nous prenons nos commentaires à cœur.

## Comment gagner de l'argent?

Nous avons des fonctionnalités premium !

Notre [Voltra Audio Archive](https://voltra.co/premium/) est un service de sauvegarde de nuages conçu spécifiquement pour la musique. Nous ne compressons ni ne partageons pas de blocs de données. Votre collection de musique est physiquement sauvegardée pour vous.

Pour les artistes et les labels, notre [adhésion Pro](https://voltra.co/artists/pro) offre des outils pour les aider à atteindre des publics plus pertinents, tels que les pages Web d'analytique et d'artistes professionnels.

## Qu'est-ce qui rend Voltra différent?

Le design et la facilité d'utilisation sont extrêmement importants pour nous. Nous voulons offrir aux auditeurs une expérience d'écoute sans distraction! Il y a un certain nombre de lecteurs de musique intéressants et de magasins. Mais beaucoup d'entre eux sont plus avancés et plus difficiles à utiliser que ce que leurs créateurs réalisent. Nous voulons rendre Voltra accessible au plus grand nombre de personnes possible.

Nous ne prenons pas non plus une coupure de l'artiste ou de l'étiquette. C’est un différentiateur clé pour nous. C’est vraiment important parce qu’il réduit la barrière pour que les artistes mettent leur musique sur le marché.

## What are some design & technical decisions you made?

En concevant Voltra, nous avons envisagé des conventions de l'interface utilisateur à partir d'applications natives et du web, nous avons également beaucoup réfléchi à ce que nous pouvions supprimer. Nous avons un groupe bêta privé actif qui nous a donné des commentaires critiques au cours de ces derniers mois.

Nous avons trouvé que les pochettes d'album et la photographie sont vraiment importantes pour les gens. De nombreux joueurs ne sont que des listes de fichiers. L'une des choses intéressantes à propos de la possession d'albums physiques est la pochette de l'album, et nous voulions mettre l'accent sur cela dans l'application de bureau Voltra.

[![voltra-albumview](https://cloud.githubusercontent.com/assets/2289/23670056/4b0c18d4-031b-11e7-89e1-539e927a380d.jpg)](https://voltra.co/)

Nous avons également veillé à ne pas gâcher les fichiers des gens. Nous utilisons la surveillance de fichiers pour que vous puissiez placer vos fichiers où vous voulez, et nous ne les renommons pas et ne les déplacons pas pour vous. Nous avons une base de données embarquée pour suivre l'état des répertoires surveillés afin de pouvoir suivre ce qui est nouveau, même lorsque le processus ne fonctionne pas.

## Quels sont les défis que vous avez rencontrés lors de la construction de Voltra?

Nous consacrons beaucoup de temps à la performance. Nous avons commencé avec des frameworks mais nous avons déplacé vers Javascript vanilla. Dans notre expérience, les abstractions généralisées qu'elles offrent l'emportent sur les pénalités de performance et la cérémonie qu'elles introduisent.

Nous gérons assez bien les très grandes collections à ce stade. Les grandes collections signifient peut-être des dizaines de milliers d'images! Avoir un noeud. du module système de fichiers directement disponible à partir du processus de rendu, il est très facile de charger et de décharger de nombreuses images très rapidement en se basant sur les événements DOM.

En général *[setImmediate](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate)* et *[requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)* ont été des outils super importants pour effectuer beaucoup de traitement tout en maintenant l'interface utilisateur réactive. Plus spécifiquement, la distribution de tâches liées au processeur en processus séparés aide vraiment à maintenir l'interface utilisateur réactive. Par exemple, nous avons déplacé le contexte audio réel dans un processus séparé, communiquer avec elle sur [IPC](https://electronjs.org/docs/glossary/#ipc) pour éviter les éventuelles interruptions d'une interface occupée.

## Pourquoi avez-vous choisi de construire Voltra sur Electron?

Le bac à sable du navigateur est trop restreint pour notre application. Mais nous développons également un lecteur web. C’est donc une énorme victoire que nous pouvons partager presque 100% du code entre les deux implémentations.

Nous avons commencé par construire une application native avec Swift. Le problème principal que nous avons découvert était que nous réinventions beaucoup de choses. Le web a le plus grand écosystème open source au monde. Nous sommes donc assez rapidement passés à Electron.

De plus, et surtout, avec Electron, vous développez une fois et il devrait Just WorkMC sur toutes les plates-formes principales. Ce n’est pas garanti, mais le coût du codage natif pour chaque plateforme dépasse certainement les coûts que Electron introduit.

## Quelles sont vos choses préférées à propos d'Electron?

**GTD !**: Avoir la pile réseau de Node.js et la couche de présentation de Chromium empaquetée ensemble est une recette pour faire avancer les choses.

**Compétence**: Ce n'est que la pile web, donc littéralement toute notre équipe est impliquée dans la construction du produit.

**Communauté**: Il y a une communauté hautement organisée qui sait bien communiquer ! Nous nous sentons ravis de développer avec le support de cette façon.

## Dans quels domaines peut-on améliorer Electron ?

Nous aimerions voir Electron approuver un seul paquet. L'empaquetage est aussi important pour Electron que le gestionnaire de paquets est à Node. Il y a plusieurs empaqueteurs dans la zone utilisateur, chacun avec des fonctionnalités intéressantes, mais chacun avec des bogues. Un consensus de la part de la communauté aiderait à diriger l’énergie dépensée par les contributeurs.

## Que se passe-t-il ensuite?

Nous développons actuellement une application mobile, et travaillons avec des artistes et des labels pour ajouter leur musique à la boutique Voltra. Hé ! Si vous êtes un artiste ou une étiquette, [inscrivez-vous dès maintenant](https://admin.voltra.co/signup)! Nous prévoyons d'ouvrir la boutique lorsque nous atteindrons notre objectif de 10 millions de pistes.

