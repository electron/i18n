# Объект ProtocolResponse

* `error` Integer (опционально) - Когда назначен `request` завершится ошибкой с номером `error`. For the available error numbers you can use, please see the [net error list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).
* `statusCode` Number (опционально) - Код ответа HTTP, по умолчанию 200.
* `charset` String (опционально) - Кодировка тела ответа, по умолчанию `"utf-8"`.
* `mimeType` String (опционально) - Тип MIME тела ответа, по умолчанию `"text/html"`. Установка `mimeType` неявно установит `content-type` в ответе, но если `content-type` уже установлен `headers`, `mimeType` будет проигнорирован.
* `headers` Record<string, string | string[]> (опционально) - Объект, содержащий заголовки ответа. The keys must be String, and values must be either String or Array of String.
* `data` (Buffer | String | ReadableStream) (optional) - The response body. When returning stream as response, this is a Node.js readable stream representing the response body. When returning `Buffer` as response, this is a `Buffer`. When returning `String` as response, this is a `String`. This is ignored for other types of responses.
* `path` String (optional) - Path to the file which would be sent as response body. This is only used for file responses.
* `url` String (optional) - Download the `url` and pipe the result as response body. This is only used for URL responses.
* `referrer` String (optional) - The `referrer` URL. This is only used for file and URL responses.
* `method` String (optional) - The HTTP `method`. This is only used for file and URL responses.
* `session` Session (optional) - The session used for requesting URL, by default the HTTP request will reuse the current session. Setting `session` to `null` would use a random independent session. This is only used for URL responses.
* `uploadData` ProtocolResponseUploadData (optional) - The data used as upload data. This is only used for URL responses when `method` is `"POST"`.
