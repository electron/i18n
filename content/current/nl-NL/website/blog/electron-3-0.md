---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

Het Electron team is enthousiast om aan te kondigen dat de eerste stabiele versie van Electron 3 nu beschikbaar is via [electronjs. rg](https://electronjs.org/) en via `npm installeer electron@latest`! Het zit jam-vol met upgrades, reparaties en nieuwe functies, en we kunnen niet wachten om te zien wat je met hen bouwt. Hieronder staan details over deze release, en we verwelkomen jouw feedback tijdens het verkennen.

---

## Proces vrijgeven

Zoals we bezig zijn met de ontwikkeling van `v3.0.`, we probeerden empirischer criteria te definiëren voor een stabiele release door de feedbackvooruitgang voor progressieve beta-releases te formaliseren. `v3.0.` zou niet mogelijk zijn geweest zonder ons [App Feedback Programma](https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md) partners, die in de bètacyclus vroegtijdige tests en feedback hebben gegeven. Dankzij Atlassian, Atom, Microsoft Teams, Oculus, OpenFin, Slack, Symphony, VS Code en andere programmaleden voor hun werk. Wil je deelnemen aan toekomstige wedstrijden, stuur dan een mail naar [info@electronjs.org](mailto:info@electronjs.org).

## Wijzigingen / Nieuwe functies

Grote bumpen voor verschillende belangrijke onderdelen van de toolketen van Electron, waaronder Chrome `v66.0.3359.181`</code> , Node `v10.2.0`en V8 `v6.346.23.`

* [[#12656](https://github.com/electron/electron/pull/12656)] functie: `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)] functie: `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)] functie: `process.getHeapStatistics()`
* [[#12485](https://github.com/electron/electron/pull/12485)] functie: `win.moveTop()` om venster z-order naar boven te verplaatsen
* [[#13110](https://github.com/electron/electron/pull/13110)] functie: TextField en Button API's
* [[#13068](https://github.com/electron/electron/pull/13068)] functie: netLog API voor dynamische logging controle
* [[#13539](https://github.com/electron/electron/pull/13539)] functie: schakel `webview in` in sandbox renderer
* [[#14118](https://github.com/electron/electron/pull/14118)] functie: `fs.readSync` werkt nu met enorme bestanden
* [[#14031](https://github.com/electron/electron/pull/14031)] functie: knooppunt `fs` wrappers om `fs.realpathSync.native` en `fs.realpath.native` beschikbaar te maken

## Ademhaling API wijzigingen

* [[#12362](https://github.com/electron/electron/pull/12362)] functie: updates voor menu-item order beheer
* [[#13050](https://github.com/electron/electron/pull/13050)] refactor: verwijderd gedocumenteerde verouderde API's
  * Zie [documenten](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30) voor meer details
* [[#12477](https://github.com/electron/electron/pull/12477)] refactor: verwijderd `did-get-response-details` en `did-get-redirect-request` events
* [[#12655](https://github.com/electron/electron/pull/12655)] functie: standaard om navigeren uit te schakelen op Slepen/drop
* [[#12993](https://github.com/electron/electron/pull/12993)] functie: Node `v4.x` of groter is vereist gebruik van de `elektron` npm module
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)] refactor: `NativeWindow`
* [[#11968](https://github.com/electron/electron/pull/11968)] refactor: `menu.popup()`
* [[#8953](https://github.com/electron/electron/pull/8953)] functie: gebruik geen JSON meer om het resultaat van `ipcRenderer.sendSync` te verzenden
* [[#13039](https://github.com/electron/electron/pull/13039)] functie: standaard negeren command line argumenten volgens een URL
* [[#12004](https://github.com/electron/electron/pull/12004)] herfactor: hernoem `api::window` naar `api::Browserwindow`
* [[#12679](https://github.com/electron/electron/pull/12679)] functie: visuele zoom nu standaard uitgeschakeld
* [[#12408](https://github.com/electron/electron/pull/12408)] refactor: hernoem app-command `media-play_pauzeer` naar `media-play-pauze`

### macOS

* [[#12093](https://github.com/electron/electron/pull/12093)] functie: meldingen van werkruimte ondersteuning
* [[#12496](https://github.com/electron/electron/pull/12496)] functie: `tray.setIgnoreDoubleClickEvents(negeren)` te negeren tray dubbelklikken op evenementen.
* [[#12281](https://github.com/electron/electron/pull/12281)] functie: muis forwarding functionaliteit op macOS
* [[#12714](https://github.com/electron/electron/pull/12714)] functie: schermvergrendeling / ontgrendel evenementen

### Windows

* [[#12879](https://github.com/electron/electron/pull/12879)] functie: DIP toegevoegd aan / vanuit scherm coördinaat conversies

**Nota Bene:** Overschakelen naar een oudere versie van Electron na het uitvoeren van deze versie zal vereisen dat u de gebruikersgegevensmap opruimt om oudere versies te voorkomen. Je kunt de gebruikersgegevensmap ophalen door `console.log(app.getPath("userData"))` te draaien of kijk [docs](https://electronjs.org/docs/api/app#appgetpathname) voor meer details.

## Bug fixes

* [[#13397](https://github.com/electron/electron/pull/13397)] fix: issue met `fs.statSyncNoException` het gooien van uitzonderingen
* [[#13476](https://github.com/electron/electron/pull/13476), [#13452](https://github.com/electron/electron/pull/13452)] fix: crash bij het laden van site met jquery
* [[#14092](https://github.com/electron/electron/pull/14092)] fix: crash in `net::ClientSocketHandle` destructor
* [[#14453](https://github.com/electron/electron/pull/14453)] fix: meld focus verandering direct en niet bij volgende tick

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] fix: issue waarbij bundels geselecteerd kunnen worden in `<input file="type">` open bestandsdialoog
* [[#12404](https://github.com/electron/electron/pull/12404)] fix: probleem met blokkeren van hoofdproces bij gebruik van async dialoog
* [[#12043](https://github.com/electron/electron/pull/12043)] fix: contextmenu klikken op callback
* [[#12527](https://github.com/electron/electron/pull/12527)] fix: gebeurtenis lek na hergebruik van touchbar item
* [[#12352](https://github.com/electron/electron/pull/12352)] fix: tray title crash
* [[#12327](https://github.com/electron/electron/pull/12327)] fix: niet-draggbare regio's
* [[#12809](https://github.com/electron/electron/pull/12809)] fix: om te voorkomen dat menu-update wordt geopend
* [[#13162](https://github.com/electron/electron/pull/13162)] fix: tray icoon grenzen die negatieve waarden niet toestaan
* [[#13085](https://github.com/electron/electron/pull/13085)] fix: tray title niet omkeren wanneer gemarkeerd
* [[#12196](https://github.com/electron/electron/pull/12196)] fix: Mac bouwen als `enable_run_as_node==vals`
* [[#12157](https://github.com/electron/electron/pull/12157)] fix: extra problemen op frameless windows met levendigheid
* [[#13326](https://github.com/electron/electron/pull/13326)] fix: om mac protocol op none in te stellen na `app.removeAsDefaultProtocolClient` aan te roepen
* [[#13530](https://github.com/electron/electron/pull/13530)] fix: onjuist gebruik van privé API's in MAS build
* [[#13517](https://github.com/electron/electron/pull/13517)] fix: `tray.setContextMenu` crash
* [[#14205](https://github.com/electron/electron/pull/14205)] fix: het indrukken van escape op een dialoogvenster sluit het nu zelfs als `defaultId` is ingesteld

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)] fix: `BrowserWindow.focus()` voor offscreen vensters

## Andere notities

* PDF-Viewer werkt momenteel niet maar is aan het werk en zal binnenkort opnieuw functioneel zijn
* `TextField` en `knop` API's zijn experimenteel en zijn standaard uitgeschakeld
  * Ze kunnen worden ingeschakeld met de `enable_view_api` bouw vlag

# Wat is volgende

Het Electron team blijft werken aan het definiëren van onze processen voor snellere en soepelere upgrades als we uiteindelijk streven naar het behoud van gelijkheid met de ontwikkelingscadences van Chromium, Node, en V8.
