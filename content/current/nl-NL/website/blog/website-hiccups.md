---
title: Website Hiccups
author: zeke
date: '2018-02-12'
---

Vorige week had de site [electronjs.org](https://electronjs.org) een paar minuten downtime. Als je door deze korte onderbrekingen bent getroffen, spijt ons voor het ongemak. Na een beetje onderzoek vandaag hebben we de root-oorzaak gediagnosticeerd en hebben we een [fix](https://github.com/electron/electronjs.org/pull/1076) ingezet.

---

Om dit soort downtime in de toekomst te voorkomen, hebben we [Heroku threshold meldingen](https://devcenter.heroku.com/articles/metrics#threshold-alerting) in onze app ingeschakeld. Elke keer dat onze webserver mislukte aanvragen verzamelt of langzame reacties ophoopt die een bepaalde drempel overschrijden, ons team zal een melding krijgen, zodat we snel kunnen reageren op het probleem.

## Offline Docs in elke taal

De volgende keer dat je een Electron app ontwikkelt op een vliegtuig of in een ondergrondse koffieshop, u wilt misschien een kopie van de documenten voor offline-referentie. Gelukkig zijn Electron's documenten beschikbaar als Markdown bestanden in meer dan 20 talen.

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Offline Docs met een GUI

[devdocs. o/electron](https://devdocs.io/electron/) is een handige website die docs opslaat voor offline gebruik, niet alleen voor Electron maar ook vele andere projecten zoals JavaScript, TypeScript, Node. , React, Angular, en vele anderen. En natuurlijk er is ook een Electron app. Bekijk [devdocs-app](https://electronjs.org/apps/devdocs-app) op de Electron site.

[![](https://user-images.githubusercontent.com/8784712/27121730-11676ba8-511b-11e7-8c01-00444ee8501a.png)](https://electronjs.org/apps/devdocs-app)

Als je apps wilt installeren zonder de muis of trackpad te gebruiken, geef dan [Electron Forge](https://electronforge.io/)zijn `installatie` commando een keer:

```sh
npx electron-forge install egoist/devdocs-app
```