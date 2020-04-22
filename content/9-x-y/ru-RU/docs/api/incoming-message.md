## Class: IncomingMessage

> Обрабатывает запросы на HTTP/HTTPS-запросы.

Процесс: [Главный](../glossary.md#main-process)

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

### Instance Properties

`IncomingMessage` имеет следующие свойства для чтения:

#### `response.statusCode`

`Integer` с указанием кода ответа HTTP.

#### `response.statusMessage`

`String`, представляющая сообщение о состоянии HTTP.

#### `response.headers`

An `Record<string, string[]>` representing the response HTTP headers. The `headers` object is formatted as follows:

* Все имена заголовков в нижнем регистре.
* Каждое название заголовка создает свойство массива в объекте заголовков.
* Каждое значение заголовка попадает в массив, связанный с его именем заголовка.

#### `response.httpVersion`

`String` с указанием номера HTTP протокола. Типичные значения: «1.0» или «1.1». Дополнительно `httpVersionMajor` и `httpVersionMinor` являются двумя целочисленными читаемыми свойствами, которые возвращают соответственно основные и второстепенные номера версий HTTP.

#### `response.httpVersionMajor`

`Integer` с указанием основной версии протокола HTTP.

#### `response.httpVersionMinor`

`Integer`, указание номера младшей версии протокола HTTP.
