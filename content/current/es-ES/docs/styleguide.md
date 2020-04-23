# Guía de estilo de documentación Electron

Estas son las directrices para escribir documentación de Electron.

## Títulos

* Cada página debe tener un solo título de nivel `#` al principio.
* Los capítulos en la misma página deben tener títulos de nivel `##`.
* Los subcapítulos necesitan aumentar el número de `#` en el título acorde a su profundidad de anidamiento.
* Todas las palabras en el título de la página deben comenzar con mayúscula, excepto las conjunciones como "de" e "y".
* Sólo la primera palabra del título de capítulo se escribir con mayúscula.

Usando `Quick Start` como ejemplo:

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

Para referencias API, hay excepciones para esta regla.

## Reglas de Markdown

* Usa `sh` en vez de `cmd` en code blocks (debido al resaltador de sintaxis).
* Las líneas deben estar ajustadas a 80 columnas.
* No anidar listas de más de 2 niveles (debido al renderizador markdown).
* Todos los bloques de código `js` y `javascript` están analizados con [standard-markdown](http://npm.im/standard-markdown).

## Escoger palabras

* Utilice "podrá" en vez de "podría" al describir resultados.
* Prefiere "en el ___ proceso" sobre "en".

## Referencias API

Las siguientes reglas sólo se aplican a la documentación de APIs.

### Título de Página

Cada página debe utilizar el nombre real del objeto devuelto por `require('electron')` como el título, como `BrowserWindow`, `autoUpdater` y `session`.

Debajo del título de la página debe haber una descripción de una línea a partir de `>`.

Usando `session` como ejemplo:

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
* Los constructores deben ser listrados con títulos de nivel `#`-.
* Los [Métodos Estáticos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) deben ser listados bajo un capítulo de`### Métodos Estáticos`.
* Los [Métodos de Instancia](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) deben ser listados bajo un capítulo de `### Métodos de Instancia`.
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description"
  * Si el método devuelve un `Objeto`, su estructura puede ser especificada usando una coma seguida de un salto de línea y luego una lista desordenada de propiedades en el mismo estilo como parámetros de la función.
* Los Eventos de Instancia deben aparecer listados bajo un capítulo de `### Eventos de Instancia`.
* Instance Properties must be listed under an `### Instance Properties` chapter.
  * Las propiedades de instancia deben empezar con "Un [Tipo de Propiedad]..."

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

### Métodos

El capítulo de métodos debe estar de la siguiente forma:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

El título puede ser `###` o `####`-niveles dependiendo de si es un método de un módulo o una clase.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

Por ejemplo, los métodos de la clase `Session` bajo el módulo `session` deben usar `ses` como el `objectName`.

Los argumentos opcionales son escritos por corchetes `[]` alrededor del argumento opcional, así como la coma requerida si este argumento opcional sigue otro argumento:

```sh
requerido[, opcional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Objeto`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* O un tipo personalizado como [`WebContent`](api/web-contents.md) de Electron

Si un argumento o un método es único para ciertas plataformas, esas plataformas son denotadas usando una lista con espacio delimitado y en cursiva siguiendo el tipo de data. Los valores pueden ser `macOS`, `Windows`, o `Linux`.

```markdown
* `animate` Booleano (opcional) _macOS_ _Windows_ - Anima la cosa.
```

Los argumentos tipo `Array` deben especificar qué elementos podría incluir el arreglo en la siguiente descripción.

La descripción para los argumentos de tipo `Function` deben dejar en claro cómo podrían ser llamados y la lista de tipos de parámetros que se le serán pasados.

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

Ver [electron/electron-i18n](https://github.com/electron/i18n#readme)
