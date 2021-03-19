# Objeto ProtocolResponse

* `error` Integer (opcional) - Cuando se asigna, el `request` fallará con el número `error`. Para números de errores que puede usar, por favor vea la [lista de errores de red](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h).
* `statusCode` Number (opcional) - El código de repuesta HTTP, por defecto es 200.
* `charset` String (opcional) - El conjunto de caracteres del cuerpo de respuesta, por defecto es `"utf-8"`.
* `mimeType` String (opcional) - El tipo MIME de cuerpo de respuesta, por defecto es `"text/html"`. Setting `mimeType` would implicitly set the `content-type` header in response, but if `content-type` is already set in `headers`, the `mimeType` would be ignored.
* `headers` Record<string, string | string[]> (optional) - An object containing the response headers. The keys must be String, and values must be either String or Array of String.
* `data` (Buffer | String | ReadableStream) (optional) - The response body. When returning stream as response, this is a Node.js readable stream representing the response body. When returning `Buffer` as response, this is a `Buffer`. When returning `String` as response, this is a `String`. This is ignored for other types of responses.
* `path` String (optional) - Path to the file which would be sent as response body. This is only used for file responses.
* `url` String (optional) - Download the `url` and pipe the result as response body. This is only used for URL responses.
* `referrer` String (optional) - The `referrer` URL. This is only used for file and URL responses.
* `method` String (optional) - The HTTP `method`. This is only used for file and URL responses.
* `session` Session (optional) - The session used for requesting URL, by default the HTTP request will reuse the current session. Setting `session` to `null` would use a random independent session. This is only used for URL responses.
* `uploadData` [ProtocolResponseUploadData](protocol-response-upload-data.md) (opcional) - Los datos usados como datos de carga. This is only used for URL responses when `method` is `"POST"`.
