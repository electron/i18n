---
title: Quoi de neuf dans Electron
author: jlord
date: '2015-10-15'
---

Il y a eu des mises à jour et des discussions intéressantes récemment sur Electron, voici un tour de main.

---

## Source

Electron est maintenant à jour avec Chrome 45 à partir de `v0.32.0`. Autres mises à jour inclus...

### Meilleure documentation

![nouvelles docs](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

Nous avons restructuré et standardisé la documentation pour mieux regarder et mieux lire. Il y a aussi des traductions de la documentation, comme le japonais et le coréen.

Demandes de tirage associées : [electron/electron#2028](https://github.com/electron/electron/pull/2028), [electron/electron#2533](https://github.com/electron/electron/pull/2533), [electron/electron#2557](https://github.com/electron/electron/pull/2557), [electron/electron#2709](https://github.com/electron/electron/pull/2709), [electron/electron#2725](https://github.com/electron/electron/pull/2725), [electron/electron#2698](https://github.com/electron/electron/pull/2698), [electron/electron#2649](https://github.com/electron/electron/pull/2649).

### Node.js 4.1.0

Depuis `v0.33.0` Electron est livré avec Node.js 4.1.0.

Pull request connexe : [electron/electron#2817](https://github.com/electron/electron/pull/2817).

### node-pre-gyp

Les modules s'appuyant sur `node-pre-gyp` peuvent maintenant être compilés avec Electron lors de la compilation à partir de la source.

Pull request: [mapbox/node-pre-gyp#175](https://github.com/mapbox/node-pre-gyp/pull/175).

### Support ARM

Electron fournit maintenant des versions pour Linux sur ARMv7. Il fonctionne sur des plates-formes populaires comme Chromebook et Raspberry Pi 2.

Problèmes connexes : [atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138), [electron/electron#2094](https://github.com/electron/electron/pull/2094), [electron/electron#366](https://github.com/electron/electron/issues/366).

### Fenêtre sans cadre de style Yosémite

![fenêtre sans cadre](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

Un correctif de [@jaanus](https://github.com/jaanus) a été fusionné qui, comme les autres applications OS X intégrées, permet de créer des fenêtres sans cadre avec des feux de circulation intégrés sur le système OS X Yosemite et plus tard.

Pull request connexe : [electron/electron#2776](https://github.com/electron/electron/pull/2776).

### Support Google Summer of Code Printing

Après le Google Summer of Code nous avons fusionné des patchs par [@hokein](https://github.com/hokein) pour améliorer le support de l'impression, et ajoutez la possibilité d'imprimer la page dans des fichiers PDF.

Problèmes connexes : [electron/electron#2677](https://github.com/electron/electron/pull/2677), [electron/electron#1935](https://github.com/electron/electron/pull/1935), [electron/electron#1532](https://github.com/electron/electron/pull/1532), [electron/electron#805](https://github.com/electron/electron/issues/805), [electron/electron#1669](https://github.com/electron/electron/pull/1669), [electron/electron#1835](https://github.com/electron/electron/pull/1835).

## Atom

Atom a maintenant mis à niveau vers Electron `v0.30.6` fonctionnant avec Chrome 44. Une mise à jour vers `v0.33.0` est en cours sur [atom/atom#8779](https://github.com/atom/atom/pull/8779).

## Discussions

GitHubber [Amy Palamountain](https://github.com/ammeep) a donné une excellente introduction à Electron dans une conférence à [Nordic.js](https://nordicjs2015.confetti.events). Elle a également créé la bibliothèque [electron-accelerator](https://github.com/ammeep/electron-accelerator).

#### Construire des applications natives avec Electron par Amy Palomountain
<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[Ben Ogle](https://github.com/benogle), également sur l'équipe Atom, a donné une conférence Electron à [YAPC Asia](http://yapcasia.org/2015/):

#### Construction d'applications de bureau avec des technologies Web par Ben Ogle
<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

Le membre de l'équipe Atom [Kevin Sawicki](https://github.com/kevinsawicki) et d'autres ont donné des conférences sur Electron lors de la rencontre du [Bay Are Electron User Group](http://www.meetup.com/Bay-Area-Electron-User-Group/) récemment. Les [vidéos](http://www.wagonhq.com/blog/electron-meetup) ont été publiées, voici un couple:

#### L'histoire d'Electron de Kevin Sawicki
<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Faire sentir natif à une application web par Ben Gotow
<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

