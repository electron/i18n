# Les standards et CLI (Command-line interface)

Le développement avec Electron est sans parti pris - il n'y a pas "un unique chemin" pour développer, construire, packager, ou sortir une application Electron. Des fonctionnalités supplémentaires pour Electron, à la fois pour la construction et l'exécution, peuvent généralement être trouvées sur [npm](https://www.npmjs.com/search?q=electron) dans des paquets individuels, permettant aux développeurs de construire l'application et de construire le pipeline dont ils ont besoin.

Ce niveau de modularité et d'extensibilité garantit que tous les développeurs travaillant avec Electron, que ce soit dans de grandes ou de petites équipes, ne sont jamais limités dans ce qu'ils peuvent ou ne peuvent pas faire pendant leur cycle de vie de développement. Cependant, pour de nombreux développeurs, l'un des boilerplates communautaires ou un outil en ligne de commande peut rendre la compilation, le paquetage et la publication d'une application extrêmement faciles.

## Boilerplate vs CLI

Un "Boilerplate" n'est qu'un point de départ - une toile, pour ainsi dire - à partir de laquelle vous construisez votre application. Ils se présentent généralement sous la forme d'un dossier que vous pouvez cloner et personnaliser.

Un outil en ligne de commande quant à lui est à vos côtés durant tout le processus de développement et de déploiement. Ils sont plus assistants et utiles mais imposent une ligne de conduite sur la manière dont votre code doit être structuré et construit. *Pour les débutants utiliser un outil en ligne de commande peut-être utile*.

## electron-forge

Un "outil complet pour construire des applications Electron modernes". Electron Forge unifie l'actuel outil de build (déjà bien maintenu) pour le développement sous Electron en un paquet afin que chacun puisse se lancer rapidement dans le développement sous Electron.

Forge est livré avec [un template prêt à l'usage](https://electronforge.io/templates), reposant sur Webpack. Il comprend un exemple de configuration typescript et offre deux fichiers de configuration pour permettre une customisation aisée. Il utilise les mêmes modules principaux que ceux utilisés par la vaste communauté Electron (comme [`electron-packager`](https://github.com/electron/electron-packager)) - les changements effectués par les mainteneurs d'Electron (comme l'équipe de Slack) profitent aux utilisateurs de Forge également.

Vous pouvez trouver plus d'information et de documentation sur [electronforge.io](https://electronforge.io/).

## electron-builder

Une «solution complète pour emballer et construire une application Electron prête à être distribuée» qui se concentre sur une expérience intégrée. électron-builder ajoute une dépendance unique axée sur la simplicité et gère toutes les autres exigences en interne.

electron-builder remplace les fonctionnalités et modules utilisés par les mainteneurs Electron (tels que la mise à jour automatique) par des modules personnalisés. Ils sont généralement plus intégrés, mais auront moins de points communs avec les applications Electron populaires comme Atom, Visual Studio Code ou Slack.

Vous pouvez trouver plus d'information et de documentation [ici](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

If you don't want any tools but only a solid boilerplate to build from, CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) might be worth a look. It's quite popular in the community and uses `electron-builder` internally.

## Autres outils et boilerplates

La liste [ "Awesome Electron" ](https://github.com/sindresorhus/awesome-electron#boilerplates) contient plus d'outils et de passe-partout. Si vous trouvez la longueur de la liste intimidante, n'oubliez pas que l'ajout d'outils au fur et à mesure est également une approche valable.
