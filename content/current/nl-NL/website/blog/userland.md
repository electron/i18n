---
title: Elektron gebruikersland
author: zeke
date: '2016-12-20'
---

We hebben een nieuwe [userland](https://electronjs.org/userland) sectie toegevoegd aan de Electron website om gebruikers de mensen te helpen ontdekken, pakketten en apps die vormen van ons bloeiende open-source ecosysteem.

---

[![github-contributors](https://cloud.githubusercontent.com/assets/2289/21205352/a873f86c-c210-11e6-9a92-1ef37dfc986b.png)](https://electronjs.org/userland)

## Oorsprong van Userland

Gebruikers zijn de plek waar mensen in softwaregemeenschappen samenkomen om tools en ideeën te delen. De term is ontstaan in de Unix-gemeenschap. waar het verwees naar elk programma dat buiten de kernel liep, maar vandaag de dag betekent het iets meer. Wanneer mensen in de Javascript gemeenschap naar gebruikersland verwijst, praten ze meestal over de [npm package register](http://npm.im). Dit is waar het grootste deel van experimenten en innovatie gebeurt, while Node en de JavaScript taal (zoals de Unix kernel) behouden een relatief kleine en stabiele set van core-functies.

## Node en Electron

Zoals Node, heeft Electron een kleine set core API's. Deze bieden de basisfuncties die nodig zijn voor het ontwikkelen van multi-platform desktopapplicaties. Deze ontwerpfilosofie maakt het mogelijk dat Electron een flexibele tool blijft zonder te dwingend te zijn over hoe het gebruikt moet worden.

Userland is de tegenhanger van "kern", wat gebruikers in staat stelt tools te maken en te delen die de functionaliteit van Electroni uitbreiden.

## Gegevens verzamelen

Om de trends in ons ecosysteem beter te begrijpen wij metadata van 15 geanalyseerd 00 openbare GitHub repositories die afhankelijk zijn van `elektron` of `elektron-prebuilt`

We hebben de [GitHub API](https://developer.github.com/v3/)gebruikt, de [bibliotheken. o API](https://libraries.io/api), en de npm register om informatie te verzamelen over afhankelijkheden, ontwikkelingsafhankelijkheden, afhankelijkheid, pakket auteurs, repo bijdragers, download tellen, fork tellen, stargazer tellen, etc.

We hebben deze gegevens vervolgens gebruikt om de volgende verslagen te genereren:

- [App Development afhankelijkheden](https://electronjs.org/userland/dev_dependencies): Pakketten worden meestal vermeld als `devDependencies` in Electron apps.
- [GitHub bijdragers](https://electronjs.org/userland/github_contributors): GitHub gebruikers die hebben bijgedragen aan talloze Electron-gerelateerde GitHub repositories.
- [Package Afhankelijkheden](https://electronjs.org/userland/package_dependencies): Electron-gerelateerde npm packages die vaak afhankelijk zijn van andere npm packages.
- [Starred Apps](https://electronjs.org/userland/starred_apps): Electron apps (die geen npm pakketten zijn) met talloze stargazers.
- [Meest gedownloade pakketten](https://electronjs.org/userland/most_downloaded_packages): Electron-gerelateerde npm pakketten die veel gedownload worden.
- [App Afhankelijkheden](https://electronjs.org/userland/dependencies): Pakketten worden meestal vermeld als `afhankelijkheden` in Electron apps.
- [Package Authors](https://electronjs.org/userland/package_authors): De meest prolifictieve auteurs van Electron-gerelateerde npm packages.

## Filter resultaten

Rapporten zoals [app-afhankelijkheden](https://electronjs.org/userland/dependencies) en [apps met ster](https://electronjs.org/userland/starred_apps) welke pakketten weergeven, apps en repos hebben een tekstinvoer die kan worden gebruikt om de resultaten te filteren.

Terwijl je in deze invoer typt, wordt de URL van de pagina dynamisch bijgewerkt. Deze stelt u in staat om een URL te kopiëren die een bepaald stuk gebruikersgegevens bevat, en het vervolgens met anderen te delen.

[![babel](https://cloud.githubusercontent.com/assets/2289/21328807/7bfa75e4-c5ea-11e6-8212-0e7988b367fd.png) ](https://electronjs.org/userland/dev_dependencies?q=babel%20preset)

## Meer te komen

Deze eerste reeks verslagen is nog maar het begin. We zullen data blijven verzamelen over hoe de gemeenschap Electroon bouwt, en zullen nieuwe rapporten toevoegen aan de website.

Alle hulpmiddelen die worden gebruikt om deze gegevens te verzamelen en weergeven zijn open-source:

- [electron/electronjs.org](https://github.com/electron/electron.atom): De Electron website.
- [electron/electron-userland-reports](https://github.com/electron/electron-userland-reports): lices van gegevens over pakketten, repos en gebruikers in Electron userland.
- [electron/repos-using-electron](https://github.com/electron/repos-using-electron): Alle openbare repositories op GitHub die afhankelijk zijn van `electron` of `electron-prebuilt`
- [electron/electron-npm-packages](https://github.com/zeke/electron-npm-packages): Alle npm packages die `electron` vermelden in hun `package.json` bestand.

Als je ideeën hebt over hoe je deze rapporten kunt verbeteren, Laat ons weten [door het openen van een issue in de repository](https://github.com/electron/electronjs.org/issues/new) of een van de hierboven genoemde repos.

Bedankt aan jou, de Electron community, voor het maken van userland wat het vandaag is!

