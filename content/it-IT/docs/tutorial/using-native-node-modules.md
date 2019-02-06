# Uso dei moduli nativi di Node

I moduli nativi di Node sono supportati da Electron, ma dal momento che Electron usa una versione differente di V8 da quella presente nei binari Node installati nel tuo sistema, hai bisogno di specificare manualmente la posizione degli header di Electron quando esegui il build dei moduli nativi.

## Come installare moduli nativi

Tre modi per installare moduli nativi:

### Usando `npm`

Impostando molte variabili ambiente, puoi usare `npm` per installare moduli direttamente.

Un esempio di installazione di tutte le dipendenze per Electron:

```sh
# Versione di Electron.
esporta npm_configura_target=1.2.3
# L'architettura di Electron può essere ia32 o x64.
esporta npm_config_arch=x64
esporta npm_config_target_arch=x64
# Scarica intenstazioni per Electron.
esporta npm_config_disturl=https://atom.io/download/electron
# Dice a node-pre-gyp che stiamo costruendo per Electron.
esporta npm_config_runtime=electron
# Dice a node-pre-gyp di costruire moduli dal codice risorsa.
esporta npm_config_build_from_source=true
# Installa tutte le dipendenze, e archivia cache a ~/.electron-gyp.
HOME=~/.electron-gyp npm installa
```

### Installando moduli e ricostruendo per Electron

Puoi anche scegliere di installare moduli come altri progetti Node e poi ricostruire i moduli per Electron con il pacchetto [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild). Questo modulo può ottenere la versione di Electron ed occuparsi dei passi manuali di download degli headers e ricostruire i moduli nativi per la tua app.

Un esempio di installazione di `electron-rebuild` e ricostruzione dei moduli:

```sh
npm install --save-dev electron-rebuild

# Ogni volta che esegui "npm installa", esegui:
./node_modules/.bin/electron-rebuild

# Su Windows se hai problemi, prova:
.\node_modules\.bin\electron-rebuild.cmd
```

### Build manuale per Electron

Se stai sviluppando un modulo nativo e vuoi testarlo con Electron, potresti voler ricostruire il modulo per Electron manualmente. Puoi usare direttamente `node-gyp` per costruire per Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

`HOME=~/.electron-gyp` cambia dove trovare le intestazioni di sviluppo. `--target=1.2.3` è la versione di Electron. `--dist-url=...` specifica dove scaricare le intestazioni. `--arch=x64` dice che il modulo è costruito per sistemi a 64 bit.

### Build manuale per una versione personalizzata di Electron

Per compilare dei moduli aggiuntivi Node per una build personalizzata di Electron che non corrisponde ad un versione pubblica, bisogna indicare ad `npm` di usare la versione di Node che hai incluso nella tua build personalizzata.

```sh
npm rebuild --nodedir=$HOME/.../path/to/electron/vendor/node
```

## Risoluzione dei problemi

Se hai installato un modulo nativo ed hai trovato che non fosse funzionante, devi controllare le seguenti cose:

- L'architettura del modulo deve corrispondere con quella di Electron (ia32 o x64).
- `win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.
- Dopo un aggiornamento di Electron, dovrai spesso ricostruire i moduli.
- Quando sei in dubbio, esegui prima `electron-rebuild`.

### A note about `win_delay_load_hook`

On Windows, by default, node-gyp links native modules against `node.dll`. However, in Electron 4.x and higher, the symbols needed by native modules are exported by `electron.exe`, and there is no `node.dll` in Electron 4.x. In order to load native modules on Windows, node-gyp installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

Se ottieni un errore del tipo `Module did not self-register`, oppure `The specified
procedure could not be found`, potrebbe significare che il modulo che stai cercando di usare non include correttamente l'hook delay-load. If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere. If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```text
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

In particular, it's important that:

- you link against `node.lib` from *Electron* and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
- you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
- `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [node-gyp](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## Moduli rilevanti su `prebuild`

[`prebuild`](https://github.com/mafintosh/prebuild) fornisce un modo di pubblicare moduli nativi di Node con i binari già compilati per versioni multiple di Node ed Electron.

Se i moduli forniscono binari per usarli in Electron, assicurati di omettere `--build-from-source` e l'ambiente variabile `npm_config_build_from_source` per prendere pieno vantaggio dai binari precostruiti.

## Moduli rilevanti su `node-pre-gyp`

Lo [strumento `node-pre-gyp`](https://github.com/mapbox/node-pre-gyp) fornisce un modo per implementare i moduli nativi di Node con binari precostruiti e molti moduli popolari lo usano.

Spesso questi moduli lavorano bene sotto Electron, ma a volte quando Electron usa una nuova versione di V8 e ci sono cambiamenti ABI, posso succedere brutte cose. Quindi in generale si raccomanda di costruire sempre moduli nativi dal codice risorsa.

Se stai seguendo il metodo di installazione moduli `npm`, questo sarà fatto di default, altrimenti devi passare `--build-from-source` a `npm` o impostare la variabile ambiente `npm_config_build_from_source`.