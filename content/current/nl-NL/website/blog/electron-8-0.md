---
title: Electron 8.0.0
author:
  - jkleinsc
  - sofianguy
date: '2020-02-04'
---

Electron 8.0.0 is vrijgegeven! Het bevat upgrades naar Chromium `80`, V8 `8.0`en Node.js `12.13.0`. We hebben Chrome's ingebouwde spellingchecker toegevoegd, en nog veel meer!

---

Het Electron team is enthousiast over de release van Electron 8.0.0! Je kunt het installeren met npm via `npm install electron@latest` of via onze [releases website](https://electronjs.org/releases/stable). De versie wordt verpakt met upgrades, reparaties en nieuwe functies. We kunnen niet wachten om te zien wat je met hen bouwt! Ga door met het lezen van details over deze release en deel alle feedback die je hebt!

## Opmerkelijke wijzigingen

### Stack Wijzigingen
* Chromium `80.3987.86`
    * [Nieuw in Chrome 79](https://developers.google.com/web/updates/2019/12/nic79)
    * [Nieuw in Chrome 80](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [Node 12.13.0 blogpost](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [V8 7.9 blogpost](https://v8.dev/blog/v8-release-79)
    * [V8 8.0 blogpost](https://v8.dev/blog/v8-release-80)

### Kenmerken markeren
* Geïnstalleerd gebruik van Chrome's ingebouwde spellingcontrole functie. Zie meer details in [#20692](https://github.com/electron/electron/pull/20692) en [#21266](https://github.com/electron/electron/pull/21266).
* IPC-communicatie maakt nu gebruik van v8 gestructureerde Clone Algorithm. Dit is sneller, featureer, en minder verrassend dan de bestaande logica, en zorgt voor een prestatieverhoging van 2x voor grote buffers en complexe objecten. Latentie van kleine berichten is niet erg beïnvloed. Zie meer details in [#20214](https://github.com/electron/electron/pull/20214).

Zie de [8.0.0 release notes](https://github.com/electron/electron/releases/tag/v8.0.0) voor een volledige lijst met nieuwe functies en wijzigingen.

## Breaking Changes

* Toon de naam van de module in de waarschuwing voor context-bewust modules. [#21952](https://github.com/electron/electron/pull/21952)
    * Dit wordt voortgezet voor een toekomstige vereiste dat native Node modules geladen in het renderer-proces [N-API](https://nodejs.org/api/n-api.html) of [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons) zijn. Volledige info en voorgestelde tijdlijn is gedetailleerd in [dit probleem](https://github.com/electron/electron/issues/18397).
* Waarden die via IPC worden verzonden zijn nu geserialiseerd met gestructureerd kloonalgoritme.  [#20214](https://github.com/electron/electron/pull/20214)
* Offscreen rendering is momenteel uitgeschakeld vanwege het ontbreken van een onderhouder om aan deze functie te werken.  Het brak tijdens de Chromium upgrade en is daarna uitgeschakeld. [#20772](https://github.com/electron/electron/issues/20772)

Meer informatie over deze en toekomstige wijzigingen is te vinden op de [geplande Breaking Changes](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) pagina.

## API wijzigingen
* `app` API wijzigingen:
    * Toegevoegd `app.getApplicationNameForProtocol(url)`. [#20399](https://github.com/electron/electron/pull/20399)
    * Toegevoegde `app.showAboutPanel()` en `app.setAboutPanelOptions(options)` ondersteuning op Windows. [#19420](https://github.com/electron/electron/pull/19420)
* `BrowserWindow` API wijzigingen:
    * Documenten bijgewerkt om te weten dat BrowserWindow opties `hasShadow` beschikbaar is op alle platforms [#20038](https://github.com/electron/electron/pull/20038)
    * `trafficLightPosition` optie toegevoegd aan BrowserWindow opties om aangepaste positionering voor verkeerslichtknoppen toe te staan. [#21781](https://github.com/electron/electron/pull/21781)
    * Toegevoegd `toegankelijke titel` optie aan het Browservenster voor het instellen van de toegankelijke venster titel [#19698](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` kan nu null [#19983](https://github.com/electron/electron/pull/19983) retourneren
    * Toegevoegd `BrowserWindow.getMediaSourceId()` en `BrowserWindow.moveAbove(mediaSourceId)`. [#18926](https://github.com/electron/electron/pull/18926)
    * Toegevoegde ondersteuning voor `zet` gebeurtenis op macOS. [#19641](https://github.com/electron/electron/pull/19641)
* Eerder gedocumenteerd `crashReporter.getCrashesDirectory()`. [#20417](https://github.com/electron/electron/pull/20417)
* `dialoogvenster` API wijzigingen:
    * eigenschap `dontAddToRecent` toegevoegd aan `dialoogvenster.showOpenDialog` en `dialoogvenster. howOpenDialogSync` om te voorkomen dat documenten worden toegevoegd aan recente documenten in Windows in open dialogen. [#19669](https://github.com/electron/electron/pull/19669)
    * Eigenschappen aanpassen toegevoegd aan `dialoogvenster.showSaveDialoog` en `dialoogvenster.showSaveDialogSync`. [#19672](https://github.com/electron/electron/pull/19672)
* `Notificatie` API wijzigingen:
    * Toegevoegd `timeoutType` optie om Linux/Windows gebruikers in te stellen het type notificatie timeout. [#20153](https://github.com/electron/electron/pull/20153)
    * Toegevoegd `urgentie`  optie om urgentie in te stellen voor Linux kennisgevingen. [#20152](https://github.com/electron/electron/pull/20152)
* `sessie` API wijzigingen:
    * Documentatie over `session.setProxy(config)` en `session.setCertificateVerify(proc)` om optionele opties te noteren. [#19604](https://github.com/electron/electron/pull/19604)
    * Toegevoegd `session.downloadURL(url)` om downloads te activeren zonder een BrowserWindow. [#19889](https://github.com/electron/electron/pull/19889)
    * Toegevoegde ondersteuning voor HTTP-preconnect bronhints via `session.preconnect(options)` en de `preconnect` event. [#18671](http://github.com/electron/electron/pull/18671)
    * Toegevoegd `session.addWordToSpellCheckerDictionary` om aangepaste woorden toe te staan in het woordenboek [#21297](http://github.com/electron/electron/pull/21297)
* Optie toegevoegd aan `shell.moveItemToTrash(fullPath[, deleteOnFail])` op macOS om aan te geven wat er gebeurt wanneer moveItemToTrash mislukt. [#19700](https://github.com/electron/electron/pull/19700)
* `systemPreferences` API wijzigingen:
    * `systemPreferences.getColor(color)` documentatie voor macOS bijgewerkt. [#20611](https://github.com/electron/electron/pull/20611)
    * Toegevoegd `scherm` mediatype aan `systemPreferences.getMediaAccessStatus()`. [#20764](https://github.com/electron/electron/pull/20764)
* Toegevoegd `nativeTheme.themeSource` om apps Chromium en de keuze van het besturingsthema te laten overschrijven. [#19960](https://github.com/electron/electron/pull/19960)
* TouchBar API wijzigingen:
    * Voegt `toegankelijkheidLabel` eigenschap toe aan `TouchBarButton` en `TouchBarLabel` om de TouchBarButton/TouchBarLabel toegankelijkheid te verbeteren. [#20454](https://github.com/electron/electron/pull/20454)
    * Bijgewerkte TouchBar gerelateerde documentatie [#19444](https://github.com/electron/electron/pull/19444)
* `tray` API wijzigingen:
    * Nieuwe opties toegevoegd aan `tray.displayBalloon()`: `iconType`, `largeIcon`, `noSound` en `respectQuietTime`. [#19544](https://github.com/electron/electron/pull/19544)
    * Tray.removeBalloon(), die een reeds weergegeven ballon melding verwijdert. [#19547](https://github.com/electron/electron/pull/19547)
    * Tray.focus(), die focus geeft op het kennisgevingsgebied in de taakbalk. functie: voeg tray.focus() [#19548](https://github.com/electron/electron/pull/19548) toe
* `webContents` API wijzigingen:
    * Toegevoegd `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` om executeJavaScriptInIsolatedWorld bloot te stellen aan de webContents API. [#21190](https://github.com/electron/electron/pull/21190)
    * Methoden toegevoegd voor het vastleggen van een verborgen webcontent. [#21679](https://github.com/electron/electron/pull/21679)
    * Opties toegevoegd aan `webContents.print([options], [callback])` om de aanpassing van de koppen en voetteksten van de afdrukpagina mogelijk te maken. [#19688](https://github.com/electron/electron/pull/19688)
    * Mogelijkheid om specifieke gedeelde werknemers te inspecteren via `webContents.getAllSharedWorkers()` en `webContents.inspectSharedWorkerById(workerId)`. [#20389](https://github.com/electron/electron/pull/20389)
    * Toegevoegde de ondersteuning van `fitToPageEnabled` en `scaleFactor` opties in WebContents.printToPDF(). [#20436](https://github.com/electron/electron/pull/20436)
* `webview.printToPDF` documentatie bijgewerkt om het retourtype aan te geven is Uint8Array. [#20505](https://github.com/electron/electron/pull/20505)

### Afgekeurde API's
De volgende API's zijn nu verouderd:
* De niet-functionele `visibleOnFullScreen` optie binnen `BrowserWindow.setVisibleOnAllWorkspaces` voorafgaand aan het verwijderen ervan in de volgende grote versie van de release is verouderd. [#21732](https://github.com/electron/electron/pull/21732)
* Verouderd `alternate-selected-control-text` op `systemPreferences.getColor(color)` voor macOS. [#20611](https://github.com/electron/electron/pull/20611)
* Verouderd `setLayoutZoomLevelLimieten` op `webcontent`, `webFrame`en `<webview> Tag` omdat Chromium deze mogelijkheid heeft verwijderd. [#21296](https://github.com/electron/electron/pull/21296)
* De standaardwaarde van `false` voor `app.allowRendererProcessReuse` wordt nu niet meer ondersteund. [#21287](https://github.com/electron/electron/pull/21287)
* Verouderd `<webview>.getWebContents()` omdat het afhankelijk is van de externe module. [#20726](https://github.com/electron/electron/pull/20726)

## Einde van de ondersteuning voor 5.x.y

Electron 5.x.y heeft eind van ondersteuning bereikt als volgens het ondersteuningsbeleid [van het project](https://electronjs.org/docs/tutorial/support#supported-versions). Ontwikkelaars en toepassingen worden aangemoedigd om te upgraden naar een nieuwere versie van Electron.

## App Feedback programma

We blijven ons [App Feedback Programma](https://electronjs.org/blog/app-feedback-program) gebruiken om te testen. Projecten die deelnemen aan dit programma en Electron betas testen op hun apps; en in ruil daarvoor hebben de nieuwe bugs die ze vinden prioriteit voor de stabiele vrijlating. Als u deel wilt nemen of meer informatie wilt ontvangen, [bekijk dan onze blogpost over het programma](https://electronjs.org/blog/app-feedback-program).

## Wat is volgende

In de korte termijn. je kan verwachten dat het team zich blijft concentreren op het bijhouden van de ontwikkeling van de belangrijkste onderdelen die Electron vormen, inclusief Chromium, Node en V8. Hoewel we ons ervoor hoeden om geen beloften te doen over releasedatums, ons plan is nieuwe grote versies van Electron vrij te geven met nieuwe versies van deze componenten ongeveer kwartaal. De [tentatieve 9.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) kaarten de belangrijkste data in de ontwikkelingslevenscyclus van Electron 9. Bekijk ook [ons versiedocument](https://electronjs.org/docs/tutorial/electron-versioning) voor meer gedetailleerde informatie over versiebeheer in Electron.

Voor informatie over geplande brekende wijzigingen in de aankomende versies van Electron, [zie onze geplande Breaking Changes doc](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Afzetting van `externe` Module (Vanaf in Electron 9)
Vanwege ernstige beveiligingsverplichtingen beginnen we met plannen om de [`remote` module](https://www.electronjs.org/docs/api/remote) te ontstemmen vanaf Electron 9. U kunt [dit probleem](https://github.com/electron/electron/issues/21408) lezen en volgen die onze redenen hiervoor aangeeft en een voorgestelde tijdlijn voor afwikkeling bevat.
