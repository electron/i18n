# Règles de style pour la documentation d'Electron

Ce sont les lignes directrices pour la rédaction de la documentation d'Electron.

## Titres

* Chaque page doit avoir un seul titre de niveau `#` au début de la page.
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
* Les [Méthodes Statiques](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) doivent être listés sous un chapitre `### Méthodes Statiques`.
* [Les méthodes d’instance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) doivent être listés sous un chapitre `### méthodes d’Instance`.
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

### Méthodes

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

* [`Chaîne de caractères`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Nombre`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Objet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Tableau`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Booléen`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Ou un type personnalisé comme [`WebContent`](api/web-contents.md) venant d'Electron

Si un argument ou une méthode est propre à certaines plateformes, ces plateformes sont listés en italique après le type de données. Les valeurs peuvent être `macOS`, `Windows` ou `Linux`.

```markdown
* `animate` Booléen (facultatif) _macOS_ _Windows_ - Permet d'animer.
```

Les arguments de type `Tableau` doivent spécifier quels éléments le tableau peut inclure en dessous de sa description.

La description des arguments de type de `fonction` devrait clairement expliquer comment il peut être appelé et lister les types des paramètres qui lui seront transmis.

### Événements

Le chapitre des événements doit être sous la forme suivante :

```markdown
### Événement: 'wake-up'

Retourne:

* `time` Chaîne de caractères

...
```

Ce titre peut être au niveau `###` ou `####` si c'est un événement d'un module ou d'une classes.

Les arguments d’un événement suivent les mêmes règles que les méthodes.

### Propriétés

Le chapitre des propriétés doit être sous la forme suivante :

```markdown
### session.defaultSession

...
```

Ce titre peut être au niveau `###` ou `####` si c'est une propriété d’une classe ou d'un module.

## Traductions de la documentation

Les traductions de la documentation d'Electron se situent dans le répertoire `docs-translations`.

Pour ajouter une autre langue (ou partiellement) :

* Créez un sous-répertoire nommé par l'abréviation de la langue.
* Traduisez les fichiers.
* Mettez à jour le `README.md` avec votre langue pour ajouter un lien redirigeant vers le répertoire contenant les traductions.
* Ajouter un lien vers votre répertoire de traduction sur le[README](https://github.com/electron/electron#documentation-translations) principal d'Electron.

Notez que les fichiers dans le répertoire `docs-translations` doivent inclure uniquement les fichiers traduits, les fichiers d’origine ne doivent pas être copiées là.