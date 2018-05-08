# Über Electron

[Electron](https://electronjs.org) ist eine Open-Source-Bibliothek, die von GitHub für das Erstellen von plattformübergreifenden Desktop-Anwendungen mit HTML, CSS und JavaScript, entwickelt wurde. Electron vollbringt dies durch das Kombinieren von [Chromium](https://www.chromium.org/Home) und [Node.js](https://nodejs.org) in einem einfachen Schritt, zum erstellen von Apps für Mac, Windows und Linux.

Electron wurde im Jahr 2013 als Framework entwickelt, auf welchem auch GitHubs anpassbarer Texteditor [Atom](https://atom.io) basiert. Beide wurden im Frühling 2014 unter einer Open-Source-Lizenz veröffentlicht.

Seitdem ist es für Open-Source-Entwickler, Startups und etablierte Unternehmen ein beliebtes Werkzeug geworden. [Schauen Sie sich an, wer mit Electron arbeitet](https://electronjs.org/apps).

Lesen Sie weiter, um mehr über die Mitwirkenden und Veröffentlichungen von Electron zu erfahren oder beginnen Sie sofort mit Electron über unsere [Schnellstart Anleitung](quick-start.md).

## Kernteam und Mitwirkende

Electron wird von einem Team auf GitHub sowie von einer Gruppen von [aktiven Mitwirkenden](https://github.com/electron/electron/graphs/contributors) aus der Community betreut. Einige Mitwirkende sind Privatpersonen und andere arbeiten bei größeren Unternehmen, welche mit Electron entwickeln. Wir freuen uns, dass wir regelmäßig Mitwirkende als Betreuer zu diesem Projekt hinzufügen können. Lesen Sie mehr darüber, wie man [bei Electron mitwirken](https://github.com/electron/electron/blob/master/CONTRIBUTING.md) kann.

## Versionen

[Electron veröffentlicht regelmäßig neue Versionen](https://github.com/electron/electron/releases). Wir veröffentlichen neue Versionen, wenn es grundlegende Bugfixes, neue API's oder aktuellere Versionen von Chromium bzw. Node.js gibt.

### Aktualisierung der Abhängigkeiten

Die Electronversion von Chromium wird in der Regel nach zwei oder drei Wochen, wenn eine neue stabile Version von Chromium verfügbar ist, abhängig vom Aufwand der Aktualisierung, erneuert.

Wenn eine neue stabile Version von Node.js veröffentlicht wird, wartet Electron in der Regel ungefähr einen Monat, bevor Electron auf die neue Version aktualisiert, um eine stabilere Version zu garantieren.

In Electron teilen sich Node.js und Chromium eine einzelne V8-Instanz - überlicherweise die Version, die Chromium aktuell verwendet. Die meiste Zeit *funktioniert* das, manchmal jedoch muss Node.js gepatched werden.

### Versionierung

Seit Version 2.0 folgt Electron den Regeln des [`SemVer`](https://semver.org) (Semantic Versioning). Für die meisten Anwendungen und die aktuelle Version von npm sollte `$ npm install electron` genügen.

Der Updateprozess ist in unser [Versionierungs-Dokumentation](electron-versioning.md) detailliert beschrieben.

### Langzeitunterstützung

Ein langfristiger Support für ältere Versionen von Electron existiert derzeit nicht. Wenn Ihre aktuelle Version von Electron in Ihren Augen funktioniert, können Sie diese solange nutzen, wie Sie wollen. Wenn Sie neuere Funktionen verwenden möchten, sollten sie auch auf neuere Versionen upgraden.

Ein Haupt-Update kam mit der Version `v1.0.0`. Wenn Sie aktuell diese Version noch nicht verwenden, sollten Sie mehr über die [Veränderungen von `v1.0.0` lesen](https://electronjs.org/blog/electron-1-0).

## Kernphilosophie

Um Electron klein (Dateigröße) und nachhaltig (die Verbreitung von Abhängigkeiten und API's) zu halten, begrenzt das Projekt den Umfang des Kernprojekts.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. Dies macht es einfacher, Chromium zu aktualisieren, was aber auch heißt, dass manche Funktionen aus Google Chrome in Electron nicht funktionieren.

Neu zu Electron hinzugefügte Funktionen sollten in erste Linie systemeigene API's sein. Wenn eine Funktion ein eigenes Node.js-Model ist, dann soll dies wahrscheinlich auch so sein. Schauen Sie sich die [Electron-Tools an, die von der Community entwickelt wurden](https://electronjs.org/community).

## Verlauf

Im folgenden finden Sie die Meilensteine in der Entwicklungsgeschichte Electrons.

| :calendar:      | :tada:                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **April 2013**  | ['Atom Shell' wird gestartet](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).                      |
| **Mai 2014**    | [Das Grundgerüst Atoms wird unter einer Open-Source-Lizenz veröffentlicht](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html). |
| **April 2015**  | ['Atom Shell' wird in Electron umbenannt](https://github.com/electron/electron/pull/1389).                                                |
| **Mai 2016**    | [Electron veröffentlicht `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                                             |
| **Mai 2016**    | [Electron-Apps werden mit dem Mac App Store kompatibel](mac-app-store-submission-guide.md).                                               |
| **August 2016** | [Windows Store unterstützt Electron-Apps](windows-store-guide.md).                                                                        |