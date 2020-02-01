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

The "Main World" is the JavaScript context that your main renderer code runs in. By default, the page you load in your renderer executes code in this world.

### 隔離ワールド

When `contextIsolation` is enabled in your `webPreferences`, your `preload` scripts run in an "Isolated World".  You can read more about context isolation and what it affects in the [security](../tutorial/security.md#3-enable-context-isolation-for-remote-content) docs.

## メソッド

`contextBridge` モジュールには以下のメソッドがあります。

### `contextBridge.exposeInMainWorld(apiKey, api)` _実験的_

* `apiKey` String - `window` に API を注入するキー。  その API には `window[apiKey]` でアクセスできます。
* `api` Record<String, any> - API オブジェクトです。この詳細と動作については下記を参照してください。

## 使い方

### API オブジェクト

The `api` object provided to [`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api-experimental) must be an object whose keys are strings and values are a `Function`, `String`, `Number`, `Array`, `Boolean`, or another nested object that meets the same conditions.

`Function` 値は他のコンテキストへプロキシされ、他のすべての値は **コピー** か **凍結** されます。 Any data / primitives sent in the API object become immutable and updates on either side of the bridge do not result in an update on the other side.

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

### API 関数

`contextBridge` を介してバインドした `Function` 値は、コンテキストが分離されたままになるように Electron を介してプロキシされます。  これにより、以下に概説するいくつかの重要な制限が生じます。

#### 引数 / エラー / 戻り値型のサポート

Because parameters, errors and return values are **copied** when they are sent over the bridge, there are only certain types that can be used. At a high level, if the type you want to use can be serialized and deserialized into the same object it will work.  A table of type support has been included below for completeness:

| 種類                                                                                                   | 複雑さ | 引数サポート | 戻り値サポート | 制限事項                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------- | --- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `String`                                                                                             | 単純  | ✅      | ✅       | なし                                                                                                                                                  |
| `Number`                                                                                             | 単純  | ✅      | ✅       | なし                                                                                                                                                  |
| `Boolean`                                                                                            | 単純  | ✅      | ✅       | なし                                                                                                                                                  |
| `Object`                                                                                             | 複雑  | ✅      | ✅       | Keys must be supported using only "Simple" types in this table.  値にはこの表のものをサポートしています。  プロトタイプの変更は削除されます。  カスタムクラスを送信すると、値はコピーされますが、プロトタイプはコピーされません。 |
| `Array`                                                                                              | 複雑  | ✅      | ✅       | 制限は `Object` 型と同じです                                                                                                                                 |
| `Error`                                                                                              | 複雑  | ✅      | ✅       | スローされるエラーもコピーされます。これにより、異なるコンテキストでスローされるためにエラーのメッセージとスタックトレースがわずかに変化する可能性があります。                                                                     |
| `Promise`                                                                                            | 複雑  | ✅      | ✅       | Promises are only proxied if they are the return value or exact parameter.  Promises nested in arrays or objects will be dropped.                   |
| `Function`                                                                                           | 複雑  | ✅      | ✅       | プロトタイプの変更は削除されます。  クラスまたはコンストラクターを送信しても動作しません。                                                                                                      |
| [複製可能型](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | 単純  | ✅      | ✅       | 複製可能型に関してはリンクのドキュメントを参照してください                                                                                                                       |
| `Symbol`                                                                                             | なし  | ❌      | ❌       | Symbol はコンテキスト間でコピーできないため、削除されます                                                                                                                    |


If the type you care about is not in the above table, it is probably not supported.
