---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

Po více než čtyřech měsících vývoje bylo vydáno osm beta vydání a celosvětově testování na sériových rolích mnoha aplikací, vydání Electron 2. .0 je nyní k dispozici od [electronjs.org](https://electronjs.org/).

---

## Proces vydání

Počínaje 2.0.0, Electronovy verze budou následovat [sémantické verze](https://electronjs.org/blog/electron-2-semantic-boogaloo). To znamená, že hlavní verze se vyskočí častěji a obvykle bude velkou aktualizací Chromium. Vydání Patch by měla být stabilnější, protože budou obsahovat pouze opravy chyb s vysokou prioritou.

Electron 2.0.0 také představuje zlepšení toho, jak je Electron stabilizován před velkým vydáním. Několik velkých aplikací Electronu zahrnovalo 2.0.0 betas ve stádiích rollout, poskytuje nejlepší zpětnou vazbu smyčky Electronu kdy měla beta série.

## Změny / Nové funkce

 * Významná část elektronového nářadí, včetně Chrome 61, Node 8.9.3, V8 6.1.534.41, GTK+ 3 na Linuxu, aktualizované kontroly pravopisu a Squirrel.
 * [Nákupy v aplikaci](https://electronjs.org/blog/in-app-purchases) jsou nyní podporovány na MacOS. [#11292](https://github.com/electron/electron/pull/11292)
 * Nové API pro načítání souborů. [#11565](https://github.com/electron/electron/pull/11565)
 * Nové API pro zapnutí/vypnutí okna. [#11832](https://github.com/electron/electron/pull/11832)
 * New API app.setLocale(). [#11469](https://github.com/electron/electron/pull/11469)
 * Nová podpora pro protokolování IPC zpráv. [#11880](https://github.com/electron/electron/pull/11880)
 * Nové události v nabídce. [#11754](https://github.com/electron/electron/pull/11754)
 * Přidat událost `vypnutí` na powerMonitor. [#11417](https://github.com/electron/electron/pull/11417)
 * Přidejte `blízkost` pro shromáždění několika BrowserWindows do jednoho procesu. [#11501](https://github.com/electron/electron/pull/11501)
 * Přidat možnost pro saveDialog k seznamu dostupných rozšíření. [#11873](https://github.com/electron/electron/pull/11873)
 * Podpora pro další akce oznámení [#11647](https://github.com/electron/electron/pull/11647)
 * Možnost nastavit název tlačítka ukončení macOS oznámení. [#11654](https://github.com/electron/electron/pull/11654)
 * Přidat podmínku pro menu.popup(okno, zpětné volání)
 * Vylepšení paměti v položkách dotykového panelu. [#12527](https://github.com/electron/electron/pull/12527)
 * Vylepšený kontrolní seznam bezpečnostních doporučení.
 * Přidejte aplikace, které mají rozsah zabezpečení. [#11711](https://github.com/electron/electron/pull/11711)
 * Přidat možnost nastavit libovolné argumenty v procesu vykreslování. [#11850](https://github.com/electron/electron/pull/11850)
 * Přidat doplněk pro výběr formátu. [#11873](https://github.com/electron/electron/pull/11873)
 * Pevná síť deleguje podmínky závodu. [#12053](https://github.com/electron/electron/pull/12053)
 * Zahodit podporu pro `mips64el` arch na Linuxu. Electron vyžaduje nástroj C++14, který nebyl v době vydání k dispozici. Doufáme, že v budoucnu znovu přidáme podporu.

## Zarámování změn API

 * Odstraněno [zastaralé API](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md), včetně:
   * Změněn podpis `menu.popup`. [#11968](https://github.com/electron/electron/pull/11968)
   * Odstraněno zastaralé `crashReporter.setExtraParameter` [#11972](https://github.com/electron/electron/pull/11972)
   * Odstraněn zastaralý `webContents.setZoomLevelLimits` a `webFrame.setZoomLevelLimits`. [#11974](https://github.com/electron/electron/pull/11974)
   * Odstraněny metody `schránky`. [#11973](https://github.com/electron/electron/pull/11973)
   * Odstraněna podpora logických parametrů pro `tray.setHighlightMode`. [#11981](https://github.com/electron/electron/pull/11981)

## Opravy chyb

 * Změněno tak, aby se ujistilo, že `webContents.isOffscreen()` je vždy k dispozici. [#12531](https://github.com/electron/electron/pull/12531)
 * Opraveno `BrowserWindow.getFocusedWindow()` , když je DevTools oddokován a soustředěn. [#12554](https://github.com/electron/electron/pull/12554)
 * Opraveno přednačtení není načteno v písmeni vykreslování, pokud cesta obsahuje speciální znaky. [#12643](https://github.com/electron/electron/pull/12643)
 * Opravit výchozí allowRunningInsecureContent podle dokumentů. [#12629](https://github.com/electron/electron/pull/12629)
 * Pevná průhlednost na nativeImage. [#12683](https://github.com/electron/electron/pull/12683)
 * Opraven problém s `Menu.buildFromTemplate`. [#12703](https://github.com/electron/electron/pull/12703)
 * Potvrzené možnosti menu.popup jsou objekty. [#12330](https://github.com/electron/electron/pull/12330)
 * Odstranil závod mezi novým vytvořením procesu a kontextovým vydáním. [#12361](https://github.com/electron/electron/pull/12361)
 * Aktualizovat přetahovatelné oblasti při změně prohlížeče View. [#12370](https://github.com/electron/electron/pull/12370)
 * Opravený přepínač menu přepíná detekci alt klíče na ostření. [#12235](https://github.com/electron/electron/pull/12235)
 * Opravena chybná varování v zobrazení webu. [#12236](https://github.com/electron/electron/pull/12236)
 * Opravena dědičnost volby 'show' z nadřazených oken. [#122444](https://github.com/electron/electron/pull/122444)
 * Ujistěte se, že `getLastCrashReport()` je ve skutečnosti poslední zpráva o pádu. [#12255](https://github.com/electron/electron/pull/12255)
 * Opraveno vyžaduje na cestě ke sdílení sítě. [#12287](https://github.com/electron/electron/pull/12287)
 * Opraveno kontextové menu kliknutím na tlačítko zpět. [#12170](https://github.com/electron/electron/pull/12170)
 * Povolená pozice nabídky vyskakovacích oken. [#12181](https://github.com/electron/electron/pull/12181)
 * Vylepšená čisticí smyčka libuv. [#11465](https://github.com/electron/electron/pull/11465)
 * Pevné `hexColorDWORDToRGBA` pro průhledné barvy. [#11557](https://github.com/electron/electron/pull/11557)
 * Opravena null pointer dereference s api getWebPreference. [#12245](https://github.com/electron/electron/pull/12245)
 * V delegované nabídce byl stanoven cyklický odkaz. [#11967](https://github.com/electron/electron/pull/11967)
 * Pevné filtrování net.request. [#11657](https://github.com/electron/electron/pull/11657)
 * WebFrame.setVisualZoomLevelLimits nyní nastavuje měřítková omezení pro uživatele [#12510](https://github.com/electron/electron/pull/12510)
 * Nastavení vhodných výchozích hodnot pro možnosti zobrazení webu. [#12292](https://github.com/electron/electron/pull/12292)
 * Zlepšená podpora pro životaschopnost. [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * Opraven problém s načasováním v zařízení pro singleton.
 * Pevná poškozená produkční keš v NotifierSupportsActions()
 * Vytvořeno menuItem role camelCase-kompatibilní. [#11532](https://github.com/electron/electron/pull/11532)
 * Vylepšené aktualizace dotykového panelu. [#11812](https://github.com/electron/electron/pull/11812), [#11761](https://github.com/electron/electron/pull/11761).
 * Odstraněno další oddělovače nabídek. [#11827](https://github.com/electron/electron/pull/11827)
 * Opravena chyba při výběru Bluetooth. Uzavře [#11399](https://github.com/electron/electron/pull/11399).
 * Opraven macos - Přepínač nabídky pro celou obrazovku. [#11633](https://github.com/electron/electron/pull/11633)
 * Vylepšené skrývání popisků při deaktivaci okna. [#11644](https://github.com/electron/electron/pull/11644)
 * Migrated zastaralá web-view metoda. [#11798](https://github.com/electron/electron/pull/11798)
 * Opraveno zavření okna otevřeného z prohlížeče. [#11799](https://github.com/electron/electron/pull/11799)
 * Opravena chyba při výběru Bluetooth. [#11492](https://github.com/electron/electron/pull/11492)
 * Aktualizováno pro použití plánovače úloh pro app.getFileIcon API. [#11595](https://github.com/electron/electron/pull/11595)
 * Změněno na ohn `konzol-zpráva` i při vykreslování mimo obrazovku. [#11921](https://github.com/electron/electron/pull/11921)
 * Stahování z vlastních protokolů opraveno pomocí `WebContents.downloadURL`. [#11804](https://github.com/electron/electron/pull/11804)
 * Pevná průhledná okna ztrácející průhlednost při odpojení devtools [#11956](https://github.com/electron/electron/pull/11956)
 * Opraveny Electron aplikace, které ruší restart nebo vypnou. [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * Pevný únik události při opětovném použití položky dotykového panelu. [#12624](https://github.com/electron/electron/pull/12624)
 * Pevné zvýraznění oblasti ve tmavém režimu. [#12398](https://github.com/electron/electron/pull/12398)
 * Opraveno blokování hlavního procesu asyncového dialogu. [#12407](https://github.com/electron/electron/pull/12407)
 * Opravena chyba `setTitle` v pasti. [#12356](https://github.com/electron/electron/pull/12356)
 * Opravena chyba při nastavení nabídky doku. [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * Lepší Linux desktopová oznámení. [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * Lepší podpora témat GTK+ pro menu. [#12331](https://github.com/electron/electron/pull/12331)
 * Ukončíte laskavě na linux. [#12139](https://github.com/electron/electron/pull/12139)
 * Použít název aplikace jako výchozí nástroj ikony v liště. [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * Přidána podpora Visual Studio 2017. [#11656](https://github.com/electron/electron/pull/11656)
 * Pevně projíždějící výjimku pro zařízení s havarijní funkcí systému. [#12259](https://github.com/electron/electron/pull/12259)
 * Opraveno skrytí popisku z minimalizovaného okna. [#11644](https://github.com/electron/electron/pull/11644)
 * Opraven `desktopCapturer` pro zachycení správné obrazovky. [#11664](https://github.com/electron/electron/pull/11664)
 * Opraveno `s průhledností vypnutého hardwareakcelerace`. [#11704](https://github.com/electron/electron/pull/11704)

# Co je další

Tým Electron je těžko na práci na podpoře novějších verzí Chromia, Node a v8. Brzy očekávejte 3.0.0-beta.1!
