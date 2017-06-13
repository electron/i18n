# Manual de estilo de documentación de Electron

Estas son las directrices para la documentación de Electron de la escritura.

## Títulos

* Cada página debe tener un título de nivel #</code> ` solo en la parte superior.</li>
<li>Capítulos en la misma página deben tener títulos de ##` nivel de `.</li>
<li>Subcapítulos que aumentar el número de <code> #` en el título según su profundidad de anidamiento.
* Todas las palabras en el título de la página deben escribirse con mayúscula, excepto conjunciones como "de" y "y".
* Debe escribirse con mayúscula sólo la primera palabra de un título de capítulo.

Uso de Start</code> de `Quick como ejemplo:</p>

<pre><code class="markdown"># Inicio rápido... ## proceso principal... ## proceso Renderer... ## ejecutar tu aplicación... ### ejecutar como una distribución... ### manualmente descargar Electron binaria...
`</pre> 

Para referencias de API, hay excepciones a esta regla.

## Reglas de descuento

* Utilice `bash` en lugar de `cmd` en bloques de código (debido al resaltador de sintaxis).
* Las líneas deben estar envueltos en 80 columnas.
* No anidar listas de más de 2 niveles (debido al renderizador de descuento).
* Todos los bloques de código `js` y `javascript` son linted con[standard-markdown](http://npm.im/standard-markdown).

## Recogiendo palabras

* Utilice "a" "d" al describir los resultados.
* Prefieren "en el proceso de ___" en "on".

## Referencias de API

Las siguientes reglas sólo se aplican a la documentación del API.

### Título de la página

Cada página debe usar el nombre real del objeto devuelto por `require` ('Electron') como el título, como `BrowserWindow`, `autoUpdater` y `session`.

En la página de azulejo debe ser una descripción de una línea a partir de `>`.

Uso de `session` como ejemplo:

```markdown
# sesión> administrar sesiones de navegador, cookies, caché, configuración de proxy, etcetera.
```

### Eventos y métodos del módulo

Para los módulos que no son clases, sus métodos y los eventos deben figurar bajo el ` ## Methods` y ` ## Events` capítulos.

Uso de `autoUpdater` como ejemplo:

```markdown
# autoUpdater ## eventos ### evento: 'error' ## métodos ### 'autoUpdater.setFeedURL (url [, requestHeaders])'
```

### Clases

* Clases de la API o clases que forman parte de los módulos deben figurar bajo una clase de` ##: TheClassName` capítulo.
* Una página puede tener múltiples clases.
* Constructores deben figurar con títulos de ###</code> nivel de `.</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static">Static Methods</a> debe aparecer en un capítulo <code> ### Methods` estática.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) debe aparecer en un capítulo ` ### Methods` de instancia.
* Todos los métodos que tienen un valor de retorno deben comenzar su descripción con "rendimientos `[TYPE]` -Descripción de volver " 
  * Si el método devuelve un `Object`, su estructura puede especificarse con un coma seguida de un salto de línea entonces una lista desordenada de viviendas en el mismo estilo como parámetros de la función.
* Eventos de la instancia deben aparecer bajo un capítulo ` ### Events` de instancia.
* Propiedades de instancia deben figurar bajo un `### Propiedades de instancia` capítulo. 
  * Propiedades de instancia deben empezar con "un [tipo]..."

Con las clases `Session` y `Cookies` como ejemplo:

```markdown
sesión # ## métodos ### session.fromPartition(partition) ## propiedades ### session.defaultSession ## clase: sesión ### instancia eventos ### evento: 'voluntad-download' ### métodos de instancia ### 'ses.getCacheSize(callback)' ### propiedades de instancia ### 'ses.cookies' ## clase: galletas ### métodos de instancia ### 'cookies.get (filtro, callback)'
```

### Métodos

El capítulo de métodos debe ser de la siguiente forma:

```markdown
### ' objectName.methodName (requiere [, opcional]))' * 'requiere' String - una descripción del parámetro.
* '' entero opcional (opcional) - otra descripción del parámetro.

...
```

El título puede ser `` ### ` ### `-niveles o dependiendo de si es un método de una clase o un módulo.

Para los módulos, el `objectName` es nombre del módulo. Para las clases, debe ser el nombre de la instancia de la clase y no debe ser el mismo que el nombre del módulo.

Por ejemplo, los métodos de la clase `Session` en el módulo de `session` deben utilizar `ses` como el `objectName`.

Los argumentos opcionales son notated por corchetes ` []` que rodea el argumento opcional, así como la coma si este argumento opcional sigue otro argumento:

    necesario [, opcional]
    

A continuación el método es la información más detallada sobre cada uno de los argumentos. El tipo de argumento se realiza por cualquiera de los tipos comunes:

* [`Cadena`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Número`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Objeto`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Arreglo de discos`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* O un tipo personalizado como [`WebContent`](api/web-contents.md) del Electron

Si un argumento o un método es único en ciertas plataformas, las plataformas se denotaron usando una lista en cursiva delimitado siguiendo el tipo de datos. Valores pueden ser `macOS`, `Windows` o `Linux`.

```markdown
* ' animar' Boolean _macOS_ (opcional) _Windows_ - animar la cosa.
```

Argumentos de tipo `Array` deben especificar qué elementos de la matriz se puede incluir en la descripción a continuación.

La descripción de argumentos de tipo `Function` debe dejar claro cómo se puede llamar y enumerar los tipos de los parámetros que se pasan a él.

### Eventos

El capítulo de eventos debe ser en la forma siguiente:

```markdown
### Evento: 'despertador' devuelve: * cadena de tiempo...
```

El título puede ser `` ### ` ### `-niveles o dependiendo de si es un evento de una clase o un módulo.

Los argumentos de un evento siguen las mismas reglas que los métodos.

### Propiedades

El capítulo de propiedades debe ser en la forma siguiente:

```markdown
### session.defaultSession...
```

El título puede ser `` ### ` ### `-niveles o dependiendo de si es una propiedad de una clase o un módulo.

## Traducciones de documentación

Las traducciones de la documentación de Electron se encuentra dentro del directorio `docs-translations`.

Para agregar otro sistema (o conjunto parcial):

* Cree un subdirectorio denominado por la abreviatura del idioma.
* Traducir los archivos.
* Actualización de la `README.md` en el directorio de tu lengua para vincular a los archivos que se han traducido.
* Agregar un enlace al directorio de tu traducción en las principales[README](https://github.com/electron/electron#documentation-translations) de electrones.

Tenga en cuenta que los archivos en `docs translations` sólo deben incluir los traducidos, los archivos originales del inglés no deben copiar allí.