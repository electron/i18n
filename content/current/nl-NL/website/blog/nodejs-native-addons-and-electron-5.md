---
title: Node.js Inheemse Addons en Electron 5.0
author: BinaryMuse
date: '2019-02-01'
---

Als je problemen hebt met het gebruik van een native Node.js addon met Electron 5. , er is een kans dat het moet worden bijgewerkt om te werken met de meest recente versie van V8.

---

## Goodbye `v8::Handle`, Hallo `v8::Local`

In 2014 wordt de V8 team niet meer ondersteund `v8::Handle` ten gunste van `v8::Local` voor lokale handelingen. Electron 5.0 bevat een versie van V8 die eindelijk `v8::Handle` voor goed en native Nodes verwijderd heeft. s voegt toe dat het nog gebruikt zal moeten worden om te worden geüpdatet voordat ze gebruikt kunnen worden met Electron 5.0.

De vereiste codewijziging is minimaal, maar *elke* native Node module die nog steeds `v8::Handle` gebruikt zal niet kunnen bouwen met Electron 5. en zal moeten worden gewijzigd. Het goede nieuws is dat Node. s v12 zal ook deze V8 wijziging omvatten dus alle modules die `v8::Handle` gebruiken moeten toch *worden geüpdatet* om te werken met de volgende versie van Node.

## Ik onderhoud een native addon, hoe kan ik u helpen?

Als je een native addon voor Node.js behoudt, vervang je alle voorvallen van `v8::Handle` door `v8::Local`. Het eerste was slechts een alibi voor het laatste, dus er hoeven geen andere wijzigingen te worden aangebracht om dit specifieke probleem aan te pakken.

Je kunt ook geïnteresseerd zijn in het bekijken van [N-API](https://nodejs.org/api/n-api.html), die apart wordt gehouden van V8 als onderdeel van Node. is gericht op het isoleren van inheemse addons van veranderingen in de onderliggende JavaScript-engine. U kunt meer informatie vinden [in de N-API documentatie op de Node.js website](https://nodejs.org/api/n-api.html#n_api_n_api).

## Help! Ik gebruik een native addon in mijn app en het zal niet werken!

Als je voor Node een native addon gebruikt. s in je app en de native addon zal niet bouwen vanwege dit probleem, Kijk bij de auteur van de addon om te zien of ze een nieuwe versie hebben uitgebracht die het probleem oplost. Zo niet, dan is het waarschijnlijk de beste weddenschap om naar de auteur (of het openen [ van een pull-verzoek!](https://help.github.com/articles/about-pull-requests/)) te komen.</p>
