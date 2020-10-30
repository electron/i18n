# Beveiliging, inheemse mogelijkheden en jouw verantwoordelijkheid

Als webontwikkelaars, We genieten meestal van het sterke veiligheidsnet van de browser - de risico's die verbonden zijn aan de code die we schrijven zijn relatief klein. Onze websites krijgen beperkte bevoegdheden in een sandbox, en we vertrouwen erop dat onze gebruikers genieten van een browser gebouwd door een groot team van ingenieurs dat snel kan reageren op nieuw ontdekte beveiligingsdreigingen.

Wanneer je werkt met Electron is het belangrijk dat je begrijpt dat Electron geen webbrowser is. Het laat je feature-rijke desktop applicaties bouwen met bekende webtechnologieën, maar je code heeft veel meer macht. JavaScript kan toegang krijgen tot het bestandssysteem, gebruiker-shell en meer. Dit stelt je in staat om applicaties van hoge kwaliteit te bouwen, maar de inherente beveiligingsrisico's schalen met de extra bevoegdheden die aan je code zijn toegekend.

Dat zeggende, wees er van bewust dat het weergeven van willekeurige inhoud van onbetrouwbare bronnen een ernstig veiligheidsrisico vormt dat niet bestemd is voor Electron om aan te kunnen. Sterker nog, de populairste Electron apps (Atom, Slack, Visual Studio Code, enz.) tonen voornamelijk lokale inhoud (of vertrouwd, veilige externe inhoud zonder Node integratie) - als uw toepassing code uitvoert vanaf een online bron, het is uw verantwoordelijkheid om ervoor te zorgen dat de code niet kwaadaardig is.

## Melden van beveiligingsproblemen

