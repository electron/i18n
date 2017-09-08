# Inicio rápido

Electrónica le permite crear aplicaciones de escritorio con puro JavaScript proporciona un tiempo de ejecución de ricos nativos (sistema operativo) API. Se podría ver como una variante de la runtime de Node.js que se centra en aplicaciones de escritorio en lugar de servidores web.

Esto no significa que Electron es un enlace JavaScript a las bibliotecas de interfaz (GUI) de gráfica de usuario. En cambio, Electron utiliza páginas web como su GUI, por lo que también se podría ver como un navegador cromo mínimo, controlado por JavaScript.

### Proceso principal

En Electron, el proceso que se ejecuta la secuencia de comandos de `main` de `package.json` se llama process</strong> principal**the. El script que se ejecuta en el proceso principal puede mostrar una interfaz gráfica mediante la creación de páginas web.</p> 

### Proceso de renderizado

Electrónica usa cromo para la visualización de páginas web, arquitectura de múltiples proceso de cromo también se utiliza. Cada página web en Electron se ejecuta en su propio proceso, que se llama **the procesador process**.

En los navegadores normales, páginas web generalmente se ejecutan en un entorno de espacio aislado y no se permite el acceso a recursos nativos. Los usuarios de la Electron, sin embargo, tienen el poder de utilizar Node.js APIs en las páginas web permitiendo interacciones inferiores de nivel de sistema operativo.

### Diferencias entre el proceso principal y procesador

El proceso principal crea páginas web mediante la creación de instancias de `BrowserWindow`. Cada instancia de`BrowserWindow` funciona la página web en su propio proceso de renderizado. Cuando se destruye una instancia de`BrowserWindow`, también se cancela el proceso de render correspondiente.

El proceso principal administra todas las páginas web y sus correspondientes procesos de renderizado. Cada proceso de renderizado es aislado y sólo se preocupa por la página web funcionando en él.

En páginas web, llamada GUI nativa relacionadas con que API no está permitida porque la gestión de recursos nativos del GUI en páginas web es muy peligroso y es fácil de fuga de recursos. Si desea realizar operaciones de GUI en una página web, el proceso de renderizado de la página web debe comunicarse con el proceso principal para solicitar que el proceso principal realizar esas operaciones.

