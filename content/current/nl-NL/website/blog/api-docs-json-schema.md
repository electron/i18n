---
title: API-documentatie van elektronica als gestructureerde gegevens
author: zeke
date: '2016-09-27'
---

Vandaag kondigen we enkele verbeteringen aan in de documentatie van Electron. Elke nieuwe versie bevat nu een [JSON bestand](https://github.com/electron/electron/releases/download/v1.4.1/electron-api.json) die alle publieke API's van Electron's in detail beschrijft. We hebben dit bestand gemaakt om ontwikkelaars in staat te stellen om de API-documentatie van Electronen op interessante nieuwe manieren te gebruiken.

---

## Schema overzicht

Elke API is een object met eigenschappen zoals naam, beschrijving, type, etc. Klassen zoals `BrowserWindow` en `Menu` hebben extra eigenschappen die hun instance methodes beschrijven, bijvoorbeeld eigenschappen en gebeurtenissen etc.

Hier is een samenvatting van het schema dat de klasse `BrowserWindow` beschrijft:

```js
{
  name: 'BrowserWindow',
  beschrijving: 'Creëer en control browser vensters. ,
  proces: {
    main: true,
    renderer: false
  },
  type: 'Klasse',
  instantienaam: 'win',
  slug: 'browser-window',
  websiteUrl: 'https://electronjs. rg/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window. d',
  staticMethoden: [...],
  instantiemethoden: [...],
  instantieEigenschappen: [...],
  instantieEvenementen: [...]
}
```

En hier is een voorbeeld van een methodebeschrijving, in dit geval de `apis.BrowserWindow.instanceMethods.setMaximumSize` instantie methode:

```js
{
  naam: 'setMaximumSize',
  handtekening: '(breedte, hoogte)',
  beschrijving: 'Stelt de maximale grootte van het venster in op breedte en hoogte. ,
  parameters: [{
    name: 'width',
    type: 'Integer'
  }, {
    name: 'height',
    type: 'Integer'
  }]
}
```

## De nieuwe gegevens gebruiken

Om het makkelijk te maken voor ontwikkelaars om deze gestructureerde data te gebruiken in hun projecten, hebben we [electron-docs-api](https://www.npmjs.com/package/electron-api-docs)</a> gecreëerd, een klein npm pakket dat automatisch wordt gepubliceerd wanneer er een nieuwe Electron verschijnt.

```sh
npm installeer electron-api-docs --save
```

Voor onmiddellijke tevredenheid, probeer de module in uw Node.js REPL:

```sh
npm i -g trymodule && trymodule electron-api-docs=apis
```

## Hoe de gegevens worden verzameld

De API documentatie van Electron houdt vast aan [Electron Coding Style](https://github.com/electron/electron/blob/master/docs/development/coding-style.md) en de [Electron Styleguide](https://github.com/electron/electron/blob/master/docs/styleguide.md#readme), zodat de inhoud ervan programmatisch kan worden geparseerd.

De [electron-docs-linter](https://github.com/electron/electron-docs-linter) is een nieuwe ontwikkelings afhankelijkheid van de `electron/electron` repository. Het is een command-line tool die alle markdown bestanden linkt en de regels van de styleguide afdwingt. Als er fouten worden gevonden, worden ze vermeld en wordt het release- proces gestopt. Als de API documenten geldig zijn, de `electron-json. pi` bestand wordt gemaakt en [geüpload naar GitHub](https://github.com/electron/electron/releases/tag/v1.4.1) als onderdeel van de Electron release.

## Standaard Javascript en Standaard Markdown

Eerder dit jaar is de codebase van Electroni bijgewerkt om de [`standaard`](http://standardjs.com/) linter te gebruiken voor alle JavaScript. Standaard README vat de redenering achter deze keuze samen:

> Het aannemen van de standaard stijl betekent het belang van code helderheid en gemeenschapsconventies hoger dan persoonlijke stijl. Dat is misschien niet logisch voor 100 procent van de projecten en ontwikkelingsculturen, maar open source kan wel een vijandige plek voor nieuwkomers zijn. Het maken van duidelijke, geautomatiseerde verwachtingen van bijdragers maakt een project gezonder.

We hebben onlangs [standaard markdown](https://github.com/zeke/standard-markdown) gemaakt om te controleren of alle JavaScript code snippets in onze documentatie geldig en consistent zijn met de stijl in de codebase zelf.

Samen met deze hulpmiddelen helpen we continue integratie (CI) om automatisch fouten te vinden in pull requests. Dit vermindert de last op mensen die code uitvoeren, en geeft ons meer vertrouwen in de juistheid van onze documentatie.

### Een gemeenschap inspanning

De documentatie van Electron verbetert voortdurend, en we hebben onze geweldige open-source gemeenschap om ze hiervoor te bedanken. Sinds dit schrijven hebben bijna 300 mensen bijgedragen aan de documenten.

We zijn enthousiast om te zien wat mensen met deze nieuwe gestructureerde gegevens doen. Mogelijke toepassingen omvatten:

- Verbeteringen naar [https://electronjs.org/docs/](https://electronjs.org/docs/)
- Een [TypeScript definitie bestand](https://github.com/electron/electron-docs-linter/blob/master/README.md#typescript-definitions) voor meer gestroomlijnde Electron ontwikkeling in projecten met behulp van TypeScript.
- Doorzoekbare offline documentatie voor tools zoals [Dash.app](https://kapeli.com/dash) en [devdocs.io](http://devdocs.io/)

