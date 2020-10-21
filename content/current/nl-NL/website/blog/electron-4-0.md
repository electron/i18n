---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

Het Electron team is enthousiast om aan te kondigen dat de stabiele versie van Electron 4 nu beschikbaar is! Je kunt het installeren vanaf [electronjs.org](https://electronjs.org/) of vanaf npm via `npm install electron@latest`. De release zit vol met upgrades, reparaties en nieuwe functies, en we kunnen niet wachten om te zien wat u met hen bouwt. Lees meer voor details over deze release, en deel alle feedback die je hebt tijdens het verkennen!

---

## Wat is nieuw?

Een groot deel van de functionaliteit van Electrons wordt geleverd door Chromium, Node.js en V8, de kern componenten die Electron vormen. Als zodanig is het belangrijkste doel van het Electron team om zo veel mogelijk veranderingen in deze projecten bij te houden. biedt ontwikkelaars die Electron apps toegang geven tot nieuwe web- en JavaScript-functies. Om dit te bereiken heeft Electron 4 belangrijke versie bumps voor elk van deze componenten; Electron v4.0.0 bevat Chromium `69. .3497.106`, knoop `10.11.0`en V8 `6.9.427.24`.

Daarnaast bevat Electron 4 wijzigingen aan de Electron-specifieke API's. Je vindt een samenvatting van de grote veranderingen in Electron 4 hieronder; voor de volledige lijst met wijzigingen, bekijk de [Electron v4. .0 release notes](https://github.com/electron/electron/releases/tag/v4.0.0).

### Uitschakelen van de `afstandsbediening` Module

Om veiligheidsredenen heb je nu de mogelijkheid om de `externe` module uit te schakelen. De module kan worden uitgeschakeld voor `BrowserWindow`s en voor `webview` tags:

```javascript
// BrowserWindow
new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})

// webview tag
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Zie het [BrowserWindow](https://electronjs.org/docs/api/browser-window) en [`<webview>` Tag](https://electronjs.org/docs/api/webview-tag) documentatie voor meer informatie.

### Filteren van `remote.require()` / `remote.getGlobal()` Verzoeken

This feature is useful if you don't want to completely disable the `remote` module in your renderer process or `webview` but would like additional control over which modules can be required via `remote.require`.

Wanneer een module vereist is via `afstandsbediening. gelijk aan` in een renderer-proces, een `van externe behoeften` event wordt opgeroepen door de [`app` module](https://electronjs.org/docs/api/app). Je kunt `event.preventDefault()` aanroepen op het evenement (het eerste argument) om te voorkomen dat de module wordt geladen. De [`WebContents` instantie](https://electronjs.org/docs/api/web-contents) waar de eis is opgetreden wordt doorgegeven als het tweede argument, en de naam van de module is doorgegeven als derde argument. Dezelfde gebeurtenis wordt ook uitgestoten in de `WebContents` instantie, maar in dit geval zijn de enige argumenten het event en de naam van de module. In beide gevallen kunt u een aangepaste waarde teruggeven door de waarde van `event.returnValue` in te stellen.

```javascript
// Beheer `remote.require` van alle WebContents:
app.on('remote-require', function (event, webContents, requestedModuleName) {
  // ...
})

// Bedien `remote.require` van een specifieke WebContents instantie:
browserWin.webContents.on('remote-require', function (event, requestedModuleName) {
  // ...
})
```

Als op dezelfde manier `remote.getGlobal(name)` wordt genoemd, wordt een `afstandsbediening globaal` evenement gepromoveerd. Dit werkt op dezelfde manier als het `remote-require` event: bel `preventDefault()` om te voorkomen dat de globale waarde wordt teruggegeven, en zet `gebeurtenis. eturnWaarde` om een aangepaste waarde terug te geven.

```javascript
// Bedien `remote.getGlobal` van alle WebContents:
app.on('remote-get-global', functie (event, webContents, requrestedGlobalName) {
  // ...
})

// Bedien `remote.getGlobal` van een specifieke WebContents instantie:
browserWin.webContents.on('remote-get-global', functie (event, requestedGlobalName) {
  // ...
})
```

Zie de volgende documentatie voor meer informatie:

* [`remote.Vereist`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`remote.getGlobal`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`app`](https://electronjs.org/docs/api/app)
* [`WebInhoud`](https://electronjs.org/docs/api/web-contents)

### JavaScript toegang tot het Over Paneel

Op macOS kunt u nu de `app aanroepen. howAboutPanel()` het venster over het programma te zien, net als op het menu-item gemaakt via `{role: 'about'}`. Zie de [`toon AboutPanel` documentatie](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos) voor meer informatie

### Het besturen van `WebContents` Achtergrond Throttling

`WebContents` instanties hebben nu een methode `setBackgroundThrottling(toegestaan)` om beperking van timers en animaties in of uit te schakelen wanneer de pagina op de achtergrond is.

```javascript
let win = nieuw BrowserWindow(...)
win.webContents.setBackgroundThrottling(enableBackgroundThrottling)
```

Zie [de `setBackgroundThrottling` documentatie](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed) voor meer informatie.

## Breaking Changes

### Geen macOS 10.9 ondersteuning

Chromium ondersteunt macOS 10.9 (OS X Mavericks) niet meer, en als gevolg daarvan [Electron 4.0 en daarbuiten ondersteunt het ook niet](https://github.com/electron/electron/pull/15357).

### Enkele instantie vergrendelen

Voorheen om uw app tot een Single Instance applicatie te maken (zorg ervoor dat er op elk moment slechts één exemplaar van uw app actief is) je kunt de app `gebruiken. akeSingleInstance()` methode. Vanaf Electron 4.0 moet u in plaats daarvan `app.requestSingleInstanceLock()` gebruiken. De retourwaarde van deze methode geeft aan of deze instantie van uw applicatie de vergrendeling met succes heeft verkregen. Als het niet gelukt is om de vergrendeling te verkrijgen, kunt u ervan uitgaan dat een ander exemplaar van uw applicatie direct draait met de vergrendeling en afsluit.

For an example of using `requestSingleInstanceLock()` and information on nuanced behavior on various platforms, [see the documentation for `app.requestSingleInstanceLock()` and related methods](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) and [the `second-instance` event](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

Bij het maken van inheemse modules voor ramen, moet de `win_delay_load_hook` variabele in de `binding.gyp` van de module waar zijn (wat de standaard is). Als deze hook niet aanwezig is, dan zal de oorspronkelijke module niet laden op Windows, met een foutmelding zoals `kan module niet vinden`. [Zie de handleiding van de originele module](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook) voor meer informatie.

## Afschrijvingen

De volgende breekbare wijzigingen zijn gepland voor Electron 5.0, en worden dus verouderd in Electron 4.0.

### Node.js integratie uitgeschakeld voor `nativeWindowOpen`-ed Windows

Vanaf Electron 5.0 zullen onderliggende vensters geopend worden met de `nativeWindowOpen` optie zal Node.js integratie altijd uitgeschakeld hebben.

### `webPreferences` Standaardwaarden

Bij het maken van een nieuw `Browservenster` met de `webPreferences` optie set de volgende `webPreferences` optie standaardwaarden worden verouderd ten gunste van de hieronder vermelde nieuwe standaardinstellingen:

<div class="table table-ruled table-full-width">

| Property | Deprecated Default | New Default |
|----------|--------------------|-------------|
| `contextIsolation` | `false` | `true` |
| `nodeIntegration` | `true` | `false` |
| `webviewTag` | value of `nodeIntegration` if set, otherwise `true` | `false` |

</div>

Let op: er is momenteel [een bekende bug (#9736)](https://github.com/electron/electron/issues/9736) die voorkomt dat de `webview` tag werkt als `contextIsolation` ingeschakeld is. Houd de GitHub kwestie in de gaten voor actuele informatie!

Leer meer over context isolatie, Node integratie en de `webview` tag [het Electron security document](https://electronjs.org/docs/tutorial/security).

Electron 4.0 gebruikt nog steeds de huidige standaarden, maar als je er geen expliciete waarde voor doorgeeft, zie je een waarschuwing voor deze eigenschappen. Om uw app voor te bereiden op Electron 5.0, gebruik expliciete waarden voor deze opties. [Zie het `BrowserWindow` docs](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) voor details over elk van deze opties.

### `webContents.findInPage(text[, options])`

De `medialCapitalAsWordStart` en `wordStart` opties zijn niet meer ondersteund omdat ze upstream verwijderd zijn.

## App Feedback programma

Het [App Feedback Programma](https://electronjs.org/blog/app-feedback-program) dat we hebben gestart tijdens de ontwikkeling van Electron 3. was succesvol, dus we hebben het voortgezet tijdens de ontwikkeling van 4,0. We zouden graag een enorme dank willen uitbreiden naar Atlassian, Discord, MS Teams, OpenFin, Slack, Symfonie, WhatsApp en de andere programmaleden voor hun betrokkenheid tijdens de 4 programma's. bèta-cyclus Voor meer informatie over het App-feedbackprogramma en om deel te nemen aan toekomstige weddenschappen, [bekijk onze blogpost over het programma](https://electronjs.org/blog/app-feedback-program).

## Wat is volgende

In de korte termijn. je kan verwachten dat het team zich blijft concentreren op het bijhouden van de ontwikkeling van de belangrijkste onderdelen die Electron vormen, inclusief Chromium, Node en V8. Hoewel we ons ervoor hoeden om geen beloften te doen over releasedatums, ons plan is nieuwe grote versies van Electron vrij te geven met nieuwe versies van deze componenten ongeveer kwartaal. [Bekijk onze versie-document](https://electronjs.org/docs/tutorial/electron-versioning) voor meer gedetailleerde informatie over versiebeheer in Electron.

Voor informatie over geplande brekende wijzigingen in de aankomende versies van Electron, [zie onze geplande Breaking Changes doc](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
