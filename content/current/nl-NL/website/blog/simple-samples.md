---
title: Electron Simple Samples
author: zeke
date: '2017-01-19'
---

Onlangs hebben we een Electron hackathon op GitHub HQ gehost voor leden van [Hackbright Academy](https://hackbrightacademy.com), een coderingsschool voor vrouwen opgericht in San Francisco. Om deelnemers te helpen een hoofd te krijgen voor hun projecten, hebben onze eigen [Kevin Sawicki](https://github.com/kevinsawicki) een paar Electron applicaties gemaakt.

---

Als je nieuw bent voor Electron ontwikkeling of het nog niet hebt uitgeprobeerd, zijn deze voorbeeldtoepassingen een geweldige plek om te beginnen. Ze zijn klein, makkelijk te lezen, en de code is zwaar becommentarieerd om uit te leggen hoe alles werkt.

Om te beginnen, kloon deze repository:

```sh
git kloon https://github.com/electron/simple-samples
```

Om een van de onderstaande apps uit te voeren, verander deze in de map van de app. installeer afhankelijkheden en start dan:

```sh
cd activity-monitor
npm install
npm start
```

## Activiteit monitor

Toont een donkere grafiek van het CPU-systeem, gebruiker en inactieve activiteit tijd.

[![Schermafbeelding](https://cloud.githubusercontent.com/assets/671378/20894933/3882a328-bacc-11e6-865b-4bc1c5ac7ec7.png)](https://github.com/kevinsawicki/electron-samples/tree/master/activity-monitor)

## Toegangssleutel

Toont de hash waarden van de ingevoerde tekst met verschillende algoritmen.

[![schermafbeelding](https://cloud.githubusercontent.com/assets/671378/21204178/de96fa12-c20a-11e6-8e94-f5b16e676eee.png)](https://github.com/kevinsawicki/electron-samples/tree/master/hash)

## Spiegel

Speelt een video af van de camera van de computer op een maximale grootte zoals in een spiegel kijken. Bevat een optioneel regenboogfiltereffect dat CSS-animaties gebruikt.

## Prijzen

Toont de huidige olieprijs, goud en zilver met behulp van de Yahoo Finance API.

[![schermafbeelding](https://cloud.githubusercontent.com/assets/671378/21198004/6e7a3798-c1f2-11e6-8228-495de90b7797.png)](https://github.com/kevinsawicki/electron-samples/tree/master/prices)

## URL

Laad een URL die op de opdrachtregel in een venster is doorgegeven.

## Andere bronnen

We hopen dat deze apps je helpen om Electron te gebruiken. Hier zijn een handvol andere middelen om meer te leren:

- [electron-quick-start](https://github.com/electron/electron-quick-start): Een minimale Electron application boilerplate.
- [Electron API demos](https://github.com/electron/electron-api-demos): Een interactieve app die de kernfuncties van de Electron API toont
- [electronjs.org/docs/all](https://electronjs.org/docs/all/): Alle Electron documentatie samen op een enkele doorzoekbare pagina.
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps): Een andere verzameling van voorbeelden applicaties voor Electron, gecompileerd door Electron maintainer [Haojian Wu](https://github.com/hokein).
- [awesome-electron](https://github.com/sindresorhus/awesome-electron) - Een GitHub repository die de nieuwste en beste Electron-gerelateerde tutorials, boeken, video's, etc. verzamelt.