---
title: Elektron Benutzerland
author: zeke
date: '2016-12-20'
---

We've added a new [userland](https://electronjs.org/userland) section to the Electron website to help users discover the people, packages, and apps that make up our flourishing open-source ecosystem.

---

[![github-contributors](https://cloud.githubusercontent.com/assets/2289/21205352/a873f86c-c210-11e6-9a92-1ef37dfc986b.png)](https://electronjs.org/userland)

## Ursprung von Userland

In Userland treffen sich Menschen in Software-Communities zusammen, um Tools und Ideen auszutauschen. Der Begriff stammt aus der Unix-Gemeinschaft , wo es auf jedes Programm verwies, das außerhalb des Kernels lief, aber heute bedeutet es etwas mehr. Wenn sich Leute in der heutigen Javascript-Community auf Benutzerland beziehen, sprechen sie normalerweise über die [npm Paketregistry](http://npm.im). Hier passiert der Großteil der Experimente und Innovation während Knoten und die JavaScript-Sprache (wie der Unix-Kernel) einen relativ kleinen und stabilen Satz von Kernfunktionen beibehalten.

## Knoten und Elektron

Wie Node hat Electron ein kleines Set von Kern-APIs. Diese bieten die grundlegenden Funktionen, die für die Entwicklung von Desktopanwendungen mit mehreren Plattformen benötigt werden. Diese Design-Philosophie ermöglicht es Electron, ein flexibles Werkzeug zu sein, ohne zu stark in der Art, wie es benutzt werden kann, einzuschränken.

Userland ist das Gegenstück zu "Kern", so dass Benutzer Tools erstellen und teilen können, die die Funktionalität von Electronic erweitern.

## Sammeln von Daten

Um die Trends in unserem Ökosystem besser zu verstehen, analysieren wir Metadaten aus 15 00 öffentliche GitHub Repositories die von `Elektron` oder `Elektron vorkompiliert` abhängig sind

Wir haben die [GitHub API](https://developer.github.com/v3/), die [Bibliotheken verwendet. o API](https://libraries.io/api), und die npm Registry um Informationen über Abhängigkeiten zu sammeln, Entwicklungsabhängigkeiten, -abhängige Personen, Paketautoren und Repo-Mitwirkende, Downloadzähler, Gabelzähler, Stargazer Zähler, usw.

Wir haben diese Daten dann verwendet, um folgende Berichte zu erstellen:

- [Abhängigkeiten bei der Anwendungsentwicklung](https://electronjs.org/userland/dev_dependencies): Pakete werden am häufigsten unter `devDependencies` in Electron-Apps aufgelistet.
- [GitHub Mitwirkende](https://electronjs.org/userland/github_contributors): GitHub Nutzer, die zu zahlreichen Elektron-bezogenen GitHub Repositories beigetragen haben.
- [Paket-Abhängigkeiten](https://electronjs.org/userland/package_dependencies): Elektron-bezogene npm-Pakete, die häufig von anderen npm-Paketen abhängig sind.
- [Favorisierte Apps](https://electronjs.org/userland/starred_apps): Elektron-Apps (die keine NPM-Pakete sind) mit zahlreichen Stargazern.
- [Meiste heruntergeladene Pakete](https://electronjs.org/userland/most_downloaded_packages): Elektron-bezogene npm-Pakete, die eine Menge heruntergeladen werden.
- [App-Abhängigkeiten](https://electronjs.org/userland/dependencies): Pakete werden am häufigsten unter `Abhängigkeiten` in Electron-Apps aufgelistet.
- [Paketautoren](https://electronjs.org/userland/package_authors): Die produktivsten Autoren von Electron-bezogenen npm-Paketen.

## Filter-Ergebnisse

Berichte wie [App-Abhängigkeiten](https://electronjs.org/userland/dependencies) und [markierte Apps](https://electronjs.org/userland/starred_apps) welche Pakete auflisten, Apps und Repos haben eine Texteingabe, die verwendet werden kann, um die Ergebnisse zu filtern.

Während Sie diese Eingabe eingeben, wird die URL der Seite dynamisch aktualisiert. Mit diesem kannst du eine URL kopieren, die ein bestimmtes Stück Benutzerlanddaten repräsentiert, und dann mit anderen teilen.

[![babel](https://cloud.githubusercontent.com/assets/2289/21328807/7bfa75e4-c5ea-11e6-8212-0e7988b367fd.png) ](https://electronjs.org/userland/dev_dependencies?q=babel%20preset)

## Mehr wird kommen

Diese ersten Berichte sind erst der Anfang. Wir sammeln weiterhin Daten darüber, wie die Community Electron baut, und werden neue Berichte auf der Webseite hinzufügen.

Alle Werkzeuge, die zum Sammeln und Anzeigen dieser Daten verwendet werden, sind Open-Source:

- [electron/electronjs.org](https://github.com/electron/electron.atom): Die Electron-Website.
- [Elektronik/Elektron-Userland-Reports](https://github.com/electron/electron-userland-reports): Slices of data about packages and repos, and users in Electron userland.
- [electron/repos-using-electron](https://github.com/electron/repos-using-electron): Alle öffentlichen Repositories auf GitHub, die von `Elektron` oder `Elektron vorkompiliert`
- [electron/electron-npm-packages](https://github.com/zeke/electron-npm-packages): Alle npm Pakete, die `electron` in ihrer `package.json` Datei erwähnen.

Wenn Sie Ideen haben, wie Sie diese Berichte verbessern können bitte teilen Sie uns [mit, dass ein Problem im Website-Repository](https://github.com/electron/electronjs.org/issues/new) oder einer der oben genannten Repositories eröffnet wird.

Danke an Sie, die Electron-Community, dass Sie Userland zu dem gemacht haben, was es heute ist!

