# Uso dei moduli nativi di Node

Native Node.js modules are supported by Electron, but since Electron has a different [application binary interface (ABI)](https://en.wikipedia.org/wiki/Application_binary_interface) from a given Node.js binary (due to differences such as using Chromium's BoringSSL instead of OpenSSL), the native modules you use will need to be recompiled for Electron. Altrimenti, otterrai la seguente classe di errore quando provi ad eseguire la tua app:

```sh
Errore: il modulo '/path/to/native/module.node'
è stato compilato con una diversa versione di Node.js usando
NODE_MODULE_VERSION $XYZ. Questa versione di Node.js richiede
NODE_MODULE_VERSION $ABC. Prova a ricompilare o reinstallare
il modulo (per esempio, usando `npm rebuild` o `npm install`).
```

## Come installare moduli nativi

Ci sono diversi modi per installare moduli nativi:

### Installando moduli e ricostruendo per Electron

Puoi installare moduli come altri progetti Nodo e ricostruire i moduli per Electron con il pacchetto [`electron-rebuild`](https://github.com/electron/electron-rebuild). This module can automatically determine the version of Electron and handle the manual steps of downloading headers and rebuilding native modules for your app. If you are using [Electron Forge](https://electronforge.io/), this tool is used automatically in both development mode and when making distributables.

For example, to install the standalone `electron-rebuild` tool and then rebuild modules with it via the command line:

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd
```

For more information on usage and integration with other tools such as [Electron Packager](https://github.com/electron/electron-packager), consult the project's README.

### Usando `npm`

Impostando molte variabili ambiente, puoi usare `npm` per installare moduli direttamente.

Ad esempio, per installare tutte le dipendenze per Electron:

```sh
# Versione di Electron.
export npm_config_target=1.2.3
# L'architettura di Electron, vedi https://electronjs.org/docs/tutorial/support#supported-platforms
# per le architetture supportate.
esporta npm_config_arch=x64
esporta npm_config_target_arch=x64
# Scarica intenstazioni per Electron.
esporta npm_config_disturl=https://electronjs.org/headers
# Dice a node-pre-gyp che stiamo costruendo per Electron.
esporta npm_config_runtime=electron
# Dice a node-pre-gyp di costruire moduli dal codice risorsa.
esporta npm_config_build_from_source=true
# Installa tutte le dipendenze, e archivia cache a ~/.electron-gyp.
HOME=~/.electron-gyp npm installa
```

### Build manuale per Electron

Se stai sviluppando un modulo nativo e vuoi testarlo con Electron, potresti voler ricostruire il modulo per Electron manualmente. Puoi usare direttamente `node-gyp` per costruire per Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` cambia dove trovare le intestazioni di sviluppo.
* `--target=1.2.3` è la versione di Electron.
* `--dist-url=...` specifica dove scaricare le intestazioni.
* `--arch=x64` dice che il modulo è costruito per un sistema a 64 bit.

### Build manuale per una versione personalizzata di Electron

Per compilare moduli nativi Nodo con una build personalizzata di Electron che non corrisponde a una release pubblica, istruisci `npm` ad utilizzare la versione del Nodo che hai fornito con la tua build personalizzata.

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## Risoluzione dei problemi

Se hai installato un modulo nativo e hai trovato che non funzionava, devi controllare le seguenti cose:

* Quando sei in dubbio, esegui prima `electron-rebuild`.
* Assicurati che il modulo nativo sia compatibile con la piattaforma di destinazione e con l'architettura per la tua app Electron.
* Assicurati che `win_delay_load_hook` non sia impostato su `false` nel modulo `binding.gyp`.
* Dopo un aggiornamento di Electron, dovrai spesso ricostruire i moduli.

### Una nota su `win_delay_load_hook`

Su Windows, per impostazione predefinita, `node-gyp` collega moduli nativi contro `node.dll`. Tuttavia, in Electron 4.x e superiore, i simboli necessari per i moduli nativi sono esportati dall'elettronica `. xe`, e non c'è `node.dll`. Per caricare moduli nativi su Windows, `node-gyp` installa un [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) che attiva quando il modulo nativo è caricato, e reindirizza il nodo `. ll` riferimento per usare l'eseguibile di caricamento invece di cercare `nodo. ll` nella ricerca libreria percorso (che non presenterebbe nulla). Come tale, su Electron 4.x e superiore, `'win_delay_load_hook': 'true'` è richiesto per caricare moduli nativi.

Se ottieni un errore del tipo `Module did not self-register`, oppure `The specified
procedure could not be found`, potrebbe significare che il modulo che stai cercando di usare non include correttamente l'hook delay-load.  Se il modulo è costruito con node-gyp, assicurati che la variabile `win_delay_load_hook` sia impostata a `true` in il binding `. file yp` e non viene sovrascritto da nessuna parte.  Se il modulo è costruito con un altro sistema, dovrai assicurarti di costruire con un gancio di ritardo installato nel `principale. file ode`. Il tuo `link.exe` invocation dovrebbe assomigliare a questo:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

In particolare, è importante che:

* link contro `node.lib` da _Electron_ e non Node. Se si collega con il nodo `sbagliato .lib` si otterranno errori di caricamento quando si richiede il modulo in Electron.
* includi la bandiera `/DELAYLOAD:node.exe`. Se il nodo `. xe` link non è ritardato, quindi l'hook del ritardo non avrà la possibilità di sparare e i simboli del nodo non saranno risolti correttamente.
* `win_delay_load_hook.obj` è collegato direttamente alla DLL. Se il gancio è impostato in un DLL, non sparerà al momento giusto.

Vedere [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) per un hook di ritardo ad esempio se stai implementando il tuo.

## Moduli rilevanti su `prebuild`

[`prebuild`](https://github.com/prebuild/prebuild) fornisce un modo per pubblicare moduli nativi Nodo con binari precostruiti per più versioni di Nodo ed Electron.

If the `prebuild`-powered module provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## Moduli rilevanti su `node-pre-gyp`

Lo [strumento `node-pre-gyp`](https://github.com/mapbox/node-pre-gyp) fornisce un modo per implementare i moduli nativi di Node con binari precostruiti e molti moduli popolari lo usano.

Sometimes those modules work fine under Electron, but when there are no Electron-specific binaries available, you'll need to build from source. Because of this, it is recommended to use `electron-rebuild` for these modules.

If you are following the `npm` way of installing modules, you'll need to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.
