# Modo oscuro

## Descripción general

### Actualizar automáticamente las interfaces nativas

Las "interfaces nativas" incluyen el selector de archivos, el borde de la ventana, los diálogos, los menús de de contexto y más, cualquier cosa en la que la interfaz de usuario provenga de tu sistema operativo y no desde tu app. El comportamiento predeterminado es optar por esta de temenado automático desde el sistema operativo.

### Actualizar automáticamente tus propias interfaces

Si tu app tiene su propio modo oscuro, deberías alternar la activación y la desactivación de manera sincronizada con la configuración del modo oscuro del sistema. Puedes hacerlo mediante el uso de la [Prefer-color-Scheme][] consulta de medios CSS.

### Actualizar de forma manual tus propias interfaces

Si quieres cambiar manualmente entre los modos light/dark, puedes hacerlo configurando el modo deseado en la propiedad [themeSource](../api/native-theme.md#nativethemethemesource) del módulo `nativeTheme`. El valor de esta propiedad se propagará a tu proceso de representador. Cualquier regla CSS relacionada con `prefers-color-scheme` se actualizará en consecuencia.

## parámetros de macOS

En macOS 10.14 Mojave, Apple introdujo un nuevo modo oscuro [para todo el sistema][system-wide-dark-mode] en sus ordenadores macOS. Si tu App Electron tiene un modo oscuro, puedes hacer que siga la configuración del modo oscuro en todo el sistema utilizando [la API de `nativeTheme`](../api/native-theme.md).

En macOS 10,15 Catalina, Apple introdujo una nueva opción de modo oscuro "automático" para todos los ordenadores macOS. Para que el `nativeTheme.shouldUseDarkColors` y `Tray` API funcionen correctamente en este modo en Catalina, debes usar el`>=7.0.0`de electrones , o configurar `NSRequiresAquaSystemAppearance` para `false` en tu archivo `Info.plist` para versiones anteriores. Tanto [Electron Packager][electron-packager] como [][electron-forge] de forja de electrones tienen una [`darwinDarkModeSupport` opción][packager-darwindarkmode-api] para automatizar los cambios de `Info.plist` durante el tiempo de construcción de la App.

Si deseas cancelar la suscripción mientras usas Electron &gt; 8.0.0, debes establecer la clave `NSRequiresAquaSystemAppearance` en el archivo `Info.plist` para `true`. Ten en cuenta que Electron 8.0.0 y las versiones anteriores no te permitirán dejar de participar de esta temenzación, por el uso del SDK 10,14 de macOS.

## Ejemplo

Empezaremos con una aplicación de trabajo desde la [guía de inicio rápido](quick-start.md) y agreguemos funcionalidad de manera gradual.

En primer lugar, editémonos nuestra interfaz para que los usuarios puedan alternar entre los modos de claros y oscuros.  Esta IU básica contiene botones para cambiar la configuración de `nativeTheme.themeSource` y un elemento de texto que indica qué `themeSource` valor está seleccionado. Por defecto, Electron sigue la preferencia del modo oscuro del sistema, por lo que se hardcode la fuente del tema como "sistema".

Agrega las siguientes líneas al archivo `index.html` :

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
    <link rel="stylesheet" type="text/css" href="./styles.css">
</head>
<body>
    <h1>Hello World!</h1>
    <p>Current theme source: <strong id="theme-source">System</strong></p>

    <button id="toggle-dark-mode">Toggle Dark Mode</button>
    <button id="reset-to-system">Reset to System Theme</button>

    <script src="renderer.js"></script>
  </body>
</body>
</html>
```

A continuación, agrega [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) que escuchen los eventos de `click` en los botones de alternancia. Dado que el módulo `nativeTheme` solo se expone en el proceso principal, debes configurar la devolución de llamada de cada de escucha para usar IPC para enviar mensajes y administrar las respuestas desde el proceso de principal:

* Cuando se hace clic en el botón "Alternar modo oscuro", enviamos el `dark-mode:toggle` mensaje (evento) para indicarle al proceso principal que desencadene un tema cambio, y actualizaremos la etiqueta "fuente del tema actual" en la interfaz de usuario en base a la respuesta del proceso principal.
* Cuando se hace clic en el botón "restablecer el tema del sistema", enviamos el `dark-mode:system` mensaje (evento) para indicarle al proceso principal que use el esquema de color del del sistema y actualizaremos la etiqueta "fuente del tema actual" a `System`.

Para agregar agentes de escucha y controladores, agrega las siguientes líneas al archivo `renderer.js` :

```javascript
const { ipcRenderer } = require('electron')

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await ipcRenderer.invoke('dark-mode:toggle')
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await ipcRenderer.invoke('dark-mode:system')
  document.getElementById('theme-source').innerHTML = 'System'
})
```

Si ejecutas tu código en este punto, verás que tus botones no hacen nada aún, y tu proceso principal generará un error como este cuando hagas clic en tus botones: `Error occurred in handler for 'dark-mode:toggle': No handler registered for 'dark-mode:toggle'` esto se espera — en realidad no hemos tocado ningún código `nativeTheme` todavía.

Ahora que ya terminamos de cablear el IPC desde el lado del representador, el siguiente paso es actualizar el archivo `main.js` para manejar los eventos del proceso del renderizador.

Según el evento recibido, actualizamos el [`nativeTheme.themeSource`](../api/native-theme.md#nativethemethemesource) propiedad para aplicar el tema deseado en los elementos de la interfaz de usuario nativa del sistema (p. ej., menús contextuales) y propagar el esquema de color preferido al procesador proceso:

* Al recibir `dark-mode:toggle`, comprobamos si el tema oscuro actualmente está activo utilizando la propiedad `nativeTheme.shouldUseDarkColors` , y establecemos el `themeSource` en el tema opuesto.
* Al recibir `dark-mode:system`, reajustaremos el `themeSource` a `system`.

```javascript
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
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

El último paso consiste en agregar un poco de estilo para habilitar el modo oscuro para los elementos Web de la interfaz de usuario al aprovechar los [`prefers-color-scheme`][prefer-color-scheme] atributo de CSS. El valor de `prefers-color-scheme` seguirá tu `nativeTheme.themeSource` configuración.

Crea un archivo `styles.css` y agrega las siguientes líneas:

```css fiddle='docs/fiddles/features/macos-dark-mode'
@media (prefers-color-scheme: dark) {
  body { background:  #333; color: white; }
}

@media (prefers-color-scheme: light) {
  body { background:  #ddd; color: black; }
}
```

Después de iniciar la aplicación de electrones, puedes cambiar los modos o restablecer el tema de al predeterminado del sistema haciendo clic en los botones correspondientes:

![Modo oscuro](../images/dark_mode.gif)

[system-wide-dark-mode]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/
[electron-forge]: https://www.electronforge.io/
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
[Prefer-color-Scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
[prefer-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
