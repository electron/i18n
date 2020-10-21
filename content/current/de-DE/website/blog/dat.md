---
title: 'Projekt der Woche: Dat'
author:
  - karissa
  - yoshuawuyts
  - maxogden
  - zeke
date: '2017-02-21'
---

Das in dieser Woche vorgestellte Projekt ist [Dat](https://datproject.org/), ein [Fördergelder](https://changelog.com/rfc/6), Open Source, dezentralisiertes Werkzeug für die Verteilung von Datensätzen. Dat wird von einem [geoverteilten Team](https://datproject.org/team)gebaut und gepflegt, von dem viele geholfen haben, diesen Beitrag zu schreiben.

---

[![Ein Screenshot der Hauptansicht des Daten-Desktops mit einigen Zeilen geteilter
Daten](https://cloud.githubusercontent.com/assets/2289/23175925/dbaee7ec-f815-11e6-80cc-3041203c7842.png)](https://github.com/datproject/dat-desktop)

## Zunächst zu welchem Datum?

Wir wollten die besten Teile von Peer zu Peer und verteilten Systemen zum Datenaustausch bringen. Wir begannen mit der gemeinsamen Nutzung wissenschaftlicher Daten und begannen daraufhin auch Forschungseinrichtungen, Behörden, öffentliche Dienste und Open-Source-Teams.

Eine andere Möglichkeit, darüber nachzudenken, ist eine Synchronisierung und Upload App wie Dropbox oder BitTorrent Sync, außer Dat ist [Open Source](https://github.com/datproject). Unser Ziel ist es, eine leistungsstarke, quelloffene, gemeinnützige Datenaustauschsoftware für große, kleine, mittelständische, kleine und große Datenmengen zu sein.

Um das `dat` CLI Tool zu verwenden, müssen Sie nur folgendes eintippen:

```sh
dat Freigabepfad/zum/mein/Ordner
```

Und dat erstellt einen Link, den Sie verwenden können, um diesen Ordner an jemanden zu senden -- keine zentralen Server oder Dritte erhalten Zugriff auf Ihre Daten. Im Gegensatz zu BitTorrent ist es auch unmöglich herauszufinden, wer was teilt ([siehe Dat Paper Entwurf für weitere Details](https://github.com/datproject/docs/blob/master/papers/dat-paper.md)).

## Jetzt wissen wir, was Dat ist. Wie passt Dat Desktop?

[Dat Desktop](https://github.com/datproject/dat-desktop) ist eine Möglichkeit, Dat Leuten zugänglich zu machen, die die Kommandozeile nicht verwenden können oder wollen. Sie können mehrere Daten auf Ihrem Rechner hosten und die Daten über Ihr Netzwerk bedienen.

## Kannst du einige coole Anwendungsfälle teilen?

### DataRefuge + Projekt Svalbard

Wir arbeiten an einer Sache mit dem Codenamen [Project Svalbard](https://github.com/datproject/svalbard) die mit [DataRefuge](http://www.ppehlab.org/datarefuge)in Zusammenhang steht eine Gruppe, die daran arbeitet, die vom Verschwinden bedrohten staatlichen Klimadaten zu stützen. Svalbard ist nach dem Svalbard Global Seed Vault in der Arktis benannt, der eine große unterirdische Backup-Bibliothek der Pflanze DNA hat. Unsere Version ist eine große Version kontrollierte Sammlung von öffentlichen wissenschaftlichen Daten. Sobald wir die Metadaten kennen und vertrauen können, können wir andere coole Projekte wie ein [verteiltes Volunteerdatenspeichernetz](https://github.com/datproject/datasilo/) bauen.

### Kalifornien Bürgerdatenkoalition

[CACivicData](http://www.californiacivicdata.org/) ist ein Open-Source-Archiv, das tägliche Downloads von CAL-ACCESS, Kaliforniens Datenbank zur Verfolgung von Geldern in der Politik bereitstellt. Sie machen [tägliche Veröffentlichungen](http://calaccess.californiacivicdata.org/downloads/0), was bedeutet, dass viele doppelte Daten über ihre Zip-Dateien verteilt sind. Wir arbeiten daran, ihre Daten als DAT-Repository zu verwalten, was die Menge an Aufwand und Bandbreite verringert, die benötigt wird, um auf eine bestimmte Version zu verweisen oder auf eine neuere Version zu aktualisieren.

## Electron-Updates

Dies ist noch nicht konkret, aber wir denken, dass ein lustiger Anwendungsfall eine kompilierte Electron-App in ein Dat Repository setzen würde, dann verwenden Sie einen Dat-Client in Electron, um die neuesten Deltas der Build-App-Binärdatei zu ziehen zu sparen, aber auch die Bandbreitenkosten für den Server zu reduzieren.

## Wer sollte Dat Desktop verwenden?

Jeder, der Daten über ein p2p-Netzwerk austauschen und aktualisieren möchte. Datenwissenschaftler, offene Datenhacker, Forscher, Entwickler. Wir sind super offen für Feedback, wenn jemand einen coolen Anwendungsfall hat, den wir noch nicht gedacht haben. Du kannst durch unseren [Gitter Chat](https://gitter.im/datproject/discussions) fallen lassen und uns etwas fragen!

## Was kommt als nächstes in Dat und Dat Desktop?

Benutzerkonten und Metadatenveröffentlichung. Wir arbeiten an einer Dat Registry Web-App, die am [Datenprojekt eingesetzt werden soll. rg](https://datproject.org/) was im Grunde eine 'NPM für Daten' sein wird mit Ausnahme des Vorbehalts werden wir nur ein Metadaten-Verzeichnis sein und die Daten können überall online leben (im Gegensatz zu NPM oder GitHub, wo alle Daten zentral gehostet werden, weil der Quellcode klein genug ist, können Sie alles in ein System einbauen). Da viele Datensätze riesig sind, brauchen wir eine föderierte Registrierungsstelle (wie bei BitTorrent-Trackers funktioniert). Wir möchten es den Leuten erleichtern, Datensätze mit der Registrierung von Dat Desktop zu finden oder zu veröffentlichen, um den Datenaustauschprozess reibungslos zu machen.

Eine weitere Funktion sind Multi-Writer/Collaborative Ordner. Wir haben große Pläne, um gemeinsame Arbeitsabläufe durchzuführen, vielleicht mit Branchen, ähnlich wie git, außer die um die Zusammenarbeit mit Datensätzen konzipiert sind. Aber wir arbeiten noch immer an der allgemeinen Stabilität und der Standardisierung unserer Protokolle!

## Warum haben Sie sich entschieden, Dat Desktop auf Electronic zu bauen?

Dat wird mit Node.js gebaut, so dass es eine natürliche Anpassung für unsere Integration. Darüber hinaus verwenden unsere Benutzer eine Vielzahl von Maschinen seit Wissenschaftlern, Forscher und Regierungsbeamte könnten gezwungen sein, bestimmte Setups für ihre Institutionen zu verwenden -- das bedeutet, dass wir in der Lage sein müssen, Windows und Linux sowie Mac zu adressieren. Dat Desktop gibt uns das ganz einfach.

## Was sind einige Herausforderungen, denen Sie beim Erstellen von Dat und Dat Desktop gegenüberstehen?

Erfahren Sie, was die Menschen wollen. Wir haben mit Tabellendatensätzen begonnen aber wir erkannten, dass es ein bisschen kompliziertes Problem zu lösen war und dass die meisten Leute keine Datenbanken verwenden. Auf halbem Weg durch das Projekt haben wir alles von Grund auf neu gestaltet, um ein Dateisystem zu verwenden und haben nicht zurück geschaut.

Wir sind auch auf einige allgemeine Probleme der Electron-Infrastruktur gestoßen, unter anderem:

- Telemetrie - Wie erfassen Sie anonyme Nutzungsstatistiken
- Updates - Es ist eine Art Stückwerk und Magie, automatische Updates einzurichten
- Releases - XCode Signing, Aufbau von Releases auf Travis, Beta-Builds, alle waren Herausforderungen.

We also use Browserify and some cool Browserify Transforms on the 'front end' code in Dat Desktop (which is kind of weird because we still bundle even though we have native `require` -- but it's because we want the Transforms). Um unser CSS besser verwalten zu können, haben wir von Sass auf [umgestellt](https://github.com/stackcss/sheetify). Es hat uns sehr geholfen, unser CSS zu modularisieren und es einfacher gemacht, unsere UI zu einer komponentenorientierten Architektur mit gemeinsamen Abhängigkeiten zu bewegen. Zum Beispiel [Datenfarben](https://github.com/Kriesse/dat-colors) enthalten alle unsere Farben und werden auf alle unsere Projekte aufgeteilt.

Wir waren schon immer ein großer Fan von Standards und minimalen Abstraktionen. Unsere gesamte Schnittstelle wird mit regulären DOM-Knoten mit nur wenigen Helfer-Bibliotheken gebaut. Wir haben begonnen, einige dieser Komponenten in [Base-Elemente](https://base.choo.io)zu verschieben, eine Bibliothek von Low-Level-wiederverwendbaren Komponenten. Wie bei den meisten unserer Technologien iterieren wir immer weiter, bis wir es richtig machen aber als Team haben wir das Gefühl, dass wir hier in die richtige Richtung gehen.

## In welchen Bereichen sollte Electron verbessert werden?

Wir denken, der größte Schmerzpunkt sind native Module. Wenn Sie Ihre Module für Electron mit npm neu aufbauen müssen, wird der Workflow zusätzlich kompliziert. Unser Team hat ein Modul namens [`prebuild`](http://npmjs.org/prebuild) entwickelt, das vordefinierte Binärdateien bearbeitet was für Knoten gut funktionierte, aber Electron-Workflows benötigten nach der Installation immer noch einen benutzerdefinierten Schritt, in der Regel `npm neu kompilieren`. Es war ärgerlich. Um dies zu beheben, haben wir kürzlich auf eine Strategie umgestellt, bei der wir alle binären Versionen aller Plattformen innerhalb des npm Tarballs bündeln. Das bedeutet, dass Tarballs größer werden (obwohl dies mit `optimiert werden kann. o` Dateien - freigegebene Bibliotheken), dieser Ansatz vermeidet das Ausführen von Skripten nach der Installation und vermeidet außerdem das `npm Run-Rebuild` Muster. Es bedeutet, dass `npm Installation` das Richtige für Electron zum ersten Mal tut.

## Was sind Ihre Lieblings-Dinge über Elektronik?

Die APIs scheinen ziemlich gut durchdacht, sie sind relativ stabil, und es macht eine ziemlich gute Arbeit mit Upstream Node Releases auf dem Laufenden zu bleiben, nicht viel anderes, was wir verlangen können!

## Irgendwelche Electron-Tipps, die für andere Entwickler nützlich sein könnten?

Wenn Sie native Module verwenden, geben Sie [prebuild](https://www.npmjs.com/package/prebuild) einen Schuss!

## Was ist der beste Weg, Dat Entwicklungen zu verfolgen?

Folgen Sie [@dat_project](https://twitter.com/dat_project) auf Twitter, oder abonnieren Sie unseren [E-Mail Newsletter](https://tinyletter.com/datdata).

