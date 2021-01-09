---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

Na meer dan vier maanden ontwikkeling, acht beta-releases en wereldwijd testen met de gefaseerde rollouts van veel apps, de vrijlating van Electron 2. .0 is nu beschikbaar vanaf [electronjs.org](https://electronjs.org/).

---

## Proces vrijgeven

Vanaf 2.0.0 volgen de releases van Electron, [semantische versie](https://electronjs.org/blog/electron-2-semantic-boogaloo). Dit betekent dat de grote versie vaker zal bumpen en meestal een belangrijke update naar Chromium. Patch releases moeten stabieler zijn omdat ze alleen bug fixes met hoge prioriteit bevatten.

Electron 2.0.0 betekent ook een verbetering van hoe Electron gestabiliseerd is voor een grote release. Verscheidene grote schaal van Electron apps bevatten 2.0.0 betas in gefaseerde rollouts, wat de beste feedback loop biedt die Electron ooit had voor een beta-serie.

## Wijzigingen / Nieuwe functies

 * De belangrijkste onderdelen van de toolketen van Electron, waaronder Chrome 61, Node 8.9.3, V8 6.1.534.41, GTK+ 3 op Linux, hebben spellingcontrole en Squirr geüpdatet.
 * [In-app aankopen](https://electronjs.org/blog/in-app-purchases) worden nu ondersteund op MacOS. [#11292](https://github.com/electron/electron/pull/11292)
 * Nieuwe API voor het laden van bestanden. [#11565](https://github.com/electron/electron/pull/11565)
 * Nieuwe API om een venster in- of uit te schakelen. [#11832](https://github.com/electron/electron/pull/11832)
 * New API app.setLocale(). [#11469](https://github.com/electron/electron/pull/11469)
 * Nieuwe ondersteuning voor het loggen van IPC-berichten. [#11880](https://github.com/electron/electron/pull/11880)
 * Nieuwe menu-gebeurtenissen. [#11754](https://github.com/electron/electron/pull/11754)
 * Voeg een `shutdown` event toe aan powerMonitor. [#11417](https://github.com/electron/electron/pull/11417)
 * Voeg de optie `affiniteit` toe voor het verzamelen van meerdere BrowserWindows in één proces. [#11501](https://github.com/electron/electron/pull/11501)
 * Voeg de mogelijkheid voor saveDialoog toe om beschikbare extensies te tonen. [#11873](https://github.com/electron/electron/pull/11873)
 * Ondersteuning voor aanvullende meldingsacties [#11647](https://github.com/electron/electron/pull/11647)
 * De mogelijkheid om macOS notificatie sluitknop te gebruiken. [#11654](https://github.com/electron/electron/pull/11654)
 * Voorwaarde toevoegen voor menu.popup(venster, callback)
 * Geheugen verbeteringen in touchbar items. [#12527](https://github.com/electron/electron/pull/12527)
 * Verbeterde checklist voor beveiligingsaanbevelingen.
 * Toevoegen App-Scoped Security scoped Bladwijzers. [#11711](https://github.com/electron/electron/pull/11711)
 * Voeg de mogelijkheid toe om willekeurige argumenten in een renderer proces in te stellen. [#11850](https://github.com/electron/electron/pull/11850)
 * Voeg accessoire weergave toe voor format picker. [#11873](https://github.com/electron/electron/pull/11873)
 * Vast netwerk delegeren van rassen. [#12053](https://github.com/electron/electron/pull/12053)
 * Plaats ondersteuning voor de `mips64el` arch op Linux. Electron vereist de C+14 toolchain, die niet beschikbaar was voor die arch op het moment van de release. We hopen in de toekomst opnieuw steun te kunnen geven.

## Ademhaling API wijzigingen

 * [verouderde API's](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md), waaronder:
   * Wijzigde `menu.popup` handtekening. [#11968](https://github.com/electron/electron/pull/11968)
   * Verouderde verouderde `crashReporter.setExtraParameter` [#11972](https://github.com/electron/electron/pull/11972)
   * Verouderde `webContents.setZoomLevelLimieten` en `webFrame.setZoomLevelLimieten` verwijderd. [#11974](https://github.com/electron/electron/pull/11974)
   * Verouderde methodes `klembord` verwijderd. [#11973](https://github.com/electron/electron/pull/11973)
   * Steun voor boolean parameters verwijderd voor `tray.setHighlightMode`. [#11981](https://github.com/electron/electron/pull/11981)

## Bug fixes

 * Gewijzigd om ervoor te zorgen dat `webContents.isOffscreen()` altijd beschikbaar is. [#12531](https://github.com/electron/electron/pull/12531)
 * Opgelost `BrowserWindow.getFocusedWindow()` wanneer DevTools losgekoppeld en gefocust is. [#12554](https://github.com/electron/electron/pull/12554)
 * Vast voorladen in sandboxed render niet als het voorlaadpad speciale tekens bevat. [#12643](https://github.com/electron/electron/pull/12643)
 * Corrigeer de standaard voor het toestaan van RunningInsecureContent als per document. [#12629](https://github.com/electron/electron/pull/12629)
 * Vaste transparantie op nativeImage. [#12683](https://github.com/electron/electron/pull/12683)
 * Probleem opgelost met `Menu.buildFromTemplate`. [#12703](https://github.com/electron/electron/pull/12703)
 * Bevestigde menu.popup opties zijn objecten. [#12330](https://github.com/electron/electron/pull/12330)
 * Een race conditie verwijderd tussen het creëren van nieuw proces en context vrijlating. [#12361](https://github.com/electron/electron/pull/12361)
 * Draagbare regio's bijwerken bij het veranderen van BrowserView. [#12370](https://github.com/electron/electron/pull/12370)
 * Vaste menubalk schakelaar Alt-toets detectie bij focus. [#12235](https://github.com/electron/electron/pull/12235)
 * Onjuiste waarschuwingen in webviews opgelost. [#12236](https://github.com/electron/electron/pull/12236)
 * Overerving van de 'show' optie van bovenliggende ramen opgelost. [#122444](https://github.com/electron/electron/pull/122444)
 * Zorg ervoor dat `getLastCrashReport()` eigenlijk het laatste crashrapport is. [#12255](https://github.com/electron/electron/pull/12255)
 * Vaste eis op het pad van netwerkdelen. [#12287](https://github.com/electron/electron/pull/12287)
 * Vaste context menu klik op callback. [#12170](https://github.com/electron/electron/pull/12170)
 * Popup menu-positie opgelost. [#12181](https://github.com/electron/electron/pull/12181)
 * Verbeterde libuv lus opschonen. [#11465](https://github.com/electron/electron/pull/11465)
 * Vaste `hexColorDWORDToRGBA` voor transparante kleuren. [#11557](https://github.com/electron/electron/pull/11557)
 * Vaste nul-pointer dereferentie met getWebPreferences api. [#12245](https://github.com/electron/electron/pull/12245)
 * Fix een cyclische verwijzing in menu-delegatie. [#11967](https://github.com/electron/electron/pull/11967)
 * Vaste protocol filtering van net.request. [#11657](https://github.com/electron/electron/pull/11657)
 * WebFrame.setVisualZoomLevelLimits stelt nu user-agent scale constraints in [#12510](https://github.com/electron/electron/pull/12510)
 * Stel de juiste standaardinstellingen in voor webview opties. [#12292](https://github.com/electron/electron/pull/12292)
 * Verbeterde vibrancy ondersteuning. [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * Tijdsprobleem opgelost in singleton fixture.
 * Vaste defecte productie cache in NotifierSupportsActions()
 * Gemaakt van MenuItem rollen camelCase-compatibel. [#11532](https://github.com/electron/electron/pull/11532)
 * Verbeterde aanraakbalk updates. [#11812](https://github.com/electron/electron/pull/11812), [#11761](https://github.com/electron/electron/pull/11761).
 * Extra menu scheidingstekens verwijderd. [#11827](https://github.com/electron/electron/pull/11827)
 * Opgeloste Bluetooth kiezer bug. Sluit [#11399](https://github.com/electron/electron/pull/11399) af.
 * Label van menu-item in-/uitschakelen macos opgelost. [#11633](https://github.com/electron/electron/pull/11633)
 * Verbeterde tooltip verbergen wanneer een venster is gedeactiveerd. [#11644](https://github.com/electron/electron/pull/11644)
 * Vermigreerde verouderde web-view methode. [#11798](https://github.com/electron/electron/pull/11798)
 * Vaste sluiting van een venster geopend vanuit een browserweergave. [#11799](https://github.com/electron/electron/pull/11799)
 * Opgeloste Bluetooth kiezer bug. [#11492](https://github.com/electron/electron/pull/11492)
 * Bijgewerkt om Taakplanner te gebruiken voor app.getFilePictogram API. [#11595](https://github.com/electron/electron/pull/11595)
 * Gewijzigd naar vuur `console-bericht` gebeurtenis, zelfs bij het weergeven van het scherm. [#11921](https://github.com/electron/electron/pull/11921)
 * Vaste download van aangepaste protocollen met `WebContents.downloadURL`. [#11804](https://github.com/electron/electron/pull/11804)
 * Vaste transparante vensters die de transparantie verliezen wanneer devtools loslaten. [#11956](https://github.com/electron/electron/pull/11956)
 * Electron apps hebben een herstart geannuleerd of uitgeschakeld. [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * Vaste gebeurtenis lek bij hergebruik van touchbar item. [#12624](https://github.com/electron/electron/pull/12624)
 * Tray accentueert vast in donkermodus. [#12398](https://github.com/electron/electron/pull/12398)
 * Blokkerende hoofdproces voor async dialoogvenster opgelost. [#12407](https://github.com/electron/electron/pull/12407)
 * `setTitle` tray crash opgelost. [#12356](https://github.com/electron/electron/pull/12356)
 * Crash opgelost tijdens het instellen van dockmenu. [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * Betere Linux bureaublad meldingen. [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * Betere GTK+ themaondersteuning voor menu's. [#12331](https://github.com/electron/electron/pull/12331)
 * Sluit gras af op linux. [#12139](https://github.com/electron/electron/pull/12139)
 * Gebruik de naam van de app als de standaard tooltip van de icoon. [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * Ondersteuning voor Visual Studio 2017 toegevoegd. [#11656](https://github.com/electron/electron/pull/11656)
 * Opheffing van uitzondering op de systeemcrash-handler opgelost. [#12259](https://github.com/electron/electron/pull/12259)
 * Verbergen tooltip van geminimaliseerd venster opgelost. [#11644](https://github.com/electron/electron/pull/11644)
 * `desktopcapcher` opgelost om het juiste scherm vast te leggen. [#11664](https://github.com/electron/electron/pull/11664)
 * Vaste `disableHardwareAcceleration` met transparantie. [#11704](https://github.com/electron/electron/pull/11704)

# Wat is volgende

Het Electron team is hard op het werk om nieuwere versies van Chromium, Node en v8 te ondersteunen. Verwacht binnenkort 3.0.0-beta.1
