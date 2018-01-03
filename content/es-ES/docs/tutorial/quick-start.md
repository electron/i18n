# Inicio Rápido

Electron te permite crear aplicaciones de escritorio con puro JavaScript proporcionando un sistema de tiempo de ejecución con poderosas APIs nativas (sistema operativo). Puedes verlo como una variante del sistema de tiempo de ejecución Node.js enfocada en aplicaciones de escritorio en lugar de servidores web.

Esto no significa que Electron es una vinculación (binding) de JavaScript a librerías de Interfaces Gráficas. En cambio, Electron usa páginas web como su Interfaz Gráfica, así que también puedes verlo como un navegador Chromium minimal, controlado por JavaScript.

### Proceso Principal

En Electron, el proceso que ejecuta el script `main` del archivo `package.json` es llamado **el proceso principal**. El script que corre en el proceso principal puede mostrar una GUI (Interfaz Gráfica de Usuario) creando páginas web.

### Renderer Process

Debido a que Electron usa Chromium para mostrar páginas web, la arquitectura multi-proceso de Chromium es también usada. Cada página web en Electron corre en su propio proceso, el cual es llamado **el proceso renderizador**.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Los usuarios de la Electron, sin embargo, tienen el poder de utilizar Node.js APIs en las páginas web permitiendo interacciones inferiores de nivel de sistema operativo.

### Diferencias Entre Proceso Principal y Proceso Renderizador

El proceso principal crea páginas web creando instancias de `BrowserWindow`. Cada instancia de `BrowserWindow` ejecuta la página web en su propio proceso renderizador. Cuando una instancia de `BrowserWindow` es destruida, el proceso renderizador correspondiente es también terminado.

El proceso principal maneja todas las páginas web y sus procesos renderizadores correspondientes. Cada proceso rederizador está aislado y solo le importa la página web corriendo en él.

En páginas web, llamar APIs nativas relacionadas a GUI no está permitido porque manejar recursos nativos de GUI en páginas web es bastante peligroso y es fácil que ocurran fugas de recursos. Si quieres realizar operaciones de GUI en una página web, el proceso renderizador de la página web debe comunicarse con el proceso principal para pedirle que realice esas operaciones.

En Electron, nosotros tenemos varias maneras para comunicarnos entre el proceso principal y el proceso renderizador. Como los módulos [`ipcRenderer`](../api/ipc-renderer.md) y [`ipcMain`](../api/ipc-main.md) para enviar mensajes, y el módulo [`remote`](../api/remote.md) para comunicación de estilo RPC. Existe tambié una entrada de FAQ en [como compartir data entre páginas web](../faq.md#how-to-share-data-between-web-pages).

## Escribe tu Primera Aplicación de Electron

Generalmente, una aplicación de Electron está estructurada así:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

El formato de `package.json` es exactamente el mismo como el de los modulos de Node, y el script especificado por el campo `main` es el script que pone en marcha tu aplicación, el cual ejecutará el proceso principal. Un ejemplo de tu `package.json` puede lucir así:

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Nota**: si el campo `main` no está presente en el archivo `package.json`, Electron intentará cargar `index.js`.

El archivo `main.js` debe crear ventanas y manejar eventos de sistema, siendo un ejemplo típico:

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

## Ejecuta tu aplicación

Una vez hayas creado tus `main.js`, `index.html`, y `package.json` archivos iniciales, probablemente querrás intentar ejecutar tu aplicación localmente para probarla y asegurarte que funciona como esperado.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) es un módulo de `npm` que contiene versiones pre-compiladas de Electron.

Si tú lo has instalado globalmente con `npm`, entonces solo necesitas ejecutar lo siguiente en el directorio del código de tu aplicación:

```sh
electron .
```

Si lo has instalado localmente, entonces ejecuta:

#### macOS / Linux

```sh
$ ./node_modules/.bin/electron .
```

#### Windows

```sh
$ .\node_modules\.bin\electron .
```

#### Node v8.2.0 and later

```sh
$ npx electron .
```

### Manually Downloaded Electron Binary

If you downloaded Electron manually, you can also use the included binary to execute your app directly.

#### macOS

```sh
$ ./Electron.app/Contents/MacOS/Electron your-app/
```

#### Linux

```sh
$ ./electron/electron your-app/
```

#### Windows

```sh
$ .\electron\electron.exe your-app\
```

`Electron.app` here is part of the Electron's release package, you can download it from [here](https://github.com/electron/electron/releases).

### Run as a distribution

After you're done writing your app, you can create a distribution by following the [Application Distribution](./application-distribution.md) guide and then executing the packaged app.

### Try this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which includes [npm](https://npmjs.org)) on your system.

```sh
# Clonar el repositorio $ git clone https://github.com/electron/electron-quick-start # ir en el repositorio $ cd Electron-quick-start # instalar dependencias $ MNP instalar # ejecute el app $ MNP start
```

Para más aplicaciones de ejemplo, vea la[list de boilerplates](https://electronjs.org/community#boilerplates) creado por la comunidad Electron impresionante.