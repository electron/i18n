# Uso dei moduli nativi di Node

I moduli del nodo nativo sono supportati da Electron, ma dato che Electron è molto probabile che utilizzi una diversa versione V8 dal binario Nodo installato sul tuo sistema , i moduli che utilizzi dovranno essere ricompilati per Electron. Altrimenti, otterrai la seguente classe di errore quando provi ad eseguire la tua app:

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

You can install modules like other Node projects, and then rebuild the modules for Electron with the [`electron-rebuild`][electron-rebuild] package. Questo modulo può determinare automaticamente la versione di Electron e gestire i passaggi manuali di download delle intestazioni e ricostruire i moduli nativi per la tua app.

Ad esempio, per installare `electron-rebuild` e ricostruire i moduli con esso tramite la riga di comando:

```sh
npm install --save-dev electron-rebuild

# Ogni volta che esegui "npm installa", esegui:
./node_modules/.bin/electron-rebuild

# Su Windows se hai problemi, prova:
.\node_modules\.bin\electron-rebuild.cmd
```

Per ulteriori informazioni sull'utilizzo e l'integrazione con altri strumenti, consultare il README del progetto .

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

- link contro `node.lib` da _Electron_ e non Node. Se si collega con il nodo `sbagliato .lib` si otterranno errori di caricamento quando si richiede il modulo in Electron.
- includi la bandiera `/DELAYLOAD:node.exe`. Se il nodo `. xe` link non è ritardato, quindi l'hook del ritardo non avrà la possibilità di sparare e i simboli del nodo non saranno risolti correttamente.
- `win_delay_load_hook.obj` è collegato direttamente alla DLL. Se il gancio è impostato in un DLL, non sparerà al momento giusto.

Vedere [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) per un hook di ritardo ad esempio se stai implementando il tuo.

## Moduli rilevanti su `prebuild`

[`prebuild`](https://github.com/prebuild/prebuild) fornisce un modo per pubblicare moduli nativi Nodo con binari precostruiti per più versioni di Nodo ed Electron.

Se i moduli forniscono binari per usarli in Electron, assicurati di omettere `--build-from-source` e l'ambiente variabile `npm_config_build_from_source` per prendere pieno vantaggio dai binari precostruiti.

## Moduli rilevanti su `node-pre-gyp`

Lo [strumento `node-pre-gyp`][node-pre-gyp] fornisce un modo per implementare i moduli nativi di Node con binari precostruiti e molti moduli popolari lo usano.

Di solito quei moduli funzionano bene sotto Electron, ma a volte quando Electron utilizza una versione più recente di V8 rispetto al Nodo e/o ci sono cambiamenti ABI, le cose cattive possono accadere. Quindi, in generale, si consiglia di costruire sempre moduli nativi dal codice sorgente. `electron-rebuild` gestisce questo per te automaticamente.

Se stai seguendo il metodo di installazione moduli `npm`, questo sarà fatto di default, altrimenti devi passare `--build-from-source` a `npm` o impostare la variabile ambiente `npm_config_build_from_source`.

[electron-rebuild]: https://github.com/electron/electron-rebuild
[node-pre-gyp]: https://github.com/mapbox/node-pre-gyp
