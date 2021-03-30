---
title: Unterbrechen der Unterstützung für 32-Bit Linux
author: felixrieseberg
date: '2019-03-04'
---

The Electron team will discontinue support for 32-bit Linux (ia32 / i386) starting with Electron v4.0. The last version of Electron that supports 32-bit based installations of Linux is Electron v3.1, which will receive support releases until Electron v6 is released. Unterstützung für 64-Bit-basiertes Linux und `armv7l` wird unverändert fortgesetzt.

---

## Was genau unterstützt Electron nicht mehr?

Möglicherweise haben Sie die Beschreibung "64-Bit" und "32-Bit" als Aufkleber auf Ihrem Computer oder als Optionen zum Herunterladen von Software gesehen. Der Begriff wird verwendet, um eine bestimmte Computerarchitektur zu beschreiben. Die meisten Computer wurden in den 1990er und frühen 2000er Jahren mit CPUs gemacht, die auf der 32-Bit-Architektur basieren. während die meisten Computer später auf der neueren und leistungsfähigeren 64-Bit-Architektur basierten. Der Nintendo 64 (bekommen? und die PlayStation 2 waren die ersten allgemein erhältlichen Geräte mit der neuen Architektur, Computer verkauft nach 2010 fast ausschließlich 64-Bit-Prozessoren. Infolgedessen schrumpfte die Unterstützung: Google hörte im März 2016 auf, Chrome für 32-Bit-Linux freizugeben Canonical hörte 2017 auf, 32-Bit-Desktop-Images bereitzustellen, und ließ die Unterstützung für 32-Bit insgesamt mit Ubuntu 18.10 fallen. Arch Linux, elementares Betriebssystem und andere prominente Linux-Distributionen haben die Unterstützung für die Alterung der Prozessorarchitektur bereits eingestellt.

Bis jetzt hat Electron Builds zur Verfügung gestellt und unterstützt, die auf der älteren 32-Bit-Architektur laufen. Ab der Veröffentlichung v4.0 wird das Electron-Team nicht mehr in der Lage sein, Binärdateien oder Unterstützung für 32-Bit Linux bereitzustellen.

Electron war schon immer ein lebendiges Open-Source-Projekt und wir unterstützen und ermutigen Entwickler, die daran interessiert sind, Electron für exotische Architekturen zu bauen.

## Was bedeutet das für Entwickler?

Wenn Sie derzeit keine 32-Bit-Distributionen Ihrer App für Linux bereitstellen, ist keine Aktion erforderlich.

Projekte, die 32-Bit Linux Electron Anwendungen ausliefern, müssen entscheiden, wie sie fortfahren sollen. 32-Bit Linux wird auf Electron 3 [bis](https://electronjs.org/docs/tutorial/support#supported-versions) die Veröffentlichung von Electron 6 unterstützt, was etwas Zeit lässt, Entscheidungen und Pläne zu treffen.

## Was bedeutet das für die Benutzer?

Wenn Sie ein Linux-Benutzer sind und sich nicht sicher sind, ob Sie ein 64-Bit-basiertes System verwenden oder nicht Sie laufen wahrscheinlich auf einer 64-Bit-basierten Architektur. Um sicher zu stellen, können Sie die Befehle `lscpu` oder `uname -m` in Ihrem Terminal ausführen. Entweder man druckt Ihre aktuelle Architektur.

Wenn Sie Linux auf einem 32-Bit-Prozessor verwenden, sind Sie wahrscheinlich bereits auf Schwierigkeiten gestoßen, kürzlich veröffentlichte Software für Ihr Betriebssystem zu finden. Das Electron-Team schließt sich anderen prominenten Mitgliedern der Linux-Gemeinschaft an, indem es Ihnen empfiehlt, auf eine 64-Bit-basierte Architektur zu aktualisieren.
