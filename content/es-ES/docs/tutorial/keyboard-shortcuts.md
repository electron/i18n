# Métodos abreviados de teclado

> Configurar atajos de teclado globales y locales

## Accesos directos locales

Puede utilizar el módulo de [Menu](../api/menu.md) para configurar atajos de teclado que se activará solamente cuando la aplicación está enfocada. Para ello, especifique una propiedad [`accelerator`] al crear un [MenuItem](../api/menu-item.md).

```js
const {Menu, MenuItem} = menú const require('electron') = new Menu() menu.append (new MenuItem ({etiqueta: 'Imprimir', el acelerador de: ' CmdOrCtrl + P', haga clic en: () => {console.log ('tiempo para imprimir cosas')}}))
```

Es fácil de configurar combinaciones de teclas diferentes basadas en sistema operativo del usuario.

```js
¿{Acelerador: process.platform === 'darwin'? 'Alt + Cmd + I': 'Ctrl + Mayús + I'}
```

## Accesos directos globales

Puede utilizar el módulo de [globalShortcut](../api/global-shortcut.md) para detectar eventos de teclado, incluso cuando la aplicación tiene el foco de teclado.

```js
const {app, globalShortcut} = require('electron') app.on ('listo', () => {globalShortcut.register ('CommandOrControl + X', () = > {console.log ('CommandOrControl + X se presiona')})})
```

## Accesos directos dentro de un BrowserWindow

Si usted desea manejar los atajos de teclado para un [BrowserWindow](../api/browser-window.md), puede utilizar los detectores de eventos `keyup` y `keydown` en el objeto de ventana dentro del proceso de renderizado.

```js
window.addEventListener ('keyup', HacerAlgo, true)
```

Tenga en cuenta el tercer `true` parámetro que significa que el oyente recibirá siempre pulsaciones de teclas antes de otros oyentes por lo que no tienen `stopPropagation () ` llamado sobre ellos.

The [`before-input-event`](web-contents.md#event-before-input-event) event is emitted before dispatching `keydown` and `keyup` events in the page. It can be used to catch and handle custom shortcuts that are not visible in the menu.

If you don't want to do manual shortcut parsing there are libraries that do advanced key detection such as [mousetrap](https://github.com/ccampbell/mousetrap).

```js
Mousetrap.BIND ('4,' () => {console.log('4')}) Mousetrap.bind ('? ', () = > {console.log ('Mostrar atajos!')})
Mousetrap.BIND ('esc', () = > {console.log('escape')}, 'keyup') / / combinaciones Mousetrap.bind ('Comando + Mayús + k', () = > {console.log ('comando shift k')}) / / mapa múltiples combinaciones para el mismo callback Mousetrap.bind (['comando + k', ' ctrl + k'], () = > {console.log (' comando k o control') / / return false para evitar que el comportamiento predeterminado y parada burbujeante devolver false}) / / estilo gmail secuencias Mousetrap.bind ('g i' () = > {console.log ('ir a bandeja de entrada')}) Mousetrap.bind ('* a', () = > {console.log ('seleccionar todos')}) / / código de konami!
Mousetrap.BIND ('hasta hasta abajo abajo izquierda derecha izquierda derecha b a enter', () => {console.log ('konami code')})
```