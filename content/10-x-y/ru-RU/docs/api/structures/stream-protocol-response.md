# Объект StreamProtocolResponse

* `statusCode` Number (опционально) - Код ответа HTTP.
* `headers` Record<String, String | String[]> (опционально) - Объект, содержащий заголовки ответа.
* `data` ReadableStream | null - читаемый поток Node.js с телом ответа.
