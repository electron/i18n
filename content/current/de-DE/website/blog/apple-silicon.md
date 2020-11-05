---
title: Apple Silicon Unterstützung
author: MarshallOfSound
date: '2020-10-15'
---

Mit der Veröffentlichung der Apple Silicon Hardware in diesem Jahr Wie sieht der Pfad aus, um Ihre Electron-App auf der neuen Hardware laufen zu lassen?

---

Mit der Veröffentlichung von Electron 11.0.0-beta. , das Electron-Team liefert nun Builds von Electron, die auf der neuen Apple Silicon Hardware laufen, die Apple für den Versand noch in diesem Jahr plant. Sie können die neueste Beta mit `npm installieren electron@beta` oder direkt von unserer [Release-Website](https://electronjs.org/releases/stable) herunterladen.

## Wie funktioniert das?

Ab Electron 11 liefern wir separate Versionen von Electron für Intel Macs und Apple Silicon Macs. Vor dieser Änderung haben wir bereits zwei Artefakte versandt: `darwin-x64` und `mas-x64`, mit letzterer für die Verwendung der Mac App Store Kompatibilität. Wir versenden jetzt noch zwei Artefakte, `darwin-arm64` und `mas-arm64`, die die Apple-Siliziumäquivalente der oben genannten Artefakte sind.

## Was muss ich tun?

Sie müssen zwei Versionen Ihrer App verschicken: eine für x64 (Intel Mac) und eine für arm64 (Apple Silicon). Die gute Nachricht ist, dass [`Elektron-Packager`](https://github.com/electron/electron-packager/), [`electron-rebuild`](https://github.com/electron/electron-rebuild/) und [`electron-forge`](https://github.com/electron-userland/electron-forge/) unterstützt bereits die Targetierung der `arm64` Architektur. Solange Sie die aktuellste Version dieser Pakete verwenden, Ihre App sollte einwandfrei funktionieren, sobald Sie die Zielarchitektur auf `arm64` aktualisieren.

In the future, we will release a package that allows you to "merge" your `arm64` and `x64` apps into a single universal binary, but it's worth noting that this binary would be _huge_ and probably isn't ideal for shipping to users.

## Mögliche Probleme

### Native Module

Da Sie auf eine neue Architektur abzielen, müssen Sie mehrere Abhängigkeiten aktualisieren, die zu Build-Problemen führen können. Die minimale Version bestimmter Abhängigkeiten ist unten für Ihre Referenz enthalten.

| Abhängigkeit        | Versionsvoraussetzung |
| ------------------- | --------------------- |
| Xcode               | `>=12.2.0`         |
| `node-gyp`          | `>=7.1.0`          |
| `electron-rebuild`  | `>=1.12.0`         |
| `electron-packager` | `>=15.1.0`         |

Aufgrund dieser Abhängigkeitsversionsanforderungen müssen Sie unter Umständen bestimmte native Module reparieren/aktualisieren.  Eine Anmerkung ist, dass das Xcode Upgrade eine neue Version des macOS SDK einführen wird was zu Build-Fehlern für Ihre nativen Module führen kann.


## Wie kann ich das testen?

Derzeit laufen die Anwendungen von Apple Silicon nur auf der Apple Silicon Hardware, die zum Zeitpunkt des Schreibens dieses Blogeintrags nicht kommerziell verfügbar ist. Wenn Sie ein [Entwickler-Transition Kit](https://developer.apple.com/programs/universal/)haben, können Sie Ihre Anwendung darauf testen. Andernfalls müssen Sie auf die Veröffentlichung der Apple Silicon Hardware warten, um zu testen, ob Ihre Anwendung funktioniert.

## Was ist mit Rosetta 2?

Rosetta 2 ist Apples neueste Iteration ihrer [Rosetta-](https://en.wikipedia.org/wiki/Rosetta_(software)) Technologie. mit der Sie x64 Intel-Anwendungen auf ihrer neuen arm64 Apple Silicon Hardware ausführen können. Obwohl wir glauben, dass x64 Electron-Apps unter Rosetta 2 laufen werden es gibt einige wichtige Dinge zu beachten (und Gründe, warum Sie ein natives arm64-Programm verschicken sollten).

* Die Leistung Ihrer App wird erheblich beeinträchtigt. Electron / V8 verwendet [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) Kompilierung für JavaScript und aufgrund der Funktionsweise von Rosetta Sie werden effektiv JIT zweimal laufen (einmal in V8 und einmal in Rosetta).
* Sie verlieren den Vorteil neuer Technologien in Apple Silicon, wie zum Beispiel die erhöhte Speicherseitengröße.
* Haben wir erwähnt, dass die Leistung **erheblich** beschädigt wird?
