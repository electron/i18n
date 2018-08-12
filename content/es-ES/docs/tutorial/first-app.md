# Escribiendo tu primera App con Electron

Electron te permite crear aplicaciones de escritorio con JavaScript puro proporcionando un sistema de tiempo de ejecución con poderosas APIs nativas (sistema operativo). Puedes verlo como una variante del sistema de tiempo de ejecución Node.js enfocada en aplicaciones de escritorio en lugar de servidores web.

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

npm te guiará para crear un fichero `package.json` básico. El script especificado por el campo `main` es el script de inicio de tu aplicación, que se encargará de ejecutar el proceso principal. Un ejemplo de tu paquete `package.json` podría tener el siguiente aspecto:

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

## Desarrollo con Electron de un vistazo

Las apps Electron se desarrollan en JavaScript usando los mismos principios y métodos utilizados en el desarrollo para Node.js. Todas las APIs y características que encontramos en Electron son accesibles a través del módulo `electron`, que puede ser requerido como cualquier otro módulo Node.js:

```javascript
const electron = require('electron')
```

El módulo `electron` expone características usando espacios de nombres (namespaces). Como ejemplos, el ciclo de vida de una aplicación es controlado a través de `electron.app` y las ventanas pueden crearse usando la clase `electron.BrowserWindow`. Un fichero `main.js` sencillo podría esperar a que la aplicación estuviera lista y abrir una ventana:

```javascript
const {app, BrowserWindow} = require('electron')

function createWindow () {
  // Crea la ventana del navegador.
  win = new BrowserWindow({width: 800, height: 600})

  // y carga el archivo index.html de la aplicación.
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

```javascript
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Crea la ventana del navegador.
  win = new BrowserWindow({width: 800, height: 600})

  // y carga el archivo index.html de la aplicación.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitido cuando la ventana es cerrada.
  win.on('closed', () => {
    // Desreferencia el objeto ventana, usualmente tu guardarias ventanas
    // en un arreglo si tu aplicación soporta multi ventanas, este es el momento
    // cuando tu deberías borrar el elemento correspiente.
    win = null
  })
}

// Este método será llamado cuando Electron haya terminado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
app.on('ready', createWindow)

// Salir cuando todas las ventanas estén cerradas.
app.on('window-all-closed', () => {
  // En macOS es común para las aplicaciones y sus barras de menú
  // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // En macOS es común volver a crear una ventana en la aplicación cuando el
  // icono del dock es clickeado y no hay otras ventanas abieras.
  if (win === null) {
    createWindow()
  }
})

// En este archivo tu puedes incluir el resto del código del proceso principal de
// tu aplicación. Tu también puedes ponerlos en archivos separados y requerirlos aquí.
```

Finalmente el archivo `index.html` es la página web tu quieres mostrar:

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

## Ejecutar su aplicación

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you can try your app by running `npm start` from your application's directory.

## Trying this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com).

```sh
# Clonar el repositorio
$ git clone https://github.com/electron/electron-quick-start
# ir al repositorio
$ cd electron-quick-start
# instalar dependencias
$ npm install
# ejecute la aplicación
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).