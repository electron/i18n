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

"メインワールド" は、メインレンダラーコードが実行される JavaScript コンテキストです。 デフォルトでは、レンダラーでロードしたページはこのワールドでコードを実行します。

### 隔離ワールド

`webPreferences` で `contextIsolation` が有効 (これは Electron 12.0.0 からの既定の動作) になっている場合、`preload` スクリプトは "隔離ワールド" で実行されます。  コンテキスト分離とその影響の詳細については、[BrowserWindow](../tutorial/security.md#3-enable-context-isolation-for-remote-content) のドキュメントを参照してください。

## メソッド

`contextBridge` モジュールには以下のメソッドがあります。

### `contextBridge.exposeInMainWorld(apiKey, api)`

* `apiKey` String - `window` に API を注入するキー。  その API には `window[apiKey]` でアクセスできます。
* `api` Record - あなたの API です。この詳細と動作については下記を参照してください。

## 使い方

### API

[`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api) に指定する `api` は、`Function`、`String`、`Number`、`Array`、`Boolean`、または文字列のキーで `Function`、`String`、`Number`、`Array`、`Boolean`、同じ条件を満たすオブジェクトのいずれかの値の、入れ子でなければなりません。

`Function` 値は他のコンテキストへプロキシされ、他のすべての値は **コピー** か **凍結** されます。 API で送信されるデータ/プリミティブはイミュータブルであり、ブリッジの一方で更新しても他方のものは更新されません。

複雑な API の例を以下に示します。

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

引数、エラー、戻り値は、ブリッジを介して送信されるときに **コピー** されるため、使用できるのは特定の型のみです。 高水準なものは、使用したい型をシリアライズおよびデシリアライズして、同じように動作するオブジェクトにできます。  以下の型サポートの表に全てが載っています。

| 種類                                                                                                   | 複雑さ | 引数サポート | 戻り値サポート | 制限事項                                                                                                                 |
| ---------------------------------------------------------------------------------------------------- | --- | ------ | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `String`                                                                                             | 単純  | ✅      | ✅       | なし                                                                                                                   |
| `Number`                                                                                             | 単純  | ✅      | ✅       | なし                                                                                                                   |
| `Boolean`                                                                                            | 単純  | ✅      | ✅       | なし                                                                                                                   |
| `Object`                                                                                             | 複雑  | ✅      | ✅       | キーにはこの表の "単純" な型のみの使用をサポートしています。  値にはこの表のものをサポートしています。  プロトタイプの変更は削除されます。  カスタムクラスを送信すると、値はコピーされますが、プロトタイプはコピーされません。 |
| `Array`                                                                                              | 複雑  | ✅      | ✅       | 制限は `Object` 型と同じです                                                                                                  |
| `Error`                                                                                              | 複雑  | ✅      | ✅       | スローされるエラーもコピーされます。これにより、異なるコンテキストでスローされるためにエラーのメッセージとスタックトレースがわずかに変化する可能性があります。                                      |
| `Promise`                                                                                            | 複雑  | ✅      | ✅       | Promise は、戻り値や実引数である場合にのみプロキシされます。  配列やオブジェクトにネストされた Promise は削除されます。                                                |
| `Function`                                                                                           | 複雑  | ✅      | ✅       | プロトタイプの変更は削除されます。  クラスまたはコンストラクターを送信しても動作しません。                                                                       |
| [複製可能型](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | 単純  | ✅      | ✅       | 複製可能型に関してはリンクのドキュメントを参照してください                                                                                        |
| `Element`                                                                                            | 複雑  | ✅      | ✅       | プロトタイプの変更は削除されます。  カスタム要素の送信は動作しません。                                                                                 |
| `Symbol`                                                                                             | なし  | ❌      | ❌       | Symbol はコンテキスト間でコピーできないため、削除されます                                                                                     |

関心のある型が上記の表にない場合、それはおそらくサポートされていません。

### Node のグローバルシンボルの公開

`contextBridge` はプリロードスクリプトで使用でき、レンダラーが Node API へアクセスできるようにします。 上記のサポート型の表は、 `contextBridge` を介して公開する Node API にも適用されます。 注意として、Node API の多くはローカルシステムのリソースへのアクセスを許してしまいます。 信頼できない外部コンテンツにおいては、公開するグローバルや API について注意が必要です。

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