En Electron, contamos con varias formas de comunicación entre el proceso principal y procesador. Como los módulos [`ipcRenderer`](../api/ipc-renderer.md) y[`ipcMain`](../api/ipc-main.md) para el envío de mensajes y el módulo de[remote](../api/remote.md) para la comunicación de estilo RPC. También hay una entrada de la FAQ en [how para compartir datos entre pages](../faq.md#how-to-share-data-between-web-pages) de la web.

## Escribir tu primera aplicación Electron

Generalmente, una aplicación de Electron está estructurada así:

```text
su aplicación / ├── package.json ├── main.js └── index.html
```

El formato de `package.json` es exactamente igual a la de los módulos del nodo, y el script especificado por el campo `main` es el script de inicio de su aplicación, que se desarrollará el proceso principal. Un ejemplo de su `package.json` podría tener este aspecto:

```json
{"nombre": "su aplicación", "versión": "0.1.0", "principal": "main.js"}
```

**Note**: Si no existe el campo `main` en `package.json`, Electron tratará de cargar un `index.js`.

El `main.js` debe crear windows y manejar los eventos del sistema, un ejemplo típico es:

```javascript
const {app, BrowserWindow} = ruta const require('electron') = url const require('path') = require('url') / / mantener una referencia global del objeto window, si no, la ventana será / / se cierra automáticamente cuando el objeto de JavaScript es recopilada de la basura.
que ganar la función createWindow () {/ / creamos la ventana del navegador.
  ganar = BrowserWindow({width: 800, height: 600}) nuevos / / y el index.html de la aplicación de la carga.
  win.loadURL (url.format ({ruta: path.join (__dirname, 'index.html'), el protocolo: ' archivo:', barras: true})) / / abrir las DevTools.
  win.webContents.openDevTools() / / cuando la ventana está cerrada.
  Win.on ('cerrado', () => {/ / deja de hacer referencia el objeto ventana, generalmente se almacena windows / en una matriz si la aplicación es compatible con múltiples ventanas, esto es el tiempo / / cuando se debe eliminar el elemento correspondiente.
    Win = null})} / / este método se llamará cuando haya terminado de Electron / / inicialización y está listo para crear ventanas del navegador.
Algunas API puede utilizarse sólo después de que se produzca este evento.
App.on ('listo', createWindow) / / dejar de fumar cuando se cierran todas las ventanas.
App.on (' ventana todo cerrado ', () => {/ en macOS es común para aplicaciones y su barra de menú / / permanecer activa hasta que el usuario se cierra explícitamente con Cmd + Q Si (process.platform! == 'darwin') {app.quit()}}) app.on ('activar', () = > {/ en macOS es común volver a crear una ventana en la aplicación cuando el / / dock se haga clic en el icono y no hay otras ventanas abiertas.
  Si (ganar === null) {createWindow()}}) / / en este archivo puede incluir el resto del proceso principal específico de la aplicación / / código. También puede ponerlos en archivos separados y necesitan aquí.
```

Finalmente el `index.html` es la página que desea mostrar:

```html
¡<! DOCTYPE html><html> <head> <meta charset="UTF-8"> mundo <title>Hello!</title> </head> <body> <h1>Hello mundo! estamos utilizando nodos <script>document.write (process.versions.node)</script>, </script> de <script>document.write (process.versions.chrome) cromo</h1> y </script> <script>document.write (process.versions.electron) de electrones.
  </body></html>
```

## Ejecute su aplicación

Una vez hayas creado tu inicial `main.js`, `index.html` y `package.json` archivos, usted probablemente querrá intente ejecutar la aplicación localmente para probarlo y asegurarse de que está funcionando como se esperaba.

### `Electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) es un módulo de `npm` que contiene versiones precompiladas de Electron.

Si usted ha instalado a nivel mundial con `npm`, sólo deberá ejecutar lo siguiente en el directorio de la aplicación:

```bash
Electron.
```

Si has instalado localmente, luego ejecute:

#### macOS / Linux

```bash
$./node_modules/.bin/electron.
```

#### Windows

    $.\node_modules\.bin\electron.
    

### Electrón descargado manualmente binario

Si descargó Electron manualmente, puede utilizar el binario incluido para ejecutar tu aplicación directamente.

#### MacOS

```bash
$ Su-./Electron.app/Contents/MacOS/Electron de aplicación /
```

#### Linux

```bash
$ su-./electron/electron de aplicación /
```

#### Windows

    $ su-.\electron\electron.exe app\
    

`Electron.app` aquí es parte del paquete de liberación de electrones, se puede descargar desde [here](https://github.com/electron/electron/releases).

### Como una distribución

Después de que termines escribiendo su aplicación, puede crear una distribución siguiendo la guía de Distribution</a> de Application y luego ejecutar la aplicación empaquetada.</p> 

### Probar este ejemplo

Clonar y ejecutar el código en este tutorial mediante el repositorio de [`electron/Electron-rápido-start`](https://github.com/electron/electron-quick-start).

**Note**: funciona esto requiere [Git](https://git-scm.com) y [Node.js](https://nodejs.org/en/download/) (que incluye [npm](https://npmjs.org)) en su sistema.

```bash
# Clonar el repositorio $ git clone https://github.com/electron/electron-quick-start # ir en el repositorio $ cd Electron-quick-start # instalar dependencias $ MNP instalar # ejecute el app $ MNP start
```

Para más aplicaciones de ejemplo, vea la[list de boilerplates](https://electron.atom.io/community/#boilerplates) creado por la comunidad Electron impresionante.