## クラス: WebRequest

> ライフタイムのさまざまな段階でリクエストのコンテンツを傍受し、変更します。

プロセス: [Main](../glossary.md#main-process)

`WebRequest` クラスのインスタンスには、`Session` の `webRequest` プロパティを使用してアクセスします。

`WebRequest` のメソッドは、任意の `filter` と `listener` を受け取ります。 `listener` は、API のイベントが発生したときに `listener(details)` で呼ばれます。 `details` オブジェクトはリクエストについて記述します。

⚠️ Only the last attached `listener` will be used. Passing `null` as `listener` will unsubscribe from the event.

The `filter` object has a `urls` property which is an Array of URL patterns that will be used to filter out the requests that do not match the URL patterns. If the `filter` is omitted then all requests will be matched.

For certain events the `listener` is passed with a `callback`, which should be called with a `response` object when `listener` has done its work.

An example of adding `User-Agent` header for requests:

```javascript
const { session } = require('electron')

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({ cancel: false, requestHeaders: details.requestHeaders })
})
```

### インスタンスメソッド

The following methods are available on instances of `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Object (任意) 
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

The `listener` will be called with `listener(details, callback)` when a request is about to occur.

The `uploadData` is an array of `UploadData` objects.

The `callback` has to be called with an `response` object.

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filter` Object (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function

The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any http data is sent.

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

The `callback` has to be called with an `response` object.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Object (任意) 
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

The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Object (任意) 
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
    * `responseHeaders` Object (任意) - 指定すると、サーバはこれらのヘッダでレスポンスしたものとみなされます。
    * `statusLine` String (任意) - ヘッダのステータスを変更するために `responseHeaders` をオーバーライドする場合に指定する必要があります。そうしないと、元の応答ヘッダのステータスが使用されます。

The `callback` has to be called with an `response` object.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Object (任意) 
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
    * `fromCache` Boolean - レスポンスがディスクキャッシュからフェッチされたかどうかを示します。
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Object (任意) 
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
    * `ip` String (任意) - リクエストが実際に送信されたサーバーの IP アドレス。
    * `fromCache` Boolean
    * `responseHeaders` Object

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Object (任意) 
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

* `filter` Object (任意) 
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
    * `error` String - エラーの内容。

The `listener` will be called with `listener(details)` when an error occurs.