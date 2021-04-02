# Abrir ventanas desde el representador

Existen varias maneras de controlar cómo se crean las ventanas desde el contenido de confianza o no confiable dentro de un representador. Las ventanas se pueden crear desde el representador de dos maneras:

- hacer clic en enlaces o enviar formularios adornados con `target=_blank`
- JavaScript llamando a `window.open()`

En los representadores que no son de espacio aislado, o cuando `nativeWindowOpen` es falso (el valor predeterminado), esto se traduce en la creación de una [`BrowserWindowProxy`](browser-window-proxy.md), un envoltorio claro alrededor de `BrowserWindow`.

Sin embargo, cuando se establece la opción `sandbox` (o directamente, `nativeWindowOpen`), se crea una instancia de `Window` , como cabría esperar en el navegador. Para el contenido de del mismo origen, la ventana nueva se crea dentro del mismo proceso, lo que permite que el padre acceda a la ventana secundaria directamente. Esto puede ser muy útil para las sub-ventanas de la App que actúan como paneles de preferencias, o similares, ya que el padre puede representar a la subventana directamente, como si fuera una `div` en el padre.

Electron empareja esta `Window` nativa de cromo con un BrowserWindow bajo el capó. Puedes aprovechar toda la personalización disponible al crear una BrowserWindow en el proceso principal mediante el uso de `webContents.setWindowOpenHandler()` para las ventanas creadas por el representador.

Las opciones del constructor de BrowserWindow son establecidas por, en orden de precedencia creciente: opciones heredadas desde el padre, analizadas desde la cadena `features` de `window.open()`, webPreferences relacionadas a seguridad heredadas desde el padre y opciones dadas por [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler). Ten en cuenta que `webContents.setWindowOpenHandler` tiene el último di y el privilegio completo porque se invoca en el proceso principal.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (opcional)
* `features` String (opcional)

Devuelve [`BrowserWindowProxy`](browser-window-proxy.md) | [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)

`features` es una lista de valores clave-valor separados por comas, siguiendo el formato estándar de el navegador. Electron analizará `BrowserWindowConstructorOptions` fuera de esta lista de cuando sea posible, por conveniencia. Para un control total y una mejor ergonomía, considerar usar `webContents.setWindowOpenHandler` para personalizar la creación de la ventana BrowserWindow .

Un subconjunto de `WebPreferences` se puede establecer directamente, desanidado, desde la cadena de características: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`y `webviewTag`.

Por ejemplo:

```js
Window. Open (' https://github.com ', ' _blank ', ' Top = 500, Left = 200, Frame = false, nodeIntegration = no ')
```

**Notas:**

* La integración de nodo siempre estará deshabilitada en la `window` abierta si está deshabilitada en la ventana principal.
* El aislamiento de contexto siempre estará habilitado en la `window` abierta si está habilitado en la ventana principal.
* JavaScript siempre estará deshabilitado en la `window` abierta si está deshabilitado en la ventana principal.
* Las características que no son estándar (que no son administradas por Chromium o Electron) dadas en `features` se pasarán a cualquier `webContents` controlador de eventos`did-create-window` registrado en el argumento `additionalFeatures` .

Para personalizar o cancelar la creación de la ventana, puedes configurar de forma opcional un controlador de anulación con `webContents.setWindowOpenHandler()` desde el proceso de principal. Devolver `false` cancela la ventana, al mismo tiempo que devuelve un set de objetos la `BrowserWindowConstructorOptions` se usa al crear la ventana. Ten en cuenta que esto es más potente que pasar opciones a través de la cadena de característica, ya que el representador de tiene privilegios más limitados para decidir las preferencias de seguridad que el proceso principal de .

### `BrowserWindowProxy` ejemplo

```javascript

// main.js
const mainWindow = new BrowserWindow()

mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  if (url.startsWith('https://github.com/')) {
    return { action: 'allow' }
  }
  return { action: 'deny' }
})

mainWindow.webContents.on('did-create-window', (childWindow) => {
  // Por ejemplo...
  childWindow. webContents (' va a navegar ', (e) => {
    e. preventDefault ()
  })
})
```

```javascript
renderer. js
const windowProxy = Window. Open (' https://github.com/', null, ' Minimizable = false ')
windowProxy. postMessage (' HI ', ' * ')
```

### Ejemplo de `Window` nativo

```javascript
Main. js
const mainWindow = New BrowserWindow ({
  webPreferences: {
    nativeWindowOpen: true
  }
})

//en este ejemplo, solo se crearán ventanas con la URL ' about: Blank '.
Todas las otras URL se bloquearán.
mainWindow. webContents. setWindowOpenHandler (({ url }) => {
  if (URL = = = ' about: Blank ') {
    Return {
      Frame: false,
      fullscreenable: false,
      backgroundColor: ' Black ',
      webPreferences: {
        preload: 'my-child-window-preload-script.js'
      }
    }
  }
  devuelva false
})
```

```javascript
proceso del renderizador (mainWindow)
const childWindow = Window. Open (' ', ' modal ')
childWindow. Document. Write ('<h1>Hello</h1>')
```
