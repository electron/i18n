# Esperando tu primera App. en Electron

Electron te permite crear aplicaciones de escritorio con JavaScript puro proporcionando un sistema de tiempo de ejecución con poderosas APIs nativas (sistema operativo). Puedes verlo como una variante del sistema de tiempo de ejecución Node.js enfocada en aplicaciones de escritorio en lugar de servidores web.

Esto no significa que Electron es una vinculación (binding) de JavaScript a librerías de Interfaces Gráficas. En cambio, Electron usa páginas web como su Interfaz Gráfica, así que también puedes verlo como un navegador Chromium minimal, controlado por JavaScript.

Nota: Este ejemplo también esta disponible como repositorio que puedes descargar y ejecutar inmediatamente.

As far as development is concerned, an Electron application is essentially a Node.js application. The starting point is a `package.json` that is identical to that of a Node.js module. A most basic Electron app would have the following folder structure:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

Crear una carpeta vacía para tu nueva aplicación en Electron. Abre tu línea de comando y ejecuta `npm init` en la misma carpeta.

```sh
npm init
```

npm will guide you through creating a basic `package.json` file. The script specified by the `main` field is the startup script of your app, which will run the main process. An example of your `package.json` might look like this:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

**Note**: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js` (as Node.js does). If this was actually a simple Node application, you would add a `start` script that instructs `node` to execute the current package:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

Turning this Node application into an Electron application is quite simple - we merely replace the `node` runtime with the `electron` runtime.

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Instalar Electron

At this point, you'll need to install `electron` itself. The recommended way of doing so is to install it as a development dependency in your app, which allows you to work on multiple apps with different Electron versions. To do so, run the following command from your app's directory:

```sh
npm install --save-dev electron
```

Other means for installing Electron exist. Please consult the [installation guide](installation.md) to learn about use with proxies, mirrors, and custom caches.

## Electron Development in a Nutshell

Electron apps are developed in JavaScript using the same principles and methods found in Node.js development. All APIs and features found in Electron are accessible through the `electron` module, which can be required like any other Node.js module:

```javascript
const electron = require('electron')
```

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might wait for the application to be ready and open a window:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // y carga el archivo index.html de la aplicación.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

app.on('ready', createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Mantén una referencia global del objeto ventana, si no lo haces, la ventana se
// cerrará automáticamente cuando el objeto de JavaScript sea basura colleccionada.
let win

function createWindow () {
  // Crea la ventana del navegador.
  win = new BrowserWindow({width: 800, height: 600})

  // y carga el archivo index.html de la aplicación.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Abre las herramientas de desarrollo.
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