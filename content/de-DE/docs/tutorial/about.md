# Über Electron

[Electron](https://electronjs.org) is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. Electron vollbringt dies durch das Kombinieren von [Chromium](https://www.chromium.org/Home) und [Node.js](https://nodejs.org) in einem einfach Schritt, zum erstellen von Apps für Mac, Windows und Linux.

Electron wurde im Jahr 2013 als Framework entwickelt, auf welchem auch GitHubs anpassbarer Texteditor [Atom](https://atom.io) basiert. Beide wurden im Frühling 2014 unter einer Open-Source-Lizenz veröffentlicht.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

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

As of version 2.0 Electron [follows `semver`](http://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## Kernphilosophie

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## Verlauf

Below are milestones in Electron's history.

| :calendar:      | :tada:                                                                                                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **April 2013**  | [Das Grundgerüst für Atom wird gestartet](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).         |
| **Mai 2014**    | [Das Grundgerüst Atoms wird unter einer Open-Source-Lizenz veröffentlicht](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html). |
| **April 2015**  | [Das Grundgerüst Atoms wird in Electron umbenannt](https://github.com/electron/electron/pull/1389).                                      |
| **Mai 2016**    | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                                                  |
| **Mai 2016**    | [Electron apps compatible with Mac App Store](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide).                      |
| **August 2016** | [Windows Store support for Electron apps](https://electronjs.org/docs/tutorial/windows-store-guide).                                     |