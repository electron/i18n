# Atajos de teclado

## Descripción general

Esta característica le permite configurar atajos de teclado loca y global para tu aplicación Electron.

## Ejemplo

### Accesos directos locales

Los atajos de teclado locales son activadas sólo cuando la aplicación está enfocada. Para configurar un atajo de teclado local, necesitas especificar una propiedad [`accelerator`][] al crear un [MenuItem][] dentro de módulo [Menu][].

Comenzando con una aplicación funcionando desde [Guía de Inicio Rápido](quick-start.md), actualiza el archivo `main.js` con las siguiente lineas:

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/local'
const { Menu, MenuItem } = require('electron')

const menu = new Menu()
menu.append(new MenuItem({
  label: 'Electron',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => { console.log('Electron rocks!') }
  }]
}))

Menu.setApplicationMenu(menu)
```

> NOTA: En el código anterior, puede ver que el acelerador difiere según el sistema operativo del usuario. Para MacOS, es  `Alt+Cmd+I`, mientras que para  Linux y   Windows, es `Alt+Shift+I`.

Después de lanzar la aplicación Electron, deberías ver el menú de la aplicación junto con el el atajo local que acabas de definir:

![Menú con un atajo local](../images/local-shortcut.png)

Si haces clic en `Help` o presionas el acelerador definido y luego abres el terminal desde el que ejecutas tu aplicación Electron, verás el mensaje que se generó después de desencadenar el evento de `click` : "Electron Rocks".

### Accesos directos globales

Para configurar un atajo del teclado global, debes usar el módulo [globalShortcut][] para detectar eventos del teclado, incluso cuando la aplicación no tiene foco del teclado.

Comenzando con una aplicación funcionando desde [Guía de Inicio Rápido](quick-start.md), actualiza el archivo `main.js` con las siguiente lineas:

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/global'
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    console.log('Electron loves global shortcuts!')
  })
}).then(createWindow)
```

> NOTA: En el código anterior, la combinación `CommandOrControl` usa `Command` en macOS y `Control` en Windows/Linux.

Después de lanzar la aplicación Electron, si presionas la llave definida combinación a continuación, abre el terminal desde el que ejecutas tu aplicación Electron, verás que Electron ama los atajos globales!

### Accesos directos en una ventana de buscador

#### Usando APIs web

Si quieres manejar los atajos del teclado dentro de una [][]BrowserWindow, puedes escuchar los `keyup` y `keydown` [eventos DOM][dom-events] dentro del proceso de representador de usando la [API de addEventListener ()][addEventListener-api].

```js
window.addEventListener('keyup', doSomething, true)
```

Nota el tercer parámetro `true` indica que el agente de escucha siempre recibirá pulsaciones de teclas antes que otros agentes de escucha para que no puedan tener `stopPropagation()` les llamen.

#### Interceptando eventos en el main process

El [`Evento antes de la entrada`](../api/web-contents.md#event-before-input-event) es emitido antes de enviar los eventos `flecha hacia arriba` y `flecha hacia abajo` en la página. Puede ser usado para capturar y manejar accesos directos personalizados que no son visibles en el menú.

##### Ejemplo

Comenzando con una aplicación funcionando desde [Guía de Inicio Rápido](quick-start.md), actualiza el archivo `main.js` con las siguiente lineas:

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/interception-from-main'
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } })

  win.loadFile('index.html')
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })
})
```

Después de lanzar la aplicación Electron, si abres el terminal que ejecutaste tu aplicación Electron desde y presionas `Ctrl+I` combinación de teclas, verás ver que esta combinación de teclas fue interceptada con éxito.

#### Usando librerías de terceros

Si no quieres hacer un análisis manual de accesos directos, hay bibliotecas que la detección de claves avanzada, como [][]de desvío de mouse. A continuación se muestran ejemplos de uso de `mousetrap` corriendo en el Renderer process:

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// combinations
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// map multiple combinations to the same callback
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // return false to prevent default behavior and stop event from bubbling
  return false
})

// gmail style sequences
Mousetrap.bind('g i', () => { console.log('go to inbox') })
Mousetrap.bind('* a', () => { console.log('select all') })

// konami code!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})
```

[Menu]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[5]: ../api/browser-window.md
[6]: ../api/browser-window.md
[9]: https://github.com/ccampbell/mousetrap
[10]: https://github.com/ccampbell/mousetrap
[dom-events]: https://developer.mozilla.org/en-US/docs/Web/Events
[addEventListener-api]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
