---
title: Electron 10.0.0
author:
  - VerteDinde
  - sofianguy
date: '2020-08-25'
---

Electron 10.0.0 is vrijgegeven! Het bevat upgrades naar Chromium `85`, V8 `8.5`en Node.js `12.16`. We hebben meerdere nieuwe API-integraties en verbeteringen toegevoegd. Lees hieronder voor meer details!

---

Het Electron team is enthousiast over de release van Electron 10.0.0! Je kunt het installeren met npm via `npm install electron@latest` of via onze [releases website](https://electronjs.org/releases/stable). De versie wordt verpakt met upgrades, reparaties en nieuwe functies.

In de Electron 10 release hebben we ook een wijziging aangebracht in onze release notes . Om het makkelijker te maken om te vertellen wat er nieuw is in Electron 10 en wat er mogelijk veranderd is tussen Electron 10 en verleden releases, We omvatten nu ook veranderingen die zijn ingevoerd bij Electron 10, maar teruggestuurd naar eerdere releases. We hopen dat dit het gemakkelijker maakt voor apps om nieuwe functies en bugfixes te vinden bij het upgraden van Electron.

We kunnen niet wachten om te zien wat je met hen bouwt! Ga door met het lezen van details over deze release en deel alle feedback die je hebt!

## Opmerkelijke wijzigingen

### Stack Wijzigingen

* Chromium `85.0.4183.84`
    * [Nieuw in Chrome 84](https://developers.google.com/web/updates/2020/07/nic84)
    * [Nieuw in Chrome 85](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [Node 12.16,3 blogpost](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [V8 8.4 blogpost](https://v8.dev/blog/v8-release-84)
    * [V8 8.5 blogpost](https://v8.dev/blog/v8-release-85)

### Kenmerken markeren

* `contents.getBackgroundThrottling()` methode en `contents.backgroundThrottling` eigenschap toegevoegd. [#21036]
* De `desktopCapcher` module in het hoofdproces is blootgesteld. [#23548](https://github.com/electron/electron/pull/23548)
* Kan nu controleren of een bepaalde `sessie` aanhoudt door de `ses.isPersistent()` API aan te roepen. [#22622](https://github.com/electron/electron/pull/22622)
* Netwerkproblemen oplossen die beletten dat RTC gesprekken werden aangesloten door wijzigingen in het IP-adres van het netwerk en ICE. (Chromium issue 1113227). [#24998](https://github.com/electron/electron/pull/24998)

Zie de [10.0.0 release notes](https://github.com/electron/electron/releases/tag/v10.0.0) voor een volledige lijst met nieuwe functies en wijzigingen.

## Breaking Changes

* De standaardwaarde van `enableRemoteModule` veranderd naar `false`. [#22091](https://github.com/electron/electron/pull/22091)
    * Dit is een onderdeel van onze plannen om de `externe` module af te breken en naar gebruiker te verplaatsen. U kunt [dit probleem](https://github.com/electron/electron/issues/21408) lezen en volgen die onze redenen hiervoor aangeeft en een voorgestelde tijdlijn voor afwikkeling bevat.
* De standaard waarde van `app.allowRendererProcessReuse` naar `true`. [#22336](https://github.com/electron/electron/pull/22336) (Ook in [Electron 9](https://github.com/electron/electron/pull/22401))
   * Dit voorkomt het laden van niet-context-bewust inheemse modules in renderer-processen.
   * U kunt [dit probleem](https://github.com/electron/electron/issues/18397) lezen en volgen die onze redenen hiervoor aangeeft en een voorgestelde tijdlijn voor afwikkeling bevat.
* De positionering van vensterknoppen op macOS is opgelost wanneer de lokalisatie van de OS is ingesteld op een RTL-taal (zoals het Arabisch of Hebrew). Framelloze venster-apps moeten rekening houden met deze wijziging tijdens het stylen van hun vensters. [#22016](https://github.com/electron/electron/pull/22016)

Meer informatie over deze en toekomstige wijzigingen is te vinden op de [geplande Breaking Changes](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) pagina.

## API wijzigingen

* Sessie: Kan nu controleren of een bepaalde `sessie` persistent is door de `ses.isPersistent()` API aan te roepen. [#22622](https://github.com/electron/electron/pull/22622)
* Inhoud toegevoegd: `contents.getBackgroundThrottling()` methode en `contents.backgroundThrottling` property. [#21036](https://github.com/electron/electron/pull/21036)

### Afgekeurde API's

De volgende API's zijn nu verouderd of verwijderd:

* De verouderde eigenschap `huidig LoggingPad` van `netlog` verwijderd. Bovendien, `netLog.stopLogging` geeft niet langer het pad terug naar de opgenomen log. [#22732](https://github.com/electron/electron/pull/22732)
* Niet-gecomprimeerde crashuploads in `crashReporter`. [#23598](https://github.com/electron/electron/pull/23598)

## Einde van de ondersteuning voor 7.x.y

Electron 7.x.y heeft eind van ondersteuning bereikt als volgens het [ondersteuningsbeleid](https://electronjs.org/docs/tutorial/support#supported-versions) van het project. Ontwikkelaars en toepassingen worden aangemoedigd om te upgraden naar een nieuwere versie van Electron.

## Wat is volgende

In de korte termijn. je kan verwachten dat het team zich blijft concentreren op het bijhouden van de ontwikkeling van de belangrijkste onderdelen die Electron vormen, inclusief Chromium, Node en V8. Hoewel we ons ervoor hoeden om geen beloften te doen over releasedatums, ons plan is nieuwe grote versies van Electron vrij te geven met nieuwe versies van deze componenten ongeveer kwartaal. De [tentatieve 11.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) kaarten de belangrijkste data in de ontwikkelingslevenscyclus van Electron 11.0. Bekijk ook [ons versiedocument](https://electronjs.org/docs/tutorial/electron-versioning) voor meer gedetailleerde informatie over versiebeheer in Electron.

Voor informatie over geplande brekende wijzigingen in de aankomende versies van Electron, [zie onze geplande Breaking Changes doc](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Voortdurend werk voor de afzetting van `externe` Module (in Electron 11)
We zijn begonnen met het verwijderen van de externe module in [Electron 9](https://www.electronjs.org/blog/electron-9-0) en we gaan door met het verwijderen van de `externe` module. In Electron 11 zijn we van plan om de refactor te blijven gebruiken voor het implementeren van [WeakRef](https://v8.dev/features/weak-references) zoals we hebben gedaan in Electron 10. Lees en volg [dit probleem](https://github.com/electron/electron/issues/21408) voor de volledige plannen en details voor deprecation.

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 12)
_Edit: Originally, this blog post stated that we would disable renderer process reuse in Electron 11. Disabling renderer process reuse has now been pushed to Electron 12._

From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 12. Read [this issue](https://github.com/electron/electron/issues/18397) for full details including the proposed timeline.
