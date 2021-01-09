---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

Das Electron Team freut sich, bekannt zu geben, dass die stabile Version von Electron 4 jetzt verfügbar ist! Sie können es von [electronjs.org](https://electronjs.org/) oder von npm über `npm installieren electron@latest`. Das Release ist voll mit Upgrades, Korrekturen und neuen Features, und wir können nicht warten, bis wir sehen, was Sie mit ihnen bauen. Lesen Sie mehr für Details zu dieser Version, und teilen Sie bitte alle Rückmeldungen, die Sie während Ihrer Entdeckungsreise haben!

---

## Was ist Neu?

Ein großer Teil der elektronischen Funktionalität wird von Chromium, Node.js und V8, den Kernkomponenten, aus denen Electron besteht, bereitgestellt. Ein zentrales Ziel für das Electron-Team ist es, mit den Änderungen an diesen Projekten soweit wie möglich Schritt zu halten Bereitstellung von Entwicklern, die Electron-Apps erstellen, Zugriff auf neue Web- und JavaScript-Funktionen. Zu diesem Zweck verfügt Electron 4 über große Versionsbeulen für jede dieser Komponenten; Electron v4.0.0 enthält Chromium `69. .3497.106`, Knoten `10.11.0`und V8 `6.9.427.24`.

Zusätzlich enthält Electron 4 Änderungen an Electron-spezifischen APIs. Nachfolgend finden Sie eine Zusammenfassung der wichtigsten Änderungen in Electron 4; für die vollständige Liste der Änderungen, schaue dir das [Electron v4 an. .0 Release Notes](https://github.com/electron/electron/releases/tag/v4.0.0).

### Deaktiviere `Remote-` Modul

Sie haben nun die Möglichkeit, das `Remote-` Modul aus Sicherheitsgründen zu deaktivieren. Das Modul kann für `BrowserWindow`s und für `Webview` Tags deaktiviert werden:

```javascript
// BrowserWindow
new BrowserWindow({
  webEinstellungen: {
    enableRemoteModule: false
  }
})

// webview tag
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

See the [BrowserWindow](https://electronjs.org/docs/api/browser-window) and [`<webview>` Tag](https://electronjs.org/docs/api/webview-tag) documentation for more information.

### Filtern von `remote.require()` / `remote.getGlobal()` Anfragen

Diese Funktion ist nützlich, wenn Sie das `Remote-` Modul in Ihrem Renderer-Prozess oder `Webview` nicht komplett deaktivieren möchten, sondern zusätzliche Kontrolle darüber haben möchten, welche Module über `Fernbedienung benötigt werden können. rede`.

Wenn ein Modul via `benötigt wird. rede` in einem Renderer-Prozess ein `entfernter Bedarf` Ereignis wird im [`App` Modul](https://electronjs.org/docs/api/app) aufgerufen. Sie können `event.preventDefault()` auf dem Ereignis (das erste Argument) aufrufen, um zu verhindern, dass das Modul geladen wird. Die [`WebContents` Instanz](https://electronjs.org/docs/api/web-contents) , in der der Bedarf aufgetreten ist, wird als zweites Argument übergeben und der Name des Moduls wird als drittes Argument übergeben. Das gleiche Ereignis wird auch in der `WebContents` Instanz emittiert aber in diesem Fall sind die einzigen Argumente das Ereignis und der Modulname. In beiden Fällen können Sie einen benutzerdefinierten Wert zurückgeben, indem Sie den Wert von `event.returnValue` setzen.

```javascript
// Kontrolle von `remote.require` von allen WebContents:
app.on('remote-require', function (event, webContents, requestedModuleName) {
  // ...
})

// Kontrolle von `remote.require` von einer bestimmten WebContent-Instanz:
browserWin.webContents.on('remote-require', function (event, requestedModuleName) {
  // ...
})
```

In ähnlicher Weise, wenn `remote.getGlobal(name)` aufgerufen wird, wird ein `remote-get-global` Ereignis erhöht. Dies funktioniert auf die gleiche Weise wie das `Remote-Requirements` Ereignis: aufrufen `preventDefault()` , um zu verhindern, dass das global zurückgegeben wird, und setzen Sie `Ereignis. eturnValue` , um einen benutzerdefinierten Wert zurückzugeben.

```javascript
// Steuerung `remote.getGlobal` von allen WebContents:
app.on('remote-get-global', function (event, webContents, requrestedGlobalName) {
  // ...
})

// Control `remote.getGlobal` von einer bestimmten WebContent-Instanz:
browserWin.webContents.on('remote-get-global', function (event, requestedGlobalName) {
  // ...
})
```

Weitere Informationen finden Sie in der folgenden Dokumentation:

* [`remote.require`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`remote.getGlobal`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`app`](https://electronjs.org/docs/api/app)
* [`Webinhalte`](https://electronjs.org/docs/api/web-contents)

### JavaScript-Zugriff auf das Info-Panel

Bei macOS können Sie jetzt `App anrufen. howAboutPanel()` um das "Über Panel" zu programmieren, so wie Sie auf den Menüeintrag klicken, der über `{role: 'about'}` erstellt wurde. Siehe die [`showAboutPanel` Dokumentation](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos) für weitere Informationen

### Steuerung von `WebContents` Hintergrundablauf

`WebContents` Instanzen haben jetzt eine Methode `setBackgroundThrottling(erlaubt)` , um das Drosseln von Timern und Animationen zu aktivieren oder zu deaktivieren, wenn die Seite zurückgegroundet ist.

```javascript
lassen Sie gewinnen = new BrowserWindow(...)
win.webContents.setBackgroundThrottling(enableBackgroundThrottling)
```

Siehe [die `setBackgroundThrottling` Dokumentation](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed) für weitere Informationen.

## Breaking Changes

### Keine macOS 10.9 Unterstützung mehr

Chromium unterstützt nicht mehr macOS 10.9 (OS X Mavericks) und unterstützt daher [Electron 4.0 und höher auch nicht](https://github.com/electron/electron/pull/15357).

### Einzelinstanz-Sperren

Früher, um Ihre App zu einer Einzelinstanz-Anwendung zu machen (stellen Sie sicher, dass nur eine Instanz Ihrer App zu jedem Zeitpunkt ausgeführt wird), du kannst die `-App verwenden. akeSingleInstance()` Methode. Ab Electron 4.0 müssen Sie `app.requestSingleInstanceLock()` verwenden. Der Rückgabewert dieser Methode gibt an, ob diese Instanz Ihrer Anwendung erfolgreich die Sperre erhalten hat. Wenn es nicht gelungen ist, die Sperre zu erhalten, können Sie davon ausgehen, dass eine andere Instanz Ihrer Anwendung bereits mit der Sperre läuft und sofort beendet wird.

Zum Beispiel `requestSingleInstanceLock()` und Informationen über nuanciertes Verhalten auf verschiedenen Plattformen [lesen Sie die Dokumentation für `App. equestSingleInstanceLock()` und zugehörige Methoden](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) und [das `zweite Instanz` Event](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

Beim Erstellen von nativen Modulen für Windows muss die `win_delay_load_hook` Variable in der `binding.gyp` des Moduls true sein (was die Standardeinstellung ist). Wenn dieser Hook nicht vorhanden ist, wird das native Modul unter Windows nicht geladen, mit einer Fehlermeldung wie `Modul` nicht gefunden. [Sehen Sie sich die native Modulanleitung](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook) für weitere Informationen an.

## Deprecations

Die folgenden Änderungen sind für Electron 5.0 geplant und werden daher in Electron 4.0 veraltet.

### Node.js Integration deaktiviert für `nativeWindowOpen`-ed Windows

Ab Electron 5.0 werden untergeordnete Fenster, die mit der Option `nativeWindowOpen` geöffnet wurden, immer die Node.js Integration deaktiviert.

### `WebPreferences` Standardwerte

Beim Erstellen eines neuen `BrowserWindow` mit der `webPreferences` Option gesetzt die folgenden `WebPreferences` Optionseinstellungen werden zugunsten neuer unten aufgeführter Standardwerte veraltet:

<div class="table table-ruled table-full-width">

| Eigenschaft | Veralteter Standard | Neuer Standard |
|----------|--------------------|-------------|
| `contextIsolation` | `false` | `true` |
| `nodeIntegration` | `true` | `false` |
| `webviewTag` | Wert von `nodeIntegration` wenn gesetzt, sonst `true` | `false` |

</div>

Bitte beachten Sie: Es gibt derzeit [einen bekannten Fehler (#9736)](https://github.com/electron/electron/issues/9736) der verhindert, dass das `Webview` Tag funktioniert, wenn `Kontext-Isolation` aktiviert ist. Halten Sie die GitHub Ausgabe für aktuelle Informationen im Auge!

Erfahren Sie mehr über Kontextisolierung, Knotenintegration und das `Webview` Tag in [dem Electron Sicherheitsdokument](https://electronjs.org/docs/tutorial/security).

Electron 4.0 verwendet weiterhin die aktuellen Standardwerte, aber wenn Sie keinen expliziten Wert für diese übergeben, sehen Sie eine Deprecation-Warnung. Um Ihre App für Electron 5.0 vorzubereiten, verwenden Sie explizite Werte für diese Optionen. [Lesen Sie die `BrowserFenster` Dokumentation](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) für Details zu jeder dieser Optionen.

### `webContents.findInPage(text[, Optionen])`

Die `medialCapitalAsWordStart` und `wordStart` Optionen wurden veraltet, da sie vom Quelltext entfernt wurden.

## App Feedback Programm

Das [App Feedback Programm](https://electronjs.org/blog/app-feedback-program) das wir während der Entwicklung von Electron 3 eingerichtet haben. war erfolgreich, deshalb haben wir es auch während der Entwicklung von 4.0 fortgesetzt. Wir möchten uns herzlich bei Atlassian, Discord, MS Teams, OpenFin, Slack, bedanken Symphonie, WhatsApp und die anderen Programm-Mitglieder für ihre Beteiligung während der 4. beta Zyklus. To learn more about the App Feedback Program and to participate in future betas, [check out our blog post about the program](https://electronjs.org/blog/app-feedback-program).

## Was ist als Nächstes

Kurzfristig Sie können erwarten, dass sich das Team weiterhin auf die Entwicklung der wichtigsten Komponenten konzentriert, aus denen Electron besteht, einschließlich Chromium, Knoten und V8. Obwohl wir darauf achten, keine Versprechungen über Veröffentlichungstermine zu machen, unser Plan ist die Veröffentlichung neuer Hauptversionen von Electron mit neuen Versionen dieser Komponenten etwa vierteljährlich. [Siehe unser Versionierungsdokument](https://electronjs.org/docs/tutorial/electron-versioning) für genauere Informationen zur Versionierung in Electron.

Für Informationen über geplante Änderungen in zukünftigen Versionen von Electron, [lesen Sie unseren geplanten Breaking Changes Doc](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
