# Over Electron

[Electron](https://electronjs.org) is een opensourcebibliotheek ontwikkeld door GitHub voor het bouwen van cross-platform bureaubladapplicaties met HTML, CSS en JavaScript. Electron bereikt dit door [Chromium](https://www.chromium.org/Home) te combineren met [Node.js](https://nodejs.org) tot een enkele runtime en apps kunnen verpakt worden voor Mac, Windows en Linux.

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Lees verder voor meer informatie over de bijdragers en releases van Electron of start het bouwen met Electron in de [Quick Start Guide](quick-start.md).

## Kernteam en bijdragers

Electron wordt onderhouden door een team bij GitHub en door een groep [actieve bijdragers](https://github.com/electron/electron/graphs/contributors) van de gemeenschap. Sommige van de bijdragers zijn individuelen en werken bij grotere bedrijven die zich op Electron ontwikkelen. Het doet ons deugd om frequente bijdragers aan het project toe te voegen als onderhouders. Lees eer over [bijdragen aan Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Releases

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### Bijwerken van afhankelijkheden

De Chromium versie van Electron wordt gewoonlijk geüpdatet binnen één of twee weken nadat een nieuwe stabiele versie van Chromium vrij is gekomen, afhankelijk van de inspanning die nodig is voor de upgrade.

Wanneer een nieuwe versie van Node.js vrij is gekomen, wacht Electron gewoonlijk ongeveer een maand voordat het upgradet zodat het een stabiele versie zal zijn.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this _just works_ but sometimes it means patching Node.js.


### Versies

Vanaf versie 2.0 volgt Electron [`semver`](https://semver.org). Voor de meeste applicaties is het voldoende om `$ npm install electron` uit te voeren met een recente versie van npm.

Het versieupdateproces is in detail beschreven in onze [Versiebeheer Doc](electron-versioning.md).

### LTS

Langetermijnondersteuning van oudere versies van Electron bestaat momenteel niet. Als je huidige versie van Electron voor jou werkt, kun je er op blijven zolang je wilt. Als je gebruik wilt maken van nieuwe features wanneer deze beschikbaar zijn, moet je upgraden naar een nieuwere versie.

Er kwam een grote update met versie `v1.0.0`. Als je deze versie nog niet gebruikt, moet je [meer lezen over de `v1.0.0` wijzigingen](https://electronjs.org/blog/electron-1-0).

## Kernfilosofie

Om Electron klein te houden (bestandsgrootte) en onderhoudbaar (de spreiding van afhankelijkheden en API's) houdt het project het werkterrein van de het kernproject gelimiteerd.

Bijvoorbeeld, Electron maakt gebruik van Chromium's rendering library inplaats van dat het gebruik maakt van heel Chromium. Dit zorgt ervoor dat het makkelijker is Chromium te upgraden, maar betekent ook dat sommige browser features van Google Chrome niet bestaan in Electron.

Nieuwe features toegevoegd door Electron moeten voornamelijk systeemeigen API's zijn. Als een feature zijn eigen Node.js module kan zijn, moet dit waarschijnlijk ook zo zijn. Bekijk de [Electron tools gebouwd door de gemeenschap](https://electronjs.org/community).

## Geschiedenis

Hieronder zijn mijlpalen in de geschiedenis van Electron.

| :calendar:        | :tada:                                                                                                         |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| **april 2013**    | [Atom Shell is gestart](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **mei 2016**      | [Atom Shell is open-sourced](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                    |
| **april 2015**    | [Atom Shell is hernoemd tot Electron](https://github.com/electron/electron/pull/1389).                         |
| **mei 2016**      | [Electron releast `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                         |
| **mei 2016**      | [Electron apps compatible met Mac App Store](mac-app-store-submission-guide.md).                               |
| **augustus 2016** | [Windows Store-ondersteuning voor Electron-apps](windows-store-guide.md).                                      |
