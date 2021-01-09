---
title: "Nieuwe geïnternationaliseerde website van Elektronen"
author: zeke
date: '2017-11-13'
---

Electron heeft een nieuwe website op [electronjs.org](https://electronjs.org)! We hebben onze statische site vervangen door een Node. s webserver, waardoor we flexibiliteit krijgen om de site te internationaliseren en de weg vrij te maken voor meer spannende nieuwe functies.

---

## :globe_showing_Europe-Afrika: Vertalingen

We zijn begonnen met het internationaliseren van de website met het doel om Electron app ontwikkeling toegankelijk te maken voor een wereldwijd publiek van ontwikkelaars. We gebruiken een lokalisatieplatform genaamd [Crowdin](https://crowdin.com/project/electron) dat integreert met GitHub, Pull requests automatisch openen en bijwerken omdat de inhoud in verschillende talen wordt vertaald.

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="Electron Nav in vereenvoudigd Chinees">
    <figcaption>Electron's Nav in Vereenvoudigd Chinees</figcaption>
  </a>
</figure>

Hoewel we tot nu toe stilletjes aan deze inspanning hebben gewerkt meer dan 75 leden van de Electron gemeenschap hebben het project op organische wijze ontdekt en hebben zich aangesloten bij de poging om de website te internationaliseren en documenten van Electron in meer dan 20 talen te vertalen. We zien [dagelijkse bijdragen](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) van mensen over de hele wereld met vertalingen voor talen als het Frans, het Vietnamees, het Indonesisch en het Chinees voorop.

Om uw taal te kiezen en de voortgang van vertalingen te bekijken, bezoek [electronjs.org/talen](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Huidige doeltalen op Crowdin">
    <figcaption>Vertalingen in uitvoering op Crowdin</figcaption>
  </a>
</figure>

Als u meertalig bent en geïnteresseerd in het helpen vertalen van documenten van Electron's en website, bezoek dan de [elektron/electron-i18n](https://github.com/electron/electron-i18n#readme) repo, of spring direct naar vertalen op [Crowdin](https://crowdin.com/project/electron), waar u kunt inloggen met behulp van uw GitHub account.

Er zijn momenteel 21 talen ingeschakeld voor het Electron-project op Crowdin. Het toevoegen van ondersteuning voor meer talen is eenvoudig, dus als je geïnteresseerd bent in helpen met vertalen, maar je ziet je taallijst niet, [laat het ons weten](https://github.com/electron/electronjs.org/issues/new) en we zullen het inschakelen.

## Ruwe vertaalde documenten

Als u liever de documentatie in markdown bestanden leest, kunt u dat nu in elke taal doen:

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## App pagina's

Vanaf nu kan elke Electron app eenvoudig zijn eigen pagina op de Electron site hebben. Bekijk enkele voorbeelden [Etcher](https://electronjs.org/apps/etcher), [1Clipboard](https://electronjs.org/apps/1clipboard), of [GraphQL Playground](https://electronjs.org/apps/graphql-playground), een foto van hier op de Japanse versie van de site:

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="GraphQL Playground">
  </a>
</figure>

Er zijn ongelooflijke Electron apps die er zijn, maar het is niet altijd makkelijk om te vinden, en niet elke ontwikkelaar heeft de tijd of middelen om een echte website te bouwen om hun app te verhandelen en te verspreiden.

Gebruik slechts een [PNG icoon bestand en een klein aantal app metadata](https://github.com/electron/electron-apps/blob/master/contributing.md), we kunnen veel informatie verzamelen over een bepaalde app. Met behulp van gegevens die zijn verzameld van GitHub, kunnen app-pagina's nu schermafbeeldingen weergeven, downloadlinks, versies, release notities en READMEs voor elke app die een openbare repository heeft. Gebruik een kleurenpalet uitgepakt van het pictogram van elke app, we kunnen [vette en toegankelijke kleuren](https://github.com/zeke/pick-a-good-color) produceren om elke app een visuele onderscheiding te geven.

De [apps index pagina](https://electronjs.org/apps) heeft nu ook categorieën en een trefwoord filter om interessante apps te vinden zoals [GraphQL GUis](https://electronjs.org/apps?q=graphql) en [p2p tools](https://electronjs.org/apps?q=graphql).

Als je een Electron app hebt die je graag op de site zou zien, open dan een pull request op de [electron/electron-apps](https://github.com/electron/electron-apps) repository.

## One-line Installatie met Homebrew

De [Homebrew](https://brew.sh) package manager voor macOS heeft een subcommando genaamd [cask](https://caskroom.github.io) dat het gemakkelijk maakt om desktop apps te installeren met behulp van één enkele opdracht in uw terminal, zoals `brew cask installatie atom`.

We zijn begonnen met het verzamelen van Homebrew cask namen voor populaire Electron apps en zijn nu het weergeven van de installatie commando (voor macOS bezoekers) op elke pagina die een cask heeft:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>Installatie opties op maat van uw platform: macOS, Windows, Linux</figcaption>
  </a>
</figure>

Om alle apps met homebrew cask namen te bekijken, bezoek [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). Als andere apps met casks kennen die we nog niet geïndexeerd hebben, [voeg ze dan toe!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 Een nieuw domein

We hebben de site verplaatst van electron.atom.io naar een nieuw domein: [electronjs.org](https://electronjs.org).

Het Electron project is geboren in [Atom](https://atom.io), GitHub's open-source teksteditor gebouwd op webtechnologieën. Electron werd oorspronkelijk `atom-shell` genoemd. Atom was de eerste app die het gebruikte, maar het duurde niet lang voor mensen zich realiseerden dat deze magische Chromium + Node runtime voor allerlei soorten applicaties gebruikt kan worden. Wanneer bedrijven als Microsoft en Slack beginnen gebruik te maken van `atoomshell`, het werd duidelijk dat het project een nieuwe naam nodig had.

En zo werd "Electron" geboren. Begin 2016 heeft GitHub een nieuw team samengesteld om specifiek te focussen op de ontwikkeling en het onderhoud van Electron, behalve Atom. In de tijd sindsdien is Electron goedgekeurd door duizenden app ontwikkelaars, en nu is afhankelijk van veel grote bedrijven, waarvan veel Electron teams hebben van hun eigen.

Het ondersteunen van GitHub's Electron projecten zoals Atom en [GitHub Desktop](https://desktop.github.com) is nog steeds een prioriteit voor ons team, maar door over te gaan naar een nieuw domein hopen we te helpen om het technische onderscheid tussen Atom en Electron te verduidelijken.

## 🐢rocket: Node.js overal

De vorige Electron website is gebouwd met [Jekyll](https://jekyllrb.com), de populaire Ruby-based statische website generator. Jekyll is een geweldig hulpmiddel voor het bouwen van statische websites, maar de website was begonnen deze uit te breiden. We wilden meer dynamische mogelijkheden zoals de juiste omleidingen en dynamische weergave van inhoud, dus een [Node.js](https://nodejs.org) server was de voor de hand liggende keuze.

Het Electron ecosysteem bevat projecten met componenten die in veel verschillende programmeertalen geschreven zijn, van Python tot C++ tot Bash. Maar JavaScript is fundamenteel voor Electron, en het is de taal die het meest gebruikt wordt in onze community.

Door de website te migreren van Ruby naar Node.js, streven we ernaar de barrière te verlagen naar toegang voor mensen die een bijdrage willen leveren aan de website.

## ⚡ Makkelijker deelname aan Open-Source

Als je [Nee hebt. s](https://nodejs.org) (8 of hoger) en [git](https://git-scm.org) geïnstalleerd op uw systeem, je kunt gemakkelijk de site lokaal draaien:

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

De nieuwe website is gehost op Heroku. We gebruiken pipelines van de implementatie en de functie [Review Apps](https://devcenter.heroku.com/articles/github-integration-review-apps) die automatisch een draaiende kopie van de app voor elk pull- verzoek maakt. Dit maakt het gemakkelijk voor beoordelaars om de werkelijke effecten van een pull-aanvraag op een live kopie van de site te bekijken.

## 🙏 Dankzij de bijdragers

We willen speciaal dank betuigen aan alle mensen over de hele wereld die hun eigen tijd en energie hebben bijgedragen om Electron te helpen verbeteren. De passie van de open-source gemeenschap heeft enorm geholpen om Electron tot een succes te maken. Dank u wel!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>