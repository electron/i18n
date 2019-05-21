# Règles de style pour la documentation d'Electron

Ce sont les lignes directrices pour la rédaction de la documentation d'Electron.

## Titres

* Chaque page doit avoir un seul titre de niveau `#` au début de la page.
* Les chapitres dans la même page doivent avoir un niveau de titre `##`.
* Les sous-chapitres doivent voir le nombre de `#` augmenter dans le titre selon leur niveau d'imbrication.
* Tous les mots dans le titre de la page doivent être mis en majuscule, à l'exception des conjonctions comme « de » et « et ».
* Seul le premier mot d'un titre de chapitre doit être en majuscule.

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

Dans le cas de références de l'API, il existe des exceptions à cette règle.

## Règles pour le markdown

* Utilisez `sh` au lieu de `cmd` dans les blocs de code (en raison de l'outil de coloration syntaxique).
* La longueur des lignes ne devrait pas dépasser 80 caractères.
* Les listes ne doivent pas dépasser 2 niveaux (à cause du formatage du markdown).
* Tous les blocs de code `js` et `javascript` sont vérifiés avec le [standard-markdown](http://npm.im/standard-markdown).

## Choix des mots

* Utilisez "sera" au lieu de "devrait" pour décrire des résultats.
* Préférez « dans le processus de ___ » au lieu de « sur ».

## Références de l'API

Les règles suivantes s'appliquent uniquement à la documentation des APIs.

### Titre de la page

Chaque page doivent utiliser le nom de l'objet retourné par `require('electron')` comme titre, par exemple `BrowserWindow`, `autoUpdater` et `session`.

Le titre de la page doit être suivi par une ligne de description commençant par `>`.

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
* Les [Méthodes Statiques](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) doivent être listées sous un chapitre `### Static Methods`.
* Les [Méthodes d'instance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) doivent être listées sous un chapitre `### Instance Methods`.
* Toutes les méthodes ayant une valeur de retour doivent commencer leur description avec « Retourne `[TYPE]` - Description du retour" 
  * Si la méthode retourne un `Objet`, sa structure peut être décrite à l'aide d'un deux-points suivi d'un saut de ligne et d'une liste non ordonnée de propriétés dans le même style que les paramètres d'une fonction.
* Les événements d'instance doivent être listés sous un chapitre `### Instance Events`.
* Les propriétés d'instances doivent être listés sous un chapitre `### Instance Properties` . 
  * Les propriétés d'instance doivent commencer par "[Type de la propriété] ..."

En prenant les classes `Session` et `Cookies` comme exemple :

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

#### `ses.getCacheSize()`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Méthodes

Le chapitre sur les méthodes doit respecter la forme suivante :

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

Le titre peut être de niveau `###` ou `#####` dépendant du fait qu'il s'agisse d'une méthode de module ou de classe.

Pour les modules, le `objectName` est le nom du module. Pour les classes, cela doit être le nom de l'instance de la classe et ne doit pas être le même que celui du module.

Par exemple, les méthodes de la classe `Session` sous le module `session` doivent utiliser `ses` pour le `objectName`.

Les arguments optionnels sont notés par les crochets `[]` entourant l'argument facultatif ainsi que la virgule nécessaire si cet argument facultatif suit un autre argument :

```sh
required[, optional]
```

En-dessous de la méthode, chaque argument est détaillé avec son type. Celui-ci peut être un type générique :

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Objet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Ou un type personnalisé comme [`WebContent`](api/web-contents.md) venant d'Electron

Si un argument ou une méthode est propre à certaines plateformes, ces plateformes sont listés en italique après le type de données. Les valeurs peuvent être `macOS`, `Windows` ou `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

Les arguments de type `Array` doivent spécifier quels éléments le tableau peut inclure en dessous de sa description.

La description des arguments de type `Function` devrait clairement expliquer comment il peut être appelé et lister les types des paramètres qui lui seront transmis.

### Événements

Le chapitre sur les événements doit être sous la forme suivante :

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

Ce titre peut être au niveau `###` ou `####` si c'est un événement d'un module ou d'une classes.

Les arguments d'un événement suivent les mêmes règles que les méthodes.

### Propriétés

Le chapitre des propriétés doit être sous la forme suivante :

```markdown
### session.defaultSession

...
```

Ce titre peut être au niveau `###` ou `####` si c'est une propriété d'une classe ou d'un module.

## Traductions de la documentation

Voir [electron/i18n](https://github.com/electron/i18n#readme)