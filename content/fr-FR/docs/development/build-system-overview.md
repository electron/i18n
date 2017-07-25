# Aperçu du Système de compilation

Electron utilise [gyp](https://gyp.gsrc.io/) pour la génération de projet et [ninja](https://ninja-build.org/) pour la compilation. Les configurations de projet se trouvent dans les fichiers `.gyp` et `.gypi`.

## Fichiers gyp

Les fichiers `gyp` suivants contiennent des principales règles pour compiler Electron :

* `electron.gyp` définit comment Electron lui-même est compilé.
* `common.gypi` ajuste les configurations de compilation de Node à faire compiler avec Chromium.
* `vendor/brightray/brightray.gyp` définit comment `brightray` est compilé et inclut les configurations par défaut pour la liaison avec Chromium.
* `vendor/brightray/brightray.gypi` inclut les configurations de compilation générale sur la compilation.

## Component Build

Étant donné que Chrome est un sacré gros projet, la dernière étape de reliage (linking) peut prendre quelques minutes, ce qui rend le développement difficile. In order to solve this, Chromium introduced the "component build", which builds each component as a separate shared library, making linking very quick but sacrificing file size and performance.

In Electron we took a very similar approach: for `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## Amorçage minimal

All of Chromium's prebuilt binaries (`libchromiumcontent`) are downloaded when running the bootstrap script. By default both static libraries and shared libraries will be downloaded and the final size should be between 800MB and 2GB depending on the platform.

By default, `libchromiumcontent` is downloaded from Amazon Web Services. If the `LIBCHROMIUMCONTENT_MIRROR` environment variable is set, the bootstrap script will download from it. [`libchromiumcontent-qiniu-mirror`](https://github.com/hokein/libchromiumcontent-qiniu-mirror) is a mirror for `libchromiumcontent`. If you have trouble in accessing AWS, you can switch the download address to it via `export LIBCHROMIUMCONTENT_MIRROR=http://7xk3d2.dl1.z0.glb.clouddn.com/`

If you only want to build Electron quickly for testing or development, you can download just the shared library versions by passing the `--dev` parameter:

```bash
$ ./script/bootstrap.py --dev
$ ./script/build.py -c D
```

## Génération de projet en deux phases

Electron links with different sets of libraries in `Release` and `Debug` builds. `gyp`, however, doesn't support configuring different link settings for different configurations.

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