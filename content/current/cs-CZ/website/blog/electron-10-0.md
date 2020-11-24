---
title: Electron 10.0.0
author:
  - VerteDinde
  - sofianguy
date: '2020-08-25'
---

Electron 10.0.0 byl vydán! Zahrnuje upgrade na chrom `85`, V8 `8.5`a Node.js `12.16`. Přidali jsme několik nových API integrací a vylepšení. Přečtěte si níže pro více informací!

---

Tým Electron je nadšený oznámit vydání Electronu 10.0.0! Můžete ji nainstalovat pomocí npm přes `npm instalovat electron@latest` nebo stáhnout z našich [webových stránek](https://electronjs.org/releases/stable). Vydání je plněno aktualizacemi, opravami a novými funkcemi.

Ve vydání Electron 10 jsme také změnili naše poznámky k vydání. Aby bylo snazší sdělit, co je zcela nového v Electronu 10 a co se mohlo změnit mezi Electron 10 a minulými vydáními, nyní také zahrnujeme změny, které byly zavedeny do Electronu 10, ale podporovány k předchozím vydáním. Doufáme, že při aktualizaci Electronu bude aplikace snazší najít nové funkce a opravy chyb.

Nemůžeme čekat, co s nimi buduješ! Pokračujte ve čtení podrobností o tomto vydání a prosím sdílejte zpětnou vazbu, kterou máte!

## Významné změny

### Změny zásobníku

* Chrom `85.0.4183.84`
    * [Nově v Chrome 84](https://developers.google.com/web/updates/2020/07/nic84)
    * [Nově v Chrome 85](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [Uzel 12.16.3 blogový příspěvek](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [V8 8.4 blogový příspěvek](https://v8.dev/blog/v8-release-84)
    * [V8 8.5 blogový příspěvek](https://v8.dev/blog/v8-release-85)

### Zvýraznit funkce

* Přidána `contents.getBackgroundThrottling()` metoda a `contents.backgroundThrottling`. [#21036]
* Exposed the `desktopCapturer` module in the main process. [#23548](https://github.com/electron/electron/pull/23548)
* Nyní může zkontrolovat, zda je daná `relace` trvalá voláním `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* Vyřešte síťové problémy, které zabránily připojení RTC hovorů kvůli změnám síťových IP adres a ICE. (otázka chromu 1113227). [#24998](https://github.com/electron/electron/pull/24998)

Kompletní seznam nových funkcí a změn naleznete v poznámkách [10.0.0](https://github.com/electron/electron/releases/tag/v10.0.0).

## Breaking Changes

* Změněna výchozí hodnota `enableRemoteModule` na `false`. [#22091](https://github.com/electron/electron/pull/22091)
    * Toto je součást našich plánů na zrušení `vzdáleného` modulu a přesunutí do uživatelského území. Můžete si přečíst a sledovat [tento problém](https://github.com/electron/electron/issues/21408) , který podrobně popisuje naše důvody a obsahuje navrhovanou časovou osu pro zastaralost.
* Změnil výchozí hodnotu `app.allowRenderProcessReuse` na `true`. [#22336](https://github.com/electron/electron/pull/22336) (také v [Electron 9](https://github.com/electron/electron/pull/22401))
   * To zabrání načítání nativních modulů, které nejsou v kontextu, v procesu vykreslování.
   * Můžete si přečíst a sledovat [tento problém](https://github.com/electron/electron/issues/18397) , který podrobně popisuje naše důvody a obsahuje navrhovanou časovou osu pro zastaralost.
* Opraveno umístění oken tlačítek na macOS když je operační prostředí nastaveno na RTL jazyk (jako arabský nebo hebrejský). Aplikace bez snímků musí tuto změnu při stylu svých oken zaúčtovat. [#22016](https://github.com/electron/electron/pull/22016)

Více informací o těchto a budoucích změnách naleznete na stránce [Plánované změny zlomu](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Změny API

* Relace: Nyní může zkontrolovat, zda je daná `relace` trvalá voláním `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* Obsah: Přidána `contents.getBackgroundThrottling() metoda` a `contents.backgroundThrottling`. [#21036](https://github.com/electron/electron/pull/21036)

### Zastaralá API

Následující API jsou nyní zastaralé nebo odstraněny:

* Odstranil zastaralou `aktuálníLoggingPath` vlastnost `netLog`. Navíc `netLog.stopLogging` již nevrací cestu k záznamu záznamu. [#22732](https://github.com/electron/electron/pull/22732)
* Zastaralé nekomprimované nahrávání chyb v `crashReporter`. [#23598](https://github.com/electron/electron/pull/23598)

## Konec podpory pro 7.x.y

Electron 7.x.y dosáhl konce podpory podle [politiky podpory projektu](https://electronjs.org/docs/tutorial/support#supported-versions). Vývojáři a aplikace jsou vybízeny k aktualizaci na novější verzi Electronu.

## Co je další

Z krátkodobého hlediska můžete očekávat, že se tým bude nadále zaměřovat na udržení pokroku při vývoji hlavních komponentů, které tvoří Electron, včetně chromu, niklu a V8. I když jsme opatrní, abychom neslíbili data zveřejnění, Naším plánem je vydání nových hlavních verzí Electronu s novými verzemi těchto komponentů přibližně čtvrtletně. [předběžný plán 11.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapuje klíčová data ve vývojovém životním cyklu Electronu 11.0. Také [viz náš dokument s verzemi](https://electronjs.org/docs/tutorial/electron-versioning) pro podrobnější informace o verzích v Electronu.

Informace o plánovaných zlomových změnách v nadcházejících verzích Electronu [naleznete v naší Plánované zlomení změn doc](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Pokračovat v práci pro deprese `vzdáleného` modulu (v Electronu 11)
Začali jsme pracovat na odstranění vzdáleného modulu v [Electron 9](https://www.electronjs.org/blog/electron-9-0) a nadále plánujeme odstranit modul `vzdálený`. V Electronu 11 plánujeme pokračovat v refaktoru práce pro implementaci [WeakRef](https://v8.dev/features/weak-references) , jak jsme to udělali v Electronu 10. Přečtěte si a sledujte [tento problém](https://github.com/electron/electron/issues/21408) pro kompletní plány a podrobnosti pro deprecaci.

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 12)
_Edit: Originally, this blog post stated that we would disable renderer process reuse in Electron 11. Disabling renderer process reuse has now been pushed to Electron 12._

From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 12. Read [this issue](https://github.com/electron/electron/issues/18397) for full details including the proposed timeline.
