---
title: Electron 10.0.0
author:
  - VerteDinde
  - sofianguy
date: '2020-08-25'
---

Electron 10.0.0 wurde freigegeben! Es enthält Upgrades auf Chromium `85`, V8 `8.5`und Node.js `12.16`. Wir haben einige neue API-Integrationen und Verbesserungen hinzugefügt. Lesen Sie unten für weitere Details!

---

Das Electron Team freut sich über die Veröffentlichung von Electron 10.0.0! Sie können es mit npm installieren über `npm electron@latest` installieren oder von unserer [Release-Website](https://electronjs.org/releases/stable) herunterladen. Das Release ist voll mit Upgrades, Korrekturen und neuen Features.

In der Version Electron 10 haben wir auch eine Änderung an unseren Release-Notizen vorgenommen. Um es einfacher zu machen, was in Electron 10 brandneu ist und was sich zwischen Electron 10 und früheren Versionen geändert haben könnte, nun auch Änderungen enthalten, die an Electron 10 eingeführt wurden, aber auf frühere Versionen zurückportiert wurden. Wir hoffen, dass dies es Apps einfacher macht, neue Funktionen und Fehlerbehebungen beim Upgrade von Electron zu finden.

Wir können nicht warten, was du mit ihnen baust! Lesen Sie weiter für Details zu dieser Version, und teilen Sie bitte Ihr Feedback!

## Bemerkenswerte Änderungen

### Stapeländerungen

* Chrom `85.0.4183.84`
    * [Neu in Chrome 84](https://developers.google.com/web/updates/2020/07/nic84)
    * [Neu in Chrome 85](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [Knoten 12.16.3 Blog-Beitrag](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [V8 8.4 Blog-Beitrag](https://v8.dev/blog/v8-release-84)
    * [V8 8.5 Blog-Beitrag](https://v8.dev/blog/v8-release-85)

### Merkmale hervorheben

* `contents.getBackgroundThrottling()` Methode und `contents.backgroundThrottling` Eigenschaft hinzugefügt. [#21036]
* Das Modul `desktopCapturer` im Hauptprozess enthüllt. [#23548](https://github.com/electron/electron/pull/23548)
* Kann nun überprüfen, ob eine gegebene `-Sitzung` persistent ist, indem die `ses.isPersistent()` API aufgerufen wird. [#22622](https://github.com/electron/electron/pull/22622)
* Beheben Sie Netzwerkprobleme, die die Verbindung von RTC-Anrufen aufgrund von Änderungen der Netzwerk-IP-Adresse und ICE verhinderten. (Chrom-Problem 1113227). [#24998](https://github.com/electron/electron/pull/24998)

In den [10.0.0 Versionshinweisen](https://github.com/electron/electron/releases/tag/v10.0.0) finden Sie eine vollständige Liste der neuen Funktionen und Änderungen.

## Breaking Changes

* Standardwert von `aktiviertes RemoteModule` auf `false` geändert. [#22091](https://github.com/electron/electron/pull/22091)
    * Dies ist Teil unserer Pläne, das `-entfernte` Modul zu verwerfen und in das Benutzerland zu verschieben. Sie können [dieses Ticket](https://github.com/electron/electron/issues/21408) lesen und verfolgen, das unsere Gründe dafür detailliert und eine vorgeschlagene Zeitleiste für die Deprecation enthält.
* Standardwert von `app.allowRendererProcessReuse` auf `true` geändert. [#22336](https://github.com/electron/electron/pull/22336) (Auch in [Electron 9](https://github.com/electron/electron/pull/22401))
   * Dies verhindert das Laden von nicht-kontextabhängigen nativen Modulen in Renderer-Prozessen.
   * Sie können [dieses Ticket](https://github.com/electron/electron/issues/18397) lesen und verfolgen, das unsere Gründe dafür detailliert und eine vorgeschlagene Zeitleiste für die Deprecation enthält.
* Die Positionierung der Fenstertasten auf macOS wurde behoben, wenn die OS-Gebietsschema auf eine RTL-Sprache (wie Arabisch oder Hebräisch) eingestellt wurde. Framellose Fenster-Apps müssen möglicherweise für diese Änderung verantwortlich sein, während sie ihre Fenster stiften. [#22016](https://github.com/electron/electron/pull/22016)

Weitere Informationen zu diesen und zukünftigen Änderungen finden Sie auf der [geplanten Änderungen](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) Seite.

## API-Änderungen

* Sitzung: Kann nun überprüfen, ob eine gegebene `-Sitzung` persistent ist, indem die `ses.isPersistent()` API aufgerufen wird. [#22622](https://github.com/electron/electron/pull/22622)
* Inhalte: `contents.getBackgroundThrottling()` Methode und `contents.backgroundThrottling` Eigenschaft hinzugefügt. [#21036](https://github.com/electron/electron/pull/21036)

### Veraltete APIs

Die folgenden APIs sind jetzt veraltet oder entfernt:

* Die veraltete Eigenschaft `aktuelles LoggingPath` von `netLog` entfernt. Außerdem gibt `netLog.stopLogging` den Pfad zum aufgezeichneten Log nicht mehr zurück. [#22732](https://github.com/electron/electron/pull/22732)
* Veraltete unkomprimierte Absturz-Uploads im `crashReporter`. [#23598](https://github.com/electron/electron/pull/23598)

## Ende der Unterstützung für 7.x.y

Electron 7.x.y hat das Ende der Unterstützung gemäß der [Unterstützungspolitik des Projekts](https://electronjs.org/docs/tutorial/support#supported-versions) erreicht. Entwickler und Anwendungen werden ermutigt, auf eine neuere Version von Electron zu aktualisieren.

## Was ist als Nächstes

Kurzfristig Sie können erwarten, dass sich das Team weiterhin auf die Entwicklung der wichtigsten Komponenten konzentriert, aus denen Electron besteht, einschließlich Chromium, Knoten und V8. Obwohl wir darauf achten, keine Versprechungen über Veröffentlichungstermine zu machen, unser Plan ist die Veröffentlichung neuer Hauptversionen von Electron mit neuen Versionen dieser Komponenten etwa vierteljährlich. Der [vorläufige 11.0.0 Zeitplan](https://electronjs.org/docs/tutorial/electron-timelines) legt Schlüsseldaten im Entwicklungslebenszyklus von Electron 11.0 fest. Siehe [auch unser Versionierungsdokument](https://electronjs.org/docs/tutorial/electron-versioning) für genauere Informationen zur Versionierung in Electron.

Für Informationen über geplante Änderungen in zukünftigen Versionen von Electron, [lesen Sie unseren geplanten Breaking Changes Doc](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Weiterarbeiten für die Deprecation von `Remote-Modul` (in Electron 11)
Wir haben begonnen, das Remote-Modul in [Electron 9](https://www.electronjs.org/blog/electron-9-0) zu entfernen und wir setzen die Pläne fort, das `Remote-` -Modul zu entfernen. In Electron 11 planen wir, die Refaktor-Arbeit für die Implementierung von [WeakRef](https://v8.dev/features/weak-references) fortzusetzen, wie wir es in Electron 10 getan haben. Bitte lesen und folgen Sie [diesem Fall](https://github.com/electron/electron/issues/21408) für vollständige Pläne und Details zur Abtretung.

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 12)
_Edit: Originally, this blog post stated that we would disable renderer process reuse in Electron 11. Disabling renderer process reuse has now been pushed to Electron 12._

From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 12. Read [this issue](https://github.com/electron/electron/issues/18397) for full details including the proposed timeline.
