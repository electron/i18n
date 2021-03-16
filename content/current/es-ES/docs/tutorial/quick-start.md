# Guía de inicio rápido

## Inicio rápido

Electron es un framework que le permite crear aplicaciones de escritorio con JavaScript, HTML y CSS. Estas aplicaciones pueden ser empaquetadas para ejecutarse directamente en macOS, Windows o Linux, o distribuidas a través de la Mac App Store o la Microsoft Store.

Por lo general, usted crea una aplicación de escritorio para un sistema operativo (SO) usando los frameworks específicos de aplicaciones nativas de cada sistema operativo. Electron hace posible escribir su aplicación una vez usando tecnologías que ya conoce.

### Prerequisitos

Antes de continuar con Electron necesita instalar [Node.js](https://nodejs.org/en/download/). Recomendamos que instale la última versión de `LTS` o `Current` disponible.

> Por favor instale Node.js usando instaladores precompilados para su plataforma. De lo contrario, puede encontrarse con problemas de incompatibilidad con diferentes herramientas de desarrollo.

Para comprobar que Node.js fue instalado correctamente, escriba los siguientes comandos en su cliente de terminal:

```sh
node -v
npm -v
```

Los comandos deben imprimir las versiones de Node.js y npm en consecuencia. Si ambos comandos tienen éxito, está listo para instalar Electron.

### Crear una aplicación básica

Desde una perspectiva de desarrollo, una aplicación Electron es esencialmente una aplicación Node.js. Esto significa que el punto de partida de su aplicación Electron será un archivo `package.json` como en cualquier otra aplicación Node.js. Una aplicación mínima de Electron tiene la siguiente estructura:

```plaintext
my-electron-app/
Ningés; package.json
mañanose.com, main.js
Ninguno. index.html
```

Vamos a crear una aplicación básica basada en la estructura anterior.

#### Install Electron

Crea una carpeta para tu proyecto e instala Electron allí:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### Crear el script principal

El script principal especifica el punto de entrada de su aplicación Electron (en nuestro caso, el archivo `main.js` ) que ejecutará el proceso principal. Por lo general, el script que se ejecuta en el proceso principal controla el ciclo de vida de la aplicación, muestra la interfaz gráfica de usuario y sus elementos, realiza interacciones nativas del sistema operativo y crea procesos de Renderer dentro de las páginas web. Una aplicación Electron sólo puede tener un proceso principal.

El script principal puede verse de la siguiente manera:

```javascript fiddle='docs/fiddles/quick-start'
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

##### ¿Qué está ocurriendo anteriormente?

1. Línea 1: En primer lugar, importas `los módulos` y `Navegador` del paquete `electrón` para poder gestionar los eventos del ciclo de vida de tu aplicación así como crear y controlar las ventanas del navegador.
2. Line 3: After that, you define a function that creates a [new browser window](../api/browser-window.md#new-browserwindowoptions) with node integration enabled, loads `index.html` file into this window (line 12, we will discuss the file later).
3. Line 15: You create a new browser window by invoking the `createWindow` function once the Electron application [is initialized](../api/app.md#appwhenready).
4. Line 17: You add a new listener that tries to quit the application when it no longer has any open windows. Este oyente es un no-op en macOS debido al [comportamiento de administración de ventanas](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac) del sistema operativo.
5. Line 23: You add a new listener that creates a new browser window only if when the application has no visible windows after being activated. Por ejemplo, después de lanzar la aplicación por primera vez, o volver a lanzar la aplicación en ejecución.

#### Crear una página web

Esta es la página web que desea mostrar una vez inicializada la aplicación. Esta página web representa el proceso de Renderer. Puede crear múltiples ventanas de navegador, donde cada ventana utiliza su propio Renderer independiente. Cada ventana se puede otorgar opcionalmente con acceso completo a la API de Node.js a través de la preferencia `nodeIntegration`.

La página `index.html` se ve como sigue:

```html fiddle='docs/fiddles/quick-start'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hola mundo!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hola mundo!</h1>
    <p>
        Estamos usando node <script>document.write(process.versions.node)</script>,
        Chrome <script>document.write(process.versions.chrome)</script>,
        y Electron <script>document.write(process.versions.electron)</script>.
    </p>
</body>
</html>
```

#### Modifica tu archivo package.json

Su aplicación Electron utiliza el archivo `package.json` como el punto de entrada principal (como cualquier otra aplicación Node.js). El script principal de su aplicación es `main.js`, así que modifique el archivo `package.json` en consecuencia:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js"
}
```

> NOTA: Si se omite el campo `principal` , Electron intentará cargar un índice `. s` archivo del directorio que contiene `package.json`.

> NOTE: The `author` and `description` fields are required for packaging, otherwise error will occur when running `npm run make`.

Por defecto, el comando `npm start` ejecutará el script principal con Node.js. Para ejecutar el script con Electron, necesitas cambiarlo como tal:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }
}
```

#### Ejecuta tu aplicación

```sh
npm inicio
```

Su aplicación Electron en ejecución debería verse de la siguiente manera:

![Aplicación Electron más simple](../images/simplest-electron-app.png)

### Paquete y distribución de la aplicación

La forma más simple y rápida de distribuir su aplicación recién creada es usando [Electron Forge](https://www.electronforge.io).

1. Importar Electron Forge a su carpeta App:

    ```sh
    npm install --save-dev @electron-forge/cli
    npx electron-forge import

    ✔ Checking your system
    ✔ Initializing Git Repository
    ✔ Writing modified package.json file
    ✔ Installing dependencies
    ✔ Writing modified package.json file
    ✔ Fixing .gitignore

    Hemos INTENTADO convertir tu aplicación a un formato que electron-forge entiende.

    Gracias por usar "electron-forge"!!!
    ```

1. Crear una distributable:

    ```sh
    npm run make

    > my-gsod-electron-app@1.0. make /my-electron-app
    > electron-forge make

    ✔ Chequeando su sistema
    ✔ Resolviendo la configuración de Forge
    Necesitamos empaquetar su aplicación antes de que podamos hacerlo
    ✔ Preparando la aplicación de paquete para arch: x64
    ✔ Preparando las dependencias nativas
    ✔ Aplicación de empaquetado
    Creando para los siguientes objetivos: zip
    ✔ Making for target: zip - En plataforma: darwin - Para arch: x64
    ```

    Electron-forge crea la carpeta `out` donde se ubicará tu paquete:

    ```plain
    // Ejemplo para MacOS
    out/
    Ninguno: out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    Ninguno...
    ★ out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

