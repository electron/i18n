# Over Electron

[Electron](https://electron.atom.io) is een open source bibliotheek ontwikkeld door GitHub voor het bouwen van cross-platform bureaublad applicaties met HTML, CSS en JavaScript. Electron bereikt dit door [Chronium](https://www.chromium.org/Home) te combineren met [Node.js](https://nodejs.org) tot een enkele runtime en apps kunnen verpakt worden voor Mac, Wondows en Linux.

Electron is in 2013 begonnen als het kader waarop [Atom](https://atom.io), GitHub's hackbare teksteditor, gebouwd zou worden. De twee waren open sourced in het voorjaar van 2014.

Sindsdien is het een populaire tool geworden dat gebruikt wordt door open source ontwikkelaars, starters, en gevestigde bedrijven. [Bekijk wie er op Electron bouwt](https://electron.atom.io/apps/).

Lees verder voor meer informatie over de bijdragers en releases van Electron of start het bouwen met Electron in de [Quick Start Guide](quick-start.md).

## Kernteam en bijdragers

Electron wordt onderhouden door een team bij GitHub en door een groep [actieve bijdragers](https://github.com/electron/electron/graphs/contributors) van de gemeenschap. Sommige van de bijdragers zijn individuelen en werken bij grotere bedrijven die zich op Electron ontwikkelen. Het doet ons deugd om frequente bijdragers aan het project toe te voegen als onderhouders. Lees eer over [bijdragen aan Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Releases

[Electron relast](https://github.com/electron/electron/releases) regelmatig. We releasen wanneer er belangrijke bug fixes zijn, nieuwe API's of versies updaten van Chronium of Node.js.

### Bijwerken van afhankelijkheden

De Chromium versie van Electron wordt gewoonlijk geüpdatet binnen één of twee weken nadat een nieuwe stabiele versie van Chromium vrij is gekomen, afhankelijk van de inspanning die nodig is voor de upgrade.

Wanneer een nieuwe versie van Node.js vrij is gekomen, wacht Electron gewoonlijk ongeveer een maand voordat het upgradet zodat het een stabiele versie zal zijn.

In Electron delen Node.js en Chromium een enkel V8 exemplaar—meestal de versie die Chromium gebruikt. Meestal werkt deze *gewoon* maar soms betekent het Node.js patchen.

### Versies

Door de sterke afhankelijkheid van Node.js en Chromium, zit Electron in een lastig versie positie en [volgt het niet`semver`](http://semver.org). Je moet daarom altijd verwijzen naar een specifieke versie van Electron. [Lees meer over de versies van Electron](https://electron.atom.io/docs/tutorial/electron-versioning/) of bekijk de [versies die momenteel gebruikt worden](https://electron.atom.io/#electron-versions).

### LTS

Lange termijn support van oudere versies van Electron bestaat momenteel niet. Als je huidige versie van Electron voor jou werkt, kun je er op blijven zolang je wilt. Als je gebruik wilt maken van nieuwe features wanneer deze beschikbaar zijn, moet je upgraden naar een nieuwere versie.

Er kwam een grote update met versie `v1.0.0`. Als je deze versie nog niet gebruikt, moet je [meer lezen over de `v1.0.0` wijzigingen](https://electron.atom.io/blog/2016/05/11/electron-1-0).

## Kern filosofie

Om Electron klein te houden (bestandsgrootte) en onderhoudbaar (de spreiding van afhankelijkheden en API's) houdt het project het werkterrein van de het kernproject gelimiteerd.

Bijvoorbeeld, Electron gebruikt alleen de rendering bibliotheek van Chromium in plaats van alles van Chromium. Dit zorgt ervoor dat het makkelijker is Chromium te upgraden, maar betekent ook dat sommige browser features van Google Chrome niet bestaan in Electron.

Nieuwe features toegevoegd door Electron moeten voornamelijk systeemeigen API's zijn. Als een feature zijn eigen Node.js module kan zijn, moet dit waarschijnlijk ook zo zijn. Bekijk de [Electron tools gebouwd door de gemeenschap](https://electron.atom.io/community).

## Geschiedenis

Hieronder zijn mijlpalen in de geschiedenis van Electron.

| :calendar:      | :tada:                                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| **April 2013**  | [Atom Shell is started](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).        |
| **May 2014**    | [Atom Shell is open sourced](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                            |
| **April 2015**  | [Atom Shell is re-named Electron](https://github.com/electron/electron/pull/1389).                                    |
| **May 2016**    | [Electron releases `v1.0.0`](https://electron.atom.io/blog/2016/05/11/electron-1-0).                                  |
| **May 2016**    | [Electron apps compatible with Mac App Store](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide). |
| **August 2016** | [Windows Store support for Electron apps](https://electron.atom.io/docs/tutorial/windows-store-guide).                |