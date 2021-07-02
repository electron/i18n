# Sicherheit, native Fähigkeiten und Ihre eigene Verantwortung

Als Webentwickler genießen wir normalerweise das starke Sicherheitsnetz des Browsers - Die Risiken, die mit dem von uns geschriebenen Code verbunden sind, sind relativ gering. Unseren Websites werden in einer Sandbox mit begrenzten Befugnissen ausgeführt und wir vertrauen darauf, dass unsere Benutzer einen Browser verwenden, der von einem großen Team von Ingenieuren entwickelt wurde und der in der Lage ist, schnell auf neu entdeckte Sicherheitsbedrohungen zu reagieren.

Bei der Arbeit mit Electron ist es wichtig zu verstehen, dass Electron kein Webbrowser ist. Es erlaubt Ihnen, funktionstüchtige Desktop-Anwendungen mit vertrauten Web-Technologien zu erstellen, aber Ihr Code hat viel mehr Kraft. JavaScript kann auf das Dateisystem, die Benutzer-Shell und einiges mehr zugreifen. Dies erlaubt Ihnen, hochqualitative native Anwendungen zu erstellen, aber die inhärenten Sicherheitsrisiken skalieren mit den zusätzlichen Befugnissen, die Ihrem Code gewährt werden.

Vor diesem Hintergrund sollten Sie sich bewusst sein, dass die Anzeige willkürlicher Inhalte aus nicht vertrauenswürdigen Quellen ein ernstes Sicherheitsrisiko darstellt, dass Electron nicht vollständig verhindern kann. Tatsächlich werden die beliebtesten Electron-Apps (Atom, Slack, Visual Studio Code, etc) in erster Linie lokale Inhalte anzeigen (oder vertrauenswürdige und sichere Remote-Inhalte ohne Node-Integration) – wenn Ihre Anwendung jedoch Code aus einer Online-Quelle ausführt, liegt es in Ihrer Verantwortung sicherzustellen, dass der Code nicht bösartig ist.

## Melden von Sicherheitsproblemen

