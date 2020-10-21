---
title: Zoeken
author:
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

De Electron website heeft een nieuwe zoekmachine die onmiddellijke resultaten oplevert voor API docs, tutorials, Electron-gerelateerde npm packages, en meer.

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Electron zoek schermafbeelding">
  </a>
</figure>

---

Het leren van nieuwe technologie of framework zoals Electron kan intimiderend zijn. Zodra je voorbij de [snelstart](https://github.com/electron/electron-quick-start) fase komt, kan het moeilijk zijn om de beste praktijken te leren. vind de juiste API's, of ontdek de gereedschappen waarmee je de app van je dromen kunt bouwen. We willen dat de Electron website een betere tool is om de bronnen te vinden die je nodig hebt om apps sneller en makkelijker te bouwen.

Bezoek elke pagina op [electronjs.org](https://electronjs.org) en je vindt de nieuwe zoekinvoer bovenaan de pagina.

## De zoekmachine

Toen we voor het eerst de zoekfunctie aan de website toestelden, rolden we onze eigen zoekmachine met behulp van GraphQL als een backend. GraphQL was leuk om mee te werken en de zoekmachine was performant, maar we hebben snel ingezien dat het bouwen van een zoek -motor geen triviale taak is. Dingen zoals zoeken met meerdere woorden en typefout vereisen veel werk om de juiste weg te gaan. In plaats van het wiel opnieuw uit te vinden, hebben we besloten een bestaande zoekoplossing te gebruiken: [Algolia](https://algolia.com).

Algolia is een gehoste zoekservice die al snel de zoekmachine is geworden voor de keuze van populaire open source projecten zoals React, Vue, Bootstrap, Yarn en [veel anderen](https://community.algolia.com/docsearch/).

Hier zijn enkele functies die Algolia goed geschikt hebben gemaakt voor het Electron project:

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) levert resultaten terwijl je typt, meestal in ongeveer 1ms.
- [Typo tolerance](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) betekent dat je nog steeds resultaten krijgt, zelfs wanneer je [`breedte` ] typt.
- [Advanced query syntax](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) staat `"exact geciteerde matches"` en `-exclusion` toe.
- [API cliënten](https://www.algolia.com/doc/api-client/javascript/getting-started/) zijn open source en met goed gedocumenteerd.
- [Analytics](https://www.algolia.com/doc/guides/analytics/analytics-overview/) vertellen ons wat mensen naar de meeste zoeken, evenals naar wat ze zoeken, maar niet vinden. Dit geeft ons een waardevol inzicht in de manier waarop de documentatie van Electroni verbeterd kan worden.
- Algolia is [gratis voor open source projecten](https://www.algolia.com/for-open-source).

## API Docs

Soms weet je *wat* je wilt bereiken, maar je weet niet precies *hoe* het moet doen. Electron heeft meer dan 750 API-methoden, evenementen en eigenschappen. Geen enkele mens kan zich die allemaal herinneren, maar computers zijn goed in dit spul. Met behulp van Electron's [JSON API docs](https://electronjs.org/blog/api-docs-json-schema), we hebben al deze gegevens geïndexeerd in Algolia, en nu kun je eenvoudig de exacte API vinden die je zoekt.

Proberen een venster te vergroten? Zoek naar [`resize`] en spring direct naar de gewenste methode.

## Tutorials

Electron heeft een steeds grotere verzameling handleidingen om de API documentatie aan te vullen. Nu kunt u makkelijker handleidingen vinden in een bepaald onderwerp, naast de gerelateerde API-documentatie.

Op zoek naar beste praktijken voor beveiliging? Zoek naar [`beveiliging`].

## npm pakketten

Er zijn nu meer dan 700.000 pakketten in het npm register en het is niet altijd gemakkelijk om het te vinden wat je nodig hebt. Om het makkelijker te maken om deze modules te ontdekken, hebben we [`electron-npm-packages`] gemaakt, een collectie van de 3400+ modules in het register die speciaal zijn gebouwd om te gebruiken met Electron.

De mensen op [Bibliotheeken. o](https://libraries.io) heeft [BronRang](https://docs.libraries.io/overview.html#sourcerank)gemaakt, een systeem voor het scoren van softwareprojecten op basis van een combinatie van statistieken zoals code, gemeenschap, documentatie en gebruik. We hebben een [`sourceranks`] module gemaakt met de score van elke module in het npm register, en we gebruiken deze scores om de pakketresultaten te sorteren.

Wil je alternatieven voor de ingebouwde IPC-modules van Electron? Zoek naar [`is:package ipc`].

## Electron Apps

Het is [makkelijk om gegevens te indexeren met Algolia](https://github.com/electron/algolia-indices), dus hebben we de bestaande appslijst toegevoegd uit [electron/apps](https://github.com/electron/apps).

Probeer een zoekopdracht naar [`muziek`] of [`homebrew`].

## Filter resultaten

Als je GitHub's [code zoek](https://github.com/search) eerder hebt gebruikt, Je bent waarschijnlijk op de hoogte van de dubbele sleutelwaarde filters zoals `extensie:js` of `user:defunkt`. Wij denken dat deze filtertechniek best krachtig is, dus hebben we een `toegevoegd is:` trefwoord aan de zoekopdracht van Electron, waarmee je filterresultaten kunt weergeven voor een enkel type:

- [`is:api miniatuur`]
- [`is:tutorial beveiliging`]
- [`is:package ipc`]
- [`is:app graphql`]

## Toetsenbord navigatie

Mensen houden van sneltoetsen! De nieuwe zoekopdracht kan worden gebruikt zonder je vingers van het toetsenbord af te halen:

- <kbd>/</kbd> richt zich op de zoekinvoer
- <kbd>esc</kbd> richt zich op de zoekinvoer en wist het
- <kbd>omlaag</kbd> zet naar het volgende resultaat
- <kbd>omhoog</kbd> gaat naar het vorige resultaat, of de zoekinvoer
- <kbd>enter</kbd> opent een resultaat

We open ook de [module](https://github.com/electron/search-with-your-keyboard/) die deze toetsenbord interactie mogelijk maakt. Het is ontworpen voor gebruik met Algolia InstantSearch, maar is gegeneraliseerd om compatibiliteit met verschillende zoekimplementaties mogelijk te maken.

## We willen je feedback

Als je problemen ondervindt met de nieuwe zoekfunctie, willen we erover horen!

De beste manier om je feedback te sturen is door een probleem op GitHub in de gepaste repository:

- [elektron/electronjs.org](https://github.com/electron/electronjs.org) is de Electron website. Als je niet weet waar je een probleem moet indienen, dan weddenschap je best.
- [electron/algolia-indexen](https://github.com/electron/algolia-indices) is waar alle doorzoekbare Electron data worden gecompileerd.
- [electron/search-with-your-toetsenbord](https://github.com/electron/search-with-your-keyboard) maakt de zoekinterface navigeerbaar door een toetsenbord.
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) is de browser-side client die zoekopdrachten mogelijk maakt.
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) is de Node.js client voor het uploaden van gegevens naar de servers van Algolia.

## Bedankt

Speciale dank aan [Emily Jordan](https://github.com/echjordan) en [Vanessa Yuen](https://github.com/vanessayuenn) voor het bouwen van deze nieuwe zoekmogelijkheden, naar [bibliotheken o](https://libraries.io) om [SourceRank](https://docs.libraries.io/overview.html#sourcerank) scores, en aan het team in Algolia om ons te helpen aan de slag te gaan. 🍹