---
title: 'Projekt der Woche: Voltra'
author:
  - '0x00A'
  - aprileelcich
  - zeke
date: '2017-03-07'
---

Diese Woche trafen wir uns mit [Aprile Elcich](https://twitter.com/aprileelcich) und [Paolo Fragomeni](https://twitter.com/0x00A) , um über Voltra, einen Electron-basierten Musik-Player, zu sprechen.

---

## Was ist Voltra?

[Voltra](https://voltra.co/) ist ein Musikplayer für Leute, die ihre Musik besitzen möchten. Es ist auch ein Geschäft, in dem Sie neue Musik entdecken und kaufen können, basierend auf dem, was Sie bereits besitzen. Es ist werbefrei, plattformübergreifend für Desktop und Mobil. Es spioniert Sie auch nicht.

[![voltra-Künstler-Ansicht](https://cloud.githubusercontent.com/assets/2289/23670061/4db0323c-031b-11e7-81fd-128e714e911c.jpg)](https://voltra.co/)

## Für wen ist Voltra?

Wer Musik hört.

## Was motiviert Sie Voltra?

Radio hatte schon immer einen großen Anteil an Zuhörern. Es bewegt sich von den Luftwellen und ins Internet. Jetzt kannst du Musik auf Nachfrage mieten – es ist ein Funk-Wiederbelebung! Viele neue Produkte und Dienstleistungen sind daraus entstanden, aber Streaming Radio gibt noch jemand anderen die Kontrolle über Ihre Musik und wie Sie es erleben.

Wir wollten ein Produkt, das sich ausschließlich auf Ihre eigene Musik konzentrierte. Etwas, das es einfach gemacht hat, neue Musik direkt von Künstlern oder Labels zu entdecken und zu kaufen.

## Gibt es eine kostenlose Version?

Der Desktop Player ist völlig kostenlos. [Deine Musik zu verkaufen ist ebenfalls kostenlos!](https://voltra.co/artists) Wir werden nicht werbeunterstützt.

Da die App kostenlos ist, können wir sie später öffnen. Im Moment haben wir nicht die Bandbreite um das zu verwalten. Wir haben auch sehr spezifische Ideen für Features und die Richtung, die wir einschlagen wollen. Wir haben eine aktive Beta-Community und wir nehmen unser Feedback zum Herzen.

## Wie verdienen Sie Geld?

Wir haben Premium-Funktionen!

Unser [Voltra Audio Archive](https://voltra.co/premium/) ist ein Cloud-Backup-Service, der speziell für Musik entwickelt wurde. Wir komprimieren oder teilen keine Datenblöcke. Ihre Musiksammlung ist physisch für Sie gesichert.

Für Künstler und Labels bietet unsere [Pro Mitgliedschaft](https://voltra.co/artists/pro) Werkzeuge, die es ihnen ermöglichen, relevante Zielgruppen wie Analysen und professionelle Künstler-Webseiten zu erreichen.

## Was macht Voltra anders?

Design und Benutzerfreundlichkeit sind uns sehr wichtig. Wir wollen den Hörern ein ablenkungsfreies Hörerlebnis geben! Es gibt hier einige interessante Musikspieler und Läden. Aber viele von ihnen sind fortgeschrittener und schwieriger zu bedienen, als ihre Schöpfer begreifen. Wir wollen Voltra so vielen Menschen wie möglich zugänglich machen.

Wir nehmen auch keinen Schnitt vom Künstler oder vom Label. Das ist für uns ein entscheidender Unterschied. Es ist wirklich wichtig, weil es die Barriere für Künstler verringert, um ihre Musik auf den Markt zu bringen.

## Was sind einige Designs & technische Entscheidungen, die Sie getroffen haben?

Während wir Voltra entworfen haben, haben wir UI-Konventionen von nativen Apps und dem Web berücksichtigt, haben wir auch viel darüber gedacht, was wir entfernen könnten. Wir haben eine aktive private Beta-Gruppe, die uns in den letzten Monaten kritisches Feedback gegeben hat.

Wir haben festgestellt, dass Albumkunst und Fotografie für die Menschen sehr wichtig sind. Viele Spieler sind nur Listen von Dateien. Eines der coolen Dinge über den Besitz von physischen Alben ist die Albumkunst und wir wollten dies in der Voltra Desktop App betonen.

[![voltra-albumview](https://cloud.githubusercontent.com/assets/2289/23670056/4b0c18d4-031b-11e7-89e1-539e927a380d.jpg)](https://voltra.co/)

Wir haben auch darauf geachtet, dass wir uns nicht mit den Dateien von Leuten durchmischen. Wir verwenden Dateiüberwachung, damit Sie Ihre Dateien überall dort ablegen können, wo Sie wollen, und wir benennen sie nicht umbenennen oder verschieben sie für Sie. Wir haben eine eingebettete Datenbank, um den Status der beobachteten Verzeichnisse zu verfolgen, so dass wir nachverfolgen können, was neu ist auch wenn der Prozess nicht läuft.

## Was sind einige Herausforderungen beim Bau von Voltra?

Wir verbringen viel Zeit mit Schwerpunkt auf Leistung. Wir begannen mit Frameworks aber sind auf Vanilla Javascript umgezogen. Nach unserer Erfahrung überwiegen die generalisierten Abstraktionen die Leistungsstrafen und die Zeremonie, die sie einführen.

Wir bearbeiten sehr große Sammlungen an dieser Stelle recht gut. Große Sammlungen bedeuten möglicherweise Zehntausende von Bildern! Knoten haben. s’ Dateisystem-Modul direkt aus dem Rendering-Prozess zur Verfügung gestellt, machte es wirklich einfach, viele Bilder super schnell zu laden und zu entladen, basierend auf DOM-Events.

Im Allgemeinen sind *[setImmediate](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate)* und *[requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)* extrem wichtige Werkzeuge für die Durchführung einer Vielzahl von Verarbeitungen, während die UI auf dem Laufenden bleibt. Genauer gesagt, die Verteilung von CPU-gebundenen Aufgaben in separate Prozesse trägt dazu bei, dass die Benutzerschnittstelle auf dem Laufenden bleibt. Zum Beispiel haben wir den eigentlichen Audio-Kontext in einen separaten Prozess verschoben über [IPC](https://electronjs.org/docs/glossary/#ipc) kommunizieren, um mögliche Unterbrechungen durch eine belebte Benutzeroberfläche zu vermeiden.

## Warum haben Sie beschlossen, Voltra auf Electronic zu bauen?

Die Sandbox des Browsers ist für unsere App zu beschränkt. Aber wir entwickeln auch einen Webplayer. Es ist also ein großer Gewinn, dass wir fast 100% des Codes zwischen den beiden Implementierungen teilen können.

Wir haben tatsächlich mit dem Erstellen einer native App mit Swift begonnen. Das Hauptproblem, das wir feststellten, war, dass wir viele Dinge neu erfunden haben. Das Web verfügt über das weltweit größte Open-Source-Ökosystem. Also haben wir ziemlich schnell zu Electron gewechselt.

Außerdem, und das Wichtigste, mit Electron entwickeln Sie einmal und es sollte Just WorkTM auf allen wichtigen Plattformen. Es ist nicht garantiert, aber die Kosten für die Programmierung für jede Plattform überwiegen definitiv alle anderen Kosten, die Elektron einführt.

## Was sind Ihre Lieblings-Dinge über Elektronik?

**GTD!**: Der Netzwerkstack von Node.js und der gemeinsam gepackte Präsentationsschicht von Chromium sind ein Rezept, um Dinge zu erledigen.

**Kompetenz**: Es ist nur der Webstack, also ist unser ganzes Team am eigentlichen Aufbau des Produkts beteiligt.

**Community**: Es gibt eine hochorganisierte Community, die sehr gut kommunizieren kann! Wir sind sehr froh über die Entwicklung mit Unterstützung wie diese.

## In welchen Bereichen könnte Electron verbessert werden?

Wir möchten, dass Electron einen einzigen Packager befürwortet. Der Packager ist für Electron genauso wichtig, wie für den Paketmanager Node. Es gibt mehrere Pakete im User-Land, jeder mit interessanten Features, aber jeder mit Fehlern. Der Konsens der Gemeinschaft würde dazu beitragen, die Energie, die von den Beitragenden ausgegeben wird, zu lenken.

## Was kommt als Nächstes?

Wir entwickeln derzeit eine mobile App und arbeiten mit Künstlern und Labels zusammen, um ihre Musik dem Voltra Shop hinzuzufügen. Hallo! Wenn du Künstler oder Label bist, melde dich jetzt [an](https://admin.voltra.co/signup)! Wir planen, den Shop zu öffnen, wenn wir unser Ziel von 10 Millionen Spuren erreichen.

