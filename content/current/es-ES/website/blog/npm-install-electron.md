---
title: npm install electron
author: zeke
date: '16-08-2016'
---

A partir de la versión 1.3.1 de Electron puede `instalar electron --save-dev` para instalar la última versión precompilada de Electron en su aplicación.

---

![npm install electron](https://cloud.githubusercontent.com/assets/378023/17259327/3e3196be-55cb-11e6-8156-525e9c45e66e.png)

## El binario precompilado de Electron

If you've ever worked on an Electron app before, you've likely come across the `electron-prebuilt` npm package. Este paquete es una parte indispensable de casi cada proyecto Electron. Cuando está instalado, detecta su sistema operativo y descarga un binario precompilado para trabajar en la arquitectura de su sistema.

## El nuevo nombre

El proceso de instalación de Electron fue a menudo un obstáculo para los nuevos desarrolladores. Muchas personas valientes intentaron empezar a desarrollar Electron por aplicación ejecutando `npm install electron` en lugar de `npm install electron-prebuilt`, sólo para descubrir (a menudo después de mucha confusión) que no era el `electrón` que estaban buscando.

Esto se debe a que existía un proyecto `electrón` en npm, creado antes de que existiera el proyecto Electron de GitHub. Para ayudar a que el desarrollo de Electron sea más fácil e intuitivo para nuevos desarrolladores, nos pusimos en contacto con el propietario del paquete `electron` npm existente para preguntarle si estaría dispuesto a dejarnos usar el nombre. Afortunadamente él era un fan de nuestro proyecto, y aceptó ayudarnos a rediseñar el nombre

## Vida preconstruida en

A partir de la versión 1.3.1, hemos comenzado a publicar [`electron`](https://www.npmjs.com/package/electron) y `electron-prebuild` paquetes a npm en tandem. Los dos paquetes son idénticos. Elegimos seguir publicando el paquete con ambos nombres por un tiempo para no molestar a los miles de desarrolladores que actualmente utilizan `electron-prebuilt` en sus proyectos. Le recomendamos que actualice el paquete `. son` archivos para usar la nueva dependencia `electrón` , pero continuaremos lanzando nuevas versiones de `electron-prebuilt` hasta el fin de 2016.

El repositorio [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt) seguirá siendo el hogar canónico del paquete npm `electrón`.

## Muchas gracias

Le debemos un agradecimiento especial a [@mafintosh](https://github.com/mafintosh), [@maxogden](https://github.com/maxogden), y muchos otros [colaboradores](https://github.com/electron-userland/electron-prebuilt/graphs/contributors) para crear y mantener `electron-prebuilt`, y por su incansable servicio al JavaScript, Nodo. , y comunidades de Electron .

Y gracias a [@logicalparadox](https://github.com/logicalparadox) por permitirnos asumir el paquete `electron` en npm.

## Actualizando tus proyectos

Hemos trabajado con la comunidad para actualizar los paquetes populares que están afectados por este cambio. Paquetes como [electron-packager](https://github.com/electron-userland/electron-packager), [electron-rebuild](https://github.com/electron/electron-rebuild), y [electron-builder](https://github.com/electron-userland/electron-builder) ya han sido actualizados para trabajar con el nuevo nombre mientras continúa soportando el antiguo nombre.

Si encuentras algún problema al instalar este nuevo paquete, por favor, háganos saber abriendo un problema en el repositorio [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt/issues) .

Para cualquier otro problema con Electron, por favor utilice el repositorio [electron/electron](https://github.com/electron/electron/issues) .

