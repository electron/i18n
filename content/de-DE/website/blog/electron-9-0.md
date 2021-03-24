---
title: Electron 9.0.0
author:
  - sofianguy
  - VerteDinde
date: '2020-05-19'
---

Electron 9.0.0 wurde veröffentlicht! Es enthält Upgrades auf Chromium `83`, V8 `8.3`und Node.js `12.14`. Wir haben einige neue API-Integrationen für unsere Rechtschreibprüfung, den aktivierten PDF-Viewer und vieles mehr hinzugefügt!

---

Das Electron Team freut sich über die Veröffentlichung von Electron 9.0.0! Sie können es mit npm installieren über `npm electron@latest` installieren oder von unserer [Release-Website](https://electronjs.org/releases/stable) herunterladen. Das Release ist voll mit Upgrades, Korrekturen und neuen Features. Wir können nicht warten, was du mit ihnen baust! Lesen Sie weiter für Details zu dieser Version, und teilen Sie bitte Ihr Feedback!

## Bemerkenswerte Änderungen

### Stapeländerungen

* Chromium `83.0.4103.64`
    * [Neu in Chrome 81](https://developers.google.com/web/updates/2020/04/nic81)
    * [Chrome 82 wurde übersprungen](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Neu in Chrome 83](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [Knoten 12.14.1 Blogbeitrag](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [V8 8.1 Blog-Beitrag](https://v8.dev/blog/v8-release-81)
    * [V8 8.3 Blog-Beitrag](https://v8.dev/blog/v8-release-83)

### Merkmale hervorheben

* Mehrere Verbesserungen der Rechtschreibprüfungs-Funktion. Weitere Details finden Sie unter [#22128](https://github.com/electron/electron/pull/22128) und [#22368](https://github.com/electron/electron/pull/22368).
* Verbesserte Fenster-Event-Handler Effizienz unter Linux. [#23260](https://github.com/electron/electron/pull/23260).
* PDF-Betrachter aktivieren. [#22131](https://github.com/electron/electron/pull/22131).

Lesen Sie die [9.0.0 Versionshinweise](https://github.com/electron/electron/releases/tag/v9.0.0) für eine vollständige Liste der neuen Funktionen und Änderungen.

## Breaking Changes

* Veraltungswarnung bei Verwendung von `remote` ohne `remoteModule: true`. [#21546](https://github.com/electron/electron/pull/21546)
    * Dies ist der erste Schritt in unseren Plänen, das `-entfernte` -Modul zu verwerfen und es ins Benutzerland zu verschieben. Sie können [dieses Ticket](https://github.com/electron/electron/issues/21408) lesen und verfolgen, das unsere Gründe dafür detailliert und eine vorgeschlagene Zeitleiste für die Deprecation enthält.
* Setze `app.enableRendererProcessReuse` standardmäßig auf true gesetzt. [#22336](https://github.com/electron/electron/pull/22336)
    * Dies wird für eine zukünftige Anforderung fortgesetzt, dass die im Renderer-Prozess geladenen nativen Knotenmodule entweder [N-API](https://nodejs.org/api/n-api.html) oder [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons) sind. Vollständige Informationen und vorgeschlagene Zeitleiste sind in [dieses Ticket](https://github.com/electron/electron/issues/18397) detailliert beschrieben.
* Das Senden von nicht-JavaScript-Objekten über IPC wirft nun eine Ausnahme aus. [#21560](https://github.com/electron/electron/pull/21560)
    * Dieses Verhalten wurde in Electron 8.0 abgeschätzt. In Electron 9.0 wurde der alte Serialisierungsalgorithmus entfernt, und das Senden solcher nicht serialisierbaren Objekte wird nun einen Fehler "Objekt konnte nicht geklont werden" werfen.

Weitere Informationen zu diesen und zukünftigen Änderungen finden Sie auf der [geplanten Änderungen](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) Seite.

## API-Änderungen

* `Shell` API-Änderungen:
   * Die `shell.openItem` API wurde durch eine asynchrone `shell.openPath API` ersetzt. [Vorschlag](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `Sitzung`API-Änderungen:
   * `session.listWordsFromSpellCheckerDictionary` API hinzugefügt, um benutzerdefinierte Wörter im Wörterbuch anzuzeigen. [#22128](https://github.com/electron/electron/pull/22128)
   * `session.removeWordFromSpellCheckerDictionary` API hinzugefügt, um benutzerdefinierte Wörter im Wörterbuch zu entfernen. [#22368](https://github.com/electron/electron/pull/22368)
   * `session.serviceWorkerContext` API hinzugefügt, um auf grundlegende Service-Mitarbeiter-Informationen zuzugreifen und Konsolen-Logs von Service-Mitarbeitern zu erhalten. [#22313](https://github.com/electron/electron/pull/22313)
* `App` API-Änderungen:
   * Fügte `app.focus()` unter macOS einen neuen Force-Parameter hinzu, damit Apps den Fokus erzwingen können. [#23447](https://github.com/electron/electron/pull/23447)
* `BrowserWindow` API-Änderungen:
   * Unterstützung für den Zugriff auf Eigenschaften zu einigen Getter/Setter-Paaren im `BrowserWindow` hinzugefügt. [#23208](https://github.com/electron/electron/pull/23208)

### Veraltete APIs

Die folgenden APIs sind jetzt veraltet oder entfernt:

* `shell.openItem` API wird jetzt abgeschrieben und durch eine asynchrone `shell.openPath API` ersetzt.
* `<webview>.getWebContents`, die in Electron 8.0 veraltet war, wird nun entfernt.
* `webFrame.setLayoutZoomLevelLimits`, die in Electron 8.0 veraltet waren, wird nun entfernt.

## Ende der Unterstützung für 6.x.y

Electron 6.x.y hat das Ende der Unterstützung gemäß der [Unterstützungsrichtlinie des Projekts erreicht](https://electronjs.org/docs/tutorial/support#supported-versions). Entwickler und Anwendungen werden ermutigt, auf eine neuere Version von Electron zu aktualisieren.

## Was ist als Nächstes

Kurzfristig Sie können erwarten, dass sich das Team weiterhin auf die Entwicklung der wichtigsten Komponenten konzentriert, aus denen Electron besteht, einschließlich Chromium, Knoten und V8. Obwohl wir darauf achten, keine Versprechungen über Veröffentlichungstermine zu machen, unser Plan ist die Veröffentlichung neuer Hauptversionen von Electron mit neuen Versionen dieser Komponenten etwa vierteljährlich. Der [vorläufige 10.0.0 Zeitplan](https://electronjs.org/docs/tutorial/electron-timelines) zeigt Schlüsseldaten im Entwicklungslebenszyklus von Electron 10.0 an. Siehe [auch unser Versionierungsdokument](https://electronjs.org/docs/tutorial/electron-versioning) für genauere Informationen zur Versionierung in Electron.

Für Informationen über geplante Änderungen in zukünftigen Versionen von Electron, [lesen Sie unseren geplanten Breaking Changes Doc](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Ändern Sie die Standardeinstellung von `Kontext-Isolation` von `false` auf `true` (Start in Electron 10)

Ohne KontextIsolation kann jeder Code, der in einem Renderer-Prozess ausgeführt wird, ganz einfach in Electron-Interfaces oder in das Vorlade-Skript einer App gelangen. Dieser Code kann dann privilegierte Aktionen ausführen, die Electron einschränken möchte.

Das Ändern dieser Voreinstellung verbessert die Standardsicherheit von Electron-Apps, so dass Apps bewusst auf das unsichere Verhalten zugreifen müssen. Electron wertet den aktuellen Standard von `KontextIsolation` in Electron 10 ab. , und ändern Sie die neue Voreinstellung (`true`) in Electron 12.0.

Für weitere Informationen über `Kontext-Isolation`, Wie Sie es einfach und sicher aktivieren können, lesen Sie bitte unser dediziertes [Kontextisolierungsdokument](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md).
