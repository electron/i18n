# Aperçu du Système de Build

Electron uses [GN](https://gn.googlesource.com/gn) for project generation and [ninja](https://ninja-build.org/) for building. Project configurations can be found in the `.gn` and `.gni` files.

## GN Files

The following `gn` files contain the main rules for building Electron:

* `BUILD.gn` defines how Electron itself is built.
* `brightray/BUILD.gn` defines how `brightray` is built and includes the default configurations for linking with Chromium.
* `build/args/{debug,release,all}.gn` contain the default build arguments for building Electron.

## Component Build

Étant donné que Chrome est un sacré gros projet, la dernière étape de reliage (linking) peut prendre quelques minutes, ce qui rend le développement difficile. Afin de résoudre ce problème, Chrome a introduit le « component build », qui compile chaque composant comme une bibliothèque partagée distincte, faisant le lien très rapidement mais sacrifie la taille de fichier et la performance.

Electron inherits this build option from Chromium. In `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## Tests

**NB** *this section is out of date and contains information that is no longer relevant to the GN-built electron.*

Pour tester que vos changements soient conforme avec le code style du projet :

```sh
$ npm run lint
```

Pour tester les fonctionnalités :

```sh
$ npm test
```

Chaque fois que vous apportez des modifications au code source d'Electron, vous devez ré-exécuter la compilation avant les tests :

```sh
$ npm run build && npm test
```

Vous pouvez rendre la suite de tests plus rapide en isolant le test spécifique ou bloc que vous travaillez actuellement à l’aide de la fonctionnalité [tests exclusifs](https://mochajs.org/#exclusive-tests) de Mocha. Ajoutez `.only` pour chaque appel aux fonctions `describe` ou `it`:

```js
describe.only('some feature', function () {
  // ... Seuls les tests dans ce bloc seront lancés
})
```

Alternativement, vous pouvez utiliser l'option `grep` de Mocha pour exécuter uniquement les tests correspondant au modèle d’expression régulière donnée :

```sh
$ npm test -- --grep child_process
```

Les tests qui incluent des modules natifs (par exemple `runas`) ne peuvent être exécutées avec le débogage (voir [#2558](https://github.com/electron/electron/issues/2558) pour plus de détails), mais ils fonctionneront avec la version Release.

Pour exécuter les tests avec le build release :

```sh
$ npm test -- -R
```