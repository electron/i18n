# Styleguide Documentation d'Electron

Ce sont les lignes directrices pour la rédaction de la documentation d'Electron.

## Titres

* Chaque page doit avoir un seul `#`-niveau de titre au début.
* Les chapitres dans la même pages doit avoir un niveau de titre `##`.
* Les sous-chapitres doivent voir le nombre de `#` augmenter dans le titre selon leur niveau d'imbrication.
* Tous les mots dans le titre de la page doivent être capitalisés, à l'exception des conjonctions comme « de » et « et ».
* Seul le premier mot d’un titre de chapitre doit être capitalisé.

Utilisez `Démarrage Rapide` comme exemple :

```markdown
# Démarrage Rapide

...

## Principal processus

...

## Processus de rendu

...

## Exécuter votre application

...

### Exécuter en tant que distribution

...

### Executable d'Electron téléchargé manuellement

...
```

Pour les références de l’API, ce sont des exceptions à cette règle.

## Règles pour le markdown

* Utilisez `bash` au lieu de `cmd` dans les blocs de code (en raison du surligneur de syntaxe).
* La longueur des lignes ne devrait pas dépasser 80 caractères.
* Les listes ne doivent pas dépasser 2 niveaux (à cause du formatage du markdown).
* Tous les blocs de code `js` et `javascript` sont vérifiés avec le [standard-markdown](http://npm.im/standard-markdown).

## Orthographie

* Utilisez « sera » au lieu de « devrait » pour décrire des résultats.
* Préférez « dans le processus de ___ » au lieu de « sur ».

## Références de l'API

Les règles suivantes s’appliquent uniquement à la documentation des APIs.

### Titre de la page

Chaque page doivent utiliser le nom de l'objet retourné par `require('electron')` comme titre, par exemple `BrowserWindow`, `autoUpdater` et `session`.

Il doit y avoir une ligne de description commençant par `>` en dessous du titre de la page.

Si l'on utilise `session` par exemple, cela donne :

```markdown
# session

> Gère les sessions du navigateur, les cookies, le cache, les paramètres de proxy, etc..
```

### Événements et méthodes des modules

Pour les modules qui ne sont pas des classes, leurs méthodes et événements doivent figurer sous le sous-titre `## méthodes` et les chapitres `## événements`.

Si l'on utilise `autoUpdater` comme exemple :

```markdown
# autoUpdater

## Événements

### Événement: 'error'

## Méthodes

### `autoUpdater.setFeedURL(url[, requestHeaders])
```

### Classes

* Les classes de l'API ou les classes faisant partie des modules doivent être listés sous un chapitre `## Classe: NomDeLaClasse`.
* Une page peut avoir plusieurs classes.
* Les constructeurs doivent être listés avec un titre de niveau `###`.
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) must be listed under a `### Static Methods` chapter.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description" 
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Instance Events must be listed under an `### Instance Events` chapter.
* Instance Properties must be listed under an `### Instance Properties` chapter. 
  * Instance properties must start with "A [Property Type] ..."

Using the `Session` and `Cookies` classes as an example:

```markdown
# session

## Methods

### session.fromPartition(partition)

## Properties

### session.defaultSession

## Class: Session

### Instance Events

#### Event: 'will-download'

### Instance Methods

#### `ses.getCacheSize(callback)`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Methods

The methods chapter must be in the following form:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

The title can be `###` or `####`-levels depending on whether it is a method of a module or a class.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

    required[, optional]
    

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Or a custom type like Electron's [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows`, or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Events

The events chapter must be in following form:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### Properties

The properties chapter must be in following form:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Documentation Translations

Translations of the Electron docs are located within the `docs-translations` directory.

To add another set (or partial set):

* Create a subdirectory named by language abbreviation.
* Translate the files.
* Update the `README.md` within your language directory to link to the files you have translated.
* Add a link to your translation directory on the main Electron [README](https://github.com/electron/electron#documentation-translations).

Note that the files under `docs-translations` must only include the translated ones, the original English files should not be copied there.