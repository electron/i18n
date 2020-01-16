# ProtocolResponse 객체

* `error` Integer (optional) - 할당될 때 `요청`이 `오류` 번호와 함께 실패합니다. 사용할 수 있는 유효한 오류 번호는 [net error list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h)를 참조하세요.
* `statusCode` Number (optional) - HTTP 응답코드, 기본값은 200.
* `charset` String (optional) - 응답 body의 문자셋, 기본값은 `"utf-8"`.
* `mimeType` String (optional) - 응답 body의 MIME 타입, 기본값은 `"text/html"`. Setting `mimeType` would implicitly set the `content-type` header in response, but if `content-type` is already set in `headers`, the `mimeType` would be ignored.
* `headers` Record<string, string | string[]> (optional) - An object containing the response headers. The keys must be String, and values must be either String or Array of String.
* `data` (Buffer | String | ReadableStream) (optional) - The response body. When returning stream as response, this is a Node.js readable stream representing the response body. When returning `Buffer` as response, this is a `Buffer`. When returning `String` as response, this is a `String`. This is ignored for other types of responses.
* `path` String (optional) - Path to the file which would be sent as response body. This is only used for file responses.
* `url` String (optional) - Download the `url` and pipe the result as response body. This is only used for URL responses.
* `referrer` String (optional) - The `referrer` URL. This is only used for file and URL responses.
* `method` String (optional) - The HTTP `method`. This is only used for file and URL responses.
* `session` Session (optional) - The session used for requesting URL, by default the HTTP request will reuse the current session. Setting `session` to `null` would use a random independent session. This is only used for URL responses.
* `uploadData` ProtocolResponseUploadData (optional) - The data used as upload data. This is only used for URL responses when `method` is `"POST"`.
