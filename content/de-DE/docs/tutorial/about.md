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