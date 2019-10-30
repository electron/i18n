# ProtocolResponse オブジェクト

* `error` Integer (任意) - 代入すると、その `request` は `error` の番号で失敗します。 使用できる利用可能なエラー番号については、[net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) を参照してください。
* `statusCode` Number (任意) - HTTP レスポンスコード。省略値は、200 です。
* `charset` String (任意) - レスポンスの本文の文字集合。省略値は、`"utf-8"` です。
* `mimeType` String (任意) - レスポンスの本文の MIME タイプ。省略値は、`"text/html"` です。 Setting `mimeType` would implicitly set the `content-type` header in response, but if `content-type` is already set in `headers`, the `mimeType` would be ignored.
* `headers` Record<string, string | string[]> (optional) - An object containing the response headers. The keys must be String, and values must be either String or Array of String.
* `data` (Buffer | String | ReadableStream) (optional) - The response body. When returning stream as response, this is a Node.js readable stream representing the response body. When returning `Buffer` as response, this is a `Buffer`. When returning `String` as response, this is a `String`. This is ignored for other types of responses.
* `path` String (optional) - Path to the file which would be sent as response body. This is only used for file responses.
* `url` String (optional) - Download the `url` and pipe the result as response body. This is only used for URL responses.
* `referrer` String (optional) - The `referrer` URL. This is only used for file and URL responses.
* `method` String (optional) - The HTTP `method`. This is only used for file and URL responses.
* `session` Session (optional) - The session used for requesting URL, by default the HTTP request will reuse the current session. Setting `session` to `null` would use a random independent session. This is only used for URL responses.
* `uploadData` ProtocolResponseUploadData (optional) - The data used as upload data. This is only used for URL responses when `method` is `"POST"`.
