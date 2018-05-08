# Boilerplates and CLIs

Electron development is un-opinionated - there is no "one true way" to develop, build, package, or release an Electron application. Additional features for Electron, both for build- and run-time, can usually be found on [npm](https://www.npmjs.com/search?q=electron) in individual packages, allowing developers to build both the app and build pipeline they need.

Ese nivel de modularidad y extensibilidad asegura que todos los desarrolladores que trabajan con Electron, ambos equipos grandes y pequeños, nunca estén restringidos en que pueden o no puedan hacer en cualquier momento durante sus ciclos de vida del desarrollo. Sin embargo, para muchos desarrolladores, uno de los boilerplates comunitarios o herramientas de línea de comandos podría facilitar dramáticamente el compilar, empacar y liberar una aplicación.

## Boilerplate vs CLI

A boilerplate is only a starting point - a canvas, so to speak - from which you build your application. Generalmente vienen en la forma de repositorio, puede clonar y personalizar a su gusto.

Por otro lado una herramienta de línea de comandos sigue para apoyarte a lo largo del desarrollo y liberación. Son mas útiles y serviciales pero encarga lineas directrices en como su código debe ser estructurado y construido. *Especialmente para principiantes, usando una herramienta de linea de comando es probable que sea útil*.

## electron-forge

Una "herramienta completa para las construcción de aplicaciones Electron modernas". Electron Forge unifies the existing (and well maintained) build tools for Electron development into a cohesive package so that anyone can jump right in to Electron development.

La Fragua viene con [Plantillas listas para usar](https://electronforge.io/templates) para infraestructuras populares como React, Vue o Angular. Utiliza los mismos módulos de nucleo usados por la gran comunidad Electron (como [`electron-packager`](https://github.com/electron-userland/electron-packager)) - los cambios hechos por los mantenedores a cargo de Electron (como Slack), benefician también a los usuarios de Fragua.

Puede encontrar información y documentación en [electronforge.io](https://electronforge.io/).

## Electron-builder

Una " solución completa para empaquetar y construir una aplicación Electron lista para su distribución" que se centra en una experiencia integrada. [`electron-builder`](https://github.com/electron-userland/electron-builder) añade una única dependencia enfocada en la simplicidad y gestiona todos los requisitos internamente.

`electron-builder` reemplaza las características y módulos usados por los mantenedores a cargo de Electron (tales como el auto-actualizador) con los personalizados. Generalmente son bien integrados pero tendrán menos en común con las aplicaciones Electron populares como Atom, Visual Studio Code, o Slack.

Puede encontrar mas información y documentación en [el repositorio](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

If you don't want any tools but only a solid boilerplate to build from, CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) might be worth a look. Es muy popular en la comunidad y utiliza `electron-builder` internamente.

## Otras Herramientas y Boilerplates

La [lista "Electron impresionante"](https://github.com/sindresorhus/awesome-electron#boilerplates) contiene más herramientas y boilerplates para escoger. Si encuentra la extensión de la lista algo intimidante, no olvide que añadir herramientas mientras avanza, también es un enfoque valido.