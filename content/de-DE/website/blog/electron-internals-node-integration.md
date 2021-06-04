---
title: 'Electron Internals: Message Loop Integration'
author: zcbenz
date: '2016-07-28'
---

Dies ist der erste Beitrag einer Serie, die die Internen von Electron erklärt. Dieser Beitrag stellt vor, wie die Ereignisschleife von Knoten mit Chromium in Electron integriert ist.

---

Es gab viele Versuche, Knoten für GUI-Programmierung zu verwenden, wie [node-gui](https://github.com/zcbenz/node-gui) für GTK+ Bindungen und [node-qt](https://github.com/arturadib/node-qt) für QT Bindings. But none of them work in production because GUI toolkits have their own message loops while Node uses libuv for its own event loop, and the main thread can only run one loop at the same time. So the common trick to run GUI message loop in Node is to pump the message loop in a timer with very small interval, which makes GUI interface response slow and occupies lots of CPU resources.

During the development of Electron we met the same problem, though in a reversed way: we had to integrate Node's event loop into Chromium's message loop.

## Der Hauptprozess und der Renderer-Prozess

Bevor wir in die Details der Integration von Message-Schleifen eintauchen, erkläre ich zuerst die Multiprozess-Architektur von Chromium.

In Electron gibt es zwei Arten von Prozessen: den Hauptprozess und den Renderer Prozess (dies ist eigentlich sehr vereinfacht, für eine vollständige Ansicht siehe [Multiprozess-Architektur](http://dev.chromium.org/developers/design-documents/multi-process-architecture)). Der Hauptprozess ist für GUI verantwortlich wie das Erstellen von Fenstern, während sich der Renderer-Prozess nur mit beschäftigt, die Webseiten laufen lassen und rendern.

Mit Electron können Sie sowohl den Hauptprozess als auch den Renderer Prozess steuern, was bedeutet, dass wir Knoten in beide Prozesse integrieren müssen.

## Ersetze Chromiums Nachrichten-Schleife durch libuv

Mein erster Versuch war die Reimplementierung von Chromiums Nachrichten-Schleife mit libuv.

Es war einfach für den Renderer-Prozess, da seine Nachrichten-Schleife nur auf Dateideskriptoren und Timer lauschte und ich brauchte nur um die Schnittstelle mit libuv zu implementieren.

Allerdings war es für den Hauptprozess wesentlich schwieriger. Jede Plattform hat ihre eigene Art von GUI-Nachrichtenschleifen. macOS Chromium verwendet `NSRunLoop`, während Linux glib verwendet. Ich habe viele Hacks versucht, die zugrunde liegenden Dateideskriptoren aus den nativen GUI-Nachrichten-Schleifen zu extrahieren, und dann fütterte sie zu libuv für Iteration, aber ich traf immer noch Randfälle, die nicht funktionierten.

Also habe ich endlich einen Timer hinzugefügt, um die GUI-Nachrichtenschleife in einem kleinen Intervall zu befragen. Als nahm der Prozess eine konstante CPU-Auslastung auf und bestimmte Operationen hatten lange Verzögerungen.

## Ereignis-Schleife des Knotens in einem separaten Thread abfragen

Als libuv ausgereift war, war es dann möglich, einen anderen Ansatz zu wählen.

Das Konzept von backend fd wurde in libuv eingeführt, welches ein Dateideskriptor (oder Handle) ist, dass libuv Umfragen für seine Ereignisschleife enthält. Durch Abfragen des Backends fd kann benachrichtigt werden, wenn ein neues Ereignis in libuv vorhanden ist.

Also habe ich in Electron einen separaten Thread erstellt, um das Backend fd zu befragen und da ich statt libuv APIs die Systemaufrufe für die Abfrage verwendet habe, war es Thread sicher. Und wann immer ein neues Ereignis in libuvs Ereignisschleife stattgefunden hat, würde eine Nachricht in der Chromium's Nachrichten-Schleife gepostet werden, und die Ereignisse von libuv würden dann im Hauptthread verarbeitet.

In this way I avoided patching Chromium and Node, and the same code was used in both the main and renderer processes.

## Der Code

You can find the implemention of the message loop integration in the `node_bindings` files under [`electron/atom/common/`][node-bindings]. Es kann leicht für Projekte wiederverwendet werden, die Knoten integrieren wollen.

*Update: Implementation moved to [`electron/shell/common/node_bindings.cc`](https://github.com/electron/electron/blob/master/shell/common/node_bindings.cc).*

[node-bindings]: https://github.com/electron/electron/tree/main/atom/common
