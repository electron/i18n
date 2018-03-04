# Boilerplates and CLIs

Electron development is un-opinionated - there is no "one true way" to develop, build, package, or release an Electron application. Additional features for Electron, both for build- and run-time, can usually be found on [npm](https://www.npmjs.com/search?q=electron) in individual packages, allowing developers to build both the app and build pipeline they need.

Ese nivel de modularidad y posibilidad asegura que todos los desarrolladores que trabajan con Electron, ambos equipos grandes y pequeños, nunca ese restringidos en que pueden o no hacer en cualquier momento durante su ciclo de vida de desarrollo. Sin embargo, para muchos desarrolladores, uno de los boilerplates comunitarios o herramientas de línea de comandos podría facilitar dramáticamente el compilar, empacar y liberar una aplicación.

## Boilerplate vs CLI

Un boilerplate es simplemente un punto de inicio - un lienzo, por así decir - desde donde construya su aplicación. Generalmente vienen en la forma de repositorio, puede clonar y personalizar a su gusto.

Por otro lado una herramienta de línea de comandos sigue para apoyarte a lo largo del desarrollo y liberación. Son mas útiles y serviciales pero encarga lineas directrices en como su código debe ser estructurado y construido. *Especially for beginners, using a command line tool is likely to be helpful*.

## electron-forge

A "complete tool for building modern Electron applications". Electron Forge unifies the existing (and well maintained) build tools for Electron development into a simple, easy to use package so that anyone can jump right in to Electron development.

Forge comes with [ready-to-use templates](https://electronforge.io/templates) for popular frameworks like React, Vue, or Angular. It uses the same core modules used by the greater Electron community (like [`electron-packager`](https://github.com/electron-userland/electron-packager)) –  changes made by Electron maintainers (like Slack) benefit Forge's users, too.

You can find more information and documentation on [electronforge.io](https://electronforge.io/).

## Electron-builder

A "complete solution to package and build a ready-for-distribution Electron app" that focuses on an integrated experience. [`electron-builder`](https://github.com/electron-userland/electron-builder) adds one single dependency focused on simplicity and manages all further requirements internally.

`electron-builder` replaces features and modules used by the Electron maintainers (such as the auto-updater) with custom ones. They are generally tighter integrated but will have less in common with popular Electron apps like Atom, Visual Studio Code, or Slack.

You can find more information and documentation in [the repository](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

If you don't want any tools but simply a solid boilerplate to build from, CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) might be worth a look. It's quite popular in the community and uses `electron-builder` internally.

## Other Tools and Boilerplates

The ["Awesome Electron" list](https://github.com/sindresorhus/awesome-electron#boilerplates) contains more tools and boilerplates to choose from. If you find the length of the list intimidating, don't forget that adding tools as you go along is a valid approach, too.