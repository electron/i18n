# contextBridge

> 分離されたコンテキスト間に、安全、双方向で同期されたブリッジを作成します

プロセス: [Renderer](../glossary.md#renderer-process)

分離されたプリロードスクリプトから API をレンダラーに公開する例を以下に示します。

```javascript
// プリロード (隔離ワールド)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('do-a-thing')
  }
)
```

```javascript
// レンダラー (メインワールド)

window.electron.doThing()
```

## 用語集

### メインワールド

"メインワールド" は、メインレンダラーコードが実行される JavaScript コンテキストです。  デフォルトでは、レンダラーでロードしたページはこのワールドでコードを実行します。

### 隔離ワールド

`webPreferences` で `contextIsolation` が有効になっている場合、`preload` スクリプトは "隔離ワールド" で実行されます。  コンテキスト分離とその影響の詳細については、[BrowserWindow](browser-window.md) のドキュメントを参照してください。

## メソッド

`contextBridge` モジュールには以下のメソッドがあります。

### `contextBridge.exposeInMainWorld(apiKey, api)` _実験的_

* `apiKey` String - `window` に API を注入するキー。  その API には `window[apiKey]` でアクセスできます。
* `api` Record<String, any> - API オブジェクトです。この詳細と動作については下記を参照してください。

## 使い方

### API オブジェクト

[`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api-experimental) に指定する `api` オブジェクトは、キーが文字列で値が `Function`、`String`、`Number`、`Array`、`Boolean`、または同じ条件を満たすオブジェクトがネストされたものです。

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

| 種類                                                                                                             | Complexity | Parameter Support | Return Value Support | 制限事項                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------- | ---------- | ----------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `String`                                                                                                       | Simple     | ✅                 | ✅                    | N/A                                                                                                                                                                                                 |
| `Number`                                                                                                       | Simple     | ✅                 | ✅                    | N/A                                                                                                                                                                                                 |
| `Boolean`                                                                                                      | Simple     | ✅                 | ✅                    | N/A                                                                                                                                                                                                 |
| `Object`                                                                                                       | Complex    | ✅                 | ✅                    | Keys must be supported "Simple" types in this table.  Values must be supported in this table.  Prototype modifications are dropped.  Sending custom classes will copy values but not the prototype. |
| `Array`                                                                                                        | Complex    | ✅                 | ✅                    | Same limitations as the `Object` type                                                                                                                                                               |
| `Error`                                                                                                        | Complex    | ✅                 | ✅                    | Errors that are thrown are also copied, this can result in the message and stack trace of the error changing slightly due to being thrown in a different context                                    |
| `Promise`                                                                                                      | Complex    | ✅                 | ✅                    | Promises are only proxied if they are a the return value or exact parameter.  Promises nested in arrays or obejcts will be dropped.                                                                 |
| `Function`                                                                                                     | Complex    | ✅                 | ✅                    | Prototype modifications are dropped.  Sending classes or constructors will not work.                                                                                                                |
| [Cloneable Types](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | Simple     | ✅                 | ✅                    | See the linked document on cloneable types                                                                                                                                                          |
| `Symbol`                                                                                                       | N/A        | ❌                 | ❌                    | Symbols cannot be copied across contexts so they are dropped                                                                                                                                        |


If the type you care about is not in the above table it is probably not supported.
