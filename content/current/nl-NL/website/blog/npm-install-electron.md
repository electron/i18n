---
title: npm install electron
author: zeke
date: '2016-08-16'
---

Vanaf Electron versie 1.3.1 kunt u `npm installeren electron --save-dev` om de laatste pregecompileerde versie van Electron in uw app te installeren.

---

![npm install electron](https://cloud.githubusercontent.com/assets/378023/17259327/3e3196be-55cb-11e6-8156-525e9c45e66e.png)

## De voorgebouwde Electron binary

Als je ooit eerder aan een Electron app hebt gewerkt, heb je waarschijnlijk het `elektron-prebuilt` npm pakket gezien. Dit pakket is een onmisbaar onderdeel van bijna elk Electron project. Wanneer geïnstalleerd detecteert het je besturingssysteem en downloadt het een vooraf gebouwd binary dat gecompileerd is om te werken aan de architectuur van je systeem.

## De nieuwe naam

Het installatieproces van Electron was vaak een struikelblok voor nieuwe ontwikkelaars. Veel dappere mensen probeerden een Electron per app te ontwikkelen door `npm install electron` in plaats van `npm install electron-prebuilt`, om te ontdekken (vaak na veel verwarring) dat het niet de `elektron` was die op zoek waren.

Dit was omdat er een bestaand `electron` project was op npm, gemaakt voordat GitHub's Electron project bestond. Om Electron ontwikkeling makkelijker en intuïtief te maken voor nieuwe ontwikkelaars, we bereikten met de eigenaar van de bestaande `elektron` npm pakket om te vragen of hij bereid zou zijn om ons de naam te laten gebruiken. Gelukkig was hij een fan van ons project en stemde hij ermee in om ons te helpen de naam te reproduceren.

## Voorgebouwde levens op

Vanaf versie 1.3.1 zijn we begonnen met publiceren [`electron`](https://www.npmjs.com/package/electron) en `elektron-prebuilt` pakketten naar npm in tandem. De twee pakketten zijn identiek. We hebben ervoor gekozen om door te gaan met het publiceren van het pakket onder beide namen voor een tijdje om de duizenden ontwikkelaars die momenteel `electron-prebuilt` gebruiken in hun projecten niet te benadelen. We recommend updating your `package.json` files to use the  new `electron` dependency, but we will continue releasing new versions of `electron-prebuilt` until the end of 2016.

De [elektron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt) repository blijft de canonical home van het `electron` npm pakket.

## Hartelijk dank

We zijn [@mafintosh](https://github.com/mafintosh), [@maxogden](https://github.com/maxogden), speciale dank verschuldigd, en vele andere [bijdragers](https://github.com/electron-userland/electron-prebuilt/graphs/contributors) voor het maken en onderhouden van `electron-prebuilt`, en voor hun onvermoeibare service tot het JavaScript, Node. gemeenschappen en Electron.

And thanks to [@logicalparadox](https://github.com/logicalparadox) for allowing us to take over the `electron` package on npm.

## Bijwerken van uw projecten

We hebben met de gemeenschap samengewerkt om de populaire pakketten te updaten die beïnvloed worden door deze verandering. Pakketten zoals [electron-packager](https://github.com/electron-userland/electron-packager), [electron-herbouw](https://github.com/electron/electron-rebuild), en [electron-builder](https://github.com/electron-userland/electron-builder) zijn al bijgewerkt om met de nieuwe naam te werken terwijl je doorgaat met de oude naam.

Als je problemen ondervindt bij het installeren van dit nieuwe pakket, Laat het ons weten door een issue te openen op de [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt/issues) repository.

Voor andere problemen met Electron, gebruik de [electron/electron](https://github.com/electron/electron/issues) repository.

