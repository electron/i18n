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

The "Main World" is the JavaScript context that your main renderer code runs in. By default, the page you load in your renderer executes code in this world.

### Isolated World / Изолированный Мир

When `contextIsolation` is enabled in your `webPreferences`, your `preload` scripts run in an "Isolated World".  You can read more about context isolation and what it affects in the [security](../tutorial/security.md#3-enable-context-isolation-for-remote-content) docs.

## Методы

Модуль `contextBridge` имеет следующие методы:

### `contextBridge.exposeInMainWorld(apiKey, api)` _Experimental_

* `apiKey` String - Ключ для вставки API в `window`.  API будет доступен в `window[apiKey]`.
* `api` Record<String, any> - Ваш объект API, более подробная информация о том, что это и как он будет работать, доступна ниже.

## Использование

### API Objects

The `api` object provided to [`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api-experimental) must be an object whose keys are strings and values are a `Function`, `String`, `Number`, `Array`, `Boolean`, or another nested object that meets the same conditions.

Значения `Function` передаются в другой контекст, а все остальные значения **копируются** и **заморожены**. Any data / primitives sent in the API object become immutable and updates on either side of the bridge do not result in an update on the other side.

Пример сложного объекта API показан ниже:

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

Because parameters, errors and return values are **copied** when they are sent over the bridge, there are only certain types that can be used. At a high level, if the type you want to use can be serialized and deserialized into the same object it will work.  Ниже для полноты изложения приводится таблица поддержки типов:

| Тип                                                                                                            | Сложность | Поддержка параметров | Возврат значения поддержки | Ограничения                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------- | --------- | -------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `String`                                                                                                       | Простой   | ✅                    | ✅                          | Нет                                                                                                                                                                                                                                 |
| `Number`                                                                                                       | Простой   | ✅                    | ✅                          | Нет                                                                                                                                                                                                                                 |
| `Boolean`                                                                                                      | Простой   | ✅                    | ✅                          | Нет                                                                                                                                                                                                                                 |
| `Object`                                                                                                       | Сложный   | ✅                    | ✅                          | Keys must be supported using only "Simple" types in this table.  Значения должны поддерживаться в этой таблице.  Модификации прототипа отбрасываются.  Отправка пользовательских классов будет копировать значения, но не прототип. |
| `Array`                                                                                                        | Сложный   | ✅                    | ✅                          | Те же ограничения, что и в типе `Object`                                                                                                                                                                                            |
| `Error`                                                                                                        | Сложный   | ✅                    | ✅                          | Ошибки, которые выбрасываются также копируются, это может привести к тому, что сообщение и трассировка стека ошибки немного изменятся из-за того, что они будут выброшены в другом контексте                                        |
| `Promise`                                                                                                      | Сложный   | ✅                    | ✅                          | Promises are only proxied if they are the return value or exact parameter.  Promises nested in arrays or objects will be dropped.                                                                                                   |
| `Function`                                                                                                     | Сложный   | ✅                    | ✅                          | Модификации прототипа отбрасываются.  Отправка классов или конструкторов не будет работать.                                                                                                                                         |
| [Cloneable Types](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | Простой   | ✅                    | ✅                          | Смотрите связанный документ по клонируемым типам                                                                                                                                                                                    |
| `Symbol`                                                                                                       | Нет       | ❌                    | ❌                          | Символы не могут быть скопированы в разных контекстах, поэтому они отбрасываются                                                                                                                                                    |


If the type you care about is not in the above table, it is probably not supported.
