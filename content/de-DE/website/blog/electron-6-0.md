---
title: Electron 6.0.0
author:
  - sofianguy
  - ckerr
  - codebytere
date: '2019-07-30'
---

Das Electron Team freut sich über die Veröffentlichung von Electron 6.0.0! Sie können es mit npm installieren über `npm electron@latest` installieren oder von unserer [Release-Website](https://electronjs.org/releases/stable) herunterladen. Das Release ist voll mit Upgrades, Korrekturen und neuen Features. Wir können nicht warten, was du mit ihnen baust! Lesen Sie weiter für Details zu dieser Version, und teilen Sie bitte Ihr Feedback!

---

## Was ist neu

Today marks a first for the Electron project: this is the first time we've made a stable Electron release **on the same day** as the corresponding [Chrome stable release](https://www.chromestatus.com/features/schedule)! 🎉

Ein Großteil der Funktionen von Electronic wird von den Kernkomponenten von Chromium, Node.js und V8 bereitgestellt. Electron hält über diese Projekte auf dem Laufenden, um unseren Nutzern neue JavaScript-Funktionen, Performance-Verbesserungen und Sicherheits-Korrekturen zu bieten. Jedes dieser Pakete hat einen Haupt-Versions-Bump in Electron 6:

- Chromium `76.0.3809.88`
  - [Neu in 74](https://developers.google.com/web/updates/2019/04/nic74)
  - [Neu in 75](https://developers.google.com/web/updates/2019/06/nic75)
  - [Neu in 76](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [Knoten 12.4.0 Blogbeitrag](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [V8 7.6 Blog-Beitrag](https://v8.dev/blog/v8-release-76)

Diese Version enthält auch Verbesserungen an den API von Electron. [Die Versionshinweise](https://github.com/electron/electron/releases/tag/v6.0.0) haben eine vollständigere Liste, aber hier sind die Highlights:

### Promisification

Electron 6.0 setzt die in 5.0 gestartete Modernisierung [-Initiative](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) fort, um die Unterstützung von [Zusage](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) zu verbessern.

Diese Funktionen geben jetzt Versprechungen zurück und unterstützen immer noch ältere Callback-basierte Anrufe:
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
 * `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
 * `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
 * `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
 * `inAppPurchase.purchaseProduct()`[#17355](https://github.com/electron/electron/pull/17355)
 * `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
 * `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
 * `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
 * `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
 * `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
 * `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
 * `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
 * `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
 * `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
 * `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
 * `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)

Diese Funktionen haben nun zwei Formen, synchron und promise-basiert asynchron:
 * `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

Diese Funktionen geben jetzt Versprechungen zurück:
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `Electron Helper (Renderer).app`, `Electron Helper (GPU).app` und `Electron Helper (Plugin).app`

Um die [gehärtete Laufzeit zu aktivieren,](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc), was Dinge wie schreibbaren ausführbaren Speicher und das Laden von Code beschränkt, der von einer anderen Team ID signiert wurde, spezielle Codesignierungsansprüche mussten dem Helfer gewährt werden.

Um diese Ansprüche auf die Prozessarten auszudehnen, die sie benötigen Chromium [hat](https://chromium-review.googlesource.com/c/chromium/src/+/1627456) drei neue Varianten der Helper App hinzugefügt: eine für Renderer (`Electron Helper (Renderer). pp`), einer für den GPU-Prozess (`Electron Helper (GPU). pp`) und eins für Plugins (`Electron Helper (Plugin).app`).

Folks using `electron-osx-sign` to codesign their Electron app shouldn't have to make any changes to their build logic. Wenn Sie Ihre App mit benutzerdefinierten Skripten kodesignen, sollten Sie sicherstellen, dass die drei neuen Helfer-Anwendungen korrekt programmiert sind.

Um Ihre Anwendung korrekt mit diesen neuen Helfern zu verpacken, müssen Sie `electron-packager@14.0.4` oder höher verwenden.  Wenn Sie `Elektron-Builder` verwenden, sollten Sie [dieses Problem](https://github.com/electron-userland/electron-builder/issues/4104) folgen, um die Unterstützung für diese neuen Helfer zu verfolgen.

## Breaking Changes

 * Diese Version beginnt mit der Grundlage, dass die im Renderer-Prozess geladenen nativen Knotenmodule entweder [N-API](https://nodejs.org/api/n-api.html) oder [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons) sind. Die Gründe für diese Änderung sind schnellere Leistung, höhere Sicherheit und geringere Wartungsbelastung. Lesen Sie die vollständigen Details einschließlich der vorgeschlagenen Zeitleiste in [dieses Ticket](https://github.com/electron/electron/issues/18397). Diese Änderung wird voraussichtlich in Electron v11 abgeschlossen sein.

 * `net.IncomingMessage` Kopfzeilen haben [leicht](https://github.com/electron/electron/pull/17517#issue-263752903) geändert, um dem [Knoten näher zu kommen. s Verhalten](https://nodejs.org/api/http.html#http_message_headers), insbesondere mit dem Wert `Set-Cookie` und wie mit duplizierten Headern umgegangen wird. [#17517](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInFolder()` gibt nun ungültig zurück und ist ein asynchroner Aufruf. [#17121](https://github.com/electron/electron/pull/17121)

 * Apps müssen nun explizit einen Logpfad setzen, indem sie die neue Funktion `app.setAppLogPath()` aufrufen, bevor Sie `app.getPath('log')` verwenden. [#17841](https://github.com/electron/electron/pull/17841)

## Ende der Unterstützung für 3.x.y

Nach unserer [-Unterstützungspolitik](https://electronjs.org/docs/tutorial/support#supported-versions)hat 3.x.y das Ende des Lebens erreicht. Entwickler und Anwendungen werden ermutigt, auf eine neuere Version von Electron zu aktualisieren.

## App Feedback Programm

Wir verwenden weiterhin unser [App Feedback Programm](https://electronjs.org/blog/app-feedback-program) für Tests. Projekte, die an diesem Programm teilnehmen, testen Electron-Betas auf ihren Apps; und im Gegenzug werden die neuen Fehler, die sie finden, für die stabile Veröffentlichung priorisiert. If you'd like to participate or learn more, [check out our blog post about the program](https://electronjs.org/blog/app-feedback-program).

## Was ist als Nächstes

Kurzfristig Sie können erwarten, dass sich das Team weiterhin auf die Entwicklung der wichtigsten Komponenten konzentriert, aus denen Electron besteht, einschließlich Chromium, Knoten und V8. Obwohl wir darauf achten, keine Versprechungen über Veröffentlichungstermine zu machen, unser Plan ist die Veröffentlichung neuer Hauptversionen von Electron mit neuen Versionen dieser Komponenten etwa vierteljährlich. Der [vorläufige 7.0.0 Zeitplan](https://electronjs.org/docs/tutorial/electron-timelines) legt Schlüsseldaten im Entwicklungslebenszyklus von Electron 7 fest. Siehe [auch unser Versionierungsdokument](https://electronjs.org/docs/tutorial/electron-versioning) für genauere Informationen zur Versionierung in Electron.

Für Informationen über geplante Änderungen in zukünftigen Versionen von Electron, [lesen Sie unseren geplanten Breaking Changes Doc](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
