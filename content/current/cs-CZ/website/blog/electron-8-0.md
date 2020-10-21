---
title: Electron 8.0.0
author:
  - jkleinsc
  - sofianguy
date: '2020-02-04'
---

Electron 8.0.0 byl vydán! Zahrnuje vylepšení na chrom `80`, V8 `8.0`a Node.js `12.13.0`. Přidali jsme vestavěný Chromeho kontrolu pravopisu a mnoho dalšího!

---

Tým Electron je nadšený oznámit vydání Electronu 8.0.0! Můžete ji nainstalovat pomocí npm přes `npm instalovat electron@latest` nebo stáhnout z našich [webových stránek](https://electronjs.org/releases/stable). Vydání je plněno aktualizacemi, opravami a novými funkcemi. Nemůžeme čekat, co s nimi buduješ! Pokračujte ve čtení podrobností o tomto vydání a prosím sdílejte zpětnou vazbu, kterou máte!

## Významné změny

### Změny zásobníku
* Chrom `80.0.3987.86`
    * [Nově v Chrome 79](https://developers.google.com/web/updates/2019/12/nic79)
    * [Nově v Chrome 80](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [Uzel 12.13.0 blog post](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [V8 7.9 blogový příspěvek](https://v8.dev/blog/v8-release-79)
    * [V8 8.0 blogový příspěvek](https://v8.dev/blog/v8-release-80)

### Zvýraznit funkce
* Implementované používání vestavěné funkce kontroly pravopisu Chrome. Viz další podrobnosti v [#20692](https://github.com/electron/electron/pull/20692) a [#21266](https://github.com/electron/electron/pull/21266).
* IPC komunikace nyní používá algoritmus pro klonování ve struktuře v8. To je rychlejší, úžasnější a méně překvapivé než stávající logika a přináší dvounásobné zvýšení výkonu velkých nárazníků a složitých objektů. Otáčky u malých zpráv nejsou významně ovlivněny. Viz další podrobnosti v [#20214](https://github.com/electron/electron/pull/20214).

Kompletní seznam nových funkcí a změn naleznete v poznámkách [8.0.0](https://github.com/electron/electron/releases/tag/v8.0.0).

## Breaking Changes

* Zobrazit název modulu v upozornění na zastaralé moduly. [#21952](https://github.com/electron/electron/pull/21952)
    * Toto pokračuje v práci pro budoucí požadavek, aby nativní moduly uzlu načtené v procesu vykreslování byly buď [N-API](https://nodejs.org/api/n-api.html) nebo [kontext Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Kompletní informace a navrhovaná časová osa jsou podrobně uvedeny v [tomto problému](https://github.com/electron/electron/issues/18397).
* Hodnoty odeslané přes IPC jsou nyní serializovány se strukturovaným algoritmem Klonování.  [#20214](https://github.com/electron/electron/pull/20214)
* Vykreslování mimo obrazovku je v současné době zakázáno z důvodu nedostatku správce, který by pracoval na této funkci.  Při aktualizaci chromu se rozbil a byl následně deaktivován. [#20772](https://github.com/electron/electron/issues/20772)

Více informací o těchto a budoucích změnách naleznete na stránce [Plánované změny zlomu](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Změny API
* `aplikace` změny APL:
    * Přidána `app.getApplicationNameForProtocol(url)`. [#20399](https://github.com/electron/electron/pull/20399)
    * Přidána `app.showAboutPanel()` a `app.setAboutPanelOptions(volitelné)` podpora v systému Windows. [#19420](https://github.com/electron/electron/pull/19420)
* `BrowserWindow` změny APL:
    * Aktualizována dokumentace na vědomí, že možnosti BrowserWindow `hasShadow` jsou k dispozici na všech platformách [#20038](https://github.com/electron/electron/pull/20038)
    * Přidána možnost `trafficLightPosition` do možností prohlížeče Window pro povolení vlastní polohy tlačítek semaforu. [#21781](https://github.com/electron/electron/pull/21781)
    * Přidána možnost `accessibleTitle` do prohlížeče Window pro nastavení názvu okna [#19698](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` může nyní vrátit null [#19983](https://github.com/electron/electron/pull/19983)
    * Přidáno `BrowserWindow.getMediaSourceId()` a `BrowserWindow.moveAbove(mediaSourceId)`. [#18926](https://github.com/electron/electron/pull/18926)
    * Přidána podpora pro `will-move` událost na macOS. [#19641](https://github.com/electron/electron/pull/19641)
* Dokumentované dříve nezdokumentované `crashReporter.getCrashesDirectory()`. [#20417](https://github.com/electron/electron/pull/20417)
* `dialog` změny APL:
    * Přidána vlastnost `dontAddToRecent` do `dialogového dialogu.showOpenDialog` a `dialogu. howOpenDialogSync` , aby se zabránilo přidávání dokumentů do nedávných dokumentů na Windows v otevřených dialogových oknech. [#19669](https://github.com/electron/electron/pull/19669)
    * Vlastnost přizpůsobení byla přidána do `dialogu.showSaveDialog` a `dialogu.showSaveDialogSync`. [#19672](https://github.com/electron/electron/pull/19672)
* `Oznámení` Změny APL:
    * Přidána možnost `timeoutType` , aby uživatelé Linuxu/Windows mohli nastavit typ oznámení vypršel. [#20153](https://github.com/electron/electron/pull/20153)
    * Přidána `naléhavost`  možnost nastavit naléhavost oznámení Linuxu. [#20152](https://github.com/electron/electron/pull/20152)
* `relace` změny APL:
    * Aktualizována dokumentace na `session.setProxy(config)` a `session.setCertificateVerifyProc(proc)` pro volitelné možnosti. [#19604](https://github.com/electron/electron/pull/19604)
    * Přidána `session.downloadURL(url)` pro umožnění spuštění stahování bez BrowserWindow. [#19889](https://github.com/electron/electron/pull/19889)
    * Přidána podpora pro HTTP preconnect resource hints přes `session.preconnect(volitelné)` a `předpřipojit` událost. [#18671](http://github.com/electron/electron/pull/18671)
    * Přidán `session.addWordToSpellCheckerDictionary` pro povolení vlastních slov ve slovníku [#21297](http://github.com/electron/electron/pull/21297)
* Přidána možnost do `shell.moveItemToTrash(fullPath[, deleteOnFail])` na macOS pro upřesnění toho, co se stane, když se hroutí moveItemToTrash. [#19700](https://github.com/electron/electron/pull/19700)
* `systemPreferences` Změny APL:
    * Aktualizována `systemPreferences.getColor(color)` dokumentace pro macOS. [#20611](https://github.com/electron/electron/pull/20611)
    * Přidána `obrazovka` typ média do `systemPreferences.getMediaAccessStatus()`. [#20764](https://github.com/electron/electron/pull/20764)
* Přidáno `nativeTheme.themeSource` , aby aplikace mohly přepsat Chromium a výběr motivu OS. [#19960](https://github.com/electron/electron/pull/19960)
* Změny API Touchbaru:
    * Přidána vlastnost `přístupnosti` do `TouchBarbutton` a `TouchBarLabel` pro zlepšení přístupnosti TouchBarButton/TouchBarLabel. [#20454](https://github.com/electron/electron/pull/20454)
    * Aktualizována dokumentace týkající se TouchBar [#19444](https://github.com/electron/electron/pull/19444)
* `v liště` změny APL:
    * Přidány nové možnosti do `tray.displayBalloon()`: `iconType`, `largeIcon`, `noSound` a `respectQuietTime`. [#19544](https://github.com/electron/electron/pull/19544)
    * Přidán tray.removeBalloon(), který odstraňuje již zobrazené balonové oznámení. [#19547](https://github.com/electron/electron/pull/19547)
    * Přidán tray.focus(), který se zaměřuje na oznamovací oblast hlavního panelu. funkce: přidat tray.focus() [#19548](https://github.com/electron/electron/pull/19548)
* `webContent` změny APL:
    * Přidán `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` k odhalení executeJavaScriptInIsolatedWorld na API obsahu webu. [#21190](https://github.com/electron/electron/pull/21190)
    * Přidány metody pro zachycení skrytého webového obsahu. [#21679](https://github.com/electron/electron/pull/21679)
    * Přidány možnosti do `webContents.print([options], [callback])` pro povolení přizpůsobení záhlaví a zápatí. [#19688](https://github.com/electron/electron/pull/19688)
    * Přidána možnost kontrolovat konkrétní sdílené pracovníky prostřednictvím `webContents.getAllSharedWorkers()` a `webContents.inspectSharedWorkerById(workerId)`. [#20389](https://github.com/electron/electron/pull/20389)
    * Přidána podpora možností `fitToPageEnabled` a `scaleFactor` v WebContents.printToPDF(). [#20436](https://github.com/electron/electron/pull/20436)
* Aktualizována `webview.printToPDF` dokumentace pro indikaci návratového typu je nyní Uint8Array. [#20505](https://github.com/electron/electron/pull/20505)

### Zastaralá API
Následující API jsou nyní zastaralé:
* Před odstraněním v další hlavní verzi vydání byla zastaralá volba `viditelná OnFullScreen` v `BrowserWindow.setVisibleOnAllWorkspaces`. [#21732](https://github.com/electron/electron/pull/21732)
* Zastaralý `alternativně vybraný text` na `systemPreferences.getColor(color)` pro macOS. [#20611](https://github.com/electron/electron/pull/20611)
* Zastaralé `setLayoutZoomLevelLimity` na `webContents`, `webFrame`, a `<webview> Tag` , protože Chromium odstranil tuto funkci. [#21296](https://github.com/electron/electron/pull/21296)
* Výchozí hodnota `false` pro `app.allowRenderProcessReuse` je nyní zastaralá. [#21287](https://github.com/electron/electron/pull/21287)
* Zastaralé `<webview>.getWebContents()` , protože to závisí na vzdáleném modulu. [#20726](https://github.com/electron/electron/pull/20726)

## Konec podpory pro 5.x.y

Electron 5.x.y dosáhl konce podpory podle [politiky podpory](https://electronjs.org/docs/tutorial/support#supported-versions). Vývojáři a aplikace jsou vybízeny k aktualizaci na novější verzi Electronu.

## App Feedback Program

Pokračujeme v používání našeho [programu zpětné vazby aplikací](https://electronjs.org/blog/app-feedback-program) pro testování. Projekty, které se účastní tohoto programu testování Electron betas na svých aplikacích; a na oplátku nové chyby mají prioritu pro stabilní vydání. Pokud byste se chtěli zúčastnit nebo se dozvědět více, [podívejte se na náš blog příspěvek o programu](https://electronjs.org/blog/app-feedback-program).

## Co je další

Z krátkodobého hlediska můžete očekávat, že se tým bude nadále zaměřovat na udržení pokroku při vývoji hlavních komponentů, které tvoří Electron, včetně chromu, niklu a V8. I když jsme opatrní, abychom neslíbili data zveřejnění, Naším plánem je vydání nových hlavních verzí Electronu s novými verzemi těchto komponentů přibližně čtvrtletně. [předběžný plán 9.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapová klíčová data ve vývojovém životním cyklu Electronu 9. Také [viz náš dokument s verzemi](https://electronjs.org/docs/tutorial/electron-versioning) pro podrobnější informace o verzích v Electronu.

Informace o plánovaných zlomových změnách v nadcházejících verzích Electronu [naleznete v naší Plánované zlomení změn doc](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Deprecation of `remote` Modul (Start in Electron 9)
Vzhledem k vážným bezpečnostním závazkům začínáme plánovat zrušení [`vzdáleného` modulu](https://www.electronjs.org/docs/api/remote) začínajícího v Electron 9. Můžete si přečíst a sledovat [tento problém](https://github.com/electron/electron/issues/21408) , který podrobně popisuje naše důvody a obsahuje navrhovanou časovou osu pro zastaralost.
