---
title: 'Electron Internals&#58; Knoten als Bibliothek verwenden'
author: zcbenz
date: '2016-08-08'
---

Dies ist der zweite Beitrag in einer laufenden Serie zur Erläuterung der Internen von Electron. Schaue dir den [ersten Beitrag](https://electronjs.org/blog/2016/07/28/electron-internals-node-integration) über die Integration von Ereignis-Schleifen an, falls du es noch nicht getan hast.

Die meisten Benutzer verwenden [Knoten](https://nodejs.org) für Serveranwendungen aber wegen der reichen API Set und der blühenden Community von Node eignet es sich auch hervorragend für eine eingebettete Bibliothek. Dieser Beitrag erklärt, wie Knoten als Bibliothek in Electron verwendet wird.

---

## System erstellen

Sowohl Knoten als auch Electron verwenden [`GYP`](https://gyp.gsrc.io) als Build-Systeme. Wenn du Knoten in deine App einbetten möchtest, musst du ihn auch als dein Build-System verwenden.

Neu bei `GYP`? Lies [diese Anleitung](https://gyp.gsrc.io/docs/UserDocumentation.md) bevor du in diesem Beitrag weitermachst.

## Flaggen des Knotens

Der [`Knoten. yp`](https://github.com/nodejs/node/blob/v6.3.1/node.gyp) Datei im Quellcode-Verzeichnis von Node beschreibt, wie Knoten gebaut wird, zusammen mit vielen [`GYP`](https://gyp.gsrc.io) Variablen steuern, welche Teile von Knoten aktiviert sind und ob bestimmte Konfigurationen geöffnet werden sollen.

Um die Build-Flags zu ändern, müssen Sie die Variablen in der `.gypi` Datei Ihres Projekts setzen. Das `configure` Skript in Knoten kann einige übliche Konfigurationen für Sie erzeugen, zum Beispiel unter `. configure --shared` generiert eine `config.gypi` mit Variablen, die den Knoten anweisen, als freigegebene Bibliothek zu bauen.

Electron verwendet nicht das `configure` Skript, da es eigene Build-Skripte hat. Die Konfigurationen für den Knoten sind in der [`common.gypi`](https://github.com/electron/electron/blob/master/common.gypi) Datei im Wurzel-Quellcode-Verzeichnis definiert.

## Knoten mit Electron verknüpfen

In Electron, Knoten wird als Shared Library verknüpft, indem die `GYP` Variable `node_shared` auf `true`gesetzt wird, so wird der Build-Typ von Knoten von `ausführbar` zu `shared_library`geändert , und der Quellcode, der den `Haupt-` Eintrag enthält, wird nicht kompiliert.

Da Electron die mit Chromium ausgelieferte V8-Bibliothek verwendet, wird die V8-Bibliothek im Quellcode von Node nicht verwendet. Dies geschieht durch Setzen von `node_use_v8_platform` und `node_use_bundled_v8` auf `false`.

## Gemeinsame Bibliothek oder statische Bibliothek

When linking with Node, there are two options: you can either build Node as a static library and include it in the final executable, or you can build it as a shared library and ship it alongside the final executable.

In Electron wurde Node lange Zeit als statische Bibliothek gebaut. This made the build simple, enabled the best compiler optimizations, and allowed Electron to be distributed without an extra `node.dll` file.

Dies änderte sich jedoch nach dem Wechsel von Chrome auf [BoringSSL](https://boringssl.googlesource.com/boringssl). BoringSSL ist ein Fork von [OpenSSL](https://www.openssl.org) das mehrere ungenutzte APIs entfernt und viele vorhandene Schnittstellen ändert. Da der Knoten immer noch OpenSSL verwendet, würde der Compiler zahlreiche Verknüpfungsfehler aufgrund widersprüchlicher Symbole erzeugen, wenn sie miteinander verknüpft würden.

Electron konnte BoringSSL im Knoten nicht verwenden oder OpenSSL in Chromium, verwenden damit die einzige Option war, auf den Knoten als freigegebene Bibliothek zu wechseln, und [die BoringSSL und OpenSSL Symbole](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218) in den einzelnen Komponenten verbergen.

Diese Änderung brachte Electron einige positive Nebenwirkungen. Vor diesem ändern können Sie die ausführbare Datei von Electron unter Windows nicht umbenennen, wenn Sie native Module verwendet haben, da der Name der ausführbaren Datei in der Import-Bibliothek fest kodiert ist. After Node was built as a shared library, this limitation was gone because all native modules were linked to `node.dll`, whose name didn't need to be changed.

## Unterstütze native Module

[Native Module](https://nodejs.org/api/addons.html) in Knotenarbeit, indem Sie eine Eintragsfunktion für Knoten definieren, und durchsuchen Sie dann die Symbole von V8 und libuv von Node. Dies ist ein bisschen störend für Einbetter, da die Symbole von V8 und libuv standardmäßig versteckt sind, wenn Knoten als Bibliothek erstellt wird und native Module nicht geladen werden weil sie die Symbole nicht finden können.

Um also native Module funktionieren zu lassen, wurden die V8 und libuv Symbole in Electron ausgestellt. Für V8 geschieht dies, indem [alle Symbole in der Chromiums-Konfigurationsdatei erzwingt](https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122). Für libuv wird erreicht, indem [die `BUILDING_UV_SHARED=1` Definition](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228) gesetzt wird.

## Starte Knoten in deiner App

Nach der Arbeit des Bauens und der Verlinkung mit dem Knoten ist der letzte Schritt, Knoten in Ihrer App auszuführen.

Knoten stellt nicht viele öffentliche APIs bereit, um sich selbst in andere Apps einzubetten. Normalerweise können Sie einfach [`node::Start` und `node::Init`](https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191) aufrufen, um eine neue Knoten-Instanz zu starten. Wenn Sie jedoch eine komplexe App auf Knotenbasis erstellen Sie müssen APIs wie `node::CreateEnvironment` verwenden, um alle Schritte genau zu steuern.

In Electron wird der Knoten in zwei Modi gestartet: der Standalone-Modus, der im Hauptprozess läuft die den offiziellen Node-Binärdateien ähnlich ist, und den eingebetteten Modus der Knoten-APIs in Webseiten einfügt. Die Details dazu werden in einem zukünftigen Beitrag erklärt.

