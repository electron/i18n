---
title: 'Projet de la semaine: WebTorrent'
author:
  - féros
  - zeke
date: '2017-03-14'
---

Cette semaine, nous avons rattrapé [@feross](https://github.com/feross) et [@dcposch](https://github.com/dcposch) pour parler de WebTorrent, le client torrent basé sur le Web qui connecte les utilisateurs ensemble pour former un réseau distribué et décentralisé de navigateur-fureteur.

---

## Qu'est-ce que WebTorrent ?

[WebTorrent](https://webtorrent.io) est le premier client torrent qui fonctionne dans le navigateur. Il est écrit entièrement en JavaScript et il peut utiliser WebRTC pour le transport entre pairs. Aucun plugin, extension ou installation n'est nécessaire.

En utilisant les standards ouverts, WebTorrent relie les utilisateurs de sites Web pour former un réseau distribué décentralisé de navigateur-navigateur-navigateur pour un transfert efficace de fichiers.

Vous pouvez voir une démo de WebTorrent en action ici : [webtorrent.io](https://webtorrent.io/).

<a href="https://webtorrent.io/">
  <img alt="page d'accueil du webtorrent" src="https://cloud.githubusercontent.com/assets/2289/23912149/1543d2ce-089c-11e7-8519-613740c82b47.jpg">
</a>

## Pourquoi est-ce cool?

Imaginez un site vidéo comme YouTube, mais où les visiteurs aident à héberger le contenu du site. Plus il y a de gens qui utilisent un site Web propulsé par WebTorrent, plus vite et plus résilient.

La communication entre navigateurs coupe le milieu, et permet aux gens de communiquer selon leurs propres termes. Plus de client/serveur – juste un réseau de pairs, tous égaux. WebTorrent est la première étape du voyage vers une nouvelle décentralisation du Web.

## Où Electron entre-t-il dans l'image ?

Il y a environ un an, nous avons décidé de construire [WebTorrent Desktop](https://webtorrent.io/desktop/), une version de WebTorrent qui fonctionne comme une application de bureau.

[![Fenêtre du lecteur de bureau WebTorrent](https://cloud.githubusercontent.com/assets/2289/23912152/154aef0a-089c-11e7-8544-869b0cd642b1.jpg)](https://webtorrent.io/desktop/)

Nous avons créé WebTorrent Desktop pour trois raisons :

1. Nous voulions une application torrent propre, légère, sans publicité, open source
2. Nous voulions une application torrent avec un bon support de streaming
3. Nous avons besoin d'un "client hybride" qui connecte les réseaux BitTorrent et WebTorrent

## Si nous pouvons déjà télécharger des torrents dans mon navigateur web, pourquoi une application de bureau ?

Tout d'abord, un peu d'arrière-plan sur la conception de WebTorrent.

<a href="https://webtorrent.io/desktop/">
  <img alt="Logo du bureau webtorrent" src="https://cloud.githubusercontent.com/assets/2289/23912151/154657e2-089c-11e7-9889-6914ce71ebc9.png" width="200" align="right">
</a>

Au début, BitTorrent a utilisé TCP comme protocole de transport. Plus tard, uTP est venu avec de meilleures performances et des avantages supplémentaires par rapport au TCP. Chaque client torrent principal a finalement adopté uTP, et aujourd'hui vous pouvez utiliser BitTorrent sur l'un ou l'autre protocole. Le protocole WebRTC est l'étape logique suivante. Il promet l’interopérabilité avec les navigateurs web – un réseau P2P géant composé de tous les clients BitTorrent de bureau et de millions de navigateurs web.

Les “pairs Web” (pairs torrent qui fonctionnent dans un navigateur Web) renforcent le réseau BitTorrent en ajoutant des millions de nouveaux pairs, et la diffusion de BitTorrent à des douzaines de nouveaux cas d'utilisation. WebTorrent suit la spécification BitTorrent aussi près que possible pour faciliter la prise en charge des clients BitTorrent existants par WebTorrent.

Certaines applications torrent comme [Vuze](https://www.vuze.com/) prennent déjà en charge les pairs web, mais nous ne voulions pas attendre le reste pour ajouter du support. **Fondamentalement, WebTorrent Desktop a été notre façon d'accélérer l'adoption du protocole WebTorrent.** En créant une application torrent géniale que les gens veulent vraiment utiliser, nous augmentons le nombre de pairs dans le réseau qui peuvent partager des torrents avec des pairs web (i. . utilisateurs sur les sites Web).

## Quels sont certains cas d'utilisation intéressants pour les torrents au-delà de ce que les gens savent déjà qu'ils peuvent faire?

Une des utilisations les plus excitantes pour WebTorrent est la livraison assistée par des pairs. Des projets à but non lucratif comme [Wikipedia](https://www.wikipedia.org/) et l' [Internet Archive](https://archive.org/) pourraient réduire la bande passante et les coûts d'hébergement en permettant aux visiteurs de pénétrer la puce. Le contenu populaire peut être servi de navigateur, rapidement et à moindre coût. Le contenu rarement consulté peut être servi de manière fiable via HTTP à partir du serveur d'origine.

L'Internet Archive a déjà mis à jour leurs fichiers torrent pour qu'ils fonctionnent bien avec WebTorrent. Donc, si vous voulez intégrer le contenu d'Internet Archive sur votre site, vous pouvez le faire de manière à réduire les coûts d'hébergement pour les archives, leur permettant de consacrer plus d'argent à l'archivage réel du web!

Il y a aussi des cas excitants d'utilisation commerciale, des CDN à la livraison d'applications par P2P.

## Quels sont certains de vos projets favoris qui utilisent WebTorrent?

![Capture d'écran de l'application Gaia](https://cloud.githubusercontent.com/assets/2289/23912148/154392c8-089c-11e7-88a8-3d4bcb1d2a94.jpg)

La chose la plus cool construite avec WebTorrent, les mains, est probablement [Gaia 3D Star Map](http://charliehoey.com/threejs-demos/gaia_dr1.html). Il s'agit d'une simulation interactive de la Voie lactée. Les données se chargent à partir d'un torrent, directement dans votre navigateur. Il est impressionnant de voler à travers notre système d'étoiles et de réaliser à quel point nous, les humains, sommes peu comparés à l'immensité de notre univers.

Vous pouvez lire comment cela a été fait dans [Torrenting The Galaxy](https://medium.com/@flimshaw/torrenting-the-galaxy-extracting-2-million-3d-stars-from-180gb-of-csvs-457ff70c0f93), un article de blog où l'auteur, Charlie Hoey, explique comment il a construit la carte des étoiles avec WebGL et WebTorrent.

<a href="https://brave.com/">
  <img alt="Logo brave" src="https://cloud.githubusercontent.com/assets/2289/23912147/1542ad4a-089c-11e7-8106-15c8e34298a9.png" width="150" align="left">
</a>

Nous sommes également d'énormes fans de [Brave](https://brave.com/). Brave est un navigateur qui bloque automatiquement les publicités et les trackers pour rendre le Web plus rapide et plus sûr. Brave a récemment ajouté le support du torrent pour que vous puissiez [voir les torrents traditionnels sans utiliser une application séparée](https://torrentfreak.com/brave-a-privacy-focused-browser-with-built-in-torrent-streaming-170219/). Cette fonctionnalité est gérée par WebTorrent.

Ainsi, tout comme la façon dont la plupart des navigateurs peuvent rendre les fichiers PDF, Brave peut rendre les liens magnet et les fichiers torrents. Ce sont juste un autre type de contenu que le navigateur prend en charge nativement.

L'un des cofondateurs de Brave est en fait Brendan Eich, le créateur de JavaScript, la langue dans laquelle nous avons écrit WebTorrent, donc nous pensons qu'il est assez cool que Brave ait choisi d'intégrer WebTorrent.

## Pourquoi avez-vous choisi de construire WebTorrent Desktop sur Electron?

<a href="https://webtorrent.io/desktop/">
  <img alt="Fenêtre principale WebTorrent Desktop" src="https://cloud.githubusercontent.com/assets/2289/23912150/15444542-089c-11e7-91ab-7fe3f1e5ee43.jpg" align="right" width="450">
</a>

Il y a un meme que les applications Electron sont « gonflées » parce qu'elles incluent l'intégralité du module de contenu Chrome dans chaque application. Dans certains cas, c'est partiellement vrai (un installateur d'applis Electron est généralement ~40 Mo, où un installateur d'applis spécifique au système d'exploitation est généralement ~20 Mo).

Cependant, dans le cas de WebTorrent Desktop, nous utilisons presque toutes les fonctionnalités d'Electron, et des dizaines de fonctionnalités de Chrome dans le cadre d'un fonctionnement normal. Si nous voulions implémenter ces fonctionnalités à partir de rien pour chaque plate-forme, il aurait fallu des mois ou des années de plus pour construire notre application, ou nous n'aurions pu être publiés que pour une seule plate-forme.

Juste pour obtenir une idée, nous utilisons l'intégration du dock [d'Electron](https://electronjs.org/docs/api/app/#appdockbouncetype-macos) (pour afficher la progression du téléchargement), [intégration de la barre de menu](https://electronjs.org/docs/api/menu) (à exécuter en arrière-plan), [enregistrement du protocole](https://electronjs.org/docs/api/app/#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) (pour ouvrir des liens magnet), [bloqueur d'économie d'énergie](https://electronjs.org/docs/api/power-save-blocker/) (pour éviter la mise en veille pendant la lecture vidéo) et [mise à jour automatique](https://electronjs.org/docs/api/auto-updater). En ce qui concerne les fonctionnalités de Chrome, nous utilisons beaucoup de balises : la balise `<video>` (pour lire plusieurs formats vidéo différents), la balise `<track>` (pour le support des sous-titres fermés), le support par glisser-déposer et WebRTC (qui n'est pas trivial à utiliser dans une application native).

Sans oublier : notre moteur torrent est écrit en JavaScript et suppose l'existence de beaucoup d'API Node, mais surtout `require('net')` et `require('dgram')` pour le support du socket TCP et UDP.

Fondamentalement, Electron est exactement ce dont nous avions besoin et possédions l'ensemble exact de fonctionnalités dont nous avions besoin pour expédier une application solide et polie en un temps record.

## Quelles sont vos choses préférées à propos d'Electron?

La bibliothèque WebTorrent est en cours de développement en tant que projet open source depuis deux ans. **Nous avons fait WebTorrent Desktop en quatre semaines.** Electron est la principale raison pour laquelle nous avons pu construire et expédier notre application si rapidement.

Tout comme le noeud. s a rendu la programmation serveur accessible à une génération de programmeurs front-end utilisant jQuery-using , Electron rend le développement natif d'applications accessibles à tous ceux qui sont familiers avec Web ou Node. le développement. Electron est extrêmement puissant.

## Le site Web et le client Desktop partagent-ils le code ?

Oui, le paquet [`webtorrent` npm](https://npmjs.com/package/webtorrent) fonctionne dans Node.js, dans le navigateur, et dans Electron. Le même code peut s’exécuter dans tous les environnements – c’est la beauté de JavaScript. C'est la période de fonctionnement universelle d'aujourd'hui. Java Applets a promis des applications « Write Once, Run Anywhere », mais cette vision ne s'est jamais matérialisée pour plusieurs raisons. Electron, plus que toute autre plate-forme, se rapproche plutôt de cet idéal.

## Quels sont les défis que vous avez rencontrés lors de la construction de WebTorrent?

Dans les premières versions de l'application, nous nous sommes efforcés de rendre l'interface plus performante. Nous avons mis le moteur torrent dans le même processus de rendu que celui qui dessine la fenêtre principale de l'application qui, de manière prévisible, a conduit à la lenteur à chaque fois qu'il y avait une activité CPU intense à partir du moteur de torrent (comme vérifier les pièces de torrent reçues des pairs).

Nous avons corrigé cela en déplaçant le moteur de torrent dans un second processus de rendu invisible avec lequel nous communiquons sur [IPC](https://electronjs.org/docs/api/ipc-main/). De cette façon, si ce processus utilise brièvement beaucoup de CPU, le thread de l'interface utilisateur ne sera pas affecté. Le défilement du papillon et les animations sont si satisfaisantes.

Note : nous avons dû mettre le moteur torrent dans un processus de rendu au lieu d'un processus "main", parce que nous avons besoin d'accéder à WebRTC (qui n'est disponible que dans le rendu.)

## Dans quels domaines faut-il améliorer Electron ?

Une chose que nous aimerions voir est une meilleure documentation sur la façon de construire et d'expédier des applications prêtes à la production, surtout autour de sujets délicats comme la signature de code et la mise à jour automatique. Nous avons dû en savoir plus sur les meilleures pratiques en creusant dans le code source et en demandant sur Twitter!

## WebTorrent Desktop est-il terminé ? Dans le cas contraire, que se passe-t-il ?

Nous pensons que la version actuelle de WebTorrent Desktop est excellente, mais il y a toujours une marge d'amélioration. Nous travaillons actuellement à améliorer le polissage, les performances, le support des sous-titres et le support des codecs vidéo.

Si vous êtes intéressé à vous impliquer dans le projet, consultez [notre page GitHub](https://github.com/feross/webtorrent-desktop)!

## Des conseils de développement d'Electron qui pourraient être utiles pour d'autres développeurs ?

[Feross](http://feross.org/), l'un des contributeurs de WebTorrent Desktop a récemment donné une conférence *"Real world Electron: Building Cross-platform desktop apps with JavaScript"* à NodeConf Argentina qui contient des conseils utiles pour publier une application Electron polie. La conférence est particulièrement utile si vous êtes au stade où vous avez une application de travail de base et que vous essayez de la faire passer au niveau suivant du polissage et du professionnalisme.

[Regarder ici](https://www.youtube.com/watch?v=YLExGgEnbFY): <iframe width="100%" height="360" src="https://www.youtube.com/embed/YLExGgEnbFY?rel=0" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

[Diapositives ici](https://speakerdeck.com/feross/real-world-electron):

<script async class="speakerdeck-embed" data-id="5aae08bb7c5b4dbd89060cff11bb1300" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[DC](https://dcpos.ch/), un autre contributeur WebTorrent, a écrit [une liste de contrôle des choses que vous pouvez faire](https://blog.dcpos.ch/how-to-make-your-electron-app-sexy) pour que votre application se sente poliée et native. Il est livré avec des exemples de code et couvre des choses telles que l'intégration du dock macOS, le glisser-déposer, les notifications de bureau et s'assurer que votre application se charge rapidement.

