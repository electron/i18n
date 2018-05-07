# Uso dei moduli nativi di Node

I moduli nativi di Node sono supportati da Electron, che usa però una versione V8 differente dal Node binario installato nel tuo sistema, devi specificare manualmente la posizione delle intestazioni di Electron quando crei moduli nativi.

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

Puoi anche scegliere di installare moduli come altri progetti Node e poi ricostruire i moduli per Electron con il pacchetto [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild). Questo modulo può ottenere la versione di Electron e superare i passi manuali di download intestazioni e costruendo moduli nativi per la tua app.

Un esempio di installazione di `electron-rebuild` e poi ricostruzione dei moduli con questo:

```sh
npm install --save-dev electron-rebuild

# Ogni volta che esegui "npm installa", esegui:
./node_modules/.bin/electron-rebuild

# Su Windows se hai problemi, prova:
.\node_modules\.bin\electron-rebuild.cmd
```

### Costruzione manuale per Electron

Se stai sviluppando un modulo nativo e vuoi testarlo contro Electron, potresti voler ricostruire il modulo per Electron manualmente. Puoi usare direttamente `node-gyp` per costruire per Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

`HOME=~/.electron-gyp` cambia dove trovare le intestazioni di sviluppo. `--target=1.2.3` è la versione di Electron. `--dist-url=...` specifica dove scaricare le intestazioni. `--arch=x64` dice che il modulo è costruito per sistemi a 6 bit.

## Risoluzione dei problemi

Se hai installato un modulo nativo ed hai trovato che non fosse funzionante, devi controllare le seguenti cose:

* L'architettura del modulo deve corrispondere con quella di Electron (ia32 o x64).
* Dopo il tuo aggiornamento di Electron, dovrai spesso ricostruire i moduli.
* Quando in dubbio, esegui prima `electron-rebuild`.

## Moduli rilevanti su `prebuild`

[`prebuild`](https://github.com/mafintosh/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

Se i moduli forniscono binari per usarli in Electron, assicurati di omettere `--build-from-source` e l'ambiente variabile `npm_config_build_from_source` per prendere pieno vantaggio dai binari precostruiti.

## Moduli rilevanti su `node-pre-gyp`

Lo [strumento `node-pre-gyp`](https://github.com/mapbox/node-pre-gyp) fornisce un modo per implementare i moduli nativi di Node con binari precostruiti e molti moduli popolari lo usano.

Spesso questi moduli lavorano bene sotto Electron, ma a volte quando Electron usa una nuova versione di V8 e ci sono cambiamenti ABI, posso succedere brutte cose. Quindi in generale si raccomanda di costruire sempre moduli nativi dal codice risorsa.

Se stai seguendo il metodo di installazione moduli `npm`, questo sarà fatto di default, altrimenti devi passare `--build-from-source` a `npm` o impostare la variabile ambiente `npm_config_build_from_source`.