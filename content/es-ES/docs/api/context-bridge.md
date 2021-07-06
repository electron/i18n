# contextBridge

> Cree un puente seguro, bidireccional y sincrónico a través de contextos aislados

Proceso: [Renderer](../glossary.md#renderer-process)

A continuación se muestra un ejemplo de exponer una API a un renderer desde un script de precarga aislado:

```javascript
// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('do-a-thing')
  }
)
```

```javascript
// Renderer (Main World)

window.electron.doThing()
```

## Glosario

### Main World

El "Main World" es el contexto de JavaScript que corre tu código renderer principal. Por defecto, la página que cargas en el tu renderer ejecuta código en este mundo.

### Mundo aislado

Cuando `contextIsolation` está activado en tu `webPreferences` (este es el comportamiento por defecto desde Electron 12.0.0), tus scripts `preload` corren en un "Mundo aislado".  Puede leer más sobre aislamiento del contexto y que afecta en los documentos [security](../tutorial/security.md#3-enable-context-isolation-for-remote-content).

## Métodos

El módulo `contextBridge` tiene los siguientes métodos:

### `contextBridge.exposeInMainWorld(apiKey, api)`

* `apiKey` String - La clave para inyectar la API en la ventana `window`.  La API será accesible en `window[apiKey]`.
* `api` any - Tu API más información sobre qué puede ser esta API y como funciona esta disponible a continuación.

## Uso

### API

La `api` proveeida a [`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api) debe ser una `Function`, `String`, `Number`, `Array`, `Boolean`, o un objeto cuya llaves son strings y los valores son una `Function`, `String`, `Number`, `Array`, `Boolean`, u otro objeto anidado que cumpa con las mismas condiciones.

Los valores `Function` se transfieren a otro contexto y todos los demás valores son **copiados** y **congedados**. Cualquier dato / primitivos enviado en la API se vuelve inmutable y las actualizaciones de una lado del puente no resulta en una actualización en el otro lado.

A continuación se muestra un ejemplo de una API compleja:

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('do-a-thing'),
    myPromises: [Promise.resolve(), Promise.reject(new Error('whoops'))],
    anAsyncFunction: async () => 123,
    data: {
      myFlags: ['a', 'b', 'c'],
      bootTime: 1234
    },
    nestedAPI: {
      evenDeeper: {
        youCanDoThisAsMuchAsYouWant: {
          fn: () => ({
            returnData: 123
          })
        }
      }
    }
  }
)
```

### Funciones API

Los valores de `Function` que enlazas a través de `contextBridge` son proxyados a través de Electron para asegurar que los contextos permanezcan aislados.  Esto da como resultado algunas limitaciones claves que hemos descrito a continuación.

#### Parámetro / Error / Tipo de Retorno soportado

Dado que los parámetros, errores y valores de retorno son **copiados** cuando son enviados sobre el puente, solo hay ciertos tipos que pueden ser usados. En un nivel alto, si el tipo que desea usar se puede serializar y deserializar en el mismo objeto, funcionará.  A continuación, se incluye una tabla de soporte de tipo para que esté completa:

| Tipo                                                                                                           | Complejidad | Soporte de parámetros | Valor de Retorno Soportado | Limitaciones                                                                                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------- | ----------- | --------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `String`                                                                                                       | Simple      | ✅                     | ✅                          | N/A                                                                                                                                                                                                                                               |
| `Number`                                                                                                       | Simple      | ✅                     | ✅                          | N/A                                                                                                                                                                                                                                               |
| `Boolean`                                                                                                      | Simple      | ✅                     | ✅                          | N/A                                                                                                                                                                                                                                               |
| `Objeto`                                                                                                       | Complejo    | ✅                     | ✅                          | Las llaves deben ser soportadas usando solo los tipos "Simple" en esta tabla.  Los valores deben ser soportadas en esta tabla.  Las modificaciones del prototipo se eliminan.  Enviar clases personalizadas copiará valores pero no el prototipo. |
| `Array`                                                                                                        | Complejo    | ✅                     | ✅                          | Mismas limitaciones para el tipo `Object`                                                                                                                                                                                                         |
| `Error`                                                                                                        | Complejo    | ✅                     | ✅                          | Los errores que se lanzan también se copian, esto puede resultar en que el mensaje y el seguimiento de la pila del error cambien ligeramente debido a que se lanzan en un contexto diferente                                                      |
| `Promise`                                                                                                      | Complejo    | ✅                     | ✅                          | Las promesas solo se transfieren si son el valor de retorno o el parámetro exacto.  Las promesas anidadas en arrays o objetos serán eliminadas.                                                                                                   |
| `Function`                                                                                                     | Complejo    | ✅                     | ✅                          | Las modificaciones del prototipo se eliminan.  Enviar clases o constructores no funcionará.                                                                                                                                                       |
| [Tipos Clonables](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | Simple      | ✅                     | ✅                          | Veer el documento vinculado en tipos clonables                                                                                                                                                                                                    |
| `Elemento`                                                                                                     | Complejo    | ✅                     | ✅                          | Las modificaciones del prototipo se eliminan.  Enviar elementos personalizados no funcionará.                                                                                                                                                     |
| `Símbolo`                                                                                                      | N/A         | ❌                     | ❌                          | Los Symbols no pueden ser copiados a través de contextos así que son eliminados                                                                                                                                                                   |

Si el tipo que te interesa no está en la tabla anterior, probablemente no esté soportado.

### Exponer Global Symbols de Node

El `contextBridge` puede ser utilizado por el script de precarga para dar acceso al renderizador a las APIs de Node. La tabla de tipos soportados descrita anteriormente aplica también a las APIs de Node que expongas a través de `contextBridge`. Tenga en cuenta que muchas APIs de Nodo conceden acceso a los recursos del sistema local. Se muy cauteloso sobre que APIs y globales expones a contenido remoto que no es de confianza.

```javascript
const { contextBridge } = require('electron')
const crypto = require('crypto')
contextBridge.exposeInMainWorld('nodeCrypto', {
  sha256sum (data) {
    const hash = crypto.createHash('sha256')
    hash.update(data)
    return hash.digest('hex')
  }
})
```
