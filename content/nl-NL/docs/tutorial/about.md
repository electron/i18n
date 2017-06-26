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

Due to the hard dependency on Node.js and Chromium, Electron is in a tricky versioning position and [does not follow `semver`](http://semver.org). You should therefore always reference a specific version of Electron. [Read more about Electron's versioning](https://electron.atom.io/docs/tutorial/electron-versioning/) or see the [versions currently in use](https://electron.atom.io/#electron-versions).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electron.atom.io/blog/2016/05/11/electron-1-0).

## Core Philosophy

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electron.atom.io/community).

## History

Below are milestones in Electron's history.

| :calendar:      | :tada:                                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| **April 2013**  | [Atom Shell is started](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).        |
| **May 2014**    | [Atom Shell is open sourced](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                            |
| **April 2015**  | [Atom Shell is re-named Electron](https://github.com/electron/electron/pull/1389).                                    |
| **May 2016**    | [Electron releases `v1.0.0`](https://electron.atom.io/blog/2016/05/11/electron-1-0).                                  |
| **May 2016**    | [Electron apps compatible with Mac App Store](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide). |
| **August 2016** | [Windows Store support for Electron apps](https://electron.atom.io/docs/tutorial/windows-store-guide).                |