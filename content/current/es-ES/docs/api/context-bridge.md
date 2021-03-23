# contextBridge

> Create a safe, bi-directional, synchronous bridge across isolated contexts

Proceso: [Renderer](../glossary.md#renderer-process)

An example of exposing an API to a renderer from an isolated preload script is given below:

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

El "Main World" es el contexto de JavaScript que corre tu código renderer principal. By default, the page you load in your renderer executes code in this world.

### Isolated World

When `contextIsolation` is enabled in your `webPreferences`, your `preload` scripts run in an "Isolated World".  You can read more about context isolation and what it affects in the [security](../tutorial/security.md#3-enable-context-isolation-for-remote-content) docs.

## Métodos

The `contextBridge` module has the following methods:

### `contextBridge.exposeInMainWorld(apiKey, api)` _Experimental_

* `apiKey` String - The key to inject the API onto `window` with.  The API will be accessible on `window[apiKey]`.
* `api` any - Tu API más información sobre qué puede ser esta API y como funciona esta disponible a continuación.

## Uso

### API

La `api` proveeida a [`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api-experimental) debe ser una `Function`, `String`, `Number`, `Array`, `Boolean`, o un objeto cuya llaves son strings y los valores son una `Function`, `String`, `Number`, `Array`, `Boolean`, u otro objeto anidado que cumpa con las mismas condiciones.

`Function` values are proxied to the other context and all other values are **copied** and **frozen**. Cualquier dato / primitivos enviado en la API se vuelve inmutable y las actualizaciones de una lado del puente no resulta en una actualización en el otro lado.

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

### API Functions

`Function` values that you bind through the `contextBridge` are proxied through Electron to ensure that contexts remain isolated.  This results in some key limitations that we've outlined below.

#### Parameter / Error / Return Type support

Because parameters, errors and return values are **copied** when they are sent over the bridge, there are only certain types that can be used. At a high level, if the type you want to use can be serialized and deserialized into the same object it will work.  A table of type support has been included below for completeness:

| Type                                                                                                           | Complexity | Parameter Support | Valor de Retorno Soportado | Limitaciones                                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------- | ---------- | ----------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `String`                                                                                                       | Simple     | ✅                 | ✅                          | N/A                                                                                                                                                                                                                |
| `Number`                                                                                                       | Simple     | ✅                 | ✅                          | N/A                                                                                                                                                                                                                |
| `Boolean`                                                                                                      | Simple     | ✅                 | ✅                          | N/A                                                                                                                                                                                                                |
| `Objeto`                                                                                                       | Complejo   | ✅                 | ✅                          | Keys must be supported using only "Simple" types in this table.  Values must be supported in this table.  Prototype modifications are dropped.  Enviar clases personalizadas copiará valores pero no el prototipo. |
| `Array`                                                                                                        | Complejo   | ✅                 | ✅                          | Same limitations as the `Object` type                                                                                                                                                                              |
| `Error`                                                                                                        | Complejo   | ✅                 | ✅                          | Errors that are thrown are also copied, this can result in the message and stack trace of the error changing slightly due to being thrown in a different context                                                   |
| `Promise`                                                                                                      | Complejo   | ✅                 | ✅                          | Promises are only proxied if they are the return value or exact parameter.  Promises nested in arrays or objects will be dropped.                                                                                  |
| `Function`                                                                                                     | Complejo   | ✅                 | ✅                          | Prototype modifications are dropped.  Enviar clases o constructores no funcionará.                                                                                                                                 |
| [Cloneable Types](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | Simple     | ✅                 | ✅                          | See the linked document on cloneable types                                                                                                                                                                         |
| `Símbolo`                                                                                                      | N/A        | ❌                 | ❌                          | Symbols cannot be copied across contexts so they are dropped                                                                                                                                                       |

If the type you care about is not in the above table, it is probably not supported.
