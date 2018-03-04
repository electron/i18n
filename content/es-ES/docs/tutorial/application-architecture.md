# Arquitectura de Aplicación Electron

Antes de que podamos entrar a fondo en las APIs de Electron, necesitamos discutir los dos tipos de procesos disponibles en Electron. Son fundamentalmente diferentes e importantes de entender.

## Main and Renderer Processes

En Electron, el proceso que ejecuta el script `main` del archivo `package.json` es llamado **el proceso principal**. El script que corre en el proceso principal puede mostrar una GUI (Interfaz Gráfica de Usuario) creando páginas web. Una aplicación Electron siempre tiene un proceso principal, pero nunca más de uno.

Debido a que Electron usa Chromium para mostrar páginas web, la arquitectura multi-proceso de Chromium es también usada. Cada página web en Electron corre en su propio proceso, el cual es llamado **el proceso renderizador**.

En los navegadores normales, las páginas web generalmente se ejecutan en espacio aislado y no se les permite el acceso a recursos nativos. Los usuarios de la Electron, sin embargo, tienen el poder de utilizar Node.js APIs en las páginas web permitiendo interacciones inferiores de nivel de sistema operativo.

### Diferencias Entre Proceso Principal y Proceso Renderizador

El proceso principal crea páginas web creando instancias de `BrowserWindow`. Cada instancia de `BrowserWindow` ejecuta la página web en su propio proceso renderizador. Cuando una instancia de `BrowserWindow` es destruida, el proceso renderizador correspondiente es también terminado.

The main process manages all web pages and their corresponding renderer processes. Each renderer process is isolated and only cares about the web page running in it.

En páginas web, llamar APIs nativas relacionadas a GUI no está permitido porque manejar recursos nativos de GUI en páginas web es bastante peligroso y es fácil que ocurran fugas de recursos. Si quieres realizar operaciones de GUI en una página web, el proceso renderizador de la página web debe comunicarse con el proceso principal para pedirle que realice esas operaciones.

> #### Aside: Communication Between Processes
> 
> In Electron, we have several ways to communicate between the main process and renderer processes. Como [`ipcRenderer`](../api/ipc-renderer.md) y módulos [`ipcMain`](../api/ipc-main.md) para enviar mensajes, y el módulo [remote](../api/remote.md) para una comunicación de estilo RPC. Existe también una entrada de FAQ en [como compartir data entre páginas web](../faq.md#how-to-share-data-between-web-pages).

## Usando APIs de Electron

Electron ofrece un número de APIs que apoyan el desarrollo de una aplicación de escritorio tanto en el proceso principal como en el procesador de procesos. In both processes, you'd access Electron's APIs by requiring its included module:

```javascript
const electron = require('electron')
```

Todas las APIs de Electron son asignadas a un tipo de proceso. Many of them can only be used from the main process, some of them only from a renderer process, some from both. La documentación para la API individual indicará claramente cuales procesos pueden ser utilizados.

Una ventana en Electron es, por ejemplo, creada usando la clase `BrowserWindow`. Sólo esta disponible en el proceso principal.

```javascript
// This will work in the main process, but be `undefined` in a
// renderer process:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Since communication between the processes is possible, a renderer process can call upon the main process to perform tasks. Electron viene con un módulo llamado `remote` que expone las APIs usualmente solo disponibles en el proceso principal. In order to create a `BrowserWindow` from a renderer process, we'd use the remote as a middle-man:

```javascript
// This will work in a renderer process, but be `undefined` in the
// main process:
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## Using Node.js APIs

Electron exposes full access to Node.js both in the main and the renderer process. Esto tiene dos Implicaciones importantes:

1) Todas las APIs disponibles en Node.js están disponibles en Electron. Llamar el siguiente código de una aplicación Electron funciona:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// This will print all files at the root-level of the disk,
// either '/' or 'C:\'.
console.log(root)
```

As you might already be able to guess, this has important security implications if you ever attempt to load remote content. You can find more information and guidance on loading remote content in our [security documentation](./security.md).

2) You can use Node.js modules in your application. Pick your favorite npm module. npm offers currently the world's biggest repository of open-source code – the ability to use well-maintained and tested code that used to be reserved for server applications is one of the key features of Electron.

As an example, to use the official AWS SDK in your application, you'd first install it as a dependency:

```sh
npm install --save aws-sdk
```

Then, in your Electron app, simply require and use the module as if you were building a Node.js application:

```javascript
// A ready-to-use S3 Client
const S3 = require('aws-sdk/clients/s3')
```

There is one important caveat: Native Node.js modules (that is, modules that require compilation of native code before they can be used) will need to be compiled to be used with Electron.

The vast majority of Node.js modules are *not* native. Only 400 out of the ~650.000 modules are native. However, if you do need native modules, please consult [this guide on how to recompile them for Electron](./using-native-node-modules.md) (it's easy).