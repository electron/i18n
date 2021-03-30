---
title: 'Elektron-Internals: Erstelle Chromium als Bibliothek'
author: zcbenz
date: '2017-03-03'
---

Electron basiert auf Googles Open-Source-Chromium, einem Projekt, das nicht ist unbedingt für andere Projekte konzipiert. Dieser Beitrag stellt vor, wie Chromium als Bibliothek für die elektronische Nutzung aufgebaut wird und wie sich das Build- System im Laufe der Jahre entwickelt hat.

---

## CEF verwenden

Das Chromium Embedded Framework (CEF) ist ein Projekt, das Chromium in eine Bibliothek verwandelt und stabile APIs auf Basis von Chromium's Codebase bereitstellt. Sehr frühe Versionen des Atom-Editors und NW.js verwendeten CEF.

Um eine stabile API zu erhalten, versteckt CEF alle Details von Chromium und verpackt Chromiums APIs mit einer eigenen Schnittstelle. Wenn wir also auf die zugrunde liegenden Chromium-APIs zugreifen mussten, wie z.B. die Integration von Node.js in Web-Seiten, wurden die Vorteile von CEF zu Blockern.

Am Ende haben also Electron und NW.js direkt auf Chromium's APIs umgeschaltet.

## Gebäude als Teil von Chromium

Obwohl Chromium nicht offiziell externe Projekte unterstützt die Codebase ist modular und es ist einfach, einen minimalen Browser basierend auf Chromium zu erstellen. Das Core Modul, das die Browserschnittstelle zur Verfügung stellt, heißt Content-Modul.

Um ein Projekt mit dem Content-Modul zu entwickeln, ist der einfachste Weg das Projekt als Teil von Chromium zu bauen. Dies kann geschehen, indem Sie zuerst Chromium's -Quellcode ansehen und dann das Projekt der Chromium's `DEPS` Datei hinzufügen.

NW.js und sehr frühe Versionen von Electron nutzen diese Weise zum Bauen.

Der Nachteil ist, Chromium ist eine sehr große Codebase und erfordert sehr leistungsstarke Maschinen zum Bauen. Für normale Laptops kann das länger als 5 Stunden dauern. Dies wirkt sich also stark auf die Anzahl der Entwickler aus, die zum Projekt beitragen können, und macht auch die Entwicklung langsamer.

## Erstelle Chromium als eine einzige gemeinsame Bibliothek

Als Benutzer des Content-Moduls muss Electron den Chromium-Code in den meisten Fällen nicht ändern eine offensichtliche Möglichkeit, das Bauen von Electron zu verbessern, ist das Chromium als gemeinsame Bibliothek zu bauen, und dann mit ihm in Electron verbinden. Auf diese Weise müssen Entwickler nicht mehr alles aus Chromium bauen, wenn sie zu Electron beitragen.

