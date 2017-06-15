# Empaquetado de la aplicación

Mitigar [issues](https://github.com/joyent/node/issues/6960) todo largo camino nombres en Windows, ligeramente la velocidad de `require` y ocultar el código fuente de la inspección superficial, usted puede elegir empaquetar su aplicación en un archivo [asar](https://github.com/electron/asar) con pequeños cambios a su código fuente.

## Generación de archivo de `asar`

Un archivo de [asar](https://github.com/electron/asar) es un simple formato de alquitrán-como que concatena archivos en un solo archivo. Electrón puede leer archivos arbitrarios de él sin desempacar el archivo entero.

Pasos para empaquetar su aplicación en un archivo `asar`:

### 1. Instale la utilidad de asar

```bash
$ MNP instalar asar -g
```

### 2. paquete con `asar pack`

```bash
$ asar paquete su aplicación app.asar
```

## Usando archivos de `asar`

En Electron hay dos conjuntos de API: API de nodo proporcionadas por Node.js y API Web proporcionadas por el cromo. Ambas APIs admiten archivos de lectura de archivos de `asar`.

### Nodo de API

Con parches especiales en Electron, nodo API como `fs.readFile` y `require` tratan `asar` archivos como directorios virtuales y los archivos como archivos normales en el sistema de archivos.

Por ejemplo, supongamos que tenemos un archivo de `example.asar` bajo la ruta/`/to`:

```bash
$ asar lista /path/to/example.asar /app.js /file.txt /dir/module.js /static/index.html /static/main.css /static/jquery.min.js
```

Leer un archivo en el archivo `asar`:

```javascript
const fs = require('fs') fs.readFileSync('/path/to/example.asar/file.txt')
```

Todos los archivos bajo la raíz del archivo de la lista:

```javascript
const fs = require('fs') fs.readdirSync('/path/to/example.asar')
```

Utilizar un módulo desde el archivo:

```javascript
require('/Path/to/example.asar/dir/Module.js')
```

También puede visualizar una página web en un archivo de `asar` con `BrowserWindow`:

```javascript
const {BrowserWindow} = require('electron') que ganar = nuevo BrowserWindow({width: 800, height: 600}) win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

En una página web, pueden solicitar los archivos en un archivo con el protocolo de `file:`. Como la API de nodo, `asar` archivos son tratados como directorios.

Por ejemplo, para obtener un archivo con `$ .get`:

```html
<script> sea $ = require('./jquery.min.js') $recibir ("archivo: / / / ruta/a/example.asar/archivo.txt ', (datos) = > {console.log(data)})</script>
```

### Tratamiento de un archivo `asar` como un archivo Normal

Para algunos casos como verificar suma de comprobación del archivo de `asar`, tenemos que leer el contenido de un archivo `asar` como un archivo. Para ello puede utilizar el módulo de`original-fs` incorporado que proporciona APIs de `fs` original sin `asar` apoyo:

```javascript
const originalFs = require('original-fs') originalFs.readFileSync('/path/to/example.asar')
```

También se puede definir `process.noAsar` `true` para desactivar el soporte para `asar` en el módulo de `fs`:

```javascript
const fs = require('fs') process.noAsar = true fs.readFileSync('/path/to/example.asar')
```

## Limitaciones del nodo API

Aunque tratamos mucho `asar` archivos de la API de nodo funcionan como directorios tanto como sea posible, todavía hay limitaciones debido a la naturaleza de bajo nivel de la API de nodo.

### Archivos son de sólo lectura

El archivo no puede modificarse por lo que todas las API de nodo que puede modificar los archivos no funciona con archivos de `asar`.

### Directorio de trabajo no puede fijarse en directorios de archivo

Aunque `asar` archivos son tratados como directorios, no hay directorios reales en el sistema de archivos, por lo que nunca puede establecer el directorio de trabajo a los directorios en archivos de `asar`. Les pasa como el `cwd` opción de algunas APIs también producirá errores.

### Adicionales desempacar en algunas API

Mayoría `fs` APIs puede leer un archivo u obtener información de un archivo de `asar` archivos sin descomprimir, pero para algunas APIs que se basan en pasar la ruta del archivo real a llamadas del sistema subyacente, Electron será extraer los archivos necesarios en un archivo temporal y pasar la ruta del archivo temporal a las APIs para hacerlos funcionar. Agrega un poco arriba de las APIs.

API que requiere desempacar extra son:

* `child_process.execFile`
* `child_process.execFileSync`
* `FS.Open`
* `fs.openSync`
* `process.dlopen` - utilizado por `require` en los módulos nativos

### Información falsa tendencia de `fs.stat`

El objeto `Stats` devuelto por `fs.stat` y sus amigos en archivos de `asar` archivos se genera por adivinar, porque esos archivos no existen en el sistema de archivos. Así que usted no debe confiar en el objeto `Stats` excepto que el tamaño del archivo y comprobación de tipo de archivo.

### Ejecución de binarios dentro del archivo `asar`

Hay APIs de nodo que puede ejecutar binarios como `child_process.exec`, `child_process.spawn` y `child_process.execFile`, pero `execFile` sólo es compatible para ejecutar binarios dentro del archivo `asar`.

Esto es porque `exec` y `spawn` aceptan `command` en vez de `file` como entrada y `command`s se ejecutan bajo cáscara. No hay ninguna forma fiable de determinar si un comando utiliza un archivo en el archivo de asar, y aún si lo hacemos, podemos no estar seguros si podemos reemplazar la ruta de comando sin efectos secundarios.

## Agregar archivos desempaquetados en el archivo `asar`

Como se indicó anteriormente, algunas que APIs de nodo será descomprimir el archivo al sistema de archivos cuando llame, aparte de los problemas de rendimiento, también podría conducir a falsas alertas de antivirus.

Para evitar esto, puede descomprimir algunos archivos creando archivos mediante el uso de la` - opción de unpack`, un ejemplo de excluir las bibliotecas compartidas de los módulos nativos es:

```bash
$ asar paquete app app.asar--Desempaque *.node
```

Después de ejecutar el comando, aparte de la `app.asar`, también hay un `app.asar.unpacked` carpeta generada que contiene los archivos desempaquetados, usted debe copiar junto con `app.asar` al enviar a los usuarios.