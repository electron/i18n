# Preguntas Frecuentes sobre Electron

## ¿Por qué tengo problemas al instalar Electron?

Cuando ejecutamos `npm install electron`, ocasionalmente algunos usuarios encuentran errores en la instalación.

En casi todos los casos, estos errores son resultados de problemas en la red y no de problemas con el paquete npm de `electron`. Errores como `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` y `ETIMEDOUT` son indicadores de dichos problemas de red. La mejor solución es tratar de cambiar las redes, o esperar un poco e instalar de nuevo.

También puede intentar descargar Electron directamente de [electron/electron/releases](https://github.com/electron/electron/releases) si la ruta de instalación `npm` está fallando.

## ¿Cuando se actualizará Electron a la más reciente versión de Chrome?

La versión de Chrome de Electron es usualmente actualizada con una o dos semanas después de que una nueva versión estable de Chrome es publicada. Esta estimación no se garantiza y depende de la carga de trabajo que implica la actualización.

Sólo se utiliza el canal estable de Chrome. Si una solución importante está en el canal beta o dev , haremos back-port a él.

Para mas información, por favor lea la [introducción de seguridad](tutorial/security.md).

## ¿Cuándo se actualizará Electron a la última versión de Node.js?

Cuando una nueva versión de Node.js es publicada, usualmente esperamos aproximadamente un mes antes de actualizar la versión de Electron. Con esto evitamos afectarnos por bugs introducidos en la nueva versión de Node.js, lo cual sucede frecuentemente.

Novedades de Node.js están generalmente presentadas por mejoras V8, puesto que el Electron está utilizando el V8 enviados por el navegador Chrome, JavaScript nuevo brillante característica de una nueva versión de Node.js es generalmente ya en Electron.

## ¿Cómo compartir datos entre páginas web?

Para compartir datos entre páginas web (el proceso de renderizado) la manera más simple es usar el API de HTML5 el cual ya está disponible en navegadores. Good candidates are [Storage API][storage], [`localStorage`][local-storage], [`sessionStorage`][session-storage], and [IndexedDB][indexed-db].

O puede usar el sistema IPC, el cual es específico para Electron, para almacenar objetos en el proceso principal como variables globales, y después y después accesar a ellos desde los renderizadores a través de la propiedad `remote` u el módulo `electron`:

```javascript
// En el proceso principal.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## La ventana/bandeja de la aplicación desaparece después de unos minutos.

Esto sucede cuando la variable que es usada para almacenar la ventana/bandeja se limpia de la basura.

Si encuentra este problema, los siguientes artículos pudiesen resultar útiles:

* [Gestión de la Memoria][memory-management]
* [Ámbito de la variable][variable-scope]

Si quiere una solución rápida, puede volver sus variables globales cambiando su código de este:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

a este:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## No puedo usar jQuery/RequireJS/Meteor/AngularJS en Electron.

Debido a la integración de Node.js de Electron, hay algunos símbolos extras insertados en la DOM como `module`, `exports`, `require`. Esto causa problemas para algunas librerías dado que ellas quieren insertar símbolos con los mismos nombres.

Para solucionar esto, puede desactivar la integración de Node en Electron:

```javascript
// En el proceso principal.
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Pero si desea mantener la capacidad de utilizar Node.js y APIs de Electron, tienes que cambiar el nombre de los símbolos en la página antes de incluir otras bibliotecas:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` no está definido.

Cuando se utiliza el módulo de Electron puede encontrar un error como este:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: No se puede leer apropiadamente 'setZoomLevel' de undefined
```

This is because you have the [npm `electron` module][electron-module] installed either locally or globally, which overrides Electron's built-in module.

Para verificar si usted está usando módulo constructor correcto, puede imprimir la ruta del módulo `electron`:

```javascript
console.log(require.resolve('electron'))
```

y luego verifique si es de la siguiente forma:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

Si es algo como `node_modules/electron/index.js`, entonces tiene o que remover el módulo npm `electron`, o cambiarle el nombre.

```sh
npm uninstall electron
npm uninstall -g electron
```

Sin embargo si utilizas el módulo incorporado, pero sigue recibiendo este error, es muy probable que está utilizando el módulo en el proceso equivocado. Por ejemplo `electron.app` puede ser utilizado en el proceso principal, mientras que `electron.webFrame` sólo está disponible en los procesos de renderizado.

## La fuente se ve borrosa, ¿qué es esto y qué puedo hacer?

Si [anti-aliasing sub-píxeles](http://alienryderflex.com/sub_pixel/) está desactivado, entonces las fuentes en las pantallas LCD pueden parecer borrosas. Ejemplo:

![subpixel rendering example][]

El anti-aliasing de Sub-píxeles necesita un fondo no transparente de la capa que contenga los glifos de fuente. (Vea [this issue](https://github.com/electron/electron/issues/6344#issuecomment-420371918) para más información).

To achieve this goal, set the background in the constructor for [BrowserWindow][browser-window]:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Incluso si no ves una diferencia, algunos de tus usuarios pueden. Es mejor establecer siempre los antecedentes de esta manera, a menos que tenga razones para no hacerlo.

Tenga en cuenta que sólo establecer el fondo en el CSS no tiene el efecto deseado.

[memory-management]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
[variable-scope]: https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx
[electron-module]: https://www.npmjs.com/package/electron
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[session-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[indexed-db]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[browser-window]: api/browser-window.md
[subpixel rendering example]: images/subpixel-rendering-screenshot.gif
