---
title: Lanzar su aplicación Electron desde una URL en otra aplicación
description: This guide will take you through the process of setting your electron app as the default handler for a specific protocol.
slug: launch-app-from-url-in-another-app
hide_title: true
---

# Launching Your Electron App From A URL In Another App

## Descripción general

<!-- ✍ Update this section if you want to provide more details -->

Esta guía le llevará a través del proceso de establecer su aplicación Electron como el manejador predeterminado para un [protocol](https://www.electronjs.org/docs/api/protocol) especifico.

By the end of this tutorial, we will have set our app to intercept and handle any clicked URLs that start with a specific protocol. In this guide, the protocol we will use will be "`electron-fiddle://`".

## Ejemplos

### Main Process (main.js)

Primero, importaremos los módulos requeridos desde `electron`. Estos módulos ayudan a controlar el ciclo de vida de nuestra aplicación y crear una ventana del navegador nativa.

```javascript
const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
```

Next, we will proceed to register our application to handle all "`electron-fiddle://`" protocols.

```javascript
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}
```

We will now define the function in charge of creating our browser window and load our application's `index.html` file.

```javascript
const createWindow = () => {
  // Crea la ventana del navegador.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
}
```

In this next step, we will create our  `BrowserWindow` and tell our application how to handle an event in which an external protocol is clicked.

Este código será diferente en Windows comparado con MacOS y Linux. Esto es debido a que Windows requiere código adicional para abrir el contenido del enlace de protocolo dentro de la misma instancia Electron. Lea más sobre esto [aquí](https://www.electronjs.org/docs/api/app#apprequestsingleinstancelock).

#### Código de Windows:

```javascript
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Alguien trata de correr una segunda instancia, debemos enfocar nuestra ventana.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  // Crear mainWindow, cargar el resto de la aplicación, etc...
  app.whenReady().then(() => {
    createWindow()
  })

  // Maneja protocolo. En este caso, elegimos mostrar una Caja de Error.
  app.on('open-url', (event, url) => {
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
  })
}
```

#### Código MacOS y Linux:

```javascript
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
app.whenReady().then(() => {
  createWindow()
})

// Maneja protocolo. En este caso, elegimos mostrar una Caja de Error.
app.on('open-url', (event, url) => {
  dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
})
```

Finalmente, agregaremos un poco de código adicional para manejar cuando alguien cierra nuestra aplicación.

```javascript
// Quit when all windows are closed, except on macOS. Allí, es común
// para que las aplicaciones y su barra de menú permanezcan activas hasta que el usuario salga
// explicitamente con Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

## Notas importantes

### Embalaje

En macOS y Linux, esta característica solo funcionará cuando tu aplicación esté empaquetada. No funcionará cuando lo inicie en desarrollo desde la línea de comandos. Cuando empaquetes tu aplicación necesitarás asegurarte de que los archivos `Info.plist` de macOS y los archivos `.desktop` de Linux para la aplicación están actualizados para incluir el nuevo manejador de protocolo. Algunas de las herramientas de Electron para empaquetar y distribuir aplicaciones manejan esto para ti.

#### [Electron Forge](https://electronforge.io)

Si estás utilizando Electron Forge, ajuste el `packagerConfig` para soporte de macOS, y la configuración para los creadores apropiados de Linux para el soporte de Linux, en tu [Configuración Forge](https://www.electronforge.io/configuration) _(tenga en cuenta que el siguiente ejemplo solo muestra el mínimo necesario para agregar los cambios de configuración)_:

```json
{
  "config": {
    "forge": {
      "packagerConfig": {
        "protocols": [
          {
            "name": "Electron Fiddle",
            "schemes": ["electron-fiddle"]
          }
        ]
      },
      "makers": [
        {
          "name": "@electron-forge/maker-deb",
          "config": {
            "mimeType": ["x-scheme-handler/electron-fiddle"]
          }
        }
      ]
    }
  }
}
```

#### [Empaquetador Electron](https://github.com/electron/electron-packager)

Para soporte de macOS:

Si estás utilizando las APIs de Electron Packager, agregar soporte para manejadores de protocolo es similar a como es manejado en Electron Forge, excepto que `protocols` es parte de las opciones de Packager pasadas a la función `packager`.

```javascript
const packager = require('electron-packager')

packager({
  // ...otras opciones...
  protocols: [
    {
      name: 'Electron Fiddle',
      schemes: ['electron-fiddle']
    }
  ]

}).then(paths => console.log(`SUCCESS: Created ${paths.join(', ')}`))
  .catch(err => console.error(`ERROR: ${err.message}`))
```

Si estás utilizando el CLI de Electron Packager, use las banderas `--protocol` y `--protocol-name`. Por ejemplo:

```shell
npx electron-packager . --protocol=electron-fiddle --protocol-name="Electron Fiddle"
```

## Conclusión

Después de iniciar su aplicación Electron, puedes introducir la URL en tu navegador que contiene el protocolo URL personalizado, por ejemplo, `"electron-fiddle://open"` y observe que la aplicación responderá y mostrará un cuadro de dialogo de error.

<!--
    Because Electron examples usually require multiple files (HTML, CSS, JS
    for the main and renderer process, etc.), we use this custom code block
    for Fiddle (https://www.electronjs.org/fiddle).
    Please modify any of the files in the referenced folder to fit your
    example.
    The content in this codeblock will not be rendered in the website so you
    can leave it empty.
-->

```fiddle docs/fiddles/system/protocol-handler/launch-app-from-URL-in-another-app

```

<!-- ✍ Explanation of the code below -->
