---
title: 'Projekt der Woche: Beaker Browser'
author:
  - pfrazee
  - zeke
date: '2017-02-07'
---

Diese Woche haben wir [Paul Frazee](http://pfrazee.github.io/), Schöpfer von [Beaker Browser](https://beakerbrowser.com/) aufgeholt. Beaker ist ein experimenteller Peer-to-Peer-Web-Browser, der das Dat-Protokoll verwendet, um Websites von Benutzergeräten zu verwalten.

---<iframe width="100%" height="420" src="https://www.youtube.com/embed/Bem9nRpyPEs" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

## Was ist Beaker und warum hast du es geschafft?

Beaker ist ein partizipatorischer Browser. Es ist ein Browser für Indie-Hacker.

Das Web ist geschlossene Quelle. Wenn Sie beeinflussen wollen, wie Social Media funktioniert, müssen Sie bei Facebook oder Twitter arbeiten. Für die Suche, Google. Die Kontrolle liegt in den Händen der Unternehmen und nicht in den Händen der Nutzer selbst.

Mit Beaker haben wir ein neues Web-Protokoll: den [dezentralisierten Archivtransport](https://datprotocol.com). "Dat." It creates sites on demand, for free, and then shares them from the device. Keine Server erforderlich. Das ist unsere Innovation.

![Beakers Protokolle](https://cloud.githubusercontent.com/assets/2289/22560648/3defed5c-e92a-11e6-93f8-956cafafe3be.jpg)

Wenn Sie eine Dat vor Ort in Beaker besuchen, laden Sie die Dateien herunter. Die Seite ist ewig, für immer. Sie können es speichern, forken, ändern und Ihre neue Version kostenlos freigeben. Es ist alles Open-Source.

Darum geht es auch: Wir machen einen Browser für Open-Source-Websites. Wir wollen, dass es ein Toolkit für Social Hacking ist.

## Wer sollte Beaker verwenden?

Hacker. Modder. Kreative Typen. Menschen, die gerne basteln.

## Wie erstelle ich ein neues Projekt, das Daten verwendet?

Wir haben [ein Kommandozeilenwerkzeug namens bkr](https://github.com/beakerbrowser/bkr) bekommen, das wie git + npm. Hier ist die Erstellung einer Site:

```bash
$ cd ~/my-site
$ bkr init
$ echo "Hallo, world!" > index.html
$ bkr veröffentlichen
```

Und hier ist Forking eine Website:

```bash
$ bkr fork dat://0ff7d4c7644d0aa19914247dc5dbf502d6a02ea89a5145e7b178d57db00504cd/ ~/my-fork
$ cd ~/my-fork
$ echo "Meine Fork hat keine Rücksicht auf den vorherigen Index. > index.html
$ bkr veröffentlichen
```

Diese Seiten werden dann aus Ihrem Browser gehostet. Es ist ein wenig wie BitTorrent; Sie teilen die Seiten in einem P2P-Netz.

Wenn Sie eine GUI wollen, haben wir einige grundlegende Tools im Browser eingebaut, aber wir schieben diese Tools in die Benutzerländer. Es wird alles modifizierbar Benutzeranwendungen sein.

## Warum haben Sie Beaker auf Electronic gebaut?

Für dieses Projekt war es offensichtlich. Wenn ich selbst Chrome geforscht habe, würde ich jetzt C++ schreiben! Niemand will das tun. Ich kenne den Webstack, und ich kann schnell damit arbeiten. Es ist kein Gehirn.

Die Wahrheit ist, ich bin mir nicht sicher, ob ich etwas davon ohne Electron tun könnte. Es ist ein großartiges Stück Software.

## Was sind einige Herausforderungen, denen du beim Bau von Beaker begegnet?

Die Hälfte davon steckt an den Werkzeugen und stellt sich heraus, mit wie viel ich herauskommen kann.

Der Browser selbst zu machen war ziemlich einfach. Electron ist praktisch ein Toolkit zur Erstellung von Browsern. ...mit Ausnahme der Browser-Registerkarten; das hat mich ewig gekostet, um richtig zu gehen. Ich bin schließlich gescheitert und habe gelernt, SVGs zu machen. Es ist viel besser zu schauen, aber es dauerte 3 oder 4 Iterationen, bevor ich das richtig gemacht habe.

## In welchen Bereichen sollte Electron verbessert werden?

Es wäre wirklich toll, wenn ich die devtools in einem Webview andocken könnte.

## Was kommt als nächstes in Beaker?

Sichere DNS-Namen für Dat-Sites. Ein sozial konfigurierbares URL-Schema, genannt ["App-Schema".](https://github.com/beakerbrowser/beaker/wiki/App-Scheme) Weitere Dat APIs.

## Für Leute, die sich für das Projekt interessieren, in welchen Bereichen braucht Beaker Hilfe?

Wir haben viele offene Fragen. Haben Sie keine Angst, mich zu pingen. #Beakerbrowser auf Freenode. Wir behalten eine [Seite für Mitwirkende](https://beakerbrowser.com/docs/team.html) und werden Sie hinzufügen. Und wenn Sie Austin besuchen, kaufe ich Ihnen ein Bier.

## Irgendwelche Electron-Tipps, die für andere Entwickler nützlich sein könnten?

1. Benutze die Werkzeuge, die dort draußen sind. Sie wollen nicht mit Ihren eigenen Lösungen ringen, vertrauen Sie mir. Elektron-Builder verwenden. Verwende eine Boilerplatten-Repo.
2. Wenn Sie ein Problem im Electron Repo öffnen möchten, gehen Sie in die Extrameile, um es einfach zu reproduzieren zu machen. Sie erhalten eine viel schnellere Antwort und das Team wird es schätzen. Noch besser, versuchen Sie es selbst zu reparieren. Es ist eigentlich ziemlich interessant, die Wirtshäuser zu sehen.
3. Lesen Sie mindestens einmal alle Guides und fortgeschrittene Doktoranden.
4. Erstellen Sie keinen Browser, es ist ein gesättigter Markt.

