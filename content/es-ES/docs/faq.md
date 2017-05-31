# Electrónica FAQ

## ¿Cuando se actualiza el electrón a Chrome última?

La versión del cromo del electrón se golpea generalmente dentro de una o dos semanas después llega una nueva versión estable de Chrome. Esta estimación no está garantizada y depende de la cantidad de trabajo que con la actualización.

Se utiliza sólo el canal estable de Chrome. Si una corrección importante es en el canal beta o dev, vamos a Puerto de detrás él.

Para obtener más información, consulte el introduction</a> de security.</p> 

## ¿Cuando se actualiza el electrón a Node.js última?

Cuando obtiene una nueva versión de Node.js, generalmente Esperamos alrededor de un mes antes de actualizar de electrón. Así podemos evitar obtener afectados por errores introducidos en las nuevas versiones de Node.js, que sucede muy a menudo.

Novedades de Node.js están generalmente presentadas por mejoras V8, puesto que el electrón está utilizando el V8 enviados por el navegador Chrome, JavaScript nuevo brillante característica de una nueva versión de Node.js es generalmente ya en electrón.

## ¿Cómo compartir datos entre páginas web?

Para compartir datos entre páginas web (los procesos del procesador) la forma más sencilla es utilizar las APIs de HTML5 que ya están disponibles en los navegadores. Buenos candidatos son[Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage),[`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) y [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

O puede utilizar el sistema IPC, que es específico de electrones, para almacenar objetos en el proceso principal como una variable global y luego acceder a ellos de los renderizadores mediante la propiedad `remote` de módulo `electron`:

```javascript
En el proceso principal.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
En la Página 1.
.someProperty require('electron').Remote.getGlobal ('sharedObject') = 'nuevo valor'
```

```javascript
En la página 2.
Console.log(require('electron').Remote.getGlobal('sharedObject').someProperty)
```

## Ventana/bandeja de la aplicación desaparecieron después de pocos minutos.

Esto sucede cuando la variable que se utiliza para almacenar la bandeja de ventana de recogida de basura.

Si encuentra este problema, los siguientes artículos pueden resultar útiles:

* [Gestión de memoria](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Ámbito de variable](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Si quieres una solución rápida, puede hacer las variables global, cambiando el código de este:

```javascript
const {app, Tray} = require('electron') app.on ('listo', () => {bandeja const = new Tray('/path/to/icon.png') tray.setTitle ('Hola mundo')})
```

a esto:

```javascript
const {app, Tray} = bandeja dejar require('electron') = null app.on ('listo', () => {bandeja = new Tray('/path/to/icon.png') tray.setTitle ('Hola mundo')})
```

## No puedo usar jQuery/RequireJS/meteorito/AngularJS en electrones.

Debido a la integración de Node.js de electrón, hay algunos símbolos extras insertados en la DOM como `module`, `exports`, `require`. Esto causa problemas para algunas bibliotecas ya que quieran insertar los símbolos con los mismos nombres.

Para solucionar esto, puede desactivar la integración del nodo en electrónica:

```javascript
En el proceso principal.
const {BrowserWindow} = require('electron') que ganar = new BrowserWindow ({webPreferences: {
    nodeIntegration: false
  }}) win.show()
```

Pero si desea mantener la capacidad de utilizar Node.js y APIs de electrón, tienes que cambiar el nombre de los símbolos en la página antes de incluir otras bibliotecas:

```html
<head><script> window.nodeRequire = requieren;
eliminar window.require;
eliminar window.exports;
eliminar window.module;
</script><script type="text/javascript" src="jquery.js"></script></head>
```

## `require('electron').xxx` no está definido.

Cuando se utiliza el módulo de electrónica puede encontrar un error como este:

    > require('electron').webFrame.setZoomFactor(1.0) no TypeError: no puede leer la propiedad 'setZoomLevel' de indefinido
    

Esto es porque tienes la module</a> de `electron` de npm instalada localmente o globalmente, que reemplaza el módulo incorporado del electrón.</p> 

Para comprobar si está utilizando el módulo correcto, puede imprimir la ruta del módulo `electron`:

```javascript
Console.log(require.Resolve('electron'))
```

y luego comprobar si es de la siguiente forma:

    "/ path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
    

Si es algo como `node_modules/electron/index.js`, tienes que quitar el módulo de `electron` de MNP, o cámbiele el nombre.

```bash
MNP desinstalar electrón MNP desinstalar electrón -g
```

Sin embargo si utilizas el módulo incorporado, pero sigue recibiendo este error, es muy probable que está utilizando el módulo en el proceso de mal. Por ejemplo`electron.app` puede ser utilizado en el proceso principal, mientras que `electron.webFrame` sólo está disponible en los procesos de renderizado.