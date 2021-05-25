# Offizielle Anleitungen

Bitte nutze die Dokumentation, die mit der Version von Electron übereinstimmt. Die Versionsnummer sollte ein Bestandteil der Seiten-URL sein. Falls nicht, verwenden Sie möglicherweise die Dokumentation einer Development Variante, welche eventuell API Änderungen enthält, die nicht mit Ihrer Electron Version kompatibel sind. Um sich ältere Versionen der Dokumentation anzuschauen, können Sie auf GitHub [nach Tag filtern](https://github.com/electron/electron/tree/v1.4.0) indem Sie das Dropdownmenü "Switch branches/tags" öffnen und den Tag auswählen, der mit Ihrer Version übereinstimmt.

## Häufig gestellte Fragen

Es gibt sehr häufig gestellte Fragen. Prüfe das bitte vor dem Erstellen eines Issue:

* [Electron FAQ](faq.md)

## Leitfäden und Tutorials

### Erste Schritte

* [Einführung](tutorial/introduction.md)
* [Schnellstart](tutorial/quick-start.md)
* [Process Model](tutorial/process-model.md)

### Grundlagen lernen

* Features zu deiner App hinzufügen
  * [Benachrichtigungen](tutorial/notifications.md)
  * [Kürzliche Dokumente](tutorial/recent-documents.md)
  * [Anwendungsprozess](tutorial/progress-bar.md)
  * [Benutzerdefiniertes Dockmenu](tutorial/macos-dock.md)
  * [Benutzerdefinierte Windows Taskleiste](tutorial/windows-taskbar.md)
  * [Benutzerdefinierte Linux Desktop Aktionen](tutorial/linux-desktop-actions.md)
  * [Tastenkürzel](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Erkennung](tutorial/online-offline-events.md)
  * [Repräsentierte Datei für macOS BrowserWindows](tutorial/represented-file.md)
  * [Native Datei Drag & Drop](tutorial/native-file-drag-drop.md)
  * [Offscreen Rendering](tutorial/offscreen-rendering.md)
  * [Dark-Modus](tutorial/dark-mode.md)
  * [Webbetten in Electron](tutorial/web-embeds.md)
* [Boilerplates und CLIs](tutorial/boilerplates-and-clis.md)
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Andere Tools und Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)

### Erweiterte Schritte

* Anwendungsarchitektur
  * [Native Node.js Module benutzen](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
  * [Sicherheitsstrategien](tutorial/security.md)
  * [Process Sandboxing](tutorial/sandbox.md)
* [Barrierefreiheit](tutorial/accessibility.md)
  * [Manuelle Aktivierung der Bedienungshilfen](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Testen und Debuggen](tutorial/application-debugging.md)
  * [Debuggen des Hauptprozesses](tutorial/debugging-main-process.md)
  * [Debuggen mit Visual Studio-Code](tutorial/debugging-vscode.md)
  * [Verwendung von Selenium und WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testen auf Headless CI-Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools Erweiterung](tutorial/devtools-extension.md)
  * [Automatisiertes Testen mit einem benutzerdefinierten Treiber](tutorial/automated-testing-with-a-custom-driver.md)
  * [REPL](tutorial/repl.md)
* [Verteilung](tutorial/application-distribution.md)
  * [Unterstützte Plattformen](tutorial/support.md#supported-platforms)
  * [Code Signierung](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Updates](tutorial/updates.md)
  * [Bereitstellung eines Update-Servers](tutorial/updates.md#deploying-an-update-server)
  * [Implementieren von Updates in deiner App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Updates anwenden](tutorial/updates.md#applying-updates)
* [Support erhalten](tutorial/support.md)

## Detaillierte Tutorials

Diese individuellen Tutorials bauen auf den Themen auf, die in dem Handbuch weiter oben diskutiert wurden.

* [Electron installieren](tutorial/installation.md)
  * [Proxys](tutorial/installation.md#proxies)
  * [Benutzerdefinierte Mirrors und Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Problemlösungen](tutorial/installation.md#troubleshooting)
* Electron Veröffentlichungen & Entwickler Feedback
  * [Versionsrichtlinie](tutorial/electron-versioning.md)
  * [Veröffentlichungszeitleisten](tutorial/electron-timelines.md)
* [Widevine CDM testen](tutorial/testing-widevine-cdm.md)

---

* [Glossar](glossary.md)

## API-Referenz

* [Übersicht](api/synopsis.md)
* [Prozess-Objekt](api/process.md)
* [Supported Command Line Switches](api/command-line-switches.md)
* [Umgebungsvariablen](api/environment-variables.md)
* [Unterstützung für Chrome-Erweiterungen](api/extensions.md)
* [Breaking API Veränderungen](breaking-changes.md)

### Benutzerdefinierte DOM-Elemente:

* [`File` Objekt](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Funktion](api/window-open.md)
* [`BrowserWindowProxy` Objekt](api/browser-window-proxy.md)

### Module für den Hauptprozess:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [MessageChannelMain](api/message-channel-main.md)
* [MessagePortMain](api/message-port-main.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
* [nativeThema](api/native-theme.md)
* [Mitteilung](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [ShareMenu](api/share-menu.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Fach](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### Module für den Renderer-Prozess (Webseite):

* [kontextBridge](api/context-bridge.md)
* [ipcRenderer](api/ipc-renderer.md)
* [webFrame](api/web-frame.md)

### Module für beide Prozesse:

* [Zwischenablage (clipboard)](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [desktopCapturer](api/desktop-capturer.md)
* [nativeImage](api/native-image.md)
* [Shell](api/shell.md)

## Entwicklung

Siehe [development/README.md](development/README.md)
