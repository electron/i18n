# Documentación de Guía de Estilo de Electron

Estos son los lineamientos para escribir documentación de Electron.

## Títulos

* Cada página debe tener un solo `#`-nivel de título en la parte superior.
* Los capítulos en la misma página deben tener `#`-títulos de nivel.
* Los subcapítulos necesitan aumentar el número de `#` en el título acorde a su profundidad de anidamiento.
* Todas las palabras en el título de la página deben escribirse con mayúscula, excepto las conjunciones como "de" y "y".
* Sólo debe escribirse con mayúscula la primera palabra del título de capítulo.

Usando `Quick Start` como ejemplo:

```markdown
# Inicio Rápido

...

## Proceso principal

...

## Proceso de renderizado

...

## Ejecutar tu aplicación

...

### Ejecutar como distribución

...

### Binario Electron descargado manualmente

...
```

Para referencias API, hay excepciones a esta regla.

## Reglas de Markdown

* Usa `sh` en vez de `cmd` en code blocks (debido al resaltador de sintaxis).
* Lines should be wrapped at 80 columns.
* No nesting lists more than 2 levels (due to the markdown renderer).
* All `js` and `javascript` code blocks are linted with [standard-markdown](http://npm.im/standard-markdown).

## Escoger palabras

* Utilice "podrá" sobre "podría" al describir resultados.
* Prefiere "en el ___ proceso" sobre "en".

## Referencias API

The following rules only apply to the documentation of APIs.

### Título de Página

Each page must use the actual object name returned by `require('electron')` as the title, such as `BrowserWindow`, `autoUpdater`, and `session`.

Under the page title must be a one-line description starting with `>`.

Usando `session` como ejemplo:

```markdown
# session

> Administra sesiones de navegador, cookies, caché, configuración del proxy, etc.
```

### Module methods and events

For modules that are not classes, their methods and events must be listed under the `## Methods` and `## Events` chapters.

Usando `autoUpdater` como ejemplo:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Clases

* API classes or classes that are part of modules must be listed under a `## Class: TheClassName` chapter.
* One page can have multiple classes.
* Constructors must be listed with `###`-level titles.
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

### Métodos

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
* O un tipo personalizado como [`WebContent`](api/web-contents.md) de Electron

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows`, or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Eventos

The events chapter must be in following form:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### Propiedades

The properties chapter must be in following form:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Traducciones de la documentación

Ver [electron/electron-i18n](https://github.com/electron/electron-i18n#readme)