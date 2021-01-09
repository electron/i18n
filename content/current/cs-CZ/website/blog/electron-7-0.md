---
title: Electron 7.0.0
author:
  - sofianguy
  - ckerr
date: '2019-10-22'
---

Electron 7.0.0 byl vydán! Zahrnuje vylepšení na Chromium 78, V8 7.8 a Node.js 12.8.1. Přidali jsme okno pro Arm 64, rychlejší metody IPC, nové `nativeTheme` API a mnohem více!

---

Tým Electronu je nadšený oznámit vydání Electronu 7.0.0! Můžete ji nainstalovat pomocí npm přes `npm instalovat electron@latest` nebo stáhnout z našich [webových stránek](https://electronjs.org/releases/stable). Vydání je plněno aktualizacemi, opravami a novými funkcemi. Nemůžeme čekat, co s nimi buduješ! Pokračujte ve čtení podrobností o tomto vydání a prosím sdílejte zpětnou vazbu, kterou máte!

## Významné změny
 * Vylepšení zásobníku:

   | Zásobník | Verze v Electron 6 | Verze v Electron 7 | Co je nového                                                                                                                                                                                                                                                              |
   |:-------- |:------------------ |:------------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Chrom    | 76.0.3809.146      | **78.0.3905.1**    | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8       | 7.6                | **7.8**            | [7.7](https://v8.dev/blog/v8-release-77), [7.8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js  | 12.4.0             | **12.8.1**         | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * Přidána Windows na Arm (64 bit) verze. [#18591](https://github.com/electron/electron/pull/18591), [#20112](https://github.com/electron/electron/pull/20112)
 * Přidáno `ipcRender.invoke()` a `ipcMain.handle()` pro asynchronní požadavek / response-style IPC. Ty jsou důrazně doporučeny přes `vzdálený` modul. Podívejte se na tento "[Electronův modul "dálkový" modul považovaný za škodlivý](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)" blog post pro více informací. [#18449](https://github.com/electron/electron/pull/18449)
 * Přidáno `nativní téma` API, aby bylo možné číst a reagovat na změny v šabloně a barevném schématu OS. [#19758](https://github.com/electron/electron/pull/19758), [#20486](https://github.com/electron/electron/pull/20486)
 * Přepnuto na nový generátor TypeScript definic [](https://github.com/electron/docs-parser). Výsledné definice jsou přesnější, takže pokud váš TypeScript sestaví chybu, je to pravděpodobná příčina. [#18103](https://github.com/electron/electron/pull/18103)

Více změn naleznete v poznámkách [7.0.0](https://github.com/electron/electron/releases/tag/v7.0.0).

## Breaking Changes

Více informací o těchto a budoucích změnách naleznete na stránce [Plánované změny zlomu](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).

 * Odstraněno zastaralé API:
     * Verze funkcí, které nyní používají Promises, založené na volání zpět. [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS). [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu()`,
     * `app.setApplicationMenu()`,
     * `powerMonitor.querySystemIdleState()`,
     * `powerMonitor.querySystemIdleTime()`,
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`,
     * `webFrame.setIsolatedWorldHumanReadableName()`,
     * `webFrame.setIsolatedWorldSecurityOrigin()` [#18159](https://github.com/electron/electron/pull/18159)
 * `Session.clearAuthCache()` již neumožňuje filtrovat vymazané položky mezipaměti. [#17970](https://github.com/electron/electron/pull/17970)
 * Nativní rozhraní na macOS (menu, dialogy atd.) nyní automaticky odpovídají nastavení tmavého režimu na počítači uživatele. [#19226](https://github.com/electron/electron/pull/19226)
 * Aktualizován modul `electron` pro použití `@electron/get`.  Minimální podporovaná verze uzlu je nyní uzel 8. [#18413](https://github.com/electron/electron/pull/18413)
 * Soubor `electron.asar` již neexistuje. Všechny balicí skripty závisející na jeho existenci by měly být aktualizovány. [#18577](https://github.com/electron/electron/pull/18577)

## Konec podpory pro 4.x.y

Electron 4.x.y dosáhl konce podpory v rámci [politiky podpory](https://electronjs.org/docs/tutorial/support#supported-versions). Vývojáři a aplikace jsou vybízeny k aktualizaci na novější verzi Electronu.

## App Feedback Program

Pro testování nadále používáme náš [program zpětné vazby k aplikacím](https://electronjs.org/blog/app-feedback-program) . Projekty, které se účastní tohoto programu testování Electron betas na svých aplikacích; a na oplátku nové chyby mají prioritu pro stabilní vydání. Pokud byste se chtěli zúčastnit nebo se dozvědět více, [podívejte se na náš blogový příspěvek o programu](https://electronjs.org/blog/app-feedback-program).

## Co je další

Z krátkodobého hlediska můžete očekávat, že se tým bude nadále zaměřovat na udržení pokroku při vývoji hlavních komponentů, které tvoří Electron, včetně chromu, niklu a V8. I když jsme opatrní, abychom neslíbili data zveřejnění, Naším plánem je vydání nových hlavních verzí Electronu s novými verzemi těchto komponentů přibližně čtvrtletně. [předběžný plán 8.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapuje klíčová data ve vývojovém životním cyklu Electronu 8. Také [viz náš dokument s verzemi](https://electronjs.org/docs/tutorial/electron-versioning) pro podrobnější informace o verzích v Electronu.

Informace o plánovaných zlomových změnách v nadcházejících verzích Electronu [naleznete v naší Plánované zlomení změn doc](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
