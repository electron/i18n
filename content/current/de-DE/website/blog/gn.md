---
title: "GN zum Erstellen von Elektron verwenden"
author: nornagon
date: '2018-09-05'
---

Electron benutzt nun GN um sich selbst zu bauen. Hier ist eine Diskussion darüber, warum.

---

# GYP und GN

When Electron was first released in 2013, Chromium's build configuration was written with [GYP][], short for "Generate Your Projects".

In 2014, the Chromium project introduced a new build configuration tool called [GN][] (short for "Generate [Ninja][]") Chromium's build files were migrated to GN and GYP was removed from the source code.

Electron has historically kept a separation between the main [Electron code][] and [libchromiumcontent][], the part of Electron that wraps Chromium's 'content' submodule. Electron verwendet weiterhin GYP, während libchromiumcontent -- als Teilmenge von Chromium -- auf GN umgeschaltet wird, wenn Chromium dies tat.

Wie Gänge, die nicht ganz mesh, gab es Reibung zwischen der Verwendung der beiden Build-Systeme. Die Wartung der Kompatibilität war fehleranfällig, von Compiler-Flags und `#Definiert` die genau zwischen Chromium, Node, V8 und Electron synchronisiert werden mussten.

Um dies zu beheben, hat das Electron-Team daran gearbeitet, alles in BNE zu verschieben. Heute wurde der [Commit](https://github.com/electron/electron/pull/14097) zum Entfernen des letzten GYP-Codes von Electron im Master gelandet.

# Was das für Sie bedeutet

Wenn Sie zu Electron selbst beitragen, wird Electron von `Master` oder 4 ausgecheckt und gebaut. .0 ist sehr anders als in 3.0.0 und früher. Siehe [GN Build-Anweisungen](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md) für Details.

Wenn Sie eine App mit Electron entwickeln, gibt es ein paar kleinere Änderungen, die Sie vielleicht in der neuen Electron 4 bemerken. .0-nächtlich; aber mehr als wahrscheinlich, die Änderung von Electronic im Build-System wird für Sie völlig transparent sein.

# Was das für Electron bedeutet

GN is [faster](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) than GYP and its files are more readable and maintainable. Darüber hinaus hoffen wir, dass die Verwendung eines einzigen Build-Konfigurationssystems die Arbeit verringern wird, die benötigt wird, um Electron auf neue Chromium-Versionen zu aktualisieren.

 * Es ist bereits bei der Entwicklung von Electron 4.0.0 erheblich geholfen, da Chromium 67 die Unterstützung für MSVC entfernt und mit Clang unter Windows auf Build umgestellt wurde. Mit dem GN Build, erben wir alle Compiler-Befehle von Chromium direkt, so dass wir die Clang Build auf Windows kostenlos!

 * It's also made it easier for Electron to use [BoringSSL][] in a unified build across Electron, Chromium, and Node -- something that was [problematic before](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library).


[BoringSSL]: https://boringssl.googlesource.com/boringssl/
[Electron code]: https://github.com/electron/electron
[GN]: https://gn.googlesource.com/gn/
[GYP]: https://gyp.gsrc.io/
[Ninja]: https://ninja-build.org/
[libchromiumcontent]: https://github.com/electron/libchromiumcontent
