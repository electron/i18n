# Uso dei moduli nativi di Node

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed on your system, the modules you use will need to be recompiled for Electron. Otherwise, you will get the following class of error when you try to run your app:

```sh
Error: The module '/path/to/native/module.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION $XYZ. This version of Node.js requires
NODE_MODULE_VERSION $ABC. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

## Come installare moduli nativi

There are several different ways to install native modules:

### Installando moduli e ricostruendo per Electron

You can install modules like other Node projects, and then rebuild the modules for Electron with the [`electron-rebuild`](https://github.com/electron/electron-rebuild) package. This module can automatically determine the version of Electron and handle the manual steps of downloading headers and rebuilding native modules for your app.

For example, to install `electron-rebuild` and then rebuild modules with it via the command line:

```sh
npm install --save-dev electron-rebuild

# Ogni volta che esegui "npm installa", esegui:
./node_modules/.bin/electron-rebuild

# Su Windows se hai problemi, prova:
.\node_modules\.bin\electron-rebuild.cmd
```

For more information on usage and integration with other tools, consult the project's README.

### Usando `npm`

Impostando molte variabili ambiente, puoi usare `npm` per installare moduli direttamente.

For example, to install all dependencies for Electron:

```sh
# Versione di Electron.
export npm_config_target=1.2.3
# The architecture of Electron, see https://electronjs.org/docs/tutorial/support#supported-platforms
# for supported architectures.
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

* `HOME=~/.electron-gyp` changes where to find development headers.
* `--target=1.2.3` is the version of Electron.
* `--dist-url=...` specifies where to download the headers.
* `--arch=x64` says the module is built for a 64-bit system.

### Build manuale per una versione personalizzata di Electron

To compile native Node modules against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## Risoluzione dei problemi

If you installed a native module and found it was not working, you need to check the following things:

* Quando sei in dubbio, esegui prima `electron-rebuild`.
* Make sure the native module is compatible with the target platform and architecture for your Electron app.
* Make sure `win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.
* Dopo un aggiornamento di Electron, dovrai spesso ricostruire i moduli.

### A note about `win_delay_load_hook`

On Windows, by default, `node-gyp` links native modules against `node.dll`. However, in Electron 4.x and higher, the symbols needed by native modules are exported by `electron.exe`, and there is no `node.dll`. In order to load native modules on Windows, `node-gyp` installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

Se ottieni un errore del tipo `Module did not self-register`, oppure `The specified
procedure could not be found`, potrebbe significare che il modulo che stai cercando di usare non include correttamente l'hook delay-load.  If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere.  If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

In particular, it's important that:

- you link against `node.lib` from _Electron_ and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
- you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
- `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## Moduli rilevanti su `prebuild`

[`prebuild`](https://github.com/prebuild/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

Se i moduli forniscono binari per usarli in Electron, assicurati di omettere `--build-from-source` e l'ambiente variabile `npm_config_build_from_source` per prendere pieno vantaggio dai binari precostruiti.

## Moduli rilevanti su `node-pre-gyp`

Lo [strumento `node-pre-gyp`](https://github.com/mapbox/node-pre-gyp) fornisce un modo per implementare i moduli nativi di Node con binari precostruiti e molti moduli popolari lo usano.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node and/or there are ABI changes, bad things may happen. So in general, it is recommended to always build native modules from source code. `electron-rebuild` handles this for you automatically.

Se stai seguendo il metodo di installazione moduli `npm`, questo sarà fatto di default, altrimenti devi passare `--build-from-source` a `npm` o impostare la variabile ambiente `npm_config_build_from_source`.
