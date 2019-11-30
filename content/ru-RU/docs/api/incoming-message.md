## Class: IncomingMessage

> Обрабатывает запросы на HTTP/HTTPS-запросы.

Process: [Main](../glossary.md#main-process)

`IncomingMessage` реализует интерфейс [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) и, тем самым, также и [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### События экземпляра

#### Событие: 'data'

Возвращает:

* `chunk` Buffer - Часть данных в теле ответа.

Событие `data` является обычным способом передачи данных ответа в применимый код.

#### Событие: 'end'

Указывает, что тело ответа закончилось.

#### Событие: 'aborted'

Возникает, когда запрос был отменен во время текущей HTTP-транзакции.

#### Событие: 'error'

Возвращает:

`error` Error - Содержит строку ошибки, идентифицирующую причину отказа.

Возникает при обнаружении ошибки во время потоковой передачи ответных данных. Например, если сервер закрывает базовый объект во время потоковой передачи ответа, объекту ответа будет выдано `error`, а событие `close` впоследствии будет выдано объекту запроса.

### Свойства экземпляра

`IncomingMessage` имеет следующие свойства для чтения:

#### `response.statusCode`

`Integer` с указанием кода ответа HTTP.

#### `response.statusMessage`

`String`, представляющая сообщение о состоянии HTTP.

#### `response.headers`

An `Record<string, string[]>` представляет заголовки ответа HTTP. Объект `headers` имеет следующий формат:

* Все имена заголовков в нижнем регистре.
* Каждое название заголовка создает свойство массива в объекте заголовков.
* Каждое значение заголовка попадает в массив, связанный с его именем заголовка.

#### `response.httpVersion`

`String` с указанием номера HTTP протокола. Typical values are '1.0' or '1.1'. Additionally `httpVersionMajor` and `httpVersionMinor` are two Integer-valued readable properties that return respectively the HTTP major and minor version numbers.

#### `response.httpVersionMajor`

An `Integer` indicating the HTTP protocol major version number.

#### `response.httpVersionMinor`

An `Integer` indicating the HTTP protocol minor version number.