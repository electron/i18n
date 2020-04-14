# Boilerplates und CLIs

Electron development is unopinionated - there is no "one true way" to develop, build, package, or release an Electron application. Additional features for Electron, both for build- and run-time, can usually be found on [npm](https://www.npmjs.com/search?q=electron) in individual packages, allowing developers to build both the app and build pipeline they need.

That level of modularity and extendability ensures that all developers working with Electron, both big and small in team-size, are never restricted in what they can or cannot do at any time during their development lifecycle. However, for many developers, one of the community-driven boilerplates or command line tools might make it dramatically easier to compile, package, and release an app.

## Boilerplate vs CLI

"Boilerplates" kann man sich wie eine unbemalte Leinwand vorstellen, die als Einstiegspunkt für die Entwicklung einer Anwendung dienen. Sie liegen in der Regel in Form eines Repositories vor, das man klonen und anschließend nach eigenen Wünschen individualisieren kann.

Kommandozeilenwerkzeuge (CLI) hingegen unterstützen den Entwickler auch weiterhin während den verschiedenen Phasen der Entwicklung und Veröffentlichung. Sie sind hilfreicher und wirken unterstützend, erzwingen aber diverse Richtlinien bezogen auf den Aufbau und die Struktur des Programms. *Speziell für Anfänger ist die Verwendung eines Befehlszeilenwerkzeugs häufig hilfreich*.

## electron-forge

Ein "vollständiges Werkzeug für die Erstellung moderner Electron-Anwendungen". Electron Forge vereint die vorhandenen (und gut gepflegten) Build-Werkzeuge für die Electron-Entwicklung in ein zusammenhängendes Paket, mit dessen Hilfe jeder direkt in die Electron-Entwicklung einsteigen kann.

Forge wird mit [einer einsatzbereiten Schablone](https://electronforge.io/templates) geliefert und nutzt Webpack als Modul-Packer. Es enthält eine beispielhafte TypeScript-Konfiguration und bietet zwei Konfigurationsdateien, um so eine einfache Anpassung zu ermöglichen. Außerdem verwendet es die gleichen Kernmodule, wie sie vom Großteil der Electron-Gemeinschaft (wie [`electron-packager`](https://github.com/electron/electron-packager)) genutzt werden - Benutzer von Forge profitieren von den Änderung, die von den Electron-Maintainern (wie bspw. Slack) vorgenommen werden.

Weitere Informationen und die Dokumentation ist auf [electronforge.io](https://electronforge.io/) verfügbar.

## electron-builder

A "complete solution to package and build a ready-for-distribution Electron app" that focuses on an integrated experience. [`electron-builder`](https://github.com/electron-userland/electron-builder) adds one single dependency focused on simplicity and manages all further requirements internally.

`electron-builder` replaces features and modules used by the Electron maintainers (such as the auto-updater) with custom ones. They are generally tighter integrated but will have less in common with popular Electron apps like Atom, Visual Studio Code, or Slack.

You can find more information and documentation in [the repository](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

If you don't want any tools but only a solid boilerplate to build from, CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) might be worth a look. It's quite popular in the community and uses `electron-builder` internally.

## Andere Tools und Boilerplates

The ["Awesome Electron" list](https://github.com/sindresorhus/awesome-electron#boilerplates) contains more tools and boilerplates to choose from. If you find the length of the list intimidating, don't forget that adding tools as you go along is a valid approach, too.
