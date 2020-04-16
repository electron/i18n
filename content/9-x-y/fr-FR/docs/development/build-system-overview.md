# Aperçu du Système de compilation

Electron utilise [GN](https://gn.googlesource.com/gn) pour la génération de projet et [ninja](https://ninja-build.org/) pour la construction. Les configurations du projet peuvent être trouvées dans les fichiers `.gn` et `.gni` .

## Fichiers GN

Les fichiers `gn` suivants contiennent les règles principales pour la construction d'Electron :

* `BUILD.gn` définit comment Electron lui-même est construit et inclut les configurations par défaut pour se connecter avec Chromium.
* `build/args/{debug,release,all}.gn` contient les arguments de construction par défaut pour compilant Electron.

## Component Build

Étant donné que Chrome est un sacré gros projet, la dernière étape de reliage (linking) peut prendre quelques minutes, ce qui rend le développement difficile. Afin de résoudre ce problème, Chrome a introduit le « component build », qui compile chaque composant comme une bibliothèque partagée distincte, faisant le lien très rapidement mais sacrifie la taille de fichier et la performance.

Electron hérite de cette option de compilation de Chromium. Dans les versions `Debug`, le binaire sera lié à une version partagée de la bibliothèque des composants de Chromium pour obtenir un temps de liaison rapide ; pour les versions `Release`, le binaire sera lié à les versions statiques de la bibliothèque, pour que nous puissions avoir la meilleure taille binaire possible et les meilleures performances .

## Tests

**NB** _this section is out of date and contains information that is no longer relevant to the GN-built electron._

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
describe.only('some feature', () => {
  // ... only tests in this block will be run
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
