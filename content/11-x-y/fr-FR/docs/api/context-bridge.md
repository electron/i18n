# contextBridge

> Crée un pont synchrone sécurisé, bidirectionnel entre des contextes isolés

Processus : [Rendu](../glossary.md#renderer-process)

Exemple d’une API exposée à un rendu à partir d’un script de preload:

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

## Glossaire

### Main World

« Main World » est le contexte JavaScript dans lequel votre code de rendu principal s'exécute. Par défaut, la page que vous chargez dans votre moteur de rendu exécute son code dans cet univers.

### Isolated World

Si`contextIsolation` est activé dans votre `webPreferences`, vos scripts `preload` s'exécutent dans un "Isolated World".  Vous pourrez en savoir plus sur l'isolement du contexte et ce qu'il affecte dans la partie [sécurité](../tutorial/security.md#3-enable-context-isolation-for-remote-content) de la documentation. .

## Méthodes

Le module `contextBridge` possède les méthodes suivantes :

### `contextBridge.exposeInMainWorld(apiKey, api)` _Experimental_

* `apiKey` String - The key to inject the API onto `window` with.  The API will be accessible on `window[apiKey]`.
* `api` Record<String, any> - Your API object, more information on what this API can be and how it works is available below.

## Utilisation

### API Objects

The `api` object provided to [`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api-experimental) must be an object whose keys are strings and values are a `Function`, `String`, `Number`, `Array`, `Boolean`, or another nested object that meets the same conditions.

`Function` values are proxied to the other context and all other values are **copied** and **frozen**. Any data / primitives sent in the API object become immutable and updates on either side of the bridge do not result in an update on the other side.

An example of a complex API object is shown below:

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

| Type                                                                                                           | Complexity | Parameter Support | Return Value Support | Limitations                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------- | ---------- | ----------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `String`                                                                                                       | Simple     | ✅                 | ✅                    | N/A                                                                                                                                                                                                            |
| `Number`                                                                                                       | Simple     | ✅                 | ✅                    | N/A                                                                                                                                                                                                            |
| `Boolean`                                                                                                      | Simple     | ✅                 | ✅                    | N/A                                                                                                                                                                                                            |
| `Objet`                                                                                                        | Complex    | ✅                 | ✅                    | Keys must be supported using only "Simple" types in this table.  Values must be supported in this table.  Prototype modifications are dropped.  Sending custom classes will copy values but not the prototype. |
| `Array`                                                                                                        | Complex    | ✅                 | ✅                    | Same limitations as the `Object` type                                                                                                                                                                          |
| `Error`                                                                                                        | Complex    | ✅                 | ✅                    | Errors that are thrown are also copied, this can result in the message and stack trace of the error changing slightly due to being thrown in a different context                                               |
| `Promise`                                                                                                      | Complex    | ✅                 | ✅                    | Promises are only proxied if they are the return value or exact parameter.  Promises nested in arrays or objects will be dropped.                                                                              |
| `Function`                                                                                                     | Complex    | ✅                 | ✅                    | Prototype modifications are dropped.  Sending classes or constructors will not work.                                                                                                                           |
| [Cloneable Types](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | Simple     | ✅                 | ✅                    | See the linked document on cloneable types                                                                                                                                                                     |
| `Symbol`                                                                                                       | N/A        | ❌                 | ❌                    | Symbols cannot be copied across contexts so they are dropped                                                                                                                                                   |


If the type you care about is not in the above table, it is probably not supported.