## Aprender lo básico

Esta sección le guía a través de los conceptos básicos de cómo funciona Electron bajo el capó. Su objetivo es fortalecer el conocimiento sobre Electron y la aplicación creada anteriormente en la sección de Quickstart.

### Arquitectura de aplicación

Electron consta de tres pilares principales:

* **Chromium** para mostrar contenido web.
* **Node.js** para trabajar con el sistema de archivos local y el sistema operativo.
* **API personalizadas** para trabajar con funciones nativas del sistema operativo a menudo necesarias.

Desarrollar una aplicación con Electron es como construir una aplicación Node.js con una interfaz web o construir páginas web con una integración perfecta de Node.js.

#### Proceso Principal y Proceso Visualizador

Como ya se mencionó anteriormente, Electron tiene dos tipos de procesos: Principal y Renderer.

* El proceso principal **crea** páginas web creando `instancias de Navegador`. Cada instancia de `BrowserWindow` ejecuta la página web en su proceso de renderizado. Cuando se destruye una instancia de `BrowserWindow` , también se termina el proceso correspondiente de Renderer.
* El proceso principal **administra** todas las páginas web y sus correspondientes procesos de Renderer.

----

* El proceso de Renderer **administra** sólo la página web correspondiente. Un fallo en un proceso de Renderer no afecta a otros procesos de Renderer.
* El proceso de Renderer **comunica** con el proceso principal a través de IPC para realizar operaciones de GUI en una página web. Llamar directamente a APIs nativas relacionadas con GUI desde el proceso de Renderer está restringido debido a preocupaciones de seguridad y potencial fuga de recursos.

----

La comunicación entre procesos es posible a través de módulos de Comunicación Inter-Procesos (IPC): [`ipcMain`](../api/ipc-main.md) y [`ipcRenderer`](../api/ipc-renderer.md).

#### APIs

##### Electron API

Las APIs de electrón están asignadas en base al tipo de proceso, lo que significa que algunos módulos pueden ser usados desde el proceso Principal o Renderer, y algunos de ambos. La documentación de la API de Electron indica en qué proceso se puede utilizar cada módulo.

Por ejemplo, para acceder a la API de Electron en ambos procesos, requiere su módulo incluido:

```js
const electron = require('electron')
```

Para crear una ventana, llama a la clase `BrowserWindow` , que sólo está disponible en el proceso principal:

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

Para llamar al proceso principal desde el Renderer, utilice el módulo IPC:

```js
// En el proceso principal
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... hacer acciones en nombre del Renderer
})
```

```js
// En el proceso de Renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> NOTA: Debido a que los procesos de Renderer pueden ejecutar código no confiable (especialmente de terceros), es importante validar cuidadosamente las solicitudes que llegan al proceso Principal.

##### Node.js API

> NOTA: Para acceder a la API de Node.js desde el proceso de Renderer, necesita establecer la preferencia `nodeIntegration` a `true`.

Electron expone el acceso completo a la API de Node.js y sus módulos tanto en los procesos Principales como en los Procesos de Renderer. Por ejemplo, puede leer todos los archivos del directorio raíz:

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

Para utilizar un módulo Node.js, primero necesita instalarlo como dependencia:

```sh
npm install --save aws-sdk
```

Luego, en su aplicación Electron requiere el módulo:

```js
const S3 = require('aws-sdk/clients/s3')
```
