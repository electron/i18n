---
title: Mac App Store und Windows Auto Updater auf Electron
author: jörn
date: '2015-11-05'
---

Vor kurzem hat Electron zwei aufregende Funktionen hinzugefügt: einen Mac App Store kompatiblen Build und ein integriertes Windows Auto Updater.

---

## Mac App Store Unterstützung

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

Ab `v0.34.0` enthält jede Electron-Version ein Build, das mit dem Mac App Store kompatibel ist. Zuvor entsprach eine Anwendung auf Electron nicht den Apple-Anforderungen für den Mac App Store. Die meisten dieser Anforderungen beziehen sich auf den Einsatz privater APIs. Um die Sandbox Electron so zu gestalten, dass sie die Anforderungen erfüllt, mussten zwei Module entfernt werden:

- `crash-melder`
- `auto-updater`

Zusätzlich haben sich einige Verhaltensweisen im Hinblick auf die Erkennung von DNS-Änderungen, Videoaufnahme und Barrierefreiheit geändert. Sie können mehr über die Änderungen erfahren und [Ihre App im Mac App Store](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) in der Dokumentation einreichen. Die Distributionen sind auf der [Electron-Release-Seite](https://github.com/electron/electron/releases)zu finden, die mit `mas-` vorangestellt ist.

Ähnliche Pull-Requests: [elektronisch/elektronisch #3108](https://github.com/electron/electron/pull/3108), [elektronisch/elektronisch #2920](https://github.com/electron/electron/pull/2920)

## Windows Auto Updater

In Electron `v0.34.1` wurde das `Auto-Updater` Modul verbessert, um mit [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows) zu arbeiten. Das bedeutet, dass Electron mit einfachen Möglichkeiten zur automatischen Aktualisierung Ihrer App sowohl unter OS X als auch unter Windows ausgeliefert wird. Weitere Informationen finden Sie unter [Einrichten Ihrer App für das automatische Aktualisieren unter Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) in der Dokumentation.

Verwandte Pull-Request: [elektronisch/elektronisch#1984](https://github.com/electron/electron/pull/1984)

