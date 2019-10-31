# ProtocolResponse オブジェクト

* `error` Integer (任意) - 代入すると、その `request` は `error` の番号で失敗します。 使用できる利用可能なエラー番号については、[net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) を参照してください。
* `statusCode` Number (任意) - HTTP レスポンスコード。省略値は、200 です。
* `charset` String (任意) - レスポンスの本文の文字集合。省略値は、`"utf-8"` です。
* `mimeType` String (任意) - レスポンスの本文の MIME タイプ。省略値は、`"text/html"` です。 `mimeType` を設定すると、レスポンスで暗黙的に `content-type` ヘッダーが設定されますが、`content-type` が既に `headers` で設定されている場合、`mimeType` は無視されます。
* `headers` Record<string, string | string[]> (任意) - レスポンスヘッダーに含まれるオブジェクト。 キーは文字列でなければならず、その値は文字列または文字列の配列でなければなりません。
* `data` (Buffer | String | ReadableStream) (任意) - レスポンスの本文。 ストリームをレスポンスとして返す場合、これはレスポンスの本文を表す Node.js の ReadableStream にします。 `Buffer` をレスポンスとして返す場合、これは `Buffer` にします。 `String` をレスポンスとして返す場合、これは `String` にします。 これは他のタイプのレスポンスでは無視されます。
* `path` String (任意) - レスポンス本文として送信されるファイルへのパス。 This is only used for file responses.
* `url` String (optional) - Download the `url` and pipe the result as response body. This is only used for URL responses.
* `referrer` String (optional) - The `referrer` URL. This is only used for file and URL responses.
* `method` String (optional) - The HTTP `method`. This is only used for file and URL responses.
* `session` Session (optional) - The session used for requesting URL, by default the HTTP request will reuse the current session. Setting `session` to `null` would use a random independent session. This is only used for URL responses.
* `uploadData` ProtocolResponseUploadData (optional) - The data used as upload data. This is only used for URL responses when `method` is `"POST"`.