Das [libchromiumcontent](https://github.com/electron/libchromiumcontent) Projekt wurde von [@aroben](https://github.com/aroben) zu diesem Zweck erstellt. Es baut das Content Modul von Chromium als freigegebene Bibliothek und stellt dann die Kopfzeilen von Chromium und vorkompilierte Binärdateien zum Download bereit. Es baut das Content Modul von Chromium als freigegebene Bibliothek und stellt dann die Kopfzeilen von Chromium und vorkompilierte Binärdateien zum Download bereit.

Das [brightray](https://github.com/electron/brightray) Projekt wurde ebenfalls als Teil von libchromiumcontent geboren, das eine dünne Schicht um das Content-Modul bereitstellt.

Durch die Verwendung von libchromiumcontent und Helligkeit zusammen können Entwickler schnell einen Browser erstellen, ohne in die Details der Erstellung von Chromium zu kommen. Und es entfernt die Anforderung eines schnellen Netzwerks und einer leistungsstarken Maschine für den Bau des Projekts.

Außer Electron wurden auch andere Chromium-basierte Projekte auf diese Art und Weise eingebaut, wie der [Breach-Browser](https://www.quora.com/Is-Breach-Browser-still-in-development).

## Exportierte Symbole werden gefiltert

Unter Windows gibt es eine Beschränkung darauf, wie viele Symbole eine Shared Library exportieren kann. Als die Codebase von Chromium wuchs, übertraf die Anzahl der in exportierten Symbole bald die Einschränkung.

Die Lösung bestand darin, beim Erstellen der DLL-Datei unnötige Symbole herauszufiltern. Es hat funktioniert, indem [ein `zur Verfügung stellt. ef` Datei zum Linker](https://github.com/electron/libchromiumcontent/pull/11/commits/85ca0f60208eef2c5013a29bb4cf3d21feb5030b), und verwenden Sie dann ein Skript um [zu beurteilen, ob Symbole unter einem Namensraum exportiert werden sollen](https://github.com/electron/libchromiumcontent/pull/47/commits/d2fed090e47392254f2981a56fe4208938e538cd).

Durch diesen Ansatz konnte libchromiumcontent weiterhin freigegebene Bibliotheksdateien erzeugen, indem mehr Symbole entfernt wurden.

## Komponentenbau

Bevor Sie über die nächsten Schritte in libchromiumcontent sprechen, ist es wichtig, dass zuerst das Konzept der Komponente in Chromium einführt.

Als ein riesiges Projekt dauert der Verbindungsschritt in Chromium sehr lange, wenn es gebaut wird. Normalerweise, wenn ein Entwickler eine kleine Änderung vornimmt, kann es 10 Minuten dauern, um die Endausgabe zu sehen. Um dies zu beheben, führte Chromium die Komponentenversion ein, die jedes Modul in Chromium als getrennte freigegebene Bibliotheken baut so dass die Zeit, die im abschließenden Verlinkungsschritt verbracht wird, unauffällig wird.

## Liefert rohe Binärdateien

Mit dem anhaltenden Wachstum von Chromium es gab so viele exportierte Symbole in Chromium, dass sogar die Symbole des Content-Moduls und des Webkits mehr als die Einschränkung waren. Es war nicht möglich, eine nutzbare geteilte Bibliothek zu generieren, indem einfach Symbole entfernt wurden.

Am Ende mussten wir [die rohen Binärdateien von Chromium](https://github.com/electron/libchromiumcontent/pull/98) verschicken, anstatt eine einzige gemeinsame Bibliothek zu erstellen.

Wie bereits eingeführt, gibt es zwei Build-Modi in Chromium. Als Ergebnis von roher Binärdateien müssen wir zwei verschiedene Distributionen von Binärdateien in libchromiumcontent versenden. Eines heißt `static_library` build, das alle statischen Bibliotheken jedes Moduls beinhaltet, das durch die normale Chromium-Build generiert wurde. Das andere ist `shared_library`, die alle gemeinsam genutzten Bibliotheken jedes Moduls enthält, das vom Komponentenbau generiert wurde.

In Electron ist die Debug-Version mit der `shared_library` Version von libchromiumcontent verknüpft weil es klein ist zum Herunterladen und braucht wenig Zeit , wenn die endgültige ausführbare Datei verlinkt wird. Und die Release Version von Electron ist mit der `static_library` Version von libchromiumcontent verknüpft damit der Compiler volle Symbole generieren kann, die für das Debuggen wichtig sind, und der Linker kann eine viel bessere Optimierung erreichen, da er weiß, welche Objektdateien benötigt werden und welche nicht.

Für die normale Entwicklung brauchen die Entwickler nur die Debug-Version zu erstellen, , die kein gutes Netzwerk oder leistungsstarke Maschine benötigt. Obwohl die Version dann viel bessere Hardware zum Erstellen benötigt, kann sie bessere optimierte Binärdateien generieren.

## Das `gn` Update

Being one of the largest projects in the world, most normal systems are not suitable for building Chromium, and the Chromium team develops their own build tools.

Frühere Versionen von Chromium benutzten `gyp` als Build-System, aber es leidet daran, dass langsam ist, und seine Konfigurationsdatei wird für komplexe Projekte schwer zu verstehen. After years of development, Chromium switched to `gn` as a build system, which is much faster and has a clear architecture.

Eine der Verbesserungen von `gn` ist die Einführung von `source_set`, die eine Gruppe von Objektdateien repräsentiert. Im `gyp`wurde jedes Modul entweder durch `static_library` oder `shared_library`repräsentiert , und für die normale Erstellung von Chromium, erzeugte jedes Modul eine statische Bibliothek und sie wurden in der letzten ausführbaren miteinander verknüpft. Durch die Verwendung von `gn`erzeugt nun jedes Modul nur noch eine Menge Objektdateien und die endgültige ausführbare Datei verbindet nur alle Objektdateien zusammen , so dass die statischen Zwischendateien nicht mehr generiert werden.

Diese Verbesserung machte libchromiumcontent jedoch sehr schwierig, da die statischen Bibliotheksdateien tatsächlich von libchromiumcontent benötigt wurden.

Der erste Versuch, dies zu lösen, war [Patch `gn` um eine statische Bibliothek zu generieren Dateien](https://github.com/electron/libchromiumcontent/pull/239), die das Problem gelöst hat, aber weit von einer anständigen Lösung entfernt war.

Der zweite Versuch wurde von [@alespergl](https://github.com/alespergl) bis [erstellt benutzerdefinierte statische Bibliotheken aus der Liste der Objektdateien](https://github.com/electron/libchromiumcontent/pull/249). Es wurde ein Trick verwendet, um zuerst eine Dummy-Build zu starten, um eine Liste von Objektdateien zu sammeln und erstellen Sie dann tatsächlich die statischen Bibliotheken, indem Sie `gn` mit der Liste füttern. Es hat nur minimale Änderungen am Quellcode von Chromium vorgenommen und die Bauarchitektur von Electronic stillgehalten.

## Summary

Wie Sie sehen können, verglichen mit dem Bau von Electron als Teil von Chromium, das Erstellen von Chromium als Bibliothek erfordert größere Anstrengungen und kontinuierliche Wartung. Letztere entfernt jedoch die Anforderung an leistungsstarke Hardware um Electron zu erstellen Auf diese Weise kann eine viel größere Anzahl von Entwicklern gebaut werden und zu Electron beitragen. Die Anstrengungen sind es wert.

