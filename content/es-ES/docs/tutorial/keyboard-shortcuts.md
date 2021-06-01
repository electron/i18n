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

Si haces click en `Help` o presionas el acelerador definido y luego abres la terminal con la que corriste tu Aplicación, veras el mensaje que fue generado después de llamar al evento del `click`: "Electron rocks!".

### Accesos directos globales

Para configurar un atajo de teclado global, necesita usar el módulo [globalShortcut][] para detecta los eventos del teclado cuando la aplicación no tiene el focus del teclado.

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

Después de lanzar la aplicación Electron, si presionas la combinación de teclas definida y luego abres la terminar desde la que corriste tu aplicación de Electron, ¡verás como Electron ama los atajos de teclado globales!

### Accesos directos en una ventana de buscador

#### Usando APIs web

Si quieres manejar los atajos de teclado dentro de un [BrowserWindow][], puedes escuchar por los [Eventos DOM][dom-events] `keyup` y `keydown` dentro del renderer process usando la [API addEventListener()][addEventListener-api].

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/web-apis|focus=renderer.js'
function handleKeyPress(event) {
  // You can put code here to handle the keypress.
  document.getElementById("last-keypress").innerText = event.key;
  console.log(`You pressed ${event.key}`);
}

window.addEventListener('keyup', handleKeyPress, true);
```

> Note:  the third parameter `true` indicates that the listener will always receive key presses before other listeners so they can't have `stopPropagation()` called on them.

#### Interceptando eventos en el main process

El [`Evento antes de la entrada`](../api/web-contents.md#event-before-input-event) es emitido antes de enviar los eventos `flecha hacia arriba` y `flecha hacia abajo` en la página. Puede ser usado para capturar y manejar accesos directos personalizados que no son visibles en el menú.

Comenzando con una aplicación funcionando desde [Guía de Inicio Rápido](quick-start.md), actualiza el archivo `main.js` con las siguiente lineas:

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/interception-from-main'
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 })

  win.loadFile('index.html')
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })
})
```

Después de correr tu aplicación, abres la terminal con la que corriste tu aplicación y presionas la combinación de teclas `Ctrl+I`, veras como ese atajo del teclado fue satisfactoriamente interceptado.

#### Usando librerías de terceros

Si no quiere hacer el análisis manual de los atajos hay librerías que hacen detección de teclas avanzadas, como [mousetrap][]. A continuación se muestran ejemplos de uso de `mousetrap` corriendo en el Renderer process:

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
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
[dom-events]: https://developer.mozilla.org/en-US/docs/Web/Events
[addEventListener-api]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
