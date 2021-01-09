---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

Tým Electronu je nadšený, že oznámí, že první stabilní vydání Electronu 3 je nyní k dispozici z [elektrojs. rg](https://electronjs.org/) a via `npm install electron@latest`! Je zabalena vylepšeními, opravami a novými funkcemi a nemůžeme čekat, co s nimi stavíte. Níže jsou uvedeny podrobnosti o této verzi a vítáme vaši zpětnou vazbu při zkoumání.

---

## Proces vydání

Jak jsme zahájili vývoj ve výši `v3.0.`snažili jsme se empiricky definovat kritéria pro stabilní vydání formalizací postupu zpětné vazby pro progresivní beta release. `v3.0.` by nebylo možné bez našich partnerů [App Feedback Programu](https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md) , kteří během cyklu beta poskytovali včasné testování a zpětnou vazbu. Díky Atlassian, Atom, Microsoft Teams, Oculus, OpenFin, Slack, Symphony, VS Code a dalším členům programu za jejich práci. Pokud byste se chtěli účastnit budoucích betas, napište nám prosím na [info@electronjs.org](mailto:info@electronjs.org).

## Změny / Nové funkce

Významný výpadek do několika důležitých částí Nástrojového řetězce Electronu, včetně Chrome `v66.0.3359.181`, uzlu `v10.2.0`a V8 `v6.6.346.23.`

* [[#12656](https://github.com/electron/electron/pull/12656)] funkce: `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)] funkce: `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)] funkce: `process.getHeapStatistics()`
* [[#12485](https://github.com/electron/electron/pull/12485)] funkce: `win.moveTop()` pro přesun okna z pořadí nahoru
* [[#13110](https://github.com/electron/electron/pull/13110)] funkce: textové pole a tlačítko API
* [[#13068](https://github.com/electron/electron/pull/13068)] funkce: netLog API pro dynamické ovládání protokolování
* [[#13539](https://github.com/electron/electron/pull/13539)] funkce: povolte `webview` v pískovém rendereru
* [[#14118](https://github.com/electron/electron/pull/14118)] funkce: `fs.readSync` nyní pracuje s masivními soubory
* [[#14031](https://github.com/electron/electron/pull/14031)] funkce: uzel `fs` wrappers pro zpřístupnění `fs.realpathSync.native` a `fs.realpath.native`

## Zarámování změn API

* [[#12362](https://github.com/electron/electron/pull/12362)] funkce: aktualizace řízení pořadí položek nabídky
* [[#13050](https://github.com/electron/electron/pull/13050)] refaktor: odstraněn dokumentovaný zastaralý API
  * Více informací naleznete v [dokumentech](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30)
* [[#12477](https://github.com/electron/electron/pull/12477)] refaktor: odstraněno `did-get-response-details` a `did-get-redirect-request` události
* [[#12655](https://github.com/electron/electron/pull/12655)] funkce: výchozí pro zakázání navigace při přetažení/pádu
* [[#12993](https://github.com/electron/electron/pull/12993)] funkce: Node `v4.x` nebo větší je vyžadováno použití modulu `elektroron` npm
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)] `NativeWindow`
* [[#11968](https://github.com/electron/electron/pull/11968)] refaktor: `menu.popup()`
* [[#8953](https://github.com/electron/electron/pull/8953)] funkce: již nepoužívat JSON pro odesílání výsledků `ipcRender.sendSync`
* [[#13039](https://github.com/electron/electron/pull/13039)] funkce: výchozí ignorovat argumenty příkazové řádky následující po URL
* [[#12004](https://github.com/electron/electron/pull/12004)] refaktor: přejmenovat `api::Window` na `api:::BrowserWindow`
* [[#12679](https://github.com/electron/electron/pull/12679)] funkce: vizuální přiblížení je nyní ve výchozím nastavení vypnuto
* [[#12408](https://github.com/electron/electron/pull/12408)] refaktor: přejmenovat app-command `media-play_pause` na `media-play-pause`

### macOS

* [[#12093](https://github.com/electron/electron/pull/12093)] funkce: podpora oznámení pracovního prostoru
* [[#12496](https://github.com/electron/electron/pull/12496)] funkce: `tray.setIgnoreDoubleClickEvents(ignorovat)` pro ignorování událostí dvojího kliknutí.
* [[#12281](https://github.com/electron/electron/pull/12281)] funkce: funkce myši přesměrování na macOS
* [[#12714](https://github.com/electron/electron/pull/12714)] funkce: zámek obrazovky / odemknutí událostí

### Windows

* [[#12879](https://github.com/electron/electron/pull/12879)] funkce: přidáno DIP do/z konverze souřadnic obrazovky

**Nota Bene:** Přepnutí na starší verzi Electronu po spuštění této verze bude vyžadovat vymazání adresáře s uživatelskými daty, abyste se vyhnuli pádu starších verzí. Uživatelský datový adresář můžete získat spuštěním `console.log(app.getPath("userData"))` nebo více detailů viz [dokumentace](https://electronjs.org/docs/api/app#appgetpathname).

## Opravy chyb

* [[#13397](https://github.com/electron/electron/pull/13397)] oprava: problém s `fs.statSyncNoException` házení výjimek
* [[#13476](https://github.com/electron/electron/pull/13476), [#13452](https://github.com/electron/electron/pull/13452)] oprava: při načítání stránky s jquery pád
* [[#14092](https://github.com/electron/electron/pull/14092)] oprava: pád `net::ClientSocketHandle` destruktor
* [[#14453](https://github.com/electron/electron/pull/14453)] oprava: hned upozorněte na změnu zaostření, nikoli na další tick

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] oprava: problém umožňující výběr balíků v dialogovém okně `<input file="type">`
* [[#12404](https://github.com/electron/electron/pull/12404)] oprava: blokování hlavního procesu při použití async dialogového okna
* [[#12043](https://github.com/electron/electron/pull/12043)] oprava: tlačítko zpět v nabídce
* [[#12527](https://github.com/electron/electron/pull/12527)] Oprava: Únik události při opětovném použití dotykové položky
* [[#12352](https://github.com/electron/electron/pull/12352)] oprava: pád titulku
* [[#12327](https://github.com/electron/electron/pull/12327)] oprava: nepřetažitelné regiony
* [[#12809](https://github.com/electron/electron/pull/12809)] oprava: zabránit aktualizaci nabídky během jejího otevření
* [[#13162](https://github.com/electron/electron/pull/13162)] oprava: ohraničení ikony neumožňují záporné hodnoty
* [[#13085](https://github.com/electron/electron/pull/13085)] oprava: při zvýraznění se název pole neobrácen.
* [[#12196](https://github.com/electron/electron/pull/12196)] Opravit: Mac sestavení když `enable_run_as_node==false`
* [[#12157](https://github.com/electron/electron/pull/12157)] náprava: další problémy na oknech bez rámců s vibracemi
* [[#13326](https://github.com/electron/electron/pull/13326)] oprava: nastavit mac protokol na žádný po volání `app.removeAsDefaultProtocolClient`
* [[#13530](https://github.com/electron/electron/pull/13530)] oprava: nesprávné používání soukromých API v sestavení MAS
* [[#13517](https://github.com/electron/electron/pull/13517)] oprava: `tray.setContextMenu` crash
* [[#14205](https://github.com/electron/electron/pull/14205)] oprava: stisknutím tlačítka escape na dialogovém okně ji nyní zavřete, i když je nastavena `výchozí Id`

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)] oprava: `BrowserWindow.focus()` pro okna mimo obrazovku

## Ostatní poznámky

* PDF prohlížeč momentálně nefunguje, ale pracuje se na něm a bude brzy opět funkční.
* `Textfield` a `tlačítko` API jsou experimentální a proto jsou ve výchozím nastavení vypnuty
  * Mohou být povoleny s `enable_view_api` příznak sestavení

# Co je další

Tým Electronu pokračuje v práci na definování našich procesů pro rychlejší a hladší vylepšení, neboť se snažíme zachovat paritu s vývojovými kadály chromu, Uzel a V8.
