---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

Nach mehr als vier Monaten Entwicklung, acht Beta-Releases und Testen von vielen Inszenierten Apps, der Veröffentlichung von Electron 2. .0 ist jetzt verfügbar unter [electronjs.org](https://electronjs.org/).

---

## Release-Prozess

Ab 2.0.0 folgen die Versionen von Electronic [semantische Versionierung](https://electronjs.org/blog/electron-2-semantic-boogaloo). Dies bedeutet, dass die Hauptversion wird öfter bump und wird in der Regel ein großes Update zu Chromium. Patch-Veröffentlichungen sollten stabiler sein, da sie nur Korrekturen mit hoher Priorität enthalten.

Electron 2.0.0 stellt auch eine Verbesserung dar, wie Electron vor einer größeren Veröffentlichung stabilisiert wird. Einige große Electron-Apps haben 2.0.0 Betas in inszenierten Rollouts, die die beste Feedback-Schleife Electron's je für eine Beta-Serie hatte.

## Änderungen / neue Funktionen

 * Wichtige Beulen zu mehreren wichtigen Teilen der elektronischen Toolchain, darunter Chrome 61, Node 8.9.3, V8 6.1.534.41, GTK+ 3 unter Linux, aktualisierte Rechtschreibprüfung und Squirrel.
 * [In-App-Käufe](https://electronjs.org/blog/in-app-purchases) werden jetzt auf MacOS unterstützt. [#11292](https://github.com/electron/electron/pull/11292)
 * Neue API zum Laden von Dateien. [#11565](https://github.com/electron/electron/pull/11565)
 * Neue API, um ein Fenster zu aktivieren/deaktivieren. [#11832](https://github.com/electron/electron/pull/11832)
 * New API app.setLocale(). [#11469](https://github.com/electron/electron/pull/11469)
 * Neue Unterstützung für das Protokollieren von IPC-Nachrichten. [#11880](https://github.com/electron/electron/pull/11880)
 * Neue Menü-Ereignisse. [#11754](https://github.com/electron/electron/pull/11754)
 * Fügen Sie ein `Shutdown` Ereignis zum PowerMonitor hinzu. [#11417](https://github.com/electron/electron/pull/11417)
 * Füge `Affinität` hinzu, um mehrere BrowserWindows in einem einzigen Prozess zu sammeln. [#11501](https://github.com/electron/electron/pull/11501)
 * Füge die Möglichkeit für saveDialog hinzu, um verfügbare Erweiterungen aufzulisten. [#11873](https://github.com/electron/electron/pull/11873)
 * Unterstützung für zusätzliche Benachrichtigungsaktionen [#11647](https://github.com/electron/electron/pull/11647)
 * Die Möglichkeit, macOS-Benachrichtigung zu beenden, um den Titel der Schaltfläche zu schließen. [#11654](https://github.com/electron/electron/pull/11654)
 * Bedingung für menu.popup(Fenster, Callback) hinzufügen
 * Verbesserung des Speichers in Touchbar-Elementen. [#12527](https://github.com/electron/electron/pull/12527)
 * Verbesserte Checkliste für Sicherheitsempfehlungen.
 * Fügen Sie Lesezeichen mit App-Scoped Security scoped hinzu. [#11711](https://github.com/electron/electron/pull/11711)
 * Füge die Möglichkeit hinzu, beliebige Argumente in einem Renderer-Prozess zu setzen. [#11850](https://github.com/electron/electron/pull/11850)
 * Zubehöransicht für Formatauswahl hinzufügen. [#11873](https://github.com/electron/electron/pull/11873)
 * Fixed network delegierte Race-Bedingung. [#12053](https://github.com/electron/electron/pull/12053)
 * Unterstützen Sie `mips64el` unter Linux. Electron requires the C++14 toolchain, which was not available for that arch at the time of the release. Wir hoffen, die Unterstützung in Zukunft wieder hinzuzufügen.

## API-Änderungen brechen

 * [veraltete APIs entfernt](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md), einschließlich:
   * `menu.popup` Signatur geändert. [#11968](https://github.com/electron/electron/pull/11968)
   * Veraltete `crashReporter.setExtraParameter` [#11972](https://github.com/electron/electron/pull/11972) entfernt
   * Veraltete `webContents.setZoomLevelLimits` und `webFrame.setZoomLevelLimits` entfernt. [#11974](https://github.com/electron/electron/pull/11974)
   * Veraltete `Methoden der Zwischenablage` entfernt. [#11973](https://github.com/electron/electron/pull/11973)
   * Unterstützung für boolesche Parameter für `tray.setHighlightMode` entfernt. [#11981](https://github.com/electron/electron/pull/11981)

## Fehlerkorrekturen

 * Geändert um sicherzustellen, dass `webContents.isOffscreen()` immer verfügbar ist. [#12531](https://github.com/electron/electron/pull/12531)
 * `BrowserWindow.getFocusedWindow()` wurde behoben, wenn DevTools abgedockt und fokussiert wurde. [#12554](https://github.com/electron/electron/pull/12554)
 * Behobenes Vorladen beim Rendern in Sandboxen nicht geladen, wenn der Vorladepfad Sonderzeichen enthält. [#12643](https://github.com/electron/electron/pull/12643)
 * Korrigieren Sie die Standardeinstellung von allowRunningUnsecureContent gemäß docs. [#12629](https://github.com/electron/electron/pull/12629)
 * Korrekte Transparenz auf nativeImage. [#12683](https://github.com/electron/electron/pull/12683)
 * Problem mit `Menu.buildFromTemplate` behoben. [#12703](https://github.com/electron/electron/pull/12703)
 * Bestätigte menu.popup Optionen sind Objekte. [#12330](https://github.com/electron/electron/pull/12330)
 * Entfernte eine Race-Bedingung zwischen neuer Prozess-Erstellung und Kontext Release. [#12361](https://github.com/electron/electron/pull/12361)
 * Verschiebbare Regionen beim Ändern der BrowserView aktualisieren. [#12370](https://github.com/electron/electron/pull/12370)
 * Feste Menüleistenerkennung für Alt-Schlüssel im Fokus. [#12235](https://github.com/electron/electron/pull/12235)
 * Fehlerhafte Warnungen in Webviews behoben. [#12236](https://github.com/electron/electron/pull/12236)
 * Feste Vererbung der 'Anzeigen'-Option aus übergeordneten Fenstern. [#122444](https://github.com/electron/electron/pull/122444)
 * Stelle sicher, dass `getLastCrashReport()` der letzte Absturzbericht ist. [#12255](https://github.com/electron/electron/pull/12255)
 * Fehlerbehebung bei Netzwerkfreigabepfad. [#12287](https://github.com/electron/electron/pull/12287)
 * Festes Kontextmenü klicken Sie auf Rückrufen. [#12170](https://github.com/electron/electron/pull/12170)
 * Feste Position des Popupmenüs. [#12181](https://github.com/electron/electron/pull/12181)
 * Verbesserte Bereinigung der Libusschleife. [#11465](https://github.com/electron/electron/pull/11465)
 * `hexColorDWORDToRGBA` für transparente Farben fixiert. [#11557](https://github.com/electron/electron/pull/11557)
 * Fixed null Zeiger dereferenzen mit getWebPreferences api. [#12245](https://github.com/electron/electron/pull/12245)
 * Eine zyklische Referenz im Menü Delegierten wurde behoben. [#11967](https://github.com/electron/electron/pull/11967)
 * Feste Protokollfilterung von net.request. [#11657](https://github.com/electron/electron/pull/11657)
 * WebFrame.setVisualZoomLevelLimits legt nun die Skalenbeschränkungen für Benutzer fest [#12510](https://github.com/electron/electron/pull/12510)
 * Legen Sie die entsprechenden Standardwerte für Webview-Optionen fest. [#12292](https://github.com/electron/electron/pull/12292)
 * Verbesserte Unterstützung bei der Dynamik. [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * Fehler beim Timing in der Singleton-Fixture behoben.
 * Fehlerhafter Produktions-Cache in NotifierSupportsActions()
 * MenuItem Rollen camelCase-kompatibel. [#11532](https://github.com/electron/electron/pull/11532)
 * Verbesserte Touchbar-Updates. [#11812](https://github.com/electron/electron/pull/11812), [#11761](https://github.com/electron/electron/pull/11761).
 * Zusätzliche Menü-Trennzeichen entfernt. [#11827](https://github.com/electron/electron/pull/11827)
 * Fehlerbehebung bei Bluetooth-Auswahl. Schließt [#11399](https://github.com/electron/electron/pull/11399).
 * Befestigte Macos Vollbildmodus Menüeintragsbezeichnung. [#11633](https://github.com/electron/electron/pull/11633)
 * Verbesserte Tooltip verstecken, wenn ein Fenster deaktiviert ist. [#11644](https://github.com/electron/electron/pull/11644)
 * Migrierte veraltete Web-View-Methode. [#11798](https://github.com/electron/electron/pull/11798)
 * Behoben beim Schließen eines Fensters, das von einer Browseransicht geöffnet wurde. [#11799](https://github.com/electron/electron/pull/11799)
 * Fehlerbehebung bei Bluetooth-Auswahl. [#11492](https://github.com/electron/electron/pull/11492)
 * Aktualisiert, um Task-Scheduler für app.getFileIcon API zu verwenden. [#11595](https://github.com/electron/electron/pull/11595)
 * Geändert um `Konsolennachricht` zu starten, auch wenn das Rendern auf dem Bildschirm ist. [#11921](https://github.com/electron/electron/pull/11921)
 * Fehler beim Herunterladen von benutzerdefinierten Protokollen mit `WebContents.downloadURL`. [#11804](https://github.com/electron/electron/pull/11804)
 * Beheben von transparenten Fenstern, die Transparenz verloren haben, wenn devtools sich trennt. [#11956](https://github.com/electron/electron/pull/11956)
 * Beheben von Electron-Apps, die den Neustart oder das Herunterfahren abgebrochen haben. [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * Fehlerbehebung bei Wiederverwendung des Touchbar-Elements. [#12624](https://github.com/electron/electron/pull/12624)
 * Befestigtes Tray-Highlight im Dunkelmodus. [#12398](https://github.com/electron/electron/pull/12398)
 * Das Blockieren des Hauptprozesses im async-Dialog wurde behoben. [#12407](https://github.com/electron/electron/pull/12407)
 * `setTitle` wurde repariert. [#12356](https://github.com/electron/electron/pull/12356)
 * Absturz beim Einstellen des Dock-Menüs behoben. [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * Bessere Linux-Desktop-Benachrichtigungen. [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * Bessere GTK+ Theme-Unterstützung für Menüs. [#12331](https://github.com/electron/electron/pull/12331)
 * Beenden Sie würdevoll auf linux. [#12139](https://github.com/electron/electron/pull/12139)
 * Verwenden Sie den Namen der App als Standard-Tooltip. [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * Visual Studio 2017 Unterstützung hinzugefügt. [#11656](https://github.com/electron/electron/pull/11656)
 * Es wurde das Übergeben der Ausnahme an den Systemabsturzhandler behoben. [#12259](https://github.com/electron/electron/pull/12259)
 * Fehler beim Verstecken des Tooltipps vor minimiertem Fenster. [#11644](https://github.com/electron/electron/pull/11644)
 * `DesktopCapturer` repariert, um den korrekten Bildschirm zu erfassen. [#11664](https://github.com/electron/electron/pull/11664)
 * `Deaktivierte HardwareAcceleration` mit Transparenz behoben. [#11704](https://github.com/electron/electron/pull/11704)

# Was ist als Nächstes

Das Electron-Team arbeitet hart daran, neuere Versionen von Chromium, Knoten und v8 zu unterstützen. Erwarten Sie in Kürze 3.0.0-beta.1!
