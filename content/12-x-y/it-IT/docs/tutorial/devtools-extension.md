# Estensione DevTools

Electron supporta l'[Estensione StrumentiDispositivo Chrome][devtools-extension] che può essere usata per estendere l'abilità degli strumenti dispositivo per il debugging di popolari framework del web.

## Come caricare un'Estensione StrumentiDispositivo

Questo documento descrive come caricare manualmente un'estensione. Puoi anche provare [installatore-strumentidispositivo-electron](https://github.com/GPMDP/electron-devtools-installer), uno strumento di terze parti che scarica estensioni direttamente dal Negozio Web di Chrome.

Per caricare un'estensione in Electron, devi scaricarla nel browser di Chrome, localizzarne il percorso nei file di sistema e caricarli chiamando l'API `BrowserFinestra.aggiungiEstensioneStrumentoDispositivo(estensione)`.

Usando gli [Strumenti Reazione Sviluppatore][react-devtools] per esempio:

1. Installalo nel browser Chrome.
1. Naviga a `chrome://estensioni` e trova l'ID estensione che ha una stringa come `fmkadmapgofadopljbjfkapdkoienihi`.
1. Trova la posizione file di sistema usata da Chrime per immagazzinare estensioni:
   * su Windows è `%LOCALAPPDATA%\Google\Chrome\DatiUtente\Predefinito\Estensioni`;
   * su Linux potrebbe essere:
     * `~/.config/googe-chrome/Predefinito/Estensioni/`
     * `~/.config/google-chrome-beta/Predefinito/Estensioni/`
     * `~config/google-chrome-canary/Predefinito/Estensioni/`
     * `~/.config/chromium/Default/Extensions/`
   * su macOS è `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Passa la posizione dell'estensione a `BrowserWindow.addDevToolsExtension` API, per React Developer Tools, è qualcosa come:

   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')
)
   ```

**Nota:** L'API `BrowserWindow.addDevToolsExtension` non può essere chiamata prima dell'emissione dell'evento pronto del modulo app.

L'estensione verrà ricordata in modo da è necessario chiamare questa API solo una volta per estensione . Se si tenta di aggiungere un'estensione che è già stata caricata, questo metodo non restituirà e invece registra un avviso alla console.

### Come rimuovere un'estensione DevTools

Puoi passare il nome dell'estensione all'API `BrowserWindow.removeDevToolsExtension` per rimuoverla. Il nome dell'estensione viene restituito da `BrowserWindow. ddDevToolsExtension` e puoi ottenere i nomi di tutte le estensioni installate DevTools utilizzando l'API `BrowserWindow.getDevToolsExtensions`.

## Estensioni DevTools Supportate

Electron supporta solo un insieme limitato di `chrome.*` API, quindi alcune estensioni usando il cromo `non supportato.` Le API per le funzionalità di estensione cromata potrebbero non funzionare. I seguenti Devtools Extensions sono testati e garantiti per funzionare in Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Debug Backbone](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Debugger Cerebrale](https://cerebraljs.com/docs/introduction/devtools.html)
* [Estensione DevTools Redux](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Cosa devo fare se un'estensione DevTools non funziona?

Per prima cosa, assicurati che l'estensione sia ancora in corso, alcune estensioni non può nemmeno funzionare per le versioni recenti del browser Chrome, e non siamo in grado di fare nulla per loro.

Quindi file un bug nella lista dei problemi di Electron, e descrivere quale parte dell'estensione non funziona come previsto.

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
