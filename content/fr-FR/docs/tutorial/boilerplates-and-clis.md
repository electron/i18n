# Les standards et CLI (Command-line interface)

Le développement avec Electron est sans parti pris - il n'y a pas "un unique chemin" pour développer, construire, packager, ou sortir une application Electron. Des fonctionnalités supplémentaires pour Electron, à la fois pour la construction et l'exécution, peuvent généralement être trouvées sur [npm](https://www.npmjs.com/search?q=electron) dans des paquets individuels, permettant aux développeurs de construire l'application et de construire le pipeline dont ils ont besoin.

Ce niveau de modularité et d'extensibilité garantit que tous les développeurs travaillant avec Electron, que ce soit dans de grandes ou de petites équipes, ne sont jamais limités dans ce qu'ils peuvent ou ne peuvent pas faire pendant leur cycle de vie de développement. Cependant, pour de nombreux développeurs, l'un des boilerplates communautaires ou un outil en ligne de commande peut rendre la compilation, le paquetage et la publication d'une application extrêmement faciles.

## Boilerplate vs CLI

Une "Boilerplayer" n'est qu'un point de départ - une toile, pour ainsi dire - à partir de laquelle vous construisez votre application. They usually come in the form of a repository you can clone and customize to your heart's content.

A command line tool on the other hand continues to support you throughout the development and release. They are more helpful and supportive but enforce guidelines on how your code should be structured and built. *Especially for beginners, using a command line tool is likely to be helpful*.

## electron-forge

A "complete tool for building modern Electron applications". Electron Forge unifies the existing (and well maintained) build tools for Electron development into a cohesive package so that anyone can jump right in to Electron development.

Forge comes with [a ready-to-use template](https://electronforge.io/templates) using Webpack as a bundler. It includes an example typescript configuration and provides two configuration files to enable easy customization. It uses the same core modules used by the greater Electron community (like [`electron-packager`](https://github.com/electron/electron-packager)) –  changes made by Electron maintainers (like Slack) benefit Forge's users, too.

Vous pouvez trouver plus d'information et de documentation sur [electronforge.io](https://electronforge.io/).

## electron-builder

A "complete solution to package and build a ready-for-distribution Electron app" that focuses on an integrated experience. [`electron-builder`](https://github.com/electron-userland/electron-builder) adds one single dependency focused on simplicity and manages all further requirements internally.

`electron-builder` replaces features and modules used by the Electron maintainers (such as the auto-updater) with custom ones. They are generally tighter integrated but will have less in common with popular Electron apps like Atom, Visual Studio Code, or Slack.

Vous pouvez trouver plus d'information et de documentation [ici](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

If you don't want any tools but only a solid boilerplate to build from, CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) might be worth a look. It's quite popular in the community and uses `electron-builder` internally.

## Autres outils et boilerplates

La liste [ "Awesome Electron" ](https://github.com/sindresorhus/awesome-electron#boilerplates) contient plus d'outils et de passe-partout. Si vous trouvez la longueur de la liste intimidante, n'oubliez pas que l'ajout d'outils au fur et à mesure est également une approche valable.