---
title: Wat is nieuw in Electron
author: jlord
date: '2015-10-15'
---

Er zijn onlangs enkele interessante updates en gesprekken geweest op Electron, hier is een rondetafelgesprek.

---

## Bron

Electron is nu bijgewerkt met Chrome 45 vanaf `v0.32.0`. Andere updates omvatten...

### Betere documentatie

![nieuwe documenten](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

We hebben de documenten geherstructureerd en gestandaardiseerd om er beter uit te zien en beter te kunnen lezen. Er zijn ook vertalingen van de documentatie, zoals Japans en Koreaans, die door de gemeenschap zijn bijgedragen.

Gerelateerde pull-aanvragen: [electron#2028](https://github.com/electron/electron/pull/2028), [elektron/electron#2533](https://github.com/electron/electron/pull/2533), [elektron/electron#2557](https://github.com/electron/electron/pull/2557), [elektron/electron#2709](https://github.com/electron/electron/pull/2709), [elektron/elektron#2725](https://github.com/electron/electron/pull/2725), [elektron/elektron#2698](https://github.com/electron/electron/pull/2698),[ electron/electron#2649](https://github.com/electron/electron/pull/2649).</p> 



### Node.js 4.1.0

Sinds `v0.33.0` Electron schepen met Node.js 4.1.0.

Gerelateerde pull request: [electron#2817](https://github.com/electron/electron/pull/2817).



### non-de-pre-gyp

Modules die vertrouwen op `node-pre-gyp` kunnen nu gecompileerd worden tegen Electron bij het bouwen van vanaf de bron.

Gerelateerde pull request: [mapbox/node-pre-gyp#175](https://github.com/mapbox/node-pre-gyp/pull/175).



### ARM ondersteuning

Electron biedt nu builds voor Linux op ARMv7. Het draait op populaire platforms zoals Chromebook en Raspberry Pi 2.

Gerelateerde problemen: [atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138), [electron#2094](https://github.com/electron/electron/pull/2094), [electron/electron#366](https://github.com/electron/electron/issues/366).



### Yosemite-stijl Frameless Venster

![frameless venster](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

Een patch van [@jaanus](https://github.com/jaanus) is samengevoegd dat, zoals de andere ingebouwde OS X apps, maakt framelonsloze vensters mogelijk met systeemlampen geïntegreerd in OS X Yosemite en later.

Gerelateerde pull request: [electron#2776](https://github.com/electron/electron/pull/2776).



### Google Zomer van Code Prins Support

Na de Google Zomer of Code hebben we patches samengevoegd met [@hokein](https://github.com/hokein) om de ondersteuning voor printen te verbeteren. en voeg de mogelijkheid toe om de pagina af te drukken in PDF-bestanden.

Related issues: [electron/electron#2677](https://github.com/electron/electron/pull/2677), [electron/electron#1935](https://github.com/electron/electron/pull/1935), [electron/electron#1532](https://github.com/electron/electron/pull/1532), [electron/electron#805](https://github.com/electron/electron/issues/805), [electron/electron#1669](https://github.com/electron/electron/pull/1669), [electron/electron#1835](https://github.com/electron/electron/pull/1835).



## Atom

Atom is nu geüpgraded naar Electron `v0.30.6` met Chrome 44. Een upgrade naar `v0.33.0` wordt uitgevoerd op [atoom/atoom#8779](https://github.com/atom/atom/pull/8779).



## Gesprekken

GitHubber [Amy Palamountain](https://github.com/ammeep) gaf een geweldige introductie tot Electron in een gesprek bij [Nordic.js](https://nordicjs2015.confetti.events). Ze maakte ook de [elektron-accelerator](https://github.com/ammeep/electron-accelerator) bibliotheek.



#### Bouw inheemse toepassingen met Electron door Amy Palomountain

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[Ben Ogle](https://github.com/benogle), ook in het Atom team, heeft Electron gepraat bij [YAPC Asia](http://yapcasia.org/2015/):



#### Het bouwen van Desktop Apps met Web Technologies door Ben Ogle

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

Atom teamlid [Kevin Sawicki](https://github.com/kevinsawicki) en anderen gaven gesprekken op Electron in de [Bay Are Electron User Group](http://www.meetup.com/Bay-Area-Electron-User-Group/) meeting onlangs De [video's](http://www.wagonhq.com/blog/electron-meetup) zijn geplaatst, hier is een koppel:



#### De geschiedenis van Electron door Kevin Sawicki

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Een web-app zich geboren voelen door Ben Gotow

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

