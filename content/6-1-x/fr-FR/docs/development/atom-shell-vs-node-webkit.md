# Différence technique entre Electron et NW.js (anciennement node-webkit)

__Remarque : Electron s’appelait avant Atom Shell.__

Comme NW.js, Electron fournit une plate-forme pour écrire des applications desktop avec JavaScript et HTML et a une intégration Node pour avoir accès au système de bas niveau depuis une pages web.

Mais il y a aussi des différences fondamentales entre les deux projets qui rendent Electron complètement distinct de NW.js :

__1. Point d'entrée__

Dans NW.js, le point d'entrée principal d'une application est une page web ou un script JS. Vous pouvez spécifier un fichier html ou js dans le `package.json` et sera ouvert dans une fenêtre navigateur comme fenêtre principale de l'application (dans le cas où c'est un fichier html) ou le script sera exécuté.

Avec Electron, le point d’entrée est un script JavaScript. Au lieu de fournir une URL directement, vous créez une fenêtre de navigateur manuellement et chargez un fichier HTML à l’aide de l’API. Vous devez aussi écouter les événements de fenêtre pour décider quand quitter l’application.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

__2. Développement Système__

Afin d’éviter la complexité de la compilation de Chromium, Electron utilise [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) pour accéder à l'API Chromium Content. `libchromiumcontent` est une bibliothèque partagée et unique qui inclut le module Chromium Content et de toutes ses dépendances. Les utilisateurs n’ont pas besoin d’une machine puissante pour compiler Electron.

__3. Intégration de Node__

Avec NW.js, l’intégration de Node dans les pages web nécessite de patcher Chromium pour fonctionner, alors qu’avec Electron nous avons choisi une autre façon d’intégrer la boucle libuv avec chaque boucle message de plateforme pour éviter le "hack" Chromium. Voir le code [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) pour comprendre comment cela a été fait.

__4. Multi-contexte__

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

En utilisant la fonctionnalité [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) de Node, Electron n’introduit pas de nouveau contexte JavaScript dans les pages web.

Remarque : NW.js supporte éventuellement le multi-contexte depuis la v0.13.
