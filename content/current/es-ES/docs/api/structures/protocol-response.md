# Objeto ProtocolResponse

* `error` Integer (opcional) - Cuando se asigna, el `request` fallará con el número `error`. Para números de errores que puede usar, por favor vea la [lista de errores de red][net-error].
* `statusCode` Number (opcional) - El código de repuesta HTTP, por defecto es 200.
* `charset` String (opcional) - El conjunto de caracteres del cuerpo de respuesta, por defecto es `"utf-8"`.
* `mimeType` String (opcional) - El tipo MIME de cuerpo de respuesta, por defecto es `"text/html"`. Establecer `mimeType` establecería de forma implícita la cabecera `content-type` en la respuesta, pero si `content-type` ya esta configurada en las `headers`, el `mimeType` sería ignorado.
* `headers` Record<string, string | string[]> (opcional) - Un objeto que contiene las cabeceras de la respuesta. Las llaves deben ser String, y los valores deben ser String o Array de String.
* `data` (Buffer | String | ReadableStream) (opcional) - El cuerpo de la respuesta. Cuando se devuelve un stream como respuesta, este es una stream legible por Node.js que representa el cuerpo de la respuesta. Cuando se devuelve `Buffer` como respuesta, esto es un `Buffer`. Cuando se devuelve un `String` como respuesta, esto es un `String`. Esto es ignorado por otros tipos de respuestas.
* `path` String (opcional) - Ruta al archivo el cual se enviaría como cuerpo de la respuesta. Esto solo es usado para respuestas de archivos.
* `url` String (opcional) - Descarga la `url` y canaliza el resultado como cuerpo de la respuesta. Esto sólo es usado para respuestas URL.
* `referrer` String (opcional) - La URL `referrer`. Esto solo se usa para respuestas de archivos y URL.
* `method` String (opcional) - El `method` HTTP. Esto solo se usa para respuestas de archivos y URL.
* `session` Session (opcional) - La sesión usada para solicitar una URL, por defecto la solicitud HTTP reutilizará la sesión actual. Establecer `session` a `null` usaría una sesión aleatoria independiente. Esto sólo es usado para respuestas URL.
* `uploadData` [ProtocolResponseUploadData](protocol-response-upload-data.md) (opcional) - Los datos usados como datos de carga. Esto sólo se respuestas URL cuando el `method` es `"POST"`.

[net-error]: https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h
