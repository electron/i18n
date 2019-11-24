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

Объект `api`, предоставленный для [`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api-experimental), должен быть объектом, ключи которого являются строками, а значения являются `Function`, `String`, `Number`, `Array`, `Boolean` или другой вложенный объект, удовлетворяющий тем же условиям.

Значения `Function` передаются в другой контекст, а все остальные значения **копируются** и **заморожены**.  То есть Любые данные / примитивы, отправленные в объекте API, становятся неизменяемыми, и обновления на любой стороне моста не приводят к обновлению на другой стороне.

Пример сложного объекта API показан ниже.

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

### Функции API

Значения `Function`, которые вы связываете через `contextBridge`, передаются через Electron, чтобы гарантировать, что контексты остаются изолированными.  Это приводит к некоторым ключевым ограничениям, которые мы описали ниже.

#### Параметр / Ошибка / Поддержка возвращаемого типа

Поскольку параметры, ошибки и возвращаемые значения **скопированы** при отправке через мост существуют только определенные типы, которые могут быть использованы. На высоком уровне, если тип, который вы хотите использовать, может быть сериализован и несериализован в один и тот же объект, то он будет работать.  Ниже для полноты изложения приводится таблица поддержки типов.

| Тип                                                                                                            | Сложность | Поддержка параметров | Возврат значения поддержки | Ограничения                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------- | --------- | -------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `String`                                                                                                       | Простой   | ✅                    | ✅                          | Нет                                                                                                                                                                                                                 |
| `Number`                                                                                                       | Простой   | ✅                    | ✅                          | Нет                                                                                                                                                                                                                 |
| `Boolean`                                                                                                      | Простой   | ✅                    | ✅                          | Нет                                                                                                                                                                                                                 |
| `Object`                                                                                                       | Сложный   | ✅                    | ✅                          | Ключи должны поддерживаться «Простыми» типами в этой таблице.  Значения должны поддерживаться в этой таблице.  Prototype modifications are dropped.  Sending custom classes will copy values but not the prototype. |
| `Array`                                                                                                        | Сложный   | ✅                    | ✅                          | Same limitations as the `Object` type                                                                                                                                                                               |
| `Error`                                                                                                        | Сложный   | ✅                    | ✅                          | Errors that are thrown are also copied, this can result in the message and stack trace of the error changing slightly due to being thrown in a different context                                                    |
| `Promise`                                                                                                      | Сложный   | ✅                    | ✅                          | Promises are only proxied if they are a the return value or exact parameter.  Promises nested in arrays or obejcts will be dropped.                                                                                 |
| `Function`                                                                                                     | Сложный   | ✅                    | ✅                          | Prototype modifications are dropped.  Sending classes or constructors will not work.                                                                                                                                |
| [Cloneable Types](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | Простой   | ✅                    | ✅                          | See the linked document on cloneable types                                                                                                                                                                          |
| `Symbol`                                                                                                       | Нет       | ❌                    | ❌                          | Symbols cannot be copied across contexts so they are dropped                                                                                                                                                        |


If the type you care about is not in the above table it is probably not supported.
