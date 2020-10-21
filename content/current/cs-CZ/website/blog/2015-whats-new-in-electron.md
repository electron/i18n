---
title: Co je nového v Electronu
author: jlord
date: '2015-10-15'
---

V poslední době se na Electronu objevily zajímavé aktualizace a rozhovory o něčem jiném.

---

## Zdroj

Electron je nyní aktuální v prohlížeči Chrome 45 od `v0.32.0`. Další aktualizace zahrnují...

### Lepší dokumentace

![nové dokumenty](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

Dokumentaci jsme restrukturalizovali a standardizovali, abychom vypadali lépe a lépe chápali. Existují také překlady dokumentace poskytnuté komunitou, jako Japonci a Korejci.

související pull requesty: [elektron/electron#2028](https://github.com/electron/electron/pull/2028), [elektron/electron#2533](https://github.com/electron/electron/pull/2533), [elektron/electron#2557](https://github.com/electron/electron/pull/2557) [electron/electron#2709](https://github.com/electron/electron/pull/2709), [elektron/electron#2725](https://github.com/electron/electron/pull/2725), [elektron/electron#2698](https://github.com/electron/electron/pull/2698), [elektron/electron#2649](https://github.com/electron/electron/pull/2649).

### Node.js 4.1.0

Od `v0.33.0` Elektronové lodě s Node.js 4.1.0.

Související pull request: [elektron/electron#2817](https://github.com/electron/electron/pull/2817).

### Node-pre-gyp

Moduly spoléhající na `uzel pre-gyp` lze nyní kompilovat proti Electronu při stavbě ze zdroje.

Související požadavek na natažení: [mapbox/node-pre-gyp#175](https://github.com/mapbox/node-pre-gyp/pull/175).

### Podpora ARM

Electron nyní poskytuje sestavení pro Linux na ARMv7. Používá se na populárních platformách, jako jsou Chromebook nebo Raspberry Pi 2.

Související problémy: [atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138), [elektron/elektronika/# 2094](https://github.com/electron/electron/pull/2094), [elektron/electron#366](https://github.com/electron/electron/issues/366).

### Okno ve stylu bezrámečků

![Okno bez snímků](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

Úprava od [@jaanus](https://github.com/jaanus) byla sloučena, stejně jako ostatní vestavěné aplikace OS X, umožňuje vytvářet nerámová okna se systémovými kontrolami integrovanými na OS X Yosemite a novějšími.

Související požadavek na natažení: [elektronick/elektronika #2776](https://github.com/electron/electron/pull/2776).

### Google letní podpora pro tisk kódu

Po Google Summer of Code jsme sloučili záplaty od [@hokein](https://github.com/hokein) , abychom zlepšili podporu tisku, a přidejte možnost vytisknout stránku do souborů PDF.

související otázky: [elektronick/elektronika #2677](https://github.com/electron/electron/pull/2677), [elektronick/elektronika #1935](https://github.com/electron/electron/pull/1935), [elektronick/elektronika #1532](https://github.com/electron/electron/pull/1532) [electron/electron#805](https://github.com/electron/electron/issues/805), [elektron/electron#1669](https://github.com/electron/electron/pull/1669), [elektron/electron#1835](https://github.com/electron/electron/pull/1835).

## Atom

Atom nyní aktualizoval na Electron `v0.30.6` běžící na Chrome 44. Aktualizace na `v0.33.0` probíhá na [atom/atom#8779](https://github.com/atom/atom/pull/8779).

## Rozhovory

GitHubber [Amy Palamountain](https://github.com/ammeep) skvělým úvodem Electronu v rozhovoru na [Nordic.js](https://nordicjs2015.confetti.events). Vytvořila také knihovnu [elektron-akcelerátor](https://github.com/ammeep/electron-accelerator).

#### Vytváření domácích aplikací s Electronem Amy Palomountain

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[Ben Ogle](https://github.com/benogle), také v Atom týmu, dal Electron mluvit na [YAPC Asia](http://yapcasia.org/2015/):

#### Vytváření desktopových aplikací pomocí Web Technologies společností Ben Ogle

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

Člen Atom týmu [Kevin Sawicki](https://github.com/kevinsawicki) a jiní nedávno zahájili rozhovory o Electronu v [Bay Are Electron User Group](http://www.meetup.com/Bay-Area-Electron-User-Group/). [videa](http://www.wagonhq.com/blog/electron-meetup) byla zveřejněna, zde je pár:

#### Historie Electronu Kevina Sawickiho

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Jak se webová aplikace cítí nativní od Ben Gotowa

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

