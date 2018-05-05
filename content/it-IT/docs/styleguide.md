# Linee Guida Documentazione Electron

Queste sono le linee guida per scrivere la documentazione di Electron.

## Titoli

* Ogni pagina deve avere un singolo livello-`#` titolo all'apice.
* I capitoli nella stessa pagina devono avere titoli livello-`##`.
* I sotto capitoli devono aumentare il numero di `#` nel titoli in base alla loro profondità di annidamento.
* Tutte le parole nel titolo della pagina devono essere in maiuscolo, ad eccezione di congiunzioni come "di" e "e".
* Solo la prima parola di un titolo di capitolo deve essere in maiuscolo.

Usando `Avvio Rapido` come esempio:

```markdown
# Quick Start

...

## Main process

...

## Renderer process

...

## Run your app

...

### Run as a distribution

...

### Manually downloaded Electron binary

...
```

For API references, there are exceptions to this rule.

## Regole di Markdown

* Usa `sh` invece di `cmd` nei blocchi di codice (a causa dell'evidenziatore della sintassi).
* Lines should be wrapped at 80 columns.
* Nessun elenco di nidificazione più di 2 livelli (a causa del renderizzatore di riduzione).
* Tutti i blocchi di codice `js` e `javascript` sono allineati con il [Markdown standard](http://npm.im/standard-markdown).

## Picking words

* Use "will" over "would" when describing outcomes.
* Prefer "in the ___ process" over "on".

## API references

The following rules only apply to the documentation of APIs.

### Page title

Each page must use the actual object name returned by `require('electron')` as the title, such as `BrowserWindow`, `autoUpdater`, and `session`.

Under the page title must be a one-line description starting with `>`.

Using `session` as example:

```markdown
# session

> Manage browser sessions, cookies, cache, proxy settings, etc.
```

### Module methods and events

For modules that are not classes, their methods and events must be listed under the `## Methods` and `## Events` chapters.

Using `autoUpdater` as an example:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Classi

* API classes or classes that are part of modules must be listed under a `## Class: TheClassName` chapter.
* Una pagina può avere più classi.
* Constructors must be listed with `###`-level titles.
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) must be listed under a `### Static Methods` chapter.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* Tutti i metodi che hanno un valore di ritorno devono iniziare la loro descrizione con "Ritorna `[TYPE]` - Return description" 
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Instance Events must be listed under an `### Instance Events` chapter.
* Le proprietà dell'istanza devono essere elencate sotto a `### Proprietà Istanza` chapter. 
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

### Metodi

Il capitolo dei metodi deve essere nella seguente forma:

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

```sh
required[, optional]
```

Sotto il metodo sono informazioni più dettagliate su ciascuno degli argomenti. Il tipo di argomento è indicato dai tipi comuni:

* [`Stringa`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Oggetto`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Or a custom type like Electron's [`WebContent`](api/web-contents.md)

Se un argomento o un metodo è univoco per certe piattaforme, tali piattaforme sono denotate utilizzando un elenco in corsivo delimitato dallo spazio che segue il tipo di dati. Values can be `macOS`, `Windows`, or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Eventi

Il capitolo degli eventi deve essere nel seguente formato:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### Properties

Il capitolo proprietà dovrebbe essere nel seguente formato:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Documentation Translations

See [electron/i18n](https://github.com/electron/i18n#readme)