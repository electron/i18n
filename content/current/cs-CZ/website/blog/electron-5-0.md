---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '2019-04-23'
---

Tým Electronu je nadšený oznámením vydání Electronu 5.0.0! Můžete si ji nainstalovat pomocí npm přes `npm install electron@latest` nebo stáhnout tarballs z [naší release page](https://github.com/electron/electron/releases/tag/v5.0.0). Vydání je plněno aktualizacemi, opravami a novými funkcemi. Nemůžeme čekat, co s nimi buduješ! Pokračujte ve čtení podrobností o tomto vydání a prosím sdílejte zpětnou vazbu, kterou máte!

---

## Co je nového?

Velkou část funkce Electronu poskytuje jádro Chromium, Node.js a V8. Electron průběžně aktualizuje tyto projekty, aby poskytoval našim uživatelům nové funkce JavaScriptu, vylepšení výkonu a bezpečnostní opravy. Každý z těchto balíčků má hlavní verzi pumpy v Electron 5:

- Chrom `73.0.3683.119`
  - [Nový v 70](https://developers.google.com/web/updates/2018/10/nic70)
  - [Nový v 71](https://developers.google.com/web/updates/2018/12/nic71)
  - [Nově 72](https://developers.google.com/web/updates/2019/01/nic72)
  - [Nové v 73](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [Uzel 12 Blog Příspěvek](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`
  - [Nové JS funkce](https://twitter.com/mathias/status/1120700101637353473)

Elektron 5 rovněž zahrnuje vylepšení API specifických pro elektroniku. Shrnutí hlavních změn je níže; pro úplný seznam změn se podívejte na [Electron v5.0.0 release notes](https://github.com/electron/electron/releases/tag/v5.0.0).

### Promisification

Electron 5 pokračuje v [iniciativě "Promisification Initiative,](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) pro převod API založené na volání Electronu pro použití Promises. Tyto API byly převedeny na Electron 5:
* `app.getFileIcon`
* `Kategorie obsahu`
* `Spouštění nahrávání`
* `Zastavit nahrávání`
* `debugger.sendCommand`
* API cookies
* `shell.openExterní`
* `webContents.loadFile`
* `webContents.loadURL (Automatic Copy)`
* `webContents.zoomLevel`
* `webContents.zoomFactor`
* `win.capturePage`

### Přístup k systémovým barvám pro macOS

Tyto funkce byly změněny nebo přidány do `systemPreferences` pro přístup k barvám systémů macOS:
* `systemPreferences.getAccentColor`
* `systemPreferences.getColor`
* `systemPreferences.getSystemColor`

### Zpracování informací o paměti

Funkce `proces.getProcessMemoryInfo` byla přidána pro získání statistiky využití paměti o aktuálním procesu.

### Další filtrování pro vzdálené API

Pro zvýšení bezpečnosti v `vzdálené` API byly přidány nové vzdálené události tak, aby `dálkové. etBuiltin`, `vzdálený. etCurrentWindow`, `remote.getCurrentWebContents` a `<webview>.getWebContents` může být [filtrováno](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows).

### Více zobrazení prohlížeče v okně prohlížeče

BrowserWindow nyní podporuje správu více prohlížečů v rámci stejného prohlížeče Window.

## Breaking Changes

### Výchozí nastavení pro zabalené aplikace

Balené aplikace se budou chovat stejně jako výchozí aplikace: výchozí menu aplikace bude vytvořeno, pokud aplikace nebude mít jednu a událost `otevřená` bude automaticky zpracována, pokud aplikace nezvládne událost.

### Smíšené sandboxy

Režim smíšené sandboxy je nyní ve výchozím nastavení povolen. Renderery spuštěné s `pískovcem: true` nyní bude ve skutečnosti pískovcem, kde dříve by byly pouze pískovcové, pokud by byl také povolen smíšený režim písku.

### Zlepšení zabezpečení
Výchozí hodnoty `nodeIntegration` a `webviewTag` jsou nyní `falešné` pro zvýšení bezpečnosti.

### Kontrola pravopisu je nyní asynchronní

API kontroly pravopisu bylo změněno tak, aby poskytovalo [asynchronní výsledky](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider).

## Deprese

Následující API jsou nově zastaralá v Electronu 5.0.0 a jsou naplánována na odstranění v 6.0.0:

### Mksnapshot binární soubory pro paže a arm64
Nativní binární soubory mksnapshot pro paže a arm64 jsou zastaralé a budou odstraněny v 6. .0. Snapshoty lze vytvořit pro paže a arm64 pomocí binárních souborů x64.

### API ServiceWorker na webovém obsahu
Zastaralý serveWorker API na WebContents v přípravě na jejich odstranění.
* `webContents.hasServiceWorker`
* `webContents.unregisterServiceWorker`

### Automatické moduly s pískovaným webovým obsahem
Za účelem zlepšení bezpečnosti, následující moduly jsou zastaralé pro použití přímo přes `vyžadují` a místo toho je třeba je zahrnout přes `dálkový ovladač. equire` in sandboxed webcontents:
* `elektronická obrazovka`
* `proces_dítěte`
* `fs`
* `v:`
* `cesta`

## webFrame Isolated World APIs
`webFrame.setIsolatedWorldContentSecurityPolicy`,`webFrame.setIsolatedWorldHumanReadableName`, `webFrame.setIsolatedWorldSecurityOrigin` byly zastaralé ve prospěch `webFrame.setIsolatedWorldInfo`.

### Smíšené sandboxy
`enableMixedSandbox` a `--enable-mixed-sandbox` přepínač příkazové řádky stále existují pro kompatibilitu, ale jsou zastaralé a nemají žádný efekt.

## Konec podpory pro 2.0.x

Na naše [podporované verze politiky](https://electronjs.org/docs/tutorial/support#supported-versions), 2.0.x dosáhl konce života.

## App Feedback Program

Pokračujeme v používání našeho [programu zpětné vazby aplikací](https://electronjs.org/blog/app-feedback-program) pro testování. Projekty, které se účastní tohoto programu testování Electron betas na svých aplikacích; a na oplátku nové chyby mají prioritu pro stabilní vydání. Pokud byste se chtěli zúčastnit nebo se dozvědět více, [podívejte se na náš blog příspěvek o programu](https://electronjs.org/blog/app-feedback-program).

## Co je další

Z krátkodobého hlediska můžete očekávat, že se tým bude nadále zaměřovat na udržení pokroku při vývoji hlavních komponentů, které tvoří Electron, včetně chromu, niklu a V8. I když jsme opatrní, abychom neslíbili data zveřejnění, Naším plánem je vydání nových hlavních verzí Electronu s novými verzemi těchto komponentů přibližně čtvrtletně. [předběžný plán 6.0.0](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) mapuje klíčová data ve vývojovém životním cyklu Electronu 6. Také [viz náš dokument s verzemi](https://electronjs.org/docs/tutorial/electron-versioning) pro podrobnější informace o verzích v Electronu.

Informace o plánovaných zlomových změnách v nadcházejících verzích Electronu [naleznete v naší Plánované zlomení změn doc](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
