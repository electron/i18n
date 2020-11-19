# DevTools rozšíření

Electron supports the [Chrome DevTools Extension][devtools-extension], which can be used to extend the ability of devtools for debugging popular web frameworks.

## Jak načíst rozšíření DevTools

Tento dokument nastiňuje proces pro ruční načtení rozšíření. Můžete také zkusit [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), nástroj třetí strany, který stahuje rozšíření přímo z Chrome WebStore.

Chcete-li nahrát rozšíření v Electronu, musíte jej stáhnout v prohlížeči Chrome, najděte cestu k souborovému systému a poté ho nahrajte voláním `BrowserWindow. dDevToolsExtension(extension)` API.

Using the [React Developer Tools][react-devtools] as example:

1. Nainstalujte ji do prohlížeče Chrome.
1. Přejděte na `chrome://extensions`a najděte její ID rozšíření, což je hash řetězec jako `fmkadmapgofadopljbjfkapdkoienihi`.
1. Zjistěte umístění souborového systému, které používá Chrome pro ukládání rozšíření:
   * na Windows je `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * na Linuxu může být:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * na macOS je `~/Library/Podpora aplikací/Google/Chrome/Default/Extensions`.
1. Umístěte umístění rozšíření do `BrowserWindow.addDevToolsExtension` API, pro nástroje vývojáře React je to něco jako:

   ```javascript
   cesta ke const = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')

   ```

**Poznámka:** `BrowserWindow.addDevToolsExtension` nelze volat před vypnutím připravené události modulu aplikace.

Rozšíření bude pamatováno, takže toto API budete muset volat pouze jednou na rozšíření . Pokud se pokoušíte přidat rozšíření, které již bylo načteno, tato metoda se nevrátí a místo toho zaznamená varování do konzoly.

### Jak odstranit rozšíření DevTools

Název rozšíření můžete předat `BrowserWindow.removeDevToolsExtension` pro jeho odstranění. Název rozšíření je vrácen `BrowserWindow. ddDevToolsExtension` a můžete získat názvy všech nainstalovaných Rozšíření DevTools pomocí `BrowserWindow.getDevToolsExtensions` API.

## Podporované rozšíření DevTools

Electron podporuje pouze omezenou sadu `chrome.*` API, takže některá rozšíření používají nepodporovaný `chrome.` API pro funkce rozšíření chrome nemusí fungovat. Následující Devtools rozšíření jsou testovány a zaručeny pro práci v Electronu:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Reagovat nástroje vývojáře](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Ladící páteř](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/devtools.html)
* [Redukovat rozšíření nástrojů DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [Nástroje vývojáře MobX](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Co mám dělat, pokud rozšíření DevTools nefunguje?

Nejprve se ujistěte, že rozšíření je stále zachováno, některá rozšíření nemohou fungovat ani pro nedávné verze prohlížeče Chrome a nejsme schopni udělat pro ně nic.

Pak nahlaste chybu do seznamu problémů Electronu a popište, která část rozšíření nefunguje podle očekávání.

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
