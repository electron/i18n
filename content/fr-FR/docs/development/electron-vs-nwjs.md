# Différences techniques entre Electron et NW.js

Comme [NW.js][nwjs], Electron fournit une plate-forme pour développer des applications de bureau avec des technologies web. Les deux plates-formes permettent aux développeurs d'utiliser du HTML, JavaScript et Node.js. En surface, ils semblent très similaires.

Il existe cependant des différences fondamentales entre les deux projets qui font d'Electron un produit complètement distinct de NW.js.

## 1) Point d'entré de l'application

Dans NW.js, le point d'entrée principal d'une application peut être une page Web HTML. Dans dans ce cas, NW.js ouvrira le point d'entrée donné dans une fenêtre de navigateur.

Dans Electron, le point d'entrée est toujours un script JavaScript. Au lieu de fournir un URL directement, vous créez manuellement une fenêtre de navigateur et chargez un fichier HTML en utilisant l'API. Vous devez également écouter les événements de fenêtre pour décider quand quitter l'application.

Electron fonctionne plus comme le runtime Node.js. Les API d’Electron sont de niveau inférieur, vous pouvez l’utiliser pour les tests de navigateur à la place de [PhantomJS](https://phantomjs.org/).

## 2) Intégration de Node

Dans NW.js, l'intégration de node dans les pages web requière de patcher Chronium pour fonctionner, alors que dans Electron nou avons choisi une approche différente d'intégrer la boucle `libuv` avec le protocole de communication de chaque plateforme pour éviter le piratage de Chronium. Voir le code [`node_bindings`][node-bindings] pour comprendre comment cela a été fait.

## 3) Contextes JavaScript

Si vous êtes un utilisateur expérimenté de NW.js, vous devez être familiarisé avec le concept de contexte de Node et contexte Web. Ces concepts ont été inventés à cause de la manière dont NW.js a été implémenté.

En utilisant le [multi-contexte](https://github.com/nodejs/node-v0.x-archive/commit/756b622) fonctionnalité de Node, Electron n'introduit pas de nouveau contexte JavaScript dans les pages web.

Remarque : NW.js supporte éventuellement le multi-contexte depuis la v0.13.

## 4) Rétrocompatibilité

NW.js offre quand même de la rétrocompatibilité jusque sur Windows XP. Il ne reçoit pas les mises à jour de sécurité.

Etant donné que les fabriquants de matériel, Microsoft, Chronium, et Node.js n'ont pas réalisés de mise à jour de sécurité pour Windows XP, nous devons vous avertir que l'utiliser sur cette plateforme est totallement non sécurisé et très irresponsable.

Cependant, nous comprenons que des exigences en dehors de notre imagination la plus folle peuvent exister, donc si vous recherchez quelque chose comme Electron qui fonctionne sous Windows XP, la version héritée de NW.js pourrait vous convenir.

## 5) Fonctionnalités

Il existe de nombreuses différences dans la quantité de fonctionnalités prises en charge. Electron a une plus grande communauté, plus d'application sur le marché, et [une grande quantité de librairies disponibles sur npm][electron-modules].

À titre d'exemple, Electron a un support intégré pour les mises à jour automatiques et d'innombrables outils qui facilitent la création d'installateurs. A titre d'exemple en faveur de NW.js, NW.js prend en charge davantage d'API `Chrome.*` pour le développement d'applications Chrome.

Naturellement, nous pensons qu'Electron est la meilleure plate-forme pour les applications de production construites avec les technologies Web (comme Visual Studio Code, Slack ou Facebook Messenger); cependant, nous voulons être équitables envers notre technologie Web copain. Si vous avez des besoins en fonctionnalités auxquels Electron ne répond pas, vous voudrez peut-être essayer NW.js.

[nwjs]: https://nwjs.io/
[electron-modules]: https://www.npmjs.com/search?q=electron
[node-bindings]: https://github.com/electron/electron/tree/master/lib/common