Informationen dazu, wie sie eine Electron-Sicherheitslücke richtig melden können, finden Sie unter [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromium Sicherheitsprobleme und Updates

Electron hält auf dem Laufenden mit wechselnden Chrom-Releases. For more information, see the [Electron Release Cadence blog post](https://electronjs.org/blog/12-week-cadence).

## Sicherheit ist für jeden verantwortlich

Es ist wichtig daran zu erinnern, dass die Sicherheit Ihrer Electron-Anwendung das Ergebnis der allgemeinen Sicherheit der Rahmen-Stiftung (*Chromium*, *Knoten. s*), Electron selbst, alle NPM-Abhängigkeiten und Ihren Code. Daher liegt es in Ihrer Verantwortung, ein paar wichtige Best Methoden zu verfolgen:

* **Halten Sie Ihre Anwendung auf dem Laufenden mit der neuesten Version von Electron Framework.** Wenn Sie Ihr Produkt freigeben, versenden Sie auch ein Paket aus Electron, Chromium shared library und Node.js. Verwundbarkeiten, die diese Komponenten betreffen, können die Sicherheit Ihrer Anwendung beeinflussen. Durch Aktualisieren von Electron auf die neueste Version stellen Sie sicher, dass kritische Verwundbarkeiten (wie *nodeIntegration umgangen*) bereits gepatcht sind und nicht in Ihrer Anwendung ausgenutzt werden können. For more information, see "[Use a current version of Electron](#15-use-a-current-version-of-electron)".

* **Evaluate your dependencies.** While NPM provides half a million reusable packages, it is your responsibility to choose trusted 3rd-party libraries. If you use outdated libraries affected by known vulnerabilities or rely on poorly maintained code, your application security could be in jeopardy.

* **Sichere Codierungspraktiken.** Die erste Verteidigungslinie für Ihre Anwendung ist Ihr eigener Code. Übliche Web-Verwundbarkeiten, wie Cross-Site Scripting (XSS), G heeft heeft heeft heeft heeft heeft heeft het gebruik van Electron-Applikationen opgehaald. De gebruikte van de sicherheitskomplexen van bestelen van de softwareentwickling en te te betaalen.

## Isolation für nicht vertrauenswürdige Inhalte

Ein Sicherheitsproblem besteht immer, wenn Sie Code von einer nicht vertrauenswürdigen Quelle erhalten (z.B. ein entfernter Server) und ihn lokal ausführen. As an example, consider a remote website being displayed inside a default [`BrowserWindow`][browser-window]. Wenn ein Angreifer es irgendwie schafft, den besagten Inhalt zu ändern (entweder indem er die Quelle direkt angreift, oder durch Sitzen zwischen Ihrer App und dem eigentlichen Ziel), können diese nativen Code auf dem Rechner des Benutzers ausführen.

> :warning: unter keinen Umständen sollten Sie Remote-Code laden und ausführen, wobei die Node.js Integration aktiviert ist. Verwenden Sie stattdessen nur lokale Dateien (zusammen mit Ihrer Anwendung gepackt), um den Node.js-Code auszuführen. To display remote content, use the [`<webview>`][webview-tag] tag or [`BrowserView`][browser-view], make sure to disable the `nodeIntegration` and enable `contextIsolation`.

## Electron Sicherheitswarnungen

Ab Electron 2.0 werden Entwickler Warnungen und Empfehlungen an die Entwicklerkonsole ausdrucken. Sie werden nur angezeigt, wenn der Binärname Electron ist, , was darauf hinweist, dass ein Entwickler gerade die Konsole ansieht.

Sie können diese Warnungen erzwingen oder erzwingen, indem Sie `ELECTRON_ENABLE_SECURITY_WARNINGS` oder `ELECTRON_DISABLE_SECURITY_WARNINGS` auf entweder `setzen. nv` oder das `Fenster` Objekt.

## Checkliste: Sicherheitsempfehlungen

Sie sollten zumindest diesen Schritten folgen, um die Sicherheit Ihrer Anwendung zu verbessern:

1. [Nur sichere Inhalte laden](#1-only-load-secure-content)
2. [Deaktivieren Sie die Node.js-Integration in allen Renderern, die Remote-Inhalte anzeigen](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [Aktiviere Kontext-Isolation in allen Renderern, die Remote-Inhalte anzeigen](#3-enable-context-isolation-for-remote-content)
4. [`ses.setPermissionRequestHandler()` in allen Sitzungen verwenden, die Remote-Inhalte laden](#4-handle-session-permission-requests-from-remote-content)
5. [`WebSecurity nicht deaktivieren`](#5-do-not-disable-websecurity)
6. [Definiere eine `Content-Security-Policy`](#6-define-a-content-security-policy) und verwende restriktive Regeln (z.B. `script-src 'self'`)
7. [`allowRunningUnsecureContent` nicht auf `true setzen`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [Experimentelle Funktionen nicht aktivieren](#8-do-not-enable-experimental-features)
9. [`aktivierte Blinkfeatures nicht verwenden`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: Nicht verwenden `allowpopups`](#10-do-not-use-allowpopups)
11. [`<webview>`: Optionen und Parameter überprüfen](#11-verify-webview-options-before-creation)
12. [Navigation deaktivieren oder beschränken](#12-disable-or-limit-navigation)
13. [Deaktivieren oder beschränken Sie die Erstellung neuer Fenster](#13-disable-or-limit-creation-of-new-windows)
14. [`openExtern` nicht mit nicht vertrauenswürdigen Inhalten verwenden](#14-do-not-use-openexternal-with-untrusted-content)
15. [Aktuelle Version von Electron verwenden](#15-use-a-current-version-of-electron)

Um Fehlkonfigurationen und unsichere Muster zu automatisieren, ist es möglich, [Elektronik](https://github.com/doyensec/electronegativity) zu verwenden. Für zusätzliche Details zu potenziellen Schwächen und Implementierungsfehlern bei der Entwicklung von Anwendungen mit Electron bitte lesen Sie diese [Anleitung für Entwickler und Auditoren](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Nur sichere Inhalte laden

Alle Ressourcen, die nicht in Ihrer Anwendung enthalten sind, sollten mit einem sicheren Protokoll wie `HTTPS` geladen werden. Mit anderen Worten, verwenden Sie keine unsicheren Protokolle wie `HTTP`. Ebenso empfehlen wir die Verwendung von `WSS` über `WS`, `FTPS` über `FTP`, und so weiter.

### Warum?

`HTTPS` hat drei Hauptvorteile:

1) Es authentifiziert den Remote-Server, und stellt sicher, dass sich Ihre App mit dem korrekten Host anstatt mit einem Imitator verbindet. 2) Es stellt die Integrität der Daten sicher, wobei behauptet wird, dass die Daten während des Transits zwischen Ihrer Anwendung und dem Host nicht verändert wurden. 3) It encrypts the traffic between your user and the destination host, making it more difficult to eavesdrop on the information sent between your app and the host.

### Wie?

```js
// Schlecht
browserWindow.loadURL('http://example.com')

// Gut
browserWindow.loadURL('https://example.com')
```

```html
<!-- Schlecht -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- Gut -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2) Node.js Integration für Remote-Inhalte nicht aktivieren

_Diese Empfehlung ist das Standardverhalten in Electron seit 5.0.0._

It is paramount that you do not enable Node.js integration in any renderer ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], or [`<webview>`][webview-tag]) that loads remote content. Das Ziel ist es, die Befugnisse zu beschränken, die Sie entfernten Inhalten gewähren auf diese Weise wird es für einen Angreifer erheblich schwieriger Ihre Benutzer zu schädigen, wenn sie die Möglichkeit erhalten, JavaScript auf Ihrer Website auszuführen.

Danach können Sie zusätzliche Berechtigungen für bestimmte Hosts erteilen. Zum Beispiel wenn Sie ein BrowserWindow öffnen, verwies auf `https://example. om/`, können Sie der Website genau die Fähigkeiten geben, die sie braucht, aber nicht mehr.

### Warum?

Eine Site-übergreifende Skripting-Attacke (XSS) ist gefährlicher, wenn ein Angreifer aus dem Renderer-Prozess herausspringen und Code auf dem Computer des Benutzers ausführen kann. Site-übergreifende Skriptangriffe sind ziemlich häufig - und während eines Problems ihre Leistung ist normalerweise darauf beschränkt, mit der Website zu messen, auf der sie ausgeführt werden. Die Deaktivierung der Node.js Integration verhindert eine Eskalation eines XSS zu einem sogenannten "Remote Code Execution" (RCE) Angriff.

### Wie?

```js
// Schlecht
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Gute
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html
<!-- Schlecht -->
<webview nodeIntegration src="page.html"></webview>

<!-- Gut -->
<webview src="page.html"></webview>
```

Wenn Sie die Node.js-Integration deaktivieren, können Sie trotzdem APIs Ihrer Website aussetzen, die Node.js Module oder Funktionen verbrauchen. Skripte vor dem Laden haben weiterhin Zugriff auf auf `erfordern` und andere Knoten. s Features, die es Entwicklern erlauben, eine benutzerdefinierte API für aus der Ferne geladene Inhalte freizugeben.

Im folgenden Beispiel wird die später geladene Webseite Zugriff auf eine `window.readConfig()` Methode haben, aber keine Node.js Funktionen.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## 3) Aktiviere Kontext-Isolation für Remote-Inhalte

Kontext-Isolierung ist eine Electron-Funktion, die es Entwicklern erlaubt, Code in Vorlade-Skripten und in Electron-APIs in einem eigenen JavaScript-Kontext auszuführen. In der Praxis bedeutet das globale Objekte wie `Array.prototyp. ush` oder `JSON.parse` kann nicht von Skripten geändert werden, die im Renderer-Prozess ausgeführt werden.

Electron verwendet die gleiche Technologie wie Chromiums [Inhaltsskripte](https://developer.chrome.com/extensions/content_scripts#execution-environment) um dieses Verhalten zu aktivieren.

Even when `nodeIntegration: false` is used, to truly enforce strong isolation and prevent the use of Node primitives `contextIsolation` **must** also be used.

### Warum & Wie?

For more information on what `contextIsolation` is and how to enable it please see our dedicated [Context Isolation](context-isolation.md) document.

## 4) Anfragen zur Bearbeitung von Sitzungsgenehmigungen von Remote-Inhalten

Möglicherweise haben Sie Berechtigungsanfragen bei der Verwendung von Chrome gesehen: Sie erscheinen immer, wenn die Website versucht, eine Funktion zu verwenden, die der Benutzer manuell genehmigen muss ( wie Benachrichtigungen).

Die API basiert auf der [Chromium-Berechtigungs-API](https://developer.chrome.com/extensions/permissions) und implementiert die gleichen Berechtigungstypen.

### Warum?

Standardmäßig wird Electron alle Berechtigungsanfragen automatisch genehmigen, es sei denn, der Entwickler hat einen benutzerdefinierten Handler manuell konfiguriert. Während ein solider Standard ist, könnten sicherheitsbewusste Entwickler genau das Gegenteil davon annehmen.

### Wie?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // Approves the permissions request
      callback(true)
    }

    // Verify URL
    if (!url.startsWith('https://example.com/')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## 5) WebSecurity nicht deaktivieren

_Empfehlung ist Electronic Standard_

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], or [`<webview>`][webview-tag]) disables crucial security features.

`WebSecurity` in Produktionsanwendungen nicht deaktivieren.

### Warum?

Deaktivieren von `webSecurity` deaktiviert die Ursprungsrichtlinie und setzt `allowRunningUnsecureContent` Eigenschaft auf `true`. Mit anderen Worten, es erlaubt die Ausführung von unsicherem Code aus verschiedenen Domänen.

### Wie?

```js
// Schlecht
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Gut
const mainWindow = new BrowserWindow()
```

```html
<!-- Schlecht -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Gut -->
<webview src="page.html"></webview>
```

## 6) Definieren Sie eine Inhaltssicherheitsrichtlinie

Eine Content Security Policy (CSP) ist eine zusätzliche Schutzschicht gegen Site-übergreifende Skripting-Angriffe und Daten-Injektions-Attacken. Wir empfehlen, dass sie von jeder Website, die Sie in Electron laden, aktiviert werden.

### Warum?

CSP erlaubt es dem Server, Inhalte zu verteilen und zu kontrollieren, welche Ressourcen Electron für die angegebene Webseite laden kann. `https://example.com` sollte erlaubt sein, Skripte aus den von dir definierten Ursprüngen zu laden, während Skripte von `https://evil geladen werden. ttacker.com` darf nicht ausgeführt werden. Die Definition eines CSP ist eine einfache Möglichkeit, die Sicherheit Ihrer Anwendung zu verbessern.

Das folgende CSP erlaubt Electron Skripte von der aktuellen Webseite und von `apis.example.com` auszuführen.

```plaintext
// Schlecht
Content-Security-Policy: '*'

// Gut
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### CSP HTTP-Header

Electron respektiert die [`Content-Security-Policy` HTTP-Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) welche mittels Electron's [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:

```javascript
const { session } = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\'']
    }
  })
})
```

### CSP Meta Tag

CSP's bevorzugter Auslieferungsmechanismus ist ein HTTP-Header, es ist jedoch nicht möglich, diese Methode beim Laden einer Ressource mit dem Protokoll `file://` zu verwenden. Es kann in einigen Fällen nützlich sein, z. B. unter Verwendung des `file://` Protokolls, um eine Richtlinie auf einer Seite direkt im Markup mit einem `<meta>` Tag zu setzen:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

## 7) Setze `allowRunningInsecureContent` nicht auf `true`

_Empfehlung ist Electronic Standard_

In der Standardeinstellung erlaubt Electron keine über `HTTPS` geladenen Webseiten zu laden und Skripte auszuführen, CSS, oder Plugins aus unsicheren Quellen (`HTTP`). Setzen der Eigenschaft `allowRunningUnsecureContent` auf `true` deaktiviert diesen Schutz.

Das Laden des ursprünglichen HTML einer Webseite über `HTTPS` und der Versuch, nachfolgende Ressourcen über `HTTP` zu laden, wird auch als "gemischter Inhalt" bezeichnet.

### Warum?

Das Laden von Inhalten über `HTTPS` sichert die Authentizität und Integrität der geladenen Ressourcen während der Verschlüsselung des Datenverkehrs selbst. Lesen Sie den Abschnitt auf [, der nur sichere Inhalte](#1-only-load-secure-content) anzeigt für weitere Details.

### Wie?

```js
// Schlecht
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Gut
const mainWindow = new BrowserWindow({})
```

## 8) Experimentelle Funktionen nicht aktivieren

_Empfehlung ist Electronic Standard_

Erweiterte Benutzer von Electron können experimentelle Chromi-Funktionen mithilfe der Eigenschaft `experimentalFeatures` aktivieren.

### Warum?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Außerdem wurde ihr Einfluss auf Electron insgesamt wahrscheinlich nicht getestet.

Rechtmäßige Verwendungsfälle existieren bereits, aber wenn Sie nicht wissen, was Sie tun, sollten Sie diese Eigenschaft nicht aktivieren.

### Wie?

```js
// Schlecht
const mainWindow = new BrowserWindow({
  webEinstellungen: {
    experimentalFeatures: true
  }
})
```

```js
// Gut
const mainWindow = new BrowserWindow({})
```

## 9) Nicht `enableBlinkfeatures verwenden`

_Empfehlung ist Electronic Standard_

Blink ist der Name der Rendering-Engine hinter Chromium. Wie bei `experimentalFeatures`erlaubt die Eigenschaft `aktivierte BlinkFeatures` Entwicklern Funktionen zu aktivieren, die standardmäßig deaktiviert wurden.

### Warum?

Generell gibt es gute Gründe, wenn eine Funktion standardmäßig nicht aktiviert wurde. Legitime Anwendungsfälle zur Aktivierung bestimmter Funktionen existieren bereits. Als Entwickler von solltest du genau wissen, warum du eine Funktion aktivieren musst, was die Folgen sind und wie sie die Sicherheit Ihrer Anwendung beeinflussen. Unter solltest du keine Funktionen spekulativ aktivieren.

### Wie?

```js
// Schlecht
const mainWindow = new BrowserWindow({
  webEinstellungen: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
// Gut
const mainWindow = new BrowserWindow()
```

## 10) Nicht `erlaubte Popups verwenden`

_Empfehlung ist Electronic Standard_

If you are using [`<webview>`][webview-tag], you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`][browser-window] using the `window.open()` method. `<webview>` Tags dürfen sonst keine neuen Fenster erstellen.

### Warum?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`][browser-window] by default. Dies folgt dem Prinzip des minimal benötigten Zugriffs: Eine Webseite darf keine neuen Popups erstellen, es sei denn, Sie wissen, dass sie diese Funktion benötigt.

### Wie?

```html
<!-- Schlecht -->
<webview allowpopups src="page.html"></webview>

<!-- Gut -->
<webview src="page.html"></webview>
```

## 11) WebView-Optionen vor der Erstellung überprüfen

Ein in einem Renderer-Prozess erstellter WebView mit aktivierter Node.js-Integration kann die Integration selbst nicht aktivieren. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`<webview>`][webview-tag] tags from the main process and to verify that their webPreferences do not disable security features.

### Warum?

Seit `<webview>` im DOM, sie können durch ein Skript erstellt werden, das auf Ihrer Webseite ausgeführt wird, auch wenn Knoten. s Integration ist ansonsten deaktiviert.

Mit Electron können Entwickler verschiedene Sicherheitsfunktionen deaktivieren, die einen Renderer-Prozess steuern. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`][webview-tag] tags.

### Wie?

Before a [`<webview>`][webview-tag] tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of `webViews` with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

Wieder einmal minimiert diese Liste lediglich das Risiko, sie beseitigt es nicht. Wenn Ihr Ziel darin besteht, eine Website anzuzeigen, wird ein Browser eine sicherere Option sein.

## 12) Navigation deaktivieren oder beschränken

Wenn Ihre App nicht navigieren muss oder nur zu bekannten Seiten navigieren muss, Es ist eine gute Idee, die Navigation direkt auf den bekannten Umfang zu beschränken, wodurch keine andere Navigation möglich ist.

### Warum?

Navigation ist ein gängiger Angriffsvektor. Wenn ein Angreifer Ihre App davon überzeugen kann, von ihrer aktuellen Seite wegzunavigieren möglicherweise können sie Ihre App dazu zwingen, Websites im Internet zu öffnen. Selbst wenn Ihre `WebContents` so konfiguriert sind, dass sie sicher sind (wie `nodeIntegration` deaktiviert oder `kontextIsolation` aktiviert), Ihre App zum Öffnen einer zufälligen Website zu bewegen, wird die Ausnutzung Ihrer App erheblich erleichtern.

Ein häufiges Angriffsmuster ist, dass der Angreifer die Benutzer Ihrer App davon überzeugt, so zu interagieren, dass er zu einer der Seiten des Angreifers navigiert. Dies geschieht in der Regel über Links, Plugins oder andere von Nutzern generierte Inhalte.

### Wie?

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`][will-navigate] handler. If you know which pages your app might navigate to, check the URL in the event handler and only let navigation occur if it matches the URLs you're expecting.

Wir empfehlen Ihnen, den Parser von Node für URLs zu verwenden. Einfache Vergleiche an Zeichenketten können manchmal getäuscht werden - ein `startsWith('https://example.com')` Test würde `https://example.com.attacker.com` durchlaufen lassen.

```js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 13) Deaktivieren oder beschränken Sie die Erstellung neuer Fenster

Wenn Sie ein bekanntes Fensterset haben, ist es eine gute Idee, die Erstellung von zusätzlichen Fenstern in Ihrer App zu beschränken.

### Warum?

Ähnlich wie bei der Navigation, ist das Erstellen von neuen `WebInhalten` ein häufiger Angriff Vektor. Angreifer versuchen Ihre App davon zu überzeugen, neue Fenster, Frames, oder andere Renderer Prozesse mit mehr Rechten als zuvor zu erstellen; oder mit geöffneten Seiten, die sie vorher nicht öffnen konnten.

Wenn Sie nicht zusätzlich zu den Fenstern erstellen müssen, müssen Sie erstellen Das Deaktivieren der Kreation kauft Ihnen ein bisschen zusätzliche Sicherheit ohne Kosten. Dies ist normalerweise der Fall für Apps, die ein `BrowserWindow` öffnen und nicht eine beliebige Anzahl zusätzlicher Fenster zur Laufzeit öffnen müssen.

### Wie?

[`webContents`][web-contents] will delegate to its [window open handler][window-open-handler] before creating new windows. The handler will receive, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you register a handler to monitor the creation of windows, and deny any unexpected window creation.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    //
    // See the following item for considerations regarding what
    // URLs should be allowed through to shell.openExternal.
    if (isSafeForExternalOpen(url)) {
      setImmediate(() => {
        shell.openExternal(url)
      })
    }

    return { action: 'deny' }
  })
})
```

## 14) Verwenden Sie `openExterne` nicht mit nicht vertrauenswürdigen Inhalten

Shell's [`openExternal`][open-external] allows opening a given protocol URI with the desktop's native utilities. Zum Beispiel auf macOS, diese Funktion ist ähnlich wie das `geöffnete` Terminal Command Utilities und öffnet die spezifische Anwendung basierend auf der URI und der Dateityp-Zuordnung.

### Warum?

Improper use of [`openExternal`][open-external] can be leveraged to compromise the user's host. Wenn openExterne mit nicht vertrauenswürdigen Inhalten verwendet wird, kann es genutzt werden, um beliebige Befehle auszuführen.

### Wie?

```js
// Falsche
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```

```js
// Gute
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) Use a current version of Electron

Sie sollten bestrebt sein, immer die aktuellste Version von Electron zu verwenden. Wann immer eine neue Hauptversion veröffentlicht wird, solltest du versuchen, deine -App so schnell wie möglich zu aktualisieren.

### Warum?

Eine Anwendung, die mit einer älteren Version von Electron, Chromium, und Knoten erstellt wurde. s ist ein einfacheres Ziel als eine Anwendung, die neuere Versionen von dieser Komponenten verwendet. Generell sind Sicherheitsprobleme und Exploits für ältere Versionen von Chromium und Node.js häufiger verfügbar.

Sowohl Chromium als auch Node.js sind beeindruckende Leistungen im Engineering von tausenden talentierten Entwicklern. Aufgrund ihrer Beliebtheit wird ihre Sicherheit von sorgfältig getestet und von gleichermaßen qualifizierten Sicherheitsforschern analysiert. Many of those researchers [disclose vulnerabilities responsibly][responsible-disclosure], which generally means that researchers will give Chromium and Node.js some time to fix issues before publishing them. Ihre Anwendung wird sicherer sein, wenn eine aktuelle Version von Electron (und damit Chromium und Knoten) verwendet. s) für die potenzielle Sicherheitsprobleme nicht so bekannt sind.

[browser-window]: ../api/browser-window.md

[browser-window]: ../api/browser-window.md
[browser-view]: ../api/browser-view.md
[webview-tag]: ../api/webview-tag.md
[web-contents]: ../api/web-contents.md
[window-open-handler]: ../api/web-contents.md#contentssetwindowopenhandlerhandler
[will-navigate]: ../api/web-contents.md#event-will-navigate
[open-external]: ../api/shell.md#shellopenexternalurl-options
[responsible-disclosure]: https://en.wikipedia.org/wiki/Responsible_disclosure
