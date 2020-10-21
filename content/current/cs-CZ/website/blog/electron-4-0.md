---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

Tým Electron je nadšený oznámit, že stabilní vydání Electronu 4 je nyní k dispozici! Můžete ji nainstalovat z [electronjs.org](https://electronjs.org/) nebo z npm pomocí `npm install electron@latest`. Vydání je plněno aktualizacemi, opravami a novými funkcemi a nemůžeme čekat na to, co s nimi vytvoříte. Přečtěte si více informací o této verzi a prosím sdílejte zpětnou vazbu, kterou máte při zkoumání!

---

## Co je nového?

Velkou část funkce Electronu zajišťuje Chromium, Node.js a V8, základní komponenty, které tvoří Electron. Klíčovým cílem týmu Electronu je proto co nejvíce držet krok se změnami těchto projektů, poskytuje vývojářům, kteří vytvářejí Electron aplikace přístup k novým funkcím webu a JavaScriptu. Za tímto účelem Electron 4 obsahuje hlavní verze pro každou z těchto komponent; Electron v4.0.0 zahrnuje Chromium `69. .3497.106`, uzel `10.11.0`a V8 `6.9.427.24`.

Elektron 4 navíc zahrnuje změny v API specifické pro elektroniku. Shrnutí hlavních změn v Electronu 4 můžete najít níže; pro úplný seznam změn se podívejte na [Electron v4. .0 poznámky k vydání](https://github.com/electron/electron/releases/tag/v4.0.0).

### Vypínání `vzdáleného` modulu

Nyní máte z bezpečnostních důvodů možnost zakázat modul `vzdálený`. Modul může být zakázán pro značky `BrowserWindow`a pro `webview`:

```javascript
// BrowserWindow
new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})

// webview tag
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Pro více informací viz dokumentaci [BrowserWindow](https://electronjs.org/docs/api/browser-window) a [`<webview>` štítek](https://electronjs.org/docs/api/webview-tag).

### Filtrování `na dálku.require()` / `na dálku.getGlobal()` Žádosti

Tato funkce je užitečná, pokud nechcete zcela vypnout vzdálený `` modul ve vašem procesu vykreslování nebo `webview` , ale chtěli byste další kontrolu nad tím, které moduly mohou být vyžadovány přes `dálkový ovladač. equire`.

When a module is required via `remote.require` in a renderer process, a `remote-require` event is raised on the [`app` module](https://electronjs.org/docs/api/app). Můžete zavolat `event.preventDefault()` na událost (první argument), aby se zabránilo načítání modulu. [`WebContent` instance](https://electronjs.org/docs/api/web-contents) , kde došlo k vyžadování je předána jako druhý argument, a název modulu je předán jako třetí argument. Stejná událost je také emitována na instanci `WebContent` ale v tomto případě jsou pouze argumenty události a název modulu. V obou případech můžete vrátit vlastní hodnotu nastavením hodnoty `event.returnValue`.

```javascript
// Ovládání `remote.require` ze všech WebContents:
app.on('remote-require', funkce (event webContents, requestedModuleName) {
  // ...
})

// Ovládání `remote.require` z konkrétní instance WebContents:
browserWin.webContents.on('remote-require', funkce (event requestedModuleName) {
  // ...
})
```

Podobným způsobem, když se nazývá `vzdálený.getGlobal(name)` , je zvýšena událost `dálkový-get-global`. Toto funguje stejným způsobem jako událost `dálkově vyžadované` : zavolat `preventivně výchozímu nastavení()` , aby se zabránilo návratu celého světa, a nastavit `událost. eturnValue` pro vrácení vlastní hodnoty.

```javascript
// Ovládání `remote.getGlobal` ze všech WebContents:
app.on('remote-get-global', funkce (event webContents, requrestedGlobalName) {
  // ...
})

// Ovládání `remote.getGlobal` z konkrétní instance WebContents:
browserWin.webContents.on('remote-get-global', funkce (event requestedGlobalName) {
  // ...
})
```

Další informace naleznete v této dokumentaci:

* [`remote.require`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`"remote.getGlobal`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`appka`](https://electronjs.org/docs/api/app)
* [`Webový obsah`](https://electronjs.org/docs/api/web-contents)

### Přístup JavaScriptu k panelu O aplikaci

Na macOS můžete nyní zavolat `aplikaci. howAboutPanel()` na programové zobrazení panelu O aplikaci, stejně jako kliknutí na položku nabídky vytvořenou prostřednictvím `{role: 'about'}`. See the [`showAboutPanel` documentation](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos) for more information

### Ovládání `WebContent` Probíhá na pozadí

`WebContent` instance nyní mají metodu `setBackgroundThrottling(povoleno)` pro povolení nebo zakázání překlopení časovačů a animací, pokud je stránka pozadí.

```javascript
let win = nový BrowserWindow(...)
win.webContents.setBackgroundThrottling(enableBackgroundThrottling)
```

Více informací naleznete v [ `setBackgroundThrottling` dokumentaci](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed).

## Breaking Changes

### Žádná další podpora macOS 10.9

Chromium již nepodporuje macOS 10.9 (OS X Mavericks), a proto [Electron 4.0 a další nepodporuje ani](https://github.com/electron/electron/pull/15357).

### Uzamčení jediné instance

Dříve uděláte aplikaci jednu instanci (zajišťuje, že v danou chvíli běží pouze jedna instance aplikace), můžete použít `aplikaci. Metoda akeSingleInstance()`. Počínaje Electron 4.0, musíte místo toho použít `app.requestSingleInstanceLock()`. Návratová hodnota této metody označuje, zda tato instance vaší aplikace byla úspěšně načtena. Pokud se nepodařilo uzamknout, můžete předpokládat, že jiná instance aplikace již běží s zámkem a okamžitě se ukončí.

Příklad používání `requestSingleInstanceLock()` a informací o nuancovaném chování na různých platformách, [viz dokumentaci pro `aplikaci. equestSingleInstanceLock()` a související metody](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) a [ `druhé instance` událost](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

Při vytváření nativních modulů pro okna musí být proměnná `win_delay_load_hook` v modulu `binding.gyp` pravdivá (což je výchozí). Pokud tento háček není přítomen, pak se původní modul nezdaří načíst v systému Windows, s chybovou zprávou, jako je `Nelze najít modul`. [Více informací naleznete v průvodci nativním modulem](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook).

## Deprese

Pro Electron 5.0 jsou plánovány následující zlomové změny, a proto jsou zastaralé v Electronu 4.0.

### Node.js integrace zakázána pro `nativeWindowOpen`-ed Windows

Počínaje Electron 5.0, dětská okna otevřená s možností `nativeWindowOpen` budou mít vždy vypnutou integraci Node.js.

### `Nastavení webu` Výchozí hodnoty

Při vytváření nové možnosti `BrowserWindow` s nastavenou volbou `webPreferences` , výchozí nastavení `webPreferences` je zastaralé ve prospěch nových výchozích nastavení:

<div class="table table-ruled table-full-width">

| Vlastnost | Zastaralá výchozí | Nová výchozí |
|----------|----------------------------|-------------|
| `contextIsolation` | `false` | `true` |
| `nodeIntegration` | `true` | `false` |
| `webviewTag` | hodnota `nodeIntegration` je-li nastavena, jinak `true` | `nepravda` |

</div>

Upozornění: v současné době existuje [známá chyba (#9736)](https://github.com/electron/electron/issues/9736) , která zabrání fungování tagu `webview` , pokud je zapnut `contextIsolation`. Sledujte problém GitHub pro aktuální informace!

Další informace o izolaci kontextu, integraci uzlu a značce `webview` v [Electron security document](https://electronjs.org/docs/tutorial/security).

Electron 4.0 bude stále používat aktuální výchozí nastavení, ale pokud pro ně nevyberete explicitní hodnotu, uvidíte upozornění na zastaralé. Chcete-li připravit vaši aplikaci pro Electron 5.0, použijte explicitní hodnoty pro tyto možnosti. [See the `BrowserWindow` docs](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) for details on each of these options.

### `webContents.findInPage(text[, možnosti])`

Možnosti `medialCapitalAsWordStart` a `wordStart` byly zastaralé, protože byly odstraněny proti streamu.

## App Feedback Program

[Program zpětné vazby v aplikacích](https://electronjs.org/blog/app-feedback-program) , který jsme zavedli během vývoje Electronu 3. byl úspěšný, takže jsme pokračovali i během vývoje 4.0. Rádi bychom rozšířili masivní poděkování Atlassian, Discord, MS Teams, OpenFin, Slack, Symphone, WhatsApp a další členové programu za jejich účast během 4. cyklus beta. Chcete-li se dozvědět více o App Feedback Programu a účastnit se budoucích betas, [podívejte se na náš blog příspěvek o programu](https://electronjs.org/blog/app-feedback-program).

## Co je další

Z krátkodobého hlediska můžete očekávat, že se tým bude nadále zaměřovat na udržení pokroku při vývoji hlavních komponentů, které tvoří Electron, včetně chromu, niklu a V8. I když jsme opatrní, abychom neslíbili data zveřejnění, Naším plánem je vydání nových hlavních verzí Electronu s novými verzemi těchto komponentů přibližně čtvrtletně. [Pro podrobnější informace o verzích v Electronu viz náš dokument](https://electronjs.org/docs/tutorial/electron-versioning).

Informace o plánovaných zlomových změnách v nadcházejících verzích Electronu [naleznete v naší Plánované zlomení změn doc](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
