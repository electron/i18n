# Aperçu du système de construction

Électrons utilise [gyp](https://gyp.gsrc.io/) pour la production de projet et[ninja](https://ninja-build.org/) pour la construction. Configurations de projet se trouvent dans les fichiers `.gyp` et `.gypi`.

## Fichiers de gyp

Suite `gyp` fichiers contiennent les principales règles pour construire des électrons :

* `electron.gyp` définit comment l’électron lui-même est construit.
* `common.gypi` ajuste les configurations de génération de nœud à faire construire avec chrome.
* `vendor/brightray/brightray.gyp` définit comment `brightray` est construit et inclut les configurations par défaut pour la liaison avec chrome.
* `vendor/brightray/brightray.gypi` inclut les configurations de construction générale sur la construction.

## Composant Build

Étant donné que Chrome est tout à fait un gros projet, la dernière étape relie peut prendre quelques minutes, qui rend difficile pour le développement. Afin de résoudre ce problème, chrome a présenté la « component build », qui s’appuie à chaque composant comme une bibliothèque partagée distincte, faisant le lien entre performance et taille de fichier très rapide mais sacrifier.

En électronique, nous avons pris une approche très similaire : des `Debug` de construction, le binaire sera lié à une version de bibliothèque partagée des composants du chrome pour atteindre les temps de liaison rapide ; pour les versions de `Release`, le fichier binaire sera lié aux versions des bibliothèques statiques, donc nous pouvons avoir la meilleure possible taille binaire et la performance.

## Un minimum d’amorçage

Tous les binaires précompilés de chrome (`libchromiumcontent`) sont téléchargés lorsque vous exécutez le script bootstrap. Par défaut les bibliothèques statiques et les bibliothèques partagées seront téléchargés et la taille finale devrait être entre 800 Mo et 2 Go selon la plateforme.

Par défaut, `libchromiumcontent` est téléchargé depuis Amazon Web Services. Si la variable d’environnement `LIBCHROMIUMCONTENT_MIRROR` est définie, le script bootstrap téléchargera d’elle. [`libchromiumcontent-qiniu-mirror`](https://github.com/hokein/libchromiumcontent-qiniu-mirror) est un miroir pour `libchromiumcontent`. Si vous avez des difficultés à accéder à AWS, vous pouvez passer l’adresse de téléchargement à elle par l’intermédiaire de`export LIBCHROMIUMCONTENT_MIRROR = http://7xk3d2.dl1.z0.glb.clouddn.com/`

Si vous souhaitez uniquement créer rapidement des électrons de contrôle ou de développement, vous pouvez télécharger seulement les versions de bibliothèque partagée en passant la `--paramètre dev` :

```bash
$./script/bootstrap.py dev--$./script/build.py - c D
```

## Génération de projet en deux phases

Liens d’électrons avec différents jeux de bibliothèques `Release` et `Debug` s’appuie. `gyp`, cependant, ne supporte pas les configuration des paramètres de liaison différents pour différentes configurations.

Pour contourner cet électron utilise une `libchromiumcontent_component` variable `gyp` au contrôle qui relient les paramètres à utiliser et génère uniquement une seule cible lors de l’exécution `gyp`.

## Noms de cible

Contrairement à la plupart des projets qui utilisent des `Release` et `Debug` comme noms de cibles, électrons utilise à la place de `R` et `D`. C’est parce que `gyp` se bloque au hasard si il n’y a qu’un seul `Release` ou `Debug` build configuration définie, et électronique ne doit pas générer une seule cible à la fois comme indiqué ci-dessus.

Les développeurs d’affecte cette seule, si vous générez simplement électron pour rebranding vous ne sont pas affectés.

## Tests

Test, que vos modifications sont conformes au projet à l’aide du style de codage :

```bash
NGP $ exécuter lint
```

Test à l’aide de la fonctionnalité :

```bash
test de NGP $
```

Chaque fois que vous apportez des modifications au code source électronique, vous devez ré-exécuter la génération avant les épreuves :

```bash
test de NGP $ NGP exécutez build &&
```

Vous pouvez faire à la suite de tests courir plus vite en isolant le test spécifique ou bloc que vous travaillez actuellement sur l’utilisation[exclusive tests](https://mochajs.org/#exclusive-tests) fonctionnalité de moka. Ajoutez simplement`.only` à tout appel de fonction `describe` ou `it` :

```js
DESCRIBE.Only ('certaines disposent", function () {/ /... s’exécutera uniquement des tests dans ce bloc})
```

Alternativement, vous pouvez utiliser option `grep` moka pour exécuter uniquement les tests correspondant au modèle d’expression régulière donnée :

```sh
essai de NGP $--child_process--grep
```

Les tests qui incluent des modules natifs (par exemple `runas`) ne peuvent être exécutées avec le débogage (voir [ #2558](https://github.com/electron/electron/issues/2558) pour plus de détails), mais ils travailleront avec la version Release.

Pour exécuter les tests avec la version mise à jour utilisation :

```bash
essai de NGP $---R
```