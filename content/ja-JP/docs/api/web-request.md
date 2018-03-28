## クラス: WebRequest

> ライフタイムのさまざまな段階でリクエストのコンテンツを傍受し、変更します。

プロセス: [Main](../glossary.md#main-process)

`WebRequest` クラスのインスタンスには、`Session` の `webRequest` プロパティを使用してアクセスします。

`WebRequest` のメソッドは、任意の `filter` と `listener` を受け取ります。 `listener` は、API のイベントが発生したときに `listener(details)` で呼ばれます。 `details` オブジェクトはリクエストについて記述します。 `listener` として `null` を渡すとイベントから登録解除します。

`filter` オブジェクトには、`urls` プロパティがあります。これは、URL パターンと一致しないリクエストをフィルタリングするために使用される URL パターンの配列です。 `filter` を省略するとすべてのリクエストがマッチします。

特定のイベントでは、`listener` には `callback` が渡されます。これは、`listener` が処理を終えたときに `response` オブジェクトとともに呼び出される必要があります。

以下はリクエストに `User-Agent` ヘッダーを追加する例です。

```javascript
const {session} = require('electron')

// 以下の URL へのすべてのリクエストのユーザエージェントを変更します。
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({cancel: false, requestHeaders: details.requestHeaders})
})
```

### インスタンスメソッド

`WebRequest` のインスタンスでは、以下のメソッドが利用できます。

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Object - (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `response` Object 
      * `cancel` Boolean (任意)
      * `redirectURL` String (任意) - 元のリクエストは送信または終了されず、代わりに指定された URL にリダイレクトされます。

`listener` は、リクエストが発生しようとしているときに `listener(details, callback)` で呼ばれます。

`uploadData` は、`UploadData` オブジェクトの配列です。

`callback` は、`response` オブジェクトで呼ぶ必要があります。

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filter` Object - (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function

リクエストヘッダが利用可能になると、HTTP リクエストを送信する前に `listener` が `listener(details, callback)` で呼び出されます。 これは、サーバーに TCP 接続が行われた後、HTTP データが送信される前に発生する可能性があります。

* `details` Object 
  * `id` Integer
  * `url` String
  * `method` String
  * `webContentsId` Integer (任意)
  * `resourceType` String
  * `timestamp` Double
  * `requestHeaders` Object
* `callback` Function 
  * `response` Object 
    * `cancel` Boolean (任意)
    * `requestHeaders` Object (任意) - 指定すると、これらのヘッダでリクエストが作成されます。

`callback` は、`response` オブジェクトで呼ぶ必要があります。

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Object - (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `timestamp` Double
    * `requestHeaders` Object

`listener` は、リクエストがサーバに送信される直前に `listener(details)` で呼び出され、以前の `onBeforeSendHeaders` レスポンスの変更は、このリスナが起動される時までに表示されます。

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Object - (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function

The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.

* `details` Object 
  * `id` Integer
  * `url` String
  * `method` String
  * `webContentsId` Integer (任意)
  * `resourceType` String
  * `timestamp` Double
  * `statusLine` String
  * `statusCode` Integer
  * `responseHeaders` Object
* `callback` Function 
  * `response` Object 
    * `cancel` Boolean
    * `responseHeaders` Object (optional) - When provided, the server is assumed to have responded with these headers.
    * `statusLine` String (optional) - Should be provided when overriding `responseHeaders` to change header status otherwise original response header's status will be used.

`callback` は、`response` オブジェクトで呼ぶ必要があります。

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Object - (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean - Indicates whether the response was fetched from disk cache.
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Object - (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Integer
    * `ip` String (optional) - The server IP address that the request was actually sent to.
    * `fromCache` Boolean
    * `responseHeaders` Object

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Object - (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when a request is completed.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Object - (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (任意)
    * `resourceType` String
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - The error description.

The `listener` will be called with `listener(details)` when an error occurs.