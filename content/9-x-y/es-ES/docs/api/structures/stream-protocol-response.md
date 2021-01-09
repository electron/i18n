# Objeto StreamProtocolResponse

* `statusCode` Number (opcional) - El código HTTP de respuesta.
* `headers` Record<String, String | String[]> (opcional) - Un objeto que contiene las cabeceras de la respuesta.
* `data` ReadableStream | null - Un flujo Node.js leíble que representa el cuerpo de la respuesta.
