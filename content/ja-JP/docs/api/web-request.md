## クラス: WebRequest

> ライフタイムのさまざまな段階でリクエストのコンテンツを傍受し、変更します。

プロセス: [Main](../glossary.md#main-process)

`WebRequest` クラスのインスタンスには、`Session` の `webRequest` プロパティを使用してアクセスします。

`WebRequest` のメソッドは、任意の `filter` と `listener` を受け取ります。 `listener` は、リクエストが終了したときに `listener(details)` で呼ばれます。 `details` オブジェクトはリクエストについて記述します。

⚠️ 最後にアタッチされている `listener` のみが使用されます。`null` を `listener` として渡すと、イベントの購読が解除されます。

`filter` オブジェクトには、`urls` プロパティがあります。これは、URL パターンと一致しないリクエストをフィルタリングするために使用される URL パターンの配列です。 `filter` を省略するとすべてのリクエストがマッチします。

特定のイベントでは、`listener` には `callback` が渡されます。これは、`listener` が処理を終えたときに `response` オブジェクトとともに呼び出される必要があります。

以下はリクエストに `User-Agent` ヘッダーを追加する例です。

```javascript
const { session } = require('electron')

// 以下の URL へのすべてのリクエストのユーザエージェントを変更します。
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({ requestHeaders: details.requestHeaders })
})
```

### インスタンスメソッド

`WebRequest` のインスタンスでは、以下のメソッドが利用できます。

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Object (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` 機能 
    * `応答` Object 
      * `cancel` Boolean (任意)
      * `redirectURL` String (任意) - 元のリクエストは送信または終了されず、代わりに指定された URL にリダイレクトされます。

`listener` は、リクエストが発生しようとしているときに `listener(details, callback)` で呼ばれます。

`uploadData` は、`UploadData` オブジェクトの配列です。

`callback` は、`response` オブジェクトで呼ぶ必要があります。

Some examples of valid `urls`:

```js
'http://foo:1234/'
'http://foo.com/'
'http://foo:1234/bar'
'*://*/*'
'*://example.com/*'
'*://example.com/foo/*'
'http://*.foo:1234/'
'file://foo:1234/bar'
'http://foo:*/'
'*://www.foo.com/'
```

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filter` Object (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` Object
  * `callback` Function 
    * `応答` Object 
      * `cancel` Boolean (任意)
      * `requestHeaders` Object (任意) - 指定すると、これらのヘッダでリクエストが作成されます。

The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any http data is sent.

`callback` は、`response` オブジェクトで呼ぶ必要があります。

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Object (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` Object

The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Object (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `statusLine` String
    * `statusCode` Integer
    * `responseHeaders` Object
  * `callback` Function 
    * `応答` Object 
      * `cancel` Boolean (任意)
      * `responseHeaders` Object (任意) - 指定すると、サーバはこれらのヘッダでレスポンスしたものとみなされます。
      * `statusLine` String (任意) - ヘッダのステータスを変更するために `responseHeaders` をオーバーライドする場合に指定する必要があります。そうしないと、元の応答ヘッダのステータスが使用されます。

The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.

`callback` は、`response` オブジェクトで呼ぶ必要があります。

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Object (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean - レスポンスがディスクキャッシュからフェッチされたかどうかを示します。
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Object (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Integer
    * `ip` String (任意) - リクエストが実際に送信されたサーバーの IP アドレス。
    * `fromCache` Boolean
    * `responseHeaders` Object

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Object (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when a request is completed.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Object (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - エラーの内容。

The `listener` will be called with `listener(details)` when an error occurs.