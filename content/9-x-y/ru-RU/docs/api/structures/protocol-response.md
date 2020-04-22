# Объект ProtocolResponse

* `error` Integer (опционально) - Когда назначен `request` завершится ошибкой с номером `error`. For the available error numbers you can use, please see the [net error list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).
* `statusCode` Number (опционально) - Код ответа HTTP, по умолчанию 200.
* `charset` String (опционально) - Кодировка тела ответа, по умолчанию `"utf-8"`.
* `mimeType` String (опционально) - Тип MIME тела ответа, по умолчанию `"text/html"`. Установка `mimeType` неявно установит `content-type` в ответе, но если `content-type` уже установлен `headers`, `mimeType` будет проигнорирован.
* `headers` Record<string, string | string[]> (опционально) - Объект, содержащий заголовки ответа. Ключи должны быть String, и значения должны быть String или Array of String.
* `data` (Buffer | String | ReadableStream) (опционально) - Тело ответа. Возвращаемый поток в ответ - это читаемый поток Node.js, представляющий тело ответа. При возврате `Buffer` в качестве ответа, это `Buffer`. При возврате `String` в качестве ответа, это `String`. Это игнорируется для других типов ответов.
* `path` String (опционально) - Путь к файлу, который будет отправлен в качестве тела ответа. Это используется только для ответов файлов.
* `url` String (опционально) -Загрузите `url` и передайте результат в виде тела ответа. Это используется только для URL ответов.
* `referrer` String (опционально) - Это `referrer` URL. Это используется только для файлов и URL ответов.
* `method` String (опционально) - Это HTTP `method`. Это используется только для файлов и URL ответов.
* `session` Session (опционально) -Сессия, используемая для запроса URL, по умолчанию HTTP-запрос будет повторно использовать текущую сессию. Установка `session` в `null` будет использовать случайную независимую сессию. Это используется только для URL ответов.
* `uploadData` ProtocolResponseUploadData (опционально) - Данные, используемые в качестве загружаемых данных. Это используется только для URL ответов, когда `method` является `"POST"`.
