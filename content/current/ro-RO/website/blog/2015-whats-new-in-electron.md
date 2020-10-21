---
title: Ce este nou în Electron
author: Jlord
date: '2015-10-15'
---

Au existat câteva actualizări interesante şi discuţii despre Electron recent, iată un roundup.

---

## Sursa

Electron este acum la curent cu Chrome 45 începând cu `v0.32.0`. Alte actualizări include...

### Documentație mai bună

![documente noi](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

Am restructurat şi standardizat documentaţia pentru a arăta mai bine şi a citi mai bine. Există, de asemenea, traduceri ale documentaţiei în serviciul comunităţii, precum japonezii şi coreeni.

Cereri de tragere conexe: [electron/electron#2028](https://github.com/electron/electron/pull/2028), [electron/electron#2533](https://github.com/electron/electron/pull/2533), [electron/electron#2557](https://github.com/electron/electron/pull/2557), [electron/electron#2709](https://github.com/electron/electron/pull/2709), [electron/electron#2725](https://github.com/electron/electron/pull/2725), [electron/electron#2698](https://github.com/electron/electron/pull/2698), [electron/electron#2649](https://github.com/electron/electron/pull/2649).

### Node.js 4.1.0

De la `v0.33.0` Vasele Electron cu Node.js 4.1.0.

Cerere de tragere conexă: [electron/electron#2817](https://github.com/electron/electron/pull/2817).

### napi pre-gip

Modulele care se bazează pe `node-pre-gyp` pot fi compilate acum cu Electron atunci când se construiește de la sursă.

Cerere de pull conexă: [mapbox/node-pre-gyp#175](https://github.com/mapbox/node-pre-gyp/pull/175).

### Suport ARM

Electron acum oferă construcții pentru Linux pe ARMv7. Funcționează pe platforme populare precum Chromebook și Raspberry Pi 2.

Probleme conexe: [atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138), [electron/electron#2094](https://github.com/electron/electron/pull/2094), [electron/electron#366](https://github.com/electron/electron/issues/366).

### Fereastră tip Yosemite-stil Frameless

![fereastră fără cadru](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

Un plasture de [@jaanus](https://github.com/jaanus) a fost fuzionat că, la fel ca celelalte aplicații integrate pentru OS X, permite crearea de ferestre fără cadru cu semafoare de sistem integrate pe OS X Yosemite și mai târziu.

Cerere de tragere conexă: [electron/electron#2776](https://github.com/electron/electron/pull/2776).

### Google Summer of Code Printing Support

După Google Summer of Code avem patch-uri îmbinate cu [@hokein](https://github.com/hokein) pentru a îmbunătăți suportul pentru imprimare, si adauga abilitatea de a imprima pagina in fisiere PDF.

Probleme conexe: [electron/electron#2677](https://github.com/electron/electron/pull/2677), [electron/electron#1935](https://github.com/electron/electron/pull/1935), [electron/electron#1532](https://github.com/electron/electron/pull/1532), [electron/electron#805](https://github.com/electron/electron/issues/805), [electron/electron#1669](https://github.com/electron/electron/pull/1669), [electron/electron#1835](https://github.com/electron/electron/pull/1835).

## Atom

Atom a devenit actualizat la Electron `v0.30.6` rulând Chrome 44. O actualizare la `v0.33.0` este în progres pe [atom/atom#8779](https://github.com/atom/atom/pull/8779).

## Discuții

GitHubber [Amy Palamountain](https://github.com/ammeep) a oferit o introducere grozavă Electron într-un discurs la [Nordic.js](https://nordicjs2015.confetti.events). Ea a creat, de asemenea, biblioteca [electron-accelerator](https://github.com/ammeep/electron-accelerator).

#### Construirea de aplicaţii native cu Electron de Amy Palomountain

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[Ben Ogle](https://github.com/benogle), de asemenea în echipa Atom , a ținut un discurs Electron la [YAPC Asia](http://yapcasia.org/2015/):

#### Construirea de aplicații desktop cu Web Tehnologii de Ben Ogle

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

Membrul echipei Atom [Kevin Sawicki](https://github.com/kevinsawicki) şi alţii au purtat discuţii despre Electron la întâlnirea de curând [Bay Are Electron User Group](http://www.meetup.com/Bay-Area-Electron-User-Group/). [Videoclipurile](http://www.wagonhq.com/blog/electron-meetup) au fost postate, aici sunt un cuplu:

#### Istoria Electron de Kevin Sawicki

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Făcând o aplicaţie web să se simtă nativă de Ben Gotow

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

