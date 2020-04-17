# ProtocolResponse Object

* `error` Integer (opsional)-Ketika ditetapkan, `request` akan gagal dengan nomor/kode `error` tersebut . Untuk nomor kesalahan yang tersedia, silakan lihat [daftar kesalahan bersih](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).
* `statusCode<0> Number (optional) - HTTP respon kode, standarnya 200.</p></li>
<li><p spaces-before="0"><code>charset` String (opsional) - Charset response body, standarnya adalah `"utf-8"`.
* `mimeType` String (optional) - MIME type dari response body, standarnya `"text/html"`. Pengaturan `mimeType` akan secara implisit mengatur `content-type` header dari sebuah response, tetapi jika `content-type` sudah diatur didalam `headers`, `mimeType` akan diabaikan.
* `headers` Record<string, string | string[]> (opsional) - Sebuah object yang berisi response headers</1>. "key" harus berupa String, dan "value" harus berupa String atau Array of String.
* `data` (Buffer | String | ReadableStream) (optional) - The response body. When returning stream as response, this is a Node.js readable stream representing the response body. When returning `Buffer` as response, this is a `Buffer`. When returning `String` as response, this is a `String`. This is ignored for other types of responses.
* `path` String (optional) - Path to the file which would be sent as response body. This is only used for file responses.
* `url` String (optional) - Download the `url` and pipe the result as response body. This is only used for URL responses.
* `referrer` String (optional) - The `referrer` URL. This is only used for file and URL responses.
* `method` String (optional) - The HTTP `method`. This is only used for file and URL responses.
* `session` Session (optional) - The session used for requesting URL, by default the HTTP request will reuse the current session. Setting `session` to `null` would use a random independent session. This is only used for URL responses.
* `uploadData` ProtocolResponseUploadData (optional) - The data used as upload data. This is only used for URL responses when `method` is `"POST"`.
