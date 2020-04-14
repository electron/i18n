# ProtocolResponse 객체

* `error` Integer (optional) - 할당될 때 `요청`이 `오류` 번호와 함께 실패합니다. For the available error numbers you can use, please see the [net error list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).
* `statusCode` Number (optional) - HTTP 응답코드, 기본값은 200.
* `charset` String (optional) - 응답 body의 문자셋, 기본값은 `"utf-8"`.
* `mimeType` String (optional) - 응답 body의 MIME 타입, 기본값은 `"text/html"`. `mimeType`을 설정하면 응답에서 `content-type`헤더를 암시적으로 설정하지만 이미 `content-type`를 `headers`에서 설정한 경우 `mimeType`은 무시됩니다.
* `headers` Record<string, string | string[]> (optional) - 응답헤더를 가진 객체. 키는 반드시 String, 값은 반드시 String혹은 String배열이어야 한다.
* `data` (Buffer | String | ReadableStream) (optional) - 응답 body. 스트림을 응답으로 반환할 때 응답 바디를 Node.js 읽기 가능 스트림으로 표시합니다. `Buffer`를 응답으로 반환할 때 `Buffer`가 된다. `String`을 응답으로 반환할 때 `String`이 된다. 다른 타입의 응답에서는 무시된다.
* `path` String (optional) - 응답 본문으로 전송될 파일의 경로. 파일 응답에만 사용됩니다.
* `url` String (optional) - `url`을 다운로드하고 결과를 응답 본문으로 파이프하세요. URL응답에만 사용됩니다.
* `referrer` String (optional) - `referrer` URL. 파일과 URL 응답에만 사용됩니다.
* `method` String (optional) - HTTP `method`. 파일과 URL 응답에만 사용됩니다.
* `session` Session (optional) - URL 요청에 사용된 세션, 기본적으로 HTTP 요청은 현재 세션을 재사용합니다. `session`을 `null`로 설정하면 임의의 독립 세션이 사용됩니다. URL응답에만 사용됩니다.
* `uploadData` ProtocolResponseUploadData (optional) - 업로드 데이터로 사용된 데이터. `method`가 `"POST"`인 경우 URL 응답에만 사용됩니다.
