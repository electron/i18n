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

Se stai sviluppando un modulo nativo e vuoi testarlo contro Electron, potresti voler ricostruire il modulo per Electron manualmente. You can use `node-gyp` directly to build for Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

The `HOME=~/.electron-gyp` changes where to find development headers. The `--target=1.2.3` is version of Electron. The `--dist-url=...` specifies where to download the headers. The `--arch=x64` says the module is built for 64bit system.

## Risoluzione dei problemi

If you installed a native module and found it was not working, you need to check following things:

* The architecture of the module has to match Electron's architecture (ia32 or x64).
* After you upgrade Electron, you usually need to rebuild the modules.
* When in doubt, run `electron-rebuild` first.

## Modules that rely on `prebuild`

[`prebuild`](https://github.com/mafintosh/prebuild) provides a way to easily publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

If modules provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## Modules that rely on `node-pre-gyp`

The [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node, and there are ABI changes, bad things may happen. So in general it is recommended to always build native modules from source code.

If you are following the `npm` way of installing modules, then this is done by default, if not, you have to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.