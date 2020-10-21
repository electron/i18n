---
title: Qué hay de nuevo en Electron
author: señor
date: '2015-10-15'
---

Ha habido algunas actualizaciones interesantes y charlas sobre Electron recientemente, aquí hay un resumen de la discusión.

---

## Fuente

Electron ahora está actualizado con Chrome 45 a partir de `v0.32.0`. Otras actualizaciones incluyen...

### Mejor documentación

![nuevos documentos](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

Hemos reestructurado y estandarizado la documentación para que luzca mejor y lea mejor. También hay traducciones aportadas por la comunidad de la documentación, como el japonés y el corán.

Solicitudes relacionadas: [electron/electron#2028](https://github.com/electron/electron/pull/2028), [electron/electron#2533](https://github.com/electron/electron/pull/2533), [electron/electron#2557](https://github.com/electron/electron/pull/2557), [electron/electron#2709](https://github.com/electron/electron/pull/2709), [electron/electron#2725](https://github.com/electron/electron/pull/2725), [electron/electron#2698](https://github.com/electron/electron/pull/2698), [electron/electron#2649](https://github.com/electron/electron/pull/2649).

### Node.js 4.1.0

Desde `v0.33.0` Electron viene con Node.js 4.1.0.

Pull request: [electron/electron#2817](https://github.com/electron/electron/pull/2817).

### nodo-pre-gyp

Los módulos que dependen de `node-pre-gyp` ahora pueden ser compilados contra Electron cuando se construye desde la fuente.

Solicitud de pull relacionada: [mapbox/node-pre-gyp#175](https://github.com/mapbox/node-pre-gyp/pull/175).

### Soporte ARM

Electron ahora proporciona compilaciones para Linux en ARMv7. Funciona en plataformas populares como Chromebook y Raspberry Pi 2.

Problemas relacionados: [atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138), [electron/electron#2094](https://github.com/electron/electron/pull/2094), [electron/electron#366](https://github.com/electron/electron/issues/366).

### Ventana sin marco al estilo yosemita

![ventana sin marco](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

Un parche de [@jaanus](https://github.com/jaanus) se ha fusionado eso, como las otras aplicaciones de OS X, permite crear ventanas sin marco con semáforos del sistema integrados en OS X Yosemite y posteriores.

Solicitud de extracción relacionada: [electron/electron#2776](https://github.com/electron/electron/pull/2776).

### Soporte para impresión de código de Google Summer of Code

Después del verano de Google hemos combinado parches por [@hokein](https://github.com/hokein) para mejorar el soporte de impresión, y añadir la capacidad de imprimir la página en archivos PDF.

Problemas relacionados: [electron/electron#2677](https://github.com/electron/electron/pull/2677), [electron/electron#1935](https://github.com/electron/electron/pull/1935), [electron/electron#1532](https://github.com/electron/electron/pull/1532), [electron/electron#805](https://github.com/electron/electron/issues/805), [electron/electron#1669](https://github.com/electron/electron/pull/1669), [electron/electron#1835](https://github.com/electron/electron/pull/1835).

## Atom

Atom se ha actualizado a Electron `v0.30.6` ejecutando Chrome 44. Una actualización a `v0.33.0` está en curso en [atom/atom#8779](https://github.com/atom/atom/pull/8779).

## Palabras

GitHubber [Amy Palamountain](https://github.com/ammeep) dio una gran introducción a Electron en una charla en [Nordic.js](https://nordicjs2015.confetti.events). También creó la librería [electron-accelerator](https://github.com/ammeep/electron-accelerator).

#### Construyendo aplicaciones nativas con Electron por Amy Palomountain

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[Ben Ogle](https://github.com/benogle), también en el equipo de Atom, dio una charla de Electron en [YAPC Asia](http://yapcasia.org/2015/):

#### Crear aplicaciones de escritorio con tecnologías web de Ben Ogle

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

Miembro del equipo Atom [Kevin Sawicki](https://github.com/kevinsawicki) y otros dieron charlas en Electron en la reunión [Bay Are Electron User Group](http://www.meetup.com/Bay-Area-Electron-User-Group/) recientemente. Los [vídeos](http://www.wagonhq.com/blog/electron-meetup) han sido publicados, aquí hay un parámetro:

#### La historia de Electron por Kevin Sawicki

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Hacer que una aplicación web se sienta nativa por Ben Gotow

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

