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

If you click `Help` or press the defined accelerator and then open the terminal that you ran your Electron application from, you will see the message that was generated after triggering the `click` event: "Electron rocks!".

### Accesos directos globales

To configure a global keyboard shortcut, you need to use the [globalShortcut][] module to detect keyboard events even when the application does not have keyboard focus.

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

After launching the Electron application, if you press the defined key combination then open the terminal that you ran your Electron application from, you will see that Electron loves global shortcuts!

### Accesos directos en una ventana de buscador

#### Usando APIs web

If you want to handle keyboard shortcuts within a [BrowserWindow][], you can listen for the `keyup` and `keydown` [DOM events][dom-events] inside the renderer process using the [addEventListener() API][addEventListener-api].

```js
window.addEventListener('keyup', doSomething, true)
```

Note the third parameter `true` indicates that the listener will always receive key presses before other listeners so they can't have `stopPropagation()` called on them.

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

After launching the Electron application, if you open the terminal that you ran your Electron application from and press `Ctrl+I` key combination, you will see that this key combination was successfully intercepted.

#### Usando librerías de terceros

If you don't want to do manual shortcut parsing, there are libraries that do advanced key detection, such as [mousetrap][]. A continuación se muestran ejemplos de uso de `mousetrap` corriendo en el Renderer process:

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
