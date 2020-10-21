---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '2019-04-23'
---

Het Electron team is enthousiast over de release van Electron 5.0.0! Je kunt het installeren met npm via `npm install electron@latest` of de tarballen downloaden van [onze releases pagina](https://github.com/electron/electron/releases/tag/v5.0.0). De versie wordt verpakt met upgrades, reparaties en nieuwe functies. We kunnen niet wachten om te zien wat je met hen bouwt! Ga door met het lezen van details over deze release en deel alle feedback die je hebt!

---

## Wat is nieuw?

Veel van de functionaliteit van Electron wordt geleverd door de kerncomponenten Chromium, Node.js en V8. Electron blijft up-to-date met deze projecten om onze gebruikers nieuwe JavaScript-functies, prestatieverbeteringen en beveiligingsoplossingen te bieden. Elk van deze pakketten heeft een grote versie bump in Electron 5:

- Chromium `73.0.3683.119`
  - [Nieuw in 70](https://developers.google.com/web/updates/2018/10/nic70)
  - [Nieuw in 71](https://developers.google.com/web/updates/2018/12/nic71)
  - [Nieuw in 72](https://developers.google.com/web/updates/2019/01/nic72)
  - [Nieuw in 73](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [Node 12 blogpost](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`.
  - [Nieuwe JS functies](https://twitter.com/mathias/status/1120700101637353473)

Electron 5 bevat ook verbeteringen aan de Electron-specifieke API's. Een samenvatting van de belangrijkste wijzigingen is hieronder; voor de volledige lijst van wijzigingen zie de [Electron v5.0.0 release notes](https://github.com/electron/electron/releases/tag/v5.0.0).

### Promisification

Electron 5 gaat door met het [Promisificatie-initiatief](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) initiatief om de callbackgebaseerde API van Electron om beloften te gebruiken. Deze API's zijn geconverteerd voor Electron 5:
* `app.getFileIcon`
* `contentTracing.getCategorieën`
* `contentTracing.startOpname`
* `contentTracing.stopOpname`
* `debugger.sendCommand`
* Cookies API
* `shell.openExterne`
* `Bestand`
* `URL`
* `Niveau`
* `webContents.zoomFactor`
* `win.capturePagina`

### Systeemkleuren toegang voor macOS

Deze functies zijn gewijzigd of toegevoegd aan `systemPreferences` voor toegang tot de kleuren van macOS-systemen:
* `systemPreferences.getAccentColor`
* `systemPreferences.getColor`
* `systemPreferences.getSystemColor`

### Geheugeninformatie verwerken

De functie `process.getProcessMemoryInfo` is toegevoegd om geheugenstatistieken over het huidige proces op te halen.

### Extra filtering voor externe API's

Om de beveiliging te verbeteren in de `externe` API, zijn nieuwe externe gebeurtenissen toegevoegd, zodat `op afstand staat. etBuiltin`, `afstandsbediening. etCurrentWindow`, `remote.getCurrentWebContents` en `<webview>.getWebContents` kan [gefilterd](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows) zijn.

### Meerdere BrowserViews in browservenster

BrowserWindow ondersteunt nu het beheren van meerdere BrowserViews binnen hetzelfde BrowserWindow.

## Breaking Changes

### Standaardwaarden voor verpakte apps

Verpakte apps gedragen zich nu als de standaard app: er wordt een standaard applicatiemenu gemaakt tenzij de app er een heeft en de `window-all-closed` event automatisch wordt afgehandeld tenzij de app de gebeurtenis afhandelt.

### Gemengde sandbox

Gemengde sandbox-modus is nu standaard ingeschakeld. Renderers gelanceerd met `sandbox: true` zal nu echt sandboxen zijn, waar ze eerder alleen sandboxed zouden zijn als mixed-sandbox-modus was ingeschakeld.

### Verbetering van de beveiliging
De standaardwaarden van `nodeIntegration` en `webviewTag` zijn nu `false` om de beveiliging te verbeteren.

### Spellchecker nu asynchroon

De SpellCheck API is gewijzigd om [asynchrone resultaten](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider) te bieden.

## Afschrijvingen

De volgende API's zijn pas verouderd in Electron 5.0.0 en gepland voor verwijdering in 6.0.0:

### Mksnapshot binaries voor arm en arm64
Oorspronkelijke binaries van mksnapshot voor arm en arm64 worden niet meer ondersteund en zullen over 6 worden verwijderd. .0. Snapshots kunnen voor arm en arm64 worden gemaakt met behulp van de x64 binaries.

### ServiceWorker API's op WebContent
Verouderde ServiceWorker API's op WebContents in voorbereiding voor de verwijdering ervan.
* `Worker`
* `ServiceWorker`

### Automatische modules met sandboxed webcontent
Om de beveiliging te verbeteren de volgende modules worden niet meer ondersteund voor gebruik direct via `require` en moeten in plaats daarvan worden opgenomen via `remote. equire` in een sandboxed webcontent:
* `Elektron.scherm`
* `child_process`
* `fs`
* `os`
* `pad`

## webFrame Isolated World APIs
`webFrame.setIsolatedWorldSecurityPolicy`,`webFrame.setIsolatedWorldHumanReadableName`, `webFrame.setIsolatedWorldSecurityOrigin` zijn verouderd ten gunste van `webFrame.setIsolatedWorldInfo`.

### Gemengde sandbox
`enableMixedSandbox` en de `--enable-mixed-sandbox` command-line switch bestaat nog steeds voor compatibiliteit, maar zijn verouderd en hebben geen effect.

## Einde van de ondersteuning voor 2.0.x

Per onze [ondersteunde versiesbeleid](https://electronjs.org/docs/tutorial/support#supported-versions)heeft 2.0.x zijn einde bereikt.

## App Feedback programma

We blijven ons [App Feedback Programma](https://electronjs.org/blog/app-feedback-program) gebruiken om te testen. Projecten die deelnemen aan dit programma en Electron betas testen op hun apps; en in ruil daarvoor hebben de nieuwe bugs die ze vinden prioriteit voor de stabiele vrijlating. Als u deel wilt nemen of meer informatie wilt ontvangen, [bekijk dan onze blogpost over het programma](https://electronjs.org/blog/app-feedback-program).

## Wat is volgende

In de korte termijn. je kan verwachten dat het team zich blijft concentreren op het bijhouden van de ontwikkeling van de belangrijkste onderdelen die Electron vormen, inclusief Chromium, Node en V8. Hoewel we ons ervoor hoeden om geen beloften te doen over releasedatums, ons plan is nieuwe grote versies van Electron vrij te geven met nieuwe versies van deze componenten ongeveer kwartaal. Het [voorlopige schema 6.0.0](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) brengt de belangrijkste data in de ontwikkelingscyclus van Electron 6. Bekijk ook [ons versiedocument](https://electronjs.org/docs/tutorial/electron-versioning) voor meer gedetailleerde informatie over versiebeheer in Electron.

Voor informatie over geplande brekende wijzigingen in de aankomende versies van Electron, [zie onze geplande Breaking Changes doc](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
