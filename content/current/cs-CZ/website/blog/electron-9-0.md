---
title: Electron 9.0.0
author:
  - sofianguy
  - VerteDinde
date: '2020-05-19'
---

Electron 9.0.0 byl vydán! Zahrnuje vylepšení na chrom `83`, V8 `8.3`a Node.js `12.14`. Přidali jsme několik nových API integrace pro naši funkci kontroly pravopisu, povolený prohlížeč PDF a mnoho dalšího!

---

Tým Electronu je nadšený oznámením vydání Electronu 9.0.0! Můžete ji nainstalovat pomocí npm přes `npm instalovat electron@latest` nebo stáhnout z našich [webových stránek](https://electronjs.org/releases/stable). Vydání je plněno aktualizacemi, opravami a novými funkcemi. Nemůžeme čekat, co s nimi buduješ! Pokračujte ve čtení podrobností o tomto vydání a prosím sdílejte zpětnou vazbu, kterou máte!

## Významné změny

### Změny zásobníku

* Chrom `83.0.4103.64`
    * [Nově v Chrome 81](https://developers.google.com/web/updates/2020/04/nic81)
    * [Chrome 82 byl přeskočen.](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Novinky v Chrome 83](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [Uzel 12.14.1 blog post](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [V8 8.1 blogový příspěvek](https://v8.dev/blog/v8-release-81)
    * [V8 8.3 blogový příspěvek](https://v8.dev/blog/v8-release-83)

### Zvýraznit funkce

* Více vylepšení funkce kontroly pravopisu. Viz další podrobnosti v [#22128](https://github.com/electron/electron/pull/22128) a [#22368](https://github.com/electron/electron/pull/22368).
* Vylepšená účinnost zpracování oken na Linuxu. [#23260](https://github.com/electron/electron/pull/23260).
* Povolit prohlížeč PDF. [#22131](https://github.com/electron/electron/pull/22131).

Kompletní seznam nových funkcí a změn naleznete v poznámkách [9.0.0](https://github.com/electron/electron/releases/tag/v9.0.0).

## Breaking Changes

* Upozornění na zastaralé používání `vzdáleného` bez `enableRemoteModule: true`. [#21546](https://github.com/electron/electron/pull/21546)
    * Toto je první krok v našich plánech pro zastaralý modul `vzdálený` a přesunutí do uživatelského území. Můžete si přečíst a sledovat [tento problém](https://github.com/electron/electron/issues/21408) , který podrobně popisuje naše důvody a obsahuje navrhovanou časovou osu pro zastaralost.
* Ve výchozím nastavení nastavte `app.enableRenderProcessReuse` na true. [#22336](https://github.com/electron/electron/pull/22336)
    * Toto pokračuje v práci pro budoucí požadavek, aby nativní moduly uzlu načtené v procesu vykreslování byly buď [N-API](https://nodejs.org/api/n-api.html) nebo [kontext Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Kompletní informace a navrhovaná časová osa jsou podrobně uvedeny v [tomto problému](https://github.com/electron/electron/issues/18397).
* Odesílání neJavaScriptových objektů přes IPC nyní hodí výjimku. [#21560](https://github.com/electron/electron/pull/21560)
    * Toto chování bylo devalvováno v Electronu 8.0. V Electronu 9.0 byl odstraněn starý serializační algoritmus a odeslání takovýchto neserializovatelných objektů nyní hodí "objekt nemohl být klonován" chybu.

Více informací o těchto a budoucích změnách naleznete na stránce [Plánované změny zlomu](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Změny API

* `shell` změny APL:
   * `shell.openItem` API bylo nahrazeno asynchronním `shell.openPath API`. [návrh](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `relace`změny APL:
   * Přidáno `session.listWordsFromSpellCheckerDictionary` API pro seznam vlastních slov ve slovníku. [#22128](https://github.com/electron/electron/pull/22128)
   * Přidáno `session.removeWordFromSpellCheckerDictionary` API pro odstranění vlastních slov ve slovníku. [#22368](https://github.com/electron/electron/pull/22368)
   * Přidáno `session.serviceWorkerContext` API pro přístup k základním informacím o pracujícím služby a příjem protokolů konzole od servisních pracovníků. [#22313](https://github.com/electron/electron/pull/22313)
* `aplikace` změny APL:
   * Přidán nový parametr síly do `app.focus()` na macOS umožňující aplikacím vynuceně se zaostřit. [#23447](https://github.com/electron/electron/pull/23447)
* `BrowserWindow` změny APL:
   * Přidána podpora pro přístup k vlastnostem některých párů getter/setter na `BrowserWindow`. [#23208](https://github.com/electron/electron/pull/23208)

### Zastaralá API

Následující API jsou nyní zastaralé nebo odstraněny:

* `shell.openItem` API je nyní devalvováno a nahrazeno asynchronní `shell.openPath API`.
* `<webview>.getWebContents`, který byl zastaralý v Electron 8.0, je nyní odstraněn.
* `webFrame.setLayoutZoomLevelLimits`, který byl zastaralý v Electron 8.0, je nyní odstraněn.

## Konec podpory pro 6.x.y

Electron 6.x.y dosáhl konce podpory v rámci [politiky podpory](https://electronjs.org/docs/tutorial/support#supported-versions). Vývojáři a aplikace jsou vybízeny k aktualizaci na novější verzi Electronu.

## Co je další

Z krátkodobého hlediska můžete očekávat, že se tým bude nadále zaměřovat na udržení pokroku při vývoji hlavních komponentů, které tvoří Electron, včetně chromu, niklu a V8. I když jsme opatrní, abychom neslíbili data zveřejnění, Naším plánem je vydání nových hlavních verzí Electronu s novými verzemi těchto komponentů přibližně čtvrtletně. [předběžný plán 10.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapuje klíčová data ve vývojovém životním cyklu Electronu 10.0. Také [viz náš dokument s verzemi](https://electronjs.org/docs/tutorial/electron-versioning) pro podrobnější informace o verzích v Electronu.

Informace o plánovaných zlomových změnách v nadcházejících verzích Electronu [naleznete v naší Plánované zlomení změn doc](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Změňte výchozí hodnotu `kontextIsolation` z `false` na `true` (Začíná v Electronu 10)

Bez kontextIsolation, libovolný kód běžící v procesu rendereru se může snadno dostat do interních Electronů nebo do přednaženého skriptu aplikace. Tento kód pak může provádět privilegované akce, které Electron chce i nadále omezovat.

Změna tohoto výchozího nastavení zvyšuje výchozí bezpečnost aplikací Electronu tak, aby se aplikace musely vědomě přihlásit k nejistému chování. Electron devalvuje aktuální výchozí hodnotu `kontextIsolation` v Electronu 10. , a přejít na novou výchozí hodnotu (`true`) v Electron 12.0.

Pro více informací o `contextIsolation`jak jej snadno povolit a jeho bezpečnostní výhody, podívejte se prosím na náš vyhrazený [kontextový dokument](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md).
