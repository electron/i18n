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
* Las líneas deben estar listas en 80 columnas.
* No anidar listas de más de 2 niveles (debido al renderizador markdown).
* Todos los bloques de código `js` y `javascript` están linted con [markdown estándar](http://npm.im/standard-markdown).

## Escoger palabras

* Utilice "podrá" sobre "podría" al describir resultados.
* Prefiere "en el ___ proceso" sobre "en".

## Referencias API

Las siguientes reglas sólo se aplican a la documentación de APIs.

### Título de Página

Cada página debe utilizar el nombre real del objeto devuelto por `require('electron')` como el título, como `BrowserWindow`, `autoUpdater` y `session`.

Under the page title must be a one-line description starting with `>`.

Usando `session` como ejemplo:

```markdown
# session

> Administra sesiones de navegador, cookies, caché, configuración del proxy, etc.
```

### Métodos del módulo y eventos

For modules that are not classes, their methods and events must be listed under the `## Methods` and `## Events` chapters.

Usando `autoUpdater` como ejemplo:

```markdown
# autoUpdater

## Eventos

### Evento: 'error'

## Métodos

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

Usando las clases `Session` y `Cookies` como ejemplo:

```markdown
# sesión

## Métodos

### session.fromPartition(partition)

## Propiedades

### session.defaultSession

## Clase: Sesión

### Eventos de Instancia

#### Evento: 'will-download'

### Métodos de Instancia

#### `ses.getCacheSize(callback)`

### Propiedades de Instancia

#### `ses.cookies`

## Clase: Cookies

### Métodos de Instancia

#### `cookies.get(filter, callback)`
```

### Métodos

El capítulo de métodos debe estar de la siguiente forma:

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
* `animate` Booleano (opcional) _macOS_ _Windows_ - Anima la cosa.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Eventos

El capítulo de eventos debe estar de la siguiente forma:

```markdown
### Evento: 'wake-up'

Devuelve:

* `time` String

...
```

El título puede ser `###` o `####`-niveles dependiendo de si es una propiedad de un módulo o una clase.

Los argumentos de un evento siguen las mismas reglas que los métodos.

### Propiedades

El capítulo de propiedades debe estar de la siguiente forma:

```markdown
### session.defaultSession

...
```

El título puede ser `#` o `#`-niveles dependiendo de si es una propiedad de un módulo o una clase.

## Traducciones de la documentación

Ver [electron/electron-i18n](https://github.com/electron/electron-i18n#readme)