# contexteBridge

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

Votre script `preload` s'exécute dans un "Isolated World" lorsque `contextIsolation` est activé dans votre `webPreferences` (ce qui est le comportement par défaut depuis Electron 12.0.0).  Vous pourrez en savoir plus sur l'isolement du contexte et ce qu'il affecte dans la partie [sécurité](../tutorial/security.md#3-enable-context-isolation-for-remote-content) de la documentation. .

## Méthodes

Le module `contextBridge` possède les méthodes suivantes :

### `contextBridge.exposeInMainWorld(apiKey, api)`

* `apiKey` String - La clé à utiliser pour injecter l'API dans `fenêtre`.  L’API sera accessible par `window[apiKey]`.
* `api` any- Votre API, plus d'informations sur ce que peut être cette API et son fonctionnement est disponible ci-dessous.

## Utilisation

### API

L' `api` fourni à [`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api) peut être du type `Function`, `String`, `Number`, `Array`, `Boolean` ou un objet dont les clés sont des chaînes de caractères et les valeurs du type `Function`, `String`, `Number`, `Array`, `Boolean` ou un autre objet imbriqué qui remplit les mêmes conditions.

`Function` values are proxied to the other context and all other values are **copied** and **frozen**. Toutes les données ou primitives envoyées par l'API deviennent immuables et les mises à jour de chaque côté du pont de connexion ne donnent pas lieu à une mise à jour de l'autre côté.

Exemple d’API complexe:

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

Les valeurs `Function` que vous liez à travers le `contextBridge` sont servies par l'intermédiaire d'Electron pour s'assurer que les contextes restent isolés.  Ceci entraîne certaines limitations clés décrites ci-dessous.

#### Prise en charge des paramètres, erreurs et type de retour

Étant donné que les paramètres, erreurs et valeurs de retour sont **copiés** lors de leur transmission par le pont, seuls certains types peuvent être utilisés. Mais si le type que vous voulez utiliser peut être sérialisé et désérialisé dans le même objet cela fonctionnera.  Une table des types supportés est incluse en complément:

| Type                                                                                                           | Complexité | Parameter Support | Return Value Support | Limitations                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------- | ---------- | ----------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `String`                                                                                                       | Simple     | ✅                 | ✅                    | N/A                                                                                                                                                                                                            |
| `Number`                                                                                                       | Simple     | ✅                 | ✅                    | N/A                                                                                                                                                                                                            |
| `Boolean`                                                                                                      | Simple     | ✅                 | ✅                    | N/A                                                                                                                                                                                                            |
| `Objet`                                                                                                        | Complexe   | ✅                 | ✅                    | Keys must be supported using only "Simple" types in this table.  Values must be supported in this table.  Prototype modifications are dropped.  Sending custom classes will copy values but not the prototype. |
| `Array`                                                                                                        | Complexe   | ✅                 | ✅                    | Same limitations as the `Object` type                                                                                                                                                                          |
| `Error`                                                                                                        | Complexe   | ✅                 | ✅                    | Errors that are thrown are also copied, this can result in the message and stack trace of the error changing slightly due to being thrown in a different context                                               |
| `Promise`                                                                                                      | Complexe   | ✅                 | ✅                    | Promises are only proxied if they are the return value or exact parameter.  Promises nested in arrays or objects will be dropped.                                                                              |
| `Function`                                                                                                     | Complexe   | ✅                 | ✅                    | Prototype modifications are dropped.  Sending classes or constructors will not work.                                                                                                                           |
| [Cloneable Types](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | Simple     | ✅                 | ✅                    | See the linked document on cloneable types                                                                                                                                                                     |
| `Élément`                                                                                                      | Complexe   | ✅                 | ✅                    | Prototype modifications are dropped.  L'envoi d'éléments personnalisés ne fonctionnera pas.                                                                                                                    |
| `Symbole`                                                                                                      | N/A        | ❌                 | ❌                    | Symbols cannot be copied across contexts so they are dropped                                                                                                                                                   |

If the type you care about is not in the above table, it is probably not supported.

### Exposition des symboles globaux de Node

The `contextBridge` can be used by the preload script to give your renderer access to Node APIs. The table of supported types described above also applies to Node APIs that you expose through `contextBridge`. Please note that many Node APIs grant access to local system resources. Be very cautious about which globals and APIs you expose to untrusted remote content.

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
