# Différence technique entre Electron et NW.js (anciennement node-webkit)

**Remarque : Electron s’appelait avant Atom Shell.**

Comme NW.js, Electron fournit une plate-forme pour écrire des applications desktop avec JavaScript et HTML et a une intégration Node pour avoir accès au système de bas niveau depuis une pages web.

Mais il y a aussi des différences fondamentales entre les deux projets qui rendent Electron complètement distinct de NW.js :

**1. Point d'entrée**

Avec NW.js, le point d’entrée principal d’une application est une page web. Vous spécifiez une URL de page d’accueil dans le `package.json` et il est ouvert dans une fenêtre de navigateur comme fenêtre principale de l’application.

Avec Electron, le point d’entrée est un script JavaScript. Au lieu de fournir une URL directement, vous créez une fenêtre de navigateur manuellement et chargez un fichier HTML à l’aide de l’API. Vous devez aussi écouter les événements de fenêtre pour décider quand quitter l’application.

Electron fonctionne plus comme le runtime de Node.js. L'API d'Electron est de niveau bas, donc vous pouvez l’utiliser pour tester le navigateur à la place de [PhantomJS](http://phantomjs.org/).

**2. Développement Système**

Afin d’éviter la complexité du développement de tout chrome, Electron utilise [`libchromiumcontent`](https://github.com/brightray/libchromiumcontent) pour accéder à l'API Chromium Content. `libchromiumcontent` est une bibliothèque partagée et unique qui inclut le module Chromium Content et de toutes ses dépendances. Les utilisateurs n’ont pas besoin d’une machine puissante pour compiler Electron.

**3. Intégration de Node**

Avec NW.js, l’intégration de Node dans les pages web nécessite de patcher Chromium pour fonctionner, alors qu’avec Electron nous avons choisi une autre façon d’intégrer la boucle libuv avec chaque boucle message de plateforme pour éviter le "hack" Chromium. Voir le code [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) pour comprendre comment cela a été fait.

**4. Multi-contexte**

Si vous êtes un utilisateur expérimenté de NW.js, vous devez être familiarisé avec le concept de contexte Node et contexte web. Ces concepts ont été inventés lors de l'implémentation de NW.js.

En utilisant la fonctionnalité [multi-context](http://strongloop.com/strongblog/whats-new-node-js-v0-12-multiple-context-execution/) de Node, Electron n’introduit pas de nouveau contexte JavaScript dans les pages web.

Remarque : NW.js supporte éventuellement le multi-contexte depuis la v0.13.