Voor informatie over hoe u de kwetsbaarheid van Electron kunt onthullen, zie [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromium beveiligingsproblemen en upgrades

Electron blijft up-to-date met afwisselende Chromium releases. Voor meer informatie, zie de [Electron Release Cadence blog post](https://electronjs.org/blog/12-week-cadence).

## Veiligheid is ieders verantwoordelijkheid

Het is belangrijk om te onthouden dat de veiligheid van uw Electron applicatie het resultaat is van de algemene veiligheid van de framework foundation (*Chromium*, *Nee. s*), Electron zelf, alle NPM afhankelijkheden en je code. Als zodanig, is het uw verantwoordelijkheid om een paar belangrijke beste praktijken te volgen:

* **Houd je applicatie up-to-date met de nieuwste Electron framework release.** Als u uw product uitbrengt, verzendt u ook een bundel bestaande uit Electron, Chromium shared library en Node.js. De kwetsbaarheden die van invloed zijn op deze componenten kunnen de beveiliging van uw applicatie beïnvloeden. Door Electron te updaten naar de nieuwste versie, zorg ervoor dat kritieke kwetsbaarheden (zoals *nodeIntegration bypasses*) al gepatched zijn en niet in uw applicatie kunnen worden uitgebuit. Voor meer informatie, zie "[Gebruik een huidige versie van Electron](#17-use-a-current-version-of-electron)".

* **Evalueer je afhankelijkheden.** Hoewel NPM een half miljoen herbruikbare pakketten biedt, is het uw verantwoordelijkheid om vertrouwde bibliotheken van derden te kiezen. Als je verouderde bibliotheken gebruikt die beïnvloed worden door bekende kwetsbaarheden of afhankelijk bent van slecht onderhouden code, kan de veiligheid van je toepassing in gevaar zijn.

* **Geef veilige coderingspraktijken aan.** De eerste regel van verdediging voor uw applicatie is uw eigen code. Gewone web-kwetsbaarheden, zoals Cross-Site Scripting (XSS), heeft een hogere beveiligingsimpact op Electron applicaties, daarom is het sterk aanbevolen om veilige software ontwikkelingspraktijken aan te nemen en beveiligingstests uit te voeren.


## Isolatie voor niet-vertrouwde inhoud

Er bestaat een beveiligingsprobleem wanneer u code ontvangt van een niet-vertrouwde bron (bijvoorbeeld een externe server) en deze lokaal uitvoert. Overweeg bijvoorbeeld een externe website die wordt weergegeven in een standaard [`BrowserWindow`](../api/browser-window.md). Als een aanvaller op de een of andere manier de genoemde inhoud kan veranderen (hetzij door de bron rechtstreeks aan te vallen, of door te zitten tussen je app en de eigenlijke bestemming), ze kunnen native code uitvoeren op de machine van de gebruiker.

> :warning: mag onder geen enkele omstandigheid externe code laden en uitvoeren met Node.js integratie ingeschakeld. Gebruik in plaats daarvan alleen lokale bestanden (verpakt samen met uw applicatie) om Node.js code uit te voeren. Toon externe inhoud gebruik de [`<webview>`](../api/webview-tag.md) tag of [`BrowserView`](../api/browser-view.md), zorg ervoor dat om de `nodeIntegration` uit te schakelen en schakel `contextIsolatie` in.

## Electron beveiligingswaarschuwingen

Van Electron 2.0 aan, zien ontwikkelaars waarschuwingen en aanbevelingen tot de ontwikkelaarconsole. Ze verschijnen alleen als Electron de naam van de binary is, geeft aan dat een ontwikkelaar momenteel naar de console kijkt.

You can force-enable or force-disable these warnings by setting `ELECTRON_ENABLE_SECURITY_WARNINGS` or `ELECTRON_DISABLE_SECURITY_WARNINGS` on either `process.env` or the `window` object.

## Checklist: beveiligingsaanbevelingen

Je moet ten minste deze stappen volgen om de veiligheid van je applicatie te verbeteren:

1. [Alleen beveiligde inhoud laden](#1-only-load-secure-content)
2. [Schakel de Node.js integratie uit in alle spelers die externe inhoud weergeven](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [Schakel context isolatie in in alle spelers die externe inhoud weergeven](#3-enable-context-isolation-for-remote-content)
4. [Gebruik `ses.setPermissionRequestHandler()` in alle sessies die externe inhoud laden](#4-handle-session-permission-requests-from-remote-content)
5. [Schakel `webSecurity niet uit`](#5-do-not-disable-websecurity)
6. [Definieer een `Content-Security-Policy`](#6-define-a-content-security-policy) en gebruik restrictieve regels (bijv. `script-src 'self'`)
7. [Stel `Toestaan Onveilige Inhoud` niet in op `waar`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [Experimentele functies niet inschakelen](#8-do-not-enable-experimental-features)
9. [Gebruik niet `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: Gebruik geen `laat popups` toe](#10-do-not-use-allowpopups)
11. [`<webview>`: Verifieer opties en parameters](#11-verify-webview-options-before-creation)
12. [Uitschakelen of beperken van navigatie](#12-disable-or-limit-navigation)
13. [Uitschakelen of beperken van het maken van nieuwe vensters](#13-disable-or-limit-creation-of-new-windows)
14. [Gebruik `openexterne` niet met niet-vertrouwde inhoud](#14-do-not-use-openexternal-with-untrusted-content)
15. [Uitschakelen van de `externe` module](#15-disable-the-remote-module)
16. [Filter de `externe` module](#16-filter-the-remote-module)
17. [Gebruik een huidige versie van Electron](#17-use-a-current-version-of-electron)

Om de detectie van verkeerde configuraties en onveilige patronen te automatiseren, is het mogelijk om [elektronica](https://github.com/doyensec/electronegativity) te gebruiken. Voor extra details over potentiële zwakheden en implementatiebugs wanneer applicaties ontwikkelen met behulp van Electron, Raadpleeg deze [handleiding voor ontwikkelaars en accountants](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Alleen beveiligde inhoud laden

Alle bronnen die niet zijn opgenomen in uw applicatie moeten worden geladen met behulp van een beveiligd protocol zoals `HTTPS`. Met andere woorden, gebruik geen onveilige protocollen zoals `HTTP`. Op dezelfde manier raden we het gebruik aan van `WSS` over `WS`, `FTPS` over `FTP`, enzovoort.

### Waarom?

`HTTPS` heeft drie belangrijke voordelen:

1) Het authenticeert de externe server, zodat je app verbinding maakt met de juiste host in plaats van een impersonator. 2) Het waarborgt de integriteit van de gegevens, met het argument dat de gegevens niet zijn gewijzigd tijdens transport tussen je applicatie en de host. 3) Het versleutelt het verkeer tussen je gebruiker en de bestemming waardoor het moeilijker wordt om de informatie die tussen uw app en de host wordt verzonden af te luisteren.

### Hoe?

```js
// Slecht
browserWindow.loadURL('http://example.com')

// Goed
browserWindow.loadURL('https://example.com')
```

```html
<!-- Bad -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- Good -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```


## 2) Node.js integratie voor externe inhoud niet inschakelen

_Deze aanbeveling is het standaardgedrag in Electron sinds 5.0.0._

Het is van het grootste belang dat u dit niet mogelijk maakt. s integratie in elke renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), of [`<webview>`](../api/webview-tag.md)) die de externe inhoud belasten. Het doel is om de bevoegdheden die je verleent aan inhoud op afstand te beperken Aldus wordt het dramatisch moeilijker voor een aanvaller om uw gebruikers schade te berokkenen, als zij de mogelijkheid krijgen JavaScript op uw website uit te voeren.

Hierna kun je extra machtigingen verlenen voor specifieke hosts. Bijvoorbeeld als je een browservenster opent naar `https://voorbeeld. om/`, je kunt deze website precies de vaardigheden geven die het nodig heeft, maar niet meer.

### Waarom?

Een cross-site-scripting (XSS) aanval is gevaarlijker als een aanvaller uit het renderer-proces kan springen en code kan uitvoeren op de computer van de gebruiker. Overige aanvallen op de strafvervolgingen komen vrij vaak voor - en hoewel het een probleem is de kracht van hun is meestal beperkt tot puzzelen met de website waarop ze worden uitgevoerd. Het uitschakelen van Node.js integratie helpt voorkomen dat een XSS wordt geëscaleerd tot een zogenoemde "Remote Code Execution" (RCE) aanval.

### Hoe?

```js
// Slecht
const mainwindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Goed
const mainwindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html<!-- Slecht --><webview nodeIntegration src="page.html"></webview><!-- Goed --><webview src="page.html"></webview>
```

Wanneer u Node.js integratie uitschakelt, kunt u nog steeds API's blootstellen aan uw website die Node.js modules of functies verbruikt. Scripts blijven laden om toegang te krijgen tot tot `vereisen` en andere Node. s functies, waardoor ontwikkelaars een aangepaste API kunnen tonen om de inhoud op afstand te laden.

In het volgende voorbeeld zal de geladen website toegang hebben tot een `window.readConfig()` methode, maar geen Node.js functies.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```


## 3) Context Isolation inschakelen voor externe inhoud

Context isolatie is een Electron functie waarmee ontwikkelaars code kunnen uitvoeren in preload scripts en in Electron API's in een speciale JavaScript context. In practice betekent dat dat globale objecten zoals `Array.prototype. ush` of `JSON.parse` kan niet worden gewijzigd door scripts die in het renderer-proces worden uitgevoerd.

Electron gebruikt dezelfde technologie als Chromium's [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) om dit gedrag in te schakelen.

Zelfs wanneer u `nodeIntegration: false` gebruikt om sterk geïsoleerd te worden en het gebruik van Node primitives te voorkomen `contextIsolatie` moet ook worden gebruikt.

### Waarom & Hoe?

Voor meer informatie over wat `contextIsolatie` is en hoe je het kunt inschakelen, kijk bij ons toegewijde [Context Isolation](context-isolation.md) document.


## 4) Sessie-toestemmingsverzoeken behandelen van externe inhoud

Je hebt tijdens het gebruik van Chrome mogelijk machtigingsverzoeken gezien: ze verschijnen wanneer de website probeert een functie te gebruiken die de gebruiker handmatig moet goedkeuren ( zoals meldingen).

De API is gebaseerd op de [Chromium permissies API](https://developer.chrome.com/extensions/permissions) en implementeert dezelfde soorten rechten.

### Waarom?

Standaard keurt Electron automatisch alle toestemmingsverzoeken goed, tenzij de ontwikkelaar handmatig een aangepaste handler heeft geconfigureerd. Terwijl een solide bankroet mogelijk veiligheidsbewuste ontwikkelaars het tegenovergestelde willen veronderstellen.

### Hoe?

```js
const { session } = require('electron')

sessie
  .fromPartition('some-partition')
  . etPermissionRequestHandler((webContents, permissie, callback) => {
    const url = webContents. etURL()

    als (permissie === 'meldingen') {
      // Keurt de toestemmingen aanvraag
      callback(true)
    }

    // Controleer URL
    als (! rl. tartsWith('https://voorbeeld). om/')) {
      // Ontkent de machtigingen verzoek
      return callback(false)
    }
})
```


## 5) Schakel de webbeveiliging niet uit

_Aanbeveling is de standaard van Electron's_

Je hebt misschien al geraden dat je de `webSecurity` eigenschap op een renderer proces uitschakelt ([`Browserwindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), of [`<webview>`](../api/webview-tag.md)) schakelt cruciale beveiligingsfuncties uit.

Schakel `webSecurity` niet uit in productie applicaties.

### Waarom?

Het uitschakelen van `webSecurity` schakelt het zelfde oorsprongbeleid uit en zet `Toestaan Onveilige Inhoud` eigenschap op `waar`. In andere woorden, het staat toe om onveilige code uit te voeren vanuit verschillende domeinen.

### Hoe?
```js
// Slecht
const mainwindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Goed
const mainwindow = new BrowserWindow()
```

```html<!-- Slecht --><webview disablewebsecurity src="page.html"></webview><!-- Goed --><webview src="page.html"></webview>
```


## 6) Een inhoudsveiligheidsbeleid definiëren

Een Content Security (CSP) is een extra laag van bescherming tegen cross-site-scripting aanvallen en data injection attacks. We raden aan om ze aan te zetten op elke website die je binnen Electron laadt.

### Waarom?

CSP stelt de server die content serveert in staat om de bronnen Electron kan laden voor die webpagina. `https://example.com` zou toegestaan moeten zijn om scripts te laden van de oorsprong die u gedefinieerd heeft tijdens scripts van `https://evil. ttacker.com` mag niet werken. Het definiëren van een CSP is een eenvoudige manier om de veiligheid van uw applicatie te verbeteren.

De volgende CSP staat Electron toe om scripts uit te voeren van de huidige website en van `apis.example.com`.

```plaintext
// Slecht
Content-Security-Policy: '*'

// Goed
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### CSP HTTP Header

Electron respecteert de [`Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) die kan worden ingesteld met behulp van Electron's [`webRequest.onHeadersOntvangen`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:

```javascript
const { session } = require('electron')

session.defaultSession.webRequest. nHeadersReceived(details, callback) => {
  callback({
    responseHeaders: {
      . .details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\'']
    }
  })
})
```

### CSP Meta Tag

Het gewenste uitleveringsmechanisme van CSS is een HTTP header, Het is echter niet mogelijk om deze methode te gebruiken bij het laden van een bron via het `file://` protocol. Het kan nuttig zijn in sommige gevallen, zoals het gebruik van `file://` protocol, om een beleid in te stellen op een pagina direct in de markup met een `<meta>` tag:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```


## 7) Stel `niet toe om RunningInsecureContent` toe te staan op `true`

_Aanbeveling is de standaard van Electron's_

Standaard staat Electron niet toe dat websites die via `HTTPS` geladen zijn en scripts uitvoeren, CSS of plugins van onveilige bronnen (`HTTP`). Instellen van de eigenschap `zorgt ervoor dat RunningInsecureContent` op `true` uitgeschakeld wordt die bescherming.

Het laden van de eerste HTML van een website via `HTTPS` </code> en het laden van latere bronnen via `HTTP` wordt ook wel "gemengde inhoud" genoemd.

### Waarom?

Het laden van inhoud via `HTTPS` verzekert de authenticiteit en integriteit van de geladen bronnen tijdens het versleutelen van het verkeer zelf. Zie de sectie op [alleen veilige inhoud](#1-only-load-secure-content) voor meer informatie.

### Hoe?

```js
// Slecht
const mainwindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Goed
const hoofdvenster = new BrowserWindow({})
```


## 8) Experimentele functies niet inschakelen

_Aanbeveling is de standaard van Electron's_

Geavanceerde gebruikers van Electron kunnen experimentele Chromium functies inschakelen met behulp van de eigenschappen `experimentalFeatures` eigenschappen.

### Waarom?

Experimentele functies zijn, zoals de naam suggereert, experimenteel en zijn niet ingeschakeld voor alle Chromiumgebruikers. Bovendien is hun impact op Electron als geheel waarschijnlijk niet getest.

Legitieme gebruik zaken bestaan, maar tenzij u weet wat u aan het doen bent, moet u deze eigenschap niet activeren.

### Hoe?

```js
// Slecht
const mainwindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Goed
const hoofdvenster = new BrowserWindow({})
```


## 9) Gebruik niet `enableBlinkFeatures`

_Aanbeveling is de standaard van Electron's_

Knipperen is de naam van de rendering-engine achter Chromium. Net als met `experimentalFeatures`stelt de `enableBlinkFeatures` eigenschap ontwikkelaars in staat om functies in te schakelen die standaard zijn uitgeschakeld.

### Waarom?

Over het algemeen zijn er waarschijnlijk goede redenen als een functie niet standaard is ingeschakeld. Legitieme gebruik van gevallen voor het inschakelen van specifieke functies bestaan al. Als een ontwikkelaar, moet u precies weten waarom u een functie moet inschakelen, wat de consequenties zijn en hoe het de veiligheid van uw applicatie beïnvloedt. Onder geen omstandigheden mag je speculatieve functies inschakelen.

### Hoe?
```js
// Slecht
const mainwindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
// Goed
const mainwindow = new BrowserWindow()
```


## 10) Gebruik `allowpopups` niet

_Aanbeveling is de standaard van Electron's_

Als u [`<webview>`](../api/webview-tag.md)gebruikt, u heeft mogelijk de pagina's en scripts nodig die in uw tag `<webview>` zijn geladen om nieuwe vensters te openen. Het `allowpopups` attribuut stelt hen in staat om een nieuw [`BrowserWindows`](../api/browser-window.md) te maken met behulp van de `window.open()` methode. `<webview>` tags zijn anders niet toegestaan om nieuwe vensters te maken.

### Waarom?

Als je geen popups nodig hebt, staat je standaard het nieuwe [`BrowserWindows`](../api/browser-window.md) niet toe. Dit volgt het principe van minimaal vereiste toegang: laat een website geen nieuwe pop-ups maken, tenzij u weet dat het die functie nodig heeft.

### Hoe?

```html<!-- Slecht --><webview allowpopups src="page.html"></webview><!-- Goed --><webview src="page.html"></webview>
```


## 11) Controleer de WebView-opties voor de aanmaak

Een WebView gemaakt in een renderer proces dat geen Node.js integratie ingeschakeld heeft, zal de integratie zelf niet mogelijk maken. Een WebView zal echter altijd een onafhankelijk rendererproces creëren met zijn eigen `webPreferences`.

Het is een goed idee om de creatie van nieuwe [`<webview>`](../api/webview-tag.md) tags uit het hoofdproces te besturen en om te controleren of hun webvoorkeuren beveiligingsfuncties niet uitschakelen.

### Waarom?

Sinds `<webview>` live in de DOM, ze kunnen worden gemaakt door een script dat op uw website wordt uitgevoerd, zelfs als Node. de integratie is anders uitgeschakeld.

Elektron stelt ontwikkelaars in staat om verschillende beveiligingsfuncties die een renderer proces bedienen. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`](../api/webview-tag.md) tags.

### Hoe?

Vóór een [`<webview>`](../api/webview-tag.md) tag is toegevoegd, Electron vuurt de `zal bevestigen-webview` event op de hosting `webcontent`. Gebruik de gebeurtenis om het maken van `webViews` met mogelijk onveilige opties te voorkomen.

```js
app.on('web-contents-created', (evenement, contents) => {
  inhoud. n('will-attach-webview', (event, webvoorkeuren, params) => {
    // Verwijder preload scripts als hun locatie niet wordt gebruikt of controleer of
    verwijder webVoorkeuren. herlaad
    verwijder webvoorkeuren. reloadURL

    // Node.js integratie
    webvoorkeuren uitschakelen. odeIntegration = false

    // Controleer de URL die geladen wordt
    als (!params. rc.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
 }) 
 })
```

Nogmaals, deze lijst minimaliseert slechts het risico, maar verwijdert deze niet. Als je doel is om een website weer te geven, zal een browser een veiligere optie zijn.

## 12) Navigatie uitschakelen of beperken

Als uw app niet hoeft te navigeren of alleen hoeft te navigeren naar bekende pagina's, het is een goed idee om navigatie volledig te beperken tot die bekende scope, om andere soorten navigatie niet toe te staan.

### Waarom?

Navigatie is een algemene aanvalsvector. Als een aanvaller uw app kan overtuigen om weg te navigeren van de huidige pagina. ze kunnen je app dwingen websites op het internet te openen. Zelfs als uw `webContents` zijn geconfigureerd om meer veilig te zijn (zoals `nodeIntegration` uitgeschakeld of `contextIsolatie` ingeschakeld hebben), als je je app zo ver krijgt om een willekeurige website te openen, wordt het gebruik van je app veel gemakkelijker.

Een veel voorkomende aanvalspatroon is dat de aanvaller de gebruikers van je app overtuigt om te communiceren met de app op een manier dat het navigeert naar een van de pagina's van de aanvaller. Dit wordt meestal gedaan via links, plugins of andere door de gebruiker gegenereerde content.

### Hoe?

Als uw app geen navigatie nodig heeft, kunt u `event.preventDefault()` in een [`will-navigeren`](../api/web-contents.md#event-will-navigate) handler. If you know which pages your app might navigate to, check the URL in the event handler and only let navigation occur if it matches the URLs you're expecting.

We raden u aan om Nodes parser te gebruiken voor URL's. Eenvoudige tekenreeks vergelijkingen kunnen soms voor de gek worden gehouden - een `startsWith('https://example.com')` test zou `https://example.com.attacker.com` door laten gaan.

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

## 13) Uitschakelen of limietcreatie van nieuwe vensters

Als u een bekende vensterset hebt, is het een goed idee om de aanmaak van extra vensters in uw app te beperken.

### Waarom?

Veel zoals navigatie, het maken van nieuwe `webContents` is een veel voorkomende aanval vector. Aanvallers proberen uw app te overtuigen om nieuwe vensters, frames, of andere processen met meer privileges dan voorheen te creëren; of met pagina's die eerder niet konden worden geopend.

Als u geen vensters hoeft te maken naast degene die u kent moet het maken, het uitschakelen van de aanmaak koopt je een beetje extra beveiliging tegen geen kosten. Dit is vaak het geval voor apps die één `BrowserWindow` openen en geen willekeurig aantal extra vensters openen tijdens runtime.

### Hoe?

[`webInhoud`](../api/web-contents.md) zal [`nieuw-venster`](../api/web-contents.md#event-new-window) event uitstoten alvorens nieuwe vensters aan te maken. Die afspraak wordt onder andere parameters doorgegeven de `url` het venster werd opgevraagd om te openen en de opties gebruikt om aan te maken. We raden u aan het event te gebruiken om de creatie van vensters te onderzoeken en te beperken tot wat u nodig hebt.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  inhoud. n('new-window', async (event, navigationUrl) => {
    // In dit voorbeeld, we vragen het besturingssysteem
    // om de url van dit evenement in de standaard browser te openen.
    event.preventDefault()

    wacht op shell.openExternal(navigationUrl)
  })
})
```

## 14) Gebruik `openExtern` niet met niet-vertrouwde inhoud

Shell [`openexterne`](../api/shell.md#shellopenexternalurl-options) maakt het mogelijk om een gegeven protocol-URI te openen met de inheemse toepassingen van de desktop. Op macOS bijvoorbeeld, deze functie is vergelijkbaar met de `terminal opdracht hulpprogramma` en zal de specifieke applicatie openen op basis van de URI en filetype associatie.

### Waarom?

Onjuist gebruik van [`openExtern`](../api/shell.md#shellopenexternalurl-options) kan worden gebruikt om de host van de gebruiker in gevaar te brengen. Wanneer openExtern wordt gebruikt met niet-vertrouwde inhoud, kan het worden gebruikt om willekeurige opdrachten uit te voeren.

### Hoe?

```js
// Slecht
const { shell } = require('electron')
shell.openExternal(USER_CONTROLED_DATA_HERE)
```
```js
// Goed
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) Uitschakelen van de `externe` module

De `externe` module biedt een manier voor de renderer processen om toegang API's te krijgen normaal gesproken alleen beschikbaar in het hoofdproces. Een renderer kan methoden van een hoofdprocesobject inroepen zonder expliciet interprocess-berichten te verzenden. Als je desktopapplicatie geen vertrouwde inhoud draait, dit kan een nuttige manier zijn om toegang te krijgen tot uw renderer processen en te werken met modules die alleen beschikbaar zijn voor het hoofdproces. zoals GUI gerelateerde modules (dialogen, menu's, enz.).

Als je app echter niet-vertrouwde inhoud kan uitvoeren en zelfs als je [sandbox](../api/sandbox-option.md) je renderer-proces kunt uitvoeren de `externe` module maakt het gemakkelijk voor kwaadwillende code om uit de sandbox te ontsnappen en toegang te hebben tot systeembronnen via hogere privileges van het hoofdproces. Daarom, het zou in dergelijke omstandigheden moeten worden uitgeschakeld.

### Waarom?

`externe` gebruikt een intern IPC-kanaal om te communiceren met het hoofdproces. "Prototype vervuiling" aanvallen kunnen kwaadaardige code toegang geven tot het interne IPC-kanaal, welke vervolgens kan worden gebruikt om te ontsnappen aan de sandbox door `externe` IPC berichten te mimicken en toegang te krijgen tot hoofdprocesmodules die werken met hogere privileges.

Bovendien is het mogelijk om scripts vooraf te laden naar modules die per ongeluk lekken naar een sandboxed renderer. Lekken van `externe` armere code met een veelheid van hoofdprocesmodules om een aanval uit te voeren.

Het uitschakelen van de `externe` module elimineert deze aanvalvectors. Het inschakelen van context isolatie voorkomt ook dat de "prototype vervuiling" aanvallen van slagen.

### Hoe?

```js
// Bad if the renderer can run untrusted content
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

```js
// Goed
const mainwindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})
```

```html
<!-- Bad if the renderer can run untrusted content  -->
<webview enableremotemodule="true" src="page.html"></webview>

<!-- Good -->
<webview enableremotemodule="false" src="page.html"></webview>
```

> **Note:** The default value of `enableRemoteModule` is `false` starting from Electron 10. For prior versions, you need to explicitly disable the `remote` module by the means above.


## 16) Filter de `externe` module

Als u de `remote` module niet kunt uitschakelen, moet u de globals, Node, filteren en Electron modules (zogenaamde ingebouwde modules) toegankelijk via `op afstand` die je applicatie niet vereist. Dit kan worden gedaan door bepaalde modules volledig te blokkeren en door anderen te vervangen door proxies die alleen de functionaliteit onthullen die uw app nodig heeft.

### Waarom?

Als gevolg van de toegang tot het systeem van het hoofdproces, Functionaliteit geboden door de hoofdprocesmodules kan gevaarlijk zijn in de handen van kwaadaardige code die wordt uitgevoerd in een gecompromitteerd renderer-proces. Door de set toegankelijke modules te beperken tot het minimum dat uw app nodig heeft en door de anderen te filteren. u vermindert de toolset die kwaadwillende code kan gebruiken om het systeem aan te vallen.

Merk op dat de veiligste optie is om [de externe module volledig uit te schakelen](#15-disable-the-remote-module). Als u kiest om toegang te filteren in plaats van de module volledig uit te schakelen, je moet heel voorzichtig zijn om ervoor te zorgen dat geen escalatie van privilege mogelijk is via de modules die je voorbij het filter toelaat.

### Hoe?

```js
const readOnlyFsProxy = require(/* ... */) // geeft alleen leesfunctionaliteit van het bestand weer

const allowedModules = new Set(['crypto'])
const proxiedModules = new Map(['fs', readOnlyFsProxy])
const allowedElectronModules = nieuwe Set(['shell'])
const allowedGlobals = new Set()

app. n('remote-require', (event, webContents, moduleName) => {
  if (proxiedModules.has(moduleName)) {
    event.returnValue = proxiedModules. et(moduleName)
  }
  als (!allowedModules.has(moduleName)) {
    event.preventDefault()
  }
})

app. n('remote-get-builtin', (event, webContents, moduleName) => {
  if (!allowedElectronModules.has(moduleName)) {
    event. reventDefault()
  }
})

app.on('remote-get-global', (event, webContents, globalName) => {
  if (!allowedGlobals. as(globalName)) {
    event.preventDefault()
  }
})

app. n('remote-get-current-window', (event, webContents) => {
  event. reventDefault()
})

app.on('remote-get-current-web-contents', (event, webContents) => {
  event.preventDefault()
})
```

## 17) Gebruik een huidige versie van Electron

Je moet streven naar het gebruik van de nieuwste versie van Electron. Wanneer een nieuwe grote versie wordt vrijgegeven, moet u proberen om uw app zo snel mogelijk te updaten.

### Waarom?

Een applicatie gebouwd met een oudere versie van Electron, Chromium en Node. s is een makkelijker doelwit dan een applicatie die meer recente versies van die componenten gebruikt. Over het algemeen zijn beveiligingsproblemen en het exploiteren van versies van Chromium en Node.js breder beschikbaar.

Zowel Chromium als Node.js zijn indrukwekkende functies van engineering gebouwd door duizenden getalenteerde ontwikkelaars. Gezien hun populariteit, wordt hun veiligheid zorgvuldig getest en geanalyseerd door even bekwame veiligheidsonderzoekers. Veel van die onderzoekers [brengen kwetsbaarheden op verantwoorde wijze bekend](https://en.wikipedia.org/wiki/Responsible_disclosure), wat over het algemeen betekent dat onderzoekers Chromium en Node zullen geven. is wat tijd om problemen op te lossen alvorens ze te publiceren. Uw aanvraag zal veiliger zijn als er een recente versie van Electron wordt gebruikt (en dus Chromium en Node. ) voor waarvan de potentiële veiligheidsproblemen niet algemeen bekend zijn.
