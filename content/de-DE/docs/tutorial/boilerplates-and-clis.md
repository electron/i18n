# Boilerplates und CLIs

Die Entwicklung von Electron ist nicht dogmatisch - es gibt nicht "die richtige Methode", um eine Electron-Anwendung zu entwickeln, bauen, verpacken oder veröffentlichen. Zusätzliche Funktionen für Electron, sowohl für die Build- als auch für die Laufzeit, können im [npm](https://www.npmjs.com/search?q=electron) in Form von individuellen Paketen gefunden werden, was Entwicklern erlaubt, sowohl App als auch Build-Pipeline zu erstellen, die sie brauchen.

Dieses Level an Modularität und Erweiterbarkeit stellt sicher, dass jede Entwickler, die mit Electron arbeiten, im kleinem wie auch im großen Team, zu keinem Zeitpunkt in ihrem Entwicklungszyklus in dem was sie tun oder nicht tun können eingeschränkt sind. Allerdings können von der Community getragene Boilerplates oder Befehlszeilentools das Kompilieren, Verpacken und Veröffentlichen einer App für viele Entwickler erheblich vereinfachen.

## Boilerplate vs CLI

"Boilerplates" kann man sich wie eine unbemalte Leinwand vorstellen, die als Einstiegspunkt für die Entwicklung einer Anwendung dienen. Sie liegen in der Regel in Form eines Repositories vor, das man klonen und anschließend nach eigenen Wünschen individualisieren kann.

Kommandozeilenwerkzeuge (CLI) hingegen unterstützen den Entwickler auch weiterhin während den verschiedenen Phasen der Entwicklung und Veröffentlichung. Sie sind hilfreicher und wirken unterstützend, erzwingen aber diverse Richtlinien bezogen auf den Aufbau und die Struktur des Programms. *Speziell für Anfänger ist die Verwendung eines Befehlszeilenwerkzeugs häufig hilfreich*.

## electron-forge

Ein "vollständiges Werkzeug für die Erstellung moderner Electron-Anwendungen". Electron Forge vereint die vorhandenen (und gut gepflegten) Build-Werkzeuge für die Electron-Entwicklung in ein zusammenhängendes Paket, mit dessen Hilfe jeder direkt in die Electron-Entwicklung einsteigen kann.

Forge wird mit [einer einsatzbereiten Schablone](https://electronforge.io/templates) geliefert und nutzt Webpack als Modul-Packer. Es enthält eine beispielhafte TypeScript-Konfiguration und bietet zwei Konfigurationsdateien, um so eine einfache Anpassung zu ermöglichen. Es verwendet die gleichen Kernmodule, die von der größeren Electron-Community verwendet werden (wie [`Electron-Packager`](https://github.com/electron/electron-packager)) – Änderungen, die von den Electron-Betreuern vorgenommen wurden (wie Slack) profitieren von den Benutzern von Forge, auch.

Weitere Informationen und die Dokumentation ist auf [electronforge.io](https://electronforge.io/) verfügbar.

## electron-builder

Eine "Komplettlösung, um eine "ready-for-distribution Electron App" zu erstellen , die sich auf ein integriertes Erlebnis konzentriert. [`Elektron-Builder`](https://github.com/electron-userland/electron-builder) fügt eine Einzelabhängigkeit hinzu, die sich auf Einfachheit konzentriert und verwaltet alle weiteren Anforderungen intern.

`Elektron-Builder` ersetzt Funktionen und Module, die von den Electron- Maintainern (wie dem Auto-Updater) verwendet werden, durch benutzerdefinierte. Sie sind im Allgemeinen enger integriert, werden aber weniger gemeinsam mit den beliebten Electron-Apps wie Atom, Visual Studio Code oder Slack haben.

Weitere Informationen und Dokumentation finden Sie im [Projektarchiv](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

Wenn du kein Tool benötigst, sondern nur ein stabiles Fundament auf dem du bauen kannst, dann könnte CT Lins [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) einen Blick wert sein. Es ist recht beliebt in der Community und verwendet intern `elektron-builder`.

## Andere Tools und Boilerplates

Die ["Awesome Electron" Liste](https://github.com/sindresorhus/awesome-electron#boilerplates) enthält weitere Werkzeuge und Boilerplatten zur Auswahl. Wenn du die Länge der Liste einschüchternd findest, vergesse nicht, dass das spätere Hinzufügen von Tools auch ein brauchbarer Ansatz ist.
