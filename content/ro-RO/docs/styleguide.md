# Ghid de documentare Electron

Acestea sunt liniile directoare pentru scrierea documentației Electron.

## Titluri

* Fiecare pagină trebuie să aibă un singur titlu de nivel-`#` în partea de sus.
* Capitolele în aceeași pagină trebuie să aibă titluri de nivel-`##`.
* Subcapitolele trebuie să mărească numărul `#` din titlu în funcție de adâncimea lor.
* Toate cuvintele din titlul paginii trebuie să fie cu majusculă cu excepția conjuncțiilor precum „de” și „și”.
* Numai primul cuvânt al unui titlu de capitol trebuie să fie cu majuscule.

Folosirea `Inițierii rapide` ca exemplu:

```markdown
# Quick Start

...

## Proces principal

...

## Proces de randare

...

## Rulează aplicația ta

...

### Rulează ca o distribuție

...

### Descărcare Electron binar manuală

...
```

Pentru referințe API există excepții de la această regulă.

## Reguli de marcare

* Folosește `sh` în loc de `cmd` în blocurile de cod (datorită marcatorului de sintaxă).
* Liniile ar trebui să fie încadrate la 80 de coloane.
* Fără liste indentate mai mult de 2 niveluri (din cauza redării de marcare).
* Toate blocurile de cod `js` și `javascript` sunt listate cu [standard-markdown](http://npm.im/standard-markdown).

## Alegerea cuvintelor

* Folosește „va” în loc de „ar” atunci când descrii rezultatele.
* Preferă „în procesul ___” în loc de „pe”.

## Referințe API

Următoarele reguli se aplică doar la documentația API-urilor.

### Titlul paginii

Fiecare pagină trebuie să utilizeze numele obiectului returnat de ` require („electron”) ` ca titlu, cum ar fi ` BrowserWindow `, ` autoUpdater ` și ` session-sesiune `.

Sub titlul paginii trebuie să existe o descriere de o linie care începe cu ` > `.

Exemplu de utilizare a `session-sesiune`:

```markdown
# session -sesiune
> Gestionați sesiunile browserului, cookie-urile, memoria cache, setările proxy etc.
```

### Modulele metode și evenimente

Pentru modulele care nu sunt clase, metodele și evenimentele lor trebuie enumerate în secțiunea de mai jos capitolele ` ## Metode ` și ` ## Evenimente `.

Exemplu de utilizare a `autoUpdater`:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Clase

* Clasele API sau clasele care fac parte din module trebuie să fie enumerate în capitolul ` ## Class: TheClassName `.
* O pagină poate avea multiple clase.
* Constructorii trebuie să fie enumerați cu titluri de nivel ` ### `.
* [ Static Methods-Metode statice ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) trebuie listate la un capitol ` ### Static Methods-Metode statice `.
* [Instance Methods- Metode de instanță ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) trebuie listate la un capitol ` ### Instance Methods-Metode de instanță `.
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

## Static Properties

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

```sh
required[, optional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Or a custom type like Electron's [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows` or `Linux`.

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

See [electron/i18n](https://github.com/electron/i18n#readme)