---
title: Electron 6.0.0
author:
  - sofianguy
  - ckerr
  - codebytere
date: '2019-07-30'
---

Het Electron team is enthousiast over de release van Electron 6.0.0! Je kunt het installeren met npm via `npm install electron@latest` of via onze [releases website](https://electronjs.org/releases/stable). De versie wordt verpakt met upgrades, reparaties en nieuwe functies. We kunnen niet wachten om te zien wat je met hen bouwt! Ga door met het lezen van details over deze release en deel alle feedback die je hebt!

---

## Wat is nieuw

Vandaag markeert een eerste voor het Electron project: dit is de eerste keer dat we een stabiele Electron release **op dezelfde dag** als de bijbehorende [Chrome stabiele release](https://www.chromestatus.com/features/schedule)! 🎉

Veel van de functionaliteit van Electron wordt geleverd door de kerncomponenten Chromium, Node.js en V8. Electron blijft up-to-date met deze projecten om onze gebruikers nieuwe JavaScript-functies, prestatieverbeteringen en beveiligingsoplossingen te bieden. Elk van deze pakketten heeft een grote versie bump in Electron 6:

- Chromium `76.0.3809.88`
  - [Nieuw in 74](https://developers.google.com/web/updates/2019/04/nic74)
  - [Nieuw in 75](https://developers.google.com/web/updates/2019/06/nic75)
  - [Nieuw in 76](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [Node 12.4.0 blogpost](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [V8 7.6 blogpost](https://v8.dev/blog/v8-release-76)

Deze release bevat ook verbeteringen aan de API van Electron. [De release notes](https://github.com/electron/electron/releases/tag/v6.0.0) hebben een completere lijst, maar hier zijn de markeringen:

### Promisification

Electron 6.0 vervolgt het moderniserings [initiatief](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) gestart in 5.0 om [Belofte](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) ondersteuning te verbeteren.

Deze functies geven nu beloftes terug en ondersteunen nog steeds de oude, callbackgebaseerde oproep:
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

Deze functies hebben nu twee formulieren, synchroon en beloftes asynchronous:
 * `dialog.showMessageBox()`/`dialoogvenster.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialoogvenster.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`dialoogvenster.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

Deze functies geven nu beloftes terug:
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `Electron Helper (renderer).app`, `Electron Helper (GPU).app` en `Electron Helper (Plugin).app`

Om de [geharde runtime](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc)in te schakelen, welke dingen zoals beschrijfbaar uitvoerbaar geheugen en het laden van code ondertekend door een ander team ID beperkt, Er moet een speciale code voor ondertekeningen aan de Helper worden toegekend.

Om ervoor te zorgen dat deze aanspraken ook van toepassing zijn op het proces waarvoor ze nodig zijn. Chromium [heeft](https://chromium-review.googlesource.com/c/chromium/src/+/1627456) drie nieuwe varianten van de Helper-app toegevoegd: een voor renderers (`Electron Helper (renderer). pp`), één voor het GPU-proces (`Electron Helper (GPU). pp`) en één voor plugins (`Electron Helper (Plugin).app`).

Folks die `elektron-osx-sign` gebruiken om hun Electron app te coontwerpen zouden geen wijzigingen moeten aanbrengen in hun bouw logica. Als je codeert om je app te ondertekenen met aangepaste scripts, zorg er dan voor dat de drie nieuwe Helper-applicaties correct gecodeerd zijn.

Om je applicatie goed te kunnen verpakken met deze nieuwe helpers moet je `electron-packager@14.0.4` of hoger gebruiken.  Als u gebruik maakt van `electron-builder` moet u [dit probleem](https://github.com/electron-userland/electron-builder/issues/4104) volgen om ondersteuning voor deze nieuwe helpers te volgen.

## Breaking Changes

 * Deze release begint met het leggen van de basis voor een toekomstige vereiste dat native Node modules die in het renderer-proces worden geladen [N-API](https://nodejs.org/api/n-api.html) of [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). De redenen voor deze verandering zijn snellere prestaties, meer veiligheid en minder onderhoudsarbeid. Lees de volledige details met inbegrip van de voorgestelde tijdlijn in [dit probleem](https://github.com/electron/electron/issues/18397). Deze verandering zal naar verwachting voltooid worden in Electron v11.

 * `net.IncomingMessage` headers hebben [iets veranderd](https://github.com/electron/electron/pull/17517#issue-263752903) naar meer overeenkomsten met [Node. 'gedrag](https://nodejs.org/api/http.html#http_message_headers), met name met de waarde van `set-cookie` en hoe met dubbele headers wordt omgegaan. [#17517](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInFolder()` retourneert nu ongeldig en is een asynchrone oproep. [#17121](https://github.com/electron/electron/pull/17121)

 * Apps moeten nu expliciet een log pad instellen door de nieuwe functie `app.setAppLogPath()` aan te roepen voordat u `app.getPath('log')`. [#17841](https://github.com/electron/electron/pull/17841)

## Einde van de ondersteuning voor 3.x.y

Met ons [ondersteuningsbeleid](https://electronjs.org/docs/tutorial/support#supported-versions)is 3.x.y aan het einde van het leven gekomen. Ontwikkelaars en toepassingen worden aangemoedigd om te upgraden naar een nieuwere versie van Electron.

## App Feedback programma

We blijven ons [App Feedback Programma](https://electronjs.org/blog/app-feedback-program) gebruiken om te testen. Projecten die deelnemen aan dit programma en Electron betas testen op hun apps; en in ruil daarvoor hebben de nieuwe bugs die ze vinden prioriteit voor de stabiele vrijlating. Als u deel wilt nemen of meer informatie wilt ontvangen, [bekijk dan onze blogpost over het programma](https://electronjs.org/blog/app-feedback-program).

## Wat is volgende

In de korte termijn. je kan verwachten dat het team zich blijft concentreren op het bijhouden van de ontwikkeling van de belangrijkste onderdelen die Electron vormen, inclusief Chromium, Node en V8. Hoewel we ons ervoor hoeden om geen beloften te doen over releasedatums, ons plan is nieuwe grote versies van Electron vrij te geven met nieuwe versies van deze componenten ongeveer kwartaal. De [tentatieve 7.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) kaarten de belangrijkste data in de ontwikkelingslevenscyclus van Electron 7. Bekijk ook [ons versiedocument](https://electronjs.org/docs/tutorial/electron-versioning) voor meer gedetailleerde informatie over versiebeheer in Electron.

Voor informatie over geplande brekende wijzigingen in de aankomende versies van Electron, [zie onze geplande Breaking Changes doc](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
