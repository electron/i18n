# Über Electron

[Electron](https://electron.atom.io) ist eine Open-Source-Bibliothek, die von GitHub für das Erstellen von plattformübergreifenden Desktop-Anwendungen mit HTML, CSS und JavaScript, entwickelt wurde. Electron vollbringt dies durch das Kombinieren von [Chromium](https://www.chromium.org/Home) und [Node.js](https://nodejs.org) in einem einfach Schritt, zum erstellen von Apps für Mac, Windows und Linux.

Electron wurde im Jahr 2013 als Framework entwickelt, auf welchem auch GitHubs anpassbarer Texteditor [Atom](https://atom.io) basiert. Beide wurden im Frühling 2014 unter einer Open-Source-Lizenz veröffentlicht.

Seitdem ist es für Open-Source-Entwickler, Startups und etablierte Unternehmen ein beliebtes Werkzeug geworden. [Schauen Sie vorbei, wer mit Electron arbeitet](https://electron.atom.io/apps/).

Lesen Sie weiter, um mehr über die Mitwirkenden und Veröffentlichungen von Electron zu erfahren oder beginnen Sie sofort mit Electron über unsere [Schnellstart Anleitung](quick-start.md).

## Kernteam und Mitwirkende

Electron wird von einem Team auf GitHub sowie von einer Gruppen von [aktiven Mitwirkenden](https://github.com/electron/electron/graphs/contributors) aus der Community betreut. Einige der Mitwirkenden sind Privatpersonen und andere arbeiten an größeren Unternehmen, welche mit Electron entwickeln. Wir freuen uns, dass wir regelmäßig Mitwirkende als Betreuer zu diesem Projekt hinzufügen können. Lesen Sie mehr darüber, wie man [bei Electron mitwirken](https://github.com/electron/electron/blob/master/CONTRIBUTING.md) kann.

## Veröffentlichungen

[Electron veröffentlicht regelmäßig neue Versionen](https://github.com/electron/electron/releases) Wir veröffentlichen neuen Versionen, wenn es grundlegende Bugfixes, neue API's oder aktuellere Versionen von Chromium bzw. Node.js gibt.

### Aktualisierung der Abhängigkeiten

Die Electronversion von Chromium wird in der Regel nach zwei oder drei Wochen, wenn eine neue stabile Version von Chromium verfügbar ist, abhängig vom Aufwand der Aktualisierung, erneuert.

Wenn eine neue stabile Version von Node.js veröffentlicht wird, wartet Electron in der Regel ungefähr einen Monat, bevor Electron auf die neue Version zu aktualisiert, um eine stabilere Version zu garantieren.

In Electron teilen sich Node.js und Chromium eine eine einzelne V8-Instanz - überlicherweise die Version, die Chromium aktuell verwendet. Die meiste Zeit *funktioniert* das, manchmal jedoch muss Node.js gepatched werden.

### Versionierung

Durch die große Abhängigkeit von Node.js und Chromium, ist Electron in einer komplizierten Versionierungsposition und [folgt nicht `Semver`](http://semver.org). Deshalb sollten Sie immer auf eine bestimmte Version von Electron verweisen. [Lesen Sie mehr über die Versionierung Electrons](https://electron.atom.io/docs/tutorial/electron-versioning/) oder schauen Sie, welche [welcher Version momentan genutzt wird](https://electron.atom.io/#electron-versions).

### LTS

Ein langfristiger Support für ältere Versionen von Electron existiert derzeit nicht. Wenn Ihre aktuelle Version von Electron in Ihren Augen funktioniert, können Sie diese solange nutzen, wie Sie wollen. Wenn Sie neuere Funktionen verwenden möchten, sollten sie auch auf neuere Versionen upgraden.

Ein Haupt-Update kam mit der Version `v1.0.0`. Wenn Sie aktuell diese Version noch nicht verwenden, sollten Sie mehr über die [Veränderungen von `v1.0.0` lesen](https://electron.atom.io/blog/2016/05/11/electron-1-0).

## Kernphilosophie

Um Electron klein (Dateigröße) und nachhaltig (die Verbreitung von Abhängigkeiten und API's) zu halten, begrenzt das Projekt den Umfang des Kernprojekts.

Beispielsweise verwendet Electron nur eine Render-Bibliothek, anstatt das gesamte Chromium. Dies macht es einfacher, Chromium zu aktualisieren, was aber auch heißt, dass manche Funktionen aus Google Chrome in Electron nicht funktionieren.

Neu zu Electron hinzugefügte Funktionen sollten in erste Linie systemeigene API's sein. Wenn eine Funktion ein eigenes Node.js Model ist, dann soll dies wahrscheinlich auch so sein. Schauen Sie zu den [Electron-Tools, die von der Community entwickelt wurden](https://electron.atom.io/community).

## Verlauf

Im folgenden finden Sie die Meilensteine in der Entwicklungsgeschichte Electrons.

| :calendar:      | :tada:                                                                                                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **April 2013**  | [Das Grundgerüst für Atom wird gestartet](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).         |
| **Mai 2014**    | [Das Grundgerüst Atoms wird unter einer Open-Source-Lizenz veröffentlicht](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html). |
| **April 2015**  | [Das Grundgerüst Atoms wird in Electron umbenannt](https://github.com/electron/electron/pull/1389).                                      |
| **Mai 2016**    | [Electron veröffentlicht `v1.0.0`](https://electron.atom.io/blog/2016/05/11/electron-1-0).                                               |
| **Mai 2016**    | [Electron-Apps werden mit dem Mac App Store kompatibel](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide).          |
| **August 2016** | [Windows Store unterstützt Electron-Apps](https://electron.atom.io/docs/tutorial/windows-store-guide).                                   |