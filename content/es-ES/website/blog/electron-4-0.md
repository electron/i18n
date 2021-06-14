---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

El equipo de Electron está encantado de anunciar que la versión estable de Electron 4 ya está disponible! Puedes instalarlo desde [electronjs.org](https://electronjs.org/) o desde npm via `npm install electron@latest`. La versión está llena de actualizaciones, correcciones y nuevas características, y no podemos esperar a ver lo que construyes con ellas. ¡Lea más para obtener más información sobre esta versión, y por favor comparta cualquier comentario que tenga mientras explora!

---

## ¿Qué hay de nuevo?

Una gran parte de la funcionalidad de Electron es proporcionada por Chromium, Node.js y V8, los componentes principales que componen Electron. Como tal, un objetivo clave para el equipo de Electron es mantenerse al día con los cambios en estos proyectos tanto como sea posible proporcionando a los desarrolladores que construyen aplicaciones Electron acceso a nuevas características web y JavaScript. Para este fin, Electron 4 incluye bumps de versión para cada uno de estos componentes; Electron v4.0.0 incluye Chromium `69. .3497.106`, Nodo `10.11.0`y V8 `6.9.427.24`.

Además, Electron 4 incluye cambios a APIs específicas de Electron. Puede encontrar un resumen de los cambios principales en Electron 4 más abajo; para la lista completa de cambios, revisa [Electron v4. .0 notas de versión](https://github.com/electron/electron/releases/tag/v4.0.0).

### Desactivando el módulo `remoto`

Ahora tiene la capacidad de desactivar el módulo `remoto` por razones de seguridad. El módulo puede ser deshabilitado para `Navegador`s y para `webview` etiquetas:

```javascript
// BrowserWindow
new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})

// etiqueta webview
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Vea la documentación de [BrowserWindow](https://electronjs.org/docs/api/browser-window) y [`<webview>` Etiqueta](https://electronjs.org/docs/api/webview-tag) para más información.

### Filtrando `remote.require()` / `remote.getGlobal()` Solicitudes

Esta característica es útil si no desea desactivar por completo el módulo `remoto` en su proceso de renderizado o `vista web` pero desea un control adicional sobre qué módulos se pueden requerir a través de `remoto. equivoque`.

Cuando se requiere un módulo a través de `remoto. requiere` en un proceso de renderizado, un evento `de requerimiento remoto` se plantea en el [`módulo` de aplicación](https://electronjs.org/docs/api/app). Puede llamar a `event.preventDefault()` en el evento (el primer argumento) para evitar que el módulo sea cargado. La [`WebContents` instancia](https://electronjs.org/docs/api/web-contents) donde ocurrió la solicitud es pasada como el segundo argumento, y el nombre del módulo es pasado como el tercer argumento. El mismo evento también se emite en la instancia de `WebContents` , pero en este caso los únicos argumentos son el evento y el nombre del módulo. En ambos casos, puede devolver un valor personalizado estableciendo el valor de `event.returnValue`.

```javascript
// Controla `remote.require` desde todos los WebContents:
app.on('remote-require', function (event, webContents, requestedModuleName) {
  // ...
})

// Controla `remote.require` desde una instancia específica de WebContents:
browserWin.webContents.on('remote-require', function (event, requestedModuleName) {
  // ...
})
```

De una manera similar, cuando `remote.getGlobal(name)` es llamado, se levanta un evento `remote-get-global`. Esto funciona de la misma manera que el evento `remote-require` : llame `preventDefault()` para evitar que el global sea devuelto, y establecer `evento. eturnValue` para devolver un valor personalizado.

```javascript
// Controla `remote.getGlobal` desde todos los WebContents:
app.on('remote-get-global', function (event, webContents, requrestedGlobalName) {
  // ...
})

// Controla `remote.getGlobal` desde una instancia específica de WebContents:
browserWin.webContents.on('remote-get-global', function (event, requestedGlobalName) {
  // ...
})
```

Para obtener más información, consulte la siguiente documentación:

* [`remote.require`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`remote.getGlobal`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`app`](https://electronjs.org/docs/api/app)
* [`Contenido web`](https://electronjs.org/docs/api/web-contents)

### Acceso JavaScript al Panel de Acerca

En macOS, ahora puedes llamar a `app. howAboutPanel()` para mostrar programáticamente el panel Acerca del mismo, como hacer clic en el elemento de menú creado a través de `{role: 'about'}`. Consulte la [documentación de`showAboutPanel`](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos) para más información

### Controlar `WebContents` Lanzamiento en segundo plano

`WebContents` las instancias ahora tienen un método `setBackgroundThrottling(allowed)` para activar o desactivar la aceleración de temporizadores y animaciones cuando la página está en segundo plano.

```javascript
let win = new BrowserWindow(...)
win.webContents.setBackgroundThrottling(enableBackgroundThrottling)
Win. webContents. Setbackgroundestrangulamiento (Enablebackgroundestrangulamiento)
```

Vea [la documentación de `setBackgroundThrottling`](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed) para más información.

## Restaurar archivos borrados

### No hay más soporte para macOS 10.9

Chromium ya no soporta macOS 10.9 (Maverick OS X), y como resultado [Electron 4.0 y más allá no lo soporta ni](https://github.com/electron/electron/pull/15357).

### Bloqueo de una instancia

Anteriormente, para hacer de su aplicación una aplicación de una sola instancia (asegurándose de que sólo una instancia de su aplicación se esté ejecutando en un momento determinado), puedes usar la aplicación `. método akeSingleInstance()`. A partir de Electron 4.0, debe utilizar `app.requestSingleInstanceLock()` en su lugar. El valor de retorno de este método indica si esta instancia de su aplicación obtuvo o no el bloqueo correctamente. Si no se pudo obtener el bloqueo, puede asumir que otra instancia de su aplicación ya se está ejecutando con el bloqueo y salir inmediatamente.

Para un ejemplo de uso de `requestSingleInstanceLock()` e información sobre el comportamiento matizado en varias plataformas, [vea la documentación para `aplicación. equestSingleInstanceLock()` y métodos relacionados](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) y [el evento `de segunda instancia`](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

Al construir módulos nativos para ventanas, la variable `win_delay_load_hook` en el módulo `binding.gyp` debe ser verdadera (que es el valor predeterminado). Si este gancho no está presente, entonces el módulo nativo fallará al cargar en Windows, con un mensaje de error como `No se puede encontrar el módulo`. [Vea la guía de módulo nativo](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook) para más información.

## Deprecaciones

Los siguientes cambios de ruptura están previstos para Electron 5.0, y por lo tanto están obsoletos en Electron 4.0.

### Integración de Node.js deshabilitada para `nativeWindowOpen`-ed Windows

A partir de Electron 5.0, ventanas secundarias abiertas con la opción `nativeWindowOpen` siempre tendrán la integración de Node.js deshabilitada.

### `webPreferencias` Valores por defecto

Al crear un nuevo `Navegador` con la opción `webPreferencias` configurada las siguientes `webPreferences` opciones por defecto están obsoletas a favor de los nuevos valores por defecto listados a continuación:

<div class="table table-ruled table-full-width">

| Propiedad | Defecto Obsoleto | Nuevo Predeterminado |
|----------|--------------------|-------------|
| `contextIsolation` | `false` | `true` |
| `nodeIntegration` | `true` | `false` |
| `webviewTag` | valor de `nodeIntegration` si se establece, de lo contrario `true` | `false` |

</div>

Tenga en cuenta: actualmente hay [un error conocido (#9736)](https://github.com/electron/electron/issues/9736) que impide que la etiqueta `webview` funcione si `contextIsolation` está activada. ¡Esté atento al problema de GitHub para obtener información actualizada!

Aprenda más sobre aislamiento de contexto, integración de Nodos y la etiqueta `webview` en [el documento de seguridad de Electron](https://electronjs.org/docs/tutorial/security).

Electron 4.0 seguirá utilizando los valores predeterminados actuales, pero si no pasa un valor explícito para ellos, verá una advertencia de desaprobación. Para preparar su aplicación para Electron 5.0, utilice valores explícitos para estas opciones. [Vea la `documentación de Navegador`](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) para más detalles sobre cada una de estas opciones.

### `webContents.findInPage(text[, opciones])`

Las opciones `medialCapitalAsWordStart` y `wordStart` han sido desaprobadas ya que han sido eliminadas por el original.

## Programa de retroalimentación

El [Programa de Comentarios de aplicaciones](https://electronjs.org/blog/app-feedback-program) que instituimos durante el desarrollo de Electron 3. fue un éxito, así que lo hemos continuado durante el desarrollo de 4.0 también. Nos gustaría dar las gracias a Atlassian, Discord, MS Teams, OpenFin, Slack, Symphony, WhatsApp, y los demás miembros del programa por su participación durante los 4. ciclo beta. Para obtener más información sobre el Programa de Comentarios de la aplicación y participar en futuras betas, [revisa nuestra publicación en nuestro blog sobre el programa](https://electronjs.org/blog/app-feedback-program).

## Lo siguiente

A corto plazo puedes esperar que el equipo continúe enfocándose en mantener al día con el desarrollo de los principales componentes que componen Electron, incluyendo Chromium, Node, y V8. Aunque tenemos cuidado de no hacer promesas sobre las fechas de publicación, nuestro plan es lanzar nuevas versiones importantes de Electron con nuevas versiones de esos componentes aproximadamente en cuarto. [Consulte nuestro documento de versionamiento](https://electronjs.org/docs/tutorial/electron-versioning) para obtener información más detallada sobre el versionado en Electron.

Para obtener información sobre los cambios de ruptura planificados en las próximas versiones de Electron, [vea nuestro documento de Cambios de ruptura planificados](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
