# Arquitectura de Aplicación Electron

Antes de que podamos entrar a fondo en las APIs de Electron, necesitamos discutir los dos tipos de procesos disponibles en Electron. Son fundamentalmente diferentes e importantes de entender.

## Proceso Principal y Proceso Visualizador

En Electron, el proceso que ejecuta el script `main` del archivo `package.json` es llamado **el proceso principal**. El script que corre en el proceso principal puede mostrar una GUI (Interfaz Gráfica de Usuario) creando páginas web. Una aplicación Electron siempre tiene un proceso principal, pero nunca más de uno.

Debido a que Electron usa Chromium para mostrar páginas web, la arquitectura multi-proceso de Chromium es también usada. Cada página web en Electron corre en su propio proceso, el cual es llamado **el proceso renderizador**.

En los navegadores normales, las páginas web generalmente se ejecutan en espacio aislado y no se les permite el acceso a recursos nativos. Los usuarios de la Electron, sin embargo, tienen el poder de utilizar Node.js APIs en las páginas web permitiendo interacciones inferiores de nivel de sistema operativo.

### Diferencias Entre Proceso Principal y Proceso Renderizador

El proceso principal crea páginas web creando instancias de `BrowserWindow`. Cada instancia de `BrowserWindow` ejecuta la página web en su propio proceso renderizador. Cuando una instancia de `BrowserWindow` es destruida, el proceso renderizador correspondiente es también terminado.

El proceso principal administra todas las páginas web y sus correspondientes procesos visualizador. Cada proceso visualizador esta aislado y sólo se preocupa por la página web que se ejecuta en el.

En páginas web, llamar APIs nativas relacionadas a GUI no está permitido porque manejar recursos nativos de GUI en páginas web es bastante peligroso y es fácil que ocurran fugas de recursos. Si quieres realizar operaciones de GUI en una página web, el proceso renderizador de la página web debe comunicarse con el proceso principal para pedirle que realice esas operaciones.

> #### A un lado: Comunicación entre Procesos
> 
> En Electron, tenemos varias maneras de comunicarnos entre el proceso principal y el proceso visualizador. Como [`ipcRenderer`](../api/ipc-renderer.md) y módulos [`ipcMain`](../api/ipc-main.md) para enviar mensajes, y el módulo [remote](../api/remote.md) para una comunicación de estilo RPC. Existe también una entrada de FAQ en [como compartir data entre páginas web](../faq.md#how-to-share-data-between-web-pages).

## Usando APIs de Electron

Electron ofrece un número de APIs que apoyan el desarrollo de una aplicación de escritorio tanto en el proceso principal como en el procesador de procesos. En ambos procesos, accede a las APIs de Electron haciendo un require del módulo:

```javascript
const electron = require('electron')
```

Todas las APIs de Electron son asignadas a un tipo de proceso. Muchos de ellos puede ser utilizados desde el proceso principal, algunos de estos sólo desde el proceso visualizador, algunos otros de ambos. The documentation for each individual API will state which process it can be used from.

Una ventana en Electron es, por ejemplo, creada usando la clase `BrowserWindow`. Sólo esta disponible en el proceso principal.

```javascript
// Esto funcionará en el proceso principal, pero será `undefined` en el
// proceso visualizador:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Desde que la comunicación entre procesos es posible, un proceso visualizador puede llamar el proceso principal para realizar tareas. Electron viene con un módulo llamado `remote` que expone las APIs usualmente solo disponibles en el proceso principal. Con el fin de crear un `BrowserWindow` desde un proceso visualizador, usaremos el remoto como un intermediario:

```javascript
// This will work in a renderer process, but be `undefined` in the
// main process:
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## Using Node.js APIs

Electrón expone accesos total al Node.js tanto en el proceso principal como en el proceso visualizador. Esto tiene dos Implicaciones importantes:

1) Todas las APIs disponibles en Node.js están disponibles en Electron. Llamar el siguiente código de una aplicación Electron funciona:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// This will print all files at the root-level of the disk,
// either '/' or 'C:\'.
console.log(root)
```

Como ya puedes adivinar, esto tiene unas importantes implicaciones de seguridad si intentas alguna vez a cargar un contenido remoto. Puedes encontrar mas información y orientación sobre la carga de contenido remoto en nuestra [documentación de seguridad](./security.md).

2) Puedes utilizar módulos Node.Js en su aplicación. Elija su módulo npm favorito. npm ofrece actualmente el repositorio mas grande del mundo de código abierto – la posibilidad de utilizar un buen mantenimiento y códigos de prueba que solían estar reservadas solo para aplicaciones de servidor es una de las características claves de Electron.

Por ejemplo, para utilizar el SDK oficial de AWS en su aplicación, primero deberá instalarlo como una dependencia:

```sh
npm install --save aws-sdk
```

Then, in your Electron app, require and use the module as if you were building a Node.js application:

```javascript
// A ready-to-use S3 Client
const S3 = require('aws-sdk/clients/s3')
```

Hay un aviso importante: los módulos Node.Js originales (eso es, los módulos que requieren compilación del código original antes de que puedan ser usados) necesitarán ser reunidos para ser usados con Electron.

La gran mayoría de módulos Node.js son *no* nativos. Solo 400 de los 650.000 módulos son nativos. However, if you do need native modules, please consult [this guide on how to recompile them for Electron](./using-native-node-modules.md).