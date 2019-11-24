# contextBridge

> Создает безопасный, двунаправленный, синхронный мост через изолированные контексты

Процесс: [Графический](../glossary.md#renderer-process)

Пример предоставления API-интерфейса средству визуализации из изолированного сценария предварительной загрузки приведен ниже:

```javascript
// Предварительная загрузка (Isolated World/Изолированный Мир)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('do-a-thing')
  }
)
```

```javascript
// Рендер (Main World/Основной Мир)

window.electron.doThing()
```

## Глоссарий

### Main World / Основной Мир

"Main World" - это контекст javascript, который запускается вашим основным кодом рендера.  По умолчанию загружаемая вами страница выполняет код в этом мире.

### Isolated World / Изолированный Мир

Когда `contextIsolation` включен в вашем `webPreferences` ваши `preload` скрипты выполняются в "Isolated World".  Вы можете прочитать больше о контекстной изоляции и на что это влияет в документации [BrowserWindow](browser-window.md).

## Методы

Модуль `contextBridge` имеет следующие методы:

### `contextBridge.exposeInMainWorld(apiKey, api)` _Experimental_

* `apiKey` String - Ключ для вставки API в `window`.  API будет доступен в `window[apiKey]`.
* `api` Record<String, any> - Ваш объект API, более подробная информация о том, что это и как он будет работать, доступна ниже.

## Использование

### API Objects

The `api` object provided to [`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api-experimental) must be an object whose keys are strings and values are a `Function`, `String`, `Number`, `Array`, `Boolean` or another nested object that meets the same conditions.

`Function` values are proxied to the other context and all other values are **copied** and **frozen**.  I.e. Any data / primitives sent in the API object become immutable and updates on either side of the bridge do not result in an update on the other side.

An example of a complex API object is shown below.

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

Because parameters, errors and return values are **copied** when they are sent over the bridge there are only certain types that can be used. At a high level if the type you want to use can be serialized and un-serialized into the same object it will work.  A table of type support has been included below for completeness.

| Тип                                                                                                            | Сложность | Parameter Support | Return Value Support | Ограничения                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------- | --------- | ----------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `String`                                                                                                       | Простой   | ✅                 | ✅                    | Нет                                                                                                                                                                                                 |
| `Number`                                                                                                       | Простой   | ✅                 | ✅                    | Нет                                                                                                                                                                                                 |
| `Boolean`                                                                                                      | Простой   | ✅                 | ✅                    | Нет                                                                                                                                                                                                 |
| `Object`                                                                                                       | Сложный   | ✅                 | ✅                    | Keys must be supported "Simple" types in this table.  Values must be supported in this table.  Prototype modifications are dropped.  Sending custom classes will copy values but not the prototype. |
| `Array`                                                                                                        | Сложный   | ✅                 | ✅                    | Same limitations as the `Object` type                                                                                                                                                               |
| `Error`                                                                                                        | Сложный   | ✅                 | ✅                    | Errors that are thrown are also copied, this can result in the message and stack trace of the error changing slightly due to being thrown in a different context                                    |
| `Promise`                                                                                                      | Сложный   | ✅                 | ✅                    | Promises are only proxied if they are a the return value or exact parameter.  Promises nested in arrays or obejcts will be dropped.                                                                 |
| `Function`                                                                                                     | Сложный   | ✅                 | ✅                    | Prototype modifications are dropped.  Sending classes or constructors will not work.                                                                                                                |
| [Cloneable Types](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | Простой   | ✅                 | ✅                    | See the linked document on cloneable types                                                                                                                                                          |
| `Symbol`                                                                                                       | Нет       | ❌                 | ❌                    | Symbols cannot be copied across contexts so they are dropped                                                                                                                                        |


If the type you care about is not in the above table it is probably not supported.
