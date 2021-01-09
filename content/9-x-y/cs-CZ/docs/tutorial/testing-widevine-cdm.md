# Testování širokého CDM

V Electronu můžete použít widevine CDM knihovnu dodávanou s prohlížečem Chrome.

Widevine Content Decryption Moduly (CDM), jak streamovací služby chrání obsah pomocí HTML5 videa do webových prohlížečů, aniž by se spoléhaly na plugin NPAPI , jako je Flash nebo Silverlight. Widevine support is an alternative solution for streaming services that currently rely on Silverlight for playback of DRM-protected video content. Umožní webům zobrazit video chráněné DRM obsah ve Firefoxu bez použití NPAPI pluginů. Widevine CDM běží v open-source CDM sandboxu, který poskytuje lepší bezpečnost uživatelů než NPAPI pluginy.

#### Poznámka k VMP

Od [`Electron v1.8. (Chrome v59)`](https://electronjs.org/releases#1.8.1), níže uvedené kroky mohou být jen některé z nezbytných kroků pro umožnění widevinu; každá aplikace, která je aktivní nebo má v úmyslu používat Widevine CDM, bude muset být podepsána pomocí licence získané od [Widevine](https://www.widevine.com/) .

Na [Widevine](https://www.widevine.com/):

> Chrome 59 (a novější) zahrnuje podporu pro cestu k ověřeným médiím (VMP). VMP poskytuje metodu pro ověření pravosti platformy zařízení. Pro nasazení prohlížeče to poskytne další signál k určení, zda je implementace prohlížeče spolehlivá a bezpečná.
> 
> Proxy integrační příručka byla aktualizována s informacemi o VMP a jak vydávat licence.
> 
> Widevine doporučuje naše integrace založené na prohlížeči (dodavatelé a aplikace založené na prohlížeči) přidat podporu pro VMP.

Chcete-li povolit přehrávání videa s tímto novým omezením, [castLabs](https://castlabs.com/open-source/downstream/) vytvořil [vidlice](https://github.com/castlabs/electron-releases) , která implementovala potřebné změny, aby widevine mohl hrát v aplikaci Electron, pokud získal potřebné licence z widevu.

## Získávání knihovny

Otevřít `chrome://components/` v prohlížeči Chrome, najít `modul pro dešifrování obsahu` a ujistěte se, že je aktuální, pak můžete najít soubory knihovny z adresáře aplikace .

### Na Windows

Soubor knihovny `widevinecdm.dll` bude pod `Programové soubory (x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86|x64)/` složkou.

### Na platformě macOS

Soubor knihovny `libwidevinecdm.dylib` bude pod `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/` .

**Poznámka:** Ujistěte se, že verze chromu používaná Electronem je větší nebo rovna hodnotě `min_chrome_version` složky Chrome's widevine cdm. Hodnota může být nalezena v adresáři `manifest.json` pod adresářem `WidevineCdm`.

## Použití knihovny

Po získání souborů knihovny byste měli předat cestu k souboru pomocí příkazového přepínače řádků `--widevine-cdm-` , and the library's version with `--widevine-cdm-version` switch. Přepínače příkazové řádky musí být předány předtím, než se zapne modul `připravená` událost `aplikace`.

Příkladový kód:

```javascript
const { app, BrowserWindow } = required ('electron')

// Musíte projít adresář, který zde obsahuje widevine knihovnu, je
// * `libwidevinecdm. ylib` na macOS,
// * `widevinecdm.dl` na Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// Verze pluginu může být získána ze stránky `chrome://components` v Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.whenReady().then(() => {
  win = new BrowserWindow()
  win.show()
})
```

## Ověření widevine podpory CDM

Pro ověření, zda funguje wideve, můžete použít následující způsoby:

* Otevřete https://shaka-player-demo.appspot.com/ a načtěte manifest, který používá `Widevine`.
* Otevřete http://www.dash-player.com/demo/drm-test-area/, zkontrolujte, zda stránka říká `bitdash používá Widevine ve vašem prohlížeči`, pak přehrajte video.
