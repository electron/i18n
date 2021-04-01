---
title: 'Projet de la Semaine : Kap'
author:
  - skllcrn
  - sindreshus
  - zeke
date: '2017-01-31'
---

La communauté Electron croît rapidement, et les gens créent de puissantes nouvelles applications et outils à une vitesse stupéfiante. Pour célébrer cet élan créatif et tenir la communauté informée de certains de ces nouveaux projets, Nous avons décidé de lancer une série hebdomadaire de blogs mettant en vedette des projets importants liés à Electron.

---

Ce message est le premier de la série, et comporte [Kap](https://getkap.co/), une application d’enregistrement d’écran open-source construite par [Wulkano](https://wulkano.com/), une équipe géodistribuée de concepteurs et de développeurs indépendants.

[![Capture d'écran Kap](https://cloud.githubusercontent.com/assets/2289/22439463/8f1e509e-e6e4-11e6-9c32-3a9db63fc9a1.gif)](https://getkap.co/)

## Qu'est-ce que Kap?

[Kap est un enregistreur d'écran open-source](https://getkap.co) construit principalement pour permettre aux concepteurs et aux développeurs de capturer facilement leur travail. Les gens l'utilisent pour partager des prototypes animés, documenter des bogues, créer des GIFs idiots et tout ce qui se passe entre les deux.

Nous avons vu des gens de tous âges et de tous horizons l'utiliser dans des environnements éducatifs, screencasts, tutoriels... la liste continue. Même pour créer des actifs de production ! Nous sommes complètement éblouis par la qualité de notre petit projet parallèle.

## Pourquoi l'avez-vous construite?

C'est une très bonne question, ce n'est pas comme si il y avait un manque d'enregistreurs d'écran là-bas! Nous avons estimé que les alternatives étaient soit trop complexes, soit trop coûteuses, soit trop limitées. Rien ne se sentait *juste droit* pour nos besoins quotidiens. Nous pensons également que c'est génial lorsque les outils que nous utilisons pour faire notre travail sont open-source, de cette manière que tout le monde peut aider à les façonner. [Construire Kap a fini par être tout autant sur ce que nous n'avons pas fait](https://medium.com/wulkano-friends/from-idea-to-product-and-beyond-a12850403c38). C'est dans les détails, une accumulation de petites améliorations qui est devenue le contour d'un outil que nous voulions utiliser.

Cependant, et peut-être le plus important, Kap est devenu un endroit où nous pouvons laisser nos soucis à la porte et simplement nous amuser à construire quelque chose pour nous-mêmes et des gens comme nous. Il est si important de créer un environnement où vous arriverez juste à l'évènement, essayez de nouveaux fils et profitez de votre métier. Aucune exigence, aucune pression, aucune attente. Les concepteurs et les développeurs doivent-ils participer au projet? « Pourquoi, oui. » Oui, ils le devraient.

## Pourquoi avez-vous choisi de construire Kap sur Electron?

Il y a eu plusieurs raisons:

* Technologie Web
* La plupart des équipes sont des développeurs web
* Nous investissons en JavaScript
* Il ouvre la porte à plus de personnes pour contribuer
* Electron lui-même est open-source
* La puissance et la modularité facilement maintenable de `node_modules`
* Possibilité de multiplateforme

Nous pensons que l'avenir des applications est dans le navigateur, mais nous ne sommes pas encore tout à fait là. Electron est une étape importante dans le cheminement vers cet avenir. Cela rend non seulement les applications elles-mêmes plus accessibles, mais aussi le code avec lequel elles sont construites. Une idée intéressante est d'imaginer un avenir où l'OS est un navigateur, et les onglets sont essentiellement des applications Electron.

En outre, étant principalement des développeurs web, nous sommes de gros fans de la nature isomorphique de JavaScript, en ce sens que vous pouvez exécuter JS sur le client, le serveur et maintenant le bureau. Avec la technologie web (HTML, CSS et JS), beaucoup de choses sont beaucoup plus simples que natives : prototypage plus rapide, moins de code, flexbox > auto-layout (macOS/iOS).

## Quels sont les défis que vous avez rencontrés lors de la construction de Kap?

En utilisant les ressources disponibles pour enregistrer l'écran a été le plus grand défi. Ils n'étaient tout simplement pas assez performants pour répondre à nos exigences et rendraient le projet défectueux à nos yeux. Bien qu'Electron ne soit pas responsable en soi, il y a encore un fossé entre le développement natif et la construction d'applications de bureau avec la technologie web.

Nous avons passé beaucoup de temps à essayer de contourner les mauvaises performances de l'API `getUserMedia` , un problème originaire de Chromium. L'un de nos principaux objectifs lorsque nous nous sommes mis à faire Kap était de construire l'application entière avec la technologie web. Après avoir essayé tout ce que nous pouvions pour le faire fonctionner (l'exigence minimale étant de 30 FPS sur un écran Retina), Nous avons finalement dû trouver une autre solution.

## Je vois du code Swift dans le dépôt. « De quoi s'agit-il? »

Nous sommes forcés de chercher des alternatives à `getUserMedia`, nous avons commencé à expérimenter avec `ffmpeg`. En plus d'être l'un des meilleurs outils pour la conversion audio et vidéo, il a la fonctionnalité d'enregistrer l'écran sur presque n'importe quel OS, et nous avons pu enregistrer des vidéos croustillantes répondant à notre exigence minimale de 30 FPS sur un écran Retina. Un problème ? La performance était ":weary:", l'utilisation du CPU allait de foin. Nous sommes donc retournés au tableau, avons discuté de nos options et nous avons compris que nous devions faire un compromis. Cela a entraîné [Aperture](https://github.com/wulkano/aperture), notre propre bibliothèque d'enregistrement d'écran pour macOS écrite en Swift.

## Dans quels domaines faut-il améliorer Electron ?

Nous savons tous que les applications Electron peuvent avoir quelque chose à utiliser pour utiliser la RAM, mais encore une fois, c'est vraiment une chose Chromium. Cela fait partie de la façon dont cela fonctionne et cela dépend vraiment de ce que vous utilisez, par exemple Kap et Hyper utilisent généralement moins de 100 Mo de mémoire.

L'un des principaux domaines d'amélioration que nous voyons est la charge utile, en particulier la façon dont Electron distribue Chromium. Une idée serait d'avoir un noyau partagé d'Electron et de faire vérifier si c'est déjà présent sur le système.

Créer des applications Electron multi-plateformes pourrait être une meilleure expérience. Il y a actuellement trop d'incohérences, d'API spécifiques à la plate-forme et de fonctionnalités manquantes entre les plates-formes, rendant votre base de code jonchée de requêtes if-else . Par exemple, la vibrance n'est supportée que sur macOS, la mise à jour automatique fonctionne différemment sur macOS et Windows, et n'est même pas supportée sur Linux. La transparence est un succès ou un manque sur Linux, généralement manquant.

Il devrait également être plus facile d'appeler des API système natif. Electron est livré avec un très bon ensemble d'API, mais parfois vous avez besoin de fonctionnalités qu'il ne fournit pas. Créer un addon natif Node.js est une option, mais c'est douloureux de travailler. Idéalement, Electron serait livré avec une bonne API [FFI](https://en.wikipedia.org/wiki/Foreign_function_interface) , comme [`fastcall`](https://github.com/cmake-js/fastcall). Cela nous aurait permis d'écrire la partie Swift en JavaScript à la place.

## Quelles sont vos choses préférées à propos d'Electron?

Notre chose préférée est facilement le fait que toute personne ayant une connaissance de la création pour le web peut construire et contribuer à des expériences natives multi-plateformes. Sans parler de la facilité et de la joie de le développer, de l'excellente documentation et de l'écosystème florissant.

D'un point de vue frontal, la construction de Kap ne s'est pas sentie différente que la construction d'un simple site Web à l'aide d'API de navigateur. Electron fait un excellent travail pour rendre le développement d'applications similaires (essentiellement identiques) au développement web. Si simple en fait, qu'il n'y avait pas besoin de frameworks ou similaires pour nous aider, juste propre et modulaire JS et CSS.

Nous sommes également d'énormes fans de la construction de l'équipe, de leur dévouement et de leur soutien, et de la communauté active et amicale qu'ils entretiennent. Accroche à vous tous!

## Que se passe-t-il dans Kap?

La prochaine étape pour nous est de passer en revue l'application en préparation de notre 2.0. milestone, qui inclut une réécriture de React en plus du support des plugins, permettant aux développeurs d'étendre la fonctionnalité de Kap! Nous invitons tout le monde à suivre le projet et à contribuer sur notre [dépôt GitHub](https://github.com/wulkano/kap). Nous sommes à l'écoute et nous voulons entendre de la part du plus grand nombre possible d'entre vous [faites-nous savoir comment nous pouvons faire de Kap le meilleur outil possible pour vous](https://wulkano.typeform.com/to/BIvJKz)!

## Qu'est-ce que Wulkano ?

[Wulkano](https://wulkano.com) est un studio de design et un collectif numérique, une équipe de technologues à distance qui aiment travailler ensemble sur les concerts de clients et sur nos propres projets. Nous sommes un groupe de personnes distribuées mais étroites de différents lieux et de différents horizons, partageant des connaissances, des idées, des expériences, mais surtout des GIFs et des memes idiots, dans notre bureau virtuel (qui se trouve être le Slack basé sur Electron !).

## Des conseils d'Electron qui pourraient être utiles aux autres développeurs ?

Profitez et participez à la fantastique [communauté](https://discuss.atom.io/c/electron), consultez [Awesome Electron](https://github.com/sindresorhus/awesome-electron), regardez [exemples](https://github.com/electron/electron-api-demos) et profitez des [docs](https://electronjs.org/docs/)!

