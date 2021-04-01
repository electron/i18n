---
title: Usuario Electron
author: zeke
date: '20-12-2016'
---

Hemos añadido una nueva sección de [userland](https://electronjs.org/userland) a el sitio web de Electron para ayudar a los usuarios a descubrir a la gente, , y aplicaciones que hacen que nuestro floreciente ecosistema de código abierto.

---

[![github-contributors](https://cloud.githubusercontent.com/assets/2289/21205352/a873f86c-c210-11e6-9a92-1ef37dfc986b.png)](https://electronjs.org/userland)

## Origen de Userland

Userland es donde las personas de las comunidades de software se reúnen para compartir herramientas e ideas. El término se originó en la comunidad Unix. donde se refería a cualquier programa que corriera fuera del kernel, pero hoy significa algo más. Cuando la gente en la comunidad Javascript de hoy se refiere a la tierra del usuario, normalmente están hablando del registro de paquetes [npm](http://npm.im). Aquí es donde se produce la mayoría de la experimentación y la innovación, mientras que Node y el lenguaje JavaScript (como el núcleo Unix) mantienen un conjunto relativamente pequeño y estable de características básicas.

## Nodo y Electron

Como Node, Electron tiene un pequeño conjunto de APIs del núcleo. Estos proporcionan las características básicas necesarias para desarrollar aplicaciones de escritorio multiplataforma. Esta filosofía de diseño permite Electron a seguir siendo una herramienta flexible sin ser excesivamente prescriptivas sobre cómo deben utilizarse.

Userland es la contraparte del "núcleo", permitiendo a los usuarios crear y compartir herramientas que amplíen la funcionalidad de Electron.

## Recopilando datos

Para comprender mejor las tendencias de nuestro ecosistema, analizamos metadatos de 15, 00 repositorios públicos de GitHub que dependen de `electron` o `electron-prebuilt`

Usamos la [API de GitHub](https://developer.github.com/v3/), las bibliotecas [. o API](https://libraries.io/api), y el registro npm para reunir información sobre dependencias, dependencias de desarrollo, dependientes, autores de paquetes, colaboradores de repos, números de descargas, contadores de fork, stargazer cuentos, etc.

Luego usamos estos datos para generar los siguientes informes:

- [Dependencias de desarrollo de aplicaciones](https://electronjs.org/userland/dev_dependencies): Paquetes listados más a menudo como `devDependencias` en aplicaciones Electron.
- [Contribuidores de GitHub](https://electronjs.org/userland/github_contributors): Usuarios de GitHub que han contribuido a numerosos repositorios de GitHub relacionados con Electron.
- [Dependencias del paquete](https://electronjs.org/userland/package_dependencies): Paquetes npm relacionados con Electron que frecuentemente dependen de otros paquetes npm.
- [Aplicaciones destacadas](https://electronjs.org/userland/starred_apps): Aplicaciones electron (que no son paquetes npm) con numerosos estargazers.
- [La mayoría de los paquetes descargados](https://electronjs.org/userland/most_downloaded_packages): paquetes npm relacionados con Electron que se descargan mucho.
- [Dependencias de la aplicación](https://electronjs.org/userland/dependencies): Los paquetes más frecuentemente listados como `dependencias` en aplicaciones de Electron.
- [Autores de paquetes](https://electronjs.org/userland/package_authors): Los autores más prolificados de los paquetes npm relacionados con Electron.

## Filtrando Resultados

Informes como [dependencias de aplicaciones](https://electronjs.org/userland/dependencies) y [aplicaciones destacadas](https://electronjs.org/userland/starred_apps) que listan paquetes, las aplicaciones, y los repos tienen una entrada de texto que puede ser usada para filtrar los resultados.

A medida que escribes en esta entrada, la URL de la página se actualiza dinámicamente. Esto le permite copiar una URL que representa una porción particular de los datos de las tierras de usuario, luego compartirla con otros.

[![bebel](https://cloud.githubusercontent.com/assets/2289/21328807/7bfa75e4-c5ea-11e6-8212-0e7988b367fd.png) ](https://electronjs.org/userland/dev_dependencies?q=babel%20preset)

## Más por venir

Este primer conjunto de informes es sólo el principio. Continuaremos recopilando datos sobre cómo la comunidad está construyendo Electron, y añadiremos nuevos informes al sitio web.

Todas las herramientas utilizadas para recopilar y mostrar estos datos son de código abierto:

- [electron/electronjs.org](https://github.com/electron/electron.atom): El sitio web de Electron.
- [electron/electron-userland-reports](https://github.com/electron/electron-userland-reports): Cortes de datos sobre paquetes, repos, y usuarios en Electron userland.
- [electron/repos-using-electron](https://github.com/electron/repos-using-electron): Todos los repositorios públicos en GitHub que dependen de `electron` o `electron-prebuilt`
- [electron/electron-npm-packages](https://github.com/zeke/electron-npm-packages): Todos los paquetes npm que mencionan `electron` en su archivo `package.json`.

Si tienes ideas sobre cómo mejorar estos informes, por favor háganos saber [abriendo un problema en el repositorio del sitio web](https://github.com/electron/electronjs.org/issues/new) o cualquiera de los repos mencionados anteriormente.

¡Gracias a ti, la comunidad Electron por hacer de userland lo que es hoy!

