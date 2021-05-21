# Guía de estilo de documentación Electron

Estas son las directrices para escribir documentación de Electron.

## Encabezados

* Cada página debe tener un solo título de nivel `#` al principio.
* Los capítulos en la misma pagina deben tener títulos de nivel `##`.
* Los sub-capítulos necesitan incrementar el numero de `#` en el encabezado de acuerdo al su profundidad de anidamiento.
* El titulo de la pagina debe seguir el [Estilo APA][title-case].
* Todos los capítulos deben seguir el [Estilo APA ][sentence-case].

Usando `Quick Start` como ejemplo:

```markdown
# Inicio rápido

...

## Proceso principal

...

## Proceso de renderizado

...

## Ejecuta tu aplicación

...

### Ejecutar como una distribución

...

### Binario Electron descargado manualmente

...
```

Para referencias API, hay excepciones para esta regla.

## Reglas de Markdown

This repository uses the [`markdownlint`][markdownlint] package to enforce consistent Markdown styling. For the exact rules, see the `.markdownlint.json` file in the root folder.

There are a few style guidelines that aren't covered by the linter rules:

<!--TODO(erickzhao): make sure this matches with the lint:markdownlint task-->
* Usa `sh` en vez de `cmd` en code blocks (debido al resaltador de sintaxis).
* Keep line lengths between 80 and 100 characters if possible for readability purposes.
* No anidar listas de más de 2 niveles (debido al renderizador markdown).
* Todos los bloques de código `js` y `javascript` están analizados con [standard-markdown](https://www.npmjs.com/package/standard-markdown).
* Para listas no ordenadas, use asteriscos en lugar de guiones.

## Escoger palabras

* Utilice "podrá" en vez de "podría" al describir resultados.
* Prefiere "en el ___ proceso" sobre "en".

## Referencias API

Las siguientes reglas sólo se aplican a la documentación de APIs.

### Titulo y descripción

Each module's API doc must use the actual object name returned by `require('electron')` as its title (such as `BrowserWindow`, `autoUpdater`, and `session`).

Directly under the page title, add a one-line description of the module as a markdown quote (beginning with `>`).

Using the `session` module as an example:

```markdown
# session

> Administra sesiones de navegador, cookies, caché, configuración del proxy, etc.
```

### Métodos del módulo y eventos

Para módulos que no son clases, sus métodos y los eventos deben esar listados bajo los capítulos `## Métodos` y `## Eventos`.

Usando `autoUpdater` como ejemplo:

```markdown
# autoUpdater

## Eventos

### Evento: 'error'

## Métodos

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Clases

* Las clases API o las clases que forman parte de los módulos también deben ser listadas bajo el capítulo `## clase: TheClassName`.
* Una página puede tener múltiples clases.
* Constructors must be listed with `###`-level headings.
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) must be listed under a `### Static Methods` chapter.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* All methods that have a return value must start their description with "Returns `[TYPE]` - [Return description]"
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Los Eventos de Instancia deben aparecer listados bajo un capítulo de `### Eventos de Instancia`.
* Las propiedades de la instancia deben estar listadas bajo un capítulo `### Propiedades de Instancia`.
  * Instance Properties must start with "A [Property Type] ..."

Usando las clases `Session` y `Cookies` como ejemplo:

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

### Methods and their arguments

El capítulo de métodos debe estar de la siguiente forma:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - Una descripción del parámetro.
* `optional` Integer (opcional) - Otra descripción de parámetro.

...
```

#### Heading level

The heading can be `###` or `####`-levels depending on whether the method belongs to a module or a class.

#### Function signature

Para módulos, el `objectName` es el nombre del módulo. Para las clases debe ser el nombre de la instancia de la clase y no debe ser el mismo nombre del módulo.

Por ejemplo, los métodos de la clase `Session` bajo el módulo `session` deben usar `ses` como el `objectName`.

Optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```markdown
requerido[, opcional]
```

#### Argument descriptions

More detailed information on each of the arguments is noted in an unordered list below the method. The type of argument is notated by either JavaScript primitives (e.g. `String`, `Promise`, or `Object`), a custom API structure like Electron's [`Cookie`](api/structures/cookie.md), or the wildcard `any`.

If the argument is of type `Array`, use `[]` shorthand with the type of value inside the array (for example,`any[]` or `String[]`).

If the argument is of type `Promise`, parametrize the type with what the promise resolves to (for example, `Promise<void>` or `Promise<String>`).

If an argument can be of multiple types, separate the types with `|`.

La descripción para los argumentos de tipo `Function` deben dejar en claro cómo podrían ser llamados y la lista de tipos de parámetros que se le serán pasados.

#### Platform-specific functionality

Si un argumento o un método es único para ciertas plataformas, esas plataformas son denotadas usando una lista con espacio delimitado y en cursiva siguiendo el tipo de data. Los valores pueden ser `macOS`, `Windows`, o `Linux`.

```markdown
* `animate` Booleano (opcional) _macOS_ _Windows_ - Anima la cosa.
```

### Eventos

El capítulo de eventos debe estar de la siguiente forma:

```markdown
### Evento: 'wake-up'

Devuelve:

* `time` String

...
```

The heading can be `###` or `####`-levels depending on whether the event belongs to a module or a class.

Los argumentos de un evento siguen las mismas reglas que los métodos.

### Propiedades

El capítulo de propiedades debe estar de la siguiente forma:

```markdown
### session.defaultSession

...
```

The heading can be `###` or `####`-levels depending on whether the property belongs to a module or a class.

## Documentation translations

Ver [electron/electron-i18n](https://github.com/electron/i18n#readme)

[title-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case
[sentence-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case
[markdownlint]: https://github.com/DavidAnson/markdownlint
