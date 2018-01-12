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
* Todos los métodos que tengan un valor de retorno deben empezar su descripción con "Retornos `[TYPE]` - Descripción de retorno" 
  * Si el método devuelve un `Objeto`, su estructura puede ser especificada usando una coma seguida de un salto de línea y luego una lista desordenada de propiedades en el mismo estilo como parámetros de la función.
* Los Eventos de Instancia deben aparecer listados bajo un capítulo de `### Eventos de Instancia`.
* Las Propiedades de Instancia deben ser listados bajo un `capítulo de` ### Propiedades de Instancia. 
  * Las propiedades de instancia deben empezar con "Un [Tipo de Propiedad]..."

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
### `objectName.methodName(requiere[, opcional]))`

* `requiere`Cuerda - Una descripción del parámetro.  
*`opcional` Entero (opcional) - Otra descripción del parámetro. 

...
```

El título puede ser `###` o `####`-niveles dependiendo de si es un método de un módulo o una clase.

Para módulos, el `objectName` es el nombre del módulo. Para clases, debe ser el nombre de la instancia de la clase y no debe ser el mismo que el nombre del módulo.

Por ejemplo, los métodos de la clase `Session` bajo el módulo `session` deben usar `ses` como el `objectName`.

Los argumentos opcionales son escritos por corchetes `[]` alrededor del argumento opcional, así como la coma requerida si este argumento opcional sigue otro argumento:

```sh
requerido[, opcional]
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