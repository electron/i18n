---
title: Electron 6.0.0
author:
  - sofianguy
  - ckerr
  - codebytere
date: '2019-07-30'
---

Tým Electronu je nadšený oznámením vydání Electronu 6.0.0! Můžete ji nainstalovat pomocí npm přes `npm instalovat electron@latest` nebo stáhnout z našich [webových stránek](https://electronjs.org/releases/stable). Vydání je plněno aktualizacemi, opravami a novými funkcemi. Nemůžeme čekat, co s nimi buduješ! Pokračujte ve čtení podrobností o tomto vydání a prosím sdílejte zpětnou vazbu, kterou máte!

---

## Co je nového

Dnes označujeme jako první pro projekt Electron: je to poprvé, co jsme učinili stabilní vydání Electronu **téhož dne** jako odpovídající [stabilní vydání Chrome](https://www.chromestatus.com/features/schedule)! 🎉

Velkou část funkce Electronu poskytuje jádro Chromium, Node.js a V8. Electron průběžně aktualizuje tyto projekty, aby poskytoval našim uživatelům nové funkce JavaScriptu, vylepšení výkonu a bezpečnostní opravy. Každý z těchto balíčků má hlavní verzi pumpy v Electron 6:

- Chrom `76.0.3809.88`
  - [Nový v 74](https://developers.google.com/web/updates/2019/04/nic74)
  - [Nový v 75](https://developers.google.com/web/updates/2019/06/nic75)
  - [Nový v 76](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [Uzel 12.4.0 blogový příspěvek](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [V8 7.6 blogový příspěvek](https://v8.dev/blog/v8-release-76)

Tato verze také obsahuje vylepšení API Electronu. [Poznámky k vydání](https://github.com/electron/electron/releases/tag/v6.0.0) mají dokonalejší seznam, ale zde jsou zvýraznění:

### Promisification

Electron 6.0 continues the modernization [initiative](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) started in 5.0 to improve [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) support.

Tyto funkce nyní vracejí sliby a stále podporují starší volání zpět:
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

Tyto funkce mají nyní dvě formy, synchronně propojené a protichůdné asynchrony:
 * `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

Tyto funkce nyní vracejí sliby:
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `Electron Helper (Renderer).app`, `Electron Helper (GPU).app` a `Electron Helper (Plugin).app`

Aby bylo možné povolit [zpevněnou běh](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc), která omezuje věci jako zapisovatelná spustitelná paměť a načítací kód podepsaný jiným týmem ID nároky na podpis zvláštního kódu, které musí být poskytnuty Helperu.

zachovat rozsah těchto nároků podle typů postupů, které je vyžadují, Chromium [přidal](https://chromium-review.googlesource.com/c/chromium/src/+/1627456) tři nové varianty aplikace Helper: jedna pro renderery (`Electron Helper (Rendererer). pp`), jeden pro GPU proces (`Electron Helper (GPU). pp`) a jeden pro pluginy (`Electron Helper (Plugin).app`).

Složky s `elektronickým osx-znakem` pro kódování jejich Electron aplikace by neměly dělat žádné změny v jejich sestavovací logice. Pokud svou aplikaci kódujete pomocí vlastních skriptů, měli byste zajistit, aby tři nové Helper aplikace byly správně kódovány.

Pro správné naplnění vaší aplikace s těmito novými pomocníky musíte používat `electron-packager@14.0.4` nebo vyšší.  Pokud používáte `electron-builder` , měli byste sledovat [tento problém](https://github.com/electron-userland/electron-builder/issues/4104) , abyste mohli sledovat podporu těchto nových pomocníků.

## Breaking Changes

 * Tato verze začíná vytvářet základy pro budoucí požadavek, aby nativní moduly uzlu načtené v procesu renderer byly buď [N-API](https://nodejs.org/api/n-api.html) nebo [kontextové Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Důvody této změny jsou rychlejší výkonnost, větší bezpečnost a snížení údržbového zatížení. Přečtěte si všechny detaily včetně navrhované časové osy v [tomto úkolu](https://github.com/electron/electron/issues/18397). Očekává se, že tato změna bude dokončena v Electronu v11.

 * `net.IncomingMessage` hlavičky [se mírně změnily](https://github.com/electron/electron/pull/17517#issue-263752903) tak, aby více odpovídaly [Node. s chování](https://nodejs.org/api/http.html#http_message_headers), zejména s hodnotou `set-cookie` a jak se s duplikovanými hlavičkami zachází. [#17517](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInFolder()` nyní vrací neplatné a je asynchronní hovor. [#17121](https://github.com/electron/electron/pull/17121)

 * Aplikace musí nyní výslovně nastavit cestu k logu vyvoláním nové funkce `app.setAppLogPath()` před použitím `app.getPath('log')`. [#17841](https://github.com/electron/electron/pull/17841)

## Konec podpory pro 3.x.y

Na naši [politiku podpory](https://electronjs.org/docs/tutorial/support#supported-versions), 3.x.y dosáhl konce života. Vývojáři a aplikace jsou vybízeny k aktualizaci na novější verzi Electronu.

## App Feedback Program

Pokračujeme v používání našeho [programu zpětné vazby aplikací](https://electronjs.org/blog/app-feedback-program) pro testování. Projekty, které se účastní tohoto programu testování Electron betas na svých aplikacích; a na oplátku nové chyby mají prioritu pro stabilní vydání. Pokud byste se chtěli zúčastnit nebo se dozvědět více, [podívejte se na náš blog příspěvek o programu](https://electronjs.org/blog/app-feedback-program).

## Co je další

Z krátkodobého hlediska můžete očekávat, že se tým bude nadále zaměřovat na udržení pokroku při vývoji hlavních komponentů, které tvoří Electron, včetně chromu, niklu a V8. I když jsme opatrní, abychom neslíbili data zveřejnění, Naším plánem je vydání nových hlavních verzí Electronu s novými verzemi těchto komponentů přibližně čtvrtletně. [předběžný plán 7.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapuje klíčová data ve vývojovém životním cyklu Electronu 7. Také [viz náš dokument s verzemi](https://electronjs.org/docs/tutorial/electron-versioning) pro podrobnější informace o verzích v Electronu.

Informace o plánovaných zlomových změnách v nadcházejících verzích Electronu [naleznete v naší Plánované zlomení změn doc](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
