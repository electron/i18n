---
title: Elektron 11.0.0
author:
  - VerteDinde
date: '2020-11-17'
---

Electron 11.0.0 wurde veröffentlicht! Es enthält Upgrades auf Chromium `87`, V8 `8.7`und Node.js `12.18.3`. Wir haben Unterstützung für Apple-Silizium und allgemeine Verbesserungen hinzugefügt. Lesen Sie unten für weitere Details!

---

Das Electron-Team freut sich, die Veröffentlichung von Electron 11.0.0 ankündigen zu können! Sie können es mit npm installieren über `npm electron@latest` installieren oder von unserer [Release-Website](https://electronjs.org/releases/stable) herunterladen. Die Version ist vollgepackt mit Upgrades, Korrekturen und neuer Unterstützung für Apples M1-Hardware.

Wir können nicht warten, was du mit ihnen baust! Lesen Sie weiter für Details zu dieser Version, und teilen Sie bitte Ihr Feedback!

## Bemerkenswerte Änderungen

### Stapeländerungen

* Chrom- `87.0.4280.47`
    * [Neu in Chrome 86](https://developers.google.com/web/updates/2020/10/nic86)
    * [Neu in Chrome 87](https://developers.google.com/web/updates/2020/11/nic87)
* Knoten.js `12.18.3`
    * [Knoten 12.18.3 Blogbeitrag](https://nodejs.org/en/blog/release/v12.18.3/)
    * [Blogbeitrag Knoten 12.7.0](https://nodejs.org/en/blog/release/v12.17.0/)
* V8- `8.7`
    * [V8 8.6 Blog-Beitrag](https://v8.dev/blog/v8-release-86)
    * [V8 8.7 Blog-Beitrag](https://v8.dev/blog/v8-release-87)

### Merkmale hervorheben

* Support für Apple M1: Am 10. November kündigte Apple seine [neuen M1-Chips an, die in der kommenden Hardware-](https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/)enthalten sein werden. Ab Electron 11 wird Electron separate Versionen von Electron für Intel Macs (x64) und Apples kommende M1-Hardware (arm64) versenden. Weitere Informationen dazu, wie Sie Ihre Electron-App [auf Apples M1-Hardware ausführen, erfahren Sie hier.](https://www.electronjs.org/blog/apple-silicon) [#24545](https://github.com/electron/electron/pull/24545)
* V8-Absturzmeldung und Standortinformationen zu crashReport-Parametern hinzugefügt. [#24771](https://github.com/electron/electron/pull/24771)
* Die Leistung beim Senden breiter Objekte über die Kontextbrücke wurde verbessert. [#24671](https://github.com/electron/electron/pull/24671)

Eine vollständige Liste der neuen Funktionen und Änderungen finden Sie in den [11.0.0-Versionshinweisen](https://github.com/electron/electron/releases/tag/v11.0.0) .

## Breaking Changes

* Entfernte experimentelle APIs: `BrowserView.{fromId, fromWebContents, getAllViews}` und die `id` Eigenschaft von `BrowserView`. [#23578](https://github.com/electron/electron/pull/23578)

Weitere Informationen zu diesen und zukünftigen Änderungen finden Sie auf der [geplanten Änderungen](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) Seite.

## API-Änderungen

* Es wurde `app.getApplicationInfoForProtocol()` -API hinzugefügt, die detaillierte Informationen über die App zurückgibt, die ein bestimmtes Protokoll verarbeitet. [#24112](https://github.com/electron/electron/pull/24112)
* Es wurde `app.createThumbnailFromPath()` -API hinzugefügt, die ein Vorschaubild einer Datei mit ihrem Dateipfad und einer maximalen Miniaturansichtsgröße zurückgibt. [#24802](https://github.com/electron/electron/pull/24802)
* `webContents.forcefullyCrashRenderer()` hinzugefügt, um einen Rendererprozess gewaltsam zu beenden, um die Wiederherstellung eines hängenden Renderers zu unterstützen. [#25756](https://github.com/electron/electron/pull/25756)

## Ende der Unterstützung für 8.x.y

Electron 8.x.y hat gemäß der [Support-Richtlinie des Projekts](https://electronjs.org/docs/tutorial/support#supported-versions)das Ende der Unterstützung erreicht. Entwickler und Anwendungen werden ermutigt, auf eine neuere Version von Electron zu aktualisieren.

## Was ist als Nächstes

Kurzfristig Sie können erwarten, dass sich das Team weiterhin auf die Entwicklung der wichtigsten Komponenten konzentriert, aus denen Electron besteht, einschließlich Chromium, Knoten und V8. Obwohl wir darauf achten, keine Versprechungen über Veröffentlichungstermine zu machen, ist unser Plan, neue Hauptversionen von Electron mit neuen Versionen dieser Komponenten etwa vierteljährlich zu veröffentlichen. Der [vorläufigen 12.0.0-Zeitplan](https://electronjs.org/docs/tutorial/electron-timelines) die wichtigsten Daten im Entwicklungslebenszyklus von Electron 12.0 abbildet. Siehe [auch unser Versionierungsdokument](https://electronjs.org/docs/tutorial/electron-versioning) für genauere Informationen zur Versionierung in Electron.

Für Informationen über geplante Änderungen in zukünftigen Versionen von Electron, [lesen Sie unseren geplanten Breaking Changes Doc](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Fortsetzung der Arbeiten zur Veraltung des `remote` Moduls
Wir haben mit der Entfernung des `remote` Moduls in [Electron 9](https://www.electronjs.org/blog/electron-9-0)begonnen. Wir planen, das `remote` Modul selbst in Electron 14 zu entfernen.

Lesen und befolgen Sie [dieser Ausgabe](https://github.com/electron/electron/issues/21408) , um vollständige Pläne und Details für die Veraltung zu erhalten.

### Letzter Schritt für die Anforderung, dass systemeigene Knotenmodule kontextbewusst oder N-API sein müssen (in Electron 12)
Seit Electron 6 legen wir den Grundstein dafür, dass [nativen Knotenmodule im Renderer-Prozess geladen](https://nodejs.org/api/addons.html) , entweder [N-API-](https://nodejs.org/api/n-api.html) oder [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons)sein. Die Durchsetzung dieser Änderung ermöglicht eine höhere Sicherheit, eine schnellere Leistung und eine geringere Wartungslast. Der letzte Schritt dieses Plans besteht darin, die Möglichkeit zu entfernen, die Wiederverwendung des Renderprozesses in Electron 12 zu deaktivieren.

Lesen und verfolgen Sie [dieser Ausgabe](https://github.com/electron/electron/issues/18397) , um alle Details, einschließlich des vorgeschlagenen Zeitplans, zu erhalten.
