---
title: 'Projet de la Semaine : Bureau WordPress'
author:
  - mkaz
  - Johngodley
  - zeke
date: '2017-02-28'
---

Cette semaine, nous avons rattrapé les gens à [Automattic](https://automattic.com/) pour parler de [WordPress Desktop](https://apps.wordpress.com/desktop/), un client de bureau open-source pour la gestion du contenu WordPress.

---

[![Applications WordPress](https://cloud.githubusercontent.com/assets/2289/23391881/ea54d52e-fd2c-11e6-86ec-98fe466d5c5c.gif)](https://apps.wordpress.com/desktop/)

## Tout le monde sait sur WordPress, mais qu’est-ce que WordPress Desktop?

Le [WordPress. om Desktop app](https://apps.wordpress.com/desktop/) fournit une expérience multiplateforme transparente qui vous permet de vous concentrer sur votre contenu et votre design sans onglets de navigateur pour vous distraire — ou pour garder vos sites à l'écart mais accessibles. En combinaison avec le support de notre navigateur et de notre application mobile, vous pouvez construire votre site n'importe où, de quelque manière que ce soit pour vous aider à faire votre travail.

## Pourquoi construire une application de bureau pour gérer les sites WordPress ? Ne pourrait-il pas tout être basé sur le web?

Il utilise en fait exactement la même technologie que vous obtenez en visitant [WordPress.com](https://wordpress.com) dans votre navigateur. Cependant, tout est hébergé localement, donc il a des temps de chargement minimes. Avec le bénéfice de fonctionnalités natives comme être dans votre doc, les notifications, etc., vous pouvez vraiment vous concentrer sur vos sites WordPress et blogging.

## Pourquoi avez-vous choisi de construire WordPress Desktop sur Electron?

À la fin de 2015, nous avons reconstruit une grande partie de WordPress.com sous la forme de [Calypso](https://github.com/automattic/wp-calypso), une application JavaScript moderne open-source utilisant React. Nous avons commencé à regarder Electron et avec quelques modifications à Calypso ont été en mesure de le faire fonctionner localement. C'était une expérience convaincante et nous pensions qu'il y avait beaucoup de valeur à la développer.

Nous avons eu plusieurs équipes travaillant sur Calypso. Créer un client graphique multi-plateforme qui corresponde à cela en utilisant les technologies de bureau traditionnelles aurait pris plus de travail. En utilisant Electron, une petite équipe de 2-4 d'entre nous ont pu tirer parti des efforts de l'autre équipe et construire l'application de bureau dans quelques mois.

## Quels sont les défis que vous avez rencontrés lors de la construction de WordPress Desktop ?

Nous avons obtenu une version initiale de l'application fonctionnant très rapidement, mais le réglage pour se comporter de manière optimale comme une application de bureau a pris beaucoup plus de temps. Un grand défi avec l'application est que vous utilisez en fait une copie de Calypso sur votre propre machine - il s'agit purement d'une interface utilisateur pilotée par API. Il y a eu beaucoup de travail de passerelle et les changements ont été ramenés à Calypso lui-même.

De plus, beaucoup d'efforts ont été consentis pour empaqueter l'application sur différentes plateformes - nous fournissons Windows, macOS, et les versions Linux - et il y a suffisamment de différences pour rendre cette astuce.

À l'époque, Electron était relativement récent et nous avons continué à rencontrer des problèmes qui ont été résolus sous peu (parfois le même jour !)

## Dans quels domaines faut-il améliorer Electron ?

Electron fournit déjà la plupart de ce dont nous avons besoin pour l'application Desktop, et il progresse rapidement depuis que nous avons commencé à l'utiliser. Cela dit, il y a certains domaines qui sont considérés comme acquis dans une application de bureau, comme la vérification orthographique et la trouver/remplacement, qui sont plus difficiles à reproduire avec Electron tel quel.

Nous aimerions aussi voir certaines des nouvelles technologies Chrome filtrer dans Electron également. Nous sommes particulièrement désireux d’expérimenter avec WebVR.

## Quelles sont vos choses préférées à propos d'Electron?

La raison principale pour laquelle nous avons choisi Electron, et c'est la plus grande force, est la communauté très active et ouverte. Automattic a toujours cru en l'open source. C'est l'un de nos principes de base, et le projet et la communauté d'Electron suit beaucoup des convictions fondamentales d'être très ouvert et positif.

## Que se passe-t-il dans WordPress Desktop ?

L'avantage de notre modèle est que l'application de bureau bénéficie de toutes les nouvelles fonctionnalités de Calypso - il y a des améliorations constantes. Nous espérons que nous pourrons ajouter des fonctionnalités supplémentaires à l'application, telles que le support hors ligne, qui transmettrait réellement l'application dans le territoire natif, et de meilleures notifications système.

## Y a-t-il des équipes dans Automattic travaillant sur d'autres applications Electron ?

Oui, après nos efforts sur l'application Desktop, l'équipe Simplenote a décidé d'utiliser Electron pour construire des applications de bureau pour Windows et Linux (un client Mac natif existe déjà). L'application [Simplenote Electron](https://github.com/Automattic/simplenote-electron) est également open source et disponible sur Github.

Nous avons également une prochaine intégration Raspberry Pi qui utilise Electron.

Si l'un de ces éléments semble intéressant, alors nous aimerions [avoir de vos nouvelles](https://automattic.com/work-with-us/)!

## Des conseils d'Electron qui pourraient être utiles aux autres développeurs ?

Le processus d'expédition de logiciels de bureau signés est relativement récent pour nous, en particulier pour Windows. nous avons écrit un article pour [Code Signing a Windows App](https://mkaz.blog/code/code-signing-a-windows-application/) qui inclut le processus et quelques-uns des obstacles que nous avons rencontrés pour le faire correctement.

