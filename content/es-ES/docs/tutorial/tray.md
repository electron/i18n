---
title: Tray
description: This guide will take you through the process of creating a Tray icon with its own context menu to the system's notification area.
slug: tray
hide_title: true
---

# Tray

## Descripción general

<!-- ✍ Update this section if you want to provide more details -->

Esta guía le llevará a través del proceso de creación de un icono de [bandeja](https://www.electronjs.org/docs/api/tray) con su propio menú contextual en el área de notificación del sistema.

En MacOS y Ubuntu, la bandeja se ubicará en la parte superior esquina derecha de tu pantalla, adyacente a tu batería y a los íconos WiFi. En Windows, la bandeja se ubicará normalmente en la esquina inferior derecha.

## Ejemplo

### main.js

First we must import `app`, `Tray`, `Menu`, `nativeImage` from `electron`.

```js
const { app, Tray, Menu, nativeImage } = require('electron')
```

A continuación crearemos nuestra bandeja. To do this, we will use a [`NativeImage`](https://www.electronjs.org/docs/api/native-image) icon, which can be created through any one of these [methods](https://www.electronjs.org/docs/api/native-image#methods). Note that we wrap our Tray creation code within an [`app.whenReady`](https://www.electronjs.org/docs/api/app#appwhenready) as we will need to wait for our electron app to finish initializing.

```js title='main.js'
let tray

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('path/to/asset. ng')
  bandeja = new Tray(icon)

  // Nota: su código contextMenu, Tooltip y Title ¡irá aquí!
})
```

¡Genial! Ahora podemos empezar a adjuntar un menú contextual a nuestra bandeja, así:

```js
const contextMenu = Menu.buildFromTemplate([
  { label: 'Item1', type: 'radio' },
  { label: 'Item2', type: 'radio' },
  { label: 'Item3', type: 'radio', checked: true },
  { label: 'Item4', type: 'radio' }
])

tray.setContextMenu(contextMenu)
```

El código anterior creará 4 elementos de tipo radio separados en el menú contextual. Para leer más sobre la construcción de menús nativos, haz clic en [aquí](https://www.electronjs.org/docs/api/menu#menubuildfromtemplatetemplate).

Por último, démosle a nuestra bandeja una información sobre herramientas y un título.

```js
tray.setToolTip('Esta es mi aplicación')
tray.setTitle('Este es mi título')
```

## Conclusión

Después de iniciar la aplicación Electron, deberías ver la bandeja residiendo en la parte superior o inferior derecha de la pantalla, dependiendo de tu sistema operativo.
`fiddle docs/fiddles/native-ui/tray`
