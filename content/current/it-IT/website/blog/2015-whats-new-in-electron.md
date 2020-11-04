---
title: Cosa c'è di nuovo in Electron
author: jlord
date: '2015-10-15'
---

Ci sono stati alcuni interessanti aggiornamenti e colloqui forniti su Electron di recente, ecco una carrellata.

---

## Fonte

Electron è ora aggiornato con Chrome 45 a partire da `v0.32.0`. Altri aggiornamenti includono...

### Migliore Documentazione

![nuovi documenti](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

Abbiamo ristrutturato e standardizzato la documentazione per guardare meglio e leggere meglio. Ci sono anche traduzioni della documentazione, come il giapponese e il coreano.

Related pull requests: [electron/electron#2028](https://github.com/electron/electron/pull/2028), [electron/electron#2533](https://github.com/electron/electron/pull/2533), [electron/electron#2557](https://github.com/electron/electron/pull/2557), [electron/electron#2709](https://github.com/electron/electron/pull/2709), [electron/electron#2725](https://github.com/electron/electron/pull/2725), [electron/electron#2698](https://github.com/electron/electron/pull/2698), [electron/electron#2649](https://github.com/electron/electron/pull/2649).

### Node.js 4.1.0

Dal `v0.33.0` Electron viene spedito con Node.js 4.1.0.

Richiesta di pull correlata: [electron/electron#2817](https://github.com/electron/electron/pull/2817).

### node-pre-gyp

I moduli che si basano su `node-pre-gyp` possono ora essere compilati su Electron quando si costruisce da sorgente.

Richiesta di pull correlata: [mapbox/node-pre-gyp#175](https://github.com/mapbox/node-pre-gyp/pull/175).

### Supporto ARM

Electron fornisce ora build per Linux su ARMv7. Funziona su piattaforme popolari come Chromebook e Raspberry Pi 2.

Problemi correlati: [atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138), [electron/electron#2094](https://github.com/electron/electron/pull/2094), [electron/electron#366](https://github.com/electron/electron/issues/366).

### Finestra Senza Frameless Stile Yosemite

![finestra senza cornice](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

Una patch di [@jaanus](https://github.com/jaanus) è stata unita che, come le altre app OS X integrate, permette di creare finestre senza telaio con semafori di sistema integrati su OS X Yosemite e successivamente.

Richiesta di pull correlata: [electron/electron#2776](https://github.com/electron/electron/pull/2776).

### Supporto Google Summer of Code Printing

Dopo la Google Summer of Code abbiamo unito le patch di [@hokein](https://github.com/hokein) per migliorare il supporto alla stampa, e aggiungere la possibilità di stampare la pagina nei file PDF.

Problemi correlati: [electron/electron#2677](https://github.com/electron/electron/pull/2677), [electron/electron#1935](https://github.com/electron/electron/pull/1935), [electron/electron#1532](https://github.com/electron/electron/pull/1532), [electron/electron#805](https://github.com/electron/electron/issues/805), [electron/electron#1669](https://github.com/electron/electron/pull/1669), [electron/electron#1835](https://github.com/electron/electron/pull/1835).

## Atom

Atom è ora aggiornato a Electron `v0.30.6` in esecuzione Chrome 44. Un aggiornamento a `v0.33.0` è in corso su [atom/atom#8779](https://github.com/atom/atom/pull/8779).

## Discussioni

GitHubber [Amy Palamountain](https://github.com/ammeep) ha dato una grande introduzione a Electron in un discorso a [Nordic.js](https://nordicjs2015.confetti.events). Ha anche creato la libreria [electron-accelerator](https://github.com/ammeep/electron-accelerator).

#### Costruire applicazioni native con Electron di Amy Palomountain

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[Ben Ogle](https://github.com/benogle), anche nel team di Atom, ha tenuto un colloquio di Electron a [YAPC Asia](http://yapcasia.org/2015/):

#### Costruire applicazioni desktop con tecnologie Web di Ben Ogle

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

Il membro del team Atom [Kevin Sawicki](https://github.com/kevinsawicki) e altri hanno tenuto colloqui su Electron alla [Bay Are Electron User Group](http://www.meetup.com/Bay-Area-Electron-User-Group/) riuniti di recente. I [video](http://www.wagonhq.com/blog/electron-meetup) sono stati pubblicati, ecco una coppia:

#### La storia di Electron di Kevin Sawicki

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Rendere una app web nativa da Ben Gotow

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

