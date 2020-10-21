---
title: Apple Silicon ondersteuning
author: MarshallOfSound
date: '2020-10-15'
---

Met de Apple Silicon hardware die later dit jaar wordt vrijgegeven, Hoe ziet het pad er naar uit om je Electron app te laten werken op de nieuwe hardware?

---

Met de vrijlating van Electron 11.0,0-beta. , het Electron team is nu verzendbuilds van Electron die draaien op de nieuwe Apple Silicon hardware die Apple later dit jaar op verzending plant. Je kunt de nieuwste bèta halen met `npm install electron@beta` of deze direct downloaden vanaf onze [releases website](https://electronjs.org/releases/stable).

## Hoe werkt het?

Vanaf Electron 11 zullen we afzonderlijke verzendversies van Electron voor Intel Macs en Apple Silicon Macs zijn. Vóór deze wijziging waren we al twee artefacten verzonden, `darwin-x64` en `mas-x64`, met de laatste voor Mac App Store compatibiliteitsgebruik. We verzenden nu nog twee artefacten, `darwin-arm64` en `mas-arm64`, wat de Apple Silicon-equivalenten zijn van de bovengenoemde artefacten.

## Wat moet ik doen?

Je moet twee versies van je app verzenden: één voor x64 (Intel Mac) en één voor arm64 (Apple Silicon). Het goede nieuws is dat [`E-packager`](https://github.com/electron/electron-packager/), [`electron-build`](https://github.com/electron/electron-rebuild/) en [`electron-forge`](https://github.com/electron-userland/electron-forge/) ondersteunt al gericht op de `arm64` architectuur. Zolang je de laatste versies van deze pakketten gebruikt, je app zou zonder problemen moeten werken zodra je de doelarchitectuur update naar `arm64`.

In de toekomst we zullen een pakket verspreiden waarmee je je `arm64` en `x64` apps kunt samenvoegen tot één universele binary, maar het is de moeite waard om op te merken dat dit binary _enorm_ zou zijn en waarschijnlijk niet ideaal voor verzending naar gebruikers.

## Potentiële problemen

### Moeilijke modules

Aangezien je een nieuwe architectuur nastreeft, moet je meerdere afhankelijkheden bijwerken die problemen kunnen veroorzaken. De minimale versie van bepaalde afhankelijkheden zijn hieronder inbegrepen voor uw referentie.

| Afhankelijkheid      | Versie Vereisten |
| -------------------- | ---------------- |
| Xcode                | `>=12.0.0`    |
| `non-gyp`            | `>=7.1.0`     |
| `Elektron-herbouwen` | `>=1.12.0`    |
| `Elektron-verpakker` | `>=15.1.0`    |

Als gevolg van deze afhankelijkheid versie vereisten moet u mogelijk bepaalde native modules aanpassen/aanpassen.  Een ding is dat de Xcode upgrade een nieuwe versie van de macOS SDK zal introduceren, welke bouwmislukkingen kunnen veroorzaken voor je native modules.


## Hoe test ik het?

Op dit moment werken Apple Silicon-applicaties alleen op Apple Silicon hardware, die niet commercieel beschikbaar is op het moment van het schrijven van deze blog post. Als je een [Developer Transition Kit](https://developer.apple.com/programs/universal/)hebt, kun je je applicatie daarop testen. Anders moet je wachten tot de productie Apple Silicon hardware is vrijgegeven om te testen of je toepassing werkt.

## Hoe zit het met Rosetta 2?

Rosetta 2 is Apple's laatste herhaling van hun [Rosetta](https://en.wikipedia.org/wiki/Rosetta_(software)) technologie, waarmee je x64 Intel applicaties kunt uitvoeren op hun nieuwe arm64 Apple Silicon hardware. Hoewel we geloven dat x64 Electron apps zullen werken onder Rosetta 2, er zijn enkele belangrijke dingen om op te merken (en redenen waarom je een native arm64 binary zou moeten verzenden).

* De prestaties van uw app zullen aanzienlijk worden aangetast. Electron / V8 gebruikt [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) compilatie voor JavaScript en vanwege hoe Rosetta werkt. u zult JIT twee keer runnen (eenmaal in de V8 en eenmaal in Rosetta).
* Je verliest het voordeel van nieuwe technologie in Apple Silicon, zoals verhoogde geheugengrootte
* Hebben we gezegd dat de prestaties **significant** afbreekbaar zullen zijn?
