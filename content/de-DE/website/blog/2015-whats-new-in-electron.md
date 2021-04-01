---
title: Was ist neu in Electron
author: jörn
date: '2015-10-15'
---

Es gab einige interessante Aktualisierungen und Vorträge über Electron vor kurzem, hier ist eine Roundup.

---

## Quelle

Electron ist jetzt aktuell mit Chrome 45 ab `v0.32.0`. Andere Updates beinhalten...

### Bessere Dokumentation

![neue Dokumentation](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

Wir haben die Dokumentation umstrukturiert und standardisiert, um besser zu schauen und besser lesen zu können. Es gibt auch von der Gemeinschaft beigetragene Übersetzungen der Dokumentation, wie Japanisch und Koreanisch.

Ähnliche Pull-Requests: [electron/electron#2028](https://github.com/electron/electron/pull/2028), [electron/electron#2533](https://github.com/electron/electron/pull/2533), [electron/electron#2557](https://github.com/electron/electron/pull/2557), [electron/electron#2709](https://github.com/electron/electron/pull/2709), [electron/electron#2725](https://github.com/electron/electron/pull/2725), [electron/electron#2698](https://github.com/electron/electron/pull/2698), [electron/electron#2649](https://github.com/electron/electron/pull/2649).

### Node.js 4.1.0

Seit `v0.33.0` wird Electron mit Node.js 4.1.0 ausgeliefert.

Ähnliche Pull-Anfrage: [electron/electron#2817](https://github.com/electron/electron/pull/2817).

### node-pregyp

Module, die sich auf `Knoten-Pregyp` stützen, können jetzt gegen Electron kompiliert werden, wenn es aus dem Quellcode stammt.

Zugehörige Pull-Request: [mapbox/node-pre-gyp#175](https://github.com/mapbox/node-pre-gyp/pull/175).

### ARM-Unterstützung

Electron stellt nun Builds für Linux auf ARMv7 bereit. Es läuft auf beliebten Plattformen wie Chromebook und Raspberry Pi 2.

Ähnliche Probleme: [atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138), [electron/electron#2094](https://github.com/electron/electron/pull/2094), [electron/electron#366](https://github.com/electron/electron/issues/366).

### Rahmenloses Fenster im Jugendstil

![framelloses Fenster](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

Ein Patch von [@jaanus](https://github.com/jaanus) wurde zusammengeführt, der, wie die anderen eingebauten OS X Apps, ermöglicht die Erstellung von rahmenlosen Fenstern mit integrierten Ampeln auf OS X Yosemite und später.

Ähnliche Pull-Anfrage: [Elektronik/Elektronik/2776](https://github.com/electron/electron/pull/2776).

### Google Summer of Code Printing Support

Nach dem Google Summer of Code haben wir Patches von [@hokein](https://github.com/hokein) zusammengeführt, um die Druckunterstützung zu verbessern und fügen Sie die Möglichkeit hinzu, die Seite in PDF-Dateien zu drucken.

Ähnliche Probleme: [electron/electron#2677](https://github.com/electron/electron/pull/2677), [electron/electron#1935](https://github.com/electron/electron/pull/1935), [electron/electron#1532](https://github.com/electron/electron/pull/1532), [electron/electron#805](https://github.com/electron/electron/issues/805), [electron/electron#1669](https://github.com/electron/electron/pull/1669), [electron/electron#1835](https://github.com/electron/electron/pull/1835).

## Atom

Atom wurde jetzt auf Electron `v0.30.6` mit Chrome 44 aktualisiert. Ein Upgrade auf `v0.33.0` läuft auf [atom/atom#8779](https://github.com/atom/atom/pull/8779).

## Vorträge

GitHubber [Amy Palamountain](https://github.com/ammeep) hat in einem Vortrag unter [Nordic.js](https://nordicjs2015.confetti.events) eine großartige Einführung in Electron gegeben. Sie hat auch die [Elektronenbeschleuniger](https://github.com/ammeep/electron-accelerator) Bibliothek erstellt.

#### Erstelle native Anwendungen mit Electron von Amy Palomountain
<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[Ben Ogle](https://github.com/benogle), auch im Atom-Team, hielt einen Electron-Vortrag unter [YAPC Asia](http://yapcasia.org/2015/):

#### Desktop-Apps mit Web-Technologien von Ben Ogle erstellen
<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

Atom-Teammitglied [Kevin Sawicki](https://github.com/kevinsawicki) und andere hielten Vorträge über Electron beim [Bay Are Electron User Group](http://www.meetup.com/Bay-Area-Electron-User-Group/) Treffen vor kurzem. Die [Videos](http://www.wagonhq.com/blog/electron-meetup) wurden gepostet, hier sind ein Paar:

#### Die Geschichte von Electron von Kevin Sawicki
<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Eine Web-App von Ben Gotow einheimisch machen
<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

