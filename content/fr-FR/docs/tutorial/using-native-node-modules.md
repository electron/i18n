# Utiliser Modules Natifs de Node

Les modules natifs de Node sont pris en charge par Electron, mais étant donné qu'Electron est très susceptible d'utiliser une version V8 différente du binaire Node installée sur votre système, les modules que vous utiliserez devront être recompilés pour Electron. Sinon, vous obtiendrez l'erreur de classe suivante lorsque vous essaierez d'exécuter votre application :

```sh
Erreur : Le module '/path/to/native/module.node'
a été compilé avec une version de Node.js différente en utilisant
NODE_MODULE_VERSION $XYZ. Cette version de Node.js nécessite
NODE_MODULE_VERSION $ABC. Veuillez essayer de re-compiler ou de réinstaller
le module (par exemple, en utilisant `npm rebuild` ou `npm install`).
```

## Comment installer des modules natifs

Il y a plusieurs façons d'installer des modules natifs :

### Installation et compilation de modules pour Electron

Vous pouvez choisir d'installer les modules comme les autres projets Node, puis recompiler les modules pour Electron avec le paquet [`electron-rebuild`](https://github.com/electron/electron-rebuild). Ce module peut automatiquement obtenir la version d'Electron et gérer les étapes manuelles de téléchargement des en-têtes, compiler les modules natifs pour votre application.

For example, to install `electron-rebuild` and then rebuild modules with it via the command line:

```sh
npm install --save-dev electron-rebuild

# À chaque fois que vous exécutez "npm install", exécutez :
./node_modules/.bin/electron-rebuild

# Sur Windows si vous rencontrez des problèmes, essayez :
.\node_modules\.bin\electron-rebuild.cmd
```

For more information on usage and integration with other tools, consult the project's README.

### À l'aide de `npm`

En définissant quelques variables d’environnement, vous pouvez utiliser `npm` pour installer des modules directement.

For example, to install all dependencies for Electron:

```sh
# Version d'Electron.
export npm_config_target=1.2.3
# The architecture of Electron, see https://electronjs.org/docs/tutorial/support#supported-platforms
# for supported architectures.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Télécharge les en-têtes pour Electron.
export npm_config_disturl=https://electronjs.org/headers
# Indique à node-pre-gyp que l'on compile pour Electron.
export npm_config_runtime=electron
# Indique à node-pre-gyp de compiler les modules depuis leur code source.
export npm_config_build_from_source=true
# Installe toutes les dépendances, et met en cache à ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

### Compilation manuelle pour Electron

Si vous êtes un développeur développant un module natif et que vous voulez le tester avec Electron, vous pouvez recompiler le module pour Electron manuellement. Vous pouvez utiliser `node-gyp` directement pour compiler pour Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

- `HOME=~/.electron-gyp` changes where to find development headers.
- `--target=1.2.3` is the version of Electron.
- `--dist-url=...` specifies where to download the headers.
- `--arch=x64` says the module is built for a 64-bit system.

### Manually building for a custom build of Electron

To compile native Node modules against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## Résolution de problème

If you installed a native module and found it was not working, you need to check the following things:

- En cas de doute, exécutez d'abord `electron-rebuild`.
- Make sure the native module is compatible with the target platform and architecture for your Electron app.
- Make sure `win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.
- Après avoir mise à jour Electron, vous devez habituellement recompiler les modules.

### A note about `win_delay_load_hook`

On Windows, by default, `node-gyp` links native modules against `node.dll`. However, in Electron 4.x and higher, the symbols needed by native modules are exported by `electron.exe`, and there is no `node.dll`. In order to load native modules on Windows, `node-gyp` installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook. If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere. If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

In particular, it's important that:

- you link against `node.lib` from *Electron* and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
- you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
- `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## Les modules s'appuyant sur `prebuild`

[`prebuild`](https://github.com/prebuild/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

Si des modules fournissent des binaires pour Electron, assurez-vous d'omettre les variables d'environnement `--build-from-source` et `npm_config_build_from_source` pour profiter pleinement des binaires précompilés.

## Les modules s'appuyant sur `node-pre-gyp`

[`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) fournit un moyen de déployer des modules natifs Node avec des binaires précompilés, beaucoup de modules populaires l'utilisent.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node and/or there are ABI changes, bad things may happen. So in general, it is recommended to always build native modules from source code. `electron-rebuild` handles this for you automatically.

Si vous suivez la méthode d'installation du module via `npm`, alors cela est fait par défaut, sinon vous devrez passer la variable d'environnement `--build-from-source` à `npm`, ou définir la variable d'environnement `npm_config_build_from_source`.