---
title: Electron 9.0.0
author:
  - sofianguy
  - VerteDinde
date: '2020-05-19'
---

Electron 9.0.0 is vrijgegeven! Het bevat upgrades naar Chromium `83`, V8 `8.3`en Node.js `12.14`. We hebben een aantal nieuwe API integraties toegevoegd voor onze spellingsfunctie, PDF-viewer ingeschakeld en nog veel meer!

---

Het Electron team is enthousiast over de release van Electron 9.0.0! Je kunt het installeren met npm via `npm install electron@latest` of via onze [releases website](https://electronjs.org/releases/stable). De versie wordt verpakt met upgrades, reparaties en nieuwe functies. We kunnen niet wachten om te zien wat je met hen bouwt! Ga door met het lezen van details over deze release en deel alle feedback die je hebt!

## Opmerkelijke wijzigingen

### Stack Wijzigingen

* Chromium `83.0.4103.64`
    * [Nieuw in Chrome 81](https://developers.google.com/web/updates/2020/04/nic81)
    * [Chrome 82 is overgeslagen](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Nieuw in Chrome 83](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [Node 12.14.1 blogpost](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [V8 8.1 blogpost](https://v8.dev/blog/v8-release-81)
    * [V8 8.3 blogpost](https://v8.dev/blog/v8-release-83)

### Kenmerken markeren

* Meerdere verbeteringen van de spellingcontrole functie. Zie meer details in [#22128](https://github.com/electron/electron/pull/22128) en [#22368](https://github.com/electron/electron/pull/22368).
* Verbeterde efficiëntie van de venster-handler op Linux. [#23260](https://github.com/electron/electron/pull/23260).
* PDF viewer inschakelen [#22131](https://github.com/electron/electron/pull/22131).

Zie de [9.0.0 release notes](https://github.com/electron/electron/releases/tag/v9.0.0) voor een volledige lijst met nieuwe functies en wijzigingen.

## Breaking Changes

* Afscheidingswaarschuwing bij gebruik van `afstandsbediening` zonder `Inschakelen RemoteModule: waar`. [#21546](https://github.com/electron/electron/pull/21546)
    * Dit is de eerste stap in onze plannen voor het afbreken van de `externe` module en het verplaatsen naar gebruikersnaam. U kunt [dit probleem](https://github.com/electron/electron/issues/21408) lezen en volgen die onze redenen hiervoor aangeeft en een voorgestelde tijdlijn voor afwikkeling bevat.
* Stel `app.enableRendererProcessReuse` naar standaard waar. [#22336](https://github.com/electron/electron/pull/22336)
    * Dit wordt voortgezet voor een toekomstige vereiste dat native Node modules geladen in het renderer-proces [N-API](https://nodejs.org/api/n-api.html) of [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons) zijn. Volledige info en voorgestelde tijdlijn is gedetailleerd in [dit probleem](https://github.com/electron/electron/issues/18397).
* Het verzenden van niet-JavaScript-objecten over IPC geeft nu een uitzondering. [#21560](https://github.com/electron/electron/pull/21560)
    * Dit gedrag is afgeschreven in Electron 8.0. In Electron 9.0 is het oude serialisatiealgoritme verwijderd, en het versturen van dergelijke niet-serialiseerbare objecten zal nu een "object niet gekloond" fout gooien.

Meer informatie over deze en toekomstige wijzigingen is te vinden op de [geplande Breaking Changes](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) pagina.

## API wijzigingen

* `shell` API wijzigingen:
   * De `shell.openItem` API is vervangen door een asynchrone `shell.openPath API`. [voorstel](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `sessie`API wijzigingen:
   * Toegevoegd `session.listWordsFromSpellCheckerDictionary` API om aangepaste woorden in het woordenboek te tonen. [#22128](https://github.com/electron/electron/pull/22128)
   * Toegevoegd `session.removeWordFromSpellCheckerDictionary` API om aangepaste woorden te verwijderen in het woordenboek. [#22368](https://github.com/electron/electron/pull/22368)
   * Toegevoegd `session.serviceWorkerContext` API om toegang te krijgen tot de basisinformatie van de service worker en console-logs van servicemedewerkers. [#22313](https://github.com/electron/electron/pull/22313)
* `app` API wijzigingen:
   * Een nieuwe force parameter toegevoegd aan `app.focus()` op macOS om apps krachtig de focus te laten overnemen. [#23447](https://github.com/electron/electron/pull/23447)
* `BrowserWindow` API wijzigingen:
   * Toegevoegde ondersteuning voor toegang tot onroerend goed voor sommige getter/setter paren op `BrowserWindow`. [#23208](https://github.com/electron/electron/pull/23208)

### Afgekeurde API's

De volgende API's zijn nu verouderd of verwijderd:

* `shell.openItem` API is nu gedeprecieerd en vervangen door een asynchrone `shell.openPath API`.
* `<webview>.getWebContents`, die niet meer werd ondersteund in Electron 8.0, wordt nu verwijderd.
* `webFrame.setLayoutZoomLevelLimits`, die verouderd was in Electron 8.0, is nu verwijderd.

## Einde van de ondersteuning voor 6.x.y

Electron 6.x.y heeft einde-of-support bereikt volgens het ondersteuningsbeleid [van het project](https://electronjs.org/docs/tutorial/support#supported-versions). Ontwikkelaars en toepassingen worden aangemoedigd om te upgraden naar een nieuwere versie van Electron.

## Wat is volgende

In de korte termijn. je kan verwachten dat het team zich blijft concentreren op het bijhouden van de ontwikkeling van de belangrijkste onderdelen die Electron vormen, inclusief Chromium, Node en V8. Hoewel we ons ervoor hoeden om geen beloften te doen over releasedatums, ons plan is nieuwe grote versies van Electron vrij te geven met nieuwe versies van deze componenten ongeveer kwartaal. De [tentatieve 10.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) kaarten de belangrijkste data in de ontwikkelingslevenscyclus van Electron 10.0. Bekijk ook [ons versiedocument](https://electronjs.org/docs/tutorial/electron-versioning) voor meer gedetailleerde informatie over versiebeheer in Electron.

Voor informatie over geplande brekende wijzigingen in de aankomende versies van Electron, [zie onze geplande Breaking Changes doc](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Wijzig de standaard van `contextIsolatie` van `false` naar `true` (beginnend in Electron 10)

Zonder contextIsolatie kan elke code die wordt uitgevoerd in een renderer proces gemakkelijk bereiken in Electron internals of het preload script van een app. Die code kan dan bevoorrechte acties uitvoeren die Electron beperkt wil houden.

Het wijzigen van deze standaard verbetert de standaardbeveiliging van Electron apps, zodat apps bewust moeten kiezen voor onveilig gedrag. Electron zal de huidige standaard van `contextIsolatie` in Electron 10 afschrijven. en wijzig naar de nieuwe standaard (`true`) in Electron 12.0.

Voor meer informatie over `contextIsolatie`, hoe je het gemakkelijk kunt inschakelen en zijn veiligheidsvoordelen heeft, zie ons toegewijde [Context Isolation Document](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md).
