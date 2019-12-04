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

Par exemple, pour installer `electron-rebuild` puis recompiler les modules avec via une ligne de commande :

```sh
npm install --save-dev electron-rebuild

# À chaque fois que vous exécutez "npm install", exécutez :
./node_modules/.bin/electron-rebuild

# Sur Windows si vous rencontrez des problèmes, essayez :
.\node_modules\.bin\electron-rebuild.cmd
```

Pour plus d'informations sur l'usage et l'intégration avec les autres outils, consultez le README du projet.

### À l'aide de `npm`

En définissant quelques variables d’environnement, vous pouvez utiliser `npm` pour installer des modules directement.

Par exemple, pour installer toutes les dépendances d'Electron :

```sh
# Version d'Electron.
export npm_config_target=1.2.3
# L'architecture d'Electron, consultez
https://electronjs.org/docs/tutorial/support#supported-platforms
# pour les architectures prises en charge.
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

- `HOME=~/.electron-gyp` indique où trouver les en-têtes pour le développement.
- `--target=1.2.3` est la version d'Electron.
- `--dist-url=...` indique où télécharger les en-têtes.
- `--arch=x64` spécifie que le module est prévu pour un système 64 bits.

### Compilation manuelle pour une compilation personnalisée d'Electron

Pour compiler des modules Node natifs avec une compilation personnalisée d'Electron qui ne correspond pas à une release publique, utilisez la commande `npm` pour utiliser la version de Node que vous avez empaquetée avec votre compilation personnalisée.

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## Résolution de problème

Si vous avez installé un module natif et trouvé que cela ne fonctionnait pas, vous devez vérifier ces éléments suivants :

- En cas de doute, exécutez d'abord `electron-rebuild`.
- Assurez-vous que le module natif est compatible avec la plateforme cible et l'architecture pour votre application Electron.
- Assurez-vous que `win_delay_load_hook` n'est pas défini comme `false` dans le module `binding.gyp`.
- Après avoir mise à jour Electron, vous devez habituellement recompiler les modules.

### Une remarque sur `win_delay_load_hook`

Sur Windows, par défaut, `node-gyp` relie les modules natifs à `node.dll`. Cependant, dans Electron 4.x et supérieur, les symboles nécessaires aux modules natifs sont exportés par `electron.exe`, et `node.dll` n'existe pas. In order to load native modules on Windows, `node-gyp` installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook. If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere. If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

En particulier, il est important que :

- you link against `node.lib` from *Electron* and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
- you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
- `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## Les modules s'appuyant sur `prebuild`

[`prebuild`](https://github.com/prebuild/prebuild) permet de publier facilement des modules natifs Node avec des binaires précompilés pour plusieurs version de Node et d'Electron.

Si des modules fournissent des binaires pour Electron, assurez-vous d'omettre les variables d'environnement `--build-from-source` et `npm_config_build_from_source` pour profiter pleinement des binaires précompilés.

## Les modules s'appuyant sur `node-pre-gyp`

[`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) fournit un moyen de déployer des modules natifs Node avec des binaires précompilés, beaucoup de modules populaires l'utilisent.

Habituellement, ces modules fonctionnent très bien avec Electron, mais parfois lorsque qu'Electron utilise une version de V8 plus récente que Node et qu'il y a des changements dans l'ABI, de mauvaises choses peuvent arriver. Donc, en général, il est recommandé de toujours compiler les modules natifs depuis leur code source. `electron-rebuild` s'en charge automatiquement pour vous.

Si vous suivez la méthode d'installation du module via `npm`, alors cela est fait par défaut, sinon vous devrez passer la variable d'environnement `--build-from-source` à `npm`, ou définir la variable d'environnement `npm_config_build_from_source`.