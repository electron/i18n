# Aperçu du Système de compilation

Electron utilise [gyp](https://gyp.gsrc.io/) pour la génération de projet et [ninja](https://ninja-build.org/) pour la compilation. Les configurations de projet se trouvent dans les fichiers `.gyp` et `.gypi`.

## Fichiers gyp

Les fichiers `gyp` suivants contiennent des principales règles pour compiler Electron :

* `electron.gyp` définit comment Electron lui-même est compilé.
* `common.gypi` ajuste les configurations de compilation de Node à faire compiler avec Chromium.
* `vendor/brightray/brightray.gyp` définit comment `brightray` est compilé et inclut les configurations par défaut pour la liaison avec Chromium.
* `vendor/brightray/brightray.gypi` inclut les configurations de compilation générale sur la compilation.

## Component Build

Étant donné que Chrome est un sacré gros projet, la dernière étape de reliage (linking) peut prendre quelques minutes, ce qui rend le développement difficile. Afin de résoudre ce problème, Chrome a introduit le « component build », qui compile chaque composant comme une bibliothèque partagée distincte, faisant le lien très rapidement mais sacrifie la taille de fichier et la performance.

Pour Electron, nous avons pris une approche très similaire : pour les versions `Debug`, le binaire sera lié à une version de bibliothèque partagée des composants de Chrome pour avoir des temps de liaison rapide ; pour les versions `Release`, le binaire sera lié aux versions de la bibliothèque statique, donc nous pouvons avoir la plus petite taille binaire et les meilleures performances possible.

## Amorçage minimal

Tous les binaires précompilés de Chrome (`libchromiumcontent`) sont téléchargés lorsque vous exécutez le script bootstrap. Par défaut les bibliothèques statiques et les bibliothèques partagées seront téléchargés et la taille finale devrait être entre 800 Mo et 2 Go selon la plateforme.

Par défaut, `libchromiumcontent` est téléchargé depuis Amazon Web Services. Si la variable d’environnement `LIBCHROMIUMCONTENT_MIRROR` est définie, le script bootstrap l'utilisera comme lien de téléchargement. [`libchromiumcontent-qiniu-miroir`](https://github.com/hokein/libchromiumcontent-qiniu-mirror) est un miroir pour `libchromiumcontent`. Si vous avez des difficultés à accéder à AWS, vous pouvez changer l’adresse de téléchargement avec `export LIBCHROMIUMCONTENT_MIRROR = http://7xk3d2.dl1.z0.glb.clouddn.com/`

Si vous souhaitez compiler Electron rapidement pour des tests ou le développement, vous pouvez télécharger seulement les versions de bibliothèque partagée en passant le paramètre `--dev` :

```bash
$ ./script/bootstrap.py --dev
$ ./script/build.py -c D
```

## Génération de projet en deux phases

Electron se relie avec différents jeux de bibliothèques pour les compilations `Release` et `Debug`. `gyp`, cependant, ne supporte pas les configuration de différents paramètres de liaison pour différentes configurations.

To work around this Electron uses a `gyp` variable `libchromiumcontent_component` to control which link settings to use and only generates one target when running `gyp`.

## Noms de destination

Unlike most projects that use `Release` and `Debug` as target names, Electron uses `R` and `D` instead. This is because `gyp` randomly crashes if there is only one `Release` or `Debug` build configuration defined, and Electron only has to generate one target at a time as stated above.

This only affects developers, if you are just building Electron for rebranding you are not affected.

## Tests

Pour tester que vos changements soient conforme avec le code style du projet :

```bash
$ npm run lint
```

Pour tester les fonctionnalités :

```bash
$ npm test
```

Chaque fois que vous apportez des modifications au code source d'Electron, vous devez ré-exécuter la compilation avant les tests :

```bash
$ npm run build && npm test
```

Vous pouvez rendre la suite de tests plus rapide en isolant le test spécifique ou bloc que vous travaillez actuellement à l’aide de la fonctionnalité [tests exclusifs](https://mochajs.org/#exclusive-tests) de Mocha. Ajoutez simplement `.only` à tout appel de fonction `describe` ou `it` :

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

```bash
$ npm test -- -R
```