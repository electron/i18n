# Boilerplates und CLIs

Die Entwicklung von Electron ist nicht dogmatisch - es gibt nicht "die richtige Methode", um eine Electron-Anwendung zu entwickeln, bauen, verpacken oder veröffentlichen. Zusätzliche Funktionen für Electron, sowohl für die Build- als auch für die Laufzeit, können im [npm](https://www.npmjs.com/search?q=electron) in Form von individuellen Paketen gefunden werden, was Entwicklern erlaubt, sowohl App als auch Build-Pipeline zu erstellen, die sie brauchen.

Dieses Level an Modularität und Erweiterbarkeit stellt sicher, dass jede Entwickler, die mit Electron arbeiten, im kleinem wie auch im großen Team, zu keinem Zeitpunkt in ihrem Entwicklungszyklus in dem was sie tun oder nicht tun können eingeschränkt sind. Allerdings können von der Community getragene Boilerplates oder Befehlszeilentools das Kompilieren, Verpacken und Veröffentlichen einer App für viele Entwickler erheblich vereinfachen.

## Boilerplate vs CLI

"Boilerplates" kann man sich wie eine unbemalte Leinwand vorstellen, die als Einstiegspunkt für die Entwicklung einer Anwendung dienen. Sie liegen in der Regel in Form eines Repositories vor, das man klonen und anschließend nach eigenen Wünschen individualisieren kann.

Kommandozeilenwerkzeuge (CLI) hingegen unterstützen den Entwickler auch weiterhin während den verschiedenen Phasen der Entwicklung und Veröffentlichung. Sie sind hilfreicher und wirken unterstützend, erzwingen aber diverse Richtlinien bezogen auf den Aufbau und die Struktur des Programms. *Speziell für Anfänger ist die Verwendung eines Befehlszeilenwerkzeugs häufig hilfreich*.

## electron-forge

Ein "vollständiges Werkzeug für die Erstellung moderner Electron-Anwendungen". Electron Forge vereint die vorhandenen (und gut gepflegten) Build-Werkzeuge für die Electron-Entwicklung in ein zusammenhängendes Paket, mit dessen Hilfe jeder direkt in die Electron-Entwicklung einsteigen kann.

Forge wird mit [einer einsatzbereiten Schablone](https://electronforge.io/templates) geliefert und nutzt Webpack als Modul-Packer. Es enthält eine beispielhafte TypeScript-Konfiguration und bietet zwei Konfigurationsdateien, um so eine einfache Anpassung zu ermöglichen. It uses the same core modules used by the greater Electron community (like [`electron-packager`](https://github.com/electron/electron-packager)) – changes made by Electron maintainers (like Slack) benefit Forge's users, too.

Weitere Informationen und die Dokumentation ist auf [electronforge.io](https://electronforge.io/) verfügbar.

## electron-builder

A "complete solution to package and build a ready-for-distribution Electron app" that focuses on an integrated experience. [`electron-builder`](https://github.com/electron-userland/electron-builder) adds one single dependency focused on simplicity and manages all further requirements internally.

`electron-builder` replaces features and modules used by the Electron maintainers (such as the auto-updater) with custom ones. They are generally tighter integrated but will have less in common with popular Electron apps like Atom, Visual Studio Code, or Slack.

You can find more information and documentation in [the repository](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

Wenn du kein Tool benötigst, sondern nur ein stabiles Fundament auf dem du bauen kannst, dann könnte CT Lins [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) einen Blick wert sein. Es ist recht beliebt in der Community und verwendet intern `elektron-builder`.

## Andere Tools und Boilerplates

The ["Awesome Electron" list](https://github.com/sindresorhus/awesome-electron#boilerplates) contains more tools and boilerplates to choose from. Wenn du die Länge der Liste einschüchternd findest, vergesse nicht, dass das spätere Hinzufügen von Tools auch ein brauchbarer Ansatz ist.
