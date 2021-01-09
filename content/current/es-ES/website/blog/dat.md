---
title: 'Proyecto de la Semana: Fat'
author:
  - karissa
  - yoshuawuyts
  - maxogden
  - zeke
date: '2017-02-21'
---

El proyecto destacado de esta semana es [Dat](https://datproject.org/), un [financiado por donaciones](https://changelog.com/rfc/6), de código abierto y descentralizado para distribuir conjuntos de datos. Dat está construido y mantenido por un [equipo geodistribuido](https://datproject.org/team), muchos de los cuales ayudaron a escribir este mensaje.

---

[![Una captura de pantalla de la vista principal del escritorio de datos, mostrando unas pocas filas de fechas
compartidas](https://cloud.githubusercontent.com/assets/2289/23175925/dbaee7ec-f815-11e6-80cc-3041203c7842.png)](https://github.com/datproject/dat-desktop)

## ¿Primero qué es Dato?

Queríamos llevar las mejores partes de los sistemas pares y distribuidos a los sistemas de intercambio de datos. Comenzamos con el intercambio de datos científicos y luego comenzamos a sumergirnos en las instituciones de investigación, el gobierno, el servicio público y los equipos de código abierto.

Otra manera de pensar en ello es sincronizar y subir aplicaciones como Dropbox o BitTorrent Sync, excepto Dat es [de código abierto](https://github.com/datproject). Nuestro objetivo es ser un potente software de código abierto, sin ánimo de lucro para compartir datos grandes, pequeños, medianos, pequeños y grandes.

Para usar la herramienta CLI `dat` , todo lo que tienes que escribir es:

```sh
dat compartir ruta/a/mi/carpeta
```

Y dat creará un enlace que puede usar para enviar esa carpeta a otra persona -- ningún servidor central o terceros tiene acceso a sus datos. A diferencia de BitTorrent, también es imposible cortar quién está compartiendo qué ([ver el borrador de Dat Paper para más detalles](https://github.com/datproject/docs/blob/master/papers/dat-paper.md)).

## Ahora sabemos lo que es Dat. ¿Cómo encaja Dat Desktop?

[Dat Desktop](https://github.com/datproject/dat-desktop) es una forma de hacer que Dat sea accesible para personas que no puedan o no quieran usar la línea de comandos. Puede alojar múltiples fechas en su máquina y servir los datos a través de su red.

## ¿Puedes compartir algunos casos de uso genial?

### DataRefuge + Proyecto Svalbard

Estamos trabajando en un código llamado [Proyecto Svalbard](https://github.com/datproject/svalbard) que está relacionado con [DataRefuge](http://www.ppehlab.org/datarefuge), un grupo que trabaja para respaldar los datos climáticos gubernamentales en riesgo de desaparecer. Svalbard lleva el nombre de la cámara de semillas globales de Svalbard en el Ártico, que cuenta con una gran biblioteca de respaldo subterráneo de ADN vegetal. Nuestra versión es una gran versión controlada de conjuntos de datos científicos públicos. Una vez que conocemos y podemos confiar en los metadatos, podemos construir otros proyectos geniales, como una [red de almacenamiento de datos distribuida voluntaria](https://github.com/datproject/datasilo/).

### Coalición de datos cívicos de California

[CACivicData](http://www.californiacivicdata.org/) es un archivo de código abierto que ofrece descargas diarias desde CAL-ACCESS, la base de datos de California rastreando dinero en política. Hacen [lanzamientos diarios](http://calaccess.californiacivicdata.org/downloads/0), lo que significa alojar un montón de datos duplicados a través de sus archivos zip. Estamos trabajando en alojar sus datos como un repositorio de Dat que reducirá la cantidad de problemas y ancho de banda necesarios para referirse a una versión específica o actualizar a una versión más reciente.

## Actualizaciones de Electron

Este aún no es concreto, pero creemos que un caso de uso divertido sería poner una aplicación compilada de Electron en un repositorio Dat, luego usar un cliente de Dat en Electron para extraer las últimas deltas de la aplicación compilada binary, para ahorrar tiempo de descarga, pero también para reducir los costes de ancho de banda para el servidor.

## ¿Quién debería estar usando Dat Desktop?

Cualquiera que quiera compartir y actualizar datos a través de una red p2p. Científicos de datos, hackers de datos abiertos, investigadores, desarrolladores. Somos super receptivos a la retroalimentación si alguien tiene un buen caso de uso en el que todavía no hemos pensado. ¡Puedes soltar en nuestro [Chat Gitter](https://gitter.im/datproject/discussions) y pregúntanos cualquier cosa!

## ¿Qué va a venir en Dat y Dat Desktop?

Cuentas de usuario y publicación de metadatos. Estamos trabajando en una aplicación web de registro de Dat para ser desplegada en [proyecto de datos. rg](https://datproject.org/) que será básicamente un 'NPM para conjuntos de datos', excepto la advertencia de ser que vamos a ser un directorio de metadatos y los datos pueden vivir en cualquier lugar en línea (a diferencia de NPM o GitHub, donde todos los datos están centralmente alojados, porque el código fuente es lo suficientemente pequeño, puede caber todo en un solo sistema). Dado que muchos conjuntos de datos son elevados, necesitamos un registro federado (similar a cómo funcionan los rastreadores BitTorrent). Queremos facilitar a la gente encontrar o publicar conjuntos de datos con el registro de Dat Desktop, para que el proceso de intercambio de datos no sea friccional.

Otra característica son las carpetas multiescritores/colaborativas. Tenemos grandes planes para hacer flujos de trabajo colaborativos, tal vez con sucursales, similares a git, excepto diseñados en torno a la colaboración con los conjuntos de datos. Pero todavía estamos trabajando en la estabilidad general y estandarizar nuestros protocolos ahora mismo!

## ¿Por qué eligió construir Dat Desktop en Electron?

Dat se construye utilizando Node.js, por lo que fue un ajuste natural para nuestra integración. Más allá de esto, nuestros usuarios utilizan una variedad de máquinas como científicos, investigadores y funcionarios del gobierno pueden verse obligados a usar ciertas configuraciones para sus instituciones -- esto significa que necesitamos ser capaces de apuntar a Windows y Linux, así como a Mac. Dat Desktop nos lo da muy fácilmente.

## ¿Cuáles son algunos de los desafíos a los que se enfrenta mientras construye Dat y Dat Desktop?

Desenmascarar lo que la gente quiere. Empezamos con conjuntos de datos tabulares, pero nos dimos cuenta de que era un poco complicado resolver y que la mayoría de la gente no usa bases de datos. Así que a mitad de camino del proyecto, rediseñamos todo desde cero para usar un sistema de archivos y no hemos mirado hacia atrás.

También nos encontramos con algunos problemas generales de infraestructura Electron incluyendo:

- Telemetría - cómo capturar estadísticas de uso anónimas
- Actualizaciones - Es una especie de piecemeal y magia configurar actualizaciones automáticas
- Lanzamientos - la firma de XCode, lanzamientos de construcción en Travis, haciendo versiones beta, todas eran desafíos.

También usamos Browserify y algunas Transformaciones Browserify en el código 'front-end' de Dat Desktop (que es algo extraño porque todavía nos englobamos aunque tenemos nativo `requiera` -- pero es porque queremos las Transformas). Para ayudar a gestionar mejor nuestro CSS cambiamos de Sass a usar [sheetify](https://github.com/stackcss/sheetify). Nos ha ayudado mucho a modularizar nuestro CSS y nos ha hecho más fácil mover nuestra interfaz de usuario a una arquitectura orientada a componentes con dependencias compartidas. Por ejemplo, [colores de datos](https://github.com/Kriesse/dat-colors) contiene todos nuestros colores y se comparte entre todos nuestros proyectos.

Siempre hemos sido un gran fan de los estándares y las abstracciones mínimas. Toda nuestra interfaz se construye utilizando nodos DOM regulares con unas cuantas bibliotecas auxiliares. Hemos empezado a mover algunos de estos componentes a [elementos base-](https://base.choo.io), una biblioteca de componentes reutilizables de bajo nivel. Como en la mayoría de nuestra tecnología seguimos iterando sobre ella hasta que la hacemos bien pero como equipo tenemos la sensación de que vamos en la dirección correcta.

## ¿En qué áreas debe mejorarse Electron?

Creemos que el punto de dolor más grande son los módulos nativos. Tener que reconstruir sus módulos para Electron con npm añade complejidad al flujo de trabajo. Nuestro equipo desarrolló un módulo llamado [`prebuild`](http://npmjs.org/prebuild) que maneja binarios preconstruidos, que funcionó bien para Node, pero los flujos de trabajo de Electron todavía requerían un paso personalizado después de la instalación, normalmente `npm run rebuild`. Fue molesto. Para abordar esto hemos cambiado recientemente a una estrategia donde empaquetamos todas las versiones binarias compiladas de todas las plataformas dentro del tarball de npm. Esto significa que los tarballs se hacen más grandes (aunque esto puede optimizarse con `. o` archivos - librerías compartidas), este enfoque evita tener que ejecutar scripts post-install y también evita el patrón `npm run rebuild` completamente. Significa `npm install` hace lo correcto para Electron la primera vez.

## ¿Cuáles son tus cosas favoritas de Electron?

Las APIs parecen bastante bien pensadas, es relativamente estable, y hace un buen trabajo en mantenerse al día con las versiones originales de Node, ¡no mucho más que podemos pedir!

## ¿Algún consejo de Electron que pueda ser útil para otros desarrolladores?

¡Si usas módulos nativos, dale a [prebuild](https://www.npmjs.com/package/prebuild) un disparo!

## ¿Cuál es la mejor manera de seguir los desarrollos de Dat?

Sigue [@dat_project](https://twitter.com/dat_project) en Twitter, o suscríbete a nuestro [boletín de correo electrónico](https://tinyletter.com/datdata).

