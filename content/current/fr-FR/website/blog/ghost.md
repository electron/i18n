---
title: 'Projet de la Semaine : Fantôme'
author:
  - felixrieseberg
  - zeke
date: '2017-02-14'
---

Cette semaine, nous avons discuté avec [Félix Rieseberg](https://felixrieseberg.com/), ingénieur de bureau à [Slack](https://slack.com/) et mainteneur de [Ghost Desktop](https://ghost.org/downloads/), un client Electron pour la plateforme de publication [Ghost](https://ghost.org/).

---

<div class="pt-5">
  <img src="https://cloud.githubusercontent.com/assets/2289/22913898/7396b0de-f222-11e6-8e5d-147a7ced37a9.png" alt="Capture d'écran Ghost Desktop"> 
</div>

## Qu'est-ce que le fantôme ?

Ghost est une plate-forme entièrement open source, hackable pour la construction et l'exécution d'une publication en ligne moderne. Nous avons le pouvoir des blogs, des magazines et des journalistes de Zappos à Sky News.

## Qu'est-ce qui le rend différent des autres plateformes de publication ?

Ghost a été fondé en avril 2013, après une campagne de Kickstarter très réussie pour créer une nouvelle plate-forme centrée uniquement sur la publication professionnelle. Notre mission est de créer les meilleurs outils open source pour les journalistes et écrivains indépendants du monde entier. et ont un impact réel sur l'avenir des médias en ligne. Il offre une expérience plus simple et plus ciblée : notre éditeur est conçu uniquement pour offrir la meilleure expérience possible en matière d'écriture.

Comparé à WordPress, il offre une expérience plus simple et plus rationalisée - il est plus facile à installer et à entretenir, est livré avec toutes les fonctionnalités importantes hors de la boîte, et est considérablement plus rapide. Comparé aux autres plates-formes en ligne, Ghost donne aux auteurs la pleine propriété et le contrôle de leur contenu, permet une personnalisation complète et permet aux auteurs de construire une entreprise autour de leur publication.

## Ghost est-il une entreprise à but lucratif?

Celui-ci est important pour nous: Ghost est une organisation indépendante à but non lucratif. Nous construisons des outils de publication pour le journalisme moderne & blogging parce que nous croyons que la liberté d'expression est importante. Notre logiciel est distribué sous une [licence libre open source](https://github.com/TryGhost/Ghost), notre modèle d'affaires est [complètement transparent](https://blog.ghost.org/year-3/), et notre structure juridique signifie que 100% de l'argent que nous faisons est réinvesti dans l'amélioration de la qualité de Ghost.

## Qu'est-ce que Ghost Desktop ?

Ghost Desktop permet aux rédacteurs de gérer plusieurs blogs en même temps - et de se concentrer sur leur écriture. Des choses simples comme des raccourcis d'écriture courants ne peuvent pas être réalisées dans un navigateur, mais sont disponibles dans notre application de bureau. Il permet à d'autres applications de communiquer directement [avec le blog via deeplinks](https://github.com/tryghost/ghost-desktop/blob/master/docs/deeplinks.md).

## Qu'est-ce que Ghost for Journalism?

Cette année, nous sommes très heureux de consacrer toute notre équipe de 10 personnes à temps plein Ghost à aider à faire grandir trois publications indépendantes, avec 45 000 $ de ressources pour leurs efforts. Nous l'appelons [Fantôme pour le journalisme](https://ghost.org/journalism/).

Nous construisons Ghost comme la prochaine grande plate-forme web pour les éditeurs indépendants depuis environ trois ans et demi maintenant, et nous avons maintenant atteint un point de flexion vraiment intéressant. Nous avons commencé ce voyage pour créer une plateforme de blogging simple et bien conçue qui pourrait être utilisée par n'importe qui. C'était toujours la première étape.

À long terme, nous voulons que Fantôme soit une plate-forme incroyable pour le meilleur journalisme du monde, et cela signifie que nous avons besoin de construire des fonctionnalités pour attirer exactement ces personnes. Cette année, nous prenons une décision très consciente de nous concentrer sur ce point.

## Pourquoi avez-vous choisi de construire Ghost Desktop sur Electron?

Ghost utilise JavaScript et Node. s sur le backend et le frontend, donc être en mesure d'utiliser la même technologie et le même niveau de compétences permet à notre équipe d'aller plus vite, construire plus, et en fin de compte fournir une meilleure expérience. En outre, être en mesure de partager plus de 95% du code entre macOS, Windows, et la version Linux de l'application nous permet de nous concentrer sur la création d'une grande expérience utilisateur de base, sans avoir à maintenir une base de code pour chaque plateforme.

## Quels sont les défis que vous avez rencontrés lors de la construction de Ghost Desktop ?

La vérification orthographique est probablement encore l'un des services les plus difficiles offerts - nous pourrions facilement utiliser l'un des nombreux services en ligne mais la correction orthographique du texte dans plusieurs langues tout en protégeant la vie privée et l'autonomie de nos utilisateurs n'est pas une tâche facile.

## Dans quels domaines faut-il améliorer Electron ?

Nous aimerions voir Electron apporter les capacités natives de vérification orthographique du système d'exploitation à leurs applications. Nous rêvons d'un monde dans lequel un champ `<input>` reçoit les mêmes services qu'un `NSTextView`, mais nous sommes également intimement conscients de la difficulté.

## Quelles sont vos choses préférées à propos d'Electron?

JavaScript est célèbre pour être un vaste écosystème, impliquant d'innombrables outils et cadres - mais la commodité qu'il nous offre est difficile de surdire. Créer une application avec Electron est seulement _légèrement_ plus difficile que de construire une application web, ce qui est un exploit incroyable.

## Le fantôme est-il fait ? Dans le cas contraire, que se passe-t-il ?

Ghost Desktop est également un projet en cours - nous sommes loin d'être terminés. Nous parlons depuis un certain temps de mettre en place un mode hors ligne complet pour nos utilisateurs, et nous nous approchons assez vite. D'autres domaines de travail remarquables sont l'extension et l'intégration avec d'autres applications d'édition de texte (comme Word ou Atom), permettant, en fin de compte, aux gens d'écrire des messages en utilisant leurs outils favoris. En général, une fois que nous avons fourni la fonction de mode hors ligne, nous recherchons une intégration plus poussée avec le système d'exploitation. Si cela vous semble intéressant, [rejoignez-nous](https://github.com/tryghost/ghost-desktop)!

## Quelles sont vos applications Electron préférées ?

Je suis un grand fan de [Kap](https://getkap.co/), [Felony](https://github.com/henryboldi/felony), et [Visual Studio Code](https://code.visualstudio.com).

👻

