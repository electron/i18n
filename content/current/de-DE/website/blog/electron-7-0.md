---
title: Electron 7.0.0
author:
  - sofianguy
  - ckerr
date: '2019-10-22'
---

Electron 7.0.0 wurde veröffentlicht! It includes upgrades to Chromium 78, V8 7.8, and Node.js 12.8.1. We've added a Window on Arm 64 release, faster IPC methods, a new `nativeTheme` API, and much more!

---

Das Electron Team freut sich über die Veröffentlichung von Electron 7.0.0! Sie können es mit npm installieren über `npm electron@latest` installieren oder von unserer [Release-Website](https://electronjs.org/releases/stable) herunterladen. Das Release ist voll mit Upgrades, Korrekturen und neuen Features. Wir können nicht warten, was du mit ihnen baust! Lesen Sie weiter für Details zu dieser Version, und teilen Sie bitte Ihr Feedback!

## Bemerkenswerte Änderungen
 * Stack-Upgrades:

   | Stapel  | Version in Electron 6 | Version in Electron 7 | Was ist neu                                                                                                                                                                                                                                                               |
   |:------- |:--------------------- |:--------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Chrom   | 76.0.3809.146         | **78.0.3905.1**       | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8      | 7.6                   | **7.8**               | [7.7](https://v8.dev/blog/v8-release-77), [7.8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js | 12.4.0                | **12.8.1**            | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * Windows auf Arm (64 bit) Version hinzugefügt. [#18591](https://github.com/electron/electron/pull/18591), [#20112](https://github.com/electron/electron/pull/20112)
 * `ipcRenderer.invoke()` und `ipcMain.handle()` für asynchrone Anfrage/Antwort-Art IPC hinzugefügt. Diese werden über das `Remote-` Modul dringend empfohlen. Siehe dieses "[Electrons Modul "Remote" für schädliche](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)" Blog-Post für weitere Informationen. [#18449](https://github.com/electron/electron/pull/18449)
 * `nativeTheme` API hinzugefügt, um auf Änderungen im Design und Farbschema des Betriebssystems zu reagieren und zu lesen. [#19758](https://github.com/electron/electron/pull/19758), [#20486](https://github.com/electron/electron/pull/20486)
 * Auf einen neuen TypeScript Definitionen [Generator](https://github.com/electron/docs-parser) gewechselt. Die resultierenden Definitionen sind präziser. Wenn also Ihr TypeScript Build fehlschlägt, ist dies die wahrscheinliche Ursache. [#18103](https://github.com/electron/electron/pull/18103)

Eine längere Liste der Änderungen finden Sie in den [7.0.0 Versionshinweisen](https://github.com/electron/electron/releases/tag/v7.0.0).

## Breaking Changes

Weitere Informationen zu diesen und zukünftigen Änderungen finden Sie auf der [geplanten Änderungen](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md) Seite.

 * Veraltete APIs entfernt:
     * Callback-basierte Versionen von Funktionen, die jetzt Promises verwenden. [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS). [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu()`,
     * `app.setApplicationMenu()`,
     * `powerMonitor.querySystemIdleState()`,
     * `powerMonitor.querySystemIdleTime()`,
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`,
     * `webFrame.setIsolatedWorldHumanReadableName()`,
     * `webFrame.setIsolatedWorldSecurityOrigin()` [#18159](https://github.com/electron/electron/pull/18159)
 * `Session.clearAuthCache()` erlaubt das Filtern der geleerten Cache-Einträge nicht mehr. [#17970](https://github.com/electron/electron/pull/17970)
 * Native Schnittstellen auf macOS (Menüs, Dialoge, etc.) passen nun automatisch zu den dunklen Modus-Einstellungen auf dem Rechner des Benutzers. [#19226](https://github.com/electron/electron/pull/19226)
 * Aktualisierte das `Elektron` Modul, um `@electron/get` zu verwenden.  Die minimal unterstützte Knotenversion ist jetzt Node 8. [#18413](https://github.com/electron/electron/pull/18413)
 * Die Datei `electron.asar` existiert nicht mehr. Jedes Paketierungsskript, das von seiner Existenz abhängt, sollte aktualisiert werden. [#18577](https://github.com/electron/electron/pull/18577)

## Ende der Unterstützung für 4.x.y

Electron 4.x.y hat das Ende der Unterstützung gemäß der [Unterstützungsrichtlinie des Projekts erreicht](https://electronjs.org/docs/tutorial/support#supported-versions). Entwickler und Anwendungen werden ermutigt, auf eine neuere Version von Electron zu aktualisieren.

## App Feedback Programm

Wir verwenden weiterhin unser [App Feedback Programm](https://electronjs.org/blog/app-feedback-program) zum Testen weiter. Projekte, die an diesem Programm teilnehmen, testen Electron Betas auf ihren Apps; und im Gegenzug werden die neuen Fehler, die sie finden, für das stabile Release priorisiert. Wenn du teilnehmen möchtest oder mehr erfahren möchtest, [schaue dir unseren Blogbeitrag über das Programm an](https://electronjs.org/blog/app-feedback-program).

## Was ist als Nächstes

Kurzfristig Sie können erwarten, dass sich das Team weiterhin auf die Entwicklung der wichtigsten Komponenten konzentriert, aus denen Electron besteht, einschließlich Chromium, Knoten und V8. Obwohl wir darauf achten, keine Versprechungen über Veröffentlichungstermine zu machen, unser Plan ist die Veröffentlichung neuer Hauptversionen von Electron mit neuen Versionen dieser Komponenten etwa vierteljährlich. Der [vorläufige 8.0.0 Zeitplan](https://electronjs.org/docs/tutorial/electron-timelines) legt Schlüsseldaten im Entwicklungslebenszyklus von Electron 8 fest. Siehe [auch unser Versionierungsdokument](https://electronjs.org/docs/tutorial/electron-versioning) für genauere Informationen zur Versionierung in Electron.

Für Informationen über geplante Änderungen in zukünftigen Versionen von Electron, [lesen Sie unseren geplanten Breaking Changes Doc](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
