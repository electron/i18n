# contexteBridge

> Crée un pont synchrone sécurisé, bidirectionnel entre des contextes isolés

Processus : [Rendu](../glossary.md#renderer-process)

Exemple d’une API exposée à un rendu à partir d’un script de preload:

```javascript
Preload (Isolated World)
const { contextBridge, ipcRenderer } = require ('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('do-a-thing')
  }
)
```

```javascript
Renderer (Main World)

window.electron.doThing()
```

## Glossaire

### Monde principal

« Main World » est le contexte JavaScript dans lequel votre code de rendu principal s'exécute. Par défaut, la page que vous chargez dans votre moteur de rendu exécute son code dans cet univers.

### Monde isolé

Si`contextIsolation` est activé dans votre `webPreferences`, vos scripts `preload` s'exécutent dans un "Isolated World".  Vous pourrez en savoir plus sur l'isolement du contexte et ce qu'il affecte dans la partie [sécurité](../tutorial/security.md#3-enable-context-isolation-for-remote-content) de la documentation. .

## Méthodes

Le module `contextBridge` possède les méthodes suivantes :

### `contextBridge.exposeInMainWorld(apiKey, api)` _'_

* `apiKey` String - La clé pour injecter l’API sur `window` avec.  L’API sera accessible le `window[apiKey]`.
* `api` - Votre API, plus d’informations sur ce que cette API peut être et comment il fonctionne est disponible ci-dessous.

## Utilisation

### API

Les `api` fournis à [`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api-experimental) doivent être un `Function`, `String`, `Number`, `Array`, `Boolean`, ou un objet dont les touches sont des cordes et des valeurs sont un `Function`, `String`, `Number`, `Array`, `Boolean`, ou un autre objet imbriqué qui répond aux mêmes conditions.

`Function` valeurs sont proxied à l’autre contexte et toutes les autres valeurs sont **copiées** et **congelées**. Toutes les données / primitives envoyées en l’API deviennent immuables et les mises à jour de chaque côté du pont n’entraînent pas de mise à jour de l’autre côté.

Un exemple d’API complexe est indiqué ci-dessous :

```javascript
const { contextBridge } = require ('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send ('do-a-thing'),
    myPromises: [Promise.resolve(), Promise.reject(new Error('whoops'))],
    anAsyncFunction: async () => 123,
    données: {
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

### Fonctions API

`Function` que vous liez à travers les `contextBridge` sont proxiées par Electron pour s’assurer que les contextes restent isolés.  Cela des limites clés que nous avons décrites ci-dessous.

#### Paramètre / Erreur / Support de type retour

Étant donné que les paramètres, les erreurs et les valeurs de retour sont **copiés** lorsqu’ils sont envoyés sur le pont, il n’y a que certains types qui peuvent être utilisés. À un niveau élevé, si le type que vous souhaitez utiliser peut être sérialisé et deserialisé dans le même objet, il fonctionnera.  Un tableau de soutien de type été inclus ci-dessous pour l’exhaustivité :

| Type                                                                                                            | Complexité | Prise en charge des paramètres | Support de valeur de retour | Limitations                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------ | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `String`                                                                                                        | Simple     | ✅                              | ✅                           | N/A                                                                                                                                                                                                                                                                                          |
| `Number`                                                                                                        | Simple     | ✅                              | ✅                           | N/A                                                                                                                                                                                                                                                                                          |
| `Boolean`                                                                                                       | Simple     | ✅                              | ✅                           | N/A                                                                                                                                                                                                                                                                                          |
| `Objet`                                                                                                         | Complexe   | ✅                              | ✅                           | Les touches doivent être prises en charge en utilisant uniquement les types « simples » dans cette table.  Les valeurs doivent être soutenues dans ce tableau.  Les modifications prototypes sont abandonnées.  L’envoi de classes personnalisées copiera les valeurs mais pas le prototype. |
| `Array`                                                                                                         | Complexe   | ✅                              | ✅                           | Mêmes limitations que le type `Object` type                                                                                                                                                                                                                                                  |
| `Error`                                                                                                         | Complexe   | ✅                              | ✅                           | Les erreurs qui sont lancées sont également copiées, ce qui peut entraîner le message et empiler la trace de l’erreur changer légèrement en raison d’être jeté dans un contexte différent                                                                                                    |
| `Promesse`                                                                                                      | Complexe   | ✅                              | ✅                           | Les promesses ne sont proxiées que si elles sont la valeur de retour ou le paramètre exact.  Les promesses imbriquées dans des tableaux ou des objets seront abandonnées.                                                                                                                    |
| `Function`                                                                                                      | Complexe   | ✅                              | ✅                           | Les modifications prototypes sont abandonnées.  L’envoi de classes ou de constructeurs ne fonctionnera pas.                                                                                                                                                                                  |
| [Types cloneables](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | Simple     | ✅                              | ✅                           | Voir le document lié sur les types cloneables                                                                                                                                                                                                                                                |
| `Symbole`                                                                                                       | N/A        | ❌                              | ❌                           | Les symboles ne peuvent pas être copiés entre les contextes de sorte qu’ils sont abandonnés                                                                                                                                                                                                  |

Si le type qui vous importe n’est pas dans le tableau ci-dessus, il n’est probablement pas pris en charge.
