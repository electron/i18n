---
title: "Nieuw bij Electron 2: In-App Aankopen"
author: zeke
date: '2018-04-04'
---
  
De nieuwe Electron 2.0 release line is [verpakt](https://github.com/electron/electron/releases/tag/v2.0.0-beta.1) met nieuwe functies en oplossingen. Een van de hoogtepunten van deze nieuwe grote versie is een nieuwe [`inAppPurchase` API](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) voor Apple [Mac App Store](https://support.apple.com/en-us/HT202023).

---

Met in-app aankopen kunnen inhoud of abonnementen direct worden gekocht via apps. Dit geeft ontwikkelaars een gemakkelijke manier om het [freemium business model](https://developer.apple.com/app-store/freemium-business-model/)te omarmen, waar gebruikers niets betalen om een app te downloaden en optioneel in-app aankopen worden aangeboden voor premium functies, extra inhoud of abonnementen.

De nieuwe API is toegevoegd aan Electron door de bijdrager van de community [Adrien Fery](https://github.com/AdrienFery) om in-app aankopen in [Amanote](https://amanote.com/)mogelijk te maken, een aangrijpende Electron app voor lezingen en conferenties. Amanote is gratis te downloaden en maakt het mogelijk om duidelijke en gestructureerde notities toe te voegen aan PDF's, met functies zoals wiskundige formules, tekeningen, audio opnemen en meer.

Sinds het toevoegen van in-app aankoop ondersteuning aan de Mac versie van Amanote, heeft Adrien kennis genomen van een **40% stijging in de verkoop**!

## Aan de slag

De nieuwe [`inAppPurchase`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) API is al geland in de nieuwste Electron beta:

```sh
npm i -D electron@beta
```

De documenten voor de API kunnen [gevonden worden op GitHub](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md), en Adrien zijn zo vriendelijk geweest om een handleiding te schrijven over het gebruik van de API. Om te beginnen met het toevoegen van in-app aankopen aan uw app, [bekijk de handleiding](https://github.com/AdrienFery/electron/blob/a69bbe882aed1a5aee2b7910afe09900275b2bf6/docs/tutorial/in-app-purchases.md).

Er zijn meer [verbeteringen aan de API](https://github.com/electron/electron/pull/12464) in de werken, en binnenkort zullen ze worden opgenomen in een aankomende Electron beta release.

## Windows kan volgende zijn

Adrien hoopt een nieuw inkomstenkanaal voor Amanote te openen door ondersteuning toe te voegen voor Microsoft Store in-app aankopen in Electron. Blijf op de hoogte voor ontwikkelingen daarover!