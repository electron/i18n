# StreamProtocolResponse Object

* `statusCode` Number (optional) - The HTTP response code.
* `headers` Record<String, String | String[]> (opsional) - Sebuah object yang berisi response headers</1>.
* `data` ReadableStream | null - A Node.js readable stream representing the response body.
