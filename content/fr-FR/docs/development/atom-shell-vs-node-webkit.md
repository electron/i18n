# Technique de différences entre l’électron et de NW.js (anciennement nœud-webkit)

**Remarque : Électron s’appelait précédemment Shell de l’atome.**

Comme NW.js, électron fournit une plate-forme pour écrire des applications de bureau avec JavaScript et HTML et a intégration de nœud pour accorder l’accès au système de bas niveau de pages web.

Mais il y a aussi des différences fondamentales entre les deux projets qui rendent des électrons un produit complètement distinct de NW.js :

**1. entrée de l’Application**

En NW.js le point d’entrée principal d’une application est une page web. Vous spécifiez une URL de page d’accueil dans le `package.json` et il est ouvert dans une fenêtre de navigateur comme fenêtre principale de l’application.

En électronique, le point d’entrée est un script JavaScript. Au lieu de fournir une URL directement, vous créez une fenêtre de navigateur manuellement et chargez un fichier HTML à l’aide de l’API. Vous devez aussi écouter les événements de fenêtre à décider du moment pour quitter l’application.

Électron fonctionne plus comme le runtime de Node.js. API de l’électron est niveau inférieur, donc vous pouvez l’utiliser pour tester à la place de [PhantomJS](http://phantomjs.org/) le navigateur.

**2. construire le système**

Afin d’éviter la complexité de la construction tout chrome, électrons utilise [`libchromiumcontent`](https://github.com/brightray/libchromiumcontent) pour accéder aux API contenu de chrome. `libchromiumcontent` est une bibliothèque partagée unique qui inclut le module chrome contenu et toutes ses dépendances. Utilisateurs n’ont besoin d’une machine puissante pour construire des électrons.

**3. intégration de noeud**

Dans NW.js, l’intégration de nœud dans les pages web nécessite patcher chrome à travailler, alors qu’en électronique, nous avons choisi une autre façon d’intégrer la boucle de libuv avec la boucle de message de chaque plate-forme pour éviter le piratage de chrome. Voir le code[`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) pour la façon dont cela a été fait.

**4. multi-contexte**

Si vous êtes un utilisateur expérimenté de NW.js, vous devez être familiarisé avec le concept du nœud de contexte et web. Ces concepts ont été inventés en raison de comment NW.js a été mis en place.

En utilisant la fonctionnalité de [multi-context](http://strongloop.com/strongblog/whats-new-node-js-v0-12-multiple-context-execution/) du nœud, les électrons n’introduit un nouveau contexte de JavaScript dans les pages web.

Remarque : NW.js éventuellement soutient multi contexte depuis 0,13.