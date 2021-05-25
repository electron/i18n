# Plantillas y CLIs

El desarrollo con Electron es libre de opiniones, y no hay una "única manera" de desarrollar, construir, empaquetar y desplegar una aplicación Electron. Características adicionales, tanto para la fase de build como para la ejecución, pueden encontrarse con frecuencia en [npm](https://www.npmjs.com/search?q=electron) en paquetes individuales, permitiendo a los desarrolladores construir tanto las aplicaciones como los pipelines que necesiten.

Ese nivel de modularidad y extensibilidad asegura que todos los desarrolladores que trabajan con Electron, ambos equipos grandes y pequeños, nunca estén restringidos en que pueden o no puedan hacer en cualquier momento durante sus ciclos de vida del desarrollo. Sin embargo, para muchos desarrolladores, uno de los boilerplates comunitarios o herramientas de línea de comandos podría facilitar dramáticamente el compilar, empacar y liberar una aplicación.

## Plantillas vs CLI

Un boilerplate es sólo un punto de partida -un lienzo en blanco, por así decirlo- a partir del cual construir su aplicación. Generalmente vienen en la forma de un repositorio, que se puede clonar y personalizar a gusto.

Por otro, lado una herramienta de línea de comandos sigue para apoyarle a lo largo del desarrollo y la liberación. Son mas útiles y serviciales pero encarga lineas directrices en cómo su código debe ser estructurado y construido. *Especialmente para principiantes, el uso de una herramienta de linea de comando es probable que sea útil*.

## electron-forge

Una "herramienta completa para las construcción de aplicaciones Electron modernas". Electron Forge unifica las herramientas de construcción existentes (y bien mantenidas) para el desarrollo de Electron en un paquete cohesivo de manera que cualquiera pueda saltar directamente al desarrollo en Electron.

Forge viene con [a ready-to-use template](https://electronforge.io/templates) usando Webpack como empaquetador. Incluye una configuración de tipo typescript y proporciona dos archivos de configuración para permitir una personalización fácil. Utiliza los mismos módulos de núcleo usados por la gran comunidad Electron (como [`electron-packager`](https://github.com/electron/electron-packager)) -los cambios hechos por los mantenedores a cargo de Electron (como Slack), benefician también a los usuarios de Forge.

Puede encontrar información y documentación en [electronforge.io](https://electronforge.io/).

## electron-builder

Una " solución completa para empaquetar y construir una aplicación Electron lista para su distribución" que se centra en una experiencia integrada. [`electron-builder`](https://github.com/electron-userland/electron-builder) añade una única dependencia enfocada en la simplicidad y gestiona todos los requisitos internamente.

`electron-builder` reemplaza las características y módulos usados por los mantenedores a cargo de Electron (tales como el auto-actualizador) con los personalizados. Generalmente son bien integrados pero tendrán menos en común con las aplicaciones Electron populares como Atom, Visual Studio Code, o Slack.

Puede encontrar mas información y documentación en [el repositorio](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

Si no quiere herramientas, sólo un boilerplate sólido desde el que construir, puede que merezca la pena darle un vistazo a CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate). Es muy popular en la comunidad y utiliza `electron-builder` internamente.

## Otras Herramientas y Boilerplates

La [lista "Electron impresionante"](https://github.com/sindresorhus/awesome-electron#boilerplates) contiene más herramientas y boilerplates para escoger. Si encuentra la extensión de la lista algo intimidante, no olvide que añadir herramientas mientras avanza, también es un enfoque valido.
