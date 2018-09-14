# Escribiendo tu primera App con Electron

Electron te permite crear aplicaciones de escritorio con JavaScript puro proporcionando un sistema de tiempo de ejecución con poderosas APIs nativas (sistema operativo). Puedes verlo como una variante del sistema de tiempo de ejecución Node.js enfocada a aplicaciones de escritorio en lugar de servidores web.

Esto no significa que Electron sea una vinculación (binding) de JavaScript a librerías de Interfaces Gráficas de Usuario (GUI). En cambio, Electron usa páginas web a modo de Interfaz Gráfica, así que también puedes verlo como un navegador Chromium mínimo, controlado por JavaScript.

**Nota**: Este ejemplo también esta disponible como un repositorio que puedes [descargar y ejecutar inmediatamente](#trying-this-example).

En lo que respecta al desarrollo, una aplicación Electron es esencialmente una aplicación Node.js. Comenzaríamos con un fichero `package.json` idéntico al que se usaría en un módulo Node.js. Una aplicación Electron muy básica podría tener la siguiente estructura de carpeta:

```text
tu-app/
├── package.json
├── main.js
└── index.html
```

Crea una carpeta vacía para tu nueva aplicación Electron. Abre tu cliente de línea de comandos y ejecuta `npm init` desde esa misma carpeta.

```sh
npm init
```

npm te guiará en la creación de un fichero `package.json` básico. El script especificado por el campo `main` es el script de inicio de tu aplicación, que se encargará de ejecutar el proceso principal. Un ejemplo de tu fichero `package.json` podría tener el siguiente aspecto:

```json
{
  "name": "tu-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

**Nota**: Si el campo `main` no está presente en el fichero `package.json`, Electron intentará cargar un fichero `index.js` (como hace Node.js). Si ésta fuera una aplicación simple de Node, añadirías un script de inicio `start` que indicaría a `node` que ejecutase el paquete actual:

```json
{
  "name": "tu-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

Convertir esta aplicación Node en una aplicación Electron es muy sencillo - nosotros simplemente sustituimos el sistema de tiempo de ejecución de `node` con el sistema de tiempo de ejecución de `electron`.

```json
{
  "name": "tu-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Instalando Electron

En este momento, necesitarás instalar el propio `electron`. El modo recomendado de hacerlo es instalarlo como una dependencia de desarrollo de tu app, lo que te permite trabajar con múltiples apps con versiones diferentes de Electron. Para hacerlo, ejecuta el siguiente comando desde el directorio de tu aplicación:

```sh
npm install --save-dev electron
```

Existen otras formas de instalar Electron. Por favor, consulta la [guía de instalación](installation.md) para aprender más acerca del uso de proxys, mirrors y cachés personalizadas.

## Desarrollo de Electron en pocas palabras

Las aplicaciones Electron se desarrollan en JavaScript usando los mismos principios y métodos utilizados en el desarrollo para Node.js. Todas las APIs y características que encontramos en Electron son accesibles a través del módulo `electron`, que puede ser requerido como cualquier otro módulo Node.js:

```javascript
const electron = require('electron')
```

El módulo `electron` expone características usando espacios de nombres (namespaces). Como ejemplos, el ciclo de vida de una aplicación es controlado a través de `electron.app` y las ventanas pueden crearse usando la clase `electron.BrowserWindow`. Un fichero `main.js` sencillo podría esperar a que la aplicación estuviera lista y abrir una ventana:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Crea la ventana del navegador.
  win = new BrowserWindow({ width: 800, height: 600 })

  // y carga el archivo index.html de la aplicación.
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

El fichero `main.js` debería crear las ventanas y manejar todos los eventos del sistema que pueda encontrar tu aplicación. Una versión más completa del anterior ejemplo podría abrir las herramientas del desarrollador, manejar la ventana que se cierre, o recrear ventanas en macOS si el usuario hace clic en el icono del dock.

```javascript
const { app, BrowserWindow } = require('electron')

// Mantén una referencia global del objeto window, si no lo haces, la ventana 
// se cerrará automáticamente cuando el objeto JavaScript sea eliminado por el recolector de basura.
let win

function createWindow () {
  // Crea la ventana del navegador.
  win = new BrowserWindow({ width: 800, height: 600 })

  // y carga el archivo index.html de la aplicación.
  win.loadFile('index.html')

  // Abre las herramientas de desarrollo (DevTools).
  win.webContents.openDevTools()

  // Emitido cuando la ventana es cerrada.
  win.on('closed', () => {
    // Elimina la referencia al objeto window, normalmente  guardarías las ventanas
    // en un vector si tu aplicación soporta múltiples ventanas, este es el momento
    // en el que deberías borrar el elemento correspondiente.
    win = null
  })
}

// Este método será llamado cuando Electron haya terminado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs pueden usarse sólo después de que este evento ocurra.
app.on('ready', createWindow)

// Sal cuando todas las ventanas hayan sido cerradas.
app.on('window-all-closed', () => {
  // En macOS es común para las aplicaciones y sus barras de menú
  // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // En macOS es común volver a crear una ventana en la aplicación cuando el
  // icono del dock es clicado y no hay otras ventanas abiertas.
  if (win === null) {
    createWindow()
  }
})

// En este archivo puedes incluir el resto del código del proceso principal de
// tu aplicación. También puedes ponerlos en archivos separados y requerirlos aquí.
```

Finalmente el archivo `index.html` es la página web que quieres mostrar:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    Estamos usando node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    y Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Ejecuta tu aplicación

Una vez que hayas creado tus ficheros iniciales `main.js`, `index.html` y `package.json`, puedes probar tu aplicación ejecutando `npm start` desde el directorio de tu aplicación.

## Probando este ejemplo

Clona y ejecuta el código de este tutorial usando el repositorio [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Nota**: Ejecutar esto requiere [Git](https://git-scm.com) y[npm](https://www.npmjs.com/).

```sh
# Clona el repositorio
$ git clone https://github.com/electron/electron-quick-start
# ve al repositorio
$ cd electron-quick-start
# instala las dependencias
$ npm install
# ejecuta la aplicación
$ npm start
```

Para tener una lista de boilerplates y herramientas para iniciar tu proceso de desarrollo, visita la [documentación de boilerplates y CLIs](./boilerplates-and-clis.md).