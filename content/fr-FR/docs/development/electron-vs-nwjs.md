# Différences techniques entre Electron et NW.js

Comme [NW.js][nwjs], Electron fournit une plate-forme pour développer des applications de bureau avec des technologies web. Les deux plateformes permettent aux développeurs d’utiliser HTML, JavaScript et Node.js. À première vue, ils semblent très similaires.

Il existe toutefois des différences fondamentales entre les deux projets qui font de Electron un produit complètement distinct de nw.js.

## 1) Entrée de la demande

Dans NW.js, le point d’entrée principal d’une application peut être une page Web HTML. Dans cas, NW.js le point d’entrée donné dans une fenêtre de navigateur.

Dans Electron, le point d’entrée est toujours un script JavaScript. Au lieu de fournir une URL , vous créez manuellement une fenêtre de navigateur et chargez un fichier HTML à l’aide 'API. Vous devez également écouter les événements de fenêtre pour décider quand quitter la application.

Electron fonctionne plus comme le nœud.js temps d’exécution. Les API d’Electron sont de niveau inférieur, vous pouvez l’utiliser pour les tests de navigateur à la place de [PhantomJS](https://phantomjs.org/).

## 2) Intégration des nœuds

Dans NW.js, l’intégration des nœuds dans les pages Web nécessite de patcher chrome pour fonctionner, tandis que dans Electron nous avons choisi une façon différente d’intégrer la boucle `libuv` avec la boucle de message de chaque plate-forme pour éviter de pirater chrome. Voir le code [`node_bindings`][node-bindings] pour comprendre comment cela a été fait.

## 3) Contextes JavaScript

Si vous êtes un utilisateur expérimenté de NW.js, vous devez être familier avec le concept de de nœud et de contexte Web. Ces concepts ont été inventés en raison de la façon dont nw.js été mis en œuvre.

En utilisant la [multi-contexte](https://github.com/nodejs/node-v0.x-archive/commit/756b622) de Node, Electron n’introduit pas de nouveau contexte JavaScript dans les pages web web.

Remarque : NW.js supporte éventuellement le multi-contexte depuis la v0.13.

## 4) Soutien hérité

NW.js offre toujours une « version héritée » qui prend en charge Windows XP. Il ne reçoit pas mises à jour de sécurité.

Étant donné que les fabricants de matériel, Microsoft, Chrome et Nœud.js n’ont pas publié même des mises à jour de sécurité critiques pour ce système, nous devons vous avertir que l’utilisation de Windows XP est extrêmement précaire et carrément irresponsable.

Cependant, nous comprenons que les exigences en dehors de notre imagination la plus folle peuvent exister, donc si vous êtes à la recherche de quelque chose comme Electron qui fonctionne sur Windows XP, le NW.js version héritée pourrait être le bon ajustement pour vous.

## 5) Caractéristiques

Il existe de nombreuses différences dans la quantité de fonctionnalités prises en charge. Electron a une plus grande communauté, plus d’applications de production à l’utiliser, et [une grande quantité de modules userland disponibles sur npm][electron-modules].

À titre d’exemple, Electron a intégré la prise en charge des mises à jour automatiques et d’innombrables outils qui facilitent la création d’installateurs. À titre d’exemple en faveur de NW.js, NW.js prend en charge `Chrome.*` API pour le développement d’applications Chrome.

Naturellement, nous croyons qu’Electron est la meilleure plate-forme pour les applications de production de polies construites avec des technologies Web (comme Visual Studio Code, Slack ou Facebook Messenger); cependant, nous voulons être justes envers notre technologie Web et amis. Si vous avez des besoins de fonctionnalités qu’Electron ne répond pas, vous pouvez essayer NW.js.

[nwjs]: https://nwjs.io/
[electron-modules]: https://www.npmjs.com/search?q=electron
[node-bindings]: https://github.com/electron/electron/tree/master/lib/common
