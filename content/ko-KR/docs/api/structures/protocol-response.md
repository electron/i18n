# ProtocolResponse 객체

* `error` Integer (optional) - 할당될 때 `요청`이 `오류` 번호와 함께 실패합니다. 사용할 수 있는 유효한 오류 번호는 [net error list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h)를 참조하세요.
* `statusCode` Number (optional) - HTTP 응답코드, 기본값은 200.
* `charset` String (optional) - 응답 body의 문자셋, 기본값은 `"utf-8"`.
* `mimeType` String (optional) - 응답 body의 MIME 타입, 기본값은 `"text/html"`. `mimeType`을 설정하면 응답에서 `content-type`헤더를 암시적으로 설정하지만 이미 `content-type`를 `headers`에서 설정한 경우 `mimeType`은 무시됩니다.
* `headers` Record<string, string | string[]> (optional) - 응답헤더를 가진 객체. 키는 반드시 String, 값은 반드시 String혹은 String배열이어야 한다.
* `data` (Buffer | String | ReadableStream) (optional) - 응답 body. 스트림을 응답으로 반환할 때 응답 바디를 Node.js 읽기 가능 스트림으로 표시합니다. When returning `Buffer` as response, this is a `Buffer`. When returning `String` as response, this is a `String`. This is ignored for other types of responses.
* `path` String (optional) - Path to the file which would be sent as response body. This is only used for file responses.
* `url` String (optional) - Download the `url` and pipe the result as response body. This is only used for URL responses.
* `referrer` String (optional) - The `referrer` URL. This is only used for file and URL responses.
* `method` String (optional) - The HTTP `method`. This is only used for file and URL responses.
* `session` Session (optional) - The session used for requesting URL, by default the HTTP request will reuse the current session. Setting `session` to `null` would use a random independent session. This is only used for URL responses.
* `uploadData` ProtocolResponseUploadData (optional) - The data used as upload data. This is only used for URL responses when `method` is `"POST"`.
