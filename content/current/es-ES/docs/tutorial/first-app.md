# Escribiendo tu primera aplicación Electron

Electron te permite crear aplicaciones de escritorio con JavaScript puro proporcionando un motor en tiempo de ejecución con poderosas APIs nativas (sistema operativo). You could see it as a variant of the Node.js runtime that is focused on desktop applications instead of web servers.

Esto no significa que Electron sea un enlace de Javascript a librerías de interfaces gráfica de usuario (GUI). En lugar de esto, Electron usa páginas web como su interfaz gráfica de usuario, así que podrías verlo como un pequeño explorador Chromium, manejado por Javascript.

**Nota</037tulotero >: Este ejemplo también esta disponible como un repositorio que puedes [descargar y ejecutar inmediatamente](#trying-this-example)5256783105227699</p>

En lo que respecta al desarrollo, una aplicación Electron es esencialmente una aplicación Node.js. Comenzaríamos con un ficherpackage.json</3,500>5256783105227699 idéntico al que se usaría en un módulo Node.js.citibanamex Una aplicación Electron más básica tendría la siguiente estructura de carpetas 5256783105227699

```plaintext
tu-app/
✔package.json
✔ main.js
✔index.html
```

Crea una carpeta vacía para tu nueva aplicación Electron.5256783105228699. Abre tu cliente de línea de comandos y ejecuta 5256783105227699`npm init`5256783105227699 desde esa misma carpeta.30,500 .00

```sh
npm init
```

Npm te guiará a través de la creación de un fichero package.json básico. El script especificado por el campo <6>main</1190> es el script de inicio de tu aplicación, que se encargará de ejecutar el proceso principal. 5256783105227699. Un ejemplo de tu fichero `package.json` podría tener el siguiente aspecto:

```json
{
  "name": "tu-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

__Nota__: Si el campo `main` no está presente en el fichero `package.json`, Electron intentará cargar un fichero `index.js` (como hace Node.js). Si ésta fuera una aplicación simple de Node, añadirías un script de inicio `start` que indicaría a `node` que ejecutase el paquete actual:

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

Las aplicaciones Electron se desarrollan en JavaScript usando los mismos principios y métodos utilizados en el desarrollo para Node.js. Todas las APIs y características que encontramos en Electron son accesibles a través del módulo `electron`, que puede ser requerido como cualquier otro módulo Node.js:

```javascript
const electron = require('electron')
```

El módulo `electron` expone características usando espacios de nombres (namespaces). Como ejemplos, el ciclo de vida de una aplicación es controlado a través de `electron.app` y las ventanas pueden crearse usando la clase `electron.BrowserWindow`. Un fichero `main.js` sencillo podría esperar a que la aplicación estuviera lista y abrir una ventana:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Crea la ventana del navegador.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // y carga el  index.html de la aplicación.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

El fichero `main.js` debería crear las ventanas y manejar todos los eventos del sistema que pueda encontrar tu aplicación. Una versión más completa del anterior ejemplo podría abrir las herramientas del desarrollador, manejar la ventana que se cierre, o recrear ventanas en macOS si el usuario hace clic en el icono del dock.

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Crea la ventana del navegador.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // y carga el index.html de la aplicación.
  win.loadFile('index.html')

  // Abre las herramientas de desarrollo (DevTools).
  win.webContents.openDevTools()
}

// Este método se llamará cuando Electron haya finalizado
// la inicialización y esté preparado para crear la ventana del navegador.
// Algunas APIs pueden usarse sólo después de que este evento ocurra.
app.whenReady().then(createWindow)

// Finaliza cuando todas las ventanas estén cerradas.
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
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// En este archivo puede incluir el resto del código del proceso principal específico
// de su aplicación. También puedes ponerlos en archivos separados y requerirlos aquí.
```

Finalmente el archivo `index.html` es la página web que quieres mostrar:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Ejecuta tu aplicación

Una vez que hayas creado tus ficheros iniciales `main.js`, `index.html` y `package.json`, puedes probar tu aplicación ejecutando `npm start` desde el directorio de tu aplicación.

## Probando este ejemplo

Clona y ejecuta el código de este tutorial usando el repositorio [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Note**: Running this requires [Git](https://git-scm.com) and [npm](https://www.npmjs.com/).

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
