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

`listener` は、リクエストが発生しようとしているときに `listener(details, callback)` で呼ばれます。

`uploadData` は、`UploadData` オブジェクトの配列です。

`callback` は、`response` オブジェクトで呼ぶ必要があります。

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filter` Object (任意) 
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

`listener` は、リクエストがサーバに送信される直前に `listener(details)` で呼び出され、以前の `onBeforeSendHeaders` レスポンスの変更は、このリスナが起動される時までに表示されます。

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Object (任意) 
  * `urls` String[] - URL パターンと一致しないリクエストを除去するために使用される URL パターンの配列。
* `listener` Function

`listener` は、HTTP リクエストのレスポンスヘッダを受信したときに `listener(details, callback)` で呼ばれます。

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

`callback` は、`response` オブジェクトで呼ぶ必要があります。

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

`listener` は、レスポンスボディの最初のバイトを受信したときに `listener(details)` で呼ばれます。 HTTP リクエストの場合、これはステータスラインとレスポンスヘッダが使用可能であることを意味します。

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

`listener` は、サーバーが始めたリダイレクトが発生しようとしているときに `listener(details)` で呼ばれます。

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

`listener` は、リクエストが終了したときに `listener(details)` で呼ばれます。

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

`listener` は、エラーが発生したときに `listener(details)` で呼ばれます。