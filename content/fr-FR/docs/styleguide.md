# Règles de style pour la documentation d'Electron

Ce sont les lignes directrices pour la rédaction de la documentation d'Electron.

## Titres

* Chaque page doit avoir un seul titre de niveau `#` au début de la page.
* Les chapitres d'une même page doivent avoir leur titre au niveau `##`.
* Les sous-chapitres doivent voir le nombre de `#` de leur titre qui augmentent selon leur niveau d'imbrication.
* Le titre de la page doit suivre [la casse de titre APA][title-case].
* Tous les chapitres doivent suivre les [règles de phrase APA][sentence-case].

Utilisez `Démarrage Rapide` comme exemple :

```markdown
# Démarrage rapide

...

## Processus principal

...

## Processus de rendu

...

## Lancez votre application

...

### Exécuter en tant que distribution

...

### Téléchargement manuel du binaire Electron

...
```

Dans le cas de références de l'API, il existe des exceptions à cette règle.

## Règles pour le markdown

Ce dépôt utilise le paquet [`markdownlint`][markdownlint] pour imposer un style cohérent au Markdown. Pour les règles exactes, voir le fichier `.markdownlint.json` dans le dossier racine .

Quelques règles de style non couvertes par les règles de linter :

<!--TODO(erickzhao): make sure this matches with the lint:markdownlint task-->
* Utilisez `sh` au lieu de `cmd` dans les blocs de code (en raison de l'outil de coloration syntaxique).
* Les lignes doivent être si possible limitées entre 80 et 100 caractères pour des raisons de lisibilité .
* Les listes ne doivent pas dépasser 2 niveaux (à cause du formatage du markdown).
* Tous les blocs de code `js` et `javascript` sont vérifiés avec le [standard-markdown](https://www.npmjs.com/package/standard-markdown).
* Pour les listes non ordonnées, utilisez des astérisques plutôt que des tirets.

## Choix des mots

* Utilisez "sera" au lieu de "devrait" pour décrire des résultats.
* Préférez « dans le processus de ___ » au lieu de « sur ».

## Références de l'API

Les règles suivantes s'appliquent uniquement à la documentation des APIs.

### Titre et description

La doc API de chaque module doit utiliser le nom réel de l'objet retourné par `require('electron')` comme titre (tel que `BrowserWindow`, `autoUpdater` ou `session`).

Directement sous le titre de la page, ajouter une ligne de description du module comme une citation markdown (commençant par `>`).

En prenant `session` comme exemple :

```markdown
# session

> Gère les sessions, les cookies, le cache, les paramètres de proxy, etc. du navigateur.
```

### Événements et méthodes des modules

Pour les modules qui ne sont pas des classes, leurs méthodes et événements doivent figurer sous les chapitres `## Methods` et `## Events`.

En prenant `autoUpdater` comme exemple :

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Classes

* Les classes de l'API ou les classes faisant partie des modules doivent être listées sous un chapitre `## Class: TheClassName`.
* Une page peut avoir plusieurs classes.
* Les constructeurs doivent être listés avec un titre de niveau `###`.
* Les [Méthodes Statiques](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) doivent être listées sous un chapitre `### Méthodes Statiques`.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* All methods that have a return value must start their description with "Returns `[TYPE]` - [Return description]"
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Les événements d'instance doivent être listés sous un chapitre `### Instance Events`.
* Les propriétés d'instance doivent être listées sous un chapitre `### Propriétés d'instance`.
  * Instance Properties must start with "A [Property Type] ..."

En prenant les classes `Session` et `Cookies` comme exemple :

```markdown
# session

## Méthodes

### session.fromPartition(partition)

## Propriétés Statiques

### session.defaultSession

## Classe : Session

### Événements d'instance

#### Événement : 'will-download'

### Méthodes d'instance

#### `ses.getCacheSize()`

### Propriétés d'instance

#### `ses.cookies`

## Classe : Cookies

### Méthodes d'instance

#### `cookies.get(filter, callback)`
```

### Méthodes et leurs arguments

Le chapitre sur les méthodes doit respecter la forme suivante :

```markdown
### `objectName.methodName(required[, optional])`

* `required` String - Une description du paramètre.
* `optional` Integer (facultatif) - Une autre description du paramètre.

...
```

#### Heading level

The heading can be `###` or `####`-levels depending on whether the method belongs to a module or a class.

#### Function signature

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

Par exemple, les méthodes de la classe `Session` sous le module `session` doivent utiliser `ses` pour le `objectName`.

Optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```markdown
required[, optional]
```

#### Descriptions des arguments

Des informations plus détaillées sur chacun des arguments sont notées dans une liste non ordonnée en dessous de la méthode. The type of argument is notated by either JavaScript primitives (e.g. `String`, `Promise`, or `Object`), a custom API structure like Electron's [`Cookie`](api/structures/cookie.md), or the wildcard `any`.

If the argument is of type `Array`, use `[]` shorthand with the type of value inside the array (for example,`any[]` or `String[]`).

If the argument is of type `Promise`, parametrize the type with what the promise resolves to (for example, `Promise<void>` or `Promise<String>`).

Si un argument peut être de plusieurs types, séparez les types par `|`.

La description des arguments de type `Function` devrait clairement expliquer comment il peut être appelé et lister les types des paramètres qui lui seront transmis.

#### Platform-specific functionality

Si un argument ou une méthode est propre à certaines plateformes, ces plateformes sont listés en italique après le type de données. Les valeurs peuvent être `macOS`, `Windows` ou `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

### Événements

Le chapitre sur les événements doit être sous la forme suivante :

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

L'en-tête peut être de niveau `###` ou `####` selon que l'événement appartient à un module ou à une classe.

Les arguments d'un événement suivent les mêmes règles que les méthodes.

### Propriétés

Le chapitre des propriétés doit être sous la forme suivante :

```markdown
### session.defaultSession

...
```

L'en-tête peut être de niveau `###` ou `####` selon que la propriété appartient à un module ou à une classe.

## Traductions de la documentation

Voir [electron/i18n](https://github.com/electron/i18n#readme)

[title-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case
[sentence-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case
[markdownlint]: https://github.com/DavidAnson/markdownlint
