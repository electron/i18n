---
title: 'Electron Internals: Using Node as a Library'
author: zcbenz
date: '2016-08-08'
---

Dies ist der zweite Beitrag in einer laufenden Serie zur Erläuterung der Internen von Electron. Check out the [first post][event-loop] about event loop integration if you haven't already.

Die meisten Benutzer verwenden [Knoten](https://nodejs.org) für Serveranwendungen aber wegen der reichen API Set und der blühenden Community von Node eignet es sich auch hervorragend für eine eingebettete Bibliothek. Dieser Beitrag erklärt, wie Knoten als Bibliothek in Electron verwendet wird.

---

## System erstellen

Both Node and Electron use [`GYP`][gyp] as their build systems. Wenn du Knoten in deine App einbetten möchtest, musst du ihn auch als dein Build-System verwenden.

Neu bei `GYP`? Read [this guide][gyp-docs] before you continue further in this post.

## Flaggen des Knotens

The [`node.gyp`][nodegyp] file in Node's source code directory describes how Node is built, along with lots of [`GYP`][gyp] variables controlling which parts of Node are enabled and whether to open certain configurations.

Um die Build-Flags zu ändern, müssen Sie die Variablen in der `.gypi` Datei Ihres Projekts setzen. Das `configure` Skript in Knoten kann einige übliche Konfigurationen für Sie erzeugen, zum Beispiel unter `. configure --shared` generiert eine `config.gypi` mit Variablen, die den Knoten anweisen, als freigegebene Bibliothek zu bauen.

Electron verwendet nicht das `configure` Skript, da es eigene Build-Skripte hat. The configurations for Node are defined in the [`common.gypi`][commongypi] file in Electron's root source code directory.

## Knoten mit Electron verknüpfen

In Electron, Knoten wird als Shared Library verknüpft, indem die `GYP` Variable `node_shared` auf `true`gesetzt wird, so wird der Build-Typ von Knoten von `ausführbar` zu `shared_library`geändert , und der Quellcode, der den `Haupt-` Eintrag enthält, wird nicht kompiliert.

Da Electron die mit Chromium ausgelieferte V8-Bibliothek verwendet, wird die V8-Bibliothek im Quellcode von Node nicht verwendet. Dies geschieht durch Setzen von `node_use_v8_platform` und `node_use_bundled_v8` auf `false`.

## Gemeinsame Bibliothek oder statische Bibliothek

When linking with Node, there are two options: you can either build Node as a static library and include it in the final executable, or you can build it as a shared library and ship it alongside the final executable.

In Electron wurde Node lange Zeit als statische Bibliothek gebaut. This made the build simple, enabled the best compiler optimizations, and allowed Electron to be distributed without an extra `node.dll` file.

However, this changed after Chrome switched to use [BoringSSL][boringssl]. BoringSSL is a fork of [OpenSSL][openssl] that removes several unused APIs and changes many existing interfaces. Da der Knoten immer noch OpenSSL verwendet, würde der Compiler zahlreiche Verknüpfungsfehler aufgrund widersprüchlicher Symbole erzeugen, wenn sie miteinander verknüpft würden.

Electron couldn't use BoringSSL in Node, or use OpenSSL in Chromium, so the only option was to switch to building Node as a shared library, and [hide the BoringSSL and OpenSSL symbols][openssl-hide] in the components of each.

Diese Änderung brachte Electron einige positive Nebenwirkungen. Vor diesem ändern können Sie die ausführbare Datei von Electron unter Windows nicht umbenennen, wenn Sie native Module verwendet haben, da der Name der ausführbaren Datei in der Import-Bibliothek fest kodiert ist. After Node was built as a shared library, this limitation was gone because all native modules were linked to `node.dll`, whose name didn't need to be changed.

## Unterstütze native Module

[Native modules][native-modules] in Node work by defining an entry function for Node to load, and then searching the symbols of V8 and libuv from Node. Dies ist ein bisschen störend für Einbetter, da die Symbole von V8 und libuv standardmäßig versteckt sind, wenn Knoten als Bibliothek erstellt wird und native Module nicht geladen werden weil sie die Symbole nicht finden können.

Um also native Module funktionieren zu lassen, wurden die V8 und libuv Symbole in Electron ausgestellt. For V8 this is done by [forcing all symbols in Chromium's configuration file to be exposed][v8-expose]. For libuv, it is achieved by [setting the `BUILDING_UV_SHARED=1` definition][libuv-expose].

## Starte Knoten in deiner App

Nach der Arbeit des Bauens und der Verlinkung mit dem Knoten ist der letzte Schritt, Knoten in Ihrer App auszuführen.

Knoten stellt nicht viele öffentliche APIs bereit, um sich selbst in andere Apps einzubetten. Usually, you can just call [`node::Start` and `node::Init`][node-start] to start a new instance of Node. Wenn Sie jedoch eine komplexe App auf Knotenbasis erstellen Sie müssen APIs wie `node::CreateEnvironment` verwenden, um alle Schritte genau zu steuern.

In Electron wird der Knoten in zwei Modi gestartet: der Standalone-Modus, der im Hauptprozess läuft die den offiziellen Node-Binärdateien ähnlich ist, und den eingebetteten Modus der Knoten-APIs in Webseiten einfügt. Die Details dazu werden in einem zukünftigen Beitrag erklärt.

[gyp]: https://gyp.gsrc.io
[nodegyp]: https://github.com/nodejs/node/blob/v6.3.1/node.gyp
[commongypi]: https://github.com/electron/electron/blob/master/common.gypi
[openssl-hide]: https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218
[v8-expose]: https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122
[libuv-expose]: https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228
[node-start]: https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191
[event-loop]: https://electronjs.org/blog/2016/07/28/electron-internals-node-integration
[gyp-docs]: https://gyp.gsrc.io/docs/UserDocumentation.md
[native-modules]: https://nodejs.org/api/addons.html
[boringssl]: https://boringssl.googlesource.com/boringssl
[openssl]: https://www.openssl.org